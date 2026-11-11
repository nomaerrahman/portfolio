"use client";

import { Download, ExternalLink } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import type { ResearchItem } from "@/lib/types";

export function PdfModal({ item, onClose }: { item: ResearchItem | null; onClose: () => void }) {
  return (
    <Modal open={!!item?.pdfUrl} onClose={onClose} label={item?.title ?? "PDF preview"} className="max-w-5xl">
      {item?.pdfUrl && (
        <div className="flex h-[82vh] flex-col">
          <div className="flex items-center gap-3 border-b border-border p-4 pr-16">
            <p className="line-clamp-1 flex-1 text-sm font-medium">{item.title}</p>
            <a href={item.pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-muted hover:text-fg">
              <ExternalLink size={13} /> Open
            </a>
            <a href={item.pdfUrl} download className="flex items-center gap-1 text-xs text-muted hover:text-fg">
              <Download size={13} /> Download
            </a>
          </div>
          <iframe src={`${item.pdfUrl}#view=FitH`} title={item.title} className="w-full flex-1 bg-white" />
        </div>
      )}
    </Modal>
  );
}
