const http = require('http')


const server = http.createServer((req, res) => {
    const url = req.url;
    if(url === '/about'){
        res.write('<h1>Ini adalah halaman about</h1>')
        res.end();
    } else if (url === '/contact'){
        res.write('<h1>This Contact Page</h1>')
    } else {
        res.write('Hello World')
        res.end();
    }

})



server.listen(3000, () =>{
    console.log("Server is Listening on port 3000");
})