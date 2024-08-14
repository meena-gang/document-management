// src/components/DocumentUploader.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import DocumentUploader from './DocumentUploader';

test('renders upload form', () => {
  render(<DocumentUploader userId="test-user-id" />);
  expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
});
