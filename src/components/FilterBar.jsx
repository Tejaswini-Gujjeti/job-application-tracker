function FilterBar({
  filterStatus,
  setFilterStatus,
  sortOrder,
  setSortOrder
}) {
  return (
    <div className="filter-container">
      <select
        value={filterStatus}
        onChange={(event) => setFilterStatus(event.target.value)}
      >
        <option>All</option>
        <option>Applied</option>
        <option>Assessment</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <select
        value={sortOrder}
        onChange={(event) => setSortOrder(event.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  )
}

export default FilterBar