import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import actIcon from "@/assets/act-icon.webp";
import maVillaIcon from "@/assets/ma_villa.webp";
import samacommerceIcon from "@/assets/samacommerce-icon.webp";
import lartiskaIcon from "@/assets/lartiska.webp";
import campusCrushIcon from "@/assets/campus-crush-icon.webp";
import samaytontinesIcon from "@/assets/samaytontines-icon.webp";

const projects = [
  {
    tag: "Tourisme",
    title: "Africa Connection Tours",
    description:
      "Site vitrine et back-office d'un tour-opérateur dakarois actif depuis 1996 : circuits, excursions et voyages sur-mesure au Sénégal et en Afrique de l'Ouest.",
    url: "https://act-senegal.com",
    icon: actIcon,
    featured: true,
  },
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
      "Une application qui simplifie la gestion pour les commerçants — stocks, ventes et suivi clients réunis en un seul endroit.",
    url: "https://samacommerce-web.onrender.com/",
    icon: samacommerceIcon,
  },
  {
    tag: "Artisanat",
    title: "Lartiska",
    description:
      "Plateforme dédiée aux finitions de luxe au Sénégal : peinture artistique, fresques murales, carrelage et résine époxy par un maître artisan.",
    url: "https://lartiska.onrender.com/",
    icon: lartiskaIcon,
  },
  {
    tag: "Social",
    title: "Campus Crush",
    description:
      "Une application de rencontres pensée pour les étudiants, pour aider les communautés universitaires à se connecter de manière ludique et sincère.",
    url: null,
    icon: campusCrushIcon,
  },
  {
    tag: "Fintech",
    title: "SamayTontines",
    description:
      "Une application qui facilite la gestion des tontines (associations d'épargne et de crédit rotatives).",
    url: "https://ma-tontine-frontend-1.onrender.com/",
    icon: samaytontinesIcon,
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="bg-black py-28 md:py-40 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight">
            Projets <span className="font-serif-i italic text-white/60">sélectionnés</span>
          </h2>
          <p className="text-white/40 text-sm hidden md:block">En ligne & déployés</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p, i) => {
            const isLink = Boolean(p.url);
            const Card = isLink ? motion.a : motion.div;

            return (
              <Card
                key={p.title}
                {...(isLink
                  ? { href: p.url as string, target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 * (i + 1) }}
                whileHover={isLink ? { y: -4 } : undefined}
                className={`liquid-glass rounded-3xl p-8 md:p-10 group flex flex-col justify-between min-h-[280px] ${
                  isLink ? "" : "cursor-default"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <img
                      src={p.icon}
                      alt={`Icône ${p.title}`}
                      className="w-14 h-14 rounded-2xl object-cover"
                      loading="lazy"
                    />
                    {isLink && (
                      <div className="liquid-glass rounded-full p-2 group-hover:rotate-45 transition-transform duration-500">
                        <ArrowUpRight size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-white/40 text-xs tracking-widest uppercase">{p.tag}</p>
                    {p.featured && (
                      <span className="text-white/70 text-[10px] tracking-widest uppercase border border-white/20 rounded-full px-2 py-0.5">
                        Projet phare
                      </span>
                    )}
                  </div>
                  <h3 className="text-white text-2xl mb-3 tracking-tight">{p.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{p.description}</p>
                </div>
                <p className="text-white/30 text-xs mt-6 truncate">
                  {isLink ? (p.url as string).replace(/^https?:\/\//, "") : "Bientôt de retour en ligne"}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
