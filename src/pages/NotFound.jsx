import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Package,
  Search,
  Sparkles,
} from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#FBFAF7] px-4 py-12 sm:px-6 lg:px-8">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#D6B77A]/10 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#704A2D]/10 blur-3xl sm:h-96 sm:w-96" />

        <div className="absolute left-[10%] top-[18%] hidden animate-pulse text-[#C6A56B]/40 sm:block">
          <Sparkles size={25} />
        </div>

        <div className="absolute bottom-[20%] right-[12%] hidden animate-bounce text-[#C6A56B]/40 sm:block">
          <Sparkles size={20} />
        </div>

        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#704A2D_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        {/* 404 */}
        <div className="relative inline-block">
          <h1 className="select-none bg-gradient-to-br from-[#4A3020] via-[#704A2D] to-[#B58B50] bg-clip-text text-[clamp(7rem,24vw,13rem)] font-black leading-[0.85] tracking-[-0.09em] text-transparent">
            404
          </h1>

          <span className="absolute -right-3 -top-3 flex h-8 w-8 animate-bounce items-center justify-center rounded-full bg-[#E9D9B9] text-[#704A2D] shadow-sm sm:-right-5 sm:-top-4 sm:h-11 sm:w-11">
            <Sparkles size={19} />
          </span>
        </div>

        {/* Message */}
        <div className="mx-auto mt-8 max-w-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E8DCC8] bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6D3B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B58B50]" />
            Lost in the collection
          </span>

          <h2 className="mt-5 text-2xl font-bold tracking-tight text-[#2B2520] sm:text-3xl md:text-4xl">
            Oops! This page is missing.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#81756A] sm:text-base">
            It looks like this page has wandered away from our collection. The
            link may be incorrect, or the page may have been moved. Let's get
            you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#704A2D] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#704A2D]/15 transition duration-300 hover:-translate-y-1 hover:bg-[#573820] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#704A2D]/20"
          >
            <Home size={18} />
            Back to Dashboard
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mx-auto mt-12 max-w-md border-t border-[#E9E1D5] pt-7">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-[#A39788]">
            Or explore your workspace
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#655548] transition hover:bg-white hover:text-[#704A2D]"
            >
              <Package
                size={17}
                className="text-[#A88651] transition-transform group-hover:-translate-y-0.5"
              />
              Products
            </Link>

            <span className="h-1 w-1 rounded-full bg-[#D4C5B1]" />

            <Link
              to="/enquiries"
              className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#655548] transition hover:bg-white hover:text-[#704A2D]"
            >
              <ArrowRight
                size={16}
                className="text-[#A88651] transition-transform group-hover:translate-x-1"
              />
              Enquiries
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-[#AA9E90]">
          Heritage Admin <span className="mx-1.5">·</span> Store Management
        </p>
      </div>
    </div>
  );
};

export default NotFound;
