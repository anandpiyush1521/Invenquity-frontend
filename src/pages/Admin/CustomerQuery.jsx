import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import PageTitle from "../../components/PageTitle";


function CustomerQuery() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [queriesPerPage] = useState(5); // Show 5 queries per page

  // Fetch data from API
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/invenquity/contact/all"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        // Sort by createdAt in descending order
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setQueries(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter queries based on search
  const filteredQueries = queries.filter((query) => {
    return (
      query.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${query.firstName} ${query.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      query.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination logic
  const indexOfLastQuery = page * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = filteredQueries.slice(
    indexOfFirstQuery,
    indexOfLastQuery
  );

  const paginate = (pageNumber) => setPage(pageNumber);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-blue-700">
        <div className="spinner-border text-blue-700" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        Loading customer queries...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex">
      <PageTitle title="ADMIN | Customer Query" />
      <AdminSidebar />
      <div className="flex-grow p-6 ml-4">
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Customer Queries
          </h1>

          {/* Search Bar */}
          <div className="mb-4 flex justify-between items-center">
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md w-1/2"
              placeholder="Search queries by subject, sender, or email..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <p className="text-sm text-gray-500">
              Found {filteredQueries.length} queries
            </p>
          </div>

          {/* Query List */}
          <div className="space-y-6">
            {currentQueries.map((query) => (
              <div
                key={query.id}
                className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {query.subject}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(query.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{query.message}</p>
                <div className="text-sm text-gray-500">
                  From: {query.firstName} {query.lastName} -{" "}
                  <a
                    href={`mailto:${query.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {query.email}
                  </a>
                </div>

                {/* Optional: Status update */}
                <div className="mt-4">
                  <div className="mt-4">
                    <div className="mt-4">
                      <div className="mt-4">
                        <button
                          className="bg-green-500 text-white py-2 px-4 rounded-md"
                          onClick={() => {
                            const formattedMessage = `**${query.message}**`; // Emulating bold with asterisks
                            const encodedMessage =
                              encodeURIComponent(formattedMessage); // URL encode the message content
                            const mailtoLink = `mailto:${query.email}?subject=Re: ${query.subject}&body=${encodedMessage}`;
                            window.location.href = mailtoLink; // Opens the email client with the populated fields
                          }}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-l-md"
              onClick={() => paginate(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="py-2 px-4 text-lg text-gray-700">
              Page {page} of{" "}
              {Math.ceil(filteredQueries.length / queriesPerPage)}
            </span>
            <button
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-r-md"
              onClick={() => paginate(page + 1)}
              disabled={
                page === Math.ceil(filteredQueries.length / queriesPerPage)
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerQuery;
