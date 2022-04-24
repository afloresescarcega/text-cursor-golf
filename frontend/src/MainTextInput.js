import { Component, createRef } from "react";

function getRecordFromCookie() {
  try {
    return document.cookie
      .split(";")
      .find((row) => row.startsWith("record="))
      .split("=")[1];
  } catch (e) {
    return null;
  }
}

export class MainTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "The quick brown jumps fox over the lazy dog",
      keyPressCount: 0,
      goal: "The quick brown fox jumps over the lazy dog",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.mainTextInput = createRef();
  }

  componentDidMount() {
    console.debug("finished mounting");
    this.mainTextInput.current.style.backgroundColor = "red";
    this.mainTextInput.current.addEventListener("click", (e) => {e.stopPropagation();
      e.preventDefault(); this.mainTextInput.current.focus()}, true);
  }

  componentWillUnmount() {
    console.debug("finished unmounting");
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    if (event.target.value === this.state.goal) {
      console.debug("You win!");
      if (getRecordFromCookie() == null || this.state.keyPressCount < getRecordFromCookie()) {
        document.cookie = "record=" + this.state.keyPressCount;
      }
      this.mainTextInput.current.style.backgroundColor = "green";
    } else {
      this.mainTextInput.current.style.backgroundColor = "red";
      console.debug("Keep going!");
    }
  }

  handleKeyPress(event) {
    this.setState((prevState) => ({
      keyPressCount: prevState.keyPressCount + 1,
    }));

    if (event.altKey) {
      console.debug(`You pressed a alt key. ${event.key}`);
    } else if (event.shiftKey) {
      console.debug(`You pressed a shift key. ${event.key}`);
    } else if (event.ctrlKey) {
      console.debug(`You pressed a control key. ${event.key}`);
    } else if (event.metaKey) {
      console.debug(`You pressed a meta key. ${event.key}`);
    } else {
      console.debug(`You pressed a key. ${String.fromCharCode(event.charCode)}`);
    }
  }

  render() {
    let previousRecord;
    if (getRecordFromCookie()) {
      previousRecord = (
        <p>Previous record: {getRecordFromCookie()} keystrokes</p>
      );
    }
    return (
      <div id="textboxes">
        {previousRecord}
        <p>Goal: "{this.state.goal}"</p>
        <textarea
          id="counter"
          rows="1"
          cols="3"
          value={this.state.keyPressCount}
          onChange={this.handleChange}
        />
        <textarea
          ref={this.mainTextInput}
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
