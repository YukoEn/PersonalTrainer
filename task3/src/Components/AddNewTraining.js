import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { styles } from '../styleDef';


class AddNewTraining extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, date: '', duration: '', activity: '', customers: [], item: '' };
  }

  //Fetch customers
  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(jsondata => this.setState({ customers: jsondata.content }))
      .catch(err => console.error(err));
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  setTraining = () => {
    const newTraining = {
      date: moment(this.state.date).format(),
      duration: parseInt(this.state.duration),
      activity: this.state.activity,
      customer: 'https://customerrest.herokuapp.com/api/customers/' + this.state.item
    }

    this.props.saveTraining(newTraining);
    this.handleClose();
  }


  render() {
    const { classes } = this.props;

    const objItem = this.state.customers.map((obj, index) => {
      var href = obj.links[0].href;
      var customerId = href.substr(href.length - 1);

      return (
        <option key={index} value={customerId}>
          {'#' + customerId + ' ' + obj.firstname + ' ' + obj.lastname}
        </option>
      )
    });

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Training</DialogTitle>
          <DialogContent>
            <TextField onChange={this.handleChange} autoFocus margin="dense" name="date" label="Date" placeholder='YYYY-MM-DD' fullWidth />
            <TextField onChange={this.handleChange} margin="dense" name="duration" label="Duration" fullWidth />
            <TextField onChange={this.handleChange} margin="dense" name="activity" label="Activity" fullWidth />

            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="item-native-simple">Customer</InputLabel>
                <Select
                  native
                  value={this.state.item}
                  onChange={this.handleChange}
                  name="item"
                  input={<Input id="item-native-simple" />}
                >
                  <option value="" />
                  {objItem}
                </Select>
              </FormControl>
            </form>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
                  </Button>
            <Button onClick={this.setTraining} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Button color="primary"
          variant="contained"
          disableRipple
          className={classNames(classes.margin, classes.bootstrapRoot, classes.bootstrapPrimary)}
          onClick={this.handleClickOpen}>Add New Training
        </Button>
      </div>
    );
  }
}

AddNewTraining.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNewTraining);