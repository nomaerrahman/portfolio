"use client";

import { Download, ExternalLink } from "lucide-react";
import { Modal } from "@/components/ui/modal";

/** In-page PDF reader with open and download actions. */
export function PdfModal({ doc, onClose }: { doc: { title: string; pdfUrl?: string } | null; onClose: () => void }) {
  return (
    <Modal open={!!doc?.pdfUrl} onClose={onClose} label={doc?.title ?? "PDF preview"} className="max-w-5xl">
      {doc?.pdfUrl && (
        <div className="flex h-[82vh] flex-col">
          <div className="flex items-center gap-3 border-b border-border p-4 pr-16">
            <p className="line-clamp-1 flex-1 text-sm font-medium">{doc.title}</p>
            <a href={doc.pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-muted hover:text-fg">
              <ExternalLink size={13} /> Open
            </a>
            <a href={doc.pdfUrl} download className="flex items-center gap-1 text-xs text-muted hover:text-fg">
              <Download size={13} /> Download
            </a>
          </div>
          <iframe src={`${doc.pdfUrl}#view=FitH`} title={doc.title} className="w-full flex-1 bg-white" />
        </div>
      )}
    </Modal>
  );
}
