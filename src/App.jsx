import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Dashboard from "./components/Dashboard"
import ApplicationForm from "./components/ApplicationForm"
import SearchBar from "./components/SearchBar"
import FilterBar from "./components/FilterBar"
import ApplicationList from "./components/ApplicationList"
import "./App.css"

function App() {
  // Load applications from LocalStorage when the app starts
  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem("applications")

    if (savedApplications) {
      return JSON.parse(savedApplications)
    }

    return []
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [sortOrder, setSortOrder] = useState("newest")

  // Save applications whenever applications change
  useEffect(() => {
    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    )
  }, [applications])

  // Add application
  const addApplication = (application) => {
    setApplications((previousApplications) => [
      ...previousApplications,
      application
    ])
  }

  // Delete application
  const deleteApplication = (id) => {
    setApplications((previousApplications) =>
      previousApplications.filter(
        (application) => application.id !== id
      )
    )
  }

  // Edit application
  const updateApplication = (updatedApplication) => {
    setApplications((previousApplications) =>
      previousApplications.map((application) =>
        application.id === updatedApplication.id
          ? updatedApplication
          : application
      )
    )
  }

  // Search + filter + sort
  const filteredApplications = [...applications]
    .filter((application) => {
      const searchText = searchTerm.toLowerCase()

      return (
        application.company.toLowerCase().includes(searchText) ||
        application.role.toLowerCase().includes(searchText) ||
        application.location.toLowerCase().includes(searchText)
      )
    })
    .filter((application) => {
      if (filterStatus === "All") {
        return true
      }

      return application.status === filterStatus
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(b.applicationDate) -
          new Date(a.applicationDate)
        )
      }

      return (
        new Date(a.applicationDate) -
        new Date(b.applicationDate)
      )
    })

  return (
    <div>
      <Navbar />
<main className="container">

  <section className="hero-section">

    <div className="hero-content">
      <h1>Job Application Tracker</h1>

      <p className="subtitle">
        Track your job applications in one place.
      </p>

      <p className="hero-description">
        Stay organized, keep track of your progress,
        and manage your job search with ease.
      </p>
    </div>

    <div className="hero-illustration">
      <img
        src="/illustrations/career-development.svg"
        alt="Career development"
      />
    </div>

  </section>

  <Dashboard applications={applications} />

        <ApplicationForm
          addApplication={addApplication}
        />

        <div className="application-section">
          <h2>My Applications</h2>

          <div className="controls">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <FilterBar
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>

          <ApplicationList
            applications={filteredApplications}
            deleteApplication={deleteApplication}
            updateApplication={updateApplication}
          />
        </div>
      </main>
    </div>
  )
}

export default App