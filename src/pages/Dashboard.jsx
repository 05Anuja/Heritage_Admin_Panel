import React, { useCallback, useEffect, useState } from "react";

import {
  Package,
  CheckCircle,
  XCircle,
  Star,
  MessageSquare,
  CalendarDays,
  RefreshCw,
  ArrowRight,
  Eye,
  Inbox,
  TrendingUp,
  Clock,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  getDashboardStats,
  getEnquiryAnalytics,
  getRecentActivities,
} from "../services/dashboardService.js";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);

  const [period, setPeriod] = useState("7days");
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch dashboard statistics and recent activities
  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [statsData, activitiesData] = await Promise.all([
        getDashboardStats(),
        getRecentActivities(),
      ]);

      setStats(statsData);
      setRecentProducts(activitiesData.recentProducts || []);
      setRecentEnquiries(activitiesData.recentEnquiries || []);
    } catch (err) {
      console.error("Dashboard Error:", err);

      setError(err.response?.data?.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch enquiry analytics whenever period changes
  const fetchAnalytics = useCallback(async () => {
    try {
      setAnalyticsLoading(true);

      const data = await getEnquiryAnalytics(period);

      setAnalytics(data || []);
    } catch (err) {
      console.error("Analytics Error:", err);
      setAnalytics([]);
    } finally {
      setAnalyticsLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format chart date
  const formatChartDate = (date) => {
    if (!date) return "";

    if (period === "12months") {
      const [year, month] = date.split("-");
      return new Date(Number(year), Number(month) - 1).toLocaleDateString(
        "en-IN",
        {
          month: "short",
          year: "2-digit",
        },
      );
    }

    return new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  const statCards = [
    {
      title: "Total Products",
      value: stats?.totalProducts ?? 0,
      icon: Package,
      color: "bg-[#F5EBDD]",
      iconColor: "text-[#795334]",
      description: "All listed products",
    },
    {
      title: "Active Products",
      value: stats?.activeProducts ?? 0,
      icon: CheckCircle,
      color: "bg-emerald-50",
      iconColor: "text-emerald-700",
      description: "Currently active",
    },
    {
      title: "Inactive Products",
      value: stats?.inactiveProducts ?? 0,
      icon: XCircle,
      color: "bg-red-50",
      iconColor: "text-red-600",
      description: "Currently inactive",
    },
    {
      title: "Featured Products",
      value: stats?.featuredProducts ?? 0,
      icon: Star,
      color: "bg-amber-50",
      iconColor: "text-amber-600",
      description: "Featured collection",
    },
    {
      title: "Total Enquiries",
      value: stats?.totalEnquiries ?? 0,
      icon: MessageSquare,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      description: "Customer submissions",
    },
    {
      title: "Today's Enquiries",
      value: stats?.todayEnquiries ?? 0,
      icon: CalendarDays,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
      description: "Received today",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#30231D]">
            Dashboard
          </h1>

          <p className="text-[#927B69] mt-1">
            Welcome back! Here's what's happening with Heritage Bharat.
          </p>
        </div>

        <button
          onClick={fetchDashboard}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-[#E8E0D5] rounded-xl text-[#795334] font-semibold hover:bg-[#F5F0E9] transition disabled:opacity-50"
        >
          <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6">
          {error}

          <button
            onClick={fetchDashboard}
            className="underline ml-2 font-semibold"
          >
            Try again
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white border border-[#E8E0D5] rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-[#927B69]">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold text-[#30231D] mt-3">
                    {loading ? "—" : card.value}
                  </h2>

                  <p className="text-xs text-[#A18D7A] mt-2">
                    {card.description}
                  </p>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}
                >
                  <Icon size={23} className={card.iconColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics */}
      <div className="bg-white border border-[#E8E0D5] rounded-2xl p-5 md:p-7 shadow-sm mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp size={21} className="text-[#795334]" />

              <h2 className="text-lg font-bold text-[#30231D]">
                Enquiry Analytics
              </h2>
            </div>

            <p className="text-sm text-[#927B69] mt-1">
              Track customer enquiries over time.
            </p>
          </div>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-[#E8E0D5] bg-[#FAF9F6] text-sm text-[#59483A] outline-none focus:border-[#987044]"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="12months">Last 12 Months</option>
          </select>
        </div>

        <div className="h-75 w-full">
          {analyticsLoading ? (
            <div className="h-full flex items-center justify-center text-[#927B69]">
              Loading analytics...
            </div>
          ) : analytics.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analytics}
                margin={{
                  top: 10,
                  right: 15,
                  left: -15,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#EEE7DF"
                />

                <XAxis
                  dataKey="date"
                  tickFormatter={formatChartDate}
                  tick={{ fill: "#927B69", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  minTickGap={period === "30days" ? 25 : 15}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "#927B69", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  labelFormatter={formatChartDate}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E8E0D5",
                    color: "#35251C",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="count"
                  name="Enquiries"
                  stroke="#987044"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#987044",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-[#927B69]">
              <Inbox size={35} className="mb-3 opacity-50" />
              <p>No enquiry analytics available.</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white border border-[#E8E0D5] rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-[#EEE7DF]">
            <div>
              <h2 className="text-lg font-bold text-[#30231D]">
                Recent Products
              </h2>

              <p className="text-sm text-[#927B69] mt-1">
                Latest products added to your store.
              </p>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-1 text-sm text-[#795334] font-semibold hover:gap-2 transition-all"
            >
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="divide-y divide-[#EEE7DF]">
            {loading ? (
              <p className="p-6 text-center text-[#927B69]">
                Loading products...
              </p>
            ) : recentProducts.length > 0 ? (
              recentProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-4 p-5 hover:bg-[#FCFAF7] transition"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#FAF8F4] overflow-hidden shrink-0 border border-[#EEE7DF]">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#987B61]">
                        <Package size={22} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#35251C] truncate">
                      {product.name}
                    </h3>

                    <p className="text-sm text-[#987B61] mt-1">
                      {product.category}
                    </p>

                    <p className="text-xs text-[#A18D7A] mt-1">
                      {formatDate(product.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full shrink-0 ${
                      product.active
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {product.active ? "Active" : "Inactive"}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-[#927B69]">
                <Package size={30} className="mx-auto mb-2 opacity-50" />
                No products found.
              </div>
            )}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white border border-[#E8E0D5] rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-[#EEE7DF]">
            <div>
              <h2 className="text-lg font-bold text-[#30231D]">
                Recent Enquiries
              </h2>

              <p className="text-sm text-[#927B69] mt-1">
                Latest customer messages.
              </p>
            </div>

            <button
              onClick={() => navigate("/enquiries")}
              className="flex items-center gap-1 text-sm text-[#795334] font-semibold hover:gap-2 transition-all"
            >
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="divide-y divide-[#EEE7DF]">
            {loading ? (
              <p className="p-6 text-center text-[#927B69]">
                Loading enquiries...
              </p>
            ) : recentEnquiries.length > 0 ? (
              recentEnquiries.map((enquiry) => (
                <div
                  key={enquiry._id}
                  className="flex items-start gap-4 p-5 hover:bg-[#FCFAF7] transition"
                >
                  <div className="w-11 h-11 rounded-full bg-[#F1E3D1] flex items-center justify-center text-[#795334] font-bold shrink-0">
                    {enquiry.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap justify-between gap-2">
                      <h3 className="font-semibold text-[#35251C]">
                        {enquiry.name}
                      </h3>

                      <span className="text-xs text-[#987B61]">
                        {formatDate(enquiry.createdAt)}
                      </span>
                    </div>

                    <p className="text-xs text-[#987B61] mt-1">
                      {enquiry.email}
                    </p>

                    <p className="text-sm text-[#806E60] mt-2 line-clamp-2">
                      {enquiry.message}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-[#927B69]">
                <MessageSquare size={30} className="mx-auto mb-2 opacity-50" />
                No enquiries found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
