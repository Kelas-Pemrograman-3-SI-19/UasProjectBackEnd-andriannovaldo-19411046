const ticketModel = require('../model/Ticket')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')

exports.insertTicket = (data) =>
  new Promise((resolve, reject) => {
    ticketModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input Ticket')))
    .catch(() => reject(requestResponse.serverError))
  })

exports.getAllTicket = () =>
  new Promise((resolve, reject) => {
    ticketModel.find({})
     .then(ticket => resolve(requestResponse.suksesWithData(ticket)))
     .catch(error => reject(requestResponse.serverError))
  })

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    ticketModel.findOne({
      _id: objectId(id)
    }).then(ticket => resolve(requestResponse.suksesWithData(ticket)))
    .catch(error => reject(requestResponse.serverError))
  })

exports.edit = (data, id, changeImage) =>
  new Promise((resolve, reject) => {
    ticketModel.updateOne({
      _id: objectId(id)
    }, data)
      .then(() => {
        if (changeImage) {
          deleteImage(data.oldImage)
        }
        resolve(requestResponse.sukses('Berhasil Edit Data'))
      }).catch(() => reject(requestResponse.serverError))
  })

exports.delete = (id) =>
  new Promise((resolve, reject) =>{
    ticketModel.findOne({
      _id: objectId(id)
    }).then(ticket => {
      ticketModel.deleteOne({
        _id: objectId(id)
      }).then(() => {
        deleteImage(ticket.image)
        resolve(requestResponse.sukses('Berhasil Delete Ticket'))
      }).catch(() => reject(requestResponse.serverError))
    })
  })