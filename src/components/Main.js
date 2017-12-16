require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let timeArray = [5, 45, 45];
const EXP_MIN = 1000; // should be changed to 1000 * 60 when handed in

class Washer extends React.Component {
  constructor() {
    super();
    this.state = {
      // 0 - not being used && no clothes in washer
      // 1 - someone else is using it
      // 2 - you are using it
      // 3 - not being used && clothes in washer
      user: 0,
      text: 'Not being used.',
      time: 0
    };
    this.handleClickOn = this.handleClickOn.bind(this);
    this.handelClickGetClothes = this.handelClickGetClothes.bind(this);
    this.timeOn = this.timeOn.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
    if (this.timerID) clearInterval(this.timerID);
  }

  timeOn() {
    let mins = timeArray[this.props.order];
    this.setState({
      time: mins
    });
    this.timerID = setInterval(() => this.tick(), EXP_MIN);
    this.timer = setTimeout(() => {
      this.setState({
        time: 0,
        user: 3,
        text: 'You can get your clothes.'
      });
      alert('Get your clothes.');
    }, EXP_MIN * mins);
  }

  tick() {
    if (this.state.time == 0) {
      clearInterval(this.timerID);
      return;
    }
    this.setState((prevState) => ({
      time: prevState.time - 1
    }));
  }

  handleClickOn(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.user == 1) {
      alert('It is being used.');
      return;
    }
    else if (this.state.user == 2) {
      alert('You\'ve already turn the washer on.');
      return;
    }
    else if (this.state.user == 3) {
      alert('You need to get the clothes out.');
      return;
    }
    this.setState({
      user: 2,
      text: 'Being used.'
    },
      () => {
        this.timeOn();
      }
    );
    return;
  }

  handelClickGetClothes(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.user == 2 || this.state.user == 1) {
      alert('Don\' do this.');
      return;
    }
    else if (this.state.user == 0) {
      alert('No clothes in the washer.');
    }
    this.setState({
      user: 0,
      text: 'Not being used.'
    });
  }

  render() {
    return (
      <div className="Washer">
        Washer No.{this.props.order}
        <p className="Clock">
          Time: {this.state.time}
        </p>
        <p>
          {this.state.text}
          <button className="On" onClick={this.handleClickOn} >On</button>
          <button className="GetClothes" onClick={this.handelClickGetClothes}>
            Get Clothes
          </button>
        </p>
      </div>
    );
  }
}

class List extends React.Component {
  render() {
    return (
      <div className="List">
        <Washer order={0} />
        <Washer order={1} />
        <Washer order={2} />
      </div>
    );
  }
}

class AppComponent extends React.Component {
  render() {
    return (
      <List />
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
