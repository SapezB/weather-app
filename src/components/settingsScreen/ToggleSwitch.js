import { h, Component } from 'preact';
import style from './settings.less';

class ToggleSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }

  handleToggleChange = () => {
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
            onChange={this.handleToggleChange}
          />
          <span className={style.slider}></span>
        </label>
      </div>
    );
  }
}
 
export default ToggleSwitch;