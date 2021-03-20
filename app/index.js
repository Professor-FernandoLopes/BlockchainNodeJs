const express = require('express');
const bodyParser = require('body-parser')
const Blockchain = require("../blockchain")
const P2pServer= require("./p2p-server.js")
const HTTP_PORT = process.env.HTTP_PORT || 3001; 

const app = express();
const bc = new Blockchain();
// servidor p2p recebe uma instância da blockchain
const p2pServer = new P2pServer(bc);

app.use(bodyParser.json())

app.get( '/blocks', (req, res) => {

res.json(bc.chain);

});

app.post('/mine', (req,res)=> {

const block = bc.addBlock(req.body.data)

console.log(`new block added:${block.toString()}`);

p2pServer.syncChains();

res.redirect('/blocks');

});

app.listen(HTTP_PORT, () => {

console.log(`Listening on port ${HTTP_PORT}`)

p2pServer.listen()

});