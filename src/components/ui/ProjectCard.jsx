import React from "react";

export default function ProjectCard({ project }) {
  return (
    <a
      href={project.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="content-card w-40 sm:w-56 md:w-64 shrink-0 p-3 sm:p-4"
    >
      <div className="bg-brand-bg-alt h-24 sm:h-32 md:h-40 overflow-hidden rounded-lg">
        <img
          src={`https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 "
        />
      </div>
      <h3 className="card-title mt-3">{project.title}</h3>
      <p className="meta-text mt-3">{project.videoDate}</p>{" "}
    </a>
  );
}
