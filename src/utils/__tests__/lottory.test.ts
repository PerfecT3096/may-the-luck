import { randomNo } from '@utils/lottory'

describe('Test random lotto number', () => {
  it('6 digits', () => {
    const result = randomNo(6)

    expect(result.length).toEqual(6)
  })

  it('3 digits', () => {
    const result = randomNo(3)

    expect(result.length).toEqual(3)
  })
})
