import React from "react";

function FieldInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  action,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  action?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-xs font-semibold font-body text-brand-dark">
          {label}
        </label>
        {action}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-300 font-body rounded-[10px] text-brand-dark ${error ? "border-[#FCA5A5] bg-[#FFF5F5]" : "border-brand-border bg-brand-white"}`}
      />
      {error && (
        <p className="text-xs mt-1 font-body text-[#EF4444]">{error}</p>
      )}
    </div>
  );
}

export default FieldInput;
