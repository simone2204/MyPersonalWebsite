import './App.css'
import translations from './translations';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation, scale } from 'framer-motion';

export default function MyApp() {
  const [selectedSection, setSelectedSection] = useState('Welcome');
  const [language, setLanguage] = useState('it'); 

  return (
    <div>
      <Navbar onSelect={setSelectedSection} language={language} setLanguage={setLanguage} />
      <MainPage section={selectedSection} language={language} />
    </div>
  );
}


function Navbar({ onSelect, language, setLanguage }) {
  return (
    <nav className='navbar'>
      <ul className="nav-list">
        <li><a href="#" onClick={e => { e.preventDefault(); onSelect('About Me'); }}>{language === 'it' ? 'Chi Sono' : 'About Me'}</a></li>
        <li><a href="#" onClick={e => { e.preventDefault(); onSelect('Projects'); }}>{language === 'it' ? 'Progetti' : 'Projects'}</a></li>
        <li><a href="#" onClick={e => { e.preventDefault(); onSelect('Hobbies'); }}>{language === 'it' ? 'Hobby' : 'Hobbies'}</a></li>
        <li><a href="#" onClick={e => { e.preventDefault(); onSelect('Passions'); }}>{language === 'it' ? 'Passioni' : 'Passions'}</a></li>
        <li className="dropdown">
          <a href="#">{language === 'it' ? 'Contatti' : 'Contact Me'}</a>
          <div className="dropdown-content">
            <p>Email: simo-arena@hotmail.it</p>
            <p>Telefono:+39 331 42 89 230</p>
          </div>
        </li>
        <li>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="language-select">
            <option value="it">🇮🇹 IT</option>
            <option value="en">🇬🇧 EN</option>
          </select>
        </li>
      </ul>
    </nav>
  );
}


const variantsBySection = {
  'Welcome': {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.5 } },
  },

  'About Me': {
    initial: { x: -100, opacity: 1, scale: 0.8 },
  animate: { x: 0, opacity: 1, scale: 1, transition: { duration: 0 } },
  exit: { x: 100, opacity: 0, scale: 0.8, transition: { duration: 0 } },
  },

  'Projects': {
    initial: { y: 300, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 50 } },
  exit: { }
  },

  'Hobbies': {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 }
  },
  
  'Passions': {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 }
  }
};

function FloatingText({ children }) {
  const controls = useAnimation();

  useEffect(() => {
    async function sequence() {
      // prima fa apparire il testo
      await controls.start({ opacity: 1, y: 0, rotate: 0, transition: { duration: 1.2, ease: "easeOut" } });
      // poi avvia il loop di oscillazione
      controls.start({
        y: [0, 1, 0, -1, 0],
        x: [0, 0.5, 0, -0.5, 0],
        rotate: [0, 2, 0, -2, 10],
        transition: {
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }
      });
    }
    sequence();
  }, [controls]);

  return (
    <motion.div
      className="welcome-text"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      // rimuovi transition dal motion.div perché gestita da controls
    >
      {children}
    </motion.div>
  );
}



function MainPage({ section, language }) {
  const currentSection = section || 'Welcome';
  const [projectView, setProjectView] = useState(null);

  let content;
  switch (currentSection) {
    case 'Welcome':
  content = (
    <FloatingText>
      {translations[language].welcome}
    </FloatingText>
  );
  break;



/*OGGETTO ABOUT ME*/
  case 'About Me':
  content = (
    <div className="about-me-content">
      <motion.img
        src="/foto_0.jpg"
        alt="Foto profilo"
        className="profile-pic"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      <div className="about-text-container">
        <div className="about-text">
  <h1>{translations[language].aboutMeTitle}</h1>
  <p dangerouslySetInnerHTML={{ __html: translations[language].aboutMeText }} />
</div>

        
      </div>
    </div>
  );
  break;

  
/*OGGETTO PROJECTS*/
case 'Projects':
  content = (
    <AnimatePresence mode="wait">
      {projectView === null ? (
        <motion.div
          key="projects-list"
          className="projects-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <h1 className="projects-title">Ecco alcuni dei miei progetti</h1>
          <div className="projects-grid">
            <motion.div
              className="project-card"
              whileHover={{ scale: 1.05 }}
              onClick={() => setProjectView('project1')}
            >
              <h3>Progetto IA Educativa</h3>
              <p>Implementazione di LLAMA e Chat-GPT</p>
              <p>Clicca per vedere i dettagli</p>
            </motion.div>

            <motion.div
              className="project-card"
              whileHover={{ scale: 1.05 }}
              onClick={() => setProjectView('project2')}
            >
              <h3>Progetto IA OFFLINE</h3>
              <p>Un piccolo cervello elettronico che non ha bisogno di connessione internet</p>
              <p>Clicca per vedere i dettagli</p>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={projectView}
          className="project-detail"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <button className="back-button" onClick={() => setProjectView(null)}>← Torna ai progetti</button>

          {projectView === 'project1' && (
            <>
              <h2>Progetto Tesi Uni: A Langchain Agent to support study and learning</h2>
              <p>
        Il progetto riguarda la realizzazione di un'applicazione, sviluppata attraverso il linguaggio Python, che permette ad un qualsiasi utente di interagire con un modello di Intelligenza Artificiale (LLAMA e Chat-GPT). Più nel dettaglio, quando l'applicazione si avvia, viene mostrata un'interfaccia user friendly. L'utente, cliccando sull'apposito pulsante, può condividere qualsiasi file in formato PDF (non importa la grandezza del file, ma file più grandi impiegano più tempo a caricarsi). Il documento condiviso può essere di qualsiasi natura: matematica, filosofia, algebra, letteratura, scienze, ecc... <br />
        Una volta che il documento viene caricato, sarà l'applicazione stessa a notificarlo, l'utente può interrogare l'IA, discutendo sul contenuto del documento.
        <br />
        Il progetto nasce con l'intento di sviluppare un'applicazione che mostra come il modello di IA utilizzato integri le informazioni che conosce già (fase di pretraining di ogni modello di IA), con conoscenze nuove, aggiornate ed affidabili, e che al contempo offra informazioni utili all'utente, il quale impara insieme all'IA.
      </p>
              <div className="project-link-box">
                <h3>Codice sorgente su GitHub</h3>
                <a
                  href="https://github.com/simone2204/ChatBot-OpenAI.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  → Vai al repository GitHub
                </a>
                <p>Troverai due implementazioni: una usa il modello IA di LLAMA e l'altra Chat GPT 3.5 Turbo di OpenAI.</p>
              </div>
            </>
          )}

          {projectView === 'project2' && (
            <>
              <h2>Progetto IA OFFLINE: Un cervello elettronico senza internet</h2>
              <p>
                Questo progetto nasce dal desiderio di creare un'applicazione IA capace di funzionare completamente offline, sfruttando modelli pre-addestrati localmente. È stato sviluppato usando Python, con l'uso di LLM leggeri come LLAMA 3.2-3B Instruct e strumenti di inferenza locale. Le risposte e i tempi di caricamento sono molto lenti, ma con sistemi molto buoni (ottime CPU,GPU e RAM), i modelli riescono ad essere abbastanza performanti.
                <br /><br />
                L'obiettivo era dimostrare come anche su macchine non connesse alla rete sia possibile ottenere risposte intelligenti e coerenti, caricando modelli linguistici attraverso librerie Python come `transformers`, `torch`, etc.
                <br /><br />
                Utile per ambienti isolati, didattica o ambienti senza accesso a Internet (es. scuole, zone rurali).
              </p>
              <div className="project-link-box">
                <h3>Codice su GitHub</h3>
                <p>Qui trovi il codice del chatbot offline e le istruzioni per eseguire il modello IA in locale:</p>
                <a
                  href="https://github.com/simone2204/LLAMA-AI-LOCAL.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  → Vai al repository GitHub
                </a>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
  break;



  
      
  case 'Hobbies':
    content = (
      <div className="hobbies-section">
        <h1 className="hobbies-title">Questi sono i miei hobby</h1>
        <div className="hobbies-grid">
          <motion.div className="hobby-card" whileHover={{ scale: 1.05 }}>
            <h3>✈️ Viaggiare</h3>
            <p>Amo esplorare nuove città, culture e paesaggi, soprattutto in Europa.</p>
          </motion.div>
  
          <motion.div className="hobby-card" whileHover={{ scale: 1.05 }}>
            <h3>♟️ Giocare a Scacchi</h3>
            <p>Mi alleno ogni giorno e adoro la sfida mentale che offrono gli scacchi.</p>
          </motion.div>
  
          <motion.div className="hobby-card" whileHover={{ scale: 1.05 }}>
            <h3>📚 Leggere</h3>
            <p>Mi piacciono i romanzi classici, fantascientifici e la divulgazione scientifica.</p>
          </motion.div>
  
          <motion.div className="hobby-card" whileHover={{ scale: 1.05 }}>
            <h3>🎮 Videogiochi</h3>
            <p>Gioco per rilassarmi e immergermi in mondi fantastici e stimolanti.</p>
          </motion.div>
  
          <motion.div className="hobby-card" whileHover={{ scale: 1.05 }}>
            <h3>🎬 Cinema & Serie TV</h3>
            <p>Adoro guardare film di ogni genere e seguire serie coinvolgenti.</p>
          </motion.div>
        </div>
      </div>
    );
    break;
  

    case 'Passions':
      content = <h1>Le mie più grandi passioni!</h1>;
      break;

    default:
      content = <h1>Sezione non trovata.</h1>;
  }

  // Prendi le animazioni per la sezione corrente
  const variants = variantsBySection[section] || {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className={`card-container
      ${currentSection === 'Welcome' ? 'welcome-bg' : ''}
      ${currentSection === 'About Me' ? 'aboutme-bg' : ''}
      ${currentSection === 'Projects' ? 'projects-bg' : ''}
      ${currentSection === 'Hobbies' ? 'hobbies-bg' : ''}
    `}>
    
      <AnimatePresence mode="wait">
        <motion.div
          key={section}
          className="card"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
  
  
}