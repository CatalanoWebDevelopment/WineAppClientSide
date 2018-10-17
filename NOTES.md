- ADD PLAYLIST ICON FOR SHOWPAGE.JS
<i className="material-icons pointer" id={wine.id} onClick={(event) => this.addToUserList(event)}>playlist_add</i>

- FETCH FOR USER LIST
fetchList = () => {
        let id = this.state.id;
        
        if (this.state.id !== null) {
        fetch(`http://localhost:3000/user-favorites/${id}`, {
            method: "GET",
            headers: {
                'Authorization': localStorage.getItem("SessionToken")
            }
        })
        .then(response => response.json())
        .then(response => { console.log('First Response', response)
            if (response.wine_id !== null) {
            fetch(`http://localhost:3000/wines/${response.wine_id}`, {
                method: "GET",
                headers: {
                    'Authorization': localStorage.getItem("SessionToken")
                }
            })
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                return (
                    <div>
                        {console.log('Second Response', response)}
                        <p><strong>Name:</strong> {response.name}, {response.vintage}</p>
                        <p><strong>Color:</strong> {response.color}</p>
                        <p><strong>Apellation:</strong> {response.apellation}</p>
                        <p><strong>Country:</strong> {response.country}</p>
                        <p><strong>Score:</strong> {response.score}</p>
                        <p><strong>Confidence Index:</strong> {response.confidence_index}</p>
                        <p><strong>Region:</strong> {response.region}</p>
                    </div>
                )
                }
            })
            }
        })
        }
    }