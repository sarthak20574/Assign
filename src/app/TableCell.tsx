//TableCell.tsk


import React from 'react';
import { FaUpload } from 'react-icons/fa';

interface TableCellProps {
  rowIndex: number;
  variantIndex: number;
  design: string;
  updateDesign: (rowIndex: number, variantIndex: number, design: string) => void;
}

const TableCell: React.FC<TableCellProps> = ({ rowIndex, variantIndex, design, updateDesign }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          updateDesign(rowIndex, variantIndex, reader.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <td className="border px-4 py-2">
      {design.startsWith('data:image') ? (
        <img src={design} alt="uploaded" className="w-full h-auto" />
      ) : (
        <input
          type="text"
          value={design}
          onChange={(e) => updateDesign(rowIndex, variantIndex, e.target.value)}
          className="w-full border rounded p-1 mb-2"
        />
      )}
      <label className="flex items-center justify-center bg-blue-500 text-white px-2 py-1 rounded cursor-pointer">
        <FaUpload className="mr-2" />
        Upload
        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </label>
    </td>
  );
};

export default TableCell;
