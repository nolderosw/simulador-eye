import * as mongoose from 'mongoose'

export const VagaSchema = new mongoose.Schema({
    space: String,
    busy: Boolean,
    carId: String
}, {collection: 'vagas'})