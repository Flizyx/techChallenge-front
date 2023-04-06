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

  useEffect(() => {
    if(!router.query.id){
        return;
    }
    async function fetchData() {
      const data = await getClassroomInfo(router.query.id);
      setClassroomData(data);
    }
    fetchData();
  }, [router]);

  return (
    <div>
      {classroomData ? (
        <div>
          {/* <h1>Classroom id: {router.query.id}</h1> */}
          <h1>Nombre: {classroomData.name}</h1>
          <h2>Capacidad: {classroomData.capacity}</h2>
          <h2>Estudiantes:</h2>
          <ul>
            {classroomData.students.map((student) => (
              <li key={student.id}>
                Nombre: {student.name},
                Género: {student.gender},
                Edad: {student.age},
                <Link href={`/students/${student.id}`} legacyBehavior>
                <a>Ver detalles</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default SelectedClassroom;