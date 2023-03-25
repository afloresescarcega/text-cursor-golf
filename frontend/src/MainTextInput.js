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
      keyDisplay: []
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

    switch (event.code) {
      case "ArrowLeft":
        this.state.keyDisplay.push("←");
        console.log("Left arrow key pressed");
        break;
      case "ArrowRight":
        this.state.keyDisplay.push("→");
        console.log("Right arrow key pressed");
        break;
      case "ArrowUp":
        this.state.keyDisplay.push("↑");
        console.log("Up arrow key pressed");
        break;
      case "ArrowDown":
        this.state.keyDisplay.push("↓");
        console.log("Down arrow key pressed");
        break;
      case "MetaLeft":
        this.state.keyDisplay.push("⌘");
        console.log("Command/Windows key pressed");
        break;
      case "ControlLeft":
        this.state.keyDisplay.push("Ctrl");
        console.log("Control key pressed");
        break;
      case "AltLeft":
        this.state.keyDisplay.push("Alt");
        console.log("Option/Alt key pressed");
        break;
      case "ShiftLeft":
        this.state.keyDisplay.push("Shift");
        console.log("Shift key pressed");
        break;
      case "ShiftRight":
        this.state.keyDisplay.push("Shift");
        console.log("Shift key pressed");
        break;
      case "Space":
        this.state.keyDisplay.push("⎵");
        console.log("Space key pressed");
        break;
      case "Backspace":
        this.state.keyDisplay.push("⌫");
        console.log("Backspace key pressed");
        break;
      default:
        this.state.keyDisplay.push(event.code.replace("Key", ""));
        console.debug(`You pressed a key: ${event.code.replace("Key", "")}`);
        break;
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
        <textarea
          ref={this.mainTextInput}
          id="key-display"
          rows="1"
          cols="50"
          value={this.state.keyDisplay}
        />
      </div>
    );
  }
}
