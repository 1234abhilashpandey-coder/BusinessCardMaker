import React from "react";

const FIELD_GROUPS = [
  {
    legend: "01 — The business",
    fields: [
      { name: "businessName", label: "Business name", placeholder: "Northwind Trading Co.", type: "text", required: true },
      { name: "domain", label: "Domain", placeholder: "northwindtrading.com", type: "text", required: true },
    ],
  },
  {
    legend: "02 — The distributor",
    fields: [
      { name: "distributorName", label: "Full name", placeholder: "Amara Okafor", type: "text", required: true },
      { name: "position", label: "Position", placeholder: "Regional Distribution Lead", type: "text", required: true },
      { name: "email", label: "Email", placeholder: "amara@northwindtrading.com", type: "email", required: false },
      { name: "phone", label: "Phone", placeholder: "+1 (555) 012-4487", type: "tel", required: false },
    ],
  },
];

export default function BusinessForm({ values, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...values, [name]: value });
  };

  return (
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      {FIELD_GROUPS.map((group) => (
        <fieldset key={group.legend} className="space-y-4">
          <legend className="font-mono text-[11px] tracking-[0.2em] uppercase text-brass-400 mb-3">
            {group.legend}
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {group.fields.map((field) => (
              <label
                key={field.name}
                className={`flex flex-col gap-1.5 ${field.name === "businessName" || field.name === "domain" ? "sm:col-span-1" : ""}`}
              >
                <span className="text-xs font-medium text-paper-200/70">
                  {field.label}
                  {field.required && <span className="text-brass-500"> *</span>}
                </span>
                <input
                  type={field.type}
                  name={field.name}
                  value={values[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="bg-ink-800 border border-ink-600 rounded-md px-3 py-2 text-sm text-paper-100 placeholder:text-paper-100/25 transition-colors focus:border-brass-500"
                  autoComplete="off"
                />
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </form>
  );
}
