import React from 'react'
import '../Styles/Styles.css'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import APIURL from '../../../helpers/environment';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showGreeting: false
        }
    }
    
    handleNewUser = event => {
        event.preventDefault();
        let username = document.getElementById("usernameCreate").value
        let password = document.getElementById("passwordCreate").value
        let newUserData = {user: { username: username, password: password }}

        fetch(`${APIURL}/api/user/createuser`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(newUserData) 
            })
            .then(response => response.json())
            .then(response => {
                let token = response.sessionToken; 
                localStorage.setItem('SessionToken', token); 
                if (token !== undefined) {
                    this.setState({
                        showGreeting: true
                    })
                }
            
                this.props.renderLinks()
        });
    }
    
    renderGreeting() {
        if (!this.state.showGreeting) {
            return(
                <React.Fragment>
                    <p>Welcome to WineMaster! Signup Below:</p>
            
                    <form onSubmit={(event) => this.handleNewUser(event)}>
                        <TextField label="Create Username" type="text" name="username" id="usernameCreate" required={true}></TextField>
                    
                        &nbsp; &nbsp;
            
                        <TextField label="Create Password" type="password" name="passwordhash" id="passwordCreate" required={true} inputProps={{ minLength: 5 }}></TextField>
            
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