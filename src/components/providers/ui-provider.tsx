"use client";

import { createContext, useContext, useState } from "react";
import type { InquiryType } from "@/lib/audience";
import { profile } from "@/data/profile";

/** Cross-section UI state: booking modal and preferred inquiry type. */
interface UIState {
  bookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
  inquiry: InquiryType | null;
  setInquiry: (i: InquiryType) => void;
}

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [inquiry, setInquiry] = useState<InquiryType | null>(null);

  return (
    <UIContext.Provider
      value={{
        bookingOpen,
        openBooking: () => {
          if (profile.bookingUrl) return setBookingOpen(true);
          // No calendar configured: take people to the contact section instead.
          const el = document.getElementById("contact");
          if (el) el.scrollIntoView({ behavior: "smooth" });
          else window.location.href = "/#contact";
        },
        closeBooking: () => setBookingOpen(false),
        inquiry,
        setInquiry,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
