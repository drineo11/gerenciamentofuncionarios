import React, { useState, useEffect } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import { getAllDepartments } from '../services/DepartmentService'


const ListEmployee = () => {

    const [employees, setEmployees] = useState([])
    const [departmentId, setDepartmentId] = useState('')
    const [departments, setDepartments] = useState([])

    const navigator = useNavigate()

    useEffect(() => {
        getAllEmployees()
        getAllDepartmentsData()
    }, [])


    function getAllEmployees() {
        listEmployees().then((res) => {
            setEmployees(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    function getAllDepartmentsData() {
        getAllDepartments()
            .then((res) => {
                setDepartments(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }


    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id,firstName) {
        const confirm = window.confirm(`Deseja deletar o funcionário ${firstName}?`)

        if (confirm) {

            deleteEmployee(id).then((res) => {
                getAllEmployees()
            }).catch((err) => {
                console.error(err)
            })
        }
    }

    function getDepartmentNameById(departmentId) {
        const department = departments.find(dep => dep.id === departmentId);
        return department ? department.departmentName : 'N/A';
    }



    return (
        <div className='container' style={{ marginTop: "15px" }}>
            <u><h2 className='text-center'>FUNCIONÁRIOS</h2></u>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Adicionar Funcionário</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Email</th>
                        <th>Departamento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((employee) => (
                            <tr key={employee.id}>
                                
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{getDepartmentNameById(employee.departmentId)}</td>
                                <td>
                                    <button type='button' className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Atualizar</button>
                                    <button type='button' className='btn btn-danger' onClick={() => { removeEmployee(employee.id, employee.firstName) }} style={{ marginLeft: '10px' }}>Deletar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployee