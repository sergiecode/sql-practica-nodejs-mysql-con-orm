require('dotenv').config();
const express = require('express');
const sequelize = require('./database');
const Profesor = require('./models/Profesor');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API Profesores funcionando' });
});

// ALTA: Crear profesor
app.post('/profesores', async (req, res) => {
  try {
    const { nombre, email, materia } = req.body;
    
    const profesor = await Profesor.create({
      nombre,
      email,
      materia
    });
    
    console.log('Profesor creado:', profesor.toJSON());
    
    res.status(201).json({
      message: 'Profesor creado exitosamente',
      id: profesor.id,
      profesor: { id: profesor.id, nombre, email, materia }
    });
  } catch (error) {
    console.error('Error al crear profesor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// LISTAR: Obtener todos los profesores
app.get('/profesores', async (req, res) => {
  try {
    const profesores = await Profesor.findAll({
      where: {
        activo: true
      }
    });
    
    console.log('Profesores obtenidos:', profesores.length);
    
    res.json({
      message: 'Profesores obtenidos exitosamente',
      profesores: profesores
    });
  } catch (error) {
    console.error('Error al obtener profesores:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// BAJA LÓGICA: Desactivar profesor
app.delete('/profesores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [affectedRows] = await Profesor.update(
      { activo: false },
      { where: { id: id } }
    );
    
    console.log('Profesor actualizado:', id);
    console.log('Parámetro ID:', id);
    
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }
    
    res.json({
      message: 'Profesor dado de baja exitosamente',
      id: parseInt(id)
    });
  } catch (error) {
    console.error('Error al dar de baja profesor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// BAJA FÍSICA: Eliminar profesor permanentemente
app.delete('/profesores/:id/fisico', async (req, res) => {
  try {
    const { id } = req.params;
    
    const affectedRows = await Profesor.destroy({
      where: { id: id }
    });
    
    console.log('Profesor eliminado:', id);
    console.log('Parámetro ID:', id);
    
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }
    
    res.json({
      message: 'Profesor eliminado permanentemente',
      id: parseInt(id)
    });
  } catch (error) {
    console.error('Error al eliminar profesor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar servidor
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
  
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log('Endpoints disponibles:');
  console.log('- POST /profesores (alta)');
  console.log('- GET /profesores (listar activos)');
  console.log('- DELETE /profesores/:id (baja lógica)');
  console.log('- DELETE /profesores/:id/fisico (baja física)');
});