// page.tsx
"use client";
import Table from './Table';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button className="mr-2 text-2xl text-white">
            <FaArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-white">Rules Creation</h1>
        </div>
        <button className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
          <FaPlus className="mr-2" />
          Publish Feed
        </button>
      </div>
      <Table />
    </main>
  );
}
