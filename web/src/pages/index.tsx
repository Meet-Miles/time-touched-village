import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="bg-[#82A779] h-screen overflow-hidden w-full relative">
      <div className='select-none pointer-events-none'>
        <img src="/corner-left.svg" className="absolute top-0 left-0 w-[300px]" />
        <img src="/corner-right.svg" className="absolute bottom-0 right-0 w-[300px]" />
      </div>
      <div className='ui relative w-full h-full p-8'>
        <div>
          Other UI elements
        </div>
        <button className="button">
          Start now
        </button>
      </div>
    </div>
  )
}
