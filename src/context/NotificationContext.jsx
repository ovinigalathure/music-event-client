"use client"

import { createContext, useContext, useState, useEffect } from "react"

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Load notifications from localStorage
    const savedNotifications = localStorage.getItem("notifications")

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    } else {
      // Mock notifications for demo
      const mockNotifications = [
        {
          id: "1",
          message: 'Your ticket for "Summer Music Festival" has been confirmed!',
          time: "2 hours ago",
          read: false,
        },
        {
          id: "2",
          message: 'New event "Jazz Night" has been added near your location.',
          time: "1 day ago",
          read: true,
        },
        {
          id: "3",
          message: 'Don\'t forget! "Rock Concert" is happening tomorrow.',
          time: "2 days ago",
          read: true,
        },
      ]

      setNotifications(mockNotifications)
      localStorage.setItem("notifications", JSON.stringify(mockNotifications))
    }
  }, [])

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      time: "Just now",
      read: false,
      ...notification,
    }

    setNotifications((prev) => {
      const updated = [newNotification, ...prev]
      localStorage.setItem("notifications", JSON.stringify(updated))
      return updated
    })
  }

  const markAsRead = (id) => {
    setNotifications((prev) => {
      const updated = prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      )

      localStorage.setItem("notifications", JSON.stringify(updated))
      return updated
    })
  }

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((notification) => ({ ...notification, read: true }))
      localStorage.setItem("notifications", JSON.stringify(updated))
      return updated
    })
  }

  const deleteNotification = (id) => {
    setNotifications((prev) => {
      const updated = prev.filter((notification) => notification.id !== id)
      localStorage.setItem("notifications", JSON.stringify(updated))
      return updated
    })
  }

  const clearAll = () => {
    setNotifications([])
    localStorage.removeItem("notifications")
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

