import React, { Component } from 'react'
import '../Styles/Styles.css'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import APIURL from '.../helpers/environment';

export default class LoginBox extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showGreeting: false
        }
    }
    
    handleLogin = event => {
        event.preventDefault();
        let username = document.getElementById("usernameSignIn").value
        let password = document.getElementById("passwordSignIn").value
        let userData = {user: { username: username, password: password }}
        
        fetch(`${APIURL}/api/user/signin`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(response => {
            let token = response.sessionToken
            localStorage.setItem('SessionToken', token)
                if (token !== undefined) {
                    this.setState({
                        showGreeting: true
                })
            }
            
            this.props.renderLinks()
        })
    }
    
    renderGreeting() {
        if (!this.state.showGreeting) {
            return(
                <React.Fragment>
                    <p>Welcome to WineMaster! Login Below:</p>
            
                    <form onSubmit={(event) => this.handleLogin(event)}>
                        <TextField label="Username" type="text" name="username" id="usernameSignIn"></TextField>
                    
                        &nbsp; &nbsp;
            
                        <TextField label="Password" type="password" name="passwordhash" id="passwordSignIn"></TextField>
            
                        <br /><br />
            
                        <Button color="default" type="submit" variant="contained">Submit</Button>
                    </form>
                </React.Fragment>
            )
        }
         
        return(
             <p>Success! You're in.</p>
        )
    }
    
    render() {
        return(
            <Grid container spacing={8} className="gridContainer centered">
                <Grid item xs={12}>
                    {this.renderGreeting()}
                </Grid>
            </Grid>
        )
    }
}