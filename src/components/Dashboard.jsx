function Dashboard({ applications }) {
  const total = applications.length

  const applied = applications.filter(
    (application) => application.status === "Applied"
  ).length

  const assessment = applications.filter(
    (application) => application.status === "Assessment"
  ).length

  const interview = applications.filter(
    (application) => application.status === "Interview"
  ).length

  const offer = applications.filter(
    (application) => application.status === "Offer"
  ).length

  const rejected = applications.filter(
    (application) => application.status === "Rejected"
  ).length

  return (
    <section className="dashboard">
      <div className="stat-card">
        <h3>Total</h3>
        <p>{total}</p>
      </div>

      <div className="stat-card">
        <h3>Applied</h3>
        <p>{applied}</p>
      </div>

      <div className="stat-card">
        <h3>Assessment</h3>
        <p>{assessment}</p>
      </div>

      <div className="stat-card">
        <h3>Interview</h3>
        <p>{interview}</p>
      </div>

      <div className="stat-card">
        <h3>Offer</h3>
        <p>{offer}</p>
      </div>

      <div className="stat-card">
        <h3>Rejected</h3>
        <p>{rejected}</p>
      </div>
    </section>
  )
}

export default Dashboard