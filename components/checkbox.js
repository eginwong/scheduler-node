import { Fragment, Component } from "react";

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: props.checked };
  }

  onChangeHandler = ev => void this.setState({ checked: ev.target.checked }) || this.props.change(ev.target.checked);

  render() {
    return (
      <Fragment>
        <input id={ this.props.id } type="checkbox" checked={ this.state.checked } onChange={ this.onChangeHandler } />
      </Fragment>
    );
  }
}
