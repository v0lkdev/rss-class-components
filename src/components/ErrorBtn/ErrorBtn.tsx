import { Component } from 'react';
import './ErrorBtn.css';

export default class ErrorBtn extends Component {
  state = {
    hasError: false,
  };

  handleOnClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Example Error: Boom💥');
    }
    return (
      <button className="error-btn" onClick={this.handleOnClick}>
        Simulate Error
      </button>
    );
  }
}
