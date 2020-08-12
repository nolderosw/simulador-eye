import * as mongoose from 'mongoose'

export const VagaSchema = new mongoose.Schema({
    space: Number,
    busy: Boolean,
    carId: String
}, {collection: 'vagas'})