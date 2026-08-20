import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const education = [
  {
    school: "Université Gaston Berger",
    degree: "Master 2 — MIAGE",
    dates: "En cours",
  },
  {
    school: "Université Gaston Berger",
    degree: "Licence — MIAGE",
    dates: "2023 — 2024",
  },
  {
    school: "Lycée Demba Diop",
    degree: "Baccalauréat Scientifique",
    dates: "2015 — 2020",
  },
  {
    school: "CES 2 Mbour",
    degree: "BFEM (Brevet de Fin d'Études Moyennes)",
    dates: "2011 — 2015",
  },
];

const EducationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" ref={ref} className="bg-bg py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl text-ink tracking-tight mb-12 md:mb-16"
        >
          Parcours <span className="font-display italic text-accent">académique</span>.
        </motion.h2>

        <div className="flex flex-col">
          {education.map((e, i) => (
            <motion.div
              key={e.school + e.degree}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
              className="grid grid-cols-12 gap-4 py-6 md:py-8 border-t border-line last:border-b"
            >
              <p className="col-span-12 md:col-span-3 text-faint text-sm tracking-wider">
                {e.dates}
              </p>
              <div className="col-span-12 md:col-span-9">
                <h3 className="text-ink text-fluid-2 tracking-tight mb-1">{e.school}</h3>
                <p className="text-muted text-sm md:text-base">{e.degree}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
