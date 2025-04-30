import "./schedule.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Schedules from "../../components/schedules/Schedules"
import WeeklySchedule from "../../components/weeklySchedule/WeeklySchedule"

const Schedule = () => {
  return (
    <div className="schedule">
      <Sidebar /> 
      <div className="scheduleContainer">
        <Navbar />
        <div className="schedulefilterContainer">
        <Schedules />
        </div>
        <div className="weeklySchedule">
        <WeeklySchedule />
        </div>
        
      </div>
    </div>
  )
}

export default Schedule
