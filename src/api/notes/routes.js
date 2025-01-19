// const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handler');
// const routes = [
//     {
//         method: 'POST',
//         path: '/notes',
//         handler: addNoteHandler
//     },
//     {
//         method: 'GET',
//         path: '/notes',
//         handler: getAllNotesHandler
//     },
//     {
//         method: 'GET',
//         path: '/notes/{id}',
//         handler: getNoteByIdHandler
//     },
//     {
//         method: 'PUT',
//         path: '/notes/{id}',
//         handler: editNoteByIdHandler
//     },
//     {
//         method: 'DELETE',
//         path: '/notes/{id}',
//         handler: deleteNoteByIdHandler
//     }

// ];

const routes = (handler) => [
    {
        method: 'POST',
        path: '/notes',
        handler: handler.postNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: handler.getNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: handler.getNoteByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: handler.putNoteByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: handler.deleteNoteByIdHandler,
    },
];

module.exports = routes; 