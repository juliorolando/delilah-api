const paymethods = require('../models/paymethods')

//Crea un nuevo metodo de pago.
const createPayMethod = (headers) => {
    paymethods.push({
        "paymentId": headers.paymentid,
        "paymentMethod": headers.paymentmethod
    })
    return { msg: "Payment method created and added to payments methods list." }
}

//Retorna un array con los metodos de pago existentes.
const showPayMethods = () => {
    return { paymethods }
}

//Edita un metodo de pago.
const editPayMethod = (headers) => {    
    const indexFromFront = parseInt(headers.editpaymentid - 1)
    paymethods[indexFromFront].paymentMethod = headers.paymentmethod;
    return { msg: "Payment method updated." }
}

//Borra un metodo de pago.
const deletePayMethod = (headers) => {
    const indexFromFront = parseInt(headers.deleteid - 1)
    paymethods.splice(indexFromFront, 1)
    return { msg: "Payment method deleted." }
}

module.exports = { createPayMethod, showPayMethods, editPayMethod, deletePayMethod }