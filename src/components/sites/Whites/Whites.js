import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Styles from '../Styles/Styles.css';
import TextField from '@material-ui/core/TextField';
import ShowPage from './ShowPage'
import APIURL from '.../helpers/environment';

export default class Reds extends Component {
    constructor() {
        super()
        
        this.state = {
            showCreateForm: false,
            wines: [],
            refresh: false
        }
    }
    
    componentWillMount() {
        this.loadAllWines()
    }
    
    loadAllWines = () => {
        const accessToken = localStorage.getItem('SessionToken')
        
        fetch(`${APIURL}/wines/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            let filteredWines = data.filter(wine => wine.color === "White" || wine.color === "white")
            filteredWines.map(wine => {
                this.setState({
                    wines: [...this.state.wines, wine]
                })
                
                return this.state.wines 
            })
        })
    }
    
    switchState = () => {
        if (!this.state.showCreateForm) {
            this.setState({
                showCreateForm: true
            })
        } else {
            this.setState({
                showCreateForm: false
            })
        }
    }
    
    createWine = event => {
        let vintage = document.getElementById("vintageInput").value
        let color = document.getElementById("colorInput").value
        let apellation = document.getElementById("apellationInput").value
        let country = document.getElementById("countryInput").value
        let score = document.getElementById("scoreInput").value
        let confidenceIndex = document.getElementById("confidenceIndexInput").value
        let region = document.getElementById("regionInput").value
        let name = document.getElementById("nameInput").value
        
        let newWine = { wine: { vintage: vintage, color: color, apellation: apellation, country: country, score: score, confidence_index: confidenceIndex, region: region, name: name } }
        
        fetch(`${APIURL}/wines/create`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('SessionToken')
            },
            body: JSON.stringify(newWine)
        })
        .then(response => response.json())
        .then(response => {
            let displayData = document.getElementById("displayData")
            let p = document.createElement("p");
            
            while (displayData.firstChild) {
                displayData.removeChild(displayData.firstChild)
            }
            
            p.innerHTML = `<h1>Your Created Wine Result:</h1><p>Name: ${response.name}</p><p>Vintage: ${response.vintage}</p><p>Color: ${response.color}</p><p>Apellation: ${response.apellation}</p><p>Country: ${response.country}</p><p>Region: ${response.region}</p><p>Score: ${response.score}</p><p>Confidence Index: ${response.confidence_index}</p>` 
            
            this.setState({
                refresh: true
            })
            
            return displayData.appendChild(p);
        })
    }
    
    renderCreateForm = () => {
        if (this.state.showCreateForm) {
            return (
            <form className="marginTop" onSubmit={this.createWine}>
                <TextField label="Vintage" type="number" name="vintage" id="vintageInput"></TextField>
                
                <br />
                
                <TextField label="Name" type="text" name="name" id="nameInput"></TextField>
                
                <br />
                
                <TextField label="Color" type="text" name="color" id="colorInput"></TextField>
                
                <br />

                <TextField label="Apellation" type="text" name="apellation" id="apellationInput"></TextField>
                
                <br />
                
                <TextField label="Country" type="text" name="country" id="countryInput"></TextField>
                
                <br />
                
                <TextField label="Region" type="text" name="region" id="regionInput"></TextField>
                
                <br />
                
                <TextField label="Score" type="number" name="score" id="scoreInput"></TextField>
                
                
                <br />
                
                <TextField label="Confidence Index" type="text" name="confidence_index" id="confidenceIndexInput"></TextField>
                
                <br /><br />
                
                <Button color="default" type="submit" variant="contained" onSubmit={(event) => this.createWine(event)}>Create</Button>
            </form>
            )
        } 
    }
    
    refreshPage = () => {
        if (!this.state.refresh) {
            this.setState({
                refresh: true
            }) 
        } else {
            this.setState({
                refresh: false
            })
        }
    }
    
    render() {
        return(
            <Grid container spacing={24}>
                <Grid item xs={6} className="centered">
                    <h2>Created Wines</h2>
                    <ShowPage wines={this.state.wines} refresh={this.refreshPage} loadWines={this.loadAllWines}/>
                </Grid>

                <Grid item xs={6} className="centered">
                    <Button color="default" variant="contained" onClick={this.switchState}>Create a New White Wine</Button>
                    
                    {this.renderCreateForm()} 
                </Grid>

                <Grid item xs={12} className="centered">
                    <div id="displayData"></div>
                </Grid>
            </Grid>
        )
    } 
}