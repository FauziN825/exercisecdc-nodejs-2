const fs = require('fs')

// console.log(fs);

//menuliskan string ke file (syncrhnous)

// try {
//     fs.writeFileSync('./src/test.txt', 'Hello World secara syncronus');
// } catch (error) {
//     console.log(error);
// }

// menuliskan string ke file Asyncronus

// fs.writeFile('./src/test1.txt', "Hello World secara Asyncronus", (err) => {
//     console.log(err);
// })


// membaca isi file Sysncronus

// const data = fs.readFileSync('./src/test.txt', 'utf-8');
// console.log(data);



// fs.readFile('./src/test1.txt', 'utf-8', (err,data) => {
//     if(err) throw err
//     console.log(data);
// })



// Readline 
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


rl.question('Input Your Name : ', (nama) => {
    rl.question('Input Your Number Handphone : ', (noHp) => {
        rl.question('Input You Address : ', (address) => {
            // console.log(`Thank  ${nama} already input nomor hp ${noHp} and your address ${address}`);
            const contact = {nama, noHp, address}

            const fileBuffer = fs.readFileSync('./src/data/contact.json', 'utf-8');
            const contacts = JSON.parse(fileBuffer)

            contacts.push(contact)

            fs.writeFileSync('./src/data/contact.json', JSON.stringify(contacts))
            console.log('Thank');
            rl.close()
        })
        
    })
    
})