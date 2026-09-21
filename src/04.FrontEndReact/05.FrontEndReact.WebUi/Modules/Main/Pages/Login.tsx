import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { applySandboxBypassSession, isSandboxAuthBypassEnabled } from "../../../Common/Services/SandboxAuth";
import { SandboxBypassPanel } from "../../../Common/Components/SandboxBypassPanel";
import { Button } from "../../../Common/Components/Button";
import { FieldDefault } from "../../../Common/Components/FieldDefault";
import { appConfigFrontEndOptions } from "@services/AppConfigFrontEnd/AppConfigFrontEndOptions";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@soltemp.local");
  const [password, setPassword] = useState("password");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (isSandboxAuthBypassEnabled()) {
      applySandboxBypassSession();
      navigate("/", { replace: true });
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
      <img src={`${import.meta.env.BASE_URL}img/logo-pertamina-colorful.svg`} alt="" className="h-12 w-auto self-center" />
      <h1 className="font-heading text-center text-2xl font-semibold text-primary">Login {appConfigFrontEndOptions.appNickName}</h1>
      <form className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm" onSubmit={onSubmit}>
        <FieldDefault label="Email" value={email} onChange={setEmail} required />
        <FieldDefault label="Password" value={password} onChange={setPassword} required />
        <Button variant="primary" size="md" className="w-full" type="submit">Masuk</Button>
      </form>
      <SandboxBypassPanel context="external" />
    </div>
  );
}
