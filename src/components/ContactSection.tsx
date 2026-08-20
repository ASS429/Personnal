import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, ArrowUpRight } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const email = "sanarfang429@gmail.com";

  return (
    <section
      id="contact"
      ref={ref}
      className="bg-bg pt-28 md:pt-40 pb-16 md:pb-20 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.04)_0%,_transparent_70%)]"
    >
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-faint text-sm tracking-widest uppercase"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl text-ink tracking-tight leading-[1.05]"
        >
          Construisons <span className="font-display italic text-accent">quelque chose</span>
          <br />
          ensemble.
        </motion.h2>

        <motion.a
          href={`mailto:${email}`}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          whileHover={{ scale: 1.03 }}
          className="panel rounded-full pl-6 pr-2 py-2 flex items-center gap-3"
        >
          <Mail size={18} className="text-muted" />
          <span className="text-ink text-sm md:text-base">{email}</span>
          <span className="bg-accent rounded-full p-2.5 text-accent-ink">
            <ArrowUpRight size={16} />
          </span>
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-faint text-xs tracking-widest uppercase pt-16"
        >
          © {new Date().getFullYear()} Arfang Souleymane Sané
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
