import { useState, type FormEvent } from "react";
import { Button } from "../../../Common/Components/Button";
import { FieldDefault } from "../../../Common/Components/FieldDefault";
import { appConfigFrontEndOptions } from "@services/AppConfigFrontEnd/AppConfigFrontEndOptions";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    // Local login delegates to IdAMan; the credential pair above is only a
    // placeholder for applications that add their own login endpoint.
    window.location.assign(`${appConfigFrontEndOptions.authenticationBaseUrl}/Authentication/Internal/Login`);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
      <img src={`${import.meta.env.BASE_URL}img/logo-pertamina-colorful.svg`} alt="" className="h-12 w-auto self-center" />
      <h1 className="font-heading text-center text-2xl font-semibold text-primary">Login {appConfigFrontEndOptions.appNickName}</h1>
      <form className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm" onSubmit={onSubmit}>
        <FieldDefault label="Email" value={email} onChange={setEmail} required />
        <FieldDefault label="Password" value={password} onChange={setPassword} type="password" required />
        <Button variant="primary" size="medium" className="w-full" type="submit">Masuk</Button>
      </form>
    </div>
  );
}
