const express = require('express')
    const app = express()
    app.use('/', express.static('./'))

    app.listen(3000, function(){console.log(`serving static assets: 
[95m[2m./[22m[39m => [96m[2m[4mhttp://localhost:3000/[24m[22m[39m
`)})