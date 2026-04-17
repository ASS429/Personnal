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
    <section id="education" ref={ref} className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-sm tracking-widest uppercase mb-8"
        >
          Formation
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl text-white tracking-tight mb-12 md:mb-16"
        >
          Parcours <span className="font-serif-i italic text-white/60">académique</span>.
        </motion.h2>

        <div className="flex flex-col">
          {education.map((e, i) => (
            <motion.div
              key={e.school + e.degree}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
              className="grid grid-cols-12 gap-4 py-6 md:py-8 border-t border-white/10 last:border-b"
            >
              <p className="col-span-12 md:col-span-3 text-white/40 text-sm tracking-wider">
                {e.dates}
              </p>
              <div className="col-span-12 md:col-span-9">
                <h3 className="text-white text-xl md:text-2xl tracking-tight mb-1">{e.school}</h3>
                <p className="text-white/50 text-sm md:text-base">{e.degree}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
