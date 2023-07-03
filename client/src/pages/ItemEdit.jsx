import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ItemEdit = () => {

    const navigate = useNavigate();
    const { id } = useParams()
    const [item, setItem] = useState({})

    const deleteItem = async () => {

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/item/${id}`);
            Swal.fire({
                icon: 'success',
                title: 'YA FUE',
                text: "Borrado"
            })
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Ops que mal!!!',
                text: `Error: ${error?.response?.data?.message || error.message}`,
            })
        }
        navigate('/');
    }


    useEffect(() => {

        const getData = async () => {
            const respuesta = await axios.get(`${process.env.REACT_APP_API_URL}/item/${id}`);
            setItem(respuesta.data);
        }

        getData();

    }, [id])

    const editItem = async (values, actions) => {

        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/item/${id}`, values);
            console.log(res);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'GREAT!',
                    text: `you item was edited!`,
                });

                navigate('/');
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oh no!',
                text: `Error: ${error?.response?.data?.message || error.message}`,
            })
        }
    }

    const AddErrors = Yup.object().shape({
        title: Yup.string()
            .min(3, 'we need at least 3 caracters')
            .required('Required'),
        price: Yup.number()
            .required('Required'),
        description: Yup.string()
            .min(3, 'we need at least 3 caracters')
            .required('Required'),
    });




    return (
        <>
            <div className='header'>
                <h1>Edit Item</h1>
                <Link to="/" >back to Home</Link>
            </div>

            <Formik
                enableReinitialize={true}
                initialValues={item}
                onSubmit={editItem}
                validationSchema={AddErrors}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className='header'>
                            <h4 >Edit Item: {item.title}</h4>
                        </div>
                        <div className='formcontainer'>
                            <div className='formleft'>
                                <p>New Title:</p>
                                <Field name="title" className="form-control" placeholder="Title" />
                                {touched.title && errors.title && <div className="ms-3 mt-3 text-danger">{errors.title}</div>}

                                <p>New Price:</p>
                                <Field type="number"
                                    name="price" className="form-control" placeholder="Price" />
                                {touched.price && errors.price && <div className="ms-3 mt-3 text-danger" >{errors.price}</div>}
                                <p>New description:</p>
                                <Field name="description" as="textarea" className="form-control" placeholder="description" />
                                {touched.description && errors.description && <div className="ms-1 mt-3 text-danger">{errors.description}</div>}

                                <button className="ms-1 mt-3" id_item={item._id}>Edit</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <button id_item={item._id} onClick={deleteItem}>Delete</button>
        </>
    )
}


export default ItemEdit