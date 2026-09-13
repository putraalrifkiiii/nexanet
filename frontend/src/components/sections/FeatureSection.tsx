import React from "react";
import { FEATURE_ITEMS } from "@/constants/featureData";

const FeatureSection = () => {
  return (
    <>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid  lg:grid-cols-5 gap-8 lg:gap-16">
            <div className="lg:col-span-2">
              <div className="uppercase tracking-widest mb-4 text-[11px] font-mono text-brand-muted">
                Kenapa NexaNet
              </div>
              <h2 className="text-3xl sm:text-4xl leading-tight font-black font-display text-brand-dark">
                Dibangun untuk
                <br />
                keandalan.
              </h2>
            </div>
            <div className="lg:col-span-3 lg:py-5">
              {FEATURE_ITEMS.map((b, index) => (
                <div
                  key={index}
                  className="flex gap-6 py-5 border-brand-border border-b last:border-none "
                >
                  <div className="pt-0.5 font-mono text-brand-muted text-[11px] min-w-[28px]">
                    {b.number}
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-1 font-display text-brand-dark">
                      {b.title}
                    </div>
                    <div className="text-sm leading-relaxed font-body text-brand-muted">
                      {b.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;
