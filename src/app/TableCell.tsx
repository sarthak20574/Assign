import React, { useState } from 'react';

interface TableCellProps {
  rowIndex: number;
  variantIndex: number;
  design?: string;
  updateDesign: (rowIndex: number, variantIndex: number, design: string) => void;
}

const TableCell: React.FC<TableCellProps> = ({ rowIndex, variantIndex, design, updateDesign }) => {
  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleDesignInsert = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      updateDesign(rowIndex, variantIndex, file);
    }
  };

  return (
    <td className="border px-4 py-2">
      {design && <img src={design} alt="Design" style={{ width: '50px', height: '50px' }} />}
      <button onClick={handleClick} className="bg-yellow-500 text-white px-2 py-1 rounded">
        Insert Design
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={handleDesignInsert}
        style={{ display: 'none' }}
        ref={(input) => setFileInput(input)}
      />
    </td>
  );
};

export default TableCell;
