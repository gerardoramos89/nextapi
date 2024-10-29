"use client";

import { useEffect, useState } from 'react';

const StudentCountCard = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/student/count');
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error('Error fetching student count:', error);
      }
    };

    fetchCount();
  }, []);

  return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto my-4">
        <div className="text-center">
            <h5 className="text-2xl font-bold text-gray-700 mb-2">
            Student Count
            </h5>
            <p className="text-gray-500 text-lg">
            There are <strong className="text-indigo-500">{count}</strong> students registered.
            </p>
        </div>
        </div>
  );
};

export default StudentCountCard;
