import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Mail,
  Phone,
  User,
  Eye,
  X,
  MessageSquare,
  CalendarDays,
  RefreshCw,
  Inbox,
} from "lucide-react";

import { getEnquiries } from "../services/enquiryService.js";

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  // Fetch Enquiries
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEnquiries();
      setEnquiries(data || []);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      setError(err.response?.data?.message || "Unable to fetch enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Search functionality
  const filteredEnquiries = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return enquiries;

    return enquiries.filter((enquiry) =>
      [enquiry.name, enquiry.email, enquiry.phoneNo, enquiry.message].some(
        (value) =>
          String(value || "")
            .toLowerCase()
            .includes(query),
      ),
    );
  }, [enquiries, search]);

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitial = (name) => {
    return name?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#30231D]">
            Enquiries
          </h1>

          <p className="text-[#927B69] mt-1">
            Manage and respond to customer enquiries.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-[#E8E0D5] rounded-xl text-[#795334] font-medium hover:bg-[#F5F0E9] transition disabled:opacity-50"
        >
          <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-[#E8E0D5] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#927B69]">Total Enquiries</p>

              <h2 className="text-3xl font-bold text-[#30231D] mt-2">
                {enquiries.length}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-[#F5EBDD] flex items-center justify-center">
              <MessageSquare size={23} className="text-[#795334]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E0D5] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#927B69]">Showing Results</p>

              <h2 className="text-3xl font-bold text-[#30231D] mt-2">
                {filteredEnquiries.length}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-[#F5EBDD] flex items-center justify-center">
              <Inbox size={23} className="text-[#795334]" />
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Collection */}
      <div className="bg-white rounded-2xl border border-[#E8E0D5] shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="p-5 md:p-6 border-b border-[#EEE7DF]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#30231D]">
                Customer Enquiries
              </h2>

              <p className="text-sm text-[#927B69] mt-1">
                View and manage customer messages.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#987B61]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search enquiries..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8E0D5] bg-[#FAF9F6] outline-none focus:border-[#987044] transition text-sm"
              />
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <RefreshCw size={24} className="animate-spin text-[#795334]" />
            <span className="ml-3 text-[#927B69]">Loading enquiries...</span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>

            <button
              onClick={fetchEnquiries}
              className="px-5 py-2 bg-[#795334] text-white rounded-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredEnquiries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-16 h-16 bg-[#F5EBDD] rounded-full flex items-center justify-center mb-4">
              <Inbox size={30} className="text-[#987044]" />
            </div>

            <h3 className="text-lg font-semibold text-[#30231D]">
              {search ? "No matching enquiries" : "No enquiries yet"}
            </h3>

            <p className="text-sm text-[#927B69] mt-2 text-center">
              {search
                ? "Try searching with another keyword."
                : "Customer enquiries will appear here."}
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && filteredEnquiries.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-212.5">
              <thead>
                <tr className="bg-[#F7F3ED] text-left text-xs uppercase tracking-wide text-[#927B69]">
                  <th className="px-6 py-4 font-semibold">Customer</th>

                  <th className="px-6 py-4 font-semibold">Contact Details</th>

                  <th className="px-6 py-4 font-semibold">Message</th>

                  <th className="px-6 py-4 font-semibold">Submitted On</th>

                  <th className="px-6 py-4 font-semibold text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#EEE7DF]">
                {filteredEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry._id}
                    className="hover:bg-[#FCFAF7] transition"
                  >
                    {/* Customer */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-[#F1E3D1] text-[#795334] flex items-center justify-center font-bold">
                          {getInitial(enquiry.name)}
                        </div>

                        <div>
                          <p className="font-semibold text-[#35251C]">
                            {enquiry.name}
                          </p>

                          {/* <p className="text-xs text-[#987B61] mt-1">
                            ID: {enquiry._id?.slice(-6).toUpperCase()}
                          </p> */}
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-[#59483A]">
                          <Mail size={15} className="text-[#987B61]" />
                          {enquiry.email}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-[#59483A]">
                          <Phone size={15} className="text-[#987B61]" />
                          {enquiry.phoneNo}
                        </div>
                      </div>
                    </td>

                    {/* Message */}
                    <td className="px-6 py-5">
                      <p className="text-sm text-[#806E60] max-w-55 truncate">
                        {enquiry.message}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-[#59483A]">
                        <CalendarDays size={16} className="text-[#987B61]" />

                        <div>
                          <p>{formatDate(enquiry.createdAt)}</p>

                          <p className="text-xs text-[#987B61] mt-1">
                            {formatTime(enquiry.createdAt)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <button
                          onClick={() => setSelectedEnquiry(enquiry)}
                          title="View enquiry"
                          aria-label={`View enquiry from ${enquiry.name}`}
                          className="w-11 h-11 flex items-center justify-center rounded-xl border border-[#E8E0D5] text-[#795334] hover:bg-[#F5EBDD] transition"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        {!loading && !error && filteredEnquiries.length > 0 && (
          <div className="px-6 py-4 border-t border-[#EEE7DF] text-sm text-[#927B69]">
            Showing {filteredEnquiries.length} of {enquiries.length} enquiries
          </div>
        )}
      </div>

      {/* Enquiry Details Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#EEE7DF]">
              <div>
                <h2 className="text-xl font-bold text-[#30231D]">
                  Enquiry Details
                </h2>

                <p className="text-sm text-[#927B69] mt-1">
                  Customer enquiry information
                </p>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-lg hover:bg-[#F5F0E9] text-[#795334]"
                aria-label="Close enquiry details"
              >
                <X size={21} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#F1E3D1] flex items-center justify-center text-xl font-bold text-[#795334]">
                  {getInitial(selectedEnquiry.name)}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#30231D]">
                    {selectedEnquiry.name}
                  </h3>

                  <p className="text-sm text-[#987B61]">Customer</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FAF8F4] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-[#987B61] text-sm mb-2">
                    <Mail size={16} />
                    Email
                  </div>

                  <p className="text-sm font-semibold text-[#35251C] break-all">
                    {selectedEnquiry.email}
                  </p>
                </div>

                <div className="bg-[#FAF8F4] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-[#987B61] text-sm mb-2">
                    <Phone size={16} />
                    Phone Number
                  </div>

                  <p className="text-sm font-semibold text-[#35251C]">
                    {selectedEnquiry.phoneNo}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[#987B61] text-sm mb-2">
                  <MessageSquare size={16} />
                  Customer Message
                </div>

                <div className="bg-[#FAF8F4] rounded-xl p-4 min-h-27.5">
                  <p className="text-sm text-[#59483A] leading-7 whitespace-pre-wrap wrap-break-word">
                    {selectedEnquiry.message || "No message provided."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#927B69]">
                <CalendarDays size={16} />
                Submitted on: {formatDate(selectedEnquiry.createdAt)} at{" "}
                {formatTime(selectedEnquiry.createdAt)}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-5 border-t border-[#EEE7DF]">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-6 py-3 bg-[#795334] text-white rounded-xl font-semibold hover:bg-[#634329] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquiries;
