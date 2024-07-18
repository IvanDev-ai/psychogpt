import React from 'react'
import Icon from '@/public/icon.png'
import Image from "next/image";
const BottomProfile = () => {
  return (
    <div className='w-[90%] flex gap-2 bg-gray-900 rounded-xl p-1 truncate text-sm text-left my-5 absolute inset-x-0 bottom-0 mx-auto'>
        <Image
          src={Icon}
          alt="last project"
          height={40}
          width={40}
          className="rounded-full p-1"
          draggable={false}
        />
        <div className="font-semibold flex items-center justify-center">Iván Martín</div>
    </div>
  )
}

export default BottomProfile