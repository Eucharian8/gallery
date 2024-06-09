import React, { useState } from "react";
import { images } from "./dummy";

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search..."
        className="mb-4 p-2 border rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredImages.map((image, i) => (
          <div key={image.id} className="border p-2 rounded shadow">
            <img
              src={image.url}
              alt={image.name}
              className="w-full h-32 object-cover rounded"
            />
            <p className="mt-2 text-center">{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
