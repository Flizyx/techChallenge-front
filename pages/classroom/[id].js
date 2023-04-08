import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ModalModifRoom from '../../components/modals/modalModifRoom';
import ModalDeleteRoom from '../../components/modals/modalDeleteRoom';
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
  const [SessionLink, setSession] = useState('');
  const [session, setSessionState] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      if (!token || token =='undefined') {
        setSession('/');
      } else {
        setSession('/admin');
        setSessionState(true);
      }
    }
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

  
  const filteredStudents = classroomData && classroomData.students
  ? classroomData.students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];
  function getRandomColor(index) {
    const colors = ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-yellow-500", "bg-orange-500"];
    return colors[index % colors.length];
  }
  return (
    <div className='auto relative'>
      {isLoading ? (
        <div>
          <div class="absolute inset-0 bg-gray-300 opacity-30"></div>
          <div class="absolute inset-0 z-10 flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 relative">
          <Link  href={SessionLink} legacyBehavior>
            <a className="w-1/6 mt-4 bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 mb-4 rounded flex items-center">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Return
            </a>
          </Link>
          {classroomData.error ? (
            <div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden w-1/2 flex flex-row mt-4">
                  <img
                    className="w-1/3 h-auto object-cover"
                    src={classroomData.image_path || "/images/default-classroom.jpg"}
                    alt=""
                  />
                  <div className="p-4 pt-6 pb-8 w-2/3">
                    <h1 className="text-3xl font-bold  mb-4">This classroom does not exist</h1>
                    {/* <h2 className="text-lg font-bold mb-2">Capacity:</h2> */}
                    <p className="text-gray-700 text-base mb-4">please return to homepage</p>
                    {/* <h2 className="text-lg font-bold mb-2">Students:</h2> */}
                    {/* Add your student cards here */}
                  </div>
                </div>
                
            </div>
            ):(
              <div>
                <ModalModifRoom classroom={classroomData}/>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden w-1/2 flex flex-row mt-4">
                  <img
                    className="w-1/3 h-auto object-cover"
                    src={classroomData.image_path || "/images/default-classroom.jpg"}
                    alt=""
                  />
                  <div className="p-4 pt-6 pb-8 w-2/3">
                    <h1 className="text-3xl font-bold underline mb-4">{classroomData.name}</h1>
                    <h2 className="text-lg font-bold mb-2">Capacity:</h2>
                    <p className="text-gray-700 text-base mb-4">{classroomData.capacity}</p>
                    {/* <h2 className="text-lg font-bold mb-2">Students:</h2> */}
                    {/* Add your student cards here */}
                  </div>
                </div>
                
                <ModalDeleteRoom classroom={classroomData}/>
                <h2 class="text-2xl font-bold mb-4 mt-4 pb-2 border-b-2 border-t-2">Students</h2>

                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-400 rounded-md py-2 px-3 mb-4"
                />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredStudents?.map((student,index) => (
                    <div key={student.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-row">
                    <div className={`h-full w-2 ${getRandomColor(index)}`}></div>
                    <img
                      className="w-48 h-48 object-cover aspect-w-1 aspect-h-1"
                      src="/images/default-profile.png"
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
      )}
    </div>
  );
}

export default SelectedClassroom;