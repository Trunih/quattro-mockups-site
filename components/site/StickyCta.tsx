"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Sticky "talk to our team" bar. Appears once the hero has scrolled away and
 * hides again as the contact section comes into view, so it never competes
 * with the form it points at.
 */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector("section");
      const contact = document.getElementById("contact");
      if (!hero || !contact) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      const contactTop = contact.getBoundingClientRect().top;
      setShow(heroBottom < 0 && contactTop > window.innerHeight * 0.5);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div id="sticky-cta" className={show ? "show" : ""}>
      <span className="msg">Ready to talk about coverage?</span>
      <Link className="btn btn-violet" href="/#contact">
        Talk to our team
      </Link>
    </div>
  );
}
