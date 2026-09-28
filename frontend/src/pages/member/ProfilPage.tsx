import { useState } from "react";
import MemberLayout from "@/components/MemberLayout";

const ProfilPage = () => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    nama: "Budi Santoso",
    alamat: "Jl. Merdeka No. 10, Jakarta Pusat",
    telepon: "081234567890",
    email: "budi.santoso@email.com",
  });
  const [saved, setSaved] = useState(false);

  return (
    <MemberLayout>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="uppercase tracking-widest mb-3 font-mono text-brand-muted text-[10px]">
          Akun
        </div>
        <h1 className="text-2xl font-black mb-10 font-display text-brand-dark">
          Profil Saya
        </h1>
        <div className="p-6 bg-brand-white border border-brand-border rounded-[14px]">
          <div className="flex items-center gap-4 mb-8">
            <div
              style={{
                borderRadius: "50%",
              }}
              className="w-13 h-13 rounded-full bg-brand-dark flex items-center justify-center"
            >
              <span className="font-black text-lg font-display text-brand-white">
                B
              </span>
            </div>
            <div>
              <div className="font-bold text-base font-display text-brand-dark">
                {form.nama}
              </div>
              <div className="font-mono text-brand-muted text-[11px]">
                NXN-2025-08741
              </div>
            </div>
          </div>
          {saved && (
            <div className="text-xs p-3 mb-6 text-[#059669] font-body rounded-[10px] bg-[#ECFDF5] border border-[#A7F3D0]">
              Profil berhasil disimpan.
            </div>
          )}
          {[
            ["nama", "Nama Lengkap"],
            ["alamat", "Alamat"],
            ["telepon", "No. Telepon"],
            ["email", "Email"],
          ].map(([key, label]) => (
            <div
              key={key}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b-brand-border last:border-b-0"
            >
              <span className="uppercase tracking-widest shrink-0 w-32 font-mono text-brand-muted text-[10px]">
                {label}
              </span>
              {editing ? (
                <input
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-body border border-brand-border rounded-lg text-brand-dark"
                />
              ) : (
                <span className="text-sm font-body text-brand-dark">
                  {form[key as keyof typeof form]}
                </span>
              )}
            </div>
          ))}
          <div className="flex gap-3 mt-6">
            {editing ? (
              <>
                <button
                  onClick={() => {
                    setEditing(false);
                    setSaved(true);
                    setTimeout(() => setSaved(false), 2000);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold hover:opacity-90 transition-opacity font-body bg-brand-dark text-brand-white rounded-lg"
                >
                  Simpan Perubahan
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-5 py-2.5 text-xs font-medium hover:bg-gray-50 transition-colors font-body border border-brand-border text-brand-dark rounded-lg"
                >
                  Batal
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-5 py-2.5 text-xs font-medium hover:bg-gray-50 transition-colors font-body border border-brand-border text-brand-dark rounded-lg"
              >
                Edit Profil
              </button>
            )}
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfilPage;
