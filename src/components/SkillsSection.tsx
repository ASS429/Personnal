import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Layout, Code2, Server, Briefcase } from "lucide-react";

const skills = [
  {
    icon: Briefcase,
    tag: "Gestion",
    title: "Management & Gestion",
    description:
      "Formé en comptabilité, économie, finance d'entreprise et management de projet — j'analyse, planifie et pilote des initiatives de bout en bout avec une vision orientée résultats.",
    tags: ["Comptabilité", "Économie", "Finance d'entreprise", "Management de projet", "Gestion d'entreprise", "Analyse financière"],
    wide: true,
  },
  {
    icon: Code2,
    tag: "Frontend",
    title: "Développement Frontend",
    description:
      "Je construis des applications web progressives (PWA) et des expériences web responsives, accessibles et performantes avec des technologies modernes.",
    tags: ["PWA", "React", "TypeScript", "Tailwind CSS", "Vite"],
    wide: false,
  },
  {
    icon: Server,
    tag: "Backend",
    title: "Développement Backend",
    description:
      "Je conçois des APIs, des bases de données et de la logique serveur pour alimenter des applications full-stack fiables.",
    tags: ["Node.js", "REST APIs", "Bases de données", "Full-stack", "Git"],
    wide: false,
  },
  {
    icon: Palette,
    tag: "Créatif",
    title: "Designer",
    description:
      "Je conçois des systèmes visuels et des identités de marque avec un soin particulier pour la typographie, les couleurs et les détails.",
    tags: ["Design visuel", "Identité de marque", "Typographie", "Figma"],
    wide: false,
  },
  {
    icon: Layout,
    tag: "Produit",
    title: "UI / UX",
    description:
      "Je dessine des interfaces intuitives et des parcours utilisateurs qui paraissent fluides et pensés pour l'humain.",
    tags: ["Wireframing", "Prototypage", "Design system", "Accessibilité"],
    wide: false,
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="bg-bg py-28 md:py-40 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-12 md:mb-16"
        >
          <h2 className="text-fluid-4 text-ink tracking-tight">
            Ce que je <span className="font-display italic text-accent">fais</span>
          </h2>
          <p className="text-faint text-sm hidden md:block">Compétences</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 * (i + 1) }}
                className={`panel rounded-3xl p-8 md:p-10${s.wide ? " md:col-span-2" : ""}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="panel rounded-2xl p-3">
                    <Icon size={22} className="text-ink" />
                  </div>
                  <p className="text-faint text-xs tracking-widest uppercase">{s.tag}</p>
                </div>
                <h3 className="text-ink text-fluid-2 mb-3 tracking-tight">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-5">{s.description}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-line rounded-full px-3 py-1 text-muted text-xs tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
