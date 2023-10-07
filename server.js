const http = require('http')
const PORT = 5000
const app = require("./app")
const server = http.createServer(app)
const fs = require("fs")


server.listen(PORT,(err)=>{
    if(err)console.log(err);
    console.log(`Server is running on port ${PORT}`);
})