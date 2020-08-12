import { Document } from 'mongoose'
export class Vaga extends Document {
    space: string
    busy: boolean
    carId: string
}
