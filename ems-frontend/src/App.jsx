import './App.css'
import Header from './components/Header'
import FooterComponent from './components/FooterComponent'
import ListEmployee from './components/ListEmployee'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'
import DepartmentComponent from './components/DepartmentComponent'
import ListDepartment from './components/ListDepartment'

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<ListEmployee />}></Route>
          <Route path='/employees' element={<ListEmployee />}></Route>
          <Route path='/add-employee' element={<EmployeeComponent />}></Route>
          <Route path='/edit-employee/:id' element={<EmployeeComponent />}></Route>
          <Route path='/departments' element={<ListDepartment />}></Route>
          <Route path='/add-department' element = { <DepartmentComponent /> }></Route>
          <Route path='/edit-department/:id' element = { <DepartmentComponent />}></Route>
        </Routes>
        <FooterComponent />
      </Router>
    </>
  )
}

export default App
