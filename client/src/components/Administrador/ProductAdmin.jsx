import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

// import { useCart } from '../Context/DataContext';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Swal from 'sweetalert2';
import Edit from '@mui/icons-material/Edit';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
export default function ProductAdmin({ item }) {

    // const { addItemToCart } = useCart();
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleEditProduct = (item) => {
        navigate("/edit/" + item._id)
    };


    const handleDelProduct = (deleteID) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/item/` + deleteID)
                    .then(res => {
                        console.log(res.data);
                        Swal.fire(
                            '¡Borrado!',
                            'El producto ha sido eliminado.',
                            'success'
                        );
                    });
            }
        });
    }
    return (
        <Card sx={{ maxWidth: 200, marginX: 5, marginY: 10 }}>
            <CardHeader
                title={item.title}
                subheader={item.brand}
            />
            <CardMedia
                component="img"
                width="200"
                image={item.imgurl}
                alt="Imagen producto"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {item.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {/*Btn de favorito*/}
                {/*Btn de añadir al carro*/}
                <IconButton aria-label="add to cart" onClick={() => {
                    console.log('Edit button clicked');
                    handleEditProduct(item);
                }}>
                    <Edit />
                </IconButton>
                <IconButton aria-label="add to cart" onClick={() => {
                    console.log('Delete button clicked');
                    handleDelProduct(item._id);
                }}>
                    <DeleteIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Full Description:</Typography>
                    <Typography paragraph>
                        {item.description}
                    </Typography>
                    <Typography paragraph>
                        Price: {item.price} $
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}