// controller.js
// Logic behind the functionalities
const data = require("./data");

class Controller {
    // getting all todos
    async getContacts() {
        // return all todos
        return new Promise((resolve, _) => resolve(data));
    }

    // getting a single todo
    async getContact(id) {
        return new Promise((resolve, reject) => {
            // get the todo
            let contact = data.find((contact) => contact.id === parseInt(id));
            if (contact) {
                // return the todo
                resolve(contact);
            } else {
                // return an error
                reject(`contact with id ${id} not found `);
            }
        });
    }

    // creating a todo
    async createContact(contact) {
        return new Promise((resolve, _) => {
            // create a todo, with random id and data sent
            let newContact = {
                id: Math.floor(4 + Math.random() * 10),
                ...contact,
            };

            // return the new created todo
            resolve(newContact);
        });
    }

    // updating a todo
    async updateContact(id) {
        return new Promise((resolve, reject) => {
            // get the todo.
            let contact = data.find((contact) => contact.id === parseInt(id));
            // if no todo, return an error
            if (!contact) {
                reject(`No todo with id ${id} found`);
            }
            //else, update it by setting completed to true
            contact["completed"] = true;
            // return the updated todo
            resolve(contact);
        });
    }

    // deleting a todo
    async deleteContact(id) {
        return new Promise((resolve, reject) => {
            // get the todo
            let contact = data.find((contact) => contact.id === parseInt(id));
            // if no todo, return an error
            if (!contact) {
                reject(`No contact with id ${id} found`);
            }
            // else, return a success message
            resolve(`contact deleted successfully`);
        });
    }
}
module.exports = Controller;