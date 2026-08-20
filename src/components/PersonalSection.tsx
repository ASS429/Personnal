import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Languages, Heart, Code2, GraduationCap, Dumbbell, Compass } from "lucide-react";

const languages = [
  { name: "Français", level: "Excellent" },
  { name: "Anglais", level: "Avancé" },
  { name: "Wolof", level: "Excellent" },
];

const interests = [
  { name: "Codage", icon: Code2 },
  { name: "Études", icon: GraduationCap },
  { name: "Sport", icon: Dumbbell },
  { name: "Découvertes", icon: Compass },
];

const PersonalSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="personal"
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
            Au-delà <span className="font-serif-i italic text-white/60">du code</span>
          </h2>
          <p className="text-white/40 text-sm hidden md:block">Personnel</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="liquid-glass rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="liquid-glass rounded-2xl p-3">
                <Languages size={22} className="text-white" />
              </div>
              <p className="text-white/40 text-xs tracking-widest uppercase">Langues</p>
            </div>
            <h3 className="text-white text-xl md:text-2xl mb-6 tracking-tight">Langues parlées</h3>
            <div className="flex flex-col gap-3">
              {languages.map((l, i) => (
                <motion.div
                  key={l.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
                >
                  <span className="text-white/90 text-base md:text-lg">{l.name}</span>
                  <span className="text-white/50 text-sm tracking-wider uppercase">
                    {l.level}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="liquid-glass rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="liquid-glass rounded-2xl p-3">
                <Heart size={22} className="text-white" />
              </div>
              <p className="text-white/40 text-xs tracking-widest uppercase">Passions</p>
            </div>
            <h3 className="text-white text-xl md:text-2xl mb-6 tracking-tight">Centres d'intérêt</h3>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((it, i) => {
                const Icon = it.icon;
                return (
                  <motion.div
                    key={it.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="liquid-glass rounded-2xl px-4 py-3 flex items-center gap-3"
                  >
                    <Icon size={18} className="text-white/70" />
                    <span className="text-white/90 text-sm md:text-base">{it.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PersonalSection;
