import React, { useEffect, useState } from "react";
import {
  Search,
  Mail,
  Clock,
  User,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  Loader,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import PageTitle from "../../components/PageTitle";

function CustomerQuery() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [queriesPerPage] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // Track active filter tab
  const [sending, setSending] = useState(false);
  const [replyStatus, setReplyStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/invenquity/contact/all"
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page on search
  };

  const filteredQueries = queries.filter((query) => {
    const searchMatch =
      query.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${query.firstName} ${query.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      query.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return searchMatch;
    if (activeTab === "recent")
      return searchMatch && new Date() - new Date(query.createdAt) < 86400000; // Last 24 hours
    if (activeTab === "pending") return searchMatch && !query.replied;
    return searchMatch;
  });

  const indexOfLastQuery = page * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = filteredQueries.slice(
    indexOfFirstQuery,
    indexOfLastQuery
  );
  const totalPages = Math.ceil(filteredQueries.length / queriesPerPage);

  const paginate = (pageNumber) => setPage(pageNumber);

  const handleReplyClick = (query) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      setReplyStatus({
        type: "error",
        message: "Please enter a reply message",
      });
      return;
    }

    setSending(true);
    setReplyStatus({ type: "", message: "" });

    try {
      // Get JWT token from localStorage or your auth management system
      const jwtToken = localStorage.getItem("token");

      if (!jwtToken) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        "http://localhost:8080/api/invenquity/contact/reply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: jwtToken,
          },
          body: JSON.stringify({
            email: selectedQuery.email,
            message: replyText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send reply");
      }

      // Update the queries list to mark this query as replied
      setQueries((prevQueries) =>
        prevQueries.map((q) =>
          q.id === selectedQuery.id ? { ...q, replied: true } : q
        )
      );

      setReplyStatus({
        type: "success",
        message: "Reply sent successfully",
      });

      // Close modal after a short delay to show success message
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Error sending reply:", error);
      setReplyStatus({
        type: "error",
        message: error.message || "Failed to send reply. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  // Update handleCloseModal to reset status
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReplyText("");
    setReplyStatus({ type: "", message: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
          <p className="mt-4 text-gray-600">Loading customer queries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
          <p className="text-red-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PageTitle title="Customer Query" />
      <div className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Customer Queries
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and respond to customer inquiries
              </p>
            </div>
            <a href="/invenquity/product/subscription-info">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                Subscription Details
              </button>
            </a>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Search queries by subject, sender, or email..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="flex gap-2 mt-4">
                {["all", "recent", "pending"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
                <span className="ml-auto text-sm text-gray-500 self-center">
                  {filteredQueries.length} queries found
                </span>
              </div>
            </div>
          </div>

          {/* Updated Queries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {currentQueries.map((query) => (
              <div
                key={query.id}
                className={`bg-white rounded-xl shadow-sm border transition-shadow duration-200 ${
                  query.replied
                    ? "border-green-100 hover:shadow-md/50"
                    : "border-gray-100 hover:shadow-md"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-2 flex-grow">
                      <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {query.subject}
                      </h2>
                      {query.replied && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Replied
                        </span>
                      )}
                    </div>
                    <span className="flex items-center text-sm text-gray-500 ml-2 shrink-0">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(query.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {query.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      <span>
                        {query.firstName} {query.lastName}
                      </span>
                      <Mail className="w-4 h-4 ml-3 mr-1" />
                      <a
                        href={`mailto:${query.email}`}
                        className="text-blue-500 hover:underline"
                      >
                        {query.email}
                      </a>
                    </div>

                    {query.replied ? (
                      <div className="text-sm text-gray-500 flex items-center">
                        <span>
                          Replied on{" "}
                          {new Date(query.repliedAt).toLocaleDateString()}
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleReplyClick(query)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Reply
                      </button>
                    )}
                  </div>

                  {query.replied && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleReplyClick(query)}
                        className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        Send another reply
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <button
              onClick={() => paginate(page - 1)}
              disabled={page === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                      page === number
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => paginate(page + 1)}
              disabled={page === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Updated Reply Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl m-4 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  Reply to Query
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                  disabled={sending}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6 bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-blue-700">
                    {selectedQuery?.firstName} {selectedQuery?.lastName}
                  </span>
                </div>
                <h4 className="font-semibold text-blue-700 mb-2">
                  {selectedQuery?.subject}
                </h4>
                <p className="text-blue-600">{selectedQuery?.message}</p>
              </div>

              {replyStatus.message && (
                <div
                  className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
                    replyStatus.type === "error"
                      ? "bg-red-50 text-red-700"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  <AlertCircle className="w-5 h-5" />
                  {replyStatus.message}
                </div>
              )}

              <textarea
                className={`w-full h-40 p-4 border rounded-lg transition-all duration-200 resize-none ${
                  sending
                    ? "bg-gray-50 cursor-not-allowed"
                    : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }`}
                placeholder="Type your reply here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                disabled={sending}
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={sending}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={sending}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Reply
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerQuery;
