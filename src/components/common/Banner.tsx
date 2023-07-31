'use client'

import { motion } from 'framer-motion'

const Banner = () => {
  return (
    <div className='w-full px-2 py-1 bg-red-300 text-black fixed'>
      <motion.p
        className='tracking-widest'
        animate={{ x: ['100vw', '-50vw'] }}
        transition={{ duration: 40, repeat: Infinity }}
      >
        ข้อมูลในเว็บไซต์นี้เป็นข้อมูลที่
        <span className='text-red-600 underline'>จำลอง</span>ขึ้น&#160;
        <span className='text-red-600 underline'>ไม่สามารถ</span>นำไปใช้จริงได้
        !!!
      </motion.p>
    </div>
  )
}

export default Banner
