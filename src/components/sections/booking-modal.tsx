"use client";

import { CalendarClock, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useUI } from "@/components/providers/ui-provider";
import { profile } from "@/data/profile";

/**
 * Cal.com / Calendly embed. Set NEXT_PUBLIC_BOOKING_URL in .env.local,
 * e.g. https://cal.com/your-handle/intro or https://calendly.com/your-handle/20min
 */
export function BookingModal() {
  const { bookingOpen, closeBooking } = useUI();
  const [loaded, setLoaded] = useState(false);
  const url = profile.bookingUrl;
  const embedUrl = url.includes("calendly.com")
    ? `${url}?hide_gdpr_banner=1&background_color=0a0a0b&text_color=f5f3ef&primary_color=ff6a3d`
    : `${url}${url.includes("?") ? "&" : "?"}embed=true&theme=dark`;

  return (
    <Modal open={bookingOpen} onClose={closeBooking} label="Book a call" className="max-w-4xl">
      <div className="flex h-[80vh] flex-col">
        <div className="flex items-center gap-3 border-b border-border p-5 pr-16">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
            <CalendarClock size={18} />
          </span>
          <div className="flex-1">
            <p className="font-semibold">Book a 20-minute call</p>
            <p className="text-xs text-muted">Roles, research collaborations or client projects. Pick a time that suits you.</p>
          </div>
          <a href={url} target="_blank" rel="noreferrer" className="hidden items-center gap-1 text-xs text-muted hover:text-fg sm:flex">
            Open in new tab <ExternalLink size={12} />
          </a>
        </div>
        <div className="relative flex-1">
          {!loaded && (
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
            </div>
          )}
          <iframe src={embedUrl} title="Booking calendar" className="h-full w-full" onLoad={() => setLoaded(true)} />
        </div>
      </div>
    </Modal>
  );
}
