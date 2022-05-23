
const server = require('pushstate-server')

server.start({
    port: 5018,
    directory: './dist'
})

console.log('your sever is running at http://localhostP:5018');
