const { connectToDatabase } = require('./dbconfig');

async function insertarPersona(
    primer_nombre,
    segundo_nombre,
    apellidos,
    fecha_nacimiento,
    genero_id,
    correo_electronico,
    celular,
    numero_documento,
    tipo_documento,
    foto
) {

    let client;

    try {

        // Conectarse a MongoDB
        client = await connectToDatabase();

        // Seleccionar la base de datos y la colección
        const db = client.db('crud');
        const collection = db.collection('crudmicroservices');


        // Crear el documento que se va a insertar en la colección
        const persona = {
            primer_nombre,
            segundo_nombre,
            apellidos,
            fecha_nacimiento,
            genero_id,
            correo_electronico,
            celular,
            numero_documento,
            tipo_documento,
            foto
        };
        
        const filtro = { numero_documento: numero_documento };
        console.log(persona);

        const nuevosValores = {
            $set: {
                primer_nombre: primer_nombre,
                segundo_nombre: segundo_nombre,
                apellidos: apellidos,
                fecha_nacimiento: fecha_nacimiento,
                genero_id: genero_id,
                correo_electronico: correo_electronico,
                celular: celular,
                numero_documento: numero_documento,
                tipo_documento: tipo_documento,
                foto: foto
            }
          };

        const result = await collection.updateOne(filtro, nuevosValores);

        if (result.acknowledged) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al insertar datos o al conectarse con la BD', error);
        res.status(503).json({
            "res": "Error"
        });
    } finally {
        // Cerrar la conexión con MongoDB
        if (client) {
            await client.close();
        }
    }
}

module.exports = insertarPersona;