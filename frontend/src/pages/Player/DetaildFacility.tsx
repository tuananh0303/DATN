import { useParams } from "react-router-dom"
import ArrowIcon from "@/assets/arrow.svg"
import Imageevent from "@/assets/event.png"

const DetaildFacilityPage = () => {
  const { id } = useParams()

  console.log(id)

  return (
    <div className="px-8 tables:px-32">
      <h2>Thể thao 247 - Cơ sở Thủ Đức</h2>
      <div>
        aaaaaaaaaaaaaaaaaaaaaaaaa
      </div>
      <img src={Imageevent} alt="event" />
      <div>
        <img src={ArrowIcon} alt="arrow" />
      </div>
    </div>
  )
}

export default DetaildFacilityPage