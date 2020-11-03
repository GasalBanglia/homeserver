import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import os
import mysql.connector as mysql
import time
import datetime
import random
import requests

from tornado.options import define, options
define("port", default=8080, help="run on the given port", type=int)


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [(r"/[Ll]eo/[Ss]upplements/?", SupplementsHandler), (r"/[Ll]eo/?", LeoHandler), (r"/?", IndexHandler), (r"/[Ww]eather/?", WeatherHandler), (r"/[pP]hotos/?", PhotoHandler), (r"/[vV]ideogames/?", VideoGameHandler), (r"/[gG]arden/?", GardenHandler), ]   
        tornado.web.Application.__init__(self, handlers, debug=True, 
                template_path=os.path.join(os.path.dirname(__file__), "templates"), ui_modules = {"supplement" : SupplementModule}, static_path=os.path.join(os.path.dirname(__file__), "static"))


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")

class LeoHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("leo.html")


class SupplementModule(tornado.web.UIModule):
	def render(self, supplement):
		return self.render_string("modules/supplement.html", supplement=supplement)


class SupplementsHandler(tornado.web.RequestHandler):
    def get(self):

        # Get the URL query argument 'source' to determine what to get
        # and what to return.
        source = self.get_query_argument('source')

        # If source = 'page', render the Leo supplement page.
        if source == "page":
            #Get handle to the leo database
            leodb = mysql.connect(
                host="localhost", 
                user="patrick", 
                password="test123", 
                database="Leo")

            #Obtain the cursor, execute a SELECT query
            cursor = leodb.cursor()
            command = "SELECT DISTINCT * FROM Supplements ORDER BY date DESC;"
            cursor.execute(command)
            supps = cursor.fetchall()

            # We are finished fetching data; 
            # close the cursor and database connection.
            cursor.close()
            leodb.close()

            if supps:
                self.render('supps.html', supps=supps)
            else:
                self.set_status(404)
                self.render('supps.html', supps = {})

        # If source = 'widget', return information 
        # for use in the Leo supplement widget.
        elif source == "widget":
            #Get handle to the leo database
            leodb = mysql.connect(
                host="localhost", 
                user="patrick", 
                password="test123", 
                database="Leo")

            # Get a database cursor, run a select query for an entry
            # with today's date on it.
            cursor = leodb.cursor()
            t = datetime.datetime.now()
            command =  ("SELECT * FROM Supplements "
                        "WHERE date='{:04d}-{:02d}-{:02d}';").format(t.year, t.month, t.day)
            cursor.execute(command)

            # Fetch data returned from the query.
            rows = cursor.fetchall()
            rowCount = cursor.rowcount

            # We are finished fetching data; 
            # close the cursor and database connection.
            cursor.close()
            leodb.close()
 
            # DEBUG print("{} rows for query: \n{}".format(rowCount, rows))
            # Check if any results appeared
            if rowCount < 1:
                self.write( {"takenToday" : False, "numRows": rowCount}  )
            else:
                self.write( {"takenToday" : True, "numRows": rowCount} )
        else:
            self.set_status(404)
            self.write("<h1>404</h1>"
                        "<p>Value for parameter 'source' not recognized.</p>"
                        )
            self.finish()
                      

    def post(self):
        #Obtain the source argument
        source = self.get_query_argument("source")
        #determine the date and amount variables
        date = ""
        amount = 1
        if source == 'page':
            date = self.get_argument('date')
            amount = self.get_argument('amount')
        elif source == 'widget':
            t = datetime.datetime.now()
            date = "{:04d}-{:02d}-{:02d}".format(t.year, t.month, t.day)
        else:
            self.set_status(404)
            self.write("<h1>404</h1>"
                        "<p>Value for parameter 'source' not recognized.</p>"
                        )

        # Now, go about our business.
        # Connect to the database
        leodb = mysql.connect(
            host="localhost", 
            user="patrick", 
            password="test123", 
            database="Leo")

        #Obtain the cursor 
        cursor = leodb.cursor()
        #determine whether an entry for this date exists already.
        command =  ("SELECT * FROM Supplements "
                    "WHERE date='{}';").format(date)
        cursor.execute(command)
        # Fetch the results
        results = cursor.fetchall()
        # If there does exist an entry with this date, end the method.
        print("rows: {} for query: {}".format(cursor.rowcount, command))
        if cursor.rowcount > 0:
            if source == "page":
                self.get()
            elif source == "widget":
                self.set_status(200)


        # If there did not exist an entry, attempt an insert.
        # TODO check for failure to insert.
        else:

            command =   ("INSERT INTO Supplements (date, amount) "
                        "VALUES ('{}', {});").format(date, amount)
            cursor.execute(command)

            #We are finished inserting data. Commit the changes to the database and 
            #close the cursor and  database connection.
            leodb.commit()
            cursor.close()
            leodb.close()

            # Run the get() method if source = 'page'
            if source == 'page':
                self.get()
            elif source == 'widget':
                self.set_status(201)
            # End the HTTP request.
            self.finish()
    
class WeatherHandler(tornado.web.RequestHandler):
    def get(self):
        # connect to the database and get its cursor
        weatherdb = mysql.connect(
                host='localhost', 
                user='patrick', 
                password='test123', 
                database='Weather')
        cursor = weatherdb.cursor()
        # query light sensor data from the past 24 hours.
        # Since measurements are stored every 5 minutes, this 
        # amounts to 3600 / 5 = 720 data points.
        # For now, only light data is recorded.
        numEntries = 360
        command = "SELECT light from sensor_data LIMIT {};".format(numEntries)

        # run the command.
        cursor.execute(command)

        # Obtain the data from the cursor
        # hold it in an array, then transform it into a CSV string 
        light_data = cursor.fetchall()
        
        # Convert from list of tuples to list of ints
        final_data = map( lambda tup: tup[0], light_data )
        #print(final_data)
        
        # Close the cursor and database connection.  
        cursor.close()
        weatherdb.close()

        self.write( {"data": final_data } )


    def post(self):
        #connect to the database
        weatherdb = mysql.connect(host='localhost', user='patrick', password='test123', database='Weather')
        #obtain values to put into the sensor_data table.
        light = self.get_argument('light')
        humidity = 0;       #self.get_argument('humidity')
        temperature = 0;    #self.get_argument('temperature')
        time_now = time.localtime(time.time())
        time_string = "{}:{}:{}".format(time_now.tm_hour, time_now.tm_min, time_now.tm_sec)

        #Get the database cursor
        cursor = weatherdb.cursor()
        #Make the insert query string.
        command = "INSERT INTO sensor_data (time, light, humidity, temperature) VALUES ('{}', '{}', '{}', '{}');".format(time_string, light, humidity, temperature)
        #Run the query.
        cursor.execute(command)
        # I assume the query executed without problem.  Later I will check for exceptions.
        #Close the cursor and the database connection after committing the data.
        weatherdb.commit()
        cursor.close()
        weatherdb.close()
        #The POST response ends. I believe tornado sends back a response, but no HTTP is transmitted.

class PhotoHandler(tornado.web.RequestHandler):
    def post(self):
        print('POST@PhotoHandler has begun.')
        data = ""
        for field_name, files in self.request.files.items():
            for info in files:
                # Write the file to our internal photos directory.
                with open("./photos/" + info['filename'], 'wb') as f:
                    f.write(info["body"])
                # Create a string containing file info 
                # to send back to the client.
                filename, content_type = info["filename"], info["content_type"]
                body = info["body"]
                data += "file: {}, content-type:{}, size: {} bytes\n".format(filename, content_type, len(body))

        self.write({"data":data})
                

    def get(self):
        self.write({"data":"Method Not Implemented"})

class VideoGameHandler(tornado.web.RequestHandler):
    def get(self):
        # connect to the database and get its cursor
        vgdb = mysql.connect(
                host='localhost', 
                user='patrick', 
                password='test123', 
                database='video_games')
        cursor = vgdb.cursor()

        command = "SELECT title, console, description FROM our_games;"

        # run the command.
        cursor.execute(command)

        # Obtain the data from the cursor
        # hold it in an array, then transform it into a CSV string 
        games = cursor.fetchall()
        num_games = cursor.rowcount
        game_to_play = games[random.randrange(0,num_games)]

        # Print warnings, if any.
        print(cursor.statement)
        print(cursor.fetchwarnings())
        
        # Close the cursor and database connection.  
        cursor.close()
        vgdb.close()
        

        # format and send the data about the game.
        self.write( {
            "title": game_to_play[0],
            "system": game_to_play[1],
            "description": game_to_play[2]
            } )


    def post(self):
        #connect to the database
        vgdb = mysql.connect(
                host='localhost', 
                user='patrick', 
                password='test123', 
                database='video_games')

        # Create the insert query using the JSON body of the request.
        # first, extract the JSON string from the body and decode it.
        json_string = self.request.body
        json = tornado.escape.json_decode(json_string)
        # Next, build the query and insert values from the json string.
        # must create the cursor first, before we reference it.
        cursor = vgdb.cursor()
        # Now format the query string.
        command = ( "INSERT INTO our_games "
                    "(id, title, release_date, developer, metacritic_rating, description, esrb_rating, max_players, has_online, genre) "
                    "VALUES "
                    """({}, "{}", "{}", "{}", {}, "{}", {}, {}, {}, {});""" ).format("NULL", json['title'], json['release_date'], json['developer'], json['metacritic_rating'], json['description'], json['esrb_rating'], json['max_players'], json['has_online'], json['genre'])

        # Get the database cursor and execute.
        self.set_status(201)
        try:
            cursor.execute(command)
        except Exception as e:
            self.set_status(200)
            print(e)
        # Close the cursor and the database connection after committing the data.
        print(cursor.statement)
        print(cursor.fetchwarnings())
        vgdb.commit()
        cursor.close()
        vgdb.close()


class GardenHandler(tornado.web.RequestHandler):
    # The get method sends a get request to the raspberry pi 3
    # at the window. It expects to receive all of the sensor data 
    # for the garden, in addition to actuator state.
    def get(self):
        try:
            response = requests.get("http://192.168.1.120:8080/garden")
            # Simply return the body text and the status code to the client.
            # They can decode it, and error check.
            self.set_status(response.status_code)
            self.write(response.text)
        except:
            self.set_status(502)
            self.write("<h1>Upstream Server Error</h1><h3>We have received your request, but had an error communicating it to the upstream server.</h3><p>It is possible the server is offline. Please try again later.</p>")

    # For now, we just want to turn a valve on or off.
    # Still, I will specifiy this in the endpoint.
    def post(self):
        try:
            response = requests.post("http://192.168.1.120:8080/garden", 
                    data = {
                        'target':'main_valve', 
                        'action':'toggle'
                        })
            # again, sent the body text and status code to the client.
            # They can decode it from there.
            self.set_status(response.status_code)
            self.write(response.text)
        except: 
            self.set_status(500)
            self.write({})
       

def main():
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()
