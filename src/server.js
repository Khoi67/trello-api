/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CLOSE_DB, CONNECT_DB } from './config/mongodb'
import { env } from './config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    console.log(env)
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(() => {
    console.log(`3. Hello ${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  //Thuc hien cac tac vu Clean up trc khi dong server
  exitHook(() => {
    console.log('4. Disconnecting to MongoDB Cloud Atlas.....')
    CLOSE_DB()
    console.log('5. Disconnected to MongoDB Cloud Atlas.....')
  })

}
//IIFE (Immediately Invoked Function Expression)
(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas.....')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas')
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Cloud Atlas'))
//   .then(() => START_SERVER())
//   .catch(err => {
//     console.log(err)
//     process.exit(0)
//   })