import React, { useRef, useState } from "react";
import { Upload, X, User, Crop } from "lucide-react";
import ImageCropModal from "./ImageCropModal";

const ImageUpload = ({ image, onImageUpdate }) => {
  const fileInputRef = useRef(null);
  const [tempImage, setTempImage] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size too large. Please select an image under 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage) => {
    onImageUpdate(croppedImage);
    setIsCropping(false);
    setTempImage(null);
  };

  const handleCancelCrop = () => {
    setIsCropping(false);
    setTempImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    onImageUpdate(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="image-upload-container">
      <label className="field-label">Profile Picture</label>
      <div className="upload-controls">
        <div className="image-preview-circle">
          {image ? (
            <img src={image} alt="Profile Preview" />
          ) : (
            <User size={32} className="placeholder-icon" />
          )}
        </div>
        
        <div className="upload-buttons">
          <button 
            className="btn-upload" 
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={16} /> {image ? "Change Photo" : "Upload Photo"}
          </button>
          
          <div className="secondary-actions">
            {image && (
              <button 
                className="btn-action-small" 
                onClick={() => {
                  setTempImage(image);
                  setIsCropping(true);
                }}
                title="Crop current image"
              >
                <Crop size={14} /> Recrop
              </button>
            )}
            {image && (
              <button className="btn-action-small danger" onClick={handleRemove}>
                <X size={14} /> Remove
              </button>
            )}
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      <p className="upload-hint">Square images work best. Max 2MB.</p>

      {isCropping && (
        <ImageCropModal
          image={tempImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCancelCrop}
        />
      )}
    </div>
  );
};

export default ImageUpload;
