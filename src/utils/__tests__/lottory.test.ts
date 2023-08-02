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
      LottoryUtil.getLottories = jest.fn(async () => {
        return {
          '2023/07/16': {
            firstPrize: '123456',
            threeFront: '222',
            threeLast: '333',
            twoLast: '54',
            date: '2023/07/16',
          },
          '2023/07/31': {
            firstPrize: '865737',
            threeFront: '676',
            threeLast: '782',
            twoLast: '44',
            date: '2023/07/31',
          },
        }
      })
    })

    it('Should return the latest date of lottory', async () => {
      const lottory = await LottoryUtil.getLottory()

      expect(lottory?.firstPrize).toBe('865737')
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
      lottoies = {
        '2023/07/16': {
          firstPrize: LottoryUtil.randomNo(6),
          threeFront: LottoryUtil.randomNo(3),
          threeLast: LottoryUtil.randomNo(3),
          twoLast: LottoryUtil.randomNo(2),
          date: '2023/07/31',
        },
      }

      LottoryUtil.generate = jest.fn(async () => {
        const day = '2023/08/16'

        lottoies[day] = {
          firstPrize: LottoryUtil.randomNo(6),
          threeFront: LottoryUtil.randomNo(3),
          threeLast: LottoryUtil.randomNo(3),
          twoLast: LottoryUtil.randomNo(2),
          date: day,
        }
      })
    })

    it('Should generate new number', async () => {
      expect(Object.keys(lottoies).length).toBe(1)

      LottoryUtil.generate()

      expect(Object.keys(lottoies).length).toBe(2)
    })
  })
})
