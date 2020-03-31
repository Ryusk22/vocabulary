import React from "react"
import Button from '@material-ui/core/Button';
import axios from 'axios'


class Quiz extends React.Component {
  state = {
    userAnswer: null,
    userAnswers: [],
    currentQuestion: 0,
    options: [],
    quizEnd: false,
    score: 0,
    correctRate: 0,
    disabled: true
  }

  loadQuiz = () => {
    const random = Math.floor( Math.random() * 10 ) ;
    const {currentQuestion} = this.state;
    const answer = this.props.questions[0][currentQuestion].question;
    const answer_discription = this.props.questions[0][currentQuestion].discription;
    const option1 = this.props.questions[1][random].question;
    const option2 = this.props.questions[2][random].question;
    const options = this.state;

    if ( option1 !== option2 && option1 !== answer && option2 !== answer) 
      { this.setState(() => {  
        return {
        answer: answer,
        answer_discription: answer_discription,
        option1: option1,
        option2: option2,
        options: _.shuffle([answer, option1, option2]) }
      });
      }
    else 
      {
        console.log("同じやぞ！！！！！") 
        this.loadQuiz(); 
      }
  }

  componentDidMount() {
    this.loadQuiz();
  }

  // ユーザーの回答を配列に追加
  addUserAnswersArray = () => {
    console.log("addUsersAnswersArray");
    const userAnswer = this.state.userAnswers.concat([this.state.userAnswer]);
    this.setState({ userAnswers: userAnswer  })
  }
  
  nextQuestionsHandler = () => {
    this.addUserAnswersArray();
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    })
    this.addScoreHandler();
  }

  // nextQuestionsHandlerのみで次の問題を表示させようとすると、
  // currentQuestion: this.state.currentQuestion + 1
  // が更新される前に問題表示して問題が変わらないため、addScoreHandlerにて対応
  addScoreHandler = () => {
    const random = Math.floor( Math.random() * 10 ) ;
    const {currentQuestion, options, userAnswer, score} = this.state;
    const answer = this.props.questions[0][currentQuestion].question;
    const answer_discription = this.props.questions[0][currentQuestion].discription;
    const option1 = this.props.questions[1][random].question;
    const option2 = this.props.questions[2][random].question;

    if(userAnswer === answer) {
      this.setState({ 
        score: score + 1
      })
    }

    if(option1 !== option2 && option1 !== answer && option2 !== answer) {
      this.setState(() => {
        return {
          disabled: true,
          answer: this.props.questions[0][currentQuestion].question,
          answer_discription: this.props.questions[0][currentQuestion].discription,
          option1: this.props.questions[1][random].question,
          option2: this.props.questions[2][random].question,
          options: _.shuffle([answer, option1, option2]) }
        }
      );
    }
    else 
    {
      this.addScoreHandler();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.currentQuestion !== prevState.currentQuestion) {
      console.log("componentDidUpdate");
      this.addScoreHandler();
    }
  }

  checkAnswer = answer => {
    this.setState({
      userAnswer: answer,
      disabled: false
    })
  }

  finishHandler = () => {
    this.addUserAnswersArray();
    this.addScoreHandler();
    if(this.state.currentQuestion === this.props.questions[0].length - 1){
      console.log("finishHandler");
      this.setState({ 
        quizEnd: true
      });
    }
  }

  render () {
    const {answer_discription, options, currentQuestion, userAnswer, quizEnd, userAnswers} = this.state;
    const questions = this.props.questions[0]
    if(quizEnd) {
      const questions = this.props.questions[0]
      console.log(questions);
      return (
        <div>
          <h2>終了でござる。正答率は{this.state.score /　questions.length * 100 }%です。</h2>
            <p>正解一覧</p>
            <ul className="list-group">
              {questions.map((question, index) => (
                <li className={`list-group-item
                                ${question.question === userAnswers[index] ? "correct" : "incorrect"} 
                              `}
                    key={index}>
                  <p>第{index + 1}問:　{question.discription} {question.question === userAnswers[index] ? "⭕️" : "🙅‍♂️"}  </p>
                  <p>正解:　{question.question}</p>
                  <p>回答:　{userAnswers[index]}</p>
                </li>
              ))}
            </ul>
        </div>
      )
    }

    console.log(this.state);
    return (
      <div className="App">
        <h3> {answer_discription} </h3>
        <span>{ `第 ${currentQuestion + 1}問 / ${questions.length}問`}</span>
        <ul className="list-group">
        {options.map((option, index) => (
          <li key={index}
              onClick={() => this.checkAnswer(option, index)}
              className={`list-group-item
                          ${userAnswer === option ? "active" : null}             
                        `}>
            {option}
          </li>
        ))}
        </ul>
        {currentQuestion < questions.length - 1 &&
          <Button
            onClick={this.nextQuestionsHandler}
            variant="outlined"
            color="primary"
            disabled={this.state.disabled}
            style={{marginTop: "3em",
                    marginBottom: "5em"}}
          >NEXT</Button>
        }
        {currentQuestion === questions.length - 1 &&
          <Button
            onClick={() => this.finishHandler()} 
            variant="outlined" 
            color="secondary"
            disabled={this.state.disabled}
            style={{marginTop: "3em",
                    marginBottom: "5em"}}
          >FINISH</Button>
            
        }
      </div>
    );
  }
}

export default Quiz;
