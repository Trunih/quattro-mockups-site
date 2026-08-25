"use client";

import { useState } from "react";
import { FAQ } from "@/lib/content";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {FAQ.items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className={`faq-item${isOpen ? " open" : ""}`}>
            <button
              className="faq-q"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className="faq-toggle" aria-hidden="true">
                +
              </span>
            </button>
            <div className="faq-a" id={`faq-panel-${i}`} role="region">
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
