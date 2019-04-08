import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [] };
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

  render() {
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
        minwidth: 200,
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
    ];
    return (
      <div>
        <ReactTable className="-striped -highlight" sortable={true} filterable={true} data={this.state.customers} columns={columns}></ReactTable>
      </div>
    );
  }
}

export default CustomerList;
