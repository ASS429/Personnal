import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PRESTATIONS = [
  {
    client: "Africa Connection Tours",
    secteur: "Agence de voyages, Dakar",
    periode: "Mai — juillet 2026",
    description:
      "Site multilingue et back-office sur mesure pour un tour-opérateur fondé en 1996 : catalogue de circuits, demandes de devis, espace d'administration. Cadrage, conception, développement et mise en production sur le domaine du client. Livré dans les délais et réceptionné.",
    lien: "https://act-senegal.com",
  },
  {
    client: "Lartiska",
    secteur: "Maître artisan, finitions de luxe",
    periode: "Mai — août 2026",
    description:
      "Site vitrine pour un artisan spécialisé en peinture artistique, fresques murales, carrelage et résine époxy : présentation des réalisations et prise de contact. Conception et développement.",
    lien: "https://lartiska.onrender.com/",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="overflow-hidden bg-bg px-6 py-24 md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-5 text-fluid-4 text-ink"
        >
          Développeur web <span className="font-display italic text-accent">freelance</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.18 }}
          className="mb-12 max-w-measure text-fluid-1 leading-relaxed text-muted md:mb-16"
        >
          Deux prestations livrées pour des clients réels, menées en parallèle du Master MIAGE,
          de la prise de besoin jusqu'à la mise en ligne.
        </motion.p>

        <div>
          {PRESTATIONS.map((p, i) => (
            <motion.article
              key={p.client}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 + i * 0.12 }}
              className="grid grid-cols-12 gap-x-4 gap-y-2 border-t border-line py-7 last:border-b md:py-9"
            >
              <p className="col-span-12 text-fluid--1 font-medium text-faint md:col-span-3">
                {p.periode}
              </p>
              <div className="col-span-12 md:col-span-9">
                <h3 className="text-fluid-2 text-ink">{p.client}</h3>
                <p className="mb-3 text-fluid--1 font-medium text-accent">{p.secteur}</p>
                <p className="max-w-measure text-fluid-0 leading-relaxed text-muted">
                  {p.description}
                </p>
                <a
                  href={p.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center text-fluid--1 font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
                >
                  {p.lien.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.52 }}
          className="mt-10 max-w-measure text-fluid-0 leading-relaxed text-muted"
        >
          À côté de ces prestations, je conçois et développe mes propres produits — SamaCommerce,
          SamayTontines, Campus Crush — et je mène PasseTemps en binôme avec un juriste.
        </motion.p>
      </div>
    </section>
  );
};

export default ExperienceSection;
