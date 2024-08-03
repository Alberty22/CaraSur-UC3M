import './Calendar.css'
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth, addMonths, subMonths } from 'date-fns';

export function Calendar({ markedDates }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
      };
    
      const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
      };

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (
        <div className="header">
            <div>
                <div className="icon" onClick={prevMonth}>&#10094;</div>
            </div>
            <div>
                <span>{format(currentMonth, dateFormat)}</span>
            </div>
            <div >
                <div className="icon" onClick={nextMonth}>&#10095;</div>
            </div>
        </div>
        );
    };

  const renderDays = () => {
    const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    return (
      <div className="days">
        {days.map((day, index) => (
          <div key={index}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const isMarked = markedDates.some((markedDate) => isSameDay(markedDate.date, day));
        days.push(
          <div
            className={`col cell ${isSameMonth(day, monthStart) ? "" : "disabled"} ${isSameDay(day, new Date()) ? "selected" : ""} ${isMarked ? "marked" : ""}`}
            key={day}
            title={isMarked ? markedDates.find((markedDate) => isSameDay(markedDate.date, day)).text : ""}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}