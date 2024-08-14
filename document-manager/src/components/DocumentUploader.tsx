import React, { useState } from 'react';

interface DocumentUploaderProps {
  userId: string; // Pass user ID as a prop
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ userId }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (!file || !title || !description) return;

  // Prepare metadata as a JSON object
  const documentData = {
    title,
    description,
    file: file.name, // Store the file name or path
    privacy,
    uploaderId: userId, // Attach uploader ID
  };

  setSubmitting(true);

  try {
    const response = await fetch('http://localhost:5000/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set content type to JSON
      },
      body: JSON.stringify(documentData), // Send JSON data
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Document uploaded successfully:', result);
    } else {
      console.error('Error uploading document:', await response.text());
    }
  } catch (error) {
    console.error('Error uploading document:', error);
  } finally {
    setSubmitting(false);
  }
};

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (!file || !title || !description) return;

  //   const formData = new FormData();
  //   formData.append('title', title);
  //   formData.append('description', description);
  //   formData.append('file', file);
  //   formData.append('privacy', privacy);
  //   formData.append('uploaderId', userId); // Attach uploader ID

  //   setSubmitting(true);

  //   try {
  //     const response = await fetch('http://localhost:5000/documents', {
  //       method: 'POST',
  //       // body: formData,
  //       body: JSON.stringify(formData),
  //    });
  //    const result = await response.json();
  //    console.log('Document uploaded successfully:', result);
      
  //   } catch (error) {
  //     console.error('Error uploading document:', error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit} className='uploadForm'>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={handleFileChange}
        required
      />
      <select value={privacy} onChange={(e) => setPrivacy(e.target.value as 'public' | 'private')}>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Uploading...' : 'Upload Document'}
      </button>
    </form>
  );
};

export default DocumentUploader;
