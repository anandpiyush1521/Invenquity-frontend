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
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [replyText, setReplyText] = useState(""); // Reply text state

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

  // Handle reply button click
  const handleReplyClick = (query) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReplyText(""); // Clear the reply text when closing
  };

  // Handle send reply
  const handleSendReply = () => {
    // Handle sending the reply logic here, for now just print the reply text
    console.log("Reply sent:", replyText);
    handleCloseModal(); // Close the modal after sending
  };

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

                {/* Reply Button */}
                <div className="mt-4">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-md"
                    onClick={() => handleReplyClick(query)}
                  >
                    Reply
                  </button>
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

      {/* Modal for Reply */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Reply to Query</h3>

            {/* Information Message */}
            <div className="mb-4 p-4 bg-blue-100 text-blue-700 border-l-4 border-blue-500">
              <p className="font-semibold">Software Updates</p>
              <p className="mt-2">
                How often are software updates released for Invenquity? Is
                there an automatic update feature?
              </p>
            </div>

            {/* Reply Textbox */}
            <textarea
              className="w-full h-32 p-2 border border-gray-300 rounded-md"
              placeholder="Type your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            ></textarea>

            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md"
                onClick={handleSendReply}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerQuery;
