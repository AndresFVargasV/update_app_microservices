const { connectToDatabase } = require('./dbconfig');

// Función asíncrona para actualizar una persona en la base de datos
async function actualizarPersona(
    primer_nombre,
    segundo_nombre,
    apellidos,
    fecha_nacimiento,
    genero_id,
    correo_electronico,
    celular,
    numero_documento,
    tipo_documento,
    foto) {

    // Implementar la logica aquí para actualizar una persona en la base de datos y manejamos los errores con try/catch
    try {

        // Conectarse a MongoDB
        const client = await connectToDatabase();

        // Seleccionar la base de datos y la colección
        const db = client.db('crud');
        const collection = db.collection('crudmicroservices');

        // Crear el documento que se va a actualizar en la colección
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

        // Creamos un filtro para buscar el documento que queremos actualizar
        const filtro = { numero_documento: numero_documento };

        // Creamos un objeto con los nuevos valores para actualizar el documento
        const nuevosValores = {
            $set: {
                primer_nombre,
                segundo_nombre,
                apellidos,
                fecha_nacimiento,
                genero_id,
                correo_electronico,
                celular: celular,
                numero_documento,
                tipo_documento,
                foto: foto
            }
        };

        // Actualizamos el documento
        const result = await collection.updateOne(filtro, nuevosValores);

        // Verificar el resultado
        if (result.acknowledged) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        // Respodemos la petición con un error 503 Service Unavailable
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

// Exportar la función para usarla en otros módulos
module.exports = actualizarPersona;