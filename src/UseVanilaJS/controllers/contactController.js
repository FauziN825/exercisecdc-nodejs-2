const Contact = require('../models/contactModel')

const {getPostData} = require('../utilsfile')
const validator = require('validator')
// Readline 
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


async function getContact(req, res) {
    try {       
        const contacts = await Contact.findAll()
        if(!contacts){
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify({message: "Contact Not Found"}))
        }
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(contacts))
        res.end();
    } catch (err) {
        console.log(err);
    }
}



async function getContactId(req, res, id){
    try {
        const contacts = await Contact.findById(id)
        if(!contacts){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.write(JSON.stringify({message: "Contact Not Found"}))
            res.end()
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(contacts))
            res.end();
        }
  
        
    } catch (err) {
        console.log(err);
    }
}


async function sortedDataByName(req, res){
    try {
        const contacts = await Contact.sortedName()
        if(!contacts){
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify({message: "Contact Not Found"}))
        }
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(contacts))
        res.end();
        
    } catch (err) {
        console.log(err);
    }
}

async function sortedDataByAddress(req, res){
    try {
        const contacts = await Contact.sortedAddress()
        if(!contacts){
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify({message: "Contact Not Found"}))
            res.end()
        }
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(contacts))
        res.end();
        
    } catch (err) {
        console.log(err);
    }
}


async function createContact(req, res) {
    try {       
        // const inputContact = {
        //     name: 'Ariena Azkiyatuz',
        //     noHp: '081320462186',
        //     address: 'Bojong Tengah'
        // }

        const body = await getPostData(req)
        const {name, noHp, address} = JSON.parse(body)
        const inputContact = {
            name,
            noHp,
            address
        }

        // console.log(inputContact.name);

        const contacts = await Contact.findAll()
        console.log(contacts);
        const duplicate =  contacts.find(o => o.noHp === inputContact.noHp)

        console.log(duplicate);
        if(duplicate){
            res.writeHead(400,  {'Content-Type': 'application/json'})
            res.write(JSON.stringify({message: `Phone number ${inputContact.noHp} already registered, use another phone number`}))
            res.end()
            return false;
        }
        if(!validator.isMobilePhone(inputContact.noHp, 'id-ID')) {
            res.writeHead(400,  {'Content-Type': 'application/json'})
            res.write(JSON.stringify({message: `Invalid Number Phone Format`}))
            res.end()
            return false;
        }

        console.log(inputContact.name);

        if(inputContact.name){
            if(!validator.isAlpha(inputContact.name ,'en-US', {ignore: '\s'})){
                res.writeHead(400,  {'Content-Type': 'application/json'})
                res.write(JSON.stringify({message: `Name should only use alphabet`}))
                res.end()
                return false;
            }
        }
        if(inputContact.address){
            if(!validator.isLength(inputContact.address, {min: 0, max: 10})) {
                res.writeHead(400,  {'Content-Type': 'application/json'})
                res.write(JSON.stringify({message: `Address Maximum 5`}))
                res.end()
                return false;
            }
        }



        const newProduct = await Contact.create(inputContact)
        res.writeHead(201,  {'Content-Type': 'application/json'})

        return res.end(JSON.stringify(newProduct))


        // let body = ''
        // req.on('data', (chunk) => {
        //     body += chunk.toString()
        // })


        // req.on('end', async () => {
            
        //     const {name, noHp, address} = JSON.parse(body)
        //     const inputContact = {
        //         name,
        //         noHp,
        //         address
        //     }

        //     const newProduct = await Contact.create(inputContact)
        //     res.writeHead(201,  {'Content-Type': 'application/json'})

        //     return res.end(JSON.stringify(newProduct))
        // })

       
    } catch (err) {
        console.log(err);
    }
}



async function updateContact(req, res, id) {
    try {       

        const contact = await Contact.findById(id)

        if(!contact) {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify({message: "Contact Not Found"}))
        
        } else {
            const body = await getPostData(req)
            const {name, noHp, address} = JSON.parse(body)
            const inputContact = {
                name: name || contact.name,
                noHp: noHp || contact.noHp,
                address: address || contact.address
            }
    
            const updProduct = await Contact.update(id, inputContact)
            res.writeHead(201,  {'Content-Type': 'application/json'})
    
            return res.end(JSON.stringify(updProduct))
        }
     
      
    } catch (err) {
        console.log(err);
    }
}



async function removeContact(req, res, id){
    try {
        const contacts = await Contact.findById(id)
        if(!contacts){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.write(JSON.stringify({message: "Contact Not Found"}))
            res.end()
        } else {
            await Contact.remove(id)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify( {message: `Contact ${id} removed`}))
            res.end();
        }
  
        
    } catch (err) {
        console.log(err);
    }
}


// 
module.exports = {
    getContact, getContactId, createContact, sortedDataByName,sortedDataByAddress, updateContact, removeContact
}