import axios from 'axios';
import AuthenticationService from './AuthenticationService.js'

class EmployeeService {
    constructor(props) {
        //super(props)
        
        AuthenticationService.setupAxiosInterceptors();
        
    }

    executeEmployeesService() {
        console.log("===executeEmployeesService===")

        //return axios.get(process.env.REACT_APP_API_URL +'/api/v1/employees'); 
        return axios.get("/api/v1/employees"); 
    }

    getEmployees(){
        console.log("===execute getEmployees Service===")
        return axios.get("/api/v1/employees");
    }

    createEmployee(employee){
        console.log("===execute createEmployee Service===")
        return axios.post("/api/v1/employee",employee);
    }

    getEmployeeById(employeeId){
        console.log("===execute getEmployeeById Service===")
        return axios.get("/api/v1/employees" + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        console.log("===execute updateEmployee Service===")
        console.log('employee => ' + JSON.stringify(employee));
        return axios.post("/api/v1/employees" + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        console.log("===execute deleteEmployee Service===")
        return axios.post("/api/v1/employee" +  '/' + employeeId);
    }
}

export default new EmployeeService()
