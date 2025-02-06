import { useDispatch, useSelector } from 'react-redux'
import { demoAction } from '@/store/demo-slice'
interface State {
  demo: {
    counter: number
  }
}

const DemoConponent = () => {
  const counter = useSelector((state:State) => state.demo.counter)
  const dispath = useDispatch()

  const handleDecrementButton = () => {
    dispath(demoAction.decrement())
  }

  const handleIncrementButton = () => {
    dispath(demoAction.increment())
  }

  return (
    <div className='flex justify-between mx-auto min-w-max max-w-md mt-10 p-6 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
      <button onClick={handleDecrementButton} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Decrement</button>
      <p className='text-white text-center flex items-center'>{counter}</p>
      <button onClick={handleIncrementButton} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Increment</button>
    </div>
  )
}

export default DemoConponent