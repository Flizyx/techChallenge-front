import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ModalModifStudent from '../../components/modals/modalModifStudent';
import ModalDeleteSibling from '../../components/modals/modalDeleteSibling';
import ModalDeleteStudent from '../../components/modals/modalDeleteStudent';

async function getStudent(id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${id}`);
  const data = await response.json();
  return data;
}
async function getSiblings(id,token) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${id}/siblings`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}
async function getStudents() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students`);
  const data = await response.json();
  return data;
}
async function getClassrooms() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classrooms`);
  const data = await response.json();
  return data;
}
function Student() {
  const router = useRouter();
  const [student, setStudent] = useState({});
  const [siblings, setSiblings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [SessionLink, setSession] = useState('');
  const [session, setSessionState] = useState(false);
  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  const randomColor = Math.floor(Math.random() * 5) + 1;
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
      const studentData = await getStudent(router.query.id);
      if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem('token');
        if(token != null && token != undefined && token != 'undefined'){
          const siblingsData = await getSiblings(router.query.id, token);
          setSiblings(siblingsData);
        }
      }
      setStudent(studentData);
      const data2 = await getStudents();
      setStudents(data2);
      const data3 = await getClassrooms();
      setClassrooms(data3);
      setIsLoading(false);
    }
    fetchData();
  }, [router]);
function getRandomColor(index) {
    const colors = ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-yellow-500", "bg-orange-500"];
    return colors[index % colors.length];
  }
  return (
    <div className='container mx-auto px-4 auto relative'>
       <Link href={SessionLink} legacyBehavior>
        <a className="w-1/6 mt-4  hover:bg-gray-300 text-black font-bold py-2 px-4 mb-4 rounded flex items-center">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Return
        </a>
      </Link> 
      <div className={`w-full mb-4 ${getRandomColor(randomColor)} h-2`}></div>
       <h1 className="text-3xl font-bold underline mb-4">Student details</h1>
      <p className="text-lg mb-4">
        Here are the main features of student
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
                <div >
                  <div key={student.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-row w-1/2">
                    <div className={`${getRandomColor(randomColor)} w-1/12`} />

                    <img
                      className="w-48 h-48 object-cover aspect-w-1 aspect-h-1"
                      src={student.profile_image_path || "/images/default-profile.png"}
                      alt=""
                    />
                    <div className="flex flex-row mt-4">
                      <div className="p-4 flex flex-col w-full">
                        <h2 className="text-xl font-bold mb-2">{student.name}</h2>
                        <h2 className="text-lg font-bold mb-2">Genre: {student.gender}</h2>
                        <h2 className="text-lg font-bold mb-2">Age: {student.age}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {session?(
                    <div  className='mb-4'>
                      <ModalModifStudent classrooms={classrooms} student={student} students={students} token={sessionStorage.getItem('token')}/>
                    </div>
                  ) :(
                  <p></p>
                  )}
                   <div key={student.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-row w-3/4">
                   <div className={`${getRandomColor(randomColor)} w-1/12`} />

                    <img
                      className="w-48 h-48 object-cover aspect-w-1 aspect-h-1"
                      src={student.profile_image_path || "/images/default-profile.png"}
                      alt=""
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
                            <img
                              className="w-full h-30 object-cover"
                              src="/images/default-classroom.jpg"
                              alt=""
                            />
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
              {session?(
                <div  className='mt-4'>
                  <ModalDeleteStudent student={student} token={sessionStorage.getItem('token')}/>
                </div>
              ) :(
              <p></p>
              )}
              <h2 className="text-2xl font-bold mb-4 mt-4 pb-2 border-b-2 border-t-2">Siblings</h2>
              {Array.isArray(siblings) && siblings.length > 0 ? (
                <>
                  <div className="flex flex-row flex-wrap">
                      {siblings.map((sibling,index) => (
                        <div key={sibling.id} className="w-full p-2 md:w-2/3 lg:w-1/2 xl:w-1/2">
                          {session?(
                            <div  className='mb-4'>
                              <ModalModifStudent classrooms={classrooms} 
                              student={sibling.student.id !== student.id ? sibling.student : sibling.sibling}
                              students={students} token={sessionStorage.getItem('token')}/>
                              <ModalDeleteStudent student={sibling.student.id !== student.id ? sibling.student : sibling.sibling} token={sessionStorage.getItem('token')}/>
                            </div>
                          ) :(
                            <p></p>
                          )}
                          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-row">
                            {session ? 
                            <div className="absolute top-0 right-5">
                            <ModalDeleteSibling sibling={sibling} token={sessionStorage.getItem('token')}/>
                          </div>
                            : <div />}
                            <div className={`${getRandomColor(index)} w-1/12`} />
                            <img
                              className="w-2/5 h-auto object-cover aspect-w-1 aspect-h-1"
                              src={
                                sibling.student.id !== student.id
                                  ? sibling.student.profile_image_path || "/images/default-profile.png"
                                  : sibling.sibling.profile_image_path || "/images/default-profile.png"
                              }
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
                                <Link
                                  href={`/classroom/${
                                    sibling.student.id !== student.id ? sibling.student.classroom_id : sibling.sibling.classroom_id
                                  }`}
                                  key={
                                    sibling.student.id !== student.id ? sibling.student.classroom_id : sibling.sibling.classroom_id
                                  }
                                  legacyBehavior
                                >
                                  <a className="w-full mr-2">
                                    <div className="bg-white rounded-lg shadow-lg overflow-hidden text-sm">
                                      <div className="p-2">
                                        <h2 className="text-md font-semibold">
                                          {sibling.student.id !== student.id ? sibling.student.classroom.name : sibling.sibling.classroom.name}
                                          {/* {student.classroom.name} */}
                                        </h2>
                                        <p className="text-gray-500">
                                          {sibling.student.id !== student.id ? sibling.student.classroom.capacity : sibling.sibling.classroom.capacity} students
                                        </p>
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
                <div>No info available</div>
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