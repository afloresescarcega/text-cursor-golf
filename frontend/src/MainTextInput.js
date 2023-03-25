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
    this.keyDisplayInput = createRef();
  }

  componentDidMount() {
    console.debug("finished mounting");
    this.setBackgroundColor("red");
    this.mainTextInput.current.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.mainTextInput.current.focus();
    }, true);
  }

  componentWillUnmount() {
    console.debug("finished unmounting");
  }

  setBackgroundColor(color) {
    this.mainTextInput.current.style.backgroundColor = color;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });

    if (event.target.value === this.state.goal) {
      console.debug("You win!");
      const record = getRecordFromCookie();
      if (record === null || this.state.keyPressCount < parseInt(record, 10)) {
        document.cookie = "record=" + this.state.keyPressCount;
      }
      this.setBackgroundColor("green");
    } else {
      this.setBackgroundColor("red");
      console.debug("Keep going!");
    }
  }

  handleKeyPress(event) {
    this.setState((prevState) => ({
      keyPressCount: prevState.keyPressCount + 1,
    }));

    let displayChar;
    switch (event.code) {
      case "ArrowLeft":
        displayChar = "←";
        break;
      case "ArrowRight":
        displayChar = "→";
        break;
      case "ArrowUp":
        displayChar = "↑";
        break;
      case "ArrowDown":
        displayChar = "↓";
        break;
      case "MetaLeft":
        displayChar = "⌘";
        break;
      case "ControlLeft":
        displayChar = "Ctrl";
        break;
      case "AltLeft":
        displayChar = "Alt";
        break;
      case "ShiftLeft":
      case "ShiftRight":
        displayChar = "Shift";
        break;
      case "Space":
        displayChar = "⎵";
        break;
      case "Backspace":
        displayChar = "⌫";
        break;
      default:
        displayChar = event.code.replace("Key", "");
        break;
    }

    this.setState((prevState) => ({
      keyDisplay: [...prevState.keyDisplay, displayChar],
    }));

    console.debug(`You pressed a key: ${displayChar}`);
  }

  render() {
    const previousRecord = getRecordFromCookie();
    const previousRecordElement = previousRecord ? (
      <p>Previous record: {previousRecord} keystrokes</p>
    ) : null;

    return (
      <div id="textboxes">
        {previousRecordElement}
        <p>Goal: "{this.state.goal}"</p>
        <textarea rows="1" id="counter" value={this.state.keyPressCount} readOnly />
        <textarea
          ref={this.mainTextInput}
          autoFocus="autofocus"
          id="mainTextInput"
          rows="1"
          cols="50"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyPress}
        />
        <textarea
          ref={this.keyDisplayInput}
          id="key-display"
          rows="2"
          cols="50"
          value={this.state.keyDisplay.join(',')}
        />
      </div>
    );
  }
}
