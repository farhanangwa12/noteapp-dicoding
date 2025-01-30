const CollaborationsHandler = require('./handler');
const routes = require('./routes');
module.exports = {
    name:'collaborations',
    version: '1.0.0',
    register: async (server, {collaborationsService, noteService, validator}) => {
        
        const collaborationsHandler = new CollaborationsHandler(collaborationsService, noteService, validator);

        server.route(routes(collaborationsHandler));
    }
}