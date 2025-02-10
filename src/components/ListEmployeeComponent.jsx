import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, listEmployee } from '../services/EmployeeService';

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigator = useNavigate();

  const getAllEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await listEmployee();
      setEmployees(response.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Failed to load employees. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllEmployees();
  }, [getAllEmployees]);

  const addNewEmployee = () => navigator('/add-employee');
  const updateEmployee = (id) => navigator(`/update-employee/${id}`);

  const removeEmployee = async (id, firstName) => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete ${firstName}?`
      );
      if (confirmed) {
        await deleteEmployee(id);
        getAllEmployees();
        alert(`${firstName} deleted successfully.`);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      setError('Failed to delete employee. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center">Loading employees...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  return (
    <div className="container my-5 table-responsive">
      <h1 className="text-center mt-4">List of Employees</h1>
      <button className="btn btn-success mb-3" onClick={addNewEmployee}>
        Add New Employee
      </button>
      <table className="table table-striped table-hover table-bordered mb-5">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
            <th>Methods</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-lg btn-info mx-3"
                  onClick={() => updateEmployee(employee.employeeId)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-lg btn-danger mx-3"
                  onClick={() =>
                    removeEmployee(employee.employeeId, employee.firstName)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
