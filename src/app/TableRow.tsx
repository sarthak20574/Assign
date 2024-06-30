
//TableRow.tsk
import React from 'react';
import TableCell from './TableCell';
import { useDrag, useDrop } from 'react-dnd';

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

  const [{ isDragging }, drag] = useDrag({
    type: 'row',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <tr ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
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
