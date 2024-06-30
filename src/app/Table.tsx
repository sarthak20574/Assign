//Table.tsk

import React, { useState, useCallback } from 'react';
import TableRow from './TableRow';
import { FaPlus } from 'react-icons/fa';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Table: React.FC = () => {
  const [rows, setRows] = useState<string[]>(['State 1', 'State 2']);
  const [variants, setVariants] = useState<string[]>(['Variant 1']);
  const [designs, setDesigns] = useState<{ [key: number]: { [key: number]: string } }>({});

  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    const newRows = [...rows];
    const [draggedRow] = newRows.splice(dragIndex, 1);
    newRows.splice(hoverIndex, 0, draggedRow);
    setRows(newRows);
  }, [rows]);

  const addRow = () => {
    setRows([...rows, `State ${rows.length + 1}`]);
  };

  const deleteRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants([...variants, `Variant ${variants.length + 1}`]);
  };

  const deleteVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateDesign = (rowIndex: number, variantIndex: number, design: string) => {
    const newDesigns = { ...designs };
    if (!newDesigns[rowIndex]) {
      newDesigns[rowIndex] = {};
    }
    newDesigns[rowIndex][variantIndex] = design;
    setDesigns(newDesigns);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto my-4">
        <div className="mb-4 flex justify-between">
          <button onClick={addRow} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
            <FaPlus className="mr-2" />
            Add State
          </button>
          <button onClick={addVariant} className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
            <FaPlus className="mr-2" />
            Add Variant
          </button>
        </div>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-black">Product Filters</th>
              {variants.map((variant, index) => (
                <th key={index} className="border px-4 py-2 text-black">
                  {variant}
                  <button onClick={() => deleteVariant(index)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                    Delete
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={row}
                index={rowIndex}
                row={row}
                variants={variants}
                designs={designs[rowIndex] || {}}
                deleteRow={deleteRow}
                updateDesign={updateDesign}
                moveRow={moveRow}
              />
            ))}
          </tbody>
        </table>
      </div>
    </DndProvider>
  );
};

export default Table;
