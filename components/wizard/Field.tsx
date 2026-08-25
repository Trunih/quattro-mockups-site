"use client";

type Base = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
};

function Wrap({
  id,
  label,
  hint,
  error,
  required,
  children,
}: Base & { children: React.ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required && (
          <span style={{ color: "var(--violet-text)", marginLeft: 4 }} aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field-error" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  ...base
}: Base & {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <Wrap {...base}>
      <input
        id={base.id}
        type={type}
        value={value}
        placeholder={placeholder}
        aria-invalid={base.error ? "true" : undefined}
        aria-describedby={base.error ? `${base.id}-err` : base.hint ? `${base.id}-hint` : undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    </Wrap>
  );
}

export function SelectField({
  value,
  onChange,
  onBlur,
  options,
  placeholder = "Select one",
  ...base
}: Base & {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  options: readonly string[];
  placeholder?: string;
}) {
  return (
    <Wrap {...base}>
      <select
        id={base.id}
        value={value}
        aria-invalid={base.error ? "true" : undefined}
        aria-describedby={base.error ? `${base.id}-err` : base.hint ? `${base.id}-hint` : undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrap>
  );
}

export function TextAreaField({
  value,
  onChange,
  rows = 3,
  placeholder,
  ...base
}: Base & {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <Wrap {...base}>
      <textarea
        id={base.id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Wrap>
  );
}

/** Revealed follow-up block, shown when a parent answer calls for it. */
export function Conditional({ show, children }: { show: boolean; children: React.ReactNode }) {
  if (!show) return null;
  return <div className="wiz-conditional">{children}</div>;
}

export function CheckCard({
  checked,
  onToggle,
  title,
  sub,
  id,
}: {
  checked: boolean;
  onToggle: () => void;
  title: string;
  sub?: string;
  id: string;
}) {
  return (
    <label className={`choice${checked ? " is-on" : ""}`} htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} onChange={onToggle} />
      <span>
        <span className="choice-title">{title}</span>
        {sub && <span className="choice-sub">{sub}</span>}
      </span>
    </label>
  );
}
