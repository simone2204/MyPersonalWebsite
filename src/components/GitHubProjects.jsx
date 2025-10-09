import React, { useEffect, useState } from "react";

const GitHubProjects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Inserisci il tuo username GitHub
    fetch("https://api.github.com/users/simone2204/repos?sort=updated")
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((err) => console.error("Errore nel recupero dati GitHub:", err));
  }, []);

  if (loading) {
    return <p style={{ color: "white" }}>Caricamento dei progetti...</p>;
  }

  return (
    <div className="github-projects">
      <h2 className="github-title">📂 I miei progetti su GitHub</h2>
      <div className="github-grid">
        {repos.slice(0, 6).map((repo) => (
          <div key={repo.id} className="repo-card">
            <h3>{repo.name}</h3>
            <p>{repo.description || "Nessuna descrizione disponibile"}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              Vai al repository →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubProjects;