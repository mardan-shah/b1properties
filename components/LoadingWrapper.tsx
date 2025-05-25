'use client'

import { useEffect, useState } from 'react'
import { usePathname} from 'next/navigation'
import Image from 'next/image'

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const handleLoad = () => setIsLoading(false)

    if (document.readyState === 'complete') {
      setIsLoading(false)
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  useEffect(() => {
    // show loader on route change
    setIsLoading(true)

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // give time for transition + image loading if needed

    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500">
          <div className="text-2xl font-semibold animate-pulse"><Image src='/Logo/logo-black.png' alt='Logo' width={200} height={200}/></div>
        </div>
      )}
      <div className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        {children}
      </div>
    </>
  )
}
