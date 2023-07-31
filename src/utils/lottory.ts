import dayjs from 'dayjs'

import { read, write } from './file'

export const randomNo = (length: number) => {
  return Math.random().toFixed(length).split('.')[1]
}

export const generate = async () => {
  const day = dayjs().format('YYYY/MM/DD')

  const data = await read('lottory.json')

  const newData: ILottory = {
    firstPrize: randomNo(6),
    threeFront: randomNo(3),
    threeLast: randomNo(3),
    twoLast: randomNo(2),
    date: day,
  }

  await write('lottory.json', JSON.stringify({ ...data, [day]: newData }))
}

export const getLottory = async (
  date?: string,
): Promise<undefined | ILottory> => {
  const lottory = await read('lottory.json')

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

export const getTransactions = async () => {
  const res = await read('transaction.json')

  return res.json()
}
