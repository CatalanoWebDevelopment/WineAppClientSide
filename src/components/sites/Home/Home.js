import React, { Component } from 'react'
import '../Styles/Styles.css'
import Grid from '@material-ui/core/Grid'
import Login from './Login'
import Signup from './Signup'
 
export default class Home extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            isLoginOpen: true,
            isRegisterOpen: false
        }
    }

    renderLogin = () => {
        this.setState({
            isLoginOpen: true,
            isRegisterOpen: false
        })
    }
    
    renderRegister = () => {
        this.setState({
            isRegisterOpen: true,
            isLoginOpen: false
        })
    }
    
    render() {
        return(
            <Grid container spacing={8} className="gridContainer centered ">
                <Grid item xs={12}>
                    <div className="buttonController">
                        <div onClick={this.renderLogin} className={'control' + ' ' + (this.state.isLoginOpen === true ? 'leftActive' : '')}>Login</div>

                        <div onClick={this.renderRegister} className={'control' + ' ' + (this.state.isRegisterOpen === true ? 'rightActive' : '')}>Signup</div>
                    </div>

                    {this.state.isLoginOpen === true && <Login renderLinks={this.props.renderSideBar} />}
                    {this.state.isRegisterOpen === true && <Signup renderLinks={this.props.renderSideBar} />}
                </Grid>
            </Grid>
        )
    }
}
