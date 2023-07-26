'use client'

import { motion } from 'framer-motion'

const HomePage = () => {
  return (
    <main>
      <motion.div
        className='bg-orange-600 w-52 h-52 rounded-lg'
        drag='x'
        dragConstraints={{ left: 100, right: 100 }}
      />
    </main>
  )
}

export default HomePage
