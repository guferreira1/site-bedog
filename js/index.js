const vitrine = document.querySelector('.vitrine')


function criarVitrine(array){

    

    for(let i = 0; i < array.length; i++){
    
    let productsDatail = document.createElement('li')
    let productsPhoto = document.createElement('div')
    let productsImg = document.createElement('img')
    let productsCard = document.createElement('div')
    let productsCategory = document.createElement('span')
    let productsName = document.createElement('h2')
    let productsDescription = document.createElement('p')
    let productsPrice = document.createElement('span')
    let productsButton = document.createElement('button')
   

    productsDatail.className = 'produtos'
    productsPhoto.className = 'fundo-photo'
    productsCard.className = 'card'
    productsCategory.className = 'categoria'
    productsName.className = 'nome-produto'
    productsDescription.className = 'descricao-produto'
    productsPrice.className = 'price'
    productsButton.className = 'button-card'
    productsImg.className = 'imagem'

    productsImg.src = array[i].img
    productsCategory.innerText = array[i].tag
    productsName.innerText = array[i].nameItem
    productsDescription.innerText = array[i].description
    productsPrice.innerText = `R$ ${array[i].value.toFixed(2).toString().replace('.',',')}`
    productsButton.innerText = array[i].addCart
        
    let id = produtos[i].id
    productsButton.setAttribute('id', id)
    
    productsPhoto.appendChild(productsImg)
    productsCard.append(productsCategory, productsName, productsDescription, productsPrice, productsButton)
    productsDatail.append(productsPhoto, productsCard)
    vitrine.appendChild(productsDatail)
        
    }
}
criarVitrine(produtos)

const todos = document.querySelector('.todos')
const peitoral = document.querySelector('#peitoral')
const camisetas = document.querySelector('#camisetas')
const blusas = document.querySelector('#blusas')
const logoReturn = document.querySelector('.logo-return')

todos.addEventListener('click', filtroTodos)
peitoral.addEventListener('click', filtroPeitoral)
camisetas.addEventListener('click', filtroCamisetas)
blusas.addEventListener('click', filtroBlusas)
logoReturn.addEventListener('click', filtroTodos)


function filtro(array, tag){
    let result = []

    for(let i = 0; i < array.length; i++){
        if(array[i].tag == tag){
            result.push(array[i])
        }
    }
    criarVitrine(result)
}

function filtroTodos(){
    vitrine.innerHTML = ''
    criarVitrine(produtos)
}


function filtroPeitoral(){
    vitrine.innerHTML = ''
    filtro(produtos, 'Peitoral')
    
}

function filtroCamisetas(){
    vitrine.innerHTML = ''
    filtro(produtos, 'Camisetas')
}

function filtroBlusas(){
    vitrine.innerHTML = ''
    filtro(produtos, 'Blusas')
}



let formulario = document.querySelector('.pesquisa-itens')
let pesquisaItens = document.querySelector('.pesquisa-itens input')
let pesquisaBotao = document.querySelector('.pesquisa-itens button')


formulario.addEventListener('submit', function(event){
    event.preventDefault()
    let pesquisaProdutos = pesquisaItens.value.toLowerCase().trim()
    
    let resultadoBusca = busca(pesquisaProdutos)
    
    criarVitrine(resultadoBusca)
})


function busca(valorPesquisa){
    let resultBusca = []
    let produtoNaoEncontrado = 'Produto não encontrado'

    vitrine.innerHTML = ''
    for(let i = 0; i < produtos.length; i++){
        let nomeProduto = produtos[i].nameItem.toLowerCase().trim()
        let categoriaProduto = produtos[i].tag[0].toLowerCase().trim()
        
        if(nomeProduto.includes(valorPesquisa) || categoriaProduto.includes(valorPesquisa)){
       
            pesquisaItens.value = ''
            pesquisaItens.focus()
            resultBusca.push(produtos[i])
            
        } 
   
    }
    
    if(resultBusca.length == 0){
        vitrine.innerHTML = produtoNaoEncontrado
                
        pesquisaItens.value = ''
        pesquisaItens.focus()
        return 
    }
    
    return resultBusca
    
}



vitrine.addEventListener('click', interceptandoProduto)

let carrinhoDeCompras = document.querySelector('.lista-carrinho')


let carrinho = []

function interceptandoProduto(event){
    let btnAddCart = event.target

    if(btnAddCart.tagName == 'BUTTON'){
        let idProduto = btnAddCart.id
        
        let produto = produtos.find(function(produto){
            if(produto.id == idProduto){
                return produto
            }
        }) 
        adicionarItemCarrinho(produto)
    }
}

function adicionarItemCarrinho(produto){
    

    if(produto !== undefined){
        carrinhoDeCompras.innerHTML = ''
        carrinho.push(produto)
    }

    criarCardCarrinho(carrinho)
    resultadosItensEValor(carrinho)
}

carrinhoDeCompras.addEventListener('click', interceptandoCarrinho)

function interceptandoCarrinho(event){
    // carrinhoVazio.innerHTML = 'Carrinho vazio'
    let btnRemove = event.target
    
    if(btnRemove.tagName === 'BUTTON'){
        let idRemove = btnRemove.id
        let removerItem = carrinho.findIndex(elemento => idRemove == elemento.id)
       
        carrinho = carrinho.filter((ele, i) => i !== removerItem)
        carrinhoDeCompras.innerHTML = ''
        criarCardCarrinho(carrinho)
    }
    resultadosItensEValor(carrinho)
}


function criarCardCarrinho(carrinho){


    for(let i = 0; i < carrinho.length; i++){
        
        let nome = carrinho[i].nameItem
        let imgProduto = carrinho[i].img
        let value = carrinho[i].value
        let id = carrinho[i].id
   
        let listCarrinho = document.createElement('li')
        let divImgCarrinho = document.createElement('div')
        let imgCarrinho = document.createElement('img')
        let divCarrinho = document.createElement('div')
        let nomeCarrinho = document.createElement('h2')
        let priceCarrinho = document.createElement('span')
        let buttonCarrinho = document.createElement('button')

        buttonCarrinho.setAttribute("id", id)

        listCarrinho.className = 'carrinho-compras-lista'
        divImgCarrinho.className = 'imagem-carrinho'
        divCarrinho.className = 'ajustar-carrinho'
        nomeCarrinho.className = 'titulo-carrinho'
        priceCarrinho.className = 'preco-carrinho'
        buttonCarrinho.className = 'botao-carrinho'

        imgCarrinho.src = imgProduto
        nomeCarrinho.innerText = nome
        priceCarrinho.innerText = `R$ ${value.toFixed(2).toString().replace('.',',')}`
        buttonCarrinho.innerText = 'Remover produto'

        divImgCarrinho.appendChild(imgCarrinho)
        divCarrinho.append(nomeCarrinho, priceCarrinho, buttonCarrinho)
        listCarrinho.append(divImgCarrinho, divCarrinho)
        carrinhoDeCompras.appendChild(listCarrinho)
    }
    
}

let carrinhoItens = document.querySelector('.carrinho-itens')
let somaItensEValor = document.querySelector('.somaItensEValor')



function resultadosItensEValor(){
    let resultadoPreco = 0
        somaItensEValor.innerHTML = ''
        for(let i = 0; i < carrinho.length; i++){
            resultadoPreco = resultadoPreco + carrinho[i].value
        }
    
        let divQuantidade = document.createElement('div')
        let paragrafoQuantidade = document.createElement('p')
        let paragrafoTotalProdutos = document.createElement('p')
        let divValorTotal = document.createElement('div')
        let paragrafoPreco = document.createElement('p')
        let paragrafoTotalPreco = document.createElement('p')
        let botaoFinalizar = document.createElement('button')

        divQuantidade.className = 'quantidade-produtos'
        paragrafoQuantidade.className = 'quantidade'
        paragrafoTotalProdutos.className = 'total-produtos'
        divValorTotal.className = 'valor-total'
        paragrafoPreco.className = 'preco'
        paragrafoTotalPreco.className = 'preco-total'
        botaoFinalizar.className = 'botao-finalizar'

        paragrafoQuantidade.innerText = 'Quantidade: '
        paragrafoTotalProdutos.innerText = `${carrinho.length}`
        paragrafoPreco.innerText = 'Preço: '
        paragrafoTotalPreco.innerText = `R$ ${resultadoPreco.toFixed(2).toString().replace('.',',')}`
        botaoFinalizar.innerText = 'Finalizar compras'

        divQuantidade.append(paragrafoQuantidade, paragrafoTotalProdutos)
        divValorTotal.append(paragrafoPreco, paragrafoTotalPreco)
        somaItensEValor.append(divQuantidade, divValorTotal, botaoFinalizar)

}
resultadosItensEValor()



