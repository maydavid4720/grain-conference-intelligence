import { useState } from "react";
import { apiClient } from "../api/client";

function LeadCaptureModal({ conferences, onClose }) {
  const [formData, setFormData] = useState({
    full_name: "",
    company: "",
    job_title: "",
    conference_name: "",
    interest_level: "Medium",
    notes: "",
    follow_up_needed: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
  const { name, value, type, checked } = event.target;

  if (name === "conference_id") {
    const selectedConference = conferences.find(
      (conference) => conference.id === Number(value)
    )

    setFormData((currentData) => ({
      ...currentData,
      conference_id: value,
      conference_name: selectedConference?.name || "",
    }));

    return;
  }

  setFormData((currentData) => ({
    ...currentData,
    [name]: type === "checkbox" ? checked : value,
  }));
}

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await apiClient.post("/leads/", {
        ...formData,
        conference_id: Number(formData.conference_id),
      });

      setSuccessMessage("Lead captured successfully.");

      setFormData({
        full_name: "",
        company: "",
        job_title: "",
        conference_id: "",
        conference_name: "",
        interest_level: "Medium",
        notes: "",
        follow_up_needed: true,
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to capture lead. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="lead-modal">
        <div className="modal-header">
          <div>
            <h2>Capture Lead</h2>
            <p>Log a conference conversation quickly for follow-up.</p>
          </div>

          <button className="modal-close-button" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="lead-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              placeholder="Sarah Cohen"
            />
          </label>

          <label>
            Company
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="TravelPay"
            />
          </label>

          <label>
            Job title
            <input
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              placeholder="VP Treasury"
            />
          </label>

          <label>
            Conference
            <select
              name="conference_id"
              value={formData.conference_id}
              onChange={handleChange}
              required
            >
              <option value="">Select conference</option>
              {conferences.map((conference) => (
                <option key={conference.id} value={conference.id}>
                  {conference.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Interest level
            <select
              name="interest_level"
              value={formData.interest_level}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>

          <label>
            Notes
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Asked about FX exposure and requested follow-up."
              rows="4"
            />
          </label>

          <label className="checkbox-filter">
            <input
              type="checkbox"
              name="follow_up_needed"
              checked={formData.follow_up_needed}
              onChange={handleChange}
            />
            Follow-up needed
          </label>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="modal-actions">
            <button className="secondary-button" type="button" onClick={onClose}>
              Cancel
            </button>

            <button className="primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadCaptureModal;