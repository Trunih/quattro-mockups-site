import Link from "next/link";
import { LensMark } from "@/components/site/Lens";
import { signOut } from "@/app/login/actions";

type Props = {
  role: "client" | "capacity_provider";
  email: string;
  children: React.ReactNode;
  headerExtra?: React.ReactNode;
};

export function PortalShell({ role, email, children, headerExtra }: Props) {
  return (
    <div className="portal-shell">
      <header className="portal-nav">
        <div className="wrap-wide portal-nav-inner">
          <Link href="/" className="wordmark" style={{ fontSize: 17 }} aria-label="Quattro home">
            <LensMark size={16} />
            <span>Quattro</span>
          </Link>

          <span className="role-badge">
            {role === "client" ? "Client view" : "Capacity Provider view"}
          </span>

          {headerExtra}

          <div className="portal-spacer" />

          <div className="portal-who">
            <div className="n">{email}</div>
          </div>

          <form action={signOut}>
            <button type="submit" className="logout-btn">
              Log out
            </button>
          </form>
        </div>
      </header>

      <main className="portal-main">
        <div className="wrap-wide">{children}</div>
      </main>

      <footer className="portal-foot">
        <div className="wrap-wide">
          <p>
            Facility-level data shown here is illustrative and simulated for this prototype; it does
            not reflect a real book of business.
          </p>
        </div>
      </footer>
    </div>
  );
}
