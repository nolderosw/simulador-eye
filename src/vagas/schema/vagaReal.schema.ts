import * as mongoose from 'mongoose'

export const VagaRealSchema = new mongoose.Schema({
    space: Number,
    busy: Boolean,
    carId: String
}, {collection: 'vagasReal'})