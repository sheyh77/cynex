import React from "react";
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";

function Projects() {
  const { t } = useTranslation();

  const projects = [
    {
      number: "01",
      category: t("projects.nexusCategory"),
      title: t("projects.nexusTitle"),
      description: t("projects.nexusDescription"),

      // Nexus Finance uchun maxsus tayyorlangan rasm
      image: "/images/nexus-finance.png",

      details: t("projects.nexusDetails"),

      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Prisma",
      ],

      link: "https://nexus.cynex.space/",
    },
  ];

  return (
    <section id="loyihalar" className="projects">
      <div className="projects-bg-grid"></div>

      <div className="projects-glow projects-glow-1"></div>
      <div className="projects-glow projects-glow-2"></div>

      <div className="container">
        <div className="projects-wrap">

          {/* HEADER */}
          <div className="projects-header">
            <div className="projects-label">
              <Sparkles size={15} />
              <span>{t("projects.label")}</span>
            </div>

            <h2 className="projects-title">
              {t("projects.titlePart1")}
              <span> {t("projects.titleHighlight")} </span>
              {t("projects.titlePart2")}
            </h2>

            <p className="projects-subtitle">
              {t("projects.subtitle")}
            </p>
          </div>

          {/* PROJECT */}
          <div className="projects-list">
            {projects.map((project) => (
              <article
                className="project-card"
                key={project.number}
              >
                {/* IMAGE */}
                <div className="project-visual">
                  <div className="project-number">
                    {project.number}
                  </div>

                  <div className="project-image-wrap">
                    <img
                      src={project.image}
                      alt={project.title}
                    />

                    <div className="project-image-overlay"></div>

                    <div className="project-image-top">
                      <div className="project-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>

                      <span>NEXUS FINANCE</span>
                    </div>

                    <div className="project-image-icon">
                      <Code2 size={20} />
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="project-content">
                  <div className="project-category">
                    <span></span>
                    {project.category}
                  </div>

                  <h3 className="project-name">
                    {project.title}
                  </h3>

                  <p className="project-description">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="project-tech">
                    {project.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="project-details">
                    <div className="project-details-heading">
                      <span>{t("projects.details")}</span>
                    </div>

                    <p>{project.details}</p>
                  </div>

                  {/* Button */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-button"
                  >
                    <span>{t("projects.view")}</span>

                    <span className="project-button-icon">
                      <ArrowUpRight size={18} />
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* BOTTOM */}
          <div className="projects-bottom">
            <div>
              <span className="projects-bottom-small">
                {t("projects.nextProject")}
              </span>

              <strong>
                {t("projects.yourIdea")}
              </strong>
            </div>

            <div className="projects-bottom-icon">
              <ExternalLink size={19} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Projects;