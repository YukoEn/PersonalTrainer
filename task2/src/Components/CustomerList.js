import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { styles } from '../styleDef';


class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [], open: false, message: '' };
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

  deleteCustomer = (customerLink) => {
    if (window.confirm("Are you sure?")) {
      fetch(customerLink, { method: 'DELETE' })
        .then(res => this.loadCustomers())
        .then(res => this.setState({ open: true, message: 'Customer deleted' }))
        .catch(err => console.error(err));
    }
  };

  saveCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)

      })
      .then(res => this.loadCustomers())
      .then(res => this.setState({ open: true, message: 'Customer added successfully' }))
      .catch(err => console.error(err));
  }

  modifyCustomer = (link, customer) => {
    fetch(link,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)

      })
      .then(res => this.loadCustomers())
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
        Header: 'First name',
        accessor: 'firstname',
        minwidth: 150,
      },
      {
        Header: 'Last name',
        accessor: 'lastname',
        minwidth: 150,
      },
      {
        Header: 'Street address',
        accessor: 'streetaddress',
        minwidth: 150,
      },
      {
        Header: 'Postcode',
        accessor: 'postcode',
        minwidth: 100,
      },
      {
        Header: 'City',
        accessor: 'city',
        minwidth: 100,
      },
      {
        Header: 'E-mail',
        accessor: 'email',
        minwidth: 150,
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        minwidth: 150,
      },
      {
        Header: '',
        accessor: 'links[0].href',
        filterable: false,
        sortable: false,
        width: 100,
        Cell: ({ value, row }) => <EditCustomer modifyCustomer={this.modifyCustomer} link={value} customer={row} />
      },
      {
        Header: '',
        accessor: 'links[0].href',
        filterable: false,
        sortable: false,
        Cell: ({ value }) =>
          <Button color="primary"
            variant="contained"
            disableRipple
            className={classNames(classes.margin, classes.bootstrapRoot, classes.bootstrapDanger, classes.button)}
            onClick={() => this.deleteCustomer(value)}>Delete<DeleteIcon className={classes.rightIcon} />
          </Button>
      },

    ];
    return (
      <div>
        <AddCustomer saveCustomer={this.saveCustomer} />
        <ReactTable className="-striped -highlight" sortable={true} filterable={true} data={this.state.customers} columns={columns}></ReactTable>
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

CustomerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerList);
