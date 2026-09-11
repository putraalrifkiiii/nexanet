import React from "react";

function PaketDetail() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
        <button
          onClick={() => setPage("paket")}
          style={{ fontFamily: F.mono, color: C.muted, fontSize: 12 }}
          className="flex items-center gap-2 mb-12 hover:text-gray-700 transition-colors"
        >
          ← Semua paket
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div
                style={{ fontFamily: F.mono, color: C.muted, fontSize: 11 }}
                className="uppercase tracking-widest mb-3"
              >
                NexaNet {pkg.nama}
              </div>
              <div
                style={{ fontFamily: F.display, color: C.dark }}
                className="text-8xl font-black leading-none mb-1"
              >
                {pkg.mbps}
              </div>
              <div
                style={{ fontFamily: F.body, color: C.muted }}
                className="text-lg mb-6"
              >
                Mbps
              </div>
              <p
                style={{ fontFamily: F.body, color: C.muted }}
                className="text-sm leading-relaxed max-w-md"
              >
                {pkg.deskripsi}
              </p>
            </div>
            <div
              style={{
                borderTop: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
              }}
              className="py-8 flex gap-12"
            >
              <div>
                <div
                  style={{ fontFamily: F.mono, color: C.muted, fontSize: 10 }}
                  className="uppercase tracking-widest mb-1"
                >
                  Harga/bulan
                </div>
                <div
                  style={{ fontFamily: F.display, color: C.dark }}
                  className="text-2xl font-black"
                >
                  {idr(pkg.harga)}
                </div>
              </div>
              <div>
                <div
                  style={{ fontFamily: F.mono, color: C.muted, fontSize: 10 }}
                  className="uppercase tracking-widest mb-1"
                >
                  Biaya Pasang
                </div>
                <div
                  style={{
                    fontFamily: F.display,
                    color: pkg.pemasangan === 0 ? "#059669" : C.dark,
                  }}
                  className="text-2xl font-black"
                >
                  {pkg.pemasangan === 0 ? "Gratis" : idr(pkg.pemasangan)}
                </div>
              </div>
            </div>
            <div>
              <div
                style={{ fontFamily: F.mono, color: C.muted, fontSize: 10 }}
                className="uppercase tracking-widest mb-6"
              >
                Yang Termasuk
              </div>
              {pkg.fitur.map((f) => (
                <div
                  key={f}
                  style={{ borderBottom: `1px solid ${C.border}` }}
                  className="flex items-center justify-between py-4"
                >
                  <span
                    style={{ fontFamily: F.body, color: C.dark }}
                    className="text-sm"
                  >
                    {f}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#ECFDF5" />
                    <path
                      d="M5 8l2.5 2.5 4-4"
                      stroke="#059669"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ))}
            </div>
            <div
              style={{ background: C.offwhite, borderRadius: 14 }}
              className="p-6"
            >
              <div
                style={{ fontFamily: F.mono, color: C.muted, fontSize: 10 }}
                className="uppercase tracking-widest mb-4"
              >
                Syarat & Ketentuan
              </div>
              <ul
                style={{ fontFamily: F.body, color: C.muted }}
                className="text-xs leading-loose space-y-1"
              >
                <li>· Kontrak berlangganan bulanan, tanpa jangka minimum</li>
                <li>· Tagihan diterbitkan setiap awal bulan</li>
                <li>· Biaya pemasangan dibayarkan saat aktivasi</li>
                <li>
                  · Router adalah aset NexaNet, dikembalikan bila berhenti
                  berlangganan
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div
              style={{
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                position: "sticky",
                top: 88,
              }}
              className="p-6"
            >
              <div
                style={{ fontFamily: F.mono, color: C.muted, fontSize: 10 }}
                className="uppercase tracking-widest mb-5"
              >
                Ringkasan
              </div>
              <div className="space-y-2 mb-5">
                {[
                  ["Paket bulanan", idr(pkg.harga)],
                  [
                    "Biaya pasang",
                    pkg.pemasangan === 0 ? "Gratis" : idr(pkg.pemasangan),
                  ],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span
                      style={{ fontFamily: F.body, color: C.muted }}
                      className="text-xs"
                    >
                      {k}
                    </span>
                    <span
                      style={{ fontFamily: F.mono, color: C.dark }}
                      className="text-xs font-medium"
                    >
                      {v}
                    </span>
                  </div>
                ))}
                <div
                  style={{ borderTop: `1px solid ${C.border}` }}
                  className="flex justify-between pt-3 mt-1"
                >
                  <span
                    style={{ fontFamily: F.body, color: C.dark }}
                    className="text-xs font-semibold"
                  >
                    Total awal
                  </span>
                  <span
                    style={{ fontFamily: F.display, color: C.dark }}
                    className="font-black text-base"
                  >
                    {idr(pkg.harga + pkg.pemasangan)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setPage(loggedIn ? "langganan-form" : "login")}
                style={{
                  fontFamily: F.display,
                  background: C.blue,
                  color: C.white,
                  borderRadius: 12,
                }}
                className="w-full py-3.5 font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Berlangganan Sekarang
              </button>
              <p
                style={{ fontFamily: F.mono, color: C.muted, fontSize: 10 }}
                className="text-center mt-3"
              >
                Tanpa kontrak jangka panjang
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaketDetail;
