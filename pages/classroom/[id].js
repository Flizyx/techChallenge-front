import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

async function getClassroomInfo(id) {
  const response = await fetch(`https://schooldemoback.onrender.com/classrooms/${parseInt(id)}`);
  const data = await response.json();
  return data;
}

function SelectedClassroom() {
  const router = useRouter();
  const [classroomData, setClassroomData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(!router.query.id){
      return;
    }
    async function fetchData() {
      const data = await getClassroomInfo(router.query.id);
      setClassroomData(data);
      setIsLoading(false);
    }
    fetchData();
  }, [router]);

  const filteredStudents = classroomData?.students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='auto relative'>
      {isLoading ? (
        <div>
          <div className="absolute inset-0 bg-gray-900 opacity-30"></div>
          <div className="absolute inset-0 z-10 flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 relative">
          <h1 className="text-3xl font-bold underline mb-4">{classroomData.name}</h1>
          <h2 className="text-lg font-bold mb-2">Capacity:</h2>
          <p className="text-gray-700 text-base mb-4">{classroomData.capacity}</p>
          <h2 className="text-lg font-bold mb-2">Students:</h2>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-400 rounded-md py-2 px-3 mb-4"
          />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents?.map((student) => (
              <div key={student.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-row">
              <img
                className="w-48 h-48 object-cover aspect-w-1 aspect-h-1"
                src="https://images.unsplash.com/photo-1611178568980-6f9a8d5b7f3c"
                alt=""
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{student.name}</h2>
                <p className="text-gray-700 text-base mb-2">Genre: {student.gender}</p>
                <p className="text-gray-700 text-base mb-4">Age: {student.age}</p>
                <Link href={`/students/${student.id}`} legacyBehavior>
                  <a className="mt-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View detail
                  </a>
                </Link>
              </div>
            </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectedClassroom;