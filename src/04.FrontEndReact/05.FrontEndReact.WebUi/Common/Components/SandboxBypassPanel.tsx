import { useNavigate } from "react-router-dom";
import { applySandboxBypassSession, isSandboxAuthBypassEnabled } from "../Services/SandboxAuth";

export function SandboxBypassPanel({ context }: { context: "landing" | "external" }) {
  const navigate = useNavigate();
  if (!isSandboxAuthBypassEnabled()) return null;

  function enter() {
    applySandboxBypassSession();
    navigate("/", { replace: true });
  }

  return (
    <div className="w-full rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-left text-sm text-amber-950">
      <p className="font-medium">Masuk cepat (sandbox / template)</p>
      <p className="mt-1 text-[13px] leading-5 text-amber-900/80">
        IdAMan tidak tersedia di sandbox. Tombol di bawah membuka sesi Administrator dengan data sampling.
      </p>
      <div className="mt-3">
        <button type="button" className="inline-flex items-center rounded-md border border-amber-300 bg-white px-3 py-2 text-[13px] font-medium hover:bg-amber-100" onClick={enter}>
          {context === "landing" ? "Bypass login" : "Masuk sebagai Administrator"}
        </button>
      </div>
    </div>
  );
}
