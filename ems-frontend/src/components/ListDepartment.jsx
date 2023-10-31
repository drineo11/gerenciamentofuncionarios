import React, { useEffect, useState } from 'react'
import { deleteDepartment, getAllDepartments } from '../services/DepartmentService';
import { Link, useNavigate } from 'react-router-dom';

const ListDepartmentComponent = () => {

    const [departments, setDepartments] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        listOfDepartments();
    }, [])

    function listOfDepartments() {
        getAllDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function updateDepartment(id) {
        navigator(`/edit-department/${id}`)
    }


    function removeDepartment(id, departmentName) {
        const confirm = window.confirm(`Deseja deletar o departamento ${departmentName}?`)

        if (confirm) {
            deleteDepartment(id).then((response) => {
                listOfDepartments();
            }).catch(error => {
                console.error(error);
            })
        }
    }

    return (
        <div className='container'>
            <u><h2 className='text-center' style={{ marginTop: "15px" }}>DEPARTAMENTOS</h2></u>
            <Link to='/add-department' className='btn btn-primary mb-2'>Adicionar Departamento</Link>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.map(department =>
                            <tr key={department.id}>
                                <td> {department.id} </td>
                                <td> {department.departmentName} </td>
                                <td> {department.departmentDescription} </td>
                                <td>
                                    <button onClick={() => updateDepartment(department.id)} className='btn btn-info'>Atualizar</button>
                                    <button onClick={() => removeDepartment(department.id, department.departmentName)} className='btn btn-danger'
                                        style={{ marginLeft: "10px" }}
                                    >Deletar</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListDepartmentComponent