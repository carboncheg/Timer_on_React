import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class TimerWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.startTimer = this.startTimer.bind(this);
      this.state = {
        timeLeft: null,   // Указывает на оставшееся время. Изначально равен null
        timer: null       // Отсылается на наш таймер. Изначально равен null
      };
    }
  
    startTimer(timeLeft) {   // Вызывается при нажатии на button
      clearInterval(this.state.timer);  // Избавляемся от запусков нескольких таймеров одновременно при нажатии на разные кнопки
      let timer = setInterval(() => {
        let timeLeft = this.state.timeLeft - 1;  // Отнимает 1 секунду от оставшегося времени
        if (timeLeft === 0) {    // Если оставшееся время равно 0,
          clearInterval(timer);  // очищаем таймер, чтоб таймер не уходил в минус
        }
        this.setState({
          timeLeft: timeLeft   // timeLeft из строки 10 равен timeLeft из строки 17
        });
      }, 1000);
      return this.setState({timeLeft: timeLeft, timer: timer});
    }
  
    render() {
      return(
        <div>
          <h2>Timer</h2>
          <div>
            <Button time = '5' startTimer = {this.startTimer}/>
            <Button time = '10' startTimer = {this.startTimer}/>
            <Button time = '15' startTimer = {this.startTimer}/>
          </div>
          <TimerDisplay timeLeft = {this.state.timeLeft}/>
          <audio id = "end" preload = "auto" src = "https://cloclo38.datacloudmail.ru/weblink/view/3duA/7CX7gBsRp?etag=8F02018E6396842FBB4BB9C002F84142CE7A68EB&key=4cc4a88a885da867606de14ef7d44014d8db9ba0"></audio>
        </div>
      )
    }
  }
  
  class Button extends React.Component {
    handleStartTimer() {
      return this.props.startTimer(this.props.time)
    }
    render() {
      return <button onClick = {this.handleStartTimer.bind(this)}>
        {this.props.time} секунд</button>
    }
  }
  
  class TimerDisplay extends React.Component {
    render() {
      if (this.props.timeLeft === 0) {
        document.getElementById("end").play()
      }
      if (this.props.timeLeft === 0 || this.props.timeLeft === null) {
        return <div></div>
      }
      return <h1>Осталось {this.props.timeLeft} секунд</h1>
    }
  }
  

ReactDOM.render(<TimerWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
