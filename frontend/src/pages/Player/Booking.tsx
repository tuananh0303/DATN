import { useNavigate } from "react-router-dom"

const BookingPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Booking Page</h1>
      <button onClick={() => navigate('/')}>Go to Facility Detail</button>
    </div>
  )
}

export default BookingPage