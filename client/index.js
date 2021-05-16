import "./index.scss";

const server = "http://localhost:3042";

function fetchBlock() {
    fetch(`${server}/block`).then((response) => {
        return response.json();
    }).then((block) => {
        console.log(block);
        document.getElementById("block-number").href = `http://localhost:3042/block/${block.result}`;
        document.getElementById("block-number").innerHTML = block.result;
    }).then(() => {
        setInterval(fetchBlock(), 1000);
    });
    
}
document.getElementById("block-button").addEventListener('click', fetchBlock());
