import React, { useRef, useState, useCallback } from "react";
import { toPng } from "html-to-image";
import BusinessForm from "./components/BusinessForm";
import BusinessCard from "./components/BusinessCard";

const EMPTY = {
  businessName: "",
  domain: "",
  distributorName: "",
  position: "",
  email: "",
  phone: "",
};

export default function App() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | working | done
  const cardRef = useRef(null);

  const isReady =
    values.businessName.trim() &&
    values.domain.trim() &&
    values.distributorName.trim() &&
    values.position.trim();

  const handleDownload = useCallback(async () => {
    if (!cardRef.current || !isReady) return;
    setStatus("working");
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });
      const link = document.createElement("a");
      const slug =
        values.businessName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
        "business-card";
      link.download = `${slug}-card.png`;
      link.href = dataUrl;
      link.click();
      setStatus("done");
      setTimeout(() => setStatus("idle"), 1800);
    } catch (err) {
      console.error("Card export failed:", err);
      setStatus("idle");
    }
  }, [isReady, values.businessName]);

  return (
    <div className="min-h-screen bg-ink-900 text-paper-100">
      <header className="border-b border-ink-700">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-brass-400">
              E-Business Card Maker
            </p>
            <h1 className="font-display text-2xl mt-0.5">Ledger</h1>
          </div>
          <p className="hidden sm:block max-w-xs text-right text-xs text-paper-100/50">
            Fill in the details, watch the card typeset itself, download it as a PNG.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
        <section>
          <h2 className="font-display text-lg mb-6 text-paper-100/90">Card details</h2>
          <BusinessForm values={values} onChange={setValues} />
        </section>

        <section className="lg:sticky lg:top-10 flex flex-col items-center gap-6">
          <h2 className="font-display text-lg self-start lg:self-center text-paper-100/90">
            Live preview
          </h2>
          <BusinessCard ref={cardRef} {...values} />

          <button
            type="button"
            onClick={handleDownload}
            disabled={!isReady || status === "working"}
            className="w-[400px] font-mono text-[11px] tracking-[0.18em] uppercase py-3 rounded-md border border-brass-500 text-brass-400 transition-colors enabled:hover:bg-brass-500 enabled:hover:text-ink-900 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {status === "working"
              ? "Rendering…"
              : status === "done"
              ? "Downloaded ✓"
              : "Download card as PNG"}
          </button>
          {!isReady && (
            <p className="text-[11px] text-paper-100/40 -mt-3 text-center max-w-[400px]">
              Business name, domain, distributor name, and position are required before the
              card can be exported.
            </p>
          )}
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-6 pb-10">
        <p className="text-[11px] text-paper-100/30">
          Built with React &amp; Tailwind CSS · inspired by{" "}
          <a
            href="https://github.com/kaydo1506/Business-Card-Creator"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted hover:text-brass-400"
          >
            kaydo1506/Business-Card-Creator
          </a>
        </p>
      </footer>
    </div>
  );
}
