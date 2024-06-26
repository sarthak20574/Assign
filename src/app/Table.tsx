import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import TableRow from './TableRow';
import TableCell from './TableCell';

const Table: React.FC = () => {
  const [rows, setRows] = useState<string[]>(['State 1', 'State 2']);
  const [variants, setVariants] = useState<string[]>(['Variant 1']); // Initial variant
  const [designs, setDesigns] = useState<{ [key: number]: { [key: number]: string } }>({});

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

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedRows = Array.from(rows);
    const [reorderedItem] = updatedRows.splice(result.source.index, 1);
    updatedRows.splice(result.destination.index, 0, reorderedItem);

    setRows(updatedRows);
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
    <div className="container mx-auto my-4">
      <div className="mb-4">
        <button onClick={addRow} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add State
        </button>
        <button onClick={addVariant} className="bg-green-500 text-white px-4 py-2 rounded ml-2">
          Add Variant
        </button>
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Product Filters</th>
            {variants.map((variant, index) => (
              <th key={index} className="border px-4 py-2">
                {variant}
                <button onClick={() => deleteVariant(index)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                  Delete
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="rows">
            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {rows.map((row, rowIndex) => (
                  <Draggable key={row} draggableId={row} index={rowIndex}>
                    {(provided) => (
                      <TableRow
                        index={rowIndex}
                        row={row}
                        variants={variants}
                        designs={designs[rowIndex] || {}}
                        deleteRow={deleteRow}
                        updateDesign={updateDesign}
                        draggableProps={provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                        innerRef={provided.innerRef}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
    </div>
  );
};

export default Table;
