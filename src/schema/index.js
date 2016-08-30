import { Schema, arrayOf } from 'normalizr';

const wizardSchema = new Schema('wizards');
const authorSchema = new Schema('authors');
wizardSchema.define({
	author: authorSchema
});

const wizardsSchema = arrayOf(wizardSchema);

export { wizardSchema, wizardsSchema, authorSchema }
