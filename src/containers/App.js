import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as widgetActions from '../actions/widgets.actions';
import '../styles/containers/App.css';

import Widget from '../components/Widget';
import AddWidget from '../components/AddWidget';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverDrop: null,
      firstDropoff: null
    };
  };

  componentDidMount() {
    this.setState({ firstDropoff : ReactDOM.findDOMNode(this.refs.dropoff_0) });
  }

  render() {
    return (
      <div className="App">
        <div className="App-sidebar"></div>

        <div className="App-content">
          <div className="App-content__header">
            <div className="App-content__header--left">
              <span>Team Dashboard</span>
            </div>
            <div className="App-content__header--right">
              <AddWidget 
                actions={this.props.actions}
                widgets={this.props.widgets}
              />
            </div>
          </div>

          <div className="App-content__body">
            {this.props.widgets.map((widget, index) => 
              <Widget 
                key={index}
                widget={widget}
                actions={this.props.actions}
                firstDropoff={this.state.firstDropoff}
                handleDragStart={this.handleDragStart}
              />
            )}
            
            <div className="grid-container">
              {Array.from(Array(6).keys()).map(index => 
                <div className="grid-item" key={index}>
                  <div ref={`dropoff_${index}`} className={this.state.hoverDrop === index ? 'dropoff-zone active' : 'dropoff-zone'}
                    onDrop={(event) => this.handleDrop(event)}
                    onDragOver={(event) => this.allowDrop(event)}
                    onDragEnter={() => this.colorize(index)}
                    onDragLeave={() => this.uncolorize()}>Drop here</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  colorize = (index) => {
    this.setState({
      hoverDrop: index
    })
  }

  uncolorize = () => {
    this.setState({
      hoverDrop: null
    })
  }

  handleDragStart = (event, widget) => {
    event.dataTransfer.setData('widget', JSON.stringify(widget)); 
  }

  handleDrop = (event) => {
    event.preventDefault();
    let widget = JSON.parse(event.dataTransfer.getData('widget'));
    this.props.actions.editWidget({
      ...widget,
      top: event.target.offsetTop,
      left: event.target.offsetLeft,
      width: event.target.offsetWidth,
      height: event.target.offsetHeight
    });
    this.uncolorize();
  }

  allowDrop = (event) => {
    event.preventDefault();
  }
}

function mapStateToProps(state) {
  return {
    widgets: state.widgets
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(widgetActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
