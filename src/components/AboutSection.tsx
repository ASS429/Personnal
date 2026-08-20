import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import portrait from "@/assets/arfang-portrait.jpeg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="bg-bg pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-faint text-sm tracking-widest uppercase mb-8"
        >
          À propos
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-fluid-4 lg:text-6xl text-ink leading-[1.15] tracking-tight mb-12"
        >
          Créer des <span className="font-display italic text-accent">outils numériques</span> pour
          émanciper les <span className="font-display italic text-accent">entreprises</span> et les
          esprits africains.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="panel rounded-3xl p-2 overflow-hidden">
              <img
                src={portrait}
                alt="Portrait de Arfang Souleymane Sané"
                className="w-full h-auto rounded-2xl object-cover aspect-[4/5]"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-3 text-muted text-fluid-1 leading-relaxed"
          >
            Étudiant sénégalais en systèmes d'information de gestion à l'Université Gaston Berger de
            Saint-Louis, passionné par la technologie, l'innovation et l'entrepreneuriat. Diplômé du
            Lycée Demba Diop de Mbour avec un baccalauréat scientifique, spécialisé en Méthodes
            Informatiques Appliquées à la Gestion des Entreprises (MIAGE). Je développe des
            applications et des solutions numériques conçues pour faciliter la gestion des
            entreprises et des petites activités commerciales. Créatif et ambitieux, je mène
            également des projets entrepreneuriaux, notamment dans l'agriculture et les services
            numériques. Mon objectif : mettre la technologie au service du développement économique
            et de l'innovation en Afrique. 🚀
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
