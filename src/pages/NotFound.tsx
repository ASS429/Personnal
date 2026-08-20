import { ArrowLeft, FileText } from "lucide-react";

const NotFound = () => (
  <main className="flex min-h-[100svh] flex-col items-center justify-center bg-bg px-6 py-24 text-center">
    <p className="font-display text-fluid-5 leading-none text-accent">404</p>

    <h1 className="mt-4 text-fluid-3 text-ink">Cette page n'existe pas.</h1>

    <p className="mt-4 max-w-[46ch] text-fluid-0 leading-relaxed text-muted">
      Le lien est peut-être ancien, ou la page a été déplacée. Tout se retrouve
      depuis l'accueil.
    </p>

    <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
      <a
        href="/"
        className="flex min-h-11 items-center gap-2 rounded-full bg-accent px-6 text-fluid--1 font-semibold text-accent-ink transition-transform duration-300 ease-out-quint hover:scale-[1.04]"
      >
        <ArrowLeft size={16} /> Retour à l'accueil
      </a>
      <a
        href="/cv"
        className="panel flex min-h-11 items-center gap-2 rounded-full px-5 text-fluid--1 font-medium text-ink"
      >
        <FileText size={16} /> Voir le CV
      </a>
    </div>
  </main>
);

export default NotFound;
