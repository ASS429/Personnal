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
    wide: true,
  },
  {
    icon: Code2,
    tag: "Frontend",
    title: "Développement Frontend",
    description:
      "Je construis des expériences web responsives, accessibles et performantes avec des frameworks modernes.",
    wide: false,
  },
  {
    icon: Server,
    tag: "Backend",
    title: "Développement Backend",
    description:
      "Je conçois des APIs, des bases de données et de la logique serveur pour alimenter des applications full-stack fiables.",
    wide: false,
  },
  {
    icon: Palette,
    tag: "Créatif",
    title: "Designer",
    description:
      "Je conçois des systèmes visuels et des identités de marque avec un soin particulier pour la typographie, les couleurs et les détails.",
    wide: false,
  },
  {
    icon: Layout,
    tag: "Produit",
    title: "UI / UX",
    description:
      "Je dessine des interfaces intuitives et des parcours utilisateurs qui paraissent fluides et pensés pour l'humain.",
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
            Ce que je <span className="font-serif-i italic text-white/60">fais</span>
          </h2>
          <p className="text-white/40 text-sm hidden md:block">Compétences</p>
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
                className={`liquid-glass rounded-3xl p-8 md:p-10${s.wide ? " md:col-span-2" : ""}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="liquid-glass rounded-2xl p-3">
                    <Icon size={22} className="text-white" />
                  </div>
                  <p className="text-white/40 text-xs tracking-widest uppercase">{s.tag}</p>
                </div>
                <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
