import React, { useEffect, useState } from 'react';

function ListaProductos() {
  const [productos, setProductos] = useState([]);

  // Cargar productos al inicio
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/productos`)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('❌ Error cargando productos:', err));
  }, []);

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    console.log('🛠️ Intentando eliminar producto con ID:', id);

    // Verificación adicional
    if (!id || id.length !== 24) {
      console.warn('⚠️ ID no válido para MongoDB:', id);
      return;
    }

    try {
      const respuesta = await fetch(`${process.env.REACT_APP_API_URL}/productos/${id}`, {
        method: 'DELETE'
      });

      if (!respuesta.ok) {
        const msg = await respuesta.text();
        throw new Error(`Error al eliminar (código ${respuesta.status}): ${msg}`);
      }

      console.log('✅ Producto eliminado correctamente');

      // Quitar producto del estado
      setProductos(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error('❌ Error eliminando producto:', error);
    }
  };

  return (
    <div>
      <h2>📦 Lista de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos todavía.</p>
      ) : (
        productos.map((producto) => (
          <div
            key={producto._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#f9f9f9'
            }}
          >
            <p><strong>{producto.nombre}</strong></p>
            <p>Precio: {producto.precio}€</p>
            <p>Categoría: {producto.categoria}</p>
            <button
              onClick={() => eliminarProducto(producto._id)}
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ListaProductos;
