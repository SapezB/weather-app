import { render, h ,Component, useState } from "preact";
import HomeScreen from '../homeScreen';
import Button from '../button';
import style from './settings.less';
import ToggleSwitch from './ToggleSwitch'; 


export default class settingsScreen extends Component{

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
       
    switchToHome = () =>{

        this.setState({ screen : 'Home'})
        
    }
    handleSearchClick = () => {
        console.log("showSearchBar before setState:", this.state.showSearchBar);
        this.setState({ showSearchBar: !this.state.showSearchBar }, () => {
            console.log("showSearchBar after setState:", this.state.showSearchBar);
        });
    };

    

    handleChange(e) {
        this.setState({ value: e.target.value });
    }
  
    keyPress(e){
        if(e.keyCode == 13){
            this.switchToHome();
        }
    }

    handleToggleChange = (isChecked) => {
        const unit = isChecked ? 'imperial' : 'metric';
        this.setState({ isToggleOn: isChecked, unit });
    
    };
  
    
    render(){
        if(this.state.screen == 'Set'){
            const { showSearchBar } = this.state;
            const { isToggleOn } = this.state;
            console.log("Unit",this.state.unit);
            return(
                
                <div class={style.settingsapp}>
                    <main>
                        <div>
                        <h1> Settings</h1>
                        </div>
                        <div class={style.settings}>
                        <div class={style.settingsContainer}>
                            <div class={style.settingsImage}>
                            <img 
                                src={require('../../assets/backgrounds/location.png')}
                                alt={"loc"} 
                            />
                            </div>
                            <div>
                                <button class={style.settingsBtn} onClick={this.handleSearchClick}> Change the Location</button>
                            </div>    
                        </div> 
                        {showSearchBar && (
                            <div class={style.search_box}>
                            <input
                        
                                type = "text"
                                class= {style.search_bar}
                                placeholder = "Search City..."
                                value={this.state.inputValue}
                                onKeyDown={this.keyPress} 
                                onChange={this.handleChange} 
                                
                            />
                            </div>
                        )}
                        <div class={style.settingsContainer}>
                            <div class={style.settingsImage}>
                            <img 
                                src={require('../../assets/backgrounds/unit2.png')}
                                alt={"unit"} 
                            />
                            </div>
                            <div>
                                {/* <button class={style.settingsBtn}> Change the Unit</button> */}
                                <div class={style.toggleSwitch}>
                                    <ToggleSwitch
                                    label="Toggle me"
                                    onChange={this.handleToggleChange}
                                    />
                                </div>
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
                            <button name={style.backBtn} onClick= {this.switchToHome}>
                                Back
                            </button>
                        </div>       
                    </main>     
                </div>
        
            );
            
        }
        else if (this.state.screen == 'Home'){
            console.log("unit after input:", this.state.unit);

            return(
                <HomeScreen location={this.state.value} unit={this.state.unit} categroy = {this.state.category}/>
            );
        }
    }
    

} 