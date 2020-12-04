import React, { Component } from 'react';
import './App.css';

const qualityType = {
  0: 'Inactive',
  1: 'Active'
};

var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class Main extends Component {
  constructor(props) {
    super(props)
    this.buttonFormatter = this.buttonFormatter.bind(this);
  }

  buttonFormatter(cell, row, enumObject){
    console.log(row)
    return (<button onClick={() => this.props.editProperty(row)}>EDIT</button>)
  }
  render() {
    return (
      <div className="App">
        <br/>
        <h1 style={{fontFamily: "Libre Franklin", fontSize: "60px", fontWeight: "900"}}>SUBADRA</h1>

        <div style={{height: "calc(80vh - 60px)"}}>
        <BootstrapTable data={this.props.tableData}  scrollTop={ 'Top' } dataAlign="center" striped hover>
          <TableHeaderColumn dataAlign="center" isKey filter={ { type: 'TextFilter', delay: 0 } } dataField='Project_Name'>Project Name</TableHeaderColumn>
          <TableHeaderColumn dataAlign="center" filter={ { type: 'TextFilter', delay: 0 } } dataField='Site_Address'>Site Address</TableHeaderColumn>
          <TableHeaderColumn dataAlign="center" filter={ { type: 'TextFilter', delay: 0 } } dataField='Start_Date'>Start Date</TableHeaderColumn>
          <TableHeaderColumn dataAlign="center" dataFormat={this.buttonFormatter} formatExtraData={ qualityType }
filter={ { type: 'SelectFilter', options: qualityType, defaultValue: 1 } } dataField='enabled'>Edit</TableHeaderColumn>
        </BootstrapTable>
        </div>

        <button className="midnight-blue-flat-button" onClick={() => this.props.editProperty({Project_Name: "", Site_Address: "", bar: ""})}>Add New</button>

      </div>
    );
  }
}

export default Main;
