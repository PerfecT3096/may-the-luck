import dayjs from 'dayjs'

import { read, write } from './file'

export const getTransactions = async () => {
  const transactions: { [key: string]: ITransaction[] } = await read(
    'transaction.json',
  )

  return transactions
}

export const getTransaction = async (date: string): Promise<ITransaction[]> => {
  const transactions = await getTransactions()
  const target: ITransaction[] = transactions[date]

  if (!target) {
    return []
  }

  return target
}

export const setTransaction = async (data: {
  [key: string]: ITransaction[]
}) => {
  await write('transaction.json', JSON.stringify(data))
}

export const createTransaction = async (
  phone: string,
  number: string,
  date: string,
) => {
  const transactions = await getTransactions()

  const newData: ITransaction = {
    id: Math.floor(Math.random() * 1000),
    phone,
    number,
    createdAt: dayjs().format('YYYY/MM/DD HH:mm:ss'),
  }

  if (transactions[date]) {
    transactions[date].push(newData)
  } else {
    transactions[date] = [newData]
  }

  await setTransaction(transactions)
}

const TransactionUtil = {
  getTransactions,
  getTransaction,
  setTransaction,
  createTransaction,
}

export default TransactionUtil
