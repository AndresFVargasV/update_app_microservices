const express = require('express');
const router = express.Router();
const insertarPersona = require('./update.js');
const cors = require('cors');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/', (req, res) => {
    res.json({
        "Res": "API is working"
    });
});

router.post('/updatepeople', cors(), upload.single('foto'), async (req, res) => {
    const {
        primer_nombre,
        segundo_nombre,
        apellidos,
        fecha_nacimiento,
        genero_id,
        correo_electronico,
        celular,
        numero_documento,
        tipo_documento } = req.body;

    const foto = req.file ? req.file.buffer.toString('base64') : req.body.foto;


    try {
        const result = await insertarPersona(primer_nombre,
            segundo_nombre,
            apellidos,
            fecha_nacimiento,
            genero_id,
            correo_electronico,
            celular,
            numero_documento,
            tipo_documento,
            foto);

        if (result === true) {
            res.status(200).json({
                "res": "People added successful"
            });
        } else {
            res.estatus(503).json({
                "res": "People added failed"
            });
        }
    } catch (err) {
        console.error('Error al insertar datos:', err.message);
        res.status(503).json({
            "res": "People added failed"
        });
    }
});


module.exports = router;