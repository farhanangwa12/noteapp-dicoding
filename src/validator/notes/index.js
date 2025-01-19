const InvariantError = require("../../exceptions/InvariantError");
const { NotePayloadSchema } = require("./schema")

const NotesValidator =  {
    validateNotePayload: (payload) => {

        const validationResult = NotePayloadSchema.validate(payload);

        console.log(validationResult.error);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
            
        }
    },



}


module.exports = NotesValidator;