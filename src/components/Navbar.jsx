import { BriefcaseBusiness } from "lucide-react"

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">

        <div className="brand">
          <div className="brand-icon">
            <BriefcaseBusiness size={22} />
          </div>

          <div>
            <h2>JobTrack</h2>
            <span>Job Application Tracker</span>
          </div>
        </div>

        <span className="navbar-status">
          Stay organized. Stay ahead.
        </span>

      </div>
    </nav>
  )
}

export default Navbar