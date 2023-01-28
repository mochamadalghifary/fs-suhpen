import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { config } from '@server/src/config'
import { diskStorage } from 'multer'
import { Exception } from '../exceptions/index.exception'

export class Utils {
  static fileFilter = (req: Request, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
      Exception.badRequest('This file type is not allowed!')
    }
    callback(null, true)
  }

  static multerOptions = (): MulterOptions => {
    return {
      fileFilter: this.fileFilter,
      storage: diskStorage({
        destination: `.${config.assets.storage}`,
        filename: (req, file, callback) => {
          callback(null, `${Date.now() + '-'}${file.originalname}`)
        },
      }),
    }
  }

  static isValidJSON = (str: string): boolean => {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  static camelToSnake = (str: string) => {
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
  }

  static fieldCamelToSnake = (model: object): object => {
    const camelKeys = Object.keys(model)
    const snakeKeys = camelKeys.map((key) => this.camelToSnake(key))

    return { ...snakeKeys }
  }
}
