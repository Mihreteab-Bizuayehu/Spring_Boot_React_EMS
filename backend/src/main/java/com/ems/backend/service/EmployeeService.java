package com.ems.backend.service;

import com.ems.backend.entity.Employee;
import com.ems.backend.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public Employee addEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public Optional<Employee> getEmployeeById(Long employeeId){
        return employeeRepository.findById(employeeId);
    }

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public Optional<Employee> updateEmployee(Long employeeId,Employee employee){
        return employeeRepository.findById(employeeId).map(updatedEmployee->{
            updatedEmployee.setFirstName(employee.getFirstName());
            updatedEmployee.setLastName(employee.getLastName());
            updatedEmployee.setEmail(employee.getEmail());
            updatedEmployee.setPassword(employee.getPassword());
            return employeeRepository.save(updatedEmployee);
        });
    }

    public void deleteEmployee(Long employeeId){
        employeeRepository.deleteById(employeeId);
    }

}
