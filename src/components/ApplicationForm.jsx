import { useState } from "react"
import { saveResume } from "../utils/resumeDB"

function ApplicationForm({ addApplication }) {
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [location, setLocation] = useState("")
  const [status, setStatus] = useState("Applied")
  const [applicationDate, setApplicationDate] = useState("")

  const [resume, setResume] = useState(null)

  const [error, setError] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      company.trim() === "" ||
      role.trim() === "" ||
      location.trim() === "" ||
      applicationDate === ""
    ) {
      setError("Please fill in all fields.")
      return
    }

    const applicationId = Date.now()

    const application = {
      id: applicationId,
      company: company.trim(),
      role: role.trim(),
      location: location.trim(),
      status,
      applicationDate,
      resume: resume
        ? {
            name: resume.name,
            type: resume.type
          }
        : null
    }

    // Add application to the application list
    addApplication(application)

    // Save actual resume file in IndexedDB
    if (resume) {
      await saveResume(applicationId, resume)
    }

    // Clear form
    setCompany("")
    setRole("")
    setLocation("")
    setStatus("Applied")
    setApplicationDate("")
    setResume(null)
    setError("")
  }

  return (
    <section className="form-section">
      <h2>Add Job Application</h2>

      <form
        onSubmit={handleSubmit}
        className="application-form"
      >
        <div className="form-group">
          <label>Company Name</label>

          <input
            type="text"
            placeholder="Example: Infosys"
            value={company}
            onChange={(event) =>
              setCompany(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Job Role</label>

          <input
            type="text"
            placeholder="Example: Software Engineer"
            value={role}
            onChange={(event) =>
              setRole(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Location</label>

          <input
            type="text"
            placeholder="Example: Hyderabad"
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            <option>Applied</option>
            <option>Assessment</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label>Application Date</label>

          <input
            type="date"
            value={applicationDate}
            onChange={(event) =>
              setApplicationDate(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Resume (Optional)</label>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(event) => {
              setResume(event.target.files[0] || null)
            }}
          />

          {resume && (
            <small>
              Selected: {resume.name}
            </small>
          )}
        </div>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="add-button"
        >
          Add Application
        </button>
      </form>
    </section>
  )
}

export default ApplicationForm