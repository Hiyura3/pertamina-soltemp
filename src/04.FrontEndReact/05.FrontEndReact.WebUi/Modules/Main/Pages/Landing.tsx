import { Link } from "react-router-dom";
import { appConfigFrontEndOptions } from "@services/AppConfigFrontEnd/AppConfigFrontEndOptions";
import { MainRouteFor } from "../Statics/RouteFor";
import { CommonDisplayTextFor } from "../../../Common/Statics/DisplayTextFor";

export function Landing() {
  return (
    <div className="mx-auto grid min-h-screen max-w-5xl items-center gap-8 p-8 md:grid-cols-2">
      <div className="space-y-6 text-center md:text-left">
        <img src={`${import.meta.env.BASE_URL}img/logo-pertamina-colorful.svg`} alt="" className="mx-auto h-16 w-auto md:mx-0" />
        <h1 className="font-heading text-4xl font-semibold text-primary">
          Welcome to {appConfigFrontEndOptions.appFullName}
        </h1>
        <p className="text-muted-foreground">
          Template aplikasi Pertamina dengan skin Pacer. Silakan masuk untuk melihat dashboard, master data, dan galeri komponen.
        </p>
        <div className="flex flex-wrap justify-center gap-3 md:justify-start">
          <a
            href={`${appConfigFrontEndOptions.authenticationBaseUrl}/Authentication/Internal/Login`}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-4 text-sm hover:bg-muted"
          >
            {CommonDisplayTextFor.Login} {CommonDisplayTextFor.Internal}
          </a>
          <Link to={MainRouteFor.Login} className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-4 text-sm text-primary-foreground shadow-button hover:opacity-90">
            {CommonDisplayTextFor.Login} {CommonDisplayTextFor.External}
          </Link>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <img src={`${import.meta.env.BASE_URL}img/landing.webp`} alt="" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
