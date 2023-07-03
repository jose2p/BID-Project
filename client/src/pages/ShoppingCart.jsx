import React from 'react';
import Cart from '../components/Cart/Cart'

export default function ShoppingCart() {
  const handleUpdate = (itemId, newQuantity) => {
    // Update the quantity of the item with the given itemId
    console.log(`Updating item ${itemId} to have quantity ${newQuantity}`);
  };

  const handleRemove = (itemId) => {
    // Remove the item with the given itemId
    console.log(`Removing item ${itemId}`);
  };

  return (
    <div>
      <Cart onUpdate={handleUpdate} onRemove={handleRemove} />
    </div>
  );
}