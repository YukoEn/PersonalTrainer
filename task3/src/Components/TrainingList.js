import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import * as moment from 'moment';
import AddNewTraining from './AddNewTraining';
import EditTraining from './EditTraining';
import { styles } from '../styleDef';


class TrainingList extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: [], open: false, message: '' };
  }
  //Fetch trainings
  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(jsondata => this.setState({ trainings: jsondata }))
      .catch(err => console.error(err));
  };

  deleteTraining = (trainingId) => {
    if (window.confirm("Are you sure?")) {
      fetch('https://customerrest.herokuapp.com/api/trainings/' + trainingId, { method: 'DELETE' })
        .then(res => this.loadTrainings())
        .then(res => this.setState({ open: true, message: 'Training deleted' }))
        .catch(err => console.error(err));
    }
  };

  saveTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)

      })

      .then(res => this.loadTrainings())
      .then(res => this.setState({ open: true, message: 'Training added successfully' }))
      .catch(err => console.error(err));
  }

  modifyTraining = (linkId, training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings/' + linkId,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)

      })

      .then(res => this.loadTrainings())
      .then(res => this.setState({ open: true, message: 'Changes saved' }))
      .catch(err => console.error(err));
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props;

    const columns = [
      {
        Header: 'Date',
        accessor: 'date',
        width: 200,
        Cell: ({ value }) => moment(value).format('LL')

      },
      {
        Header: 'Duration',
        accessor: 'duration',
        width: 100,
      },
      {
        Header: 'Activity',
        accessor: 'activity',
        width: 200,
      },

      {
        Header: 'Customer',
        accessor: 'customer',
        width: 300,
        Cell: row => {
          return (
            <div>
              <span className="class-for-id">{'#' + row.row.customer.id}</span><br></br>
              <span className="class-for-firstname">{row.row.customer.firstname + ' '}</span>
              <span className="class-for-lastname">{row.row.customer.lastname}</span><br></br>
              <span className="class-for-streetaddress">{row.row.customer.streetaddress + ', '}</span>
              <span className="class-for-postcode">{row.row.customer.postcode + ' '}</span>
              <span className="class-for-city">{row.row.customer.city}</span><br></br>
              <span className="class-for-email">{row.row.customer.email}</span><br></br>
              <span className="class-for-phone">{row.row.customer.phone}</span><br></br>
            </div>
          )
        }
      },
      {
        Header: '',
        accessor: 'id',
        filterable: false,
        sortable: false,
        minwidth: 200,
        Cell: ({ value, row }) => <EditTraining modifyTraining={this.modifyTraining} linkId={value} training={row} />
      },

      {
        Header: '',
        accessor: 'id',
        filterable: false,
        sortable: false,
        minwidth: 200,
        Cell: ({ value }) =>
          <Button color="primary"
            variant="contained"
            disableRipple
            className={classNames(classes.margin, classes.bootstrapRoot, classes.bootstrapDanger, classes.button)}
            onClick={() => this.deleteTraining(value)}>Delete<DeleteIcon className={classes.rightIcon} />
          </Button>
      }

    ];
    return (
      <div>
        <AddNewTraining saveTraining={this.saveTraining} />
        <ReactTable className="-striped -highlight" sortable={true} filterable={true} data={this.state.trainings} columns={columns}></ReactTable>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          message={this.state.message}
        />
      </div>
    );
  }
}

TrainingList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrainingList);