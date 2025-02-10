import { useEffect, useState } from 'react';
import { addEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const navigator = useNavigate();
  const { id } = useParams();

  const employee = {
    firstName,
    lastName,
    email,
    password,
  };

  const pageTitle = () => {
    if (id) {
      return <h1 className="text-center"> Update Employee </h1>;
    }
    else {
      return <h1 className="text-center"> Add Employee </h1>;
    }
  }

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setPassword(response.data.password);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    setFirstNameValid(firstName.trim() !== '');
    setLastNameValid(lastName.trim() !== '');
    setEmailValid(
      email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );
    setPasswordValid(password.trim() !== '');

    if (!firstNameValid || !lastNameValid || !emailValid || !passwordValid) {
      return;
    }

    if (id) {
       updateEmployee(id,employee)
         .then((response) => {
           console.log(response.data);
           navigator('/employees');
         }).catch((error) => {
           console.error(error);
         })
         .finally(() => {
           setFirstName('');
           setLastName('');
           setEmail('');
           setPassword('');
         });
    }
    else {
      addEmployee(employee)
        .then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
        });
    }
  }

  const getClassName = (isValid) => {
    return `form-control form-control-md ${isValid ? '' : 'is-invalid'}`;
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-3">
              {pageTitle()}
              <div className="card-body">
                <form onSubmit={saveOrUpdateEmployee}>
                  <div className="mb-3">
                    <label className="form-label">First Name </label>
                    <input
                      type="text"
                      className={getClassName(firstNameValid)}
                      name="firstName"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {!firstNameValid && (
                      <div className="invalid-feedback">
                        First name is required.
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Last Name </label>
                    <input
                      type="text"
                      className={getClassName(lastNameValid)}
                      name="lastName"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    {!lastNameValid && (
                      <div className="invalid-feedback">
                        Last name is required.
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email: </label>
                    <input
                      type="email"
                      className={getClassName(emailValid)}
                      name="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {!emailValid && (
                      <div className="invalid-feedback">
                        {email.trim() === ''
                          ? 'Email is required.'
                          : 'Please enter a valid email address.'}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                      type="password"
                      className={getClassName(passwordValid)}
                      name="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {!passwordValid && (
                      <div className="invalid-feedback">
                        Password is required.
                      </div>
                    )}
                  </div>

                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeComponent;
