// TableCell.tsx
import React, { useState } from 'react';
import { FaUpload, FaTrash } from 'react-icons/fa';

interface TableCellProps {
  rowIndex: number;
  variantIndex: number;
  design: string;
  updateDesign: (rowIndex: number, variantIndex: number, design: string) => void;
}

const TableCell: React.FC<TableCellProps> = ({ rowIndex, variantIndex, design, updateDesign }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setIsUploading(true);
          setTimeout(() => {
            updateDesign(rowIndex, variantIndex, reader.result as string);
            setIsUploading(false);
            alert("Image uploaded successfully!");
          }, 1000);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDeleteImage = () => {
    setIsDeleting(true);
    setTimeout(() => {
      updateDesign(rowIndex, variantIndex, '');
      setIsDeleting(false);
      alert("Image deleted successfully!");
    }, 1000);
  };

  return (
    <td className="border px-4 py-2">
      {design.startsWith('data:image') ? (
        <>
          <img src={design} alt="uploaded" className="w-40 h-40 object-contain mb-2 mx-auto rounded-lg shadow" />
          <button
            onClick={handleDeleteImage}
            className={`flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded shadow w-full ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {isDeleting ? (
              <>Deleting...</>
            ) : (
              <>
                <FaTrash className="mr-2" />
                Delete Image
              </>
            )}
          </button>
        </>
      ) : (
        <input
          type="text"
          value={design}
          onChange={(e) => updateDesign(rowIndex, variantIndex, e.target.value)}
          className="w-full border rounded p-1 mb-2 shadow"
        />
      )}
      <label className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded cursor-pointer mt-2 shadow">
        {isUploading ? (
          <>Uploading...</>
        ) : (
          <>
            <FaUpload className="mr-2" />
            Upload
          </>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </label>
    </td>
  );
};

export default TableCell;
