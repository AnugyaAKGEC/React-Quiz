import React from "react";
import { Form } from "react-bootstrap";

import Options from "./Options";

class Question extends React.Component {
  render() {
    let result = "";
    const { position, question, currentAnswers } = this.props;
    const correctAnswer = question.options[question.correctOption];
    const isCorrect = currentAnswers[`question_${question.number}`]?.isCorrect;

    switch (isCorrect) {
      case true:
        result = (
          <div className="text-success mt-2">
            <span
              className="oi oi-check mr-1"
              title="Correct"
              aria-hidden="true"
            ></span>
            <span>Correct!</span>
          </div>
        );
        break;
      case false:
        result = (
          <div className="text-danger mt-2">
            <span
              className="oi oi-x mr-1"
              title="Incorrect"
              aria-hidden="true"
            ></span>
            <span>Oops! The right answer was "{correctAnswer}"</span>
          </div>
        );
        break;

      default:
        break;
    }

    return (
      <Form.Group controlId={"formQuestion" + question.number}>
        <Form.Label>{`${position + 1}. ${question.label}`}</Form.Label>
        <Options
          questionNumber={question.number}
          options={question.options}
          onAnswer={this.props.onAnswer}
          isSubmitted={this.props.isSubmitted}
        />
        <Form.Text>{result}</Form.Text>
      </Form.Group>
    );
  }
}

export default Question;
