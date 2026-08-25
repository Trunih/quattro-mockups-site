import Link from "next/link";
import { STATUS_CLASS, STATUS_LABEL, type SubmissionStatus } from "@/lib/demo-data";

export function StatusPill({ status }: { status: SubmissionStatus }) {
  return <span className={`pill ${STATUS_CLASS[status]}`}>{STATUS_LABEL[status]}</span>;
}

export function SectionLabel({ children, count }: { children: React.ReactNode; count?: number }) {
  return (
    <h2 className="section-label">
      {children}
      {typeof count === "number" && <span className="count">{count}</span>}
    </h2>
  );
}

export function EmptyState({
  title,
  body,
  actionHref,
  actionLabel,
}: {
  title: string;
  body: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="empty">
      <h4>{title}</h4>
      <p>{body}</p>
      {actionHref && actionLabel && (
        <Link href={actionHref} className="btn btn-out btn-sm">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

/** Table wrapper that scrolls horizontally rather than breaking the layout. */
export function TableScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="panel">
      <div className="table-scroll">{children}</div>
    </div>
  );
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="back-link">
      <span aria-hidden="true">&larr;</span>
      {children}
    </Link>
  );
}
