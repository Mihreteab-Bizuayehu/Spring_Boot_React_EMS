import axios from 'axios';

const baseURL = 'http://localhost:8080/employees';

 export const listEmployee= () => axios.get(baseURL);

export const addEmployee = (employee) => axios.post(`${baseURL}/add`, employee);

export const getEmployee = (id) => axios.get(`${baseURL}/employee/${id}`);

export const updateEmployee = (id, employee) =>
  axios.put(`${baseURL}/update/${id}`, employee);

export const deleteEmployee = (id) => axios.delete(`${baseURL}/delete/${id}`);

