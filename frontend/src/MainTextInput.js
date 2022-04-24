import { Component } from "react";

export class MainTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "The quick brown fox jumps over the lazy dog", keyPressCount: 0 };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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

  handleKeyPress(event) {
    this.setState((prevState) => ({
      keyPressCount: prevState.keyPressCount + 1
    }));

    if (event.altKey) {
      console.log( `You pressed a alt key. ${event.key}` );
    } else if (event.shiftKey) {
      console.log( `You pressed a shift key. ${event.key}` );
    } else if (event.ctrlKey) {
      console.log( `You pressed a control key. ${event.key}` );
    } else if (event.metaKey) {
      console.log(`You pressed a meta key. ${event.key}`);
    } else {
      console.log( `You pressed a key. ${String.fromCharCode(event.charCode)}` );
    }
    console.log(`Pressed total of ${this.state.keyPressCount} times.`);
  }

  render() {
    return (
        <div id="textboxes">
          <textarea id="counter"
                    rows="1"
                    cols="3"
                    value={this.state.keyPressCount}
                    onChange={this.handleChange}
          />
          <textarea
            autoFocus="autofocus"
            id="mainTextInput"
            rows="1"
            cols="50"
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={(e) => this.handleKeyPress(e)}
          />
        </div>
    );
  }
}
