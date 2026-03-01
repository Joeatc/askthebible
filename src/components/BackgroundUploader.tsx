import React, { useRef } from 'react';

const STORAGE_KEY = 'askthebible_bg_image';

interface Props {
  backgroundImage: string | null;
  onChange: (dataUrl: string | null) => void;
}

export default function BackgroundUploader({ backgroundImage, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      localStorage.setItem(STORAGE_KEY, dataUrl);
      onChange(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    localStorage.removeItem(STORAGE_KEY);
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="background-uploader">
      <label className="selector-label">Background Image</label>
      <div className="uploader-row">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFile}
          className="file-input"
        />
        {backgroundImage && (
          <button className="remove-bg-button" onClick={handleRemove}>Remove</button>
        )}
      </div>
      {backgroundImage && (
        <div className="bg-preview">
          <img src={backgroundImage} alt="Background preview" className="bg-preview-img" />
        </div>
      )}
    </div>
  );
}

export { STORAGE_KEY };
