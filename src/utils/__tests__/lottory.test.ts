import LottoryUtil from '@utils/lottory'

describe('Test random lotto number', () => {
  it('Should return 6 digits', () => {
    const result = LottoryUtil.randomNo(6)

    expect(result.length).toEqual(6)
  })

  it('Should return 3 digits', () => {
    const result = LottoryUtil.randomNo(3)

    expect(result.length).toEqual(3)
  })
})

describe('Test integration with file lottory.json', () => {
  describe('Get lottory', () => {
    beforeEach(async () => {
      LottoryUtil.getLottory = jest.fn(async (date?: string) => {
        const temp: { [key: string]: ILottory } = {
          '2023/07/16': {
            firstPrize: '123456',
            threeFront: '222',
            threeLast: '333',
            twoLast: '54',
            date: '2023/07/16',
          },
          '2023/07/31': {
            firstPrize: '999999',
            threeFront: '676',
            threeLast: '782',
            twoLast: '44',
            date: '2023/07/31',
          },
        }

        if (!date) {
          return temp['2023/07/31']
        }

        return temp[date] || undefined
      })
    })

    it('Should return the latest date of lottory', async () => {
      const lottory = await LottoryUtil.getLottory()

      expect(lottory?.firstPrize).toBe('999999')
    })

    it('Should return a lottory which match the specify date', async () => {
      const lottory = await LottoryUtil.getLottory('2023/07/16')

      expect(lottory?.firstPrize).toBe('123456')
    })

    it('Should return undefined on the date does not contain data', async () => {
      const lottory = await LottoryUtil.getLottory('2023/07/10')

      expect(lottory?.firstPrize).toBeUndefined()
    })
  })

  describe('Generate number', () => {
    let lottoies: Partial<{ [key: string]: ILottory }> = {}

    beforeEach(async () => {
      lottoies = {}

      LottoryUtil.setLottory = jest.fn(
        async (
          prev: Partial<{ [key: string]: ILottory }>,
          newData: ILottory,
        ) => {
          if (prev[newData.date]) {
            return
          }

          lottoies = {
            ...prev,
            [newData.date]: newData,
          }
        },
      )

      LottoryUtil.generate = jest.fn(async () => {
        lottoies = {
          '2023/07/31': {
            firstPrize: LottoryUtil.randomNo(6),
            threeFront: LottoryUtil.randomNo(3),
            threeLast: LottoryUtil.randomNo(3),
            twoLast: LottoryUtil.randomNo(2),
            date: '2023/07/31',
          },
        }
      })
    })

    it('Should generate new number', async () => {
      expect(Object.keys(lottoies).length).toBe(0)

      LottoryUtil.generate()

      expect(Object.keys(lottoies).length).toBe(1)
    })

    it('Should set new 2 numbers to object', () => {
      expect(Object.keys(lottoies).length).toBe(0)

      LottoryUtil.setLottory(lottoies, {
        firstPrize: LottoryUtil.randomNo(6),
        threeFront: LottoryUtil.randomNo(3),
        threeLast: LottoryUtil.randomNo(3),
        twoLast: LottoryUtil.randomNo(2),
        date: '2023/07/31',
      })

      LottoryUtil.setLottory(lottoies, {
        firstPrize: LottoryUtil.randomNo(6),
        threeFront: LottoryUtil.randomNo(3),
        threeLast: LottoryUtil.randomNo(3),
        twoLast: LottoryUtil.randomNo(2),
        date: '2023/08/16',
      })

      expect(Object.keys(lottoies).length).toBe(2)
    })

    it('Should not save the same key', () => {
      LottoryUtil.setLottory(lottoies, {
        firstPrize: '222333',
        threeFront: LottoryUtil.randomNo(3),
        threeLast: LottoryUtil.randomNo(3),
        twoLast: LottoryUtil.randomNo(2),
        date: '2023/07/31',
      })

      LottoryUtil.setLottory(lottoies, {
        firstPrize: '123456',
        threeFront: LottoryUtil.randomNo(3),
        threeLast: LottoryUtil.randomNo(3),
        twoLast: LottoryUtil.randomNo(2),
        date: '2023/07/31',
      })

      expect(lottoies['2023/07/31']?.firstPrize).toBe('222333')
    })
  })
})
