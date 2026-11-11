"use client";

import { createContext, useContext, useState } from "react";
import type { InquiryType } from "@/lib/audience";

/** Cross-section UI state: booking modal, selected project drawer, preferred inquiry type. */
interface UIState {
  bookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
  activeProject: string | null;
  openProject: (slug: string) => void;
  closeProject: () => void;
  inquiry: InquiryType | null;
  setInquiry: (i: InquiryType) => void;
}

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [inquiry, setInquiry] = useState<InquiryType | null>(null);

  return (
    <UIContext.Provider
      value={{
        bookingOpen,
        openBooking: () => setBookingOpen(true),
        closeBooking: () => setBookingOpen(false),
        activeProject,
        openProject: setActiveProject,
        closeProject: () => setActiveProject(null),
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
