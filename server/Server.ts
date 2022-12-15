import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import MasterRouter from '@routers/MasterRouter'
import SwaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
const swaggerDocument = YAML.load('./swagger.yaml')

dotenv.config()

class Server {
  public app: express.Application = express()
  private port: number = Number(process.env.PORT) || 8080

  start = (): void => {
    this.app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocument))

    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(MasterRouter)

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })

    process.on('uncaughtException', function (err) {
      console.log(err)
    })
  }
}

const server = new Server()

server.start()
