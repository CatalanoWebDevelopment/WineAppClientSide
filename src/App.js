import React, { Component } from 'react'
import Header from './components/sites/Header'
import Sidebar from './components/sites/Sidebar'
import Grid from '@material-ui/core/Grid'
import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from './components/sites/Styles/Theme'

 
import {
    BrowserRouter as Router
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
        <MuiThemeProvider theme={Theme}>
            <Grid container spacing={24} className="WineBackground">
                <Header />
                    <Router>
                        <Sidebar />
                    </Router>
            </Grid>
        </MuiThemeProvider>
    );
  }
}

export default App;
