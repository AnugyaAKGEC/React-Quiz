import React from "react";
import { Form, Button } from "react-bootstrap";

import Question from "./Question";

class Content extends React.Component {
  render() {
    const currentAnswers = this.props.currentAnswers;

    const isAllAnswered = this.props.isAllAnswered;
    const isSubmitted = this.props.isSubmitted;

    const questions = this.props.questions.map((question, number) => {
      return (
        <Question
          position={number}
          question={question}
          key={"question_" + question.number}
          onAnswer={this.props.onAnswer}
          currentAnswers={currentAnswers}
          isSubmitted={isSubmitted}
        />
      );
    });

    return (
      <Form className="form-striped">
        {questions}
        <Button
          variant="secondary"
          onClick={this.props.onSubmit}
          disabled={!isAllAnswered || isSubmitted}
          className="mx-3 mt-2 mb-4"
        >
          Check your answers
        </Button>
      </Form>
    );
  }
}

export default Content;
