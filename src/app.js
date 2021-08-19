const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

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

// rl.question('Input Your Name : ', (nama) => {
//     rl.question('Input Your Number Handphone : ', (noHp) => {
//         rl.question('Input You Address : ', (address) => {
//             // console.log(`Thank  ${nama} already input nomor hp ${noHp} and your address ${address}`);
//             const contact = {nama, noHp, address}

//             const fileBuffer = fs.readFileSync('./src/data/contact.json', 'utf-8');
//             const contacts = JSON.parse(fileBuffer)

//             contacts.push(contact)

//             fs.writeFileSync('./src/data/contact.json', JSON.stringify(contacts))
//             console.log('Thank');
//             rl.close()
//         })
        
//     })
    
// })


const question1 = () => {
    return new Promise((resolve, rejects) => {
        rl.question('Input Your Name : ', (name) => {
            resolve(name)
        });
    });
};

const question2 = () => {
    return new Promise((resolve, rejects) => {
        rl.question('Input Your Phone Number : ', (noHp) => {
            resolve(noHp)
        });
    });
};

const question3 = () => {
    return new Promise((resolve, rejects) => {
        rl.question('Input Your Address : ', (address) => {
            resolve(address)
        });
    });
};

const main = async  () => {
    const name = await question1();
    const noHp = await question2();
    const address = await question3();
    const contact = {name, noHp, address}
    const fileBuffer = fs.readFileSync('./src/data/contact.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer)

    contacts.push(contact)

    fs.writeFileSync('./src/data/contact.json', JSON.stringify(contacts))
    console.log('Thank');
    rl.close()
}

main()
