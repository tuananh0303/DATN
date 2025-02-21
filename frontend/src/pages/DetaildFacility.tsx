import { useParams } from "react-router-dom"

const DetaildFacilityPage = () => {
  const { id } = useParams()

  console.log(id)

  return (
    <div className="px-8 tables:px-32">
      <h2>Thể thao 247 - Cơ sở Thủ Đức</h2>
      <div>
        
      </div>
    </div>
  )
}

export default DetaildFacilityPage