import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Styles from '../Styles/Styles.css'
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export default class UserFavoritesContainer extends React.Component {
    constructor() {
        super()
        
        this.state = {
            id: '',
            title: '',
            wineLists: [],
            winesListsItems: []
        }
    }
    
    handleListId = event => {
        event.preventDefault();
        
        this.setState({
            id: event.target.value
        })
        
        this.displayData(event.target.value)
    }
    
    componentWillMount() {
        this.fetchAllLists();
    }
    
    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    createUserFavoritesList = event => {
        event.preventDefault();
        let title = this.state.title
        let list = { list_name: { title: title } }
        
        fetch('http://localhost:3000/favorites-list/create', {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('SessionToken'),
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(list)
        })
        .then(response => response.json())
        .then(response => window.alert(`Success! ${this.state.title} has been created.`))
    }
    
    fetchAllLists = () => {
        fetch('http://localhost:3000/favorites-list/all', {
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
    
    displayData = id => {
        fetch(`http://localhost:3000/user-favorites/lists/${id}`, {
            method: "GET",
            headers: {
                'Authorization': localStorage.getItem('SessionToken')
            }
        }).then(response => response.json())
        .then(response => {
            return response.map(wine => {
                fetch(`http://localhost:3000/wines/${wine.wine_id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': localStorage.getItem('SessionToken')
                    }
                }).then(response => response.json()).then(response => {
                    let item = this.state.winesListsItems.concat(response)
                    this.setState({
                        winesListsItems: item
                    })
                })
            })
        })
    }
    
    render() {
        return (
            <Grid container spacing={8}>
                <Grid item xs={12} className="centered">
                    <h2>Create a New User Favorites List</h2>
                    <form onSubmit={this.createUserFavoritesList}>
                        <TextField label="Title" name="title" onChange={this.handleOnChange} />
            
                        <br /><br />
            
                        <Button type="submit" color="default" variant="contained">Create My List</Button>
                    </form>
                    <br />
                </Grid>
            
                <Grid item xs={12} className="centered">
                    <hr />
                    <br />
                    <h3>Which List Would You Like to See?</h3>
                    <form>
                        <Select
                            onChange={this.handleListId}
                            value={this.state.id}
                            inputProps={{name: 'id', id: 'listInput'}}
                        >
                        
                         {(this.state.wineLists.length) > 0 ? this.state.wineLists.map((list, id) => {
                         return <MenuItem key={id} value={list.id}>{list.title}</MenuItem>
                         }) : "" }
 
                        </Select>
                    </form>
                    <br />
                </Grid>

                <Grid item xs={12} className="centered">
                    <hr />
                    <br />
                    
                    {this.state.winesListsItems.map((response, id) => {
                        return (
                        <div key={id}>
                        <p><strong>Name:</strong> {response.name}, {response.vintage}</p>
                        <p><strong>Color:</strong> {response.color}</p>
                        <p><strong>Apellation:</strong> {response.apellation}</p>
                        <p><strong>Country:</strong> {response.country}</p>
                        <p><strong>Score:</strong> {response.score}</p>
                        <p><strong>Confidence Index:</strong> {response.confidence_index}</p>
                        <p><strong>Region:</strong> {response.region}</p>
                     
                        <hr />
                        </div>
                        )
                    })}
                </Grid>
            </Grid>
        )
    }
}