import { AbiItem } from 'web3-utils'
import collectionAbi from '../abi/erc721.json'
import { clearTransaction, handleTransaction, TransactionType } from '../variables/TransactionVariable'
import { initializeWeb3 } from './MultiWalletService'
import {collectionAddress} from '../config'

export const mintErc721 = async (ownerAddress: string, chainId: number, amount: number, node: boolean) => {
    const web3 = initializeWeb3(chainId, node)
    const contractMinter = new web3.eth.Contract(collectionAbi as AbiItem[], collectionAddress)    

    try{ 
        console.log(ownerAddress)
        await contractMinter.methods.presaleBuy(amount).send({ from: ownerAddress }, (_error: Error, tx: string) => {
            tx ? handleTransaction(tx, TransactionType.mint) : clearTransaction()
        })    
    }
    catch(e) {
        console.log(e)
    }
}

export const getTotalMintedAmount = async(chainId: number, node: boolean) => {
    const web3 = initializeWeb3(chainId, node)
    const contractMinter = new web3.eth.Contract(collectionAbi as AbiItem[], collectionAddress)

    try {
        const amount = await contractMinter.methods.totalSupply().call()
        return parseInt(amount)
    } catch (e) {
        console.log(e)
    }
    return 0
}

export const getMintedAmount = async(chainId: number, node: boolean, ownerAddress: string) => {
    const web3 = initializeWeb3(chainId, node)
    const contractMinter = new web3.eth.Contract(collectionAbi as AbiItem[], collectionAddress)

    try {
        const amount = await contractMinter.methods.balanceOf(ownerAddress).call()
        return parseInt(amount)
    } catch (e) {
        console.log(e)
    }
    return 0
}