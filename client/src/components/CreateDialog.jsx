import React from 'react';
import { Button } from '@material-ui/core';

export default class CreateDialog extends React.Component {
	constructor(props) {
        super(props);
        this.nom = React.createRef();
        this.cuisine = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        document.getElementById("close").click();
        this.props.createRestaurant(this.nom.current.value, this.cuisine.current.value);
    };

  render() {

    return (
        <div className="text-left">
            <Button variant="outlined" style={{marginTop: 10}} type="button" className="btn btn-dark mb-2" data-toggle="modal" data-target="#creationModal"><i className="fas fa-plus"></i>&nbsp;Ajouter</Button>
            
            <div className="modal fade" id="creationModal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Ajouter un restaurant</h5>
                        <button type="button" id="close" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <form id="createForm" onSubmit={e => this.handleSubmit(e)}>
                            <label htmlFor="nomRestaurant">Nom du restaurant</label>
                            <input type="text" id="nomRestaurant" className="form-control" placeholder="Entrez le nom..." ref={this.nom} required />
                            
                            <label htmlFor="cuisineRestaurant">Type de cuisine</label>
                            <input type="text" id="cuisineRestaurant" className="form-control" placeholder="Entrez le type..." ref={this.cuisine} required />
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-dark" data-dismiss="modal">Annuler</button>
                        <button type="submit" form="createForm" value="Submit" className="btn btn-dark">Enregistrer</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}