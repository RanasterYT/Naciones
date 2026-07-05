const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

let nationsData = null;

// Endpoint para que el addon envíe los datos
app.post('/api/nations', (req, res) => {
    try {
        nationsData = req.body;
        console.log('[API] Datos actualizados:', new Date().toISOString());
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar datos' });
    }
});

// Endpoint para que la página web obtenga los datos
app.get('/api/nations', (req, res) => {
    if (nationsData) {
        res.json(nationsData);
    } else {
        res.status(404).json({ error: 'No hay datos disponibles' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});