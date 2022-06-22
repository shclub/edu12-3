import React, { Component } from 'react'
import EmployeeService from '../services/employee'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Employee Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> 이름 : </label>
                            <div> { this.state.employee.empName }</div>
                        </div>
                        <div className = "row">
                            <label> 부서명 : </label>
                            <div> { this.state.employee.empDeptName }</div>
                        </div>
                        <div className = "row">
                            <label> 전화번호 : </label>
                            <div> { this.state.employee.empTelNo }</div>
                        </div>
                        <div className = "row">
                            <label> 이메일 : </label>
                            <div> { this.state.employee.empMail }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent
