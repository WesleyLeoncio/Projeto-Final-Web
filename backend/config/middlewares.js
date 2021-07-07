//const bodyParser = require('body-parser') // foi trocado pelo express por estar defasado
const express = require('express');
const cors = require('cors')

module.exports = app => {
    app.use(express.json()) 
    app.use(cors())
}