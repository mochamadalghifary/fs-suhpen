import { Exception } from '../exceptions/index.exception'

export class Utils {
  static fileFilter = (fileOriginalName: string): string => {
    if (!fileOriginalName.match(/\.(jpg|jpeg|png|pdf)$/)) {
      Exception.badRequest('This file type is not allowed!')
    }
    return fileOriginalName
  }

  static isValidJSON = (str: string): boolean => {
    try { JSON.parse(str) } catch (e) { return false }
    return true
  }
}

