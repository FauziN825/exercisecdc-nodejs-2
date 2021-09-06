# exercisecdc-nodejs-2
## About App
This task is the task of the node js bootcamp program, which is to create a contact app program. this program only uses vanilla javascript, does not use the database as data storage, but uses json data. and don't use libraries like express to create restfull api.
### Detail or task requirements
- contact app has full name, cellphone number, and address fields
- Fullname contains alphabet only
- phone number contains only number and (+)
- address has a maximum length

### Features
- user can add a contact
- user can edit a contact
- user can delete a contact
- user can sort contact's by name, address
- all contact values validated

### install and run the program
- Clone the repo
   ```sh
   git clone https://github.com/FauziN825/exercisecdc-nodejs-2
   ```
- Npm install
   ```sh
   npm install or npm i
   ```
- Run Program
   ```sh
   npm run dev
   ```
   the root executable file is set in package.json, we will execute the app.js file which is in the ./src/UseVanilaJS/app.js directory
 
 ### Endpoint
 
 |Description |Method | Endpoint |
 | --- | --- | --- |
 | User can see all contact app | GET | localhost:5000/api/contacts |
 |User can view contacts by id | GET | localhost:5000/api/contacts/:id |
 |User can update contacts by id | PUT | localhost:5000/api/contacts/:id |
 
  
