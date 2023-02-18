import dayjs from 'dayjs'

export class Utils {
  static isValidJSON = (str: string): boolean => {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  static fieldCamelToSnake = (model: object): object => {
    const camelKeys = Object.keys(model)
    const snakeKeys = camelKeys.map((key) => this.camelToSnake(key))

    return { ...snakeKeys }
  }

  static titleCase = (str: string) => {
    return str
      .split(' ')
      .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
      .join(' ')
  }

  static camelToSnake = (str: string) => {
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
  }

  static camelToTitle = (str: string) => {
    const result = str.replace(/([A-Z])/g, ' $1')
    return result.charAt(0).toUpperCase() + result.slice(1)
  }

  static dateFormat = (date: Date | string | dayjs.Dayjs) => {
    return dayjs(date).format('YYYY-MM-DD HH:MM')
  }
}
