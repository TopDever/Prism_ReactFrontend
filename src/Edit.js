import React, { Component } from 'react';
import './App.css';


class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      panelNumber: 0,
      token: "",
      currentProperty: {Project_Name: "Test", Site_Address: "123", Start_Date: "456", enabled: true},
      toggle: false,
      userData: {},
      tableData: [{Project_Name: "Test", Site_Address: "123", Start_Date: "456", enabled: true}]
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentWillReceiveProps(nextProp){
    this.setState({currentProperty: nextProp.currentProperty});
  }

  componentWillMount(){
    this.setState({currentProperty: this.props.currentProperty});
  }

handleInput(event){
  console.log(event.target.name); // the name of the form element
  console.log(event.target.value); // the value of the form element
  var site = this.state.currentProperty;
  site[event.target.name] = event.target.value;
  this.setState({currentProperty: site})
}

handleSelectChange(event){
  console.log(this.state.currentProperty);
  console.log(event.target.value)
  var site = this.state.currentProperty;
  site.enabled = event.target.value;
  this.setState({currentProperty: site})
}

  render() {
    return (
      <div className="App">
      <br/>
        <h1 style={{fontFamily: "Libre Franklin", fontSize: "60px", fontWeight: "900"}}>SUBADRA</h1>

        <div className="loginBox">
        <p>Project Name</p>
        <input name="Project_Name" onChange={this.handleInput} value={this.state.currentProperty.Project_Name}/>
        <p>Site Address</p>
        <input name="Site_Address" onChange={this.handleInput} value={this.state.currentProperty.Site_Address}/>
        <p>Start Date</p>
        <input type="date" name="Start_Date" onChange={this.handleInput} value={this.state.currentProperty.Start_Date}/>
        <p>Status</p>
        <select name="enabled" value={this.state.currentProperty.enabled} onChange={this.handleSelectChange}>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
        <br/><br/><br/>
        <button className="midnight-blue-flat-button" onClick={() => this.props.save(this.state.currentProperty)}>Save</button>
        </div>

      </div>
    );
  }
}

export default Edit;
