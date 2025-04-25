"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./Auth.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const redirectPath = searchParams.get("redirect") || "/"

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.password) {
        setError("Please fill in all required fields")
        return
    }

    try {
        setIsLoading(true)

        const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        })

        if (!res.ok) {
            const err = await res.text()
            setError(err || "Invalid email or password")
            setIsLoading(false)
            return
        }

        const userData = await res.json()
        login(userData) // this now automatically assigns role inside context

        // Redirect based on the role, handle admin redirection to the different port
        const isAdmin = userData.email.toLowerCase().includes("admin")
        if (isAdmin) {
            // For Admin: Redirect to the admin section on another port (http://localhost:3000/)
            window.location.href = "http://localhost:3000/"
        } else {
            // For other users, navigate based on the redirect path or to the home page
            navigate(redirectPath || "/")
        }

    } catch (err) {
        console.error(err)
        setError("Login failed. Please try again.")
        setIsLoading(false)
    }
}

  
  
  

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to access your account and manage your tickets</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-with-icon">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
                <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn auth-btn" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="auth-divider"><span>OR</span></div>

          <div className="social-auth">
            <button className="social-btn google">
              <i className="fab fa-google"></i> Sign in with Google
            </button>
            <button className="social-btn facebook">
              <i className="fab fa-facebook-f"></i> Sign in with Facebook
            </button>
          </div>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
          </div>
        </div>

        <div className="auth-image">
          <img src="/src/Assests/back 3.jpg" alt="Login" />
        </div>
      </div>
    </div>
  )
}

export default Login
