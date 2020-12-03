import { atom } from "recoil"

const login = atom({
    key: 'login',
    default: false,
})

const type = atom({
    key: 'type',
    default: 'Seller'
})

const popups = atom({
    key: 'popups',
    default: ''
})

const buyerAddress = atom({
    key: 'buyerAddress',
    default: ''
})

const productId = atom({
    key: 'productId',
    default: ''
})

const productIdHome = atom({
    key: 'productIdHome',
    default: ''
})

const secretId = atom({
    key: 'secretId',
    default: ''
})

const fall = atom({
    key: 'fall',
    default: ''
})

export { login, type, popups, buyerAddress, productId, fall,secretId,productIdHome }