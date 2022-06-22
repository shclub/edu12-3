import React, {Component} from 'react'

class EmployeeComponent extends Component {
    
    constructor(props) {
        super(props)
        this.employeesMessage = this.retrieveEmployeesMessage.bind(this)
        this.state = {
            employeesMessage : ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render() {
        return (
            <>
                <h1>임직원 조회</h1>
                <div className="container">
                    임직원 {this.props.match.params.name}.
                </div>
                <div className="container">
                    Check if axiosInterceptors is working well!<br></br>
                    <button onClick={this.retrieveEmployeesMessage} 
                        className="btn btn-success">Get Message</button>
                </div>
                <div className="container">
                    {this.state.employeesMessage}
                </div>
                
            </>
        )        
    }

    retrieveEmployeesMessage() {
        AuthenticationService.executeEmployeesService()
        .then( response => this.handleSuccessfulResponse(response) )
        .catch( error => this.handleError(error) )
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({welcomeMessage: response.data})
    }

    handleError(error) {
        console.log(error.response)
        let errorMessage = '';
        
        if(error.message) 
            errorMessage += error.message

        if(error.response && error.response.data) {
            errorMessage += error.response.data.message
        }

        this.setState({welcomeMessage: errorMessage})
    }

}

export default EmployeeComponent