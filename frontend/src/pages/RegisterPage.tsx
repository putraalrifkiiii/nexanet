import AuthShell from "@/components/AuthShell";
import FieldInput from "@/components/ui/FieldInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    telepon: "",
    email: "",
    password: "",
    konfirmasi: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nama) e.nama = "Wajib diisi";
    if (!form.alamat) e.alamat = "Wajib diisi";
    if (!form.telepon) e.telepon = "Wajib diisi";
    if (!form.email) e.email = "Wajib diisi";
    if (!form.password || form.password.length < 8)
      e.password = "Minimal 8 karakter";
    if (form.password !== form.konfirmasi)
      e.konfirmasi = "Password tidak cocok";
    return e;
  };
  return (
    <AuthShell
      title="Buat akun baru."
      sub="Bergabung dengan 50.000+ pelanggan NexaNet."
    >
      {done ? (
        <div className="text-center py-8">
          <div className="text-xl font-black mb-2 font-display text-brand-dark">
            Akun berhasil dibuat!
          </div>
          <p className="text-sm font-body text-brand-muted">
            Mengalihkan ke dashboard...
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const errs = validate();
            if (Object.keys(errs).length > 0) {
              setErrors(errs);
              return;
            }
            setDone(true);
            setTimeout(() => {
              register();
              navigate("/dashboard");
            }, 1200);
          }}
          className="space-y-4"
        >
          {[
            ["nama", "Nama Lengkap", "text", "Budi Santoso"],
            ["alamat", "Alamat", "text", "Jl. Merdeka No. 10, Jakarta"],
            ["telepon", "No. Telepon", "tel", "08xxxxxxxxxx"],
            ["email", "Email", "email", "nama@email.com"],
            ["password", "Password", "password", "Min. 8 karakter"],
            [
              "konfirmasi",
              "Konfirmasi Password",
              "password",
              "Ulangi password",
            ],
          ].map(([key, label, type, ph]) => (
            <FieldInput
              key={key}
              label={label}
              type={type}
              value={form[key as keyof typeof form]}
              onChange={(v) => setForm({ ...form, [key]: v })}
              placeholder={ph}
              error={errors[key]}
            />
          ))}
          <button
            type="submit"
            className="w-full py-3.5 font-semibold text-sm hover:opacity-90 transition-opacity font-display bg-brand-dark text-brand-white rounded-[10px]"
          >
            Buat Akun
          </button>
        </form>
      )}
      {!done && (
        <p className="text-xs text-center mt-8 font-body text-brand-muted">
          Sudah punya akun?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold hover:underline text-brand-blue"
          >
            Masuk
          </button>
        </p>
      )}
    </AuthShell>
  );
};

export default RegisterPage;
