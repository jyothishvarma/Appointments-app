// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStarred = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item-container">
      <div className="title-container">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-btn"
          onClick={onStarred}
          data-testId="star"
        >
          <img src={starImage} className="star-img" alt="star" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
