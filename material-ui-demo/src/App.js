import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import DatePickerExampleSimple from './index'

const styles = {
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  }
};

//class DialogExampleSimple extends React.Component {
//  constructor(props){
//    super(props);
//    this.state = {
//      open: false
//    };
//    this.handleOpen = this.handleOpen.bind(this);
//    this.handleClose = this.handleClose.bind(this);
//  }
//
//  handleOpen(){
//    this.setState({open: true});
//  }
//
//  handleClose(){
//    this.setState({open: false});
//  }
//
//  render() {
//    const actions = [
//      <FlatButton
//        label="Cancel"
//        primary={true}
//        onTouchTap={this.handleClose}
//      />,
//      <FlatButton
//        label="Submit"
//        primary={true}
//        keyboardFocused={true}
//        onTouchTap={this.handleClose}
//      />
//    ];
//
//    return (
//      <div>
//        <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
//        <Dialog
//          title="Dialog With Actions"
//          actions={actions}
//          modal={false}
//          open={this.state.open}
//          onRequestClose={this.handleClose}
//        >
//          The actions in this window were passed in as an array of React objects.
//        </Dialog>
//      </div>
//    );
//  }
//}

const FlatButtons = () => (
  <div>
    <DatePicker hintText="Weekends Disabled"  />
    <DatePicker hintText="Portrait Dialog" />
  </div>
);

ReactDOM.render(
  <MuiThemeProvider><DatePickerExampleSimple /></MuiThemeProvider>,
  document.getElementById('app')
);
