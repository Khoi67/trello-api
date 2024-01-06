/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
// xJRTt8OBtVNB0HRy - password MongoDB
import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

//Tạo đối tượng là null vì chưa connect
let trelloDatabaseInstance = null

//Khởi tạo đối tượng để connect tới mongoDB
const mongoClientInstace = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//Ket noi database
export const CONNECT_DB = async () => {
  //Goi ket noi MongoDb atlas voi uri
  await mongoClientInstace.connect()
  //Gan ten cua database
  trelloDatabaseInstance = mongoClientInstace.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}

//Dong ket noi database
export const CLOSE_DB = async () => {
  // console.log('Clode DB!!!')
  await mongoClientInstace.close()
}