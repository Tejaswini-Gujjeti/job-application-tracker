import ApplicationCard from "./ApplicationCard"

function ApplicationList({
  applications,
  deleteApplication,
  updateApplication
}) {
  if (applications.length === 0) {
    return (
      <div className="empty-state">

        <img
          src="/illustrations/tasks.svg"
          alt="No applications"
          className="empty-state-illustration"
        />

        <h3>No applications found</h3>

        <p>
          Add an application or change your search/filter.
        </p>

      </div>
    )
  }

  return (
    <div className="application-list">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          deleteApplication={deleteApplication}
          updateApplication={updateApplication}
        />
      ))}
    </div>
  )
}

export default ApplicationList