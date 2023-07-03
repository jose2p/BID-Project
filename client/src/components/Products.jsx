import { Grid, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';


const Products = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    useEffect(() => {
        axios.get('http://localhost:8000/api/item')
            .then(res => {
                setItems(res.data);
            });
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <main className='container'>
                <div className="toolBar" />
                <Grid container className='justify-content-center mt-5'>
                    {currentItems.map((item) => {
                        return (
                            <Grid key={item._id}>
                                <Product item={{ ...item, title: item.title.slice(0, 14) }} />
                            </Grid>
                        )
                    })}
                </Grid>
            </main>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                className="pagination"
            />
        </>
    );
}

export default Products;