import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
  console.log(data,data.length);
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
        if(token !== null){
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
    <div>
      <h1>Student Page</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {student === null ? (
            <div>Este estudiante no existe</div>
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
                <ul>
                  <li>Nombre: {student.name}</li>
                  <li>Género: {student.gender}</li>
                  <li>Edad: {student.age}</li>
                  <li>Clase:</li>
                  <ul>
                    <li>Nombre: {student.classroom.name}</li>
                    <li>Capacidad: {student.classroom.capacity}</li>
                  </ul>
                </ul>
              )}
              {Array.isArray(siblings) && siblings.length > 0 ? (
                <>
                  Siblings:
                  <ul>
                    {siblings.map((sibling) => (
                      <li key={sibling.id}>
                        {sibling.student.id !== student.id && (
                          <>
                            Sibling:
                            <ul>
                              <li>Name: {sibling.student.name}</li>
                              <li>Gender: {sibling.student.gender}</li>
                              <li>Classroom ID: {sibling.student.classroom_id}</li>
                              <li>Profile Image Path: {sibling.student.profile_image_path}</li>
                              <li>Age: {sibling.student.age}</li>
                            </ul>
                          </>
                        )}
                        { sibling.sibling.id !== student.id && (
                          <>
                            Sibling:
                            <ul>
                              <li>Name: {sibling.sibling.name}</li>
                              <li>Gender: {sibling.sibling.gender}</li>
                              <li>Classroom ID: {sibling.sibling.classroom_id}</li>
                              <li>Profile Image Path: {sibling.sibling.profile_image_path}</li>
                              <li>Age: {sibling.sibling.age}</li>
                            </ul>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
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