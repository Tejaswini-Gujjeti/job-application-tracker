import { useState } from "react"
import {
  Pencil,
  Trash2,
  FileText,
  Eye,
  Upload
} from "lucide-react"
import {
  saveResume,
  getResume
} from "../utils/resumeDB"

function ApplicationCard({
  application,
  deleteApplication,
  updateApplication
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [showResumeUpload, setShowResumeUpload] = useState(false)

  const [company, setCompany] = useState(application.company)
  const [role, setRole] = useState(application.role)
  const [location, setLocation] = useState(application.location)
  const [status, setStatus] = useState(application.status)
  const [applicationDate, setApplicationDate] = useState(
    application.applicationDate
  )

  const handleUpdate = () => {
    const updatedApplication = {
      ...application,
      company,
      role,
      location,
      status,
      applicationDate
    }

    updateApplication(updatedApplication)
    setIsEditing(false)
  }

  const handleDelete = () => {
    deleteApplication(application.id)
  }

  const handleResumeChange = async (event) => {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    try {
      await saveResume(application.id, file)

      const updatedApplication = {
        ...application,
        company,
        role,
        location,
        status,
        applicationDate,
        resume: {
          name: file.name,
          type: file.type
        }
      }

      updateApplication(updatedApplication)

      setShowResumeUpload(false)
    } catch (error) {
      console.error("Error saving resume:", error)
      alert("Could not save the resume.")
    }
  }

  const handleViewResume = async () => {
    try {
      const resumeData = await getResume(application.id)

      if (!resumeData) {
        alert("Resume file not found.")
        return
      }

      const fileURL = URL.createObjectURL(resumeData.file)

      window.open(fileURL, "_blank")
    } catch (error) {
      console.error("Error opening resume:", error)
      alert("Could not open the resume.")
    }
  }

  // EDIT MODE
  if (isEditing) {
    return (
      <div className="application-card">
        <h3>Edit Application</h3>

        <div className="edit-form">

          <input
            type="text"
            value={company}
            onChange={(event) =>
              setCompany(event.target.value)
            }
          />

          <input
            type="text"
            value={role}
            onChange={(event) =>
              setRole(event.target.value)
            }
          />

          <input
            type="text"
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
          />

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

          <input
            type="date"
            value={applicationDate}
            onChange={(event) =>
              setApplicationDate(event.target.value)
            }
          />

          {/* RESUME SECTION */}
          <div className="edit-resume-section">

            <p>
              <strong>Resume:</strong>{" "}
              {application.resume
                ? application.resume.name
                : "Not added"}
            </p>

            {!application.resume ? (
              <button
                type="button"
                onClick={() => setShowResumeUpload(true)}
                className="resume-button"
              >
                Add Resume
              </button>
            ) : (
              <div className="resume-buttons">

                <button
                  type="button"
                  onClick={handleViewResume}
                  className="resume-button"
                >
                  View Resume
                </button>

                <button
                  type="button"
                  onClick={() => setShowResumeUpload(true)}
                  className="resume-edit-button"
                >
                  Replace Resume
                </button>

              </div>
            )}

            {showResumeUpload && (
              <div className="resume-upload">

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                />

                <button
                  type="button"
                  onClick={() => setShowResumeUpload(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>

              </div>
            )}

          </div>

          {/* SAVE / CANCEL */}
          <div className="button-group">

            <button
              type="button"
              onClick={handleUpdate}
              className="save-button"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="cancel-button"
            >
              Cancel
            </button>

          </div>

        </div>
      </div>
    )
  }

  // NORMAL CARD
  return (
    <div className="application-card">

      <div className="card-header">

        <h3>{application.company}</h3>

        <span
          className={`status ${application.status.toLowerCase()}`}
        >
          {application.status}
        </span>

      </div>

      <p>
        <strong>Role:</strong> {application.role}
      </p>

      <p>
        <strong>Location:</strong> {application.location}
      </p>

      <p>
        <strong>Application Date:</strong>{" "}
        {application.applicationDate}
      </p>

      {/* ONLY EDIT AND DELETE IN NORMAL CARD */}
      <div className="button-group">

        <button
          onClick={() => setIsEditing(true)}
          className="edit-button"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="delete-button"
        >
          Delete
        </button>

      </div>

    </div>
  )
}

export default ApplicationCard