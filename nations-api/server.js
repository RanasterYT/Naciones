const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Configurar CORS más permisivo para pruebas
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '10mb' }));

let nationsData = null;

// Ruta raíz para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.json({ status: 'Servidor activo', timestamp: new Date().toISOString() });
});

// Endpoint para que el addon envíe los datos
app.post('/api/nations', (req, res) => {
    try {
        console.log('[API] Recibido POST /api/nations');
        console.log('[API] Body recibido:', JSON.stringify(req.body).substring(0, 200) + '...');
        nationsData = req.body;
        console.log('[API] Datos actualizados correctamente:', new Date().toISOString());
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('[API] Error en POST:', error);
        res.status(500).json({ error: 'Error al guardar datos' });
    }
});

// Endpoint para que la página web obtenga los datos
app.get('/api/nations', (req, res) => {
    console.log('[API] Recibido GET /api/nations');
    if (nationsData) {
        console.log('[API] Enviando datos, tamaño:', JSON.stringify(nationsData).length);
        res.json(nationsData);
    } else {
        console.log('[API] No hay datos disponibles');
        res.status(404).json({ error: 'No hay datos disponibles' });
    }
});

// Manejador de errores general
app.use((err, req, res, next) => {
    console.error('[API] Error interno:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
    console.log(`Ruta raíz: http://localhost:${port}/`);
    console.log(`Ruta API: http://localhost:${port}/api/nations`);
});