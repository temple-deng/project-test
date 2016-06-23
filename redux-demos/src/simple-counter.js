/**
 * 简单计数器页面根组件
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

function incrementCounter() {
  return {
    type: 'INCREMENT_COUNTER'
  };
}

function decrementCounter() {
  return {
    type: 'DECREMENT_COUNTER'
  };
}

function resetCounter() {
  return {
    type: 'Reset_Counter'
  };
}

function reducer(oldState = { num: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT_COUNTER' :
      return {
        num: oldState.num + 1
      };
    case 'DECREMENT_COUNTER' :
      return {
        num: oldState.num - 1
      };
    case 'Reset_Counter' :
      return {
        num: 0
      };
    default :
      return oldState;
  }
}

let store = createStore(reducer, { num: 0 });

class RootComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: props.store.getState().num
    };
    this.handleIncre = this.handleIncre.bind(this);
    this.handleDecre = this.handleDecre.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleIncre() {
    this.props.store.dispatch(incrementCounter());
    this.setState({
      num: this.props.store.getState().num
    });
  }

  handleDecre() {
    this.props.store.dispatch(decrementCounter());
    this.setState({
      num: this.props.store.getState().num
    });
  }

  handleReset() {
    this.props.store.dispatch(resetCounter());
    this.setState({
      num: this.props.store.getState().num
    });
  }

  render() {
    return (
      <div className="main">
        <DisplayCounters number={this.state.num} />
        <ButtonLine incre={this.handleIncre} decre={this.handleDecre} reset={this.handleReset} />
      </div>
    );
  }
}

class DisplayCounters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span>Now the counter number is :</span>
        <span>{this.props.number}</span>
      </div>
    );
  }
}

class ButtonLine extends React.Component {
  constructor(props) {
    super(props);
    this.handleIncreClick = this.handleIncreClick.bind(this);
    this.handleDecreClick = this.handleDecreClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  handleIncreClick() {
    this.props.incre();
  }

  handleDecreClick() {
    this.props.decre();
  }

  handleResetClick() {
    this.props.reset();
  }

  render() {
    return (
      <div className="btn-line">
        <button className="incre-btn" onClick={this.handleIncreClick}>
          Increment!
        </button>
        <button className="decre-btn" onClick={this.handleDecreClick}>
          Decrement!
        </button>
        <button className="reset-btn" onClick={this.handleResetClick}>
          Reset!
        </button>
      </div>
    );
  }
}

ReactDOM.render(<RootComponent store={store} />, document.getElementById('wrapper'));
