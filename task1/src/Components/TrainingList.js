import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as moment from 'moment';


class TrainingList extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: [] };
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

  render() {
    const columns = [
      {
        Header: 'Date',
        accessor: 'date',
        minwidth: 200,
        Cell: ({ value }) => moment(value).format('LL')

      },
      {
        Header: 'Duration',
        accessor: 'duration',
        minwidth: 100,
      },
      {
        Header: 'Activity',
        accessor: 'activity',
        minwidth: 200,
      },
      {
        Header: 'Customer',
        accessor: 'customer',
        minwidth: 300,
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
    ];
    return (
      <div>
        <ReactTable className="-striped -highlight" sortable={true} filterable={true} data={this.state.trainings} columns={columns}></ReactTable>
      </div>
    );
  }
}

export default TrainingList;