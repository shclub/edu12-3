import React, { Component } from 'react'
import EmployeeService from '../services/employee'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        console.log('employee Addeempkyee => ');
        this.props.history.push(`/add-employee/_add`);
    }

    render() {
        return (
            <div style={{padding: "10%"}}>
                 <h2 className="text-center">임직원 현황</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}>추가</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> 이름 </th>
                                    <th> 부서명 </th>
                                    <th> 전화번호 </th>
                                    <th> 이메일 </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                             <td> {employee.empName} </td>   
                                             <td> {employee.empDeptName}</td>
                                             <td> {employee.empTelNo}</td>
                                             <td> {employee.empMail}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">변경 </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">삭제 </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">보기 </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
