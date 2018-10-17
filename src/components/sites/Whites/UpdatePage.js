import React from 'react'
import '../Styles/Styles.css'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import { Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

export default class UpdatePage extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            name: this.props.wine.name,
            color: this.props.wine.color,
            apellation: this.props.wine.apellation,
            vintage: this.props.wine.vintage,
            country: this.props.wine.country,
            region: this.props.wine.region,
            score: this.props.wine.score,
            confidenceIndex: this.props.wine.confidence_index
        }
    }
    
    updateWine = event => {
        const accessToken = localStorage.getItem('SessionToken')
        
        let vintage = document.getElementById("vintageInput").value
        let color = document.getElementById("colorInput").value
        let apellation = document.getElementById("apellationInput").value
        let country = document.getElementById("countryInput").value
        let score = document.getElementById("scoreInput").value
        let confidenceIndex = document.getElementById("confidenceIndexInput").value
        let region = document.getElementById("regionInput").value
        let name = document.getElementById("nameInput").value
        
        let updatedWine = { wine: { vintage: vintage, color: color, apellation: apellation, country: country, score: score, confidence_index: confidenceIndex, region: region, name: name } }
        
        fetch(`http://localhost:3000/wines/update/${this.props.wine.id}`, {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }),
            body: JSON.stringify(updatedWine)
        })
        .then(response => response.json())
        .then(response => { 
            this.props.showUpdate()
        })
    }
    
    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    render() {
        return (
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <h2>Updating: {this.state.name}, {this.state.vintage}</h2>
                    <form onSubmit={(event) => this.updateWine(event)}>
                        <TextField label="Name" value={this.state.name} name="name" id="nameInput" onChange={(event) => this.handleOnChange(event)} />
            
                        <br />
            
                        <TextField label="Vintage" value={this.state.vintage} name="vintage" id="vintageInput" onChange={(event) => this.handleOnChange(event)} />
            
                        <br />
            
                        <TextField label="Color" value={this.state.color} name="color" id="colorInput" onChange={(event) => this.handleOnChange(event)} />
            
                        <br />
            
                        <TextField label="Country" value={this.state.country} name="country" id="countryInput" onChange={(event) => this.handleOnChange(event)} />
            
                        <br />
            
                        <TextField label="Region" value={this.state.region} name="region" id="regionInput" onChange={(event) => this.handleOnChange(event)} />
            
                        <br />
            
                        <TextField label="Apellation" value={this.state.apellation}  name="apellation" id="apellationInput" onChange={(event) => this.handleOnChange(event)} />
            
                        <br />
            
                        <TextField label="Score" value={this.state.score} name="score" onChange={(event) => this.handleOnChange(event)} id="scoreInput" />
            
                        <br />
            
                        <TextField label="Confidence Index" value={this.state.confidenceIndex} name="confidenceIndex" id="confidenceIndexInput" onChange={(event) => this.handleOnChange(event)} />
            
                        <br /><br />
            
                        <Button color="default" variant="contained" type="submit">Update</Button>
                    </form>
                </Grid>
            </Grid>
        )
    }
} 