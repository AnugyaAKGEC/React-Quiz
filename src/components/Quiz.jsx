import React from "react";
import { Navbar, Container } from "react-bootstrap";

import Content from "./Content";
import Results from "./Results.jsx";
import SearchBar from "./SearchBar";

import { questionService } from "../_services";

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredQuestions: [],
      allQuestions: [],
      currentAnswers: [],
      results: {
        correct: 0,
        total: 0,
        passed: false,
      },
      isAllAnswered: false,
      isSubmitted: false,
    };
  }

  handleSearch(e) {
    const searchText = e.target.value;

    const filteredQuestions = this.state.allQuestions.filter((question) => {
      var regex = new RegExp(searchText, "i");
      return regex.test(question.label);
    });

    this.setState({
      filteredQuestions: filteredQuestions,
    });
  }

  handleAnswer(e) {
    const currentAnswers = this.recordAnswer.apply(
      this,
      e.target.value.split("_")
    );

    const isAllAnswered = this.checkIfAllAnswered();

    this.setState({
      currentAnswers: currentAnswers,
      isAllAnswered: isAllAnswered,
    });
  }

  handleSubmit() {
    this.checkAnswers();
  }

  componentDidMount() {
    questionService.getAll().then((response) => {
      var questionsFromAPI = response.data.map((qelement) => ({
        number: qelement.id,
        label: qelement.attributes.Question,
        options: qelement.attributes.Answers.options,
        correctOption: qelement.attributes.Answers.correct,
      }));

      questionsFromAPI.sort(() => Math.random() - 0.5);

      questionsFromAPI = questionsFromAPI.slice(0, 15);

      this.setState({
        filteredQuestions: questionsFromAPI,
        allQuestions: questionsFromAPI,
      });
    });
  }

  render() {
    const { REACT_APP_APP_NAME } = process.env;
    const questions = this.state.filteredQuestions;
    const currentAnswers = this.state.currentAnswers;
    const isAllAnswered = this.state.isAllAnswered;
    const isSubmitted = this.state.isSubmitted;
    const results = this.state.results;
    let resultsElem = "";

    if (isSubmitted) {
      resultsElem = <Results results={results} />;
    }

    return (
      <Container fluid className="quiz-container">
        <Navbar className="nav-color" variant="dark" sticky="top">
          <Container className="nav-container">
            <Navbar.Brand href="#home">
              {REACT_APP_APP_NAME ?? "React   Quiz"}
            </Navbar.Brand>
            <SearchBar onSearch={(e) => this.handleSearch(e)} />
          </Container>
        </Navbar>
        <Container className="content-container">
          {resultsElem}
          <Content
            questions={questions}
            currentAnswers={currentAnswers}
            onAnswer={(e) => this.handleAnswer(e)}
            onSubmit={() => this.checkAnswers()}
            isAllAnswered={isAllAnswered}
            isSubmitted={isSubmitted}
          />
        </Container>
      </Container>
    );
  }

  shuffle(array) {
    return array;
  }

  /**
   * Record each answer as it happens
   */
  recordAnswer(questionNumber, answerNumber) {
    const currentAnswers = this.state.currentAnswers;

    const data = {
      answer: parseInt(answerNumber),
    };

    currentAnswers["question_" + questionNumber] = data;

    return currentAnswers;
  }

  /**
   * Check if all has been answered
   */
  checkIfAllAnswered() {
    const currentAnswers = this.state.currentAnswers;

    const questions = Object.keys(this.state.allQuestions).length;
    const answers = Object.keys(currentAnswers).length;

    return answers === questions;
  }

  /**
   * Check if answers are correct
   */
  checkAnswers() {
    const currentAnswers = this.state.currentAnswers;

    let results = {
      correct: 0,
      total: Object.keys(currentAnswers).length,
      passed: false,
    };

    for (const key in currentAnswers) {
      const qNumber = key.split("_")[1];
      const isCorrect =
        this.state.allQuestions.find((q) => q.number === qNumber)
          .correctOption === currentAnswers[key].answer;

      currentAnswers[key].isCorrect = isCorrect;
      results.correct = isCorrect ? ++results.correct : results.correct;
    }

    results.passed = results.correct / results.total >= 0.7;

    this.setState({
      currentAnswers: currentAnswers,
      isSubmitted: true,
      results: results,
    });
  }
}

export default Quiz;
