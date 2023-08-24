// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  onChangeTitle = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  getFilteredAppointments = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  onFilterActive = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-active' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointments()

    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="appointment-app-container">
            <div className="add-appointment-container">
              <form className="form-container" onSubmit={this.onAddAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="title-el" className="label-text">
                  Title
                </label>
                <input
                  type="text"
                  id="title-el"
                  className="title-input"
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                  value={titleInput}
                />
                <label htmlFor="date-el" className="label-text">
                  Date
                </label>
                <input
                  type="date"
                  id="date-el"
                  className="date-input"
                  onChange={this.onChangeDate}
                  value={dateInput}
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="img"
                alt="appointments"
              />
            </div>
            <hr className="line" />
            <div className="appointments-and-starred-container">
              <h1 className="appointments-head">Appointments</h1>
              <button
                type="button"
                className={`${filterClassName} starred-btn`}
                onClick={this.onFilterActive}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list-container">
              {filteredAppointmentsList.map(each => (
                <AppointmentItem
                  key={each.id}
                  appointmentDetails={each}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
