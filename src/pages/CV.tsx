import { useEffect } from "react";
import arfangPortrait from "../assets/arfang-portrait.jpeg";

const HTML2PDF_SRC =
  "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";

type Html2PdfWorker = {
  set(options: Record<string, unknown>): Html2PdfWorker;
  from(element: HTMLElement): Html2PdfWorker;
  save(): Promise<void>;
};

type Html2PdfFactory = () => Html2PdfWorker;

declare global {
  interface Window {
    html2pdf?: Html2PdfFactory;
  }
}

const loadHtml2Pdf = () =>
  new Promise<Html2PdfFactory>((resolve, reject) => {
    const settle = () => {
      if (window.html2pdf) {
        resolve(window.html2pdf);
      } else {
        reject(new Error("html2pdf.js s'est chargé sans s'exposer sur window."));
      }
    };

    if (window.html2pdf) {
      resolve(window.html2pdf);
      return;
    }

    const existing = document.getElementById("html2pdf-script") as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", settle, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "html2pdf-script";
    script.src = HTML2PDF_SRC;
    script.async = true;
    script.onload = settle;
    script.onerror = () => reject(new Error("Impossible de charger html2pdf.js"));
    document.head.appendChild(script);
  });

const waitForImages = async (root: HTMLElement) => {
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  );
};

const handleDownload = async () => {
  const element = document.querySelector(".cv-page") as HTMLElement | null;
  if (!element) {
    alert("Impossible de trouver le CV à exporter.");
    return;
  }

  const button = document.querySelector(".print-btn") as HTMLButtonElement | null;
  const oldButtonText = button?.textContent || "Télécharger en PDF";

  const holder = document.createElement("div");
  holder.className = "pdf-holder";

  const clone = element.cloneNode(true) as HTMLElement;
  clone.classList.add("cv-export");
  holder.appendChild(clone);
  document.body.appendChild(holder);

  try {
    if (button) {
      button.disabled = true;
      button.textContent = "Préparation du PDF...";
    }

    const html2pdf = await loadHtml2Pdf();

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    await waitForImages(clone);
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => window.setTimeout(resolve, 150));

    await html2pdf()
      .set({
        margin: 0,
        filename: "CV-Arfang-Souleymane-Sane.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          scrollX: 0,
          scrollY: 0,
          x: 0,
          y: 0,
          width: 794,
          height: 1123,
          windowWidth: 794,
          windowHeight: 1123,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
          precision: 12,
        },
        pagebreak: { mode: ["css", "legacy"] },
      })
      .from(clone)
      .save();
  } catch (error) {
    console.error("Erreur lors du téléchargement du PDF :", error);
    alert("Le PDF n'a pas pu être généré correctement. Vérifie la console pour voir l'erreur exacte.");
  } finally {
    holder.remove();
    if (button) {
      button.disabled = false;
      button.textContent = oldButtonText;
    }
  }
};

const CV = () => {
  // L'A4 fait 794 px de large : sur un écran plus étroit on la réduit.
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".cv-shell");
    if (!shell) return;
    const LARGEUR_A4 = 794;
    const HAUTEUR_A4 = 1121;

    const feuille = shell.querySelector<HTMLElement>(".cv-page");
    if (!feuille) return;

    const ajuster = () => {
      const dispo = shell.clientWidth;
      const echelle = Math.min(1, (dispo - 20) / LARGEUR_A4);
      if (echelle < 1) {
        // Origine haut-gauche : on recentre nous-mêmes, la boîte non
        // transformée étant plus large que l'écran.
        shell.style.setProperty("--echelle", String(echelle));
        feuille.style.margin = `20px 0 0 ${(dispo - LARGEUR_A4 * echelle) / 2}px`;
        shell.style.height = `${Math.ceil(HAUTEUR_A4 * echelle) + 40}px`;
      } else {
        shell.style.removeProperty("--echelle");
        feuille.style.margin = "";
        shell.style.height = "";
      }
    };

    ajuster();
    const ro = new ResizeObserver(ajuster);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  const managementSkills = [
    "Comptabilité",
    "Économie",
    "Finance d'entreprise",
    "Gestion d'entreprise",
    "Management de projet",
  ];

  const devSkills = [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "REST APIs",
    "Bases de données",
    "PWA",
    "Git",
  ];

  const designSkills = ["UI / UX", "Figma", "Design visuel", "Identité de marque", "Typographie"];

  const interests = ["Codage", "Études", "Sport", "Découvertes", "Entrepreneuriat"];

  return (
    <>
      <style>{`
        @page { size: A4; margin: 0; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { margin: 0; padding: 0; }
        body {
          background: #e9edf3;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .cv-page {
          width: 210mm;
          height: 296.6mm;
          overflow: hidden;
          margin: 0 auto;
          background: #ffffff;
          color: #172033;
          font-family: Arial, Helvetica, sans-serif;
          display: grid;
          grid-template-columns: 67mm 1fr;
          line-height: 1.38;
        }

        @media screen {
          .cv-page {
            margin: 30px auto;
            box-shadow: 0 24px 70px rgba(15, 23, 42, 0.22);
          }
        }

        @media print {
          body { background: #ffffff; }
          .cv-page { margin: 0; box-shadow: none; }
          .no-print { display: none !important; }
        }

        .pdf-holder {
          position: fixed;
          left: 0;
          top: 0;
          width: 794px;
          height: 1123px;
          overflow: hidden;
          background: #ffffff;
          z-index: 999999;
          pointer-events: none;
        }

        .cv-page.cv-export {
          margin: 0 !important;
          box-shadow: none !important;
          width: 794px !important;
          height: 1123px !important;
          min-height: 1123px !important;
          max-width: 794px !important;
          max-height: 1123px !important;
          grid-template-columns: 253px 1fr !important;
          transform: none !important;
          overflow: hidden !important;
          display: grid !important;
          position: relative !important;
          left: 0 !important;
          top: 0 !important;
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
          position: relative;
          color: #f8fafc;
          background: #0f172a;
          padding: 10mm 7mm 9mm 7mm;
        }

        .sidebar::after {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 1.4mm;
          background: #38bdf8;
        }

        .avatar {
          width: 30mm;
          height: 30mm;
          border-radius: 50%;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.12);
          border: 1.4px solid rgba(255, 255, 255, 0.52);
          box-shadow: 0 13px 30px rgba(0, 0, 0, 0.25);
          margin-bottom: 7mm;
          padding: 1mm;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center;
          border-radius: 50%;
        }

        .side-section { margin-bottom: 8mm; }
        .side-section:last-child { margin-bottom: 0; }

        .side-title {
          color: #bfdbfe;
          font-size: 7.6pt;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin-bottom: 4mm;
        }

        .contact-list { display: grid; gap: 2.7mm; }
        .contact-item {
          display: grid;
          grid-template-columns: 5mm 1fr;
          gap: 2.4mm;
          align-items: start;
          font-size: 8.05pt;
          color: rgba(248, 250, 252, 0.88);
          line-height: 1.3;
          word-break: break-word;
        }
        .contact-icon {
          width: 5mm;
          height: 5mm;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.14);
          color: #e0f2fe;
          font-size: 6.7pt;
          font-weight: 800;
        }
        .contact-item a { color: rgba(248, 250, 252, 0.92); text-decoration: none; }

        .skill-group { margin-bottom: 5mm; }
        .skill-group:last-child { margin-bottom: 0; }
        .skill-heading {
          color: #ffffff;
          font-size: 8.25pt;
          font-weight: 700;
          margin-bottom: 2mm;
        }
        .side-tags { display: flex; flex-wrap: wrap; gap: 1.6mm; }
        .side-tag {
          font-size: 7.15pt;
          color: rgba(248, 250, 252, 0.92);
          border: 0.6px solid rgba(255, 255, 255, 0.24);
          background: rgba(255, 255, 255, 0.08);
          border-radius: 99px;
          padding: 0.7mm 2.1mm;
          white-space: nowrap;
        }

        .language-list { display: grid; gap: 2mm; }
        .language-item {
          display: flex;
          justify-content: space-between;
          gap: 3mm;
          font-size: 8.05pt;
          color: rgba(248, 250, 252, 0.9);
        }
        .language-item strong { color: #ffffff; font-weight: 700; }
        .language-item span { color: #cbd5e1; }

        .interest-list { display: flex; flex-wrap: wrap; gap: 1.7mm; }

        /* ===== MAIN ===== */
        .main {
          padding: 10mm 11mm 8.7mm 9mm;
          background: #ffffff;
        }

        .header { margin-bottom: 6mm; }
        .name {
          font-size: 25.5pt;
          line-height: 0.98;
          font-weight: 800;
          letter-spacing: -0.9px;
          color: #0f172a;
          max-width: 122mm;
        }
        .title {
          margin-top: 2.5mm;
          font-size: 8.4pt;
          font-weight: 800;
          color: #0369a1;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        .headline {
          margin-top: 3.2mm;
          padding: 3.1mm 4mm;
          border-left: 1.1mm solid #0ea5e9;
          border-radius: 0 4mm 4mm 0;
          background: #eff6ff;
          color: #1e3a5f;
          font-size: 8.6pt;
          line-height: 1.42;
          font-weight: 500;
        }

        .section { margin-bottom: 5.4mm; }
        .section.compact { margin-bottom: 4.7mm; }
        .section-title {
          display: flex;
          align-items: center;
          gap: 2.3mm;
          color: #0f172a;
          font-size: 8.65pt;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          margin-bottom: 3mm;
        }
        .section-title::before {
          content: "";
          width: 4.5mm;
          height: 4.5mm;
          border-radius: 50%;
          background: #0ea5e9;
          box-shadow: 0 0 0 1.1mm #e0f2fe;
          flex: 0 0 auto;
        }
        .section-title::after {
          content: "";
          height: 0.6px;
          background: #dbe4ef;
          flex: 1;
        }

        .text {
          font-size: 8.55pt;
          color: #334155;
          line-height: 1.49;
          text-align: justify;
        }

        .education-list { display: grid; gap: 2.6mm; }
        .edu-item {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 5mm;
          align-items: baseline;
          padding-bottom: 2.5mm;
          border-bottom: 0.6px solid #e2e8f0;
        }
        .edu-item:last-child { border-bottom: none; padding-bottom: 0; }
        .edu-degree {
          color: #0f172a;
          font-size: 8.85pt;
          font-weight: 800;
          line-height: 1.25;
        }
        .edu-school {
          color: #64748b;
          font-size: 7.9pt;
          margin-top: 0.7mm;
        }
        .edu-date {
          color: #0369a1;
          background: #e0f2fe;
          border: 0.6px solid #bae6fd;
          border-radius: 99px;
          padding: 0.7mm 2.4mm;
          font-size: 7.35pt;
          font-weight: 700;
          white-space: nowrap;
        }

        .projects { display: grid; gap: 2.5mm; }
        .project {
          border: 0.65px solid #dbe4ef;
          border-radius: 4mm;
          padding: 2.7mm 3.1mm;
          background: #ffffff;
          box-shadow: 0 4px 13px rgba(15, 23, 42, 0.045);
        }
        .project-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 4mm;
          margin-bottom: 1mm;
        }
        .project-title {
          color: #0f172a;
          font-size: 8.55pt;
          font-weight: 800;
        }
        .project-type {
          color: #0284c7;
          font-size: 7.35pt;
          font-weight: 700;
          white-space: nowrap;
        }
        .project-desc {
          color: #475569;
          font-size: 7.85pt;
          line-height: 1.39;
        }
        .project-link {
          color: #0f766e;
          font-weight: 700;
          word-break: break-word;
        }

        .experience-box {
          border-left: 1mm solid #22c55e;
          background: #f0fdf4;
          border-radius: 0 3.8mm 3.8mm 0;
          padding: 2.7mm 3.5mm;
        }

        .print-btn {
          position: fixed;
          right: 26px;
          bottom: 26px;
          border: none;
          cursor: pointer;
          z-index: 1000;
          color: #ffffff;
          background: #0f172a;
          border-radius: 999px;
          padding: 12px 23px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          font-weight: 800;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.28);
        }
        .print-btn:hover { filter: brightness(1.08); }

        /*
          Sous 840 px, la feuille A4 (794 px) ne rentre pas dans l'écran.
          On la met à l'échelle plutôt que de la réagencer : le PDF exporté
          doit rester identique au millimètre près.
        */
        @media screen and (max-width: 840px) {
          .cv-shell {
            overflow: hidden;
          }
          .cv-page {
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18) !important;
          }
          .print-btn {
            left: 16px;
            right: 16px;
            bottom: calc(16px + env(safe-area-inset-bottom, 0px));
            padding: 15px 20px;
            font-size: 15px;
            text-align: center;
          }
        }

        /* --echelle est posée par le composant : CSS ne sait pas diviser deux longueurs. */
        .cv-page {
          transform: scale(var(--echelle, 1));
          transform-origin: top left;
        }

        /* Le clone exporté ne doit jamais hériter de cette mise à l'échelle. */
        .cv-page.cv-export {
          transform: none !important;
        }
      `}</style>

      <button className="print-btn no-print" onClick={handleDownload}>
        Télécharger en PDF
      </button>

      <div className="cv-shell">
        <div className="cv-page">
        <aside className="sidebar">
          <div className="avatar">
            <img src={arfangPortrait} alt="Portrait de Arfang Souleymane Sané" />
          </div>

          <div className="side-section">
            <div className="side-title">Contact</div>
            <div className="contact-list">
              <div className="contact-item"><span className="contact-icon">L</span><span>Mbour / Saint-Louis, Sénégal</span></div>
              <div className="contact-item"><span className="contact-icon">M</span><a href="mailto:sanarfang429@gmail.com">sanarfang429@gmail.com</a></div>
              <div className="contact-item"><span className="contact-icon">T</span><span>+221 78 157 10 09</span></div>
              <div className="contact-item"><span className="contact-icon">W</span><a href="https://wa.me/221781571009" target="_blank" rel="noreferrer">wa.me/221781571009</a></div>
            </div>
          </div>

          <div className="side-section">
            <div className="side-title">Compétences clés</div>

            <div className="skill-group">
              <div className="skill-heading">Gestion & Management</div>
              <div className="side-tags">
                {managementSkills.map((skill) => <span key={skill} className="side-tag">{skill}</span>)}
              </div>
            </div>

            <div className="skill-group">
              <div className="skill-heading">Développement</div>
              <div className="side-tags">
                {devSkills.map((skill) => <span key={skill} className="side-tag">{skill}</span>)}
              </div>
            </div>

            <div className="skill-group">
              <div className="skill-heading">Design & Produit</div>
              <div className="side-tags">
                {designSkills.map((skill) => <span key={skill} className="side-tag">{skill}</span>)}
              </div>
            </div>
          </div>

          <div className="side-section">
            <div className="side-title">Langues</div>
            <div className="language-list">
              <div className="language-item"><strong>Français</strong><span>Excellent</span></div>
              <div className="language-item"><strong>Anglais</strong><span>Avancé</span></div>
              <div className="language-item"><strong>Wolof</strong><span>Excellent</span></div>
            </div>
          </div>

          <div className="side-section">
            <div className="side-title">Centres d'intérêt</div>
            <div className="interest-list">
              {interests.map((interest) => <span key={interest} className="side-tag">{interest}</span>)}
            </div>
          </div>
        </aside>

        <main className="main">
          <header className="header">
            <h1 className="name">Arfang Souleymane Sané</h1>
            <div className="title">Développeur Full-Stack · Gestionnaire · Designer</div>
            <div className="headline">
              Profil hybride MIAGE : développement d'applications, gestion d'entreprise, finance, design produit et conduite de projets numériques.
            </div>
          </header>

          <section className="section compact">
            <div className="section-title">Profil</div>
            <p className="text">
              Étudiant sénégalais en Master MIAGE à l'Université Gaston Berger de Saint-Louis, passionné par la technologie, l'innovation et l'entrepreneuriat. Formé en comptabilité, économie, finance d'entreprise et management de projet, je conçois des solutions numériques utiles aux entreprises et aux petites activités commerciales, de l'analyse des besoins au déploiement.
            </p>
          </section>

          <section className="section compact">
            <div className="section-title">Formation</div>
            <div className="education-list">
              <div className="edu-item">
                <div>
                  <div className="edu-degree">Master 2 — MIAGE</div>
                  <div className="edu-school">Université Gaston Berger, Saint-Louis</div>
                </div>
                <div className="edu-date">En cours</div>
              </div>

              <div className="edu-item">
                <div>
                  <div className="edu-degree">Licence — MIAGE</div>
                  <div className="edu-school">Université Gaston Berger, Saint-Louis</div>
                </div>
                <div className="edu-date">2023 — 2024</div>
              </div>

              <div className="edu-item">
                <div>
                  <div className="edu-degree">Baccalauréat Scientifique</div>
                  <div className="edu-school">Lycée Demba Diop, Mbour</div>
                </div>
                <div className="edu-date">2015 — 2020</div>
              </div>

              <div className="edu-item">
                <div>
                  <div className="edu-degree">BFEM — Brevet de Fin d'Études Moyennes</div>
                  <div className="edu-school">CES 2 Mbour</div>
                </div>
                <div className="edu-date">2011 — 2015</div>
              </div>
            </div>
          </section>

          <section className="section compact">
            <div className="section-title">Projets numériques</div>
            <div className="projects">
              <article className="project">
                <div className="project-head">
                  <div className="project-title">Africa Connection Tours — Site & back-office</div>
                  <div className="project-type">Projet client</div>
                </div>
                <p className="project-desc">
                  Site multilingue et back-office d'un tour-opérateur dakarois actif depuis 1996 : circuits, excursions et devis sur-mesure. <span className="project-link">act-senegal.com</span>
                </p>
              </article>

              <article className="project">
                <div className="project-head">
                  <div className="project-title">SamaCommerce — Gestion commerciale</div>
                  <div className="project-type">Projet personnel</div>
                </div>
                <p className="project-desc">
                  Application de gestion pour commerçants : stocks, ventes et suivi clients réunis dans une interface simple. <span className="project-link">samacommerce-web.onrender.com</span>
                </p>
              </article>

              <article className="project">
                <div className="project-head">
                  <div className="project-title">SamayTontines — Fintech</div>
                  <div className="project-type">Projet personnel</div>
                </div>
                <p className="project-desc">
                  Solution facilitant la gestion des tontines, des cotisations et des associations d'épargne rotatives. <span className="project-link">ma-tontine-frontend-1.onrender.com</span>
                </p>
              </article>

              <article className="project">
                <div className="project-head">
                  <div className="project-title">Campus Crush — Social étudiant</div>
                  <div className="project-type">Projet personnel</div>
                </div>
                <p className="project-desc">
                  Application de rencontres pensée pour les étudiants et les communautés universitaires.
                </p>
              </article>
            </div>
          </section>

          <section className="section">
            <div className="section-title">Expérience</div>
            <div className="experience-box">
              <p className="text">
                Pas encore d'expérience professionnelle formelle. Plusieurs projets personnels et académiques réalisés avec une approche complète : cadrage du besoin, conception, développement, tests, mise en ligne et amélioration continue.
              </p>
            </div>
          </section>
        </main>
        </div>
      </div>
    </>
  );
};

export default CV;
