import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
        <audio id = "end" preload = "auto" src = "../media/bell.wav"></audio>
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
      document.querySelector('end').play()
    }
    else if (this.props.timeLeft === 0 || this.props.timeLeft === null) {
      return <div></div>
    }
    return <h1>Осталось {this.props.timeLeft} секунд</h1>
  }
}


export default TimerWrapper;