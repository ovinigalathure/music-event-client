"use client"

import { useState, useEffect } from "react"
import "./Countdown.css"

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const addLeadingZero = (value) => {
    return value < 10 ? `0${value}` : value
  }

  return (
    <div className="countdown">
      <div className="countdown-item">
        <span className="countdown-value">{addLeadingZero(timeLeft.days || 0)}</span>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{addLeadingZero(timeLeft.hours || 0)}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{addLeadingZero(timeLeft.minutes || 0)}</span>
        <span className="countdown-label">Minutes</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{addLeadingZero(timeLeft.seconds || 0)}</span>
        <span className="countdown-label">Seconds</span>
      </div>
    </div>
  )
}

export default Countdown

