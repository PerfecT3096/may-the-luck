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

export const getLottories = async () => {
  const lottories = await read('lottory.json')

  return lottories
}

export const getLottory = async (
  date?: string,
): Promise<undefined | ILottory> => {
  const lottories = await getLottories()

  if (!lottories) {
    return undefined
  }

  let data: ILottory

  if (!date) {
    const keys = Object.keys(lottories)

    data = lottories[keys[keys.length - 1]]
  } else {
    data = lottories[date]
  }

  return data
}

export const getTransactions = async () => {
  const res = await read('transactions.json')

  return res.json()
}

const LottoryUtil = {
  randomNo,
  getLottory,
  generate,
  getLottories,
}

export default LottoryUtil
