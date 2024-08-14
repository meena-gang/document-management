// src/components/PrivacyToggle.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

interface PrivacyToggleProps {
  currentPrivacy: 'public' | 'private';
  onPrivacyChange: (privacy: 'public' | 'private') => void;
}

const PrivacyToggle: React.FC<PrivacyToggleProps> = ({ currentPrivacy, onPrivacyChange }) => {
  const { register, handleSubmit } = useForm<{ privacy: 'public' | 'private' }>();

  const onSubmit = (data: { privacy: 'public' | 'private' }) => {
    onPrivacyChange(data.privacy);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-4">
      <select
        {...register('privacy')}
        defaultValue={currentPrivacy}
        onChange={e => onPrivacyChange(e.target.value as 'public' | 'private')}
        className="border p-2"
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2">Update Privacy</button>
    </form>
  );
};

export default PrivacyToggle;
