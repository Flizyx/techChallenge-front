import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

async function getStudent(id) {
  const response = await fetch(`https://schooldemoback.onrender.com/students/${id}`);
  const data = await response.json();
  return data;
}
async function getSiblings(id,token) {
  const response = await fetch(`https://schooldemoback.onrender.com/students/${id}/siblings`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}

function Student() {
  const router = useRouter();
  const [student, setStudent] = useState({});
  const [siblings, setSiblings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if(!router.query.id){
      return;
    }
    
    async function fetchData() {
      const studentData = await getStudent(router.query.id);
      if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem('token');
        console.log(token);
        if(token != null && token != undefined && token != 'undefined'){
          const siblingsData = await getSiblings(router.query.id, token);
          setSiblings(siblingsData);
        }
      }
      setStudent(studentData);
      setIsLoading(false);
    }
    fetchData();
  }, [router]);

  return (
    <div className='container mx-auto px-4 auto relative'>
      
       <h1 className="text-3xl font-bold underline mb-4">Student details</h1>
      <p className="text-lg mb-4">
        Here is the main features of student
      </p>
      {isLoading ? (
        <div>
          <div className="absolute inset-0 bg-gray-900 opacity-30"></div>
          <div className="absolute inset-0 z-10 flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      ) : (
        <>
          {student === null ? (
            <div>This student does not exist</div>
          ) : (
            <>
              {student.classroom.length === 0 ? (
                <div>
                  <ul>
                    <li>Nombre: {student.name}</li>
                    <li>Género: {student.gender}</li>
                    <li>Edad: {student.age}</li>
                  </ul>
                  <li>No hay información disponible sobre la clase del estudiante.</li>
                </div>
              ) : (
                <div >
                   <div key={student.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-row w-1/2">
                    <img
                      className="w-48 h-48 object-cover aspect-w-1 aspect-h-1"
                      src={student.profile_image_path}
                      alt=""
                    />
                    <img src={student.profile_image_path} alt="" 
                      onError={(e) => { e.target.onerror = null; e.target.src = '../../public/images/default-profile.png' }} 
                    />
                    <div className="flex flex-row mt-4">
                      <div className="p-4 flex flex-col w-full">
                        <h2 className="text-xl font-bold mb-2">{student.name}</h2>
                        <h2 className="text-lg font-bold mb-2">Genre: {student.gender}</h2>
                        <h2 className="text-lg font-bold mb-2">Age: {student.age}</h2>
                      </div>
                      <Link href={`/classroom/${student.classroom.id}`} key={student.classroom.id} legacyBehavior>
                        <a className="w-full">
                          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {/* <img
                              className="w-full h-48 object-cover"
                              src="https://images.unsplash.com/photo-1611178568980-6f9a8d5b7f3c"
                              alt=""
                            /> */}
                            <div className="p-4">
                              <h2 className="text-xl font-semibold">{student.classroom.name}</h2>
                              <p className="text-gray-500">{student.classroom.capacity} students</p>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {Array.isArray(siblings) && siblings.length > 0 ? (
                <>
                  Siblings:
                  <div className="flex flex-row flex-wrap">
                      {siblings.map((sibling) => (
                        <div key={sibling.id} class="w-full p-2 md:w-2/3 lg:w-1/2 xl:w-1/2">
                          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-row">
                            <img
                              className="w-2/5 h-auto object-cover aspect-w-1 aspect-h-1"
                              src={sibling.student.id !== student.id ? sibling.student.profile_image_path : sibling.sibling.profile_image_path}
                              alt=""
                            />
                            <div className="p-4 w-1/2">
                              <h2 className="text-lg font-bold mb-2">
                                {sibling.student.id !== student.id ? sibling.student.name : sibling.sibling.name}
                              </h2>
                              <ul className="text-sm">
                                <li>Gender: {sibling.student.id !== student.id ? sibling.student.gender : sibling.sibling.gender}</li>
                                {/* <li>Classroom ID: {sibling.student.id !== student.id ? sibling.student.classroom_id : sibling.sibling.classroom_id}</li> */}
                                {/* <li>Profile Image Path: {sibling.student.id !== student.id ? sibling.student.profile_image_path : sibling.sibling.profile_image_path}</li> */}
                                <li>Age: {sibling.student.id !== student.id ? sibling.student.age : sibling.sibling.age}</li>
                              </ul>
                              <div className="flex flex-row w-full mt-4">
                                <Link href={`/classroom/${sibling.student.id !== student.id ? sibling.student.classroom_id : sibling.sibling.classroom_id}`} 
                                  key={sibling.student.id !== student.id ? sibling.student.classroom_id : sibling.sibling.classroom_id} legacyBehavior>
                                  <a className="w-full mr-2">
                                    <div className="bg-white rounded-lg shadow-lg overflow-hidden text-sm">
                                      <div className="p-2">
                                        <h2 className="text-md font-semibold">{student.classroom.name}</h2>
                                        <p className="text-gray-500">{student.classroom.capacity} students</p>
                                      </div>
                                    </div>
                                  </a>
                                </Link>
                                <Link href={`/students/${sibling.student.id !== student.id ? sibling.student.id : sibling.sibling.id}`} legacyBehavior>
                                  <a className="mt-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
                                    View detail
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                </>
              ) : (
                <>
                  <div>{siblings.message}</div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Student;