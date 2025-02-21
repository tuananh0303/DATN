type Props = {
  image: string,
  userName: string,
  testimonial: string
}

const Testimonial: React.FC<Props> = ({ image, userName, testimonial }) => {
  return (
    <div className='flex flex-col items-center w-96 text-center border-2 border-slate-400 py-5 px-2 rounded-xl shadow-lg'>
      <img src={image} alt="avatar image" className='w-20 rounded-full ring-4' />
      <p className='mt-2 text-red-600 font-semibold'>{userName}</p>
      <div className='h-28 mt-4 text-blue-700'>"{testimonial}"</div>
    </div>
  )
}

export default Testimonial