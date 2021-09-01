const byEmail = (array, email) => { return array.find(item => item.email === email) }
const byUser_id = (array, user_id) => { return array.find(item => item.user_id === user_id) }
const byPayment = (array, paymentId) => { return array.find(item => item.paymentId === paymentId) }


module.exports = { byEmail, byPayment, byUser_id }