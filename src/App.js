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
      <ul className='Profiles-List'>
        <li><a href="https://github.com/simone2204">GitHub Profile</a></li>
        <li><a href="https://www.linkedin.com/in/simone-arena-502b48a0/">Linkedin Profile</a></li>
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
};

function FloatingText({ children }) {
  const controls = useAnimation();

  useEffect(() => {
    async function sequence() {
      // prima fa apparire il testo
      await controls.start({ 
        opacity: 1, 
        y: 0, 
        rotate: 0, 
        transition: { duration: 1.2, ease: "easeOut" } });
      // poi avvia il loop di oscillazione
      controls.start({
        y: [0, 1, 0, -1, 0],
        x: [0, 0.5, 0, -0.5, 0],
        rotate: [0, 1, 0, -1, 0],
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
        transition={{ duration: 1, ease: "easeOut" }}
      />

      <motion.div
  className="about-text-container"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
>
  <div className="about-text">
    <h1>{translations[language].aboutMeTitle}</h1>
    <p dangerouslySetInnerHTML={{ __html: translations[language].aboutMeText }} />
  </div>
</motion.div>

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
          <h1 className="projects-title">{translations[language].projectsTitle}</h1>
          <div className="projects-grid">
            <motion.div
              className="project-card"
              whileHover={{ scale: 1.05 }}
              onClick={() => setProjectView('project1')}
            >
              <h3>{translations[language].project1.shortTitle}</h3>
              <p>{translations[language].project1.shortDesc}</p>
              <p>{translations[language].project1.clickDetails}</p>
            </motion.div>

            <motion.div
              className="project-card"
              whileHover={{ scale: 1.05 }}
              onClick={() => setProjectView('project2')}
            >
              <h3>{translations[language].project2.shortTitle}</h3>
              <p>{translations[language].project2.shortDesc}</p>
              <p>{translations[language].project2.clickDetails}</p>
            </motion.div>
            
            <motion.div
              className="project-card"
              whileHover={{ scale: 1.05 }}
              onClick={() => setProjectView('project3')}
            >
              <h3>{translations[language].project3.shortTitle}</h3>
              <p>{translations[language].project3.shortDesc}</p>
              <p>{translations[language].project3.clickDetails}</p>
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
          <button className="back-button" onClick={() => setProjectView(null)}>
            {translations[language].backToProjects}
          </button>

          {projectView === 'project1' && (
            <>
              <h2>{translations[language].project1.fullTitle}</h2>
              <p dangerouslySetInnerHTML={{ __html: translations[language].project1.fullDesc }} />
              <div className="project-link-box">
                <h3>{translations[language].project1.githubTitle}</h3>
                <a
                  href="https://github.com/simone2204/ChatBot-OpenAI.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  → GitHub
                </a>
                <p>{translations[language].project1.githubText}</p>
              </div>
            </>
          )}

          {projectView === 'project2' && (
            <>
              <h2>{translations[language].project2.fullTitle}</h2>
              <p dangerouslySetInnerHTML={{ __html: translations[language].project2.fullDesc }} />
              <div className="project-link-box">
                <h3>{translations[language].project2.githubTitle}</h3>
                <p>{translations[language].project2.githubText}</p>
                <a
                  href="https://github.com/simone2204/LLAMA-AI-LOCAL.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  → GitHub
                </a>
              </div>
            </>
          )}

                 {projectView === 'project3' && (
          <>
            <h2>{translations[language].project3.fullTitle}</h2>
            <p dangerouslySetInnerHTML={{ __html: translations[language].project3.fullDesc }} />
            <div className="project-link-box">
              <h3>{translations[language].project3.githubTitle}</h3>
              <a
                href="https://github.com/simone2204/FilesManagement_App-with-LLAMA-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                → GitHub
              </a>
              <p>{translations[language].project3.githubText}</p>
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
      <h1 className="hobbies-title">{translations[language].hobbiesTitle}</h1>
      <div className="hobbies-grid">
        <motion.div className="hobby-card" whileHover={{ scale: 1.05 }}>
          <h3>{translations[language].hobbies.travelTitle}</h3>
          <p>{translations[language].hobbies.travelText}</p>
        </motion.div>

        <motion.div className="hobby-card" whileHover={{ scale: 1.05 }}>
          <h3>{translations[language].hobbies.chessTitle}</h3>
          <p>{translations[language].hobbies.chessText}</p>
        </motion.div>

        <motion.div className="hobby-card" whileHover={{ scale: 1.05 }}>
          <h3>{translations[language].hobbies.readingTitle}</h3>
          <p>{translations[language].hobbies.readingText}</p>
        </motion.div>

        <motion.div className="hobby-card" whileHover={{ scale: 1.05 }}>
          <h3>{translations[language].hobbies.gamingTitle}</h3>
          <p>{translations[language].hobbies.gamingText}</p>
        </motion.div>

        <motion.div className="hobby-card" whileHover={{ scale: 1.05 }}>
          <h3>{translations[language].hobbies.cinemaTitle}</h3>
          <p>{translations[language].hobbies.cinemaText}</p>
        </motion.div>
      </div>
    </div>
  );
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