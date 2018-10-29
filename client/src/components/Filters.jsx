import React from 'react';

import TextField from '@material-ui/core/TextField';

export default class Filters extends React.Component {

  render() {

    return (
        <div>
            <TextField
                id="outlined-full-width"
                label="Filtre"
                style={{ marginBottom: 6 }}
                placeholder="Entrez un filtre..."
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => this.props.onNameFilterChange(e.target.value)}
            />
        </div>
    );
  }
}