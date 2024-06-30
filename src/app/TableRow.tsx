
//TableRow.tsk

import React from 'react';
import TableCell from './TableCell';

interface TableRowProps {
  index: number;
  row: string;
  variants: string[];
  designs: { [key: number]: string };
  deleteRow: (index: number) => void;
  updateDesign: (rowIndex: number, variantIndex: number, design: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({ index, row, variants, designs, deleteRow, updateDesign }) => {
  return (
    <tr>
      <td className="border px-4 py-2 text-black">
        {row}
        <button onClick={() => deleteRow(index)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
          Delete
        </button>
      </td>
      {variants.map((variant, variantIndex) => (
        <TableCell
          key={variantIndex}
          rowIndex={index}
          variantIndex={variantIndex}
          design={designs[variantIndex] || ''}
          updateDesign={updateDesign}
        />
      ))}
    </tr>
  );
};

export default TableRow;
