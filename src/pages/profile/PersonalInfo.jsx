import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const PersonalInfo = () => {
  const { user } = useAuth();  // Assuming the user is available from AuthContext
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",  // Default empty, should be set from backend
    birthDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user?.id) {
      // Fetch user data from the backend if the user is logged in
      axios
        .get(`http://localhost:8080/api/auth/profile/${user.id}`)
        .then((response) => {
          const userProfile = response.data;
          setFormData({
            name: userProfile.name,
            email: userProfile.email,
            phone: userProfile.phone,
            address: userProfile.address,
            city: userProfile.city,
            state: userProfile.state,
            zipCode: userProfile.zipCode,
            country: userProfile.country || "United States", // Default to "United States" if no country is set
            birthDate: userProfile.birthDate,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setErrorMessage("Failed to load user data.");
        });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = user?.id;  // Assuming `user.id` comes from the AuthContext
    console.log("User ID being passed: ", userId);  // Log the user ID

    if (!userId) {
      setErrorMessage("User ID is missing or invalid.");
      return;
    }

    // Construct the payload
    const updatedUserData = { ...formData };

    // Send data to the backend to update the user profile
    axios
      .put(`http://localhost:8080/api/auth/update/${userId}`, updatedUserData)
      .then((response) => {
        setSuccessMessage("Profile information updated successfully!");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        setIsEditing(false);  // Exit edit mode
      })
      .catch((error) => {
        console.error("Error response from backend:", error.response);  // Log the error for debugging

        if (error.response?.status === 404) {
          setErrorMessage("User not found.");
        } else {
          setErrorMessage("Failed to update profile. Please try again later.");
        }

        setTimeout(() => {
          setErrorMessage("");  // Hide error after 3 seconds
        }, 3000);
      });
  };

  return (
    <div className="personal-info">
      <div className="section-header">
        <h2>Personal Information</h2>
        {!isEditing && (
          <button className="btn-small" onClick={() => setIsEditing(true)}>
            <i className="fas fa-edit"></i> Edit
          </button>
        )}
      </div>

      {successMessage && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i> {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i> {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              disabled={!isEditing}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              disabled={!isEditing}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthDate" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="form-input"
            disabled={!isEditing}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state" className="form-label">
              State/Province
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="zipCode" className="form-label">
              ZIP/Postal Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="form-input"
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="form-input"
              disabled={!isEditing}
            >
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <button type="submit" className="btn">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PersonalInfo;
