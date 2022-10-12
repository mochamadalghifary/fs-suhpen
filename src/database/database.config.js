// eslint-disable-next-line @typescript-eslint/no-var-requires
const { config } = require('dotenv')

config()

module.exports = {
  type: process.env.DB_SERVER,
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  autoLoadEntities: true,
  seeds: ['database/seeds/*.ts'],
}
