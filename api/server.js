const express = require("express")
const server = express();

const Force = require("./forceUsers-model")


server.use(express.json());


server.get("/forceUsers", (req, res,) => {
    Force.getAll()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.post("/forceUsers", (req,res,)=> {
    Force.insert(req.body)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(error => {
        res.status(500).json(error)
    }) 
})

server.delete("/forceusers/:id", (req, res, ) => {
    Force.delete(req.params.id)
    .then(user => {
        res.status(200).json(user)

    })
    .catch(error => {
        res.status(500).json(error)
    })
})


module.exports = server;