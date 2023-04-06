import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

async function getStudent(id) {
  const response = await fetch(`https://schooldemoback.onrender.com/students/${id}`);
  const data = await response.json();
  return data;
}

function Student() {
  const router = useRouter();
  const [student, setStudent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(!router.query.id){
      return;
  }
    async function fetchData() {
      const data = await getStudent(router.query.id);
      setStudent(data);
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
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Student;