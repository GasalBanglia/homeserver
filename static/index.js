/*
 * @file: /static/index.js
 *
 *
 * The main javascript file for my homepage.
 * Eventually widget-specific code will be encapsulated with their React components.
 *
 */

    /* create a random sequence of notes for VexFlow to render.
     * The sequence returned is a string.
     * currently, the sequence is four measures long in 4/4 time,
     * at the fourth octave, on the C Major scale, using only 
     * quarter, half, and whole notes.
     */
    function generateNoteSequence() {
        const octave = 4; //octave, or pitch level, to use for each note.
        const measures = 4; //number of measures in the sequence
        const bpm = 4; //beats per measure
        const max_beats = measures * bpm; //total beats we need for the sequence--no more, no less.
        const note_value = {1:'q', 2:'h', 4:'w'}; //converts random number into the length 
        const note_pitch = {1:'A', 2:'B', 3:'C', 4:'D', 5:'E', 6:'F', 7:'G'}; //convert random number into pitch
        var beats = 0; //Total beats in the sequence so far.
        var sequence = "" //the note sequence.
        var val = 0; //current note value.
        var pitch = 0; //current note pitch.
        
        //Start generating notes.
        while (beats < max_beats) {
            //val = Math.pow(2, Math.floor(Math.random() * 3));
            val = 1;
            pitch = Math.floor(Math.random() * 7) + 1;
            /*
            while (beats + val > max_beats) {
                val = Math.pow(2, Math.floor(Math.random() * 3));
            }
            */
            beats = beats + val;
            sequence = sequence.concat(note_pitch[pitch], octave, "/", note_value[val], ", ");
        }
        return sequence;
    }

    /* Takes a string representing a vexFlow sequence of notes and 
     * creates a Staff. The staff is then rendered to the <div>
     * with is = "notes-of-the-day"
     */
    function renderStaff(notes) {

        const vf = new Vex.Flow.Factory({
            renderer: {elementId: 'notes-of-the-day'}
        });
        const score = vf.EasyScore();
        score.set({time:'16/4'});
        const system = vf.System();


        system.addStave({
            voices: [
                score.voice(score.notes(notes, {stem: 'up'}))
            ]
        }).addClef('treble').addTimeSignature('16/4');

        vf.draw();

    };

    function updateForecast() {
        //Make an HTTP GET Request to weather.gov, then obtain the response and it's JSON data
            fetch(
                "https://api.weather.gov/gridpoints/RNK/101,78/forecast"
            ).then(
                response => response.json()
            ).then(
                function(json) {
                    //Useful variables for holding data and HTML nodes
                    var forecasts = [];
                    var list = document.getElementById("forecast");

                    // Clear the forecast widget 
                    list.innerHTML = "";
                    // Create a widget for containing the description
                    textList = document.createElement("UL");


                    // Print to the console that we fetched the weather successfully.
                    console.log("Weather fetched successfully.");

                    //Collect every forecast object and put it into an array
                    for (var i = 0; i < 6; i++) forecasts[i] = json["properties"]["periods"][i];

                    forecasts.forEach(function(f) {
                        //Create the HTML elements
                        var item = document.createElement("SPAN");
                        var image_part = document.createElement("IMG");
                        let arrow_part = document.createElement("IMG");
                        var text_part = document.createElement("LI");
                        //give the elements data and attributes
                        text_part.innerHTML = f["name"]+ ": " + f["shortForecast"];
                        image_part.src = f["icon"];
                        //arrow_part.src = '/right-arrow.png'
                        //item.classList.add("row");
                       // text_part.classList.add("forecast_entry")
                        //image_part.classList.add("forecast_entry")
                        image_part.style.paddingRight = "20px"

                        //add the text and image elements to the list item element
                        item.appendChild(image_part)
                        //item.appendChild(arrow_part)
                        textList.appendChild(text_part)
                        //Append the list item to the forecast element
                        list.appendChild(item);
                    })

                    // Add the list of 'short forecast' texts to the widget.
                    list.appendChild(textList);
                    // Add the fetch weather button.
                    list.innerHTML += "<input type='submit' onClick='updateForecast()' value='Fetch Weather' />"; 

                })
           }

    function updateCurrentWeather() {
        fetch("https://api.weather.gov/stations/KLYH/observations/latest?require_qc=false").then(response => response.json()).then(
            function(json) {
                // Select the navbar weather widget
                widget = document.querySelector(".navbar .weather");

                // Check that widget is not empty.
                // Print it to the console.
                console.log("weather navbar widget: ", widget)

                //extract the temperature and humidity measurements from the NWS data.
                //Use Math.floor() to remove decimal.
                temp = json["properties"]["temperature"]["value"]
                hum = json["properties"]["relativeHumidity"]["value"]
                text = json["properties"]["textDescription"]
                icon = json["properties"]["icon"]


                // Create new HTML components to add to our weather <span>
                let text_part = document.createElement("SPAN");
                let image_part = document.createElement("IMG");

                // print some variables to the console for debugging.
                let variables = { temp, hum, text, icon }
                console.log(variables)

                // Add the new HTML elements to the navbar weather widget.
                // First convert the temp and hum to strings; checking for null values.
                temp = temp === null ? "" : (Math.floor(temp) * 9/5 + 32) + "&deg;F";
                hum = hum === null ? "" : Math.floor(hum) + "%RH";

                text_part.innerHTML = text + "<br/>" + temp + (temp && hum ? ", " : "") +  hum;
                image_part.src = icon;

                // Add the elements to the <span>
                widget.innerHTML = ""
                widget.appendChild(image_part);
                widget.appendChild(text_part);

        })
    }

    function renderContent() {
        updateForecast();
        renderStaff(generateNoteSequence());
        updateCurrentWeather();
    }


