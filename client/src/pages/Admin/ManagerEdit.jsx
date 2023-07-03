import React from 'react'
import { Link } from 'react-router-dom'
import UpdateProductForm from '../../components/Administrador/UpdateProductForm'

const ManagerEdit = () => {
  return (
    <div className='container'>
      <div className='col-md-10'>
        <h2>Edicion del Producto</h2>
        <UpdateProductForm />
      </div>
      <div className='col-md-2'>
        <Link to="/admin" >
          <button className='btn btn-primary'>Back to Home</button>
        </Link>
      </div>
    </div>
  )
}

export default ManagerEdit