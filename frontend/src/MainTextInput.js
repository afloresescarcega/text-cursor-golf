import { Component } from "react";

export class MainTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "The quick brown fox jumps over the lazy dog" };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log("finished mounting");
  }

  componentWillUnmount() {
    console.log("finished unmounting");
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <textarea
        id="mainTextInput"
        rows="1"
        cols="50"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
