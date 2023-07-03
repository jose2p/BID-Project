import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'

const DeleteVenta = ({ id }) => {
    const eliminarVenta = async (id) => {

        try {
            await axios.delete(`http://localhost:8000/api/venta/${id}`);
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Ops que mal!!!',
                text: `Error: ${error?.response?.data?.message || error.message}`,
            })
        }
    }

    const confirmarEliminar = (id) => {
        Swal.fire({
            title: 'Estas seguro de eliminar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI, borrar ahora!'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarVenta(id)
            }
        })
    }

    return (
        <div>
            <button className='' onClick={() => { confirmarEliminar(id) }}>Eliminar</button>
        </div>
    )
}

export default DeleteVenta