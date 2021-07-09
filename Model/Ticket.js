const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const TicketSchema = new Schema({
    namabus: {
        type: String
    },
    harga: {
        type: Number
    },
    lokasitujuan: {
        type: String,
    },
    kelasbus: {
        type: String
    },
    deskripsi: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('ticket', TicketSchema)