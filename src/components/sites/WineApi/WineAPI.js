import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Styles from '../Styles/Styles.css'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';  

export default class WineAPI extends Component {
    constructor() {
        super();
        
        this.state = {
            order: ''
        }
    }
    
    handleOrderChange = event => {
        event.preventDefault()

        this.setState({ order: event.target.value })
    }
    
    fetchAPI = event => {
        event.preventDefault()
        
        let vintage = document.getElementById("vintageInput").value
        let color = document.getElementById("colorInput").value
        let lwin = document.getElementById("lwinInput").value
        let limit = document.getElementById("limitInput").value
        let ordering = document.getElementById("orderInput").value
        
        fetch(`https://api.globalwinescore.com/globalwinescores/latest/?wine_id=&vintage=${vintage}&color=${color}&is_primeurs=&lwin=${lwin}&lwin_11=&limit=${limit}"&offset=100&ordering=${ordering}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.WINE_API
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data)
        })
    }
    
    render() {
        return (
            <Grid container spacing={8}>
                <Grid item xs={12} className="centered">
                    <p>Don't know what L-WIN is? Click <a href="https://www.liv-ex.com/lwin/" target="_blank">HERE</a>.</p>
                </Grid>
            
                <Grid item xs={12} className="centered">
                    <form onSubmit={this.fetchAPI}>
                        <TextField label="Vintage" type="number" name="vintage" id="vintageInput"></TextField>
            
                        <br />
            
                        <TextField label="Color" type="text" name="color" id="colorInput"></TextField>
            
                        <br />
            
                        <TextField label="L-WIN" type="number" name="lwin" id="lwinInput"></TextField>
            
                        <br />
            
                        <TextField label="Limit Results By" type="number" name="limit" id="limitInput"></TextField>
            
                        <br /><br />
            
                        <InputLabel htmlFor="orderInput">How Would You Like to Order This? </InputLabel>
                            
                        <Select
                            onChange={this.handleOrderChange}
                            value={this.state.order}
                            inputProps={{
                                name: 'order',
                                id: 'orderInput'
                            }}
                        > 
                        
                        <MenuItem value="date">Date (Ascending)</MenuItem>
                        <MenuItem value="-date">Date (Descending) </MenuItem>
                        <MenuItem value="score">Score (Ascending)</MenuItem>
                        <MenuItem value="-score">Score (Descending)</MenuItem>
            
                        </Select>
                        
                        <br /><br />
        
                        <Button type="submit" variant="contained">Query Wine</Button>
                    </form>
                </Grid>
            </Grid>
        )
    }
}