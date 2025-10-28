import { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FileUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  bucketName?: string;
}

export default function FileUpload({
  label,
  value,
  onChange,
  accept = "*/*",
  bucketName = "brief-documents"
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      setFileName(file.name);
      onChange(data.publicUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Erreur lors du téléchargement du fichier');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFileName('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
          id={`file-upload-${label.replace(/\s+/g, '-')}`}
        />

        <label
          htmlFor={`file-upload-${label.replace(/\s+/g, '-')}`}
          className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer transition-colors ${
            uploading
              ? 'bg-gray-100 cursor-not-allowed'
              : 'hover:bg-gray-50'
          }`}
        >
          <Upload className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">
            {uploading ? 'Téléchargement...' : 'Choisir un fichier'}
          </span>
        </label>

        {(value || fileName) && (
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg flex-1">
            <File className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-900 truncate flex-1">
              {fileName || 'Fichier téléchargé'}
            </span>
            <button
              type="button"
              onClick={handleRemove}
              className="text-blue-600 hover:text-blue-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {value && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 mt-1 inline-block"
        >
          Voir le fichier
        </a>
      )}
    </div>
  );
}
