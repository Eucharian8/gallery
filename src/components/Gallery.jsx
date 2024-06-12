import React, { useState } from "react";
import { images } from "./Images";
import Modal from "react-modal";

Modal.setAppElement('#root');

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const[selectedImageIndex, setSelectedImageIndex] = useState(null);

  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const openModal = (index) =>{
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const showPrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : filteredImages.length - 1));
  };

  const showNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex < filteredImages.length - 1 ? prevIndex + 1 : 0));
  };


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
        {filteredImages.map((image, index) => (
          <div 
          key={image.id}
           className="border p-2 rounded shadow cursor-pointer"
           onClick={() => openModal(index)}>
            <img
              src={image.url}
              alt={image.name}
              className="w-full h-32 object-cover rounded"
            />
            <p className="mt-2 text-center">{image.name}</p>
          </div>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <Modal
        isOpen={selectedImageIndex !== null}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        contentLabel="Image Modal"
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
        overlayClassName=""
        >
          <div className="bg-white rounded-lg p-4 max-w-lg w-full relative">
          <div className="flex justify-end">
        <button onClick={closeModal} className="text-lg font-bold">X</button>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={showPrevImage} className="text-2xl font-bold p-2">&lt;</button>
      <div className="flex flex-col items-center">
        <img 
        src={filteredImages[selectedImageIndex].url} 
        alt={filteredImages[selectedImageIndex].name}
        className="w-full h-auto max-h-screen object-contain max-w-lg" />
        <p className="mt-2">{filteredImages[selectedImageIndex].name}</p>
      </div>
      <button onClick={showNextImage} className="text-2xl font-bold p-2">&gt;</button>
          </div>
      </div>  
        </Modal>
      )} 
    </div>
  );
};

export default Gallery;
