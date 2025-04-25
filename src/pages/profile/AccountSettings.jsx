"use client"

import { useState } from "react"
import { useAuth } from "../../context/AuthContext"

const AccountSettings = () => {
  const { logout } = useAuth()
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    eventReminders: true,
    accountUpdates: true,
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    })
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match")
      return
    }

    // In a real app, you would send this data to your backend
    console.log("Password change data:", passwordData)

    // Reset form
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    // Show success message
    setSuccessMessage("Password changed successfully!")

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const handleNotificationSubmit = (e) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    console.log("Notification settings:", notificationSettings)

    // Show success message
    setSuccessMessage("Notification preferences updated!")

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const handleDeleteAccount = () => {
    // In a real app, you would send a request to delete the account
    console.log("Deleting account...")

    // Log the user out
    logout()

    // Redirect to home page
    window.location.href = "/"
  }

  return (
    <div className="account-settings">
      <div className="section-header">
        <h2>Account Settings</h2>
      </div>

      {successMessage && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i> {successMessage}
        </div>
      )}

      <div className="settings-section">
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword" className="form-label">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="btn">
            Change Password
          </button>
        </form>
      </div>

      <div className="settings-section">
        <h3>Notification Preferences</h3>
        <form onSubmit={handleNotificationSubmit}>
          <div className="notification-options">
            <div className="notification-option">
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onChange={handleNotificationChange}
              />
              <div>
                <label htmlFor="emailNotifications">Email Notifications</label>
                <p>Receive notifications via email</p>
              </div>
            </div>
            <div className="notification-option">
              <input
                type="checkbox"
                id="smsNotifications"
                name="smsNotifications"
                checked={notificationSettings.smsNotifications}
                onChange={handleNotificationChange}
              />
              <div>
                <label htmlFor="smsNotifications">SMS Notifications</label>
                <p>Receive notifications via text message</p>
              </div>
            </div>
            <div className="notification-option">
              <input
                type="checkbox"
                id="marketingEmails"
                name="marketingEmails"
                checked={notificationSettings.marketingEmails}
                onChange={handleNotificationChange}
              />
              <div>
                <label htmlFor="marketingEmails">Marketing Emails</label>
                <p>Receive promotional emails about events and offers</p>
              </div>
            </div>
            <div className="notification-option">
              <input
                type="checkbox"
                id="eventReminders"
                name="eventReminders"
                checked={notificationSettings.eventReminders}
                onChange={handleNotificationChange}
              />
              <div>
                <label htmlFor="eventReminders">Event Reminders</label>
                <p>Receive reminders about upcoming events you've booked</p>
              </div>
            </div>
            <div className="notification-option">
              <input
                type="checkbox"
                id="accountUpdates"
                name="accountUpdates"
                checked={notificationSettings.accountUpdates}
                onChange={handleNotificationChange}
              />
              <div>
                <label htmlFor="accountUpdates">Account Updates</label>
                <p>Receive notifications about account activity and security</p>
              </div>
            </div>
          </div>
          <button type="submit" className="btn">
            Save Preferences
          </button>
        </form>
      </div>

      <div className="settings-section danger-zone">
        <h3>Danger Zone</h3>
        <p>Once you delete your account, there is no going back. Please be certain.</p>
        {!showDeleteConfirm ? (
          <button className="btn btn-danger" onClick={() => setShowDeleteConfirm(true)}>
            Delete Account
          </button>
        ) : (
          <div className="delete-confirm">
            <p>Are you sure you want to delete your account? All your data will be permanently removed.</p>
            <div className="delete-actions">
              <button className="btn btn-danger" onClick={handleDeleteAccount}>
                Yes, Delete My Account
              </button>
              <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountSettings

