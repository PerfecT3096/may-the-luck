import { FC } from 'react'
import dayjs from 'dayjs'
import th from 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

import Title from '@components/common/Title'

dayjs.extend(buddhistEra)

interface Props {
  date: string
}

const TitleBox: FC<Props> = (props: Props) => {
  const { date } = props

  const thaiDay = dayjs(date).locale(th).format('DD MMMM BBBB')

  return (
    <div className='flex flex-col items-center gap-3'>
      <Title>ผลสลากจำลอง</Title>
      <Title className='text-teal-600'>งวดวันที่ {thaiDay}</Title>
    </div>
  )
}

export default TitleBox
