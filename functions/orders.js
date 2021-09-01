const users = require('../models/users');
const products = require('../models/products');
const paymethods = require('../models/paymethods');
const orders = require('../models/orders');
const confirmedProducts = require('../models/confirmedProducts');
const confirmedOrder = require('../models/confirmedOrders');
const search = require('./finders')

// Crea una nueva orden agregando un producto.
const addProduct = (headers) => {
    const user_id = parseInt(headers.user_id)
    const productIndex = parseInt(headers.productindex)
    const dataUser = search.byUser_id(users, user_id);
    const dataOrder = products[productIndex]
    orders.push({
        idOrder: dataUser.user_id,
        address: dataUser.address,
        product: dataOrder.name,
        price: dataOrder.price,
        status: "Pending"
    });  
    return { msg: `You added one product to your order.` };
};

// Usuario hace check out confirmando su pedido y metodo de pago.
const checkout = (headers) => {
    const payment_id = parseInt(headers.payment_id)
    const findPaymentMethod = search.byPayment(paymethods, payment_id)
    const userPayMethod = findPaymentMethod.paymentMethod
    const user_id = parseInt(headers.user_id)
    let totalPrice = 0;
    const userOrder = orders.filter(orders => orders.idOrder === user_id);
    if (userOrder.length === 0) {
        return { msg: "Your order is empty." }
    } else {
        userOrder.forEach(function (order) {
            totalPrice += order.price
            confirmedProducts.push(order.product)
            status = "Confirmed"
        });
        confirmedOrder.push({
            order_id: user_id,
            productsOrder: confirmedProducts,
            totalPrice,
            userPayMethod,
            status
        })
        return { confirmedOrder }
    }
};

// Muestra historial de ordenes del usuario por su ID.
const historyOrders = (headers) => {
    const user_id = parseInt(headers.user_id)
    const orderHistoryByUserId = confirmedOrder.filter(confirmedOrder => confirmedOrder.order_id === user_id);
    if (orderHistoryByUserId.length === 0) {
        return { msg: "Your order history is empty." }
    } else {
        return { orderHistoryByUserId }
    }
};

// Editar estado de una orden.
const editOrderStatus = (params, headers) => {
    const new_status = headers.new_status;
    const order_id = parseInt(params);
    const order = confirmedOrder.find(element => element.order_id === order_id);
     if (order.length === 0) {
        return { msg: "Order doesn't exists." }
    } else {
        order.status = new_status
                return { msg: "Order status updated." }
    } 
};

// Retorna array con ordenes confirmadas por usuarios.
const showOrders = () => {
    return { confirmedOrder }
}


module.exports = {addProduct, checkout, historyOrders, editOrderStatus, showOrders };