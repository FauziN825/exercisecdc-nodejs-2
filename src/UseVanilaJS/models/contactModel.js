
let data = require('../../data/contact.json')

const {v4: uuidv4} = require('uuid')

// const c = require('../../data/contact.json')

const {writeDataToFile} = require('../utilsfile')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(data)
    })
}

function findById(id){
    return new Promise((resolve, reject) => {
        const contact = data.find( (c) => c.id == id)
        // console.log(contact);
        resolve(contact)
    })
}

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    
    
function sortedName(){
    return new Promise((resolve, reject) => {
        
        data.sort(GetSortOrder("name"))
        // console.log(newData);
        resolve(data)
    })
}

function sortedAddress(){
    return new Promise((resolve, reject) => {
        
        data.sort(GetSortOrder("address"))
        resolve(data)
    })
}


function create(contact){
    return new Promise((resolve, reject) => {
      const newContact = {id: uuidv4(), ...contact}
      data.push(newContact)
      writeDataToFile('./src/data/contact.json', data)
      resolve(newContact)
    })
}

function update(id, contact){
    return new Promise((resolve, reject) => {
        const index = data.findIndex((c) => c.id === id )
        data[index] = { id, ...contact}
        writeDataToFile('./src/data/contact.json', data)
        resolve(data[index])
    })
}


function remove(id){
    return new Promise((resolve, reject) => {

        data  = data.filter ( (c) => c.id !== id)
        writeDataToFile('./src/data/contact.json', data)
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    sortedName,
    sortedAddress, 
    update,
    remove
}