import { FC } from 'react'

import MajorLottoCard from '@components/common/MajorLottoCard'
import MinorLottoCard from '@components/common/MinorLottoCard'

interface Props extends ILottory {}

const ResultBox: FC<Props> = (props: Props) => {
  const { firstPrize, threeFront, threeLast, twoLast } = props

  return (
    <>
      <div className='my-5'>
        <MajorLottoCard title='รางวัลที่ 1' no={firstPrize} />
      </div>

      <div className='flex justify-around'>
        <MinorLottoCard title='เลขหน้า 3 ตัว' no={threeFront} />
        <MinorLottoCard title='เลขหลัง 3 ตัว' no={threeLast} />
        <MinorLottoCard title='เลขท้าย 2 ตัว' no={twoLast} />
      </div>
    </>
  )
}

export default ResultBox
