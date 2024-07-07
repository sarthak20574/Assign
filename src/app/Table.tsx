// Table.tsx
import React, { useState, useCallback } from 'react';
import TableRow from './TableRow';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Table: React.FC = () => {
  const [rows, setRows] = useState<string[]>(['State 1', 'State 2']);
  const [variants, setVariants] = useState<string[]>(['Variant 1']);
  const [designs, setDesigns] = useState<{ [key: number]: { [key: number]: string } }>({});

  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    const newRows = [...rows];
    const newDesigns = { ...designs };

    // swapping
    [newRows[dragIndex], newRows[hoverIndex]] = [newRows[hoverIndex], newRows[dragIndex]];
    [newDesigns[dragIndex], newDesigns[hoverIndex]] = [newDesigns[hoverIndex], newDesigns[dragIndex]];

    setRows(newRows);
    setDesigns(newDesigns);
  }, [rows, designs]);

  const addRow = () => {
    setRows([...rows, `State ${rows.length + 1}`]);
  };

  const deleteRow = (index: number) => {
    const newRows = [...rows];
    const newDesigns = { ...designs };


    newRows.splice(index, 1);
    delete newDesigns[index];

    setRows(newRows);
    setDesigns(newDesigns);
  };

  const addVariant = () => {
    setVariants([...variants, `Variant ${variants.length + 1}`]);
  };

  const deleteVariant = (index: number) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);

 
    const newDesigns = { ...designs };
    Object.keys(newDesigns).forEach((rowIndex) => {
      delete newDesigns[parseInt(rowIndex)][index];
    });
    setDesigns(newDesigns);
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
      <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-gray-800">Manage Product Filters</h2>
          <button onClick={addVariant} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">
            <FaPlus className="mr-2" />
            Add Variant
          </button>
        </div>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left text-gray-800">Product Filters</th>
              {variants.map((variant, index) => (
                <th key={index} className="border px-4 py-2 text-left text-gray-800">
                  {variant}
                  <button
                    onClick={() => deleteVariant(index)}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded ml-2 shadow"
                  >
                    <FaTrash className="mr-1" />
                    Delete
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                index={rowIndex}
                row={row}
                variants={variants}
                designs={designs[rowIndex] || {}}
                deleteRow={deleteRow}
                updateDesign={updateDesign}
                moveRow={moveRow}
              />
            ))}
            <tr>
              <td colSpan={variants.length + 1} className="border px-4 py-2 text-center bg-gray-100">
                <button
                  onClick={addRow}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                >
                  <FaPlus className="mr-2" />
                  Add State
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DndProvider>
  );
};

export default Table;
