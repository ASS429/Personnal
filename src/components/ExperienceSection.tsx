import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="bg-bg py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-faint text-sm tracking-widest uppercase mb-8"
        >
          Expérience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl text-ink tracking-tight mb-12 md:mb-16"
        >
          Apprendre <span className="font-display italic text-accent">en construisant</span>.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="panel rounded-3xl p-8 md:p-12"
        >
          <p className="text-muted text-fluid-1 leading-relaxed">
            Je n'ai pas encore d'expérience professionnelle. Mais j'ai mené plusieurs{" "}
            <span className="font-display italic text-ink">projets personnels</span> ambitieux
            et contribué à de nombreux{" "}
            <span className="font-display italic text-ink">projets académiques</span> tout au
            long de mes études — en livrant de vraies applications de la conception au déploiement,
            et en aiguisant mon savoir-faire à chaque étape.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
