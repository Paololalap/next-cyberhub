import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='h-[530px] w-screen grid place-items-center'>
      <Loader2 className='size-36 animate-spin'/>
    </div>
  )
}
