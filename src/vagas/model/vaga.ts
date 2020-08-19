import { Document } from 'mongoose'
export class Vaga extends Document {
    space: number
    busy: boolean
    carId: String
}
