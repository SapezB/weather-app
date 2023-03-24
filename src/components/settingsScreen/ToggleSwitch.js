import { h, Component } from 'preact';
import style from './settings.less';

class ToggleSwitch extends Component { //Toggle for the imperial/metric system
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,//default
    };
  }

  handleToggleChange = () => { //function to change the state of the toggle from one to another when a change is made in settings
    const { onChange } = this.props;
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
    onChange(!isChecked);
  };

  render() {
    const { isChecked } = this.state;
    const { label } = this.props;

    return (
      <div>
        <label className={style.switch}>
          {label}
          <input
            type="checkbox"
            checked={isChecked}
            onChange={this.handleToggleChange}//detects change and call the function to handle the change
          />
          <span className={style.slider}></span>
        </label>
      </div>
    );
  }
}
 
export default ToggleSwitch;
