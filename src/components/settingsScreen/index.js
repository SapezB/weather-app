import { render, h ,Component, useState } from "preact";
import HomeScreen from '../homeScreen';
import Button from '../button';
import style from './settings.less';
import ToggleSwitch from './ToggleSwitch'; 

//settings screen updating location and changing units


export default class settingsScreen extends Component{

    // sets states values for this screen
    constructor(props) {
		super(props);
		this.state = {
			screen: 'Set',
            category: this.props.category,
            showSearchBar: false,
            value:'',
            isToggleOn: false,
            unit: 'metric',

            
		};

        this.handleChange = this.handleChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
        
	}
       
    //function for switching the screen to homescreen
    switchToHome = () =>{

        this.setState({ screen : 'Home'})
        
    }

    //function for showing the search bar when the change the location button is clicked
    handleSearchClick = () => {
        console.log("showSearchBar before setState:", this.state.showSearchBar);
        this.setState({ showSearchBar: !this.state.showSearchBar }, () => {
            console.log("showSearchBar after setState:", this.state.showSearchBar);
        });
    };

    

    //function for chnages the location value from input
    handleChange(e) {
        this.setState({ value: e.target.value });
    }


    //function for switching to home when enter is pressed
    keyPress(e){
        if(e.keyCode == 13){
            this.switchToHome();
        }
    }


    //function for changing the units of weather
    handleToggleChange = (isChecked) => {
        const unit = isChecked ? 'imperial' : 'metric';
        this.setState({ isToggleOn: isChecked, unit });
    
    };


  
    
    render(){
        if(this.state.screen == 'Set'){
            const { showSearchBar } = this.state;
            const { isToggleOn } = this.state;
            //console.log("Unit",this.state.unit);
            return(
                
                <div class={style.settingsapp}>
                    <main>
                        <div>
                        <h1> Settings</h1>
                        </div>
                        {/* div class with images and buttons  */}
                        <div class={style.settings}>
                            <div class={style.settingsContainer}>
                                <div class={style.settingsImage}>
                                {/* location image */}
                                <img 
                                    src={require('../../assets/backgrounds/location.png')}
                                    alt={"loc"} 
                                />
                                </div>
                                <div>
                                    {/* change location function call */}
                                    <button class={style.settingsBtn} onClick={this.handleSearchClick}> Change the Location</button>
                                </div>    
                            </div> 
                            {showSearchBar && (
                                // shows search bars when button is pressed
                                <div class={style.search_box}>
                                <input

                                    type = "text"
                                    class= {style.search_bar}
                                    placeholder = "Search City..." 
                                    value={this.state.inputValue} // user input is taked
                                    onKeyDown={this.keyPress}  //function called
                                    onChange={this.handleChange} 
                                    
                                />
                                </div>
                            )}
                            <div class={style.settingsContainer}>
                                <div class={style.settingsImage}>
                                {/*  unit image */}
                                <img 
                                
                                    src={require('../../assets/backgrounds/unit2.png')}
                                    alt={"unit"} 
                                />
                                </div>
                                <div>
                                    {/* <button class={style.settingsBtn}> Change the Unit</button> */}
                                    {/* change unit button call */}
                                    <div class={style.toggleSwitch}>
                                        <ToggleSwitch
                                        label="Toggle me"
                                        onChange={this.handleToggleChange}
                                        />
                                    </div>
                                    {/* shows current unit for temperture */}
                                    <p class={style.text}>The Unit is {isToggleOn ? 'Imperial' : 'Metric'}.</p>
                    
                                </div>
                            </div>
                            <div class={style.settingsContainer}>
                                <div class={style.settingsImage}>
                                <img 
                                    src={require('../../assets/backgrounds/notification.png')}
                                    alt={"not"}
                                />
                                </div>
                                <div>
                                    <button class={style.settingsBtn}> Set notifications</button>
                                </div>
                            </div>
                            {/* back button to change to homescreen */}
                                <button name={style.backBtn} onClick= {this.switchToHome}>
                                    Back
                                </button>
                        </div>       
                    </main>     
                </div>       
            );
            
        }
        else if (this.state.screen == 'Home'){
            //console.log("unit after input:", this.state.unit);

            return(
                // if the setState is home it will change to  homescreen with the state values
                <HomeScreen location={this.state.value} unit={this.state.unit} categroy = {this.state.category}/>
            );
        }
    }
    

} 