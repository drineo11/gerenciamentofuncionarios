import React from 'react'
import { NavLink } from 'react-router-dom'


const Header = () => {
  return (
    <div>
      <header>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className="container-fluid">
            <a className='navbar-brand' href='/'> Sistema de Gerenciamento </a>
            

          </div>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav" >
              <li className="nav-item" style={{ marginLeft: '10px' }}>
                <NavLink className='nav-link' to='/employees'>Funcionários</NavLink>
              </li>

              <li className="nav-item" style={{ marginRight: '10px' }} >
                <NavLink className='nav-link' to='/departments'>Departamentos</NavLink>
              </li>
            </ul>
          </div>

        </nav>
      </header>
    </div>
  )
}

export default Header