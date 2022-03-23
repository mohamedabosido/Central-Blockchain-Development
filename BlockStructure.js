const SHA256 = require('crypto-js/sha256');
const fs = require('fs');

//Mo7amed Abosido 120192308 'Java Script code' Centralized Blockchain ,  just read the comments :)

//I'm use this two functions to load an objects from file , and if I'll mining a new block , then the file will append automaticlly 
function lodaJson(fileName = '') {
    return JSON.parse(
        fs.existsSync(fileName)
            ? fs.readFileSync(fileName).toString()
            : ""
    )
}
const data = lodaJson('chain.json');

function saveJson(fileName = '', json = '') {
    return fs.writeFileSync(fileName, JSON.stringify(json, 2, null));
}

class Block {
    constructor(index, timestamp, transcation, previousHash = '') {
        this.index = index;
        this.transcation = transcation;
        this.timestamp = timestamp;
        this.previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transcation) + this.nonce).toString();
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}


class Blockchain {
    constructor() {
        this.chain = [this.GenesisBlock()];
        this.difficulty = 4;
    }
    GenesisBlock() {
        return new Block(0, new Date(), "GenesisBlock", "0000000000000000000000000000000000000000000000000000000000000000");
    }
    getBlock() {
        return this.chain[this.chain.length - 1];
    }
    setBlock(newBlock) {
        newBlock.previousHash = this.getBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        data.push(newBlock);
        saveJson('chain.json', data);
        console.log(data);
    }



    exploreBlocks() {
        for (let index = 0; index < this.chain.length; index++) {
            const block = this.chain[index];
            console.log("Index : " + block.index
                + "\nNonce : " + block.nonce
                + "\nTranscation : " + JSON.stringify(block)
                + "\nTime Stamp : " + block.timestamp
                + "\nPrevious Hash : " + block.previousHash
                + "\nHash : " + block.hash);
            console.log("-----------------------------------------------------------------------");
        }
    }
}
let Mychain = new Blockchain();

                                                // This three transactions added in file
// Mychain.setBlock(new Block(1, "01/01/2018", { Sender: 'Elon Musk', Receiver: 'Mohamed Abosido', Ammount: 100 }));
// Mychain.setBlock(new Block(2, "01/3/2020", { Sender: 'Mohamed Abosido', Receiver: 'DR. Raed Rasheed', Ammount: 20 }));
// Mychain.setBlock(new Block(2, "01/3/2020", { Sender: 'Mohamed Abosido', Receiver: 'Ahmed Ali', Ammount: 50 }));
 
                                               // when you run this , show the file
Mychain.setBlock(new Block(4, "01/09/2020", { Sender: 'Mohamed Abosido', Receiver: 'Omar Omran', Ammount: 50 }));  

// Mychain.exploreBlocks();  // you can uder this to print in console :) 



