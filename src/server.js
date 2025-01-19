require('dotenv').config();
const Hapi = require('@hapi/hapi');
const NotesService = require('./services/postgres/NotesService');
const notes = require('./api/notes');

const NotesValidator = require('./validator/notes/index');
const ClientError = require('./exceptions/ClientError');

const init = async () => {

    const noteService = new NotesService();
    const server = Hapi.server({
        host: process.env.HOST,
        port: process.env.PORT,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });







    await server.register({
        plugin: notes,
        options: {
            service: noteService,
            validator: NotesValidator
        }

    })


    server.ext('onPreResponse', (request, h) => {
        // mendapatkan konteks response dari request
        const { response } = request;

      
        // penanganan client error secara internal.
        if (response instanceof ClientError) {

          
            const newResponse = h.response({
                status: 'fail',
                message: response.message,
            });
            newResponse.code(response.statusCode);
            return newResponse;
        }

        return h.continue;
    });

    await server.start();

    console.log(`Server berhasil berjalan di ${server.info.uri}`);
}



init();
