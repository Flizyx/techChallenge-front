import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Link from 'next/link';

async function getClassrooms() {
  const response = await fetch('https://schooldemoback.onrender.com/classrooms');
  const data = await response.json();
  return data;
}

function Home() {
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getClassrooms();
      setClassrooms(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
        <Navbar /> 
      <h1>Home Page</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {classrooms.map((classroom) => (
            <li key={classroom.id}>
              Nombre: {classroom.name},
              Capacidad: {classroom.capacity},
              <Link href={`/classroom/${classroom.id}`} legacyBehavior>
                <a>Ver detalles</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;