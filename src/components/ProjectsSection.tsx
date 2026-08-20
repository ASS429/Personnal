import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import actIcon from "@/assets/act-icon.webp";
import maVillaIcon from "@/assets/ma_villa.webp";
import samacommerceIcon from "@/assets/samacommerce-icon.webp";
import lartiskaIcon from "@/assets/lartiska.webp";
import campusCrushIcon from "@/assets/campus-crush-icon.webp";
import samaytontinesIcon from "@/assets/samaytontines-icon.webp";

type Projet = {
  tag: string;
  title: string;
  description: string;
  url: string | null;
  icon: string;
};

const PHARE: Projet = {
  tag: "Tourisme",
  title: "Africa Connection Tours",
  description:
    "Site multilingue et back-office d'un tour-opérateur dakarois actif depuis 1996 : circuits, excursions et devis sur-mesure au Sénégal et en Afrique de l'Ouest. Sur son propre domaine, en production.",
  url: "https://act-senegal.com",
  icon: actIcon,
};

const AUTRES: Projet[] = [
  {
    tag: "Immobilier",
    title: "Ma Villa",
    description:
      "Plateforme immobilière de luxe au Sénégal proposant des villas haut de gamme à la vente et à la location.",
    url: "https://mavilla-web.onrender.com/",
    icon: maVillaIcon,
  },
  {
    tag: "Commerce",
    title: "SamaCommerce",
    description:
      "Une application qui simplifie la gestion pour les commerçants : stocks, ventes et suivi clients réunis en un seul endroit.",
    url: "https://samacommerce-web.onrender.com/",
    icon: samacommerceIcon,
  },
  {
    tag: "Artisanat",
    title: "Lartiska",
    description:
      "Plateforme dédiée aux finitions de luxe au Sénégal : peinture artistique, fresques murales, carrelage et résine époxy.",
    url: "https://lartiska.onrender.com/",
    icon: lartiskaIcon,
  },
  {
    tag: "Social",
    title: "Campus Crush",
    description:
      "Une application de rencontres pensée pour les étudiants, pour aider les communautés universitaires à se connecter.",
    url: null,
    icon: campusCrushIcon,
  },
  {
    tag: "Fintech",
    title: "SamayTontines",
    description:
      "Une application qui facilite la gestion des tontines, ces associations d'épargne et de crédit rotatives.",
    url: "https://ma-tontine-frontend-1.onrender.com/",
    icon: samaytontinesIcon,
  },
];

/** Inclinaison au pointeur. Le ressort évite le suivi trop sec du curseur. */
function useTilt(amplitude = 7) {
  const sansMouvement = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.4 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-amplitude, amplitude]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [amplitude, -amplitude]);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (sansMouvement || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, onPointerMove, onPointerLeave, sansMouvement };
}

type CarteProps = {
  projet: Projet;
  delai: number;
  vue: boolean;
  className?: string;
  children: ReactNode;
};

const Carte = ({ projet, delai, vue, className = "", children }: CarteProps) => {
  const { rotateX, rotateY, onPointerMove, onPointerLeave, sansMouvement } = useTilt();
  const lien = Boolean(projet.url);
  const Element = lien ? motion.a : motion.div;

  return (
    <div className={`tilt-scene ${className}`}>
      <Element
        {...(lien
          ? { href: projet.url as string, target: "_blank", rel: "noopener noreferrer" }
          : {})}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        initial={sansMouvement ? false : { opacity: 0, y: 34 }}
        animate={vue ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: delai }}
        style={sansMouvement ? undefined : { rotateX, rotateY }}
        className={`tilt-card panel flex h-full flex-col justify-between rounded-3xl transition-shadow duration-500 ${
          lien ? "hover:shadow-lg" : "cursor-default"
        }`}
      >
        {children}
      </Element>
    </div>
  );
};

const Pied = ({ projet }: { projet: Projet }) => (
  <p className="mt-6 truncate text-fluid--1 text-faint">
    {projet.url
      ? projet.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : "Service en pause, bientôt de retour en ligne"}
  </p>
);

const ProjectsSection = () => {
  const ref = useRef(null);
  const vue = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="bg-bg px-6 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={vue ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex items-end justify-between gap-6 md:mb-16"
        >
          <h2 className="text-fluid-4 text-ink">
            Projets <span className="font-display italic text-accent">sélectionnés</span>
          </h2>
          <p className="hidden text-fluid--1 text-muted md:block">Six produits, en ligne</p>
        </motion.div>

        {/* Le projet phare occupe toute la largeur : il ne se compare pas aux autres. */}
        <Carte projet={PHARE} delai={0.1} vue={vue} className="mb-6 md:mb-8">
          <div className="flex flex-col gap-7 p-8 md:flex-row md:items-center md:gap-10 md:p-11">
            <img
              src={PHARE.icon}
              alt="Logo d'Africa Connection Tours"
              className="h-20 w-20 shrink-0 rounded-2xl object-cover md:h-28 md:w-28"
              loading="lazy"
              width={512}
              height={512}
            />
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="text-fluid--1 font-semibold text-accent">{PHARE.tag}</span>
                <span className="rounded-full border border-accent px-2.5 py-0.5 text-fluid--1 font-semibold text-accent">
                  Projet phare
                </span>
              </div>
              <h3 className="mb-3 text-fluid-3 text-ink">{PHARE.title}</h3>
              <p className="max-w-measure text-fluid-0 leading-relaxed text-muted">
                {PHARE.description}
              </p>
              <Pied projet={PHARE} />
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-500 ease-out-quint md:self-start">
              <ArrowUpRight size={20} />
            </span>
          </div>
        </Carte>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {AUTRES.map((p, i) => (
            <Carte key={p.title} projet={p} delai={0.16 + i * 0.08} vue={vue}>
              <div className="flex h-full flex-col justify-between p-8 md:p-9">
                <div>
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <img
                      src={p.icon}
                      alt={`Logo de ${p.title}`}
                      className="h-14 w-14 rounded-2xl object-cover"
                      loading="lazy"
                      width={512}
                      height={512}
                    />
                    {p.url && (
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted">
                        <ArrowUpRight size={16} />
                      </span>
                    )}
                  </div>
                  <p className="mb-2 text-fluid--1 font-semibold text-accent">{p.tag}</p>
                  <h3 className="mb-3 text-fluid-2 text-ink">{p.title}</h3>
                  <p className="text-fluid--1 leading-relaxed text-muted">{p.description}</p>
                </div>
                <Pied projet={p} />
              </div>
            </Carte>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
