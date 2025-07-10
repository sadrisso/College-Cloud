import React from "react";

const collegeImages = [
  {
    id: 1,
    src: "https://i.postimg.cc/zvQsjSvj/g-1.webp",
    alt: "Graduates Group - Engineering College",
  },
  {
    id: 2,
    src: "https://i.postimg.cc/MKM2G43r/g2.jpg",
    alt: "Graduates Group - Arts College",
  },
  {
    id: 3,
    src: "https://i.postimg.cc/13wkGFQG/g3.webp",
    alt: "Graduates Group - Business School",
  },
  {
    id: 4,
    src: "https://i.postimg.cc/zfN90fz9/g4.webp",
    alt: "Graduates Group - Medical College",
  },
  {
    id: 5,
    src: "https://i.postimg.cc/sXDbC0Zm/g5.jpg",
    alt: "Graduates Group - Science College",
  },
  {
    id: 6,
    src: "https://i.postimg.cc/Jn6vrcNL/g6.jpg",
    alt: "Graduates Group - Law College",
  },
];

const CollegeGallery = () => {
  return (
    <section className="py-10 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          🎓 College Image Gallery
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Take a look at the vibrant graduation moments from different colleges across the country.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {collegeImages.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-2xl shadow hover:scale-105 transition-transform duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollegeGallery;
