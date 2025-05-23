"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the AuthContext
const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const savedUser = localStorage.getItem("user")

      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }

      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = (userData) => {
    // ✅ Identify role based on email
    const adminEmails = ["admin@site.com"]
    const role = adminEmails.includes(userData.email.toLowerCase()) ? "ADMIN" : "USER"

    const fullUser = { ...userData, role }

    setUser(fullUser)
    localStorage.setItem("user", JSON.stringify(fullUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const register = (userData) => {
    // In a real app, you would send this to your backend
    const newUser = {
      ...userData,
      // Remove 'id' from here, as it's auto-generated by the backend
      role: "USER", // Default role for new users
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}
