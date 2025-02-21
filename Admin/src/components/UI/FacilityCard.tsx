import Image from '@/assets/image 2.png'
import StarFull from '@/assets/star-full.svg'
import StarOutline from '@/assets/star-outline.svg'

type Props = {
  facilityName: string,
  sportIcons: string[],
  startTime: string,
  endTime: string,
  location: string,
  ratingScore: number,
  quantityRating: number
}

const FacilityCard: React.FC<Props> = ({ facilityName, sportIcons, startTime, endTime, location, ratingScore, quantityRating }) => {
  return (
    <div className="w-fit border-2 border-black rounded-lg flex-shrink-0">
      <img src={Image} alt="thumbnail" className='w-72 h-44 object-cover' />
      <div className='p-2 space-y-3'>
        <h3 className='font-semibold'>{facilityName}</h3>
        <div className='flex flex-row gap-2 justify-start items-center'>
          { sportIcons.map(icon => <img key={icon} src={icon} className='w-5' />) }
        </div>
        <p className='text-xs'>Mở cửa: <span className='text-red-600'>{startTime} - {endTime}</span></p>
        <p className='text-xs'>Địa chỉ: {location}</p>
        <div className='flex flex-row items-center justify-start gap-2'>
          <div className='flex flex-row items-center gap-1'>
            <img src={StarFull} className='object-contain w-5 h-5' />
            <img src={StarFull} className='object-contain w-5 h-5' />
            <img src={StarFull} className='object-contain w-5 h-5' />
            <img src={StarFull} className='object-contain w-5 h-5' />
            <img src={StarOutline} className='object-contain w-4.5 h-4.5' />
          </div>
          <p className='text-xs'>{ratingScore}({quantityRating})</p>
        </div>
      </div>
      <div className='flex flex-row justify-end mt-3 px-2 mb-3'>
        <p className='font-semibold'>Giá: <span className='font-normal text-red-600'>140.000 - 200.000 đồng/h</span></p>
      </div>
    </div>
  )
}

export default FacilityCard