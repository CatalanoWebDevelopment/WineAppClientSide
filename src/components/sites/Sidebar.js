import React, { Component } from 'react'
import Home from './Home/Home'
import Reds from './Reds/Reds'
import Whites from './Whites/Whites'
import UserFavoritesContainer from './Profile/UserFavoritesContainer'
import WinesAPI from './WineApi/WineAPI'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Styles from './Styles/Styles.css'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import {
    Route, 
    Link,
    Switch
} from 'react-router-dom'

const ListItem = styled.li`
    list-style: none;
    padding: 3px;
    display: inline-block;
`

class Sidebar extends Component {
    constructor() {
        super()
        
        this.state = {
            showNavigation: false
        }
    }
    
    logout = () => {
        localStorage.clear();
        this.setState({
            showNavigation: false
        })
    }
    
    renderNavigationOnLogin = () => {
        if (!localStorage.getItem('SessionToken')) {
            return 
        } 
         
        this.setState({
            showNavigation: true
        })
    }
    
    renderLinks() {
        if (this.state.showNavigation) {
            return(
            <React.Fragment>
                <ListItem><Link to="/reds"><Tab label="Reds" className="largeFont" /></Link></ListItem>
                <ListItem><Link to="/whites"><Tab label="Whites" className="largeFont" /></Link></ListItem>
                <ListItem><Link to="/user_favorites"><Tab label="User Favorites" className="largeFont" /></Link></ListItem>
                <ListItem><Link to="/search_wines"><Tab label="Explore Wines" className="largeFont" /></Link></ListItem>
                <ListItem onClick={this.logout}><Link to="/"><Tab label="Logout" className="largeFont" /></Link></ListItem>
            </React.Fragment>
            )
        }
    }
    
    componentDidMount() {
        this.renderNavigationOnLogin()
    }
    
    render() {
        return (
            <Grid item xs={12}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <ul className="centered">
                            <ListItem><Link to="/"><Tab label="Home" className="largeFont" /></Link></ListItem>
                            {this.renderLinks()}
                        </ul>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Switch>
                            <Route exact path="/"><Home renderSideBar={this.renderNavigationOnLogin} /></Route>
                            <Route exact path="/reds"><Reds /></Route>
                            <Route exact path="/whites"><Whites /></Route>
                            <Route exact path="/user_favorites"><UserFavoritesContainer /></Route>
                            <Route exact path="/search_wines"><WinesAPI /></Route>
                        </Switch>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
    
}

export default Sidebar;