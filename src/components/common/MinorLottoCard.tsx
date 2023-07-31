'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'

interface Props {
  title: string
  no: string
}

const MinorLottoCard: FC<Props> = (props: Props) => {
  const { title, no } = props

  const variants = {
    visible: {
      opacity: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.6 },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
  }

  const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <motion.div
      className='flex flex-col items-center justify-center gap-2 p-2'
      initial='hidden'
      animate='visible'
      variants={variants}
    >
      <motion.p className='text-md font-thin' variants={item}>
        {title}
      </motion.p>
      <motion.p
        className='text-2xl font-black px-2 tracking-wider'
        variants={item}
        transition={{ duration: 2 }}
      >
        {no}
      </motion.p>
    </motion.div>
  )
}

export default MinorLottoCard
