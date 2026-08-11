import React, { forwardRef } from "react";

function getInitials(name) {
  if (!name) return "•";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "•";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function cleanDomain(domain) {
  if (!domain) return "yourdomain.com";
  return domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * The card itself — a letterpress "ledger" card, 3.5:2 business-card ratio.
 * Forwarded ref is what html-to-image snapshots for the PNG download.
 */
const BusinessCard = forwardRef(function BusinessCard(
  { businessName, domain, distributorName, position, email, phone },
  ref
) {
  const initials = getInitials(businessName);
  const hasContact = email || phone;

  return (
    <div
      ref={ref}
      id="printable-card"
      className="relative w-[400px] h-[229px] rounded-[6px] bg-paper-100 bg-ledger-lines shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_18px_40px_-12px_rgba(0,0,0,0.55)] overflow-hidden select-none"
    >
      {/* brass frame */}
      <div className="absolute inset-[10px] border border-brass-500/70 rounded-[3px] pointer-events-none" />
      {/* corner ticks — the signature ledger-stamp mark */}
      {[
        "top-2 left-2 border-t border-l",
        "top-2 right-2 border-t border-r",
        "bottom-2 left-2 border-b border-l",
        "bottom-2 right-2 border-b border-r",
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} w-3 h-3 border-brass-600/80`}
        />
      ))}

      <div className="relative h-full flex flex-col justify-between px-8 py-6">
        {/* header: monogram + business identity */}
        <div className="flex items-start justify-between">
          <div className="pr-4 min-w-0">
            <h1 className="font-display text-[26px] leading-[1.05] text-ink-900 truncate">
              {businessName || "Your Business Name"}
            </h1>
            <p className="mt-1 font-mono text-[10px] tracking-[0.18em] uppercase text-forest-700/80 truncate">
              {cleanDomain(domain)}
            </p>
          </div>
          <div className="shrink-0 w-11 h-11 rounded-full border border-brass-500 flex items-center justify-center">
            <span className="font-display text-sm text-brass-600">{initials}</span>
          </div>
        </div>

        {/* rule */}
        <div className="h-px bg-brass-500/40 w-full my-1" />

        {/* footer: distributor */}
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="font-sans font-semibold text-[14px] text-ink-900 truncate">
              {distributorName || "Distributor Name"}
            </p>
            <p className="font-display italic text-[12px] text-forest-700 truncate">
              {position || "Position"}
            </p>
          </div>
          {hasContact && (
            <div className="text-right shrink-0 font-mono text-[9.5px] leading-[1.5] text-ink-700/80">
              {email && <p className="truncate max-w-[160px]">{email}</p>}
              {phone && <p className="truncate max-w-[160px]">{phone}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default BusinessCard;
