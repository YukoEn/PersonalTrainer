import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styleDef';


class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addCustomer = () => {
    const newCustomer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      streetaddress: this.state.streetaddress,
      postcode: this.state.postcode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone
    }
    this.props.saveCustomer(newCustomer);
    this.handleClose();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
          <DialogContent>
            <TextField onChange={this.handleChange} autoFocus margin="dense" name="firstname" label="Firstname" fullWidth />
            <TextField onChange={this.handleChange} margin="dense" name="lastname" label="Lastname" fullWidth />
            <TextField onChange={this.handleChange} margin="dense" name="streetaddress" label="Street address" fullWidth />
            <TextField onChange={this.handleChange} margin="dense" name="postcode" label="Postcode" fullWidth />
            <TextField onChange={this.handleChange} margin="dense" name="city" label="City" fullWidth />
            <TextField onChange={this.handleChange} margin="dense" name="email" label="Email" fullWidth />
            <TextField onChange={this.handleChange} margin="dense" name="phone" label="Phone" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addCustomer} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Button color="primary"
          variant="contained"
          disableRipple
          className={classNames(classes.margin, classes.bootstrapRoot, classes.bootstrapPrimary)}
          onClick={this.handleClickOpen}>Add Customer
        </Button>
      </div>
    );
  }
}

AddCustomer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddCustomer);