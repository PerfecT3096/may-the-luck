import path from 'path'
import { promises as fs } from 'fs'

const dir = path.join(process.cwd(), 'data')
const config: Partial<{ [key: string]: string }> = {}

Object.entries(process.env.file as string).forEach(([k, v]) => {
  config[k] = v
})

export const getConfig = (key: string) => {
  return config[key] || ''
}

export const read = async (filename: string) => {
  const res = await fs.readFile(`${dir}/${filename}`, { encoding: 'utf8' })

  return JSON.parse(res)
}

export const write = async (filename: string, json: string) => {
  await fs.writeFile(`${dir}/${filename}`, json)
}
