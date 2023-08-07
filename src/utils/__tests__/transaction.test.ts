import TransactionUtil from '@utils/transaction'

describe('Get transaction', () => {
  beforeEach(() => {
    TransactionUtil.getTransaction = jest.fn(async (date: string) => {
      const temp: { [key: string]: ITransaction[] } = {
        '2023/08/16': [
          {
            id: 123,
            phone: '0987654321',
            number: '111222',
            createdAt: '2023/08/07 01:47:36',
          },
          {
            id: 456,
            phone: '000000000',
            number: '784744',
            createdAt: '2023/08/07 01:47:40',
          },
          {
            id: 456,
            phone: '000000000',
            number: '888888',
            createdAt: '2023/08/07 01:47:40',
          },
        ],
      }

      return temp[date] || []
    })
  })

  it('Should return transaction which match the date', async () => {
    const transactions = await TransactionUtil.getTransaction('2023/08/16')

    expect(transactions.length).toBe(3)
  })

  it('Should return empty array, if it not match the date', async () => {
    const transactions = await TransactionUtil.getTransaction('2023/08/31')

    expect(transactions.length).toBe(0)
  })
})

describe('Create transaction', () => {
  let object: { [key: string]: ITransaction[] } = {}

  beforeEach(() => {
    object = {}

    TransactionUtil.createTransaction = jest.fn(
      async (phone: string, number: string, date: string) => {
        const newData: ITransaction = {
          id: 44,
          phone,
          number,
          createdAt: '2023/08/07 01:47:36',
        }

        if (object[date]) {
          object[date].push(newData)
        } else {
          object[date] = [newData]
        }
      },
    )
  })

  it('Should add new transaction which the date', () => {
    TransactionUtil.createTransaction('0999999999', '223344', '2023/08/16')

    expect(object['2023/08/16'].length).toBe(1)
  })

  it('Should add new transaction to the same date', () => {
    TransactionUtil.createTransaction('0999999999', '223344', '2023/08/16')
    TransactionUtil.createTransaction('0999999999', '123456', '2023/08/16')

    expect(object['2023/08/16'].length).toBe(2)
  })
})
