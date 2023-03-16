import { render, h ,Component, useState } from "preact";
import HomeScreen from '../homeScreen';
import Button from '../button';
import style from './settings.less';

export default class settingsScreen extends Component{

    constructor(props) {
		super(props);
		this.state = {
			screen: 'Set',
            showSearchBar: false,
            value:'',
            
		};

        this.handleChange = this.handleChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
	}
       
    switchToHome = () =>{
        this.setState({ screen : 'Home' })
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
           console.log('value', e.target.value);
           // put the login here
        }
     }
  
    
    
    render(){
        if(this.state.screen == 'Set'){
            const { showSearchBar } = this.state;
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
                                <button class={style.settingsBtn}> Change the Unit</button>
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
                        <Button class='Back' clickFunction = {this.switchToHome}/>
                        </div>       
                    </main>     
                </div>
            );
        }
        else if (this.state.screen == 'Home'){
            return(
                <HomeScreen/>
            );
        }
    }
    

}