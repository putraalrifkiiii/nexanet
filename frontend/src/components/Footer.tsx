import { Link } from "react-router-dom";
import { FOOTER_DATA } from "@/constants/footer";
import LogoBrand from "./ui/LogoBrand";

const Footer = () => {
  return (
    <>
      <footer className="bg-brand-dark">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pb-12 border-b border-brand-border-dark">
            <div className="max-w-xs">
              <LogoBrand textColor="text-brand-white" to="/" />
              <p className="text-sm leading-relaxed font-body text-[rgba(255,255,255,0.35)] ">
                Fiber optik untuk seluruh Indonesia. Terpercaya sejak 2015.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
              {FOOTER_DATA.map((col) => (
                <div key={col.label}>
                  <div className="uppercase tracking-widest mb-4 font-mono text-[rgba(255,255,255,0.2)] text-xs">
                    {col.label}
                  </div>
                  <div className="space-y-2.5">
                    {col.links.map(([text, path]) =>
                      path ? (
                        <Link
                          key={text}
                          to={path}
                          className="block text-sm hover:text-white transition-colors text-left font-body text-[rgba(255,255,255,0.4)]"
                        >
                          {text}
                        </Link>
                      ) : (
                        <div
                          key={text}
                          className="text-sm text-[rgba(255,255,255,0.35)] font-body"
                        >
                          {text}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="font-mono text-[rgba(255,255,255,0.2)] text-xs">
              © 2026 PT NexaNet Indonesia. Semua hak dilindungi.
            </p>
            <p className="font-mono text-[rgba(255,255,255,0.15)] text-xs">
              Uptime 99.9% · Jakarta · Surabaya · Bandung · +47 kota
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
