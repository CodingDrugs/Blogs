const dotenv = require("dotenv") // used to keep our files secret
dotenv.config({
    path: "./.env"
})

const https = require('https')
const PORT = process.env.PORT
const app = require("./app")
const fs = require('fs')
const server = https.createServer({
    cert:fs.readFileSync("./cert.pem",'utf-8'),// options to create https server
    key:fs.readFileSync("./key.pem","utf-8")
},app)



server.listen(PORT,(err)=>{
    if(err)console.log(err);
    console.log(`Server is running on port ${PORT}`);
})

console.log(process.env);
// console.log(__dirname);
// console.log(__filename);


//use it in GIT BASH - to get certificate and key perm files
// $ openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365