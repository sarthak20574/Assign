//page.tsk

"use client";
import Table from './Table';
import { FaArrowLeft, FaPlus, FaUpload } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
      <div className="w-full flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button className="mr-2 text-2xl text-gray-700">
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-bold text-black">Rules creation</h1>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Publish Feed</button>
      </div>
      <Table />
    </main>
  );
}
