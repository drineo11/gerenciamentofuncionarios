import React, { useState, useEffect } from 'react'
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllDepartments } from '../services/DepartmentService'

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [departments, setDepartments] = useState([])



  useEffect(() => {
    getAllDepartments().then((res) => {
      setDepartments(res.data)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  const { id } = useParams()
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  })

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployeeById(id).then((res) => {
        const employee = res.data
        setFirstName(employee.firstName)
        setLastName(employee.lastName)
        setEmail(employee.email)
        setDepartmentId(employee.departmentId)
      }).catch((err) => {
        console.error(err)
      })
    }
  }, [id])

  function saveOrUpdateEmployee(event) {
    event.preventDefault()

    if (validateForm()) {
      const employee = { firstName, lastName, email, departmentId }

      if (id) {
        updateEmployee(id, employee).then((res) => {
          console.log(res.data)
          navigator('/employees')
        }).catch((err) => {
          console.log(err)
        })
      } else {

        createEmployee(employee).then((res) => {
          console.log(res.data)
          navigator('/employees')
        }).catch((err) => {
          console.error(err)
        })
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors }

    if (firstName.trim()) {
      errorsCopy.firstName = ''
    } else {
      errorsCopy.firstName = 'Nome é obrigatório'
      valid = false
    }

    if (lastName.trim()) {
      errorsCopy.lastName = ''
    } else {
      errorsCopy.lastName = 'Sobrenome é obrigatório'
      valid = false
    }

    if (email.trim()) {
      errorsCopy.email = ''
    } else {
      errorsCopy.email = 'Email é obrigatório'
      valid = false
    }

    if (departmentId) {
      errorsCopy.department = ''
    } else {
      errorsCopy.department = 'Select Department'
      valid = false
    }

    setErrors(errorsCopy);

    return valid;

  }

  function pageTitle() {
    if (id) {
      return <h2 className='text-center'>Atualizar Funcionario</h2>
    } else {
      return <h2 className='text-center'>Adicionar Funcionario</h2>
    }
  }

  return (
    <div className='container'> <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Nome</label>
                <input
                  type="text"
                  placeholder='Nome'
                  name='firstName'
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={(event) => setFirstName(event.target.value)}
                />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Sobrenome</label>
                <input
                  type="text"
                  placeholder='Sobrenome'
                  name='lastName'
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={(event) => setLastName(event.target.value)}
                />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Nome</label>
                <input
                  type="text"
                  placeholder='Email'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Selecione o Departamento</label>
                <select
                  className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                  value={departmentId}
                  onChange={(event) => setDepartmentId(event.target.value)}
                >
                  <option value="Selecione Departamento">Selecione o Departamento</option>

                  {
                    departments.map(department =>
                      <option key={department.id} value={department.id} > {department.departmentName}</option>
                    )
                  }
                </select>
                {errors.department && <div className='invalid-feedback'>{errors.department}</div>}
              </div>
              <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent