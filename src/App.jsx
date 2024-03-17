import React, { Component } from 'react';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      currentPage: 1,
      totalPages: null,
      perPage: 10
    };
  }

  componentDidMount() {
    this.fetchEmployees();
  }

  fetchEmployees = () => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          employees: data,
          totalPages: Math.ceil(data.length / this.state.perPage)
        });
      })
      .catch(error => {
        alert('Failed to fetch data');
        console.error(error);
      });
  };

  handleNextPage = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1
      }));
    }
  };

  handlePrevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage - 1
      }));
    }
  };

  render() {
    const { employees, currentPage, perPage } = this.state;
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, employees.length);
    const currentEmployees = employees.slice(startIndex, endIndex);

    return (
      <div>
        <h1>Employee Data</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={this.handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {this.state.totalPages}</span>
          <button onClick={this.handleNextPage} disabled={currentPage === this.state.totalPages}>Next</button>
        </div>
      </div>
    );
  }
}

export default Pagination;
