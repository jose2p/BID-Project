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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
import { useCart } from './Context/DataContext';
import { useState } from 'react';
import Swal from 'sweetalert2';


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

export default function Product({ item }) {

    const { addItemToCart } = useCart();

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleAddToCart = () => {
        console.log('Adding item to cart:', item);
        addItemToCart(item);
        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado!',
            text: 'El producto se ha agregado correctamente.',
        });
    };

    const [clicked, setClicked] = useState(false);
    const handleClickFav = (id) => {
        setClicked((current) => !current);
        if (clicked) {
            alert(`Product ${item.title} was removed from your favorite list`);
        } else {
            alert(`Product ${item.title} was added to your favorite list`);
        }
    };

    return (
        <Card sx={{ maxWidth: 200, marginX: 5, marginY: 10 }}>
            <CardHeader
                title={item.title}
                subheader={item.brand}
            />
            <CardMedia
                component="img"
                width="200"
                height="200"
                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                image={item.imgurl}
                alt="Imagen producto"
            />
            <CardContent>
                <Typography variant="body2" color="ActiveCaption">
                    Price: {item.price} $
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites" onClick={() => handleClickFav(item._id)}>
                    {clicked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
                </IconButton> */}
                <IconButton aria-label="add to cart" onClick={() => {
                    console.log('Cart button clicked');
                    handleAddToCart();
                }}>
                    <ShoppingCartIcon />
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
                    <Typography>

                    </Typography>
                    <Typography paragraph>
                        {item.description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}