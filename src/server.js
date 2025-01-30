require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');


const NotesService = require('./services/postgres/NotesService');
const UsersService = require('./services/postgres/UsersService');
const notes = require('./api/notes');
const users = require('./api/users');

const NotesValidator = require('./validator/notes/index');
const ClientError = require('./exceptions/ClientError');
const UserValidator = require('./validator/users');



// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

const collaborations = require('./api/collaborations');
const CollaborationsService = require('./services/postgres/CollaborationsService');
const CollaborationsValidator = require('./validator/collaborations');
const init = async () => {
    const collaborationsService = new CollaborationsService();
    const noteService = new NotesService(collaborationsService);
    const usersService = new UsersService();
    const authenticationsService = new AuthenticationsService();
   

    const server = Hapi.server({
        host: process.env.HOST,
        port: process.env.PORT,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });

    await server.register([
        {
            plugin: Jwt,
        }
    ]);

    // mendefinisikan strategy autentikasi jwt
    server.auth.strategy('notesapp_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    });


    await server.register([
        {
            plugin: notes,
            options: {
                service: noteService,
                validator: NotesValidator
            }

        },
        {
            plugin: users,
            options: {
                service: usersService,
                validator: UserValidator
            }
        },
        {
            plugin: authentications,
            options: {
                authenticationsService,
                usersService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },
        {
            plugin: collaborations,
            options: {
                collaborationsService,
                noteService,
                validator: CollaborationsValidator,
              },
        }
    ])


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
