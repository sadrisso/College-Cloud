import React from "react";
import { ExternalLink } from "lucide-react";

const researchPapers = [
  {
    id: 1,
    title: "AI in Healthcare: Diagnosis Accuracy Boosted",
    description: "An in-depth study on how artificial intelligence can assist doctors in early disease detection.",
    link: "https://example.com/research/ai-healthcare",
  },
  {
    id: 2,
    title: "Renewable Energy Optimization in Urban Areas",
    description: "A practical approach to integrating solar and wind energy systems in crowded cities.",
    link: "https://example.com/research/renewable-energy",
  },
  {
    id: 3,
    title: "Data Privacy & Ethics in Social Media",
    description: "Exploring the ethical concerns of user data handling in major social platforms.",
    link: "https://example.com/research/data-ethics",
  },
];

const ResearchPapers = () => {
  return (
    <section className="py-10 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          📚 Student Research Highlights
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          These papers are proudly researched and published by our recommended college students.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchPapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-md transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{paper.title}</h3>
              <p className="text-gray-600 mb-4">{paper.description}</p>
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                Read Full Paper <ExternalLink size={16} className="ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchPapers;
