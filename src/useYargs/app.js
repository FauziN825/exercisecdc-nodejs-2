const contacts = require('./contact')
const yargs = require('yargs')

// const saveContact = require('./contact')

yargs.command({
    command: 'add',
    describe: 'Add New Contact',
    builder: {
        name: {
            describe: 'Full Name',
            demandOption: true,
            type: 'string'
        }, 
        noHp: {
            describe: 'Phone Number',
            demandOption: true,
            type: 'string'
        },
        address: {
            describe: 'Address',
            demandOption: false,
            type: 'string'
        },
    },

    handler(argv){
        // const contact = {
        //     name: argv.name,
        //     noHp: argv.noHp,
        //     address: argv.address
        // }

        contacts.saveContact(argv.name, argv.noHp, argv.address)
        // console.log(contact);

    }
}).demandCommand()



// menampilkan all data name and phone number

yargs.command({
    command: 'list',
    describe: "Show all data name and phone number",
    handler() {
        contacts.listContact();
    }
})


// show detail contact
yargs.command({
    command: 'detail',
    describe: "Shoe detail contact base on name",
    builder: {
        name: {
            describe: "Fullname",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        contacts.detailContact(argv.name);
    }
})

//delate contact base on name
yargs.command({
    command: 'delete',
    describe: "Delete Contact base on name",
    builder: {
        name: {
            describe: "Fullname",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        contacts.deleteContact(argv.name);
    }
})


yargs.parse();
// console.log(yargs.argv);

// const main = async  () => {
//     const name = await contacts.writeQuestion('Input Your Name :');
//     const noHp = await contacts.writeQuestion('Input Your Phone Number :');
//     const address = await contacts.writeQuestion('Input Your Address : ');
//     contacts.saveContact(name, noHp, address)
// }


// main()
