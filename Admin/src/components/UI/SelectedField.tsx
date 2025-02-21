import { useEffect, useRef, useState } from 'react'

type Props = {
  title: string,
  placeholder: string,
  selectedData : {id: string, name: string, icon?: string}[]
}

const SelectedField: React.FC<Props> = ({ title, placeholder, selectedData }) => {
  const divRef = useRef<HTMLDivElement>(null)
  // Change to props later
  const [value, setValue] = useState<string>('')
  const [isExpand, setIsExpand] = useState<boolean>(false)

  const text = value.length === 0 ? placeholder : selectedData.filter(data => data.id === value)[0].name

  const handleClickValue = (id: string) => {
    setValue(id)
  }

  const handleExpand = () => {
    setIsExpand(preState => !preState)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!divRef.current?.contains(event.target as Node)) {
        setIsExpand(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative hover:cursor-pointer" ref={divRef} onClick={handleExpand}>
      <div className='w-full px-2 py-1'>
        <h6 className="font-semibold">{title}</h6>
        <p className={`text-sm ${value.length !== 0 ? 'font-semibold' : 'font-normal text-slate-500'} `}>{ text }</p>
      </div>
      { isExpand && <div className='absolute w-full flex flex-col border border-black rounded-lg bg-white mt-3'>
        { selectedData.map(data => <div key={data.id} onClick={() => handleClickValue(data.id)} className=' text-center w-full p-2 border-b border-slate-300 hover:cursor-pointer hover:bg-blue-400 first:rounded-t-lg last:rounded-b-lg'>
          <p className='flex flex-row justify-center items-center gap-2'>{data.icon ? <img src={data.icon} className='object-fill w-6 h-6' /> : <></>}{data.name}</p>
        </div>) }
      </div> }
    </div>
  )
}

export default SelectedField