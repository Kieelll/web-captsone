import React from "react";
import "./schedule.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Schedules from "../../components/schedules/Schedules";
import WeeklySchedule from "../../components/weeklySchedule/WeeklySchedule";
import { TourProvider, useTour } from "@reactour/tour";

const ScheduleContent = () => {
  const { setIsOpen, setCurrentStep } = useTour();

  return (
    <div className="schedule">
      <Sidebar />
      <div className="scheduleContainer">
        <Navbar />

        <div className="schedulefilterContainer">
          <Schedules />
        </div>
        <div className="weeklyScheduleContainer">
          <WeeklySchedule />
        </div>
      </div>
    </div>
  );
};

// Define tour steps
const steps = [
  {
    selector: ".schedules",
    content: "This section lets you filter and manage schedules by specific criteria.",
  },
  {
    selector: ".weeklySchedule",
    content: "Here is the weekly schedule view. You can manage each day’s availability here.",
  },
  {
    selector: ".calendarCell",
    content: "Use this section to create and manage events like food waste collection. Scheduled events will automatically send notifications to the relevant users."
  },
];

const Schedule = () => {
  return (
    <TourProvider
      steps={steps}
      styles={() => ({
        maskWrapper: {
          zIndex: 9999,
        },
        popover: (base) => ({
          ...base,
          backgroundColor: "#e8f5e9",
          color: "#1b5e20",
          borderRadius: "10px",
          padding: "20px",
        }),
        badge: (base) => ({
          ...base,
          backgroundColor: "#66bb6a",
        }),
        close: (base) => ({
          ...base,
          color: "#1b5e20",
        }),
      })}
      showNavigation={true}
      showBadge={true}
      showCloseButton={true}
    >
      <ScheduleContent />
    </TourProvider>
  );
};

export default Schedule;
