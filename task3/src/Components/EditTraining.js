import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styleDef';

class EditTraining extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, date: '', duration: '', activity: '', customer: '' };
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
      date: moment(this.props.training.date).format('LL'),
      duration: this.props.training.duration,
      activity: this.props.training.activity,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renewTraining = () => {
    const modifiedTraining = {
      date: moment(this.state.date).format(),
      duration: parseInt(this.state.duration),
      activity: this.state.activity,
    }

    this.props.modifyTraining(this.props.linkId, modifiedTraining);
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
          <DialogTitle id="form-dialog-title">Edit Training</DialogTitle>
          <DialogContent>
            <TextField onChange={this.handleChange} autoFocus margin="dense" value={this.state.date} name="date" label="Date" placeholder="YYYY-MM-DD HH:MM" fullWidth />
            <TextField onChange={this.handleChange} margin="dense" value={this.state.duration} name="duration" label="Duration" fullWidth />
            <TextField onChange={this.handleChange} margin="dense" value={this.state.activity} name="activity" label="Activity" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.renewTraining} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Button color="primary"
          variant="contained"
          disableRipple
          className={classNames(classes.margin, classes.bootstrapRoot, classes.bootstrapSecondary)}
          onClick={this.handleClickOpen}>Edit Training
        </Button>
      </div>
    );
  }
}

EditTraining.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditTraining);