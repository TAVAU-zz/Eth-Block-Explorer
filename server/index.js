const express = require('express');
const app = express();
const port = 3042;

const cors = require('cors');
app.use(express.json());
app.use(cors());
const { Wallet, utils,
    providers: { JsonRpcProvider } } = require('ethers');

// connect to a JSON RPC endpoint
const provider = new JsonRpcProvider('https://mainnet.infura.io/v3/21ff77267b734321a27aeb6449ddadc2'); // ganache-cli
const privateKey = '0xb0722518ffec34d7ddcb516ca27e44130ff48a5b9c654abdbafc38bc067607d2';
const wallet = new Wallet(privateKey, provider)


provider.getBlockNumber().then((result) => {
    console.log(result);
});

provider.getGasPrice().then((gasPrice) => {
    return utils.formatUnits(gasPrice, "gwei");
}).then(console.log);

async function findEther(blockNumber) {
    let addresses = [];

    const block = await provider.getBlockWithTransactions(blockNumber);
    block.transactions.forEach((tx) => {
        addresses.push(tx);
        // console.log(tx);
    })
    return Promise.all(addresses).then(() => { 
        // console.log(addresses);
        return addresses; 
    });

}
// findEther();

const blockNumber = async () => {
    const result = await findEther();
    return result;
}

app.get('/block/', (req, res) => {
    console.log(blockNumber);
    provider.getBlockNumber().then((result) => {
        console.log(result);
        res.send({ result });
    });
});

app.get('/block/:blockid', (req, res) => {
    console.log(req.params);

    let { blockNumber } = req.params;
    findEther(blockNumber).then((result) => {
        console.log(result[0]);
        res.send({ result });
    });

});


app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});