import React, { useRef, useState } from "react";
import styles from "./AvatarUpload.module.css";

type AvatarUploadProps = {
  required: boolean;
  onChange: (file: File | null) => void;
};
function AvatarUpload({ required, onChange }: AvatarUploadProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files?.length) {
      setImageFile(files[0]);
      onChange(files[0]);
    } else {
      setImageFile(null);
      onChange(null);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImageFile(event.target.files[0]);
      onChange(event.target.files[0]);
    } else {
      setImageFile(null);
      onChange(null);
    }
  };

  const handleAreaClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={styles.avatarContainer}>
      <span className={styles.label}>
        Avatar
        {required && <span className={styles.required}>*</span>}
      </span>
      {imageFile ? (
        <div className={styles.imageContainer}>
          <img
            className={styles.uploadedImage}
            src={URL.createObjectURL(imageFile)}
            alt="Uploaded avatar"
          />
          <div
            className={styles.removeImage}
            onClick={() => {
              setImageFile(null);
              onChange(null);
            }}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className={styles.dndContainer}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleAreaClick}
        >
          <p>
            <b>Choose a file</b> or drag it here.
          </p>
          <input
            ref={inputRef}
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}

export default AvatarUpload;
