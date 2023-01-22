import dotenv from 'dotenv'

dotenv.config()

export const config = {
  server: {
    nodeEnv: process.env.SERVER_NODE_ENV || 'local',
    port: process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || 'http://localhost:3000',
    hostApi: process.env.SERVER_HOST_API || 'http://localhost:3000/api/v1',
  },

  database: {
    dialect: process.env.DB_SERVER || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || 'template_next',
    sslCa: process.env.DB_CERTIFICATE_PATH || '/etc/ssl/certs/ca-certificates.crt'
  },

  auth: {
    jwt: {
      secretKey: process.env.JWT_SECRET_KEY || 'fradotech',
      expiredInseconds: process.env.JWT_EXPIRED_IN_SECONDS || 604800,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }
  },

  smtp: {
    mailer: process.env.MAIL_MAILER || 'SMTP',
    host: process.env.MAIL_HOST || 'smtp.ethereal.email',
    port: process.env.MAIL_PORT || 587,
    username: process.env.MAIL_USERNAME || 'adan.beer@ethereal.email',
    password: process.env.MAIL_PASSWORD || 'ugCBv6UWUnmhby5aqT',
    encryption: process.env.MAIL_ENCRYPTION || 'STARTTLS',
  },

  assets: {
    storage: process.env.ASSETS_STORAGE || 'local',
    public: process.env.ASSETS_PUBLIC || 'public',
  },
}
