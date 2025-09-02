
"use client";

import { useState, useRef, useCallback } from 'react';

interface FileWithPreview extends File {
  preview?: string;
}

interface UploadProps {
  onFileSelect?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
}

function Upload({ 
  onFileSelect, 
  maxFiles = 5, 
  maxSize = 10, 
  acceptedTypes = ['image/*', 'text/*', 'application/pdf'],
  className = ''
}: UploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File "${file.name}" is too large. Maximum size is ${maxSize}MB.`;
    }

    // Check file type
    const isValidType = acceptedTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.slice(0, -1));
      }
      return file.type === type;
    });

    if (!isValidType) {
      return `File "${file.name}" is not a supported file type.`;
    }

    return null;
  };

  const createFilePreview = (file: File): FileWithPreview => {
    const fileWithPreview = file as FileWithPreview;
    if (file.type.startsWith('image/')) {
      fileWithPreview.preview = URL.createObjectURL(file);
    }
    return fileWithPreview;
  };

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const validFiles: FileWithPreview[] = [];
    const newErrors: string[] = [];

    // Check if adding these files would exceed maxFiles limit
    if (files.length + fileArray.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed.`);
    }

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        validFiles.push(createFilePreview(file));
      }
    });

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      onFileSelect?.(validFiles);
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors([]), 5000); // Clear errors after 5 seconds
    }
  }, [files.length, maxFiles, maxSize, acceptedTypes, onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles);
    }
  }, [handleFiles]);

  const removeFile = useCallback((index: number) => {
    const fileToRemove = files[index];
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, [files]);

  const clearAllFiles = useCallback(() => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
  }, [files]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Drag and Drop Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${files.length > 0 ? 'mt-4' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {isDragOver ? 'Drop files here' : 'Drag and drop files here'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              or <span className="text-blue-600 dark:text-blue-400 font-medium">click to browse</span>
            </p>
          </div>
          
          <div className="text-xs text-gray-400 dark:text-gray-500">
            <p>Max {maxFiles} files, up to {maxSize}MB each</p>
            <p>Supported: {acceptedTypes.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Upload Errors</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Selected Files ({files.length})
            </h3>
            <button
              onClick={clearAllFiles}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
            >
              Clear All
            </button>
          </div>
          
          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                {/* File Preview/Icon */}
                <div className="flex-shrink-0 w-10 h-10">
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* File Info */}
                <div className="ml-4 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFile(index)}
                  className="ml-4 flex-shrink-0 p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;