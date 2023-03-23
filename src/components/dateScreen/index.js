import { h, Component } from 'preact';
import $ from 'jquery';

export default class DateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
	
            display: true
,
            
		};
    }

    componentDidMount() {
        // Make API call to get hourly forecast data
        const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&hourly=temperature_2m,precipitation_probability,windspeed_120m&forecast_days=1';

        $.ajax({
            url: apiUrl,
            dataType: 'json',
            success:this.parseResponse,
            error:function(req, err){ console.log('API call failed ' + err); }
        });
        this.setState({display:false});
    }

    render() {
        const { hourlyData, error } = this.state;

        
        return(
            <div>{ this.state.hour }</div>
        );

    }
    parseResponse = (parsed_json) => {
        var hourly = parsed_json ['hourly']['time']
        

        // set states for fields so they could be rendered later on
        this.setState({
            hour: hourly
            
        });      
    }
}
