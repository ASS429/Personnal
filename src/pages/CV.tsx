const CV = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #f5f5f5; }

        .cv-page {
          font-family: 'Inter', sans-serif;
          font-size: 10pt;
          color: #1a1a1a;
          background: #fff;
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          padding: 18mm 18mm 16mm 18mm;
          line-height: 1.5;
        }

        @media print {
          body { background: #fff; }
          .cv-page { margin: 0; padding: 15mm 16mm 14mm 16mm; box-shadow: none; }
          .no-print { display: none !important; }
        }

        @media screen {
          .cv-page { box-shadow: 0 4px 32px rgba(0,0,0,0.12); margin: 32px auto; }
        }

        /* Header */
        .cv-name {
          font-size: 28pt;
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .cv-title {
          font-size: 9pt;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 10px;
        }
        .cv-contact {
          font-size: 9pt;
          color: #444;
          display: flex;
          flex-wrap: wrap;
          gap: 4px 12px;
          margin-bottom: 2px;
        }
        .cv-contact a { color: #444; text-decoration: none; }
        .cv-divider {
          border: none;
          border-top: 1.5px solid #1a1a1a;
          margin: 12px 0 16px 0;
        }

        /* Sections */
        .cv-section { margin-bottom: 18px; }
        .cv-section-title {
          font-size: 9.5pt;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-bottom: 1px solid #ddd;
          padding-bottom: 4px;
          margin-bottom: 12px;
        }

        /* Formation */
        .cv-edu-item { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
        .cv-edu-item-left {}
        .cv-edu-degree { font-weight: 600; font-size: 10pt; }
        .cv-edu-school { font-size: 9pt; color: #555; }
        .cv-edu-date { font-size: 9pt; color: #777; font-style: italic; white-space: nowrap; }

        /* Compétences */
        .cv-skills-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px 16px; }
        .cv-skills-col-title { font-weight: 600; font-size: 9.5pt; margin-bottom: 6px; }
        .cv-tags { display: flex; flex-wrap: wrap; gap: 4px; }
        .cv-tag {
          border: 1px solid #ccc;
          border-radius: 99px;
          padding: 1px 8px;
          font-size: 8.5pt;
          color: #333;
          white-space: nowrap;
        }

        /* Projets */
        .cv-project { margin-bottom: 10px; }
        .cv-project-header { display: flex; justify-content: space-between; align-items: baseline; }
        .cv-project-title { font-weight: 600; font-size: 10pt; }
        .cv-project-type { font-size: 9pt; color: #777; font-style: italic; }
        .cv-project-desc { font-size: 9pt; color: #444; margin-top: 2px; }
        .cv-project-link { color: #555; font-size: 8.5pt; }

        /* Profil / Expérience */
        .cv-text { font-size: 9.5pt; color: #333; line-height: 1.6; text-align: justify; }

        /* Langues */
        .cv-langs { display: flex; gap: 20px; flex-wrap: wrap; }
        .cv-lang { font-size: 9.5pt; }
        .cv-lang strong { font-weight: 600; }

        /* Intérêts */
        .cv-interests { display: flex; gap: 6px; flex-wrap: wrap; }

        /* Print button */
        .print-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 99px;
          padding: 12px 24px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
          z-index: 100;
          font-family: 'Inter', sans-serif;
        }
        .print-btn:hover { background: #333; }
      `}</style>

      <button className="print-btn no-print" onClick={() => window.print()}>
        Télécharger en PDF
      </button>

      <div className="cv-page">
        {/* Header */}
        <div className="cv-name">Arfang Souleymane Sané</div>
        <div className="cv-title">Développeur Full-Stack · Gestionnaire · Designer</div>
        <div className="cv-contact">
          <span>Mbour / Saint-Louis, Sénégal</span>
          <a href="mailto:sanarfang429@gmail.com">sanarfang429@gmail.com</a>
          <span>+221 78 157 10 09</span>
          <a href="https://wa.me/221781571009" target="_blank" rel="noreferrer">wa.me/221781571009</a>
        </div>
        <hr className="cv-divider" />

        {/* Profil */}
        <div className="cv-section">
          <div className="cv-section-title">Profil</div>
          <p className="cv-text">
            Étudiant sénégalais en Master MIAGE (Méthodes Informatiques Appliquées à la Gestion des Entreprises)
            à l'Université Gaston Berger de Saint-Louis, passionné par la technologie, l'innovation et
            l'entrepreneuriat. Formé en comptabilité, économie, finance d'entreprise et management de projet,
            je pilote des initiatives de bout en bout — de l'analyse des besoins au déploiement. Je conçois et
            développe des applications numériques pour faciliter la gestion des entreprises et des petites activités
            commerciales. Créatif et ambitieux, je mène également des projets entrepreneuriaux, notamment dans
            l'agriculture et les services numériques.
          </p>
        </div>

        {/* Formation */}
        <div className="cv-section">
          <div className="cv-section-title">Formation</div>

          <div className="cv-edu-item">
            <div className="cv-edu-item-left">
              <div className="cv-edu-degree">Master 2 — MIAGE</div>
              <div className="cv-edu-school">Université Gaston Berger, Saint-Louis</div>
            </div>
            <div className="cv-edu-date">En cours</div>
          </div>

          <div className="cv-edu-item">
            <div className="cv-edu-item-left">
              <div className="cv-edu-degree">Licence — MIAGE</div>
              <div className="cv-edu-school">Université Gaston Berger, Saint-Louis</div>
            </div>
            <div className="cv-edu-date">2023 — 2024</div>
          </div>

          <div className="cv-edu-item">
            <div className="cv-edu-degree">Baccalauréat Scientifique</div>
            <div className="cv-edu-date">2015 — 2020</div>
          </div>
          <div className="cv-edu-school" style={{ marginBottom: 6, marginTop: -4 }}>Lycée Demba Diop, Mbour</div>

          <div className="cv-edu-item">
            <div className="cv-edu-degree">BFEM — Brevet de Fin d'Études Moyennes</div>
            <div className="cv-edu-date">2011 — 2015</div>
          </div>
          <div className="cv-edu-school" style={{ marginTop: -4 }}>CES 2 Mbour</div>
        </div>

        {/* Compétences */}
        <div className="cv-section">
          <div className="cv-section-title">Compétences</div>
          <div className="cv-skills-grid">
            <div>
              <div className="cv-skills-col-title">Gestion & Management</div>
              <div className="cv-tags">
                <span className="cv-tag">Comptabilité</span>
                <span className="cv-tag">Économie</span>
                <span className="cv-tag">Finance d'entreprise</span>
                <span className="cv-tag">Management de projet</span>
                <span className="cv-tag">Gestion d'entreprise</span>
              </div>
            </div>
            <div>
              <div className="cv-skills-col-title">Développement</div>
              <div className="cv-tags">
                <span className="cv-tag">Frontend (React, Tailwind)</span>
                <span className="cv-tag">Backend / APIs</span>
                <span className="cv-tag">Bases de données</span>
                <span className="cv-tag">Full-stack</span>
                <span className="cv-tag">Git</span>
              </div>
            </div>
            <div>
              <div className="cv-skills-col-title">Design & Produit</div>
              <div className="cv-tags">
                <span className="cv-tag">Design visuel</span>
                <span className="cv-tag">Identité de marque</span>
                <span className="cv-tag">UI / UX</span>
                <span className="cv-tag">Typographie</span>
                <span className="cv-tag">Figma</span>
              </div>
            </div>
          </div>
        </div>

        {/* Projets */}
        <div className="cv-section">
          <div className="cv-section-title">Projets</div>

          <div className="cv-project">
            <div className="cv-project-header">
              <span className="cv-project-title">SamaCommerce — Gestion commerciale</span>
              <span className="cv-project-type">Projet personnel</span>
            </div>
            <p className="cv-project-desc">
              Application qui simplifie la gestion pour les commerçants : stocks, ventes et suivi clients réunis en un seul endroit.{" "}
              <span className="cv-project-link">samacommerce-frontend-v2-1.onrender.com</span>
            </p>
          </div>

          <div className="cv-project">
            <div className="cv-project-header">
              <span className="cv-project-title">SamayTontines — Fintech</span>
              <span className="cv-project-type">Projet personnel</span>
            </div>
            <p className="cv-project-desc">
              Application qui facilite la gestion des tontines (associations d'épargne et de crédit rotatives).{" "}
              <span className="cv-project-link">matontine-frontend-1.onrender.com</span>
            </p>
          </div>

          <div className="cv-project">
            <div className="cv-project-header">
              <span className="cv-project-title">Campus Crush — Social</span>
              <span className="cv-project-type">Projet personnel</span>
            </div>
            <p className="cv-project-desc">
              Application de rencontres pensée pour les étudiants, pour aider les communautés universitaires à se connecter.{" "}
              <span className="cv-project-link">campus-crush-h9df.onrender.com</span>
            </p>
          </div>
        </div>

        {/* Expérience */}
        <div className="cv-section">
          <div className="cv-section-title">Expérience</div>
          <p className="cv-text">
            Pas encore d'expérience professionnelle formelle. J'ai mené plusieurs projets personnels
            ambitieux et contribué à de nombreux projets académiques tout au long de mes études —
            en livrant de vraies applications de la conception au déploiement, et en aiguisant
            mon savoir-faire à chaque étape.
          </p>
        </div>

        {/* Langues */}
        <div className="cv-section">
          <div className="cv-section-title">Langues</div>
          <div className="cv-langs">
            <span className="cv-lang"><strong>Français</strong> — Excellent</span>
            <span className="cv-lang"><strong>Anglais</strong> — Excellent</span>
            <span className="cv-lang"><strong>Wolof</strong> — Excellent</span>
          </div>
        </div>

        {/* Centres d'intérêt */}
        <div className="cv-section">
          <div className="cv-section-title">Centres d'intérêt</div>
          <div className="cv-interests">
            {["Codage", "Études", "Sport", "Découvertes"].map((i) => (
              <span key={i} className="cv-tag">{i}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CV;
