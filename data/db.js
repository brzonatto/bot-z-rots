const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()
const { MONGO_HOST, MONGO_DATABASE } = process.env

let singleton

const connect = async () => {
    if (singleton) return singleton

    const client = new MongoClient(MONGO_HOST)
    await client.connect()

    singleton = client.db(MONGO_DATABASE)
    return singleton    
}

const insert = async (player) => {
    const db = await connect()
    return db.collection('players').insertOne(player)
}

const findPlayerByNameIgnoreCase = async (name) => {
    const db = await connect()
    return db.collection('players').findOne({ name: new RegExp(`^${name}$`, 'i') })
}

const findTypePlayerByID = async (id) => {
    const db = await connect()
    const player = await db.collection('players').findOne({ id })
    return player.pvp_type
}

const findAll = async () => {
    const db = await connect()
    return db.collection('players').find().toArray()
}

module.exports = {
    insert,
    findPlayerByNameIgnoreCase,
    findTypePlayerByID,
    findAll   
}