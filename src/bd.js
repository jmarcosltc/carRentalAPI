const sequence = {
    _id: 1,
    get id() {return this._id++}
}

var produtos = {}

function salvarProduto(produto) {
    if (!produto.id) produto.id = sequence.id
    produtos[produto.id] = produto
    return produto
}

function getProduto(produto) {
    produtos = produto;
    return Object.values(produtos)
}

function getProdutos(produto) {
    produtos = produto;
    return Object.values(produtos)
}

function excluirProduto(id) {
    const produto = produtos[id]
    delete produtos[id]
    return produto
}

module.exports = { salvarProduto, getProduto, getProdutos, excluirProduto }