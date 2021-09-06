const http = require('http')
require('dotenv').config()
const {getContact, getContactId, createContact, sortedDataByName, sortedDataByAddress, updateContact, removeContact} = require('./controllers/contactController')


const server = http.createServer((req, res) => {
    if(req.url === '/api/contacts' && req.method === "GET")  {
       getContact(req, res)
    } 
    else if(req.url.match(/\/api\/contacts\/([0-9]+)/) && req.method === 'GET'){
        const id = req.url.split('/')[3]
        // console.log(id);
        getContactId(req, res, id)
    } else if(req.url === '/api/contacts' && req.method === "POST"){
        createContact(req, res)
    } else if(req.url === '/api/contacts/name' && req.method === "GET")  {
        sortedDataByName(req, res)
    } else if(req.url === '/api/contacts/address' && req.method === "GET") {
        sortedDataByAddress(req, res)
    } 
    else if(req.url.match(/\/api\/contacts\/([0-9]+)/) && req.method === 'PUT'){
        const id = req.url.split('/')[3]
        // console.log(id);
        updateContact(req, res, id)
    }
    else if(req.url.match(/\/api\/contacts\/([0-9]+)/) && req.method === 'DELETE'){
        const id = req.url.split('/')[3]
        // console.log(id);
        removeContact(req, res, id)
    }
    
    
    else {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route Not Found'}));
    }
  

})

const PORT = process.env.PORT || 5000


server.listen(PORT, () => console.log(`Server running on port ${PORT}`))