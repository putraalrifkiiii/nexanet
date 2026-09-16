import AuthShell from "@/components/AuthShell";
import FieldInput from "@/components/ui/FieldInput";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <AuthShell title="Login" sub="Masuk ke akun Anda">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email || !pass) {
              setErr("Email dan password wajib diisi.");
              return;
            }
            login();
            navigate("/dashboard");
          }}
          className="space-y-4"
        >
          {err && (
            <div className="text-xs p-3 font-body text-brand-d bg-[#FFF5F5] border-[#FCA5A5] rounded-[10px]">
              {err}
            </div>
          )}
          <FieldInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="nama@email.com"
          />
          <FieldInput
            label="Password"
            type="password"
            value={pass}
            onChange={setPass}
            placeholder="••••••••"
            action={
              <button
                type="button"
                className="text-xs hover:underline font-body text-brand-blue"
              >
                Lupa password?
              </button>
            }
          />
          <button
            type="submit"
            className="w-full py-3.5 font-semibold text-sm hover:opacity-90 transition-opacity mt-2 font-display bg-brand-dark text-brand-white rounded-[10px]"
          >
            Masuk
          </button>
        </form>
        <p className="text-xs text-center mt-8 font-body text-brand-muted">
          Belum punya akun?{" "}
          <button
            onClick={() => navigate("/daftar")}
            className="font-semibold hover:underline text-brand-blue"
          >
            Daftar sekarang
          </button>
        </p>
      </AuthShell>
    </div>
  );
};

export default LoginPage;
