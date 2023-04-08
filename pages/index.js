import React, { useState, useEffect,useRef  } from 'react';
// import Navbar from '../components/Navbar/Navbar';
import Link from 'next/link';

async function getClassrooms() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classrooms`);
  const data = await response.json();
  return data;
}

function Home() {
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  function getRandomColor(index) {
    const colors = ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-yellow-500", "bg-orange-500"];
    return colors[index % colors.length];
  }

  const filteredClassrooms = classrooms.filter((classroom) =>
    classroom.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    // Get suggestions
    const newSuggestions = classrooms.filter((classroom) =>
      classroom.name.toLowerCase().includes(e.target.value.toLowerCase())
    ).slice(0, 5);
    setSuggestions(newSuggestions);
    setShowSuggestions(true);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getClassrooms();
      setClassrooms(data);
      setIsLoading(false);
    }

    fetchData();
    // Hide suggestions when clicked outside search bar
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

    return (
    <div className="container mx-auto px-4 relative">
      <h1 className="text-3xl font-bold underline mb-4">My Classes</h1>
      <p className="text-lg mb-4">
        Welcome to our new software that allows schools to create rooms/courses with ease. With our software, you can add students and view all the details of the room and its members in one place. Our software is designed to make managing your school's courses easy and efficient. Try it today and experience the ease of managing your school's courses!
      </p>
      <form className="mb-4" ref={searchRef}>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search by name"
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            value={searchQuery}
            onChange={handleSearch}
          />
          {showSuggestions && (
            <ul className="absolute z-10 bg-white border border-gray-300 w-full rounded-md mt-1">
              {suggestions.map((classroom) => (
                <li
                  key={classroom.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchQuery(classroom.name);
                    setShowSuggestions(false);
                  }}
                >
                  {classroom.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto">
        {isLoading ? (
          <div>
            <div class="absolute inset-0 bg-gray-300 opacity-30"></div>
            <div class="absolute inset-0 z-10 flex items-center justify-center mt-4">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          </div>
        ) : (
          filteredClassrooms.map((classroom,index) => (
            <Link href={`/classroom/${classroom.id}`} key={classroom.id} legacyBehavior>
            <a className="relative">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  className="w-full h-48 object-cover opacity-20"
                  src="/images/default-classroom.jpg"
                  alt=""
                />
                <div className={`absolute top-0 left-0 w-full h-2 ${getRandomColor(index)}`}></div>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-black">
                  <h2 className="text-xl font-semibold">{classroom.name}</h2>
                  <p className="text-gray-500">{classroom.capacity} students</p>
                </div>
              </div>
            </a>
          </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;