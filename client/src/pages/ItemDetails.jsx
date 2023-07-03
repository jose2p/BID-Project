import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const ItemDetails = () => {
    const { id } = useParams()
    const [item, setItem] = useState({})

    useEffect(() => {

        const getData = async () => {
            const respuesta = await axios.get(`http://localhost:8000/api/item/${id}`);
            setItem(respuesta.data);
        }

        getData();

    }, [id])

    return (
        <div className='container'>
            <div className='col-md-2'>
            <Link to={`/item/${item._id}/edit`} >
                <button className='btn btn-primary'>Actualizar</button>
            </Link>
            </div>
            <div className="col-md-8">
                <h2>{item.title}</h2>
                <img src={item.imgurl} alt="Img" className='img_width' />
                <h3>Descripción</h3>
                <p>{item.description}</p>
                <h3>Precio</h3>
                <p>${item.price} USD </p>
            </div>
            <div className='col-md-2'>
                <Link to="/admin" >
                    <button className='btn btn-primary'>Volver al inicio</button>
                </Link>
            </div>
        </div>
    )
}

export default ItemDetails