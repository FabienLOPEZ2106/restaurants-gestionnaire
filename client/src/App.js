import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Filters from './components/Filters';
import CreateDialog from './components/CreateDialog';
import RestaurantsList from './components/RestaurantsList';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  constructor(props) {
		super(props);
    this.searchTimeout =  0;
		this.state = {
      page: 0,
      pagesize: 5,
      name: '',
      restaurants:[],
      restaurantCount: 0,
      editing: false,
      creating: false
		}
  }
  
  componentDidMount() {
    this.getRestaurants();
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Liste des Restaurants
            </Typography>
          </Toolbar>
        </AppBar>
      
      <div className="App">
        <CreateDialog
          createRestaurant={this.createRestaurant.bind(this)}
        />
        <div className="row">
          <div className="col-md-8">
            <Filters
              pagesize={this.state.pagesize}
              onPagesizeChange={this.onPagesizeChange.bind(this)} 
              onNameFilterChange={this.onNameFilterChange.bind(this)} 
            />
          </div>
          <div className="col-md-4">
            <div className="alert alert-success alert-dismissible fade" id="alert" role="alert">
              <strong>Succès!</strong> <p id="alertMessage"></p>
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
        <RestaurantsList
          restaurantCount={this.state.restaurantCount}
          page={this.state.page}
          pagesize={this.state.pagesize}
          restaurants={this.state.restaurants}
          editRestaurant={this.editRestaurant.bind(this)}
          deleteRestaurant={this.deleteRestaurant.bind(this)}
          onPageChange={this.onPageChange.bind(this)}
          onPagesizeChange={this.onPagesizeChange.bind(this)}
        />
      </div>
      </div>
    );
  }

  getRestaurants() {
    axios.get('http://localhost:8080/api/restaurants', {
          params: {
              page: this.state.page,
              pagesize: this.state.pagesize,
              name: this.state.name
          }
        })
        .then(res => {
          this.setState({ restaurants: res.data.data, restaurantCount: res.data.count });
        })
  }

  createRestaurant(nom, cuisine) {
    axios.post('http://localhost:8080/api/restaurants', {
      nom: nom,
      cuisine: cuisine
    })
    .then(res => {
      this.getRestaurants();
      if(res.status === 200) {
        this.displayAlert("Le restaurant " + nom + " a été créé.");
      }
    })
  }

  editRestaurant(id, nom, cuisine) {
    axios.put('http://localhost:8080/api/restaurants/' + id, {
      nom: nom,
      cuisine: cuisine
    })
    .then(res => {
      this.getRestaurants();
      if(res.status === 200) {
        this.displayAlert("Le restaurant " + nom + " a été modifié.");
      }
    })
  }

  deleteRestaurant(id) {
    axios.delete('http://localhost:8080/api/restaurants/' + id)
    .then(res => {
      this.getRestaurants();
      if(res.status === 200) {
        this.displayAlert("Le restaurant a été supprimé.");
      }
    })
  }

  onPagesizeChange(event) {
    this.setState({pagesize: event.target.value, page: 0}, () => {
      this.getRestaurants();
    });
  }

  onNameFilterChange(event) {
    if(this.searchTimeout !== 0) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.setState({name: event, page: 0}, () => {
        this.getRestaurants();
      });
    }, 300);
  }

  onPageChange(event) {
    this.setState({page: event.target.value}, () => {
      this.getRestaurants();
    });
  }

  displayAlert(message) {
    let alert = document.getElementById("alert");
    document.getElementById("alertMessage").innerHTML = message;
    alert.classList.add("show");

    setTimeout(() => {
      alert.classList.remove("show");
    }, 4000);
  }

}
export default App;
