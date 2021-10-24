import React, { useRef } from 'react';
import './dob.css';

export const DOB = () => {
  const dayInputRef = useRef(null);
  const monthInputRef = useRef(null);
  const yearInputRef = useRef(null);

  const handleChange = event => {
    const day = dayInputRef.current.value;
    const year = yearInputRef.current.value;

    // 30 or 31 days?
    switch (parseInt(monthInputRef.current.value, 10)) {
      case 4:
      case 6:
      case 9:
      case 11:
        if (day > 30) {
          dayInputRef.current.value = 30;
        }
        break;
      case 2:
        // If month is February, calculate whether it is a leap year or not
        if (day > 28 && year && year.length === 4) {
          const isLeap = new Date(year, 1, 29).getMonth() === 1;
          dayInputRef.current.value = isLeap ? 29 : 28;
        }
        break;
      default:
        break;
    }

    const currentYear = new Date().getFullYear();
    if (year > currentYear) {
      yearInputRef.current.value = currentYear;
    }
  };

  const handleKeyUp = event => {
    event.persist();
    const { value, maxLength, nextElementSibling } = event.target;
    if (value.length === maxLength && nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const handleKeyDown = event => {
    event.persist();
    const allowedKeys = [
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'Backspace',
      'Delete',
      'Tab',
      /* IE/Edge specific values */
      'Down',
      'Left',
      'Right',
      'Up'
    ];

    const { key } = event;
    const isNumeric = /[0-9]/g.test(key);
    if (!isNumeric && !allowedKeys.includes(key)) {
      event.preventDefault();
      return;
    }
  };

  return (
    <>
      <label htmlFor="day">Date of Birth:</label>
      <div id="date1" className="datefield">
        <input
          id="day"
          type="tel"
          maxLength="2"
          placeholder="DD"
          ref={dayInputRef}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
        /
        <input
          id="month"
          type="tel"
          maxLength="2"
          placeholder="MM"
          ref={monthInputRef}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
        /
        <input
          id="year"
          type="tel"
          maxLength="4"
          placeholder="YYYY"
          ref={yearInputRef}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
};
