import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import UpdatePage from './UpdatePage'
import Styles from '../Styles/Styles.css'
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import UpdateModal from './UpdateModal'
import APIURL from '.../helpers/environment';

export default class ShowPage extends Component {
    constructor(props) { 
        super(props)
        
        this.state = {
            showUserLists: false,
            showUpdatePage: false,
            wineToUpdate: {},
            wineLists: [],
            userId: '',
            listId: ''
        }
    }
     
    componentWillMount() {
        let token = localStorage.getItem('SessionToken');
        
        fetch(`${APIURL}/api/user/me`, {
            method: "GET",
            headers: {
                'Authorization': token
            }
        }).then(response => response.json())
        .then(data => {
           this.setState({
               userId: data.id
           })
        })
        
        this.fetchAllLists();
    }
    
    deleteWine = event => {
        let id = event.target.id
        const accessToken = localStorage.getItem('SessionToken')
        
        fetch(`${APIURL}/wines/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': accessToken
            }
        }).then(response => response.json()).then(response => {
            this.props.refresh()
        })
    }
     
    renderUpdate = () => {
        if (this.state.showUpdatePage) {
            this.setState({
                showUpdatePage: false
            })
        } else {
            this.setState({
                showUpdatePage: true
            })
        }
    }
    
    updateWine = event => {
        event.preventDefault()
        let id = event.target.id
        const accessToken = localStorage.getItem('SessionToken')
        
        fetch(`${APIURL}/wines/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': accessToken
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            if(this.state.showUpdatePage === false) {
                this.setState({ showUpdatePage: true, wineToUpdate: data  })
            } else {
                this.setState({ showUpdatePage: false, wineToUpdate: {} })
            }
            
            return this.state.wineToUpdate
        })
        
        
    }
    
    addToUserList = event => {
        event.preventDefault();
        let wineId = event.target.id
        let listId = this.state.listId
        
        fetch(`${APIURL}/user-favorites/create/${wineId}/list/${listId}`, {
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem('SessionToken'),
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(response => window.alert(`Successfully added!`))
        
    }
    
    fetchAllLists = () => {
        fetch(`${APIURL}/favorites-list/all`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('SessionToken')
            }
        }).then(response => response.json())
        .then(response => {
            this.setState({
                wineLists: response
            })
        })
    }
      
    handleListId = event => {
        event.preventDefault();
        
        this.setState({
            listId: event.target.value
        })
    }
    
    renderUpdatePage = () => {
        if (this.state.showUpdatePage) {
            return <UpdateModal wine={this.state.wineToUpdate} refresh={this.props.refresh} showUpdate={this.renderUpdate} />
        }   
    } 
         
    render() {
        return(
           <Grid container spacing={8}>
                <Grid item xs={12}>
                {this.props.wines.map((wine, id) => {
                    return(
                        <div key={id}>
                            <p><strong>Name:</strong> {wine.name}, {wine.vintage}</p>
                            <p><strong>Color:</strong> {wine.color}</p>
                            <p><strong>Apellation:</strong> {wine.apellation}</p>
                            <p><strong>Country:</strong> {wine.country}</p>
                            <p><strong>Score:</strong> {wine.score}</p>
                            <p><strong>Confidence Index:</strong> {wine.confidence_index}</p>
                            <p><strong>Region:</strong> {wine.region}</p>
                            
                            <form id={wine.id} onSubmit={(event) => this.addToUserList(event)}>
                        
                            <Select
                                onChange={this.handleListId}
                                value={this.state.listId}
                                inputProps={{name: 'listId', id: 'listInput'}}
                            >
                        
                            {(this.state.wineLists.length) > 0 ? this.state.wineLists.map((list, id) => {
                            return <MenuItem key={id} value={list.id}>{list.title}</MenuItem>
                            }) : "" }
                        
                            </Select>
        
                            <Button color="default" type="submit">Add To My List</Button>
        
                            </form>
        
                            <br />
        
                            <i className="material-icons pointer" id={wine.id} onClick={(event) => this.updateWine(event)}>edit</i>
        
                            &nbsp; 
        
                            <i className="material-icons pointer" id={wine.id} onClick={(event) => this.deleteWine(event)}>delete</i>
                            <hr />
                        </div>
                    )  
                })}
                </Grid>

                <Grid item xs={12}>
                   {this.renderUpdatePage()}
                </Grid>
           </Grid>
        )
    }
}