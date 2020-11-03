/*
 * GardenApp.jsx
 *
 * Presentationl component for the Garden App widget.
 *
 * Presents a table of data and various controls to interface
 * with the actuators (valves, for example).
 *
 */

export class GardenApp extends React.Component {
    render() {
        // First, build some lists of table data.
        let headers     = [];
        let readings    = [];
        let numSensorReadings   = 0;
        let numActuatorReadings = 0;
        for (let name in this.props.sensor_data) {
            if (this.props.sensor_data.hasOwnProperty(name)) {
                headers.push( <th key={"th_" + name} scope="col">{name}</th> );
                readings.push( <td key={"td_" + name}>{this.props.sensor_data[name]}</td> );
                numSensorReadings += 1;
            }
        }
        for (let name in this.props.actuator_data) {
            if (this.props.actuator_data.hasOwnProperty(name)) {
                headers.push( <th key={"th_" + name} scope="col">{name}</th> );
                readings.push( <td key={"td_" + name}>{this.props.actuator_data[name]}</td> );
                numActuatorReadings += 1;
            }
        }


        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={numSensorReadings}>
                                Sensor Readings
                            </th>
                            <th colSpan={numActuatorReadings}>
                                Actuator Readings
                            </th>
                        </tr>
                        <tr>
                            {headers}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {readings}
                        </tr>
                    </tbody>
                </table>
            <button onClick={this.props.toggleValve}>Toggle Valve</button>
            <button onClick={this.props.readSensors}>Refresh Readings</button>
            </div>
        );
    }
}
