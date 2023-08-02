import path from 'path'
import { promises as fs } from 'fs'

const dir = path.join(process.cwd(), 'data')

export const read = async (filename: string) => {
  const res = await fs.readFile(`${dir}/${filename}`, { encoding: 'utf8' })

  return JSON.parse(res)
}

export const write = async (filename: string, json: string) => {
  await fs.writeFile(`${dir}/${filename}`, json)
}
