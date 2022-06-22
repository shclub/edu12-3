import React, { Component } from 'react'
import EmployeeService from '../services/employee.js';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            empName: '',
            empDeptName: '',
            empTelNo: '',
            empMail: ''
        }
        this.changeEmpNameHandler = this.changeEmpNameHandler.bind(this);
        this.changeEmpDeptNameHandler = this.changeEmpDeptNameHandler.bind(this);
        this.changeEmpTelNoHandler = this.changeEmpTelNoHandler.bind(this);
        this.changeEmpMailHandler = this.changeEmpMailHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
            let employee = res.data;
            this.setState({empName: employee.empName,
                empDeptName: employee.empDeptName,
                empTelNo: employee.empTelNo,
                empMail : employee.empMail
            });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {empName: this.state.empName, empDeptName: this.state.empDeptName, empTelNo: this.state.empTelNo, empMail: this.state.empMail};
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(this.state.id));
        EmployeeService.updateEmployee(employee, this.state.id).then( res => {
            this.props.history.push('/employees');
        });
    }
    
    changeEmpNameHandler= (event) => {
        this.setState({empName: event.target.value});
    }

    changeEmpDeptNameHandler= (event) => {
        this.setState({empDeptName: event.target.value});
    }

    changeEmpTelNoHandler= (event) => {
        this.setState({empTelNo: event.target.value});
    }

    changeEmpMailHandler= (event) => {
        this.setState({empMail: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Employee</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> 이름 </label>
                                            <input placeholder="Emp Name" name="empName" className="form-control" 
                                                value={this.state.empName} onChange={this.changeEmpNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> 부서명 </label>
                                            <input placeholder="Dept Name" name="empDeptName" className="form-control" 
                                                value={this.state.empDeptName} onChange={this.changeEmpDeptNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> 전화번호 </label>
                                            <input placeholder="Tel No" name="empTelNo" className="form-control" 
                                                value={this.state.empTelNo} onChange={this.changeEmpTelNoHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> 이메일 </label>
                                            <input placeholder="Email Address" name="empMail" className="form-control" 
                                                value={this.state.empMail} onChange={this.changeEmpMailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateEmployeeComponent
