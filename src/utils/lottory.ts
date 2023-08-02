import dayjs from 'dayjs'

import { read, write, getConfig } from './file'

export const randomNo = (length: number) => {
  return Math.random().toFixed(length).split('.')[1]
}

export const generateToFile = async (key: string) => {
  const day = dayjs().format('YYYY/MM/DD')

  const data = await read(getConfig(key))

  const newData: ILottory = {
    firstPrize: randomNo(6),
    threeFront: randomNo(3),
    threeLast: randomNo(3),
    twoLast: randomNo(2),
    date: day,
  }

  await write(getConfig('lottory'), JSON.stringify({ ...data, [day]: newData }))
}

export const getLottoryFromFile = async (
  key: string,
  date?: string,
): Promise<undefined | ILottory> => {
  const lottory = await read(getConfig(key))

  if (!lottory) {
    return undefined
  }

  let data: ILottory

  if (!date) {
    const keys = Object.keys(lottory)

    data = lottory[keys[keys.length - 1]]
  } else {
    data = lottory[date]
  }

  return data
}

export const getTransactionsFromFile = async () => {
  const res = await read(getConfig('transaction'))

  return res.json()
}
