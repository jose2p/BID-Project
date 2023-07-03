import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductAdmin from './ProductAdmin';
import ProductForm from './ProductForm';
const ListProduct = () => {
    const [items, setItems] = useState([]);
    // Cargar todos los productos
    useEffect(() => {
        axios.get('http://localhost:8000/api/item')
            .then(res => {
                setItems(res.data);
            });
    }, [items]);

    return (
        <main className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className="toolBar" />
                    {items.length === 0 ? (
                        <h3>No hay productos disponibles</h3>
                    ) : (
                        <Grid container className='justify-content-center mt-5'>
                            {items.map((item) => {
                                return (
                                    <Grid key={item._id}>
                                        <ProductAdmin item={item} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    )}
                </div>
                <hr />
                <div className='row'>
                    <div className='col-md-12'>
                        <ProductForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
export default ListProduct