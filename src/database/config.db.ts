import { config } from 'src/config';
import { DataSource } from "typeorm";

export const DataSourceConfig = {
  type: 'mysql',
  host: config.database.host,
  port: +config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
}

export const DataSourceOptions = new DataSource({
  type: 'mysql',
  host: DataSourceConfig.host,
  port: +DataSourceConfig.port,
  username: DataSourceConfig.username,
  password: DataSourceConfig.password,
  database: DataSourceConfig.database,
})
