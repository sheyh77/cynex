import React, { useEffect, useState } from 'react';

function Projects() {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch("https://e4347ee1f5d7b6e5.mokky.dev/projects")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error:", err));
  }, [])

  return (
    <section id='loyihalar' className="project" >
      <div className="container">
        <div className="project-wrap">
          <h1 className="projects-title">Loyihalarim</h1>
          <p className="projects-desc">Siz ham o'z biznesingiz uchun website yoki admin panel <br /> buyurtma berishingiz mumkin</p>
          <div className="projects-card">
            {
              projects.map((item) => (
                <a href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item.id}
                >
                  <div className="projects-card-item">
                    <div className="projects-card-item-sub">
                      <p className="project-card-item-sub-title">{item.title}</p>
                      <p className="projects-card-item-sub-desc">{item.desc}</p>
                    </div>
                    <div className="projects-card-item-img">
                      <img src={item.image} alt="project image" />
                    </div>
                  </div>
                </a>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects