import dotenv from 'dotenv';

dotenv.config();

export const config = {
    /**
     * server configuration
     */
    app: {
        name: process.env.APP_NAME,
        version: process.env.APP_VERSION,
        description: process.env.APP_DESCRIPTION,
        tag: process.env.APP_TAG,
        prefix: process.env.APP_PREFIX || '/api/v1'
    },

    /**
     * server configuration
     */
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT || '3000',
    host: process.env.HOST_API || 'http://localhost:3000/api/v1',

    /**
     * database configuration
     */
    database: {
        dialect: process.env.DB_SERVER,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        databaseTest: process.env.DB_DATABASE_TEST,
    },

    assets: {
        storage: process.env.STORAGE || 'local',
        public: process.env.API_ASSETS || 'public',
        temp: process.env.API_TEMP_FILE_ASSETS || 'temp',
    },

    amqp: {
        conn: null,
        url: process.env.AMQP_URL,
        username: process.env.AMQP_USERNAME,
        password: process.env.AMQP_PASSWORD,
    },

    /**
     * SMTP configuration
     */
    smtp: {
        mailMailer: process.env.MAIL_MAILER || 'SMTP',
        mailHost: process.env.MAIL_HOST || 'smtp.ethereal.email',
        mailPort: +process.env.MAIL_PORT || 587,
        mailUsername: process.env.MAIL_USERNAME || 'berta.conn65@ethereal.email',
        mailPassword: process.env.MAIL_PASSWORD || '8xUGFrVYajNS8ArqZb',
        mailEncryption: process.env.MAIL_ENCRYPTION || 'STARTTLS',
    },

    /**
     * Login with Google configuration
     */
    google: {
        googleAuthHost:
            process.env.GOOGLE_AUTH_HOST ||
            'https://www.googleapis.com/oauth2/v2/tokeninfo',
    },

    /**
     * storage configuration for file uploads
     */
    storage: {
        s3: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            defaultRegion: process.env.AWS_DEFAULT_REGION,
            bucketName: process.env.AWS_BUCKET_NAME,
        },
        path: './storages',
    },

    queue: {
        name: process.env.QUEUE_NAME || 'my-queue',
        exchange: process.env.QUEUE_EXCHANGE || 'my-queue-exchange',
        binding: process.env.QUEUE_BINDING || 'my-queue-binding',
    },

    mailQueueName: process.env.QUEUE_MAIL_NAME || 'inventory-mail-queue',

    /**
     * used for every calucation on application
     */
    calculation: {
        usdDecimal: 100,
        /**
         * percentage wei is used for fixed percentage value until 2 precision
         * ex: 10 ** 4 or 10000
         * 100%    = 1        = 1000000
         * 1%      = 0.01     = 10000
         * 0.01%   = 0.0001   = 100
         * 0.0001% = 0.000001 = 1
         */
        percentageWei: +process.env.MAX_FEE_PERCENTAGE / 100 || 10000,

        /**
         * 100% in percentageWei based on percentageWei value
         */
        maxPercentage: +process.env.MAX_FEE_PERCENTAGE || 1000000,

        /**
         * used to charge each user transaction on platform
         * value must in percentage wei as defined in percentageWei
         */
        platformFee: +process.env.PLATFORM_FEE || 5000,
    },
};
