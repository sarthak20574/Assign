import React from 'react';
import TableCell from './TableCell';
import { DraggableProvided } from 'react-beautiful-dnd'; // Import DraggableProvided

interface TableRowProps {
  index: number;
  row: string;
  variants: string[];
  designs: { [key: number]: string };
  deleteRow: (index: number) => void;
  updateDesign: (rowIndex: number, variantIndex: number, design: string) => void;
  draggableProps: any;
  dragHandleProps: any;
  innerRef: (element: HTMLElement | null) => any;
}

const TableRow: React.FC<TableRowProps> = ({
  index,
  row,
  variants,
  designs,
  deleteRow,
  updateDesign,
  draggableProps,
  dragHandleProps,
  innerRef
}) => {
  return (
    <tr ref={innerRef} {...draggableProps}>
      <td className="border px-4 py-2 flex items-center">
        <button {...dragHandleProps} className="mr-2 cursor-grab">
          &#9776; {/* Unicode for a grab icon */}
        </button>
        {row}
      </td>
      {variants.map((_, variantIndex) => (
        <TableCell
          key={variantIndex}
          rowIndex={index}
          variantIndex={variantIndex}
          design={designs[variantIndex]}
          updateDesign={updateDesign}
        />
      ))}
      <td className="border px-4 py-2">
        <button onClick={() => deleteRow(index)} className="bg-red-500 text-white px-2 py-1 rounded">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
