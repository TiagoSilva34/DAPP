import Web3 from "web3";
import ABI from '@/services/ABI.json'

const CONTRACT_ADDRESS = "0x5Faa862aA61b5461Fd965bA5828Fec619Aa1d1e9"

export async function doLogin() {
    // ethereum: objeto injetado no navegador pela carteira metamask
    if(!window.ethereum) throw new Error('No MetaMask found.')

    // Conexão com a carteira MetaMask(blockchain) no navegador
    const web3 = new Web3(window.ethereum)

    // Pegando usuário conectado na MetaMask(blockchain)
    const accounts = await web3.eth.requestAccounts()

    // Seta um erro se o usuário não permitir a conexão
    if (!accounts || !accounts.length) throw new Error('Wallet not found')

    // Caso o usuário permita o acesso, grava esse acesso no local storage
    localStorage.setItem('wallet', accounts[0])

    return accounts[0]
}

export async function getCurrentVoting() {
    // Pega a carteira do usuário que está no localStorage
    const wallet = localStorage.getItem('wallet')

    // Caso o usuário não possua a carteira no localStorage
    if (!wallet) throw new Error('Unauthorized')

    // Conexão com a carteira MetaMask(blockchain) no navegador
    const web3 = new Web3(window.ethereum)
    
    // Inicializando uma conexão com o contrato na Blockchain
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {from: wallet})

    return contract.methods.getCurrentVoting().call()

} 