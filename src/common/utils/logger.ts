const logger = (module: string, ...message: any) => {
  // eslint-disable-next-line 
  console.info(`Logger - ${Date.now()} - [${module}] ${message}`)
}

export default logger;