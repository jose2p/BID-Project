import React, { useState, useEffect } from 'react';
import { useCart } from '../Context/DataContext';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
export default function Cart({ onRemove, onUpdate }) {
    const { items } = useCart();
    const [cartItems, setCartItems] = useState(items);
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleQuantityChange = (event, item) => {
        const newCartItems = cartItems.map(cartItem => {
            if (cartItem.id === item.id) {
                return { ...cartItem, quantity: parseInt(event.target.value) };
            }
            return cartItem;
        });
        setCartItems(newCartItems);
        onUpdate(item.id, parseInt(event.target.value));
        window.location.reload();
    };

    const handleRemove = (item) => {
        const newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
        setCartItems(newCartItems);
        onRemove(item.id);
        window.location.reload();
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        return totalPrice;
    }

    const handleUpdateQuantity = (item, quantity) => {
        const newCartItems = cartItems.map(cartItem => {
            if (cartItem.id === item.id) {
                return { ...cartItem, quantity: quantity };
            }
            return cartItem;
        });
        setCartItems(newCartItems);
        onUpdate(item.id, quantity);
        window.location.reload();
    };

    let local_price = {
        amount: calculateTotalPrice(),
        currency: 'USD'
    }

    const calculateTotalQuantity = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += total + item.quantity;
        });
        return total;
    }
    const handleAgregarProducto = () => {
        navigate("/")
    }
    let description = "Total de productos: " + calculateTotalQuantity();
    // let description = "Total de productos comprados" + total_products
    const pagarCompra = () => {
        axios.post('http://localhost:8000/create-charge', {
            local_price,
            description
        })
            .then(res => {
                const url = res.data.hosted_url
                window.location.href = url
            })
    }
    return (
        <>
      <div className="container">
        {cartItems.length === 0 ? (
          <Typography variant="h6" className="d-flex align-items-center">
          No hay productos en el carrito
          <br />
          <Button color="primary" onClick={handleAgregarProducto}>
            Continuar comprando
          </Button>
        </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Typography variant="subtitle1">{item.title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">${item.price}</Typography>
                      </TableCell>
                      <TableCell>
                        <div className="quantity">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <TextField
                            type="number"
                            variant="outlined"
                            size="small"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(e, item)}
                            className="quantityInput"
                            inputProps={{ min: 1 }}
                          />
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          className="removeButton"
                          onClick={() => handleRemove(item)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" className="d-flex align-items-center">
              Total Price: ${calculateTotalPrice()}
            </Typography>
            <div>
            <Button color="success" variant="outlined" onClick={pagarCompra}>
              Pagar con Coinbase
            </Button>
            <Button color="success" variant="outlined">
              Pagar con Tarjeta de Crédito
            </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};