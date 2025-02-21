import { ReactElement } from 'react'

type Props = {
  itemWidth: number
  children: ReactElement
}

const SlideShow: React.FC<Props> = ({ children, itemWidth}) => {
  return (
    <div className="grayscale">
      {children}
    </div>
  )
}

export default SlideShow