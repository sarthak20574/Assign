// TableRow.tsx
import React from 'react';
import TableCell from './TableCell';
import { useDrag, useDrop } from 'react-dnd';
import { FaTrash, FaArrowsAlt } from 'react-icons/fa';

interface TableRowProps {
  index: number;
  row: string;
  variants: string[];
  designs: { [key: number]: string };
  deleteRow: (index: number) => void;
  updateDesign: (rowIndex: number, variantIndex: number, design: string) => void;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const TableRow: React.FC<TableRowProps> = ({ index, row, variants, designs, deleteRow, updateDesign, moveRow }) => {
  const ref = React.useRef<HTMLTableRowElement>(null);
  const [, drop] = useDrop({
    accept: 'row',
    hover: (item: { index: number }) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'row',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(preview(ref)));

  return (
    <tr ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="bg-white">
      <td className="border px-4 py-2 text-gray-800 flex items-center">
        <FaArrowsAlt className="mr-2 cursor-move text-gray-600" />
        {row}
        <button
          onClick={() => deleteRow(index)}
          className="flex items-center bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded ml-2 shadow"
        >
          <FaTrash className="mr-1" />
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
