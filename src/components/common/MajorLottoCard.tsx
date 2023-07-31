'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'

interface Props {
  title: string
  no: string
}

const MajorLottoCard: FC<Props> = (props: Props) => {
  const { title, no } = props

  const numbers = no.split('')

  const rows = {
    visible: {
      opacity: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.8 },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
  }

  const item = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 5 },
  }

  return (
    <div className='flex flex-col items-center justify-center gap-2 p-2'>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='text-xl font-thin'
      >
        {title}
      </motion.p>
      <motion.div
        className='flex'
        initial='hidden'
        animate='visible'
        variants={rows}
      >
        {numbers.map((n, i) => {
          return (
            <motion.p
              key={i}
              variants={item}
              className='text-7xl font-black px-2'
            >
              {n}
            </motion.p>
          )
        })}
      </motion.div>
    </div>
  )
}

export default MajorLottoCard
