import { Link } from "react-router-dom";
export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 p-8 text-center">
      <img src={`${import.meta.env.BASE_URL}img/not-found.png`} alt="" className="h-40 w-auto" />
      <h1 className="font-heading text-xl font-semibold">Halaman tidak ditemukan</h1>
      <Link to="/" className="text-sm text-primary hover:underline">Kembali ke beranda</Link>
    </div>
  );
}
