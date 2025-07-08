import React, { useState } from 'react';

const ProductoForm = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      precio: parseFloat(precio),
      categoria,
    };

    try {
      const respuesta = await fetch(`${process.env.REACT_APP_API_URL}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (respuesta.ok) {
        setMensaje('✅ Producto añadido con éxito');
        setNombre('');
        setPrecio('');
        setCategoria('');
      } else {
        setMensaje('❌ Error al añadir el producto');
      }
    } catch (error) {
      console.error(error);
      setMensaje('⚠️ Fallo al conectar con el servidor');
    }
  };

  return (
    <div style={{ padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px' }}>
      <h2>Agregar producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label><br />
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Precio:</label><br />
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        </div>
        <div>
          <label>Categoría:</label><br />
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Guardar</button>
      </form>
      {mensaje && <p style={{ marginTop: '1rem' }}>{mensaje}</p>}
    </div>
  );
};

export default ProductoForm;
