import { dirname } from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"

const __dirname = dirname(fileURLToPath(import.meta.url))

const hashData = async (data) => {
  return await bcrypt.hash(data, 10)
}

const compareData = async (data, hashedData) => {
  return await bcrypt.compare(data, hashedData);
}

const moneyFormat = (number) => {
  return new Intl.NumberFormat("es-ES").format(number);
}

export { __dirname, hashData, compareData, moneyFormat }