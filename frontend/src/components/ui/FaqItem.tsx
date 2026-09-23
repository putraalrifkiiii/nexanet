import { useState } from "react";
import { faqs } from "@/constants/faqData";

interface FaqItemProps {
  title?: string;
  subtitle?: string;
}

const FaqItem = ({ title, subtitle }: FaqItemProps) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="uppercase tracking-widest mb-8 font-mono text-brand-muted text-[12px]">
        {title}
      </div>
      <div className="text-3xl font-bold mb-12 text-brand-dark font-display">
        {subtitle}
      </div>
      <div className="border-t border-brand-border">
        {faqs.map((f, i) => (
          <div key={i} className="border-b border-brand-border">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left "
            >
              <span className="font-semibold text-sm font-display text-brand-dark">
                {f.q}
              </span>
              <span className="font-mono text-brand-muted text-[20px] shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className="text-sm leading-relaxed pb-5 font-body text-brand-muted ">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqItem;
