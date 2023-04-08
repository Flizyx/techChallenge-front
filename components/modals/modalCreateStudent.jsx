import React, { useState,useRef, useEffect } from 'react';

function ModalCreateStudent(props) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [classroom_id, setClassroomId] = useState("");
  const [age, setAge] = useState("");
  const [siblings, setSiblings] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef();
  const [hasSiblings, setHasSiblings] = useState(false)

  async function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    const data1 = { name, gender, classroom_id: parseInt(classroom_id), age: parseInt(age)};
    const data2 = {siblings: [parseInt(siblings)]};
    const token = sessionStorage.getItem('token');
    if(token != null && token != undefined && token != 'undefined'){
      const response = await postData('https://schooldemoback.onrender.com/students', data1,token);
      const response2 = await postData(`https://schooldemoback.onrender.com/students/${response.id}/siblings`, data2,token);
      window.location.reload();
    }
    setShowModal(false);
  }
  async function postData(url = '', data = {},token) {
    setIsLoading(true);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    setIsLoading(false);
    return response.json();
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);
  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4  rounded"
      >
        Add Student
      </button>

      {showModal ? (
        <>
        {isLoading ? (
        <div>
          <div className="absolute inset-0 bg-gray-900 opacity-30"></div>
          <div className="absolute inset-0 z-10 flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      ) : (<p></p>)}
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm w-full">
              {/*content*/}
              <div ref={modalRef} className=" min-w-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Student</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto overflow-y-auto max-h-80">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter name"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                     <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                      Gender
                    </label>
                    <input
                      id="gender"
                      type="text"
                      value={gender}
                      onChange={(event) => setGender(event.target.value)}
                      placeholder="Enter gender"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                     <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                     Classroom:
                    </label>
                    <select
                        id="classroom"
                        value={classroom_id}
                        onChange={(event) => setClassroomId(event.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                    <option value="">Select Classroom</option>
                    {props.classrooms.map((classroom) => (
                        <option key={classroom.id} value={classroom.id}>
                        {classroom.name}
                        </option>
                    ))}
                    </select>
                    <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                     Age:
                    </label>
                    <input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(event) => setAge(event.target.value)}
                      placeholder="Enter age"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />  
                    <div className="flex flex-col items-start">
                    <label htmlFor="hasSiblings" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                        ¿Has siblings in another class?
                    </label>
                    <div className="flex items-center mb-2">
                        <input
                        type="checkbox"
                        id="hasSiblings"
                        checked={hasSiblings}
                        onChange={() => setHasSiblings(!hasSiblings)}
                        className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2 text-gray-700"></span>
                    </div>
                    {hasSiblings && (
                        <select
                        id="siblings"
                        value={siblings}
                        onChange={(event) => setSiblings(event.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                        <option value="">Select Student</option>
                        {props.students.map((student) => (
                            <option key={student.id} value={student.id}>
                            {student.name}
                            </option>
                        ))}
                        </select>
                    )}
                    </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Add Student
                        </button>
                    </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default ModalCreateStudent;