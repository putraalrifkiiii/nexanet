import AuthShell from "@/components/AuthShell";
import FieldInput from "@/components/ui/FieldInput";
import { useState } from "react";

const LoginPage = ({
  setPage,
  setLoggedIn,
}: {
  setPage: (p: Page) => void;
  setLoggedIn: (v: boolean) => void;
}) => {
  const [email, setEmail] = useState(""),
    [pass, setPass] = useState(""),
    [err, setErr] = useState("");

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
            setLoggedIn(true);
            setPage("dashboard");
          }}
          className="space-y-4"
        >
          {err && (
            <div className="text-xs p-3 font-body text-[#EF4444] bg-[#FFF5F5] border-[#FCA5A5] rounded-[10px]">
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
            onClick={() => setPage("daftar")}
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
