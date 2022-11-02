import React from "react";
import { Form } from "react-bootstrap";

class Options extends React.Component {
  render() {
    const questionNumber = this.props.questionNumber;

    const options = this.props.options.map((option, optionNumber) => {
      return (
        <Form.Check
          type="radio"
          key={"option_" + questionNumber + "_" + optionNumber}
          id={"option_" + questionNumber + "_" + optionNumber}
          name={"question_" + questionNumber}
          value={questionNumber + "_" + optionNumber}
          label={option}
          onChange={this.props.onAnswer}
          disabled={this.props.isSubmitted}
        />
      );
    });

    return <div className="options">{options}</div>;
  }
}

export default Options;
