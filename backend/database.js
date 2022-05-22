import {MongoClient} from 'mongodb'
import { sha256 } from '@f0c1s/node-sha-lib'

const client = new MongoClient('mongodb+srv://Pflegecreme123:Codingschool2022@cluster0.dot9t.mongodb.net/test')
const dataBaseName='Chat'

export async function loginUser(Username,Password){
    
    await client.connect()
    
    const db= client.db(dataBaseName)
    const collection=db.collection('Users')
    const usercheck= await collection.find({User:Username}).toArray()
        
   if (usercheck.length>0&&Password!=""){
       
       if(usercheck[0].Password===sha256(Password)){return  [Username, true]}else{return "Wrong Password"}}

   else{return "Invalid User credentials"}
}

export async function newUser(Username,password,confirmedPassword){

    await client.connect()

    const db= client.db(dataBaseName)
    const collection= db.collection('Users')
    const usercheck= await collection.find({User:Username}).toArray()

    if(usercheck.length>0){return "User already exists"}

    else{

        if(password===confirmedPassword&&password!=""&&Username.length>5){

            const pwHash=sha256(password)

            collection.insertOne({User:Username,Password:pwHash})
            return 'User added successfully'}
    }
}

export async function storeMessage(Username, message){

    await client.connect()

    const db= client.db(dataBaseName)
    const collection=db.collection('Messages')

    await collection.insertOne({User:Username, Message:message})
    const printone=await collection.find({User:Username,Message:message}).toArray()
    return printone
}

export async function printMessages(){

    await client.connect()

    const db= client.db(dataBaseName)
    const collection= db.collection('Messages')
    const printable=await collection.find({}).toArray()

    return printable
}
