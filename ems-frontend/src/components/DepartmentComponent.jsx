import React, { useEffect, useState } from 'react'
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentComponent = () => {

  const [departmentName, setDepartmentName] = useState('')
  const [departmentDescription, setDepartmentDescription] = useState('')

  const { id } = useParams();

  const [errors, setErrors] = useState({
    departmentName: '',
    departmentDescription: '',

  })

  const navigator = useNavigate();

  useEffect(() => {

    getDepartmentById(id).then((response) => {
      setDepartmentName(response.data.departmentName);
      setDepartmentDescription(response.data.departmentDescription);
    }).catch(error => {
      console.error(error);
    })

  }, [id])

  function saveOrUpdateDepartment(e) {
    e.preventDefault();

    if (validateForm()) {
      const department = { departmentName, departmentDescription }

      if (id) {
        updateDepartment(id, department).then((response) => {
          navigator('/departments');
        }).catch(error => {
          console.error(error);
        })
      } else {
        createDepartment(department).then((response) => {
          navigator('/departments')
        }).catch(error => {
          console.error(error);
        })
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors }

    if (departmentName.trim()) {
      errorsCopy.departmentName = ''
    } else {
      errorsCopy.departmentName = 'Nome do Departamento obrigatório'
      valid = false
    }

    if (departmentDescription.trim()) {
      errorsCopy.departmentDescription = ''
    } else {
      errorsCopy.departmentDescription = 'Descrição obrigatória'
      valid = false
    }

    setErrors(errorsCopy);

    return valid;

  }



  function pageTitle() {
    if (id) {
      return <h2 className='text-center'>Atualizar Departamento</h2>
    } else {
      return <h2 className='text-center'>Adicionar Departamento</h2>
    }
  }

  return (
    <div className='container'><br /><br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {
            pageTitle()
          }

          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Nome:</label>
                <input
                  type='text'
                  name='departmentName'
                  placeholder='Nome do Departamento'
                  className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`}
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
                {errors.departmentName && <div className='invalid-feedback'>{errors.departmentName}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Descrição:</label>
                <input
                  type='text'
                  name='departmentDescription'
                  placeholder='Descrição do Departamento'
                  value={departmentDescription}
                  onChange={(e) => setDepartmentDescription(e.target.value)}
                  className={`form-control ${errors.departmentDescription ? 'is-invalid' : ''}`}
                />
                {errors.departmentDescription && <div className='invalid-feedback'>{errors.departmentDescription}</div>}
              </div>
              <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateDepartment(e)}>Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepartmentComponent