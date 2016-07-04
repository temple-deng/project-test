import React from 'react';
import ReactDOM from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {cyan500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500
  },
  appBar: {
    height: 50
  }
});


const App = () => (
  <div>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div>
        <div>两种主题</div>
        <div>darkBaseTheme</div>
        <RaisedButton label='default' />
        <AppBar title="My AppBar" />
      </div>
    </MuiThemeProvider>
    <MuiThemeProvider>
      <div>
        <div>lightBaseTheme</div>
        <RaisedButton label='default' />
        <AppBar title="My AppBar" />
      </div>
    </MuiThemeProvider>
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <div>定制化主题内容， 修改了字体的颜色和AppBar组件的高度</div>
        <AppBar title="My AppBar" />
      </div>
    </MuiThemeProvider>
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
