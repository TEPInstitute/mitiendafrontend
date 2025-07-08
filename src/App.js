import React from 'react';
import ProductoForm from './ProductoForm';
import ListaProductos from './ListaProductos';
import './App.css';

function App() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '2rem' }}>
      <h1> Mi Tienda TEP</h1>
      <ProductoForm />
      <ListaProductos />
    </div>
  );
}

export default App;
