import React, { Component } from 'react';
import './App.css';

var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class ManageUsers extends Component {
  constructor(props) {
    super(props)
    this.buttonFormatter = this.buttonFormatter.bind(this);
  }

  buttonFormatter(cell, row){
    console.log(row)
    return (<button onClick={() => this.props.editUser(row)}>EDIT</button>)
  }
  render() {
    return (
      <div className="App">
        <br/>
        <h1 style={{fontFamily: "Libre Franklin", fontSize: "60px", fontWeight: "900"}}>SUBADRA</h1>

        <div style={{height: "calc(80vh - 60px)"}}>
        <BootstrapTable data={this.props.tableData}  scrollTop={ 'Top' } dataAlign="center" striped hover>
          <TableHeaderColumn dataAlign="center" isKey filter={ { type: 'TextFilter', delay: 0 } } dataField='username'>Name</TableHeaderColumn>
          <TableHeaderColumn dataAlign="center" filter={ { type: 'TextFilter', delay: 0 } } dataField='role'>Role</TableHeaderColumn>
          <TableHeaderColumn dataAlign="center" dataFormat={this.buttonFormatter} dataField='username'>Edit</TableHeaderColumn>
        </BootstrapTable>
        </div>

        <button className="midnight-blue-flat-button" onClick={() => this.props.editUser({username: "", password: "", role: "Employee"})}>Add New</button>

      </div>
    );
  }
}

export default ManageUsers;
