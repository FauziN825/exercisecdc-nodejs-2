const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

const validator = require('validator')




// Readline 
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})





// membuat folder data
const dirPath = './src/data';
if(!fs.existsSync(dirPath)) {

    fs.mkdirSync(dirPath)


}
const dataPath = './src/data/contact.json'
// // membuat file contact json jika belum ada
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]','utf-8');
    
}



const writeQuestion = (question) => {
    return new Promise((resolve, rejects) => {
        rl.question(question, (data) => {
            resolve(data)
        });
    });
}

const loadContact = () => {
    const fileBuffer = fs.readFileSync('./src/data/contact.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer)
    return contacts

}


const saveContact =  (name, noHp, address) => {

    const contact = {name, noHp, address}
    // const fileBuffer = fs.readFileSync('./src/data/contact.json', 'utf-8');
    // const contacts = JSON.parse(fileBuffer)
    const contacts = loadContact()

    // cek duplikat
    const duplicate = contacts.find((contact) => contact.name === name)
    if(duplicate){
        console.log('Contact already registered, use another name');
        rl.close();
        return false;
    }

    // cek alphabet in name
    
    if(name) {
        if(!validator.isAlpha(name)){
            console.log('Name should only use alphabet');
            rl.close();
            return false;
        }
    }

    if(address) {
        if(!validator.isLength(address, {min: 0, max: 5})) {
            console.log('Maximum 5');
            rl.close();
            return false;
        }
    }

    // cel number phone
    if(!validator.isMobilePhone(noHp, 'id-ID')) {
        console.log('Number phone is not valid');
        return false
    }


    contacts.push(contact)

    fs.writeFileSync('./src/data/contact.json', JSON.stringify(contacts))
    console.log('Thank');
    rl.close()
    
}


const listContact = () => {
    const contacts = loadContact();
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.name} - ${contact.noHp}`);
        
    });
    rl.close()
}


const detailContact = (name) =>{
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase())
    // contacts.find

    if(!contact){
        console.log("Name not found");
    }

    else {
        console.log(contact.name);
        console.log(contact.noHp);
        if(contact.address){
            console.log(contact.address);
        }
        
    }
    rl.close()
}


const deleteContact = (name) => {
    console.log(name);

    const contacts = loadContact();
    console.log(contacts);
    const newContact = contacts.filter(
        (contact) => contact.name !== name
    )
    console.log(newContact);

    if(contacts.length === newContact.length){
        console.log(`${name} Tidak ditemukan`);
        rl.close();
        return false
    }

    fs.writeFileSync('./src/data/contact.json', JSON.stringify(newContact))
    console.log(`Data ${name} sucessfully deleted`);

    rl.close()
}
module.exports = {writeQuestion, saveContact, listContact, detailContact, deleteContact}