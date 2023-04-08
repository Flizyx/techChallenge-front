import React, { useState,useRef, useEffect } from 'react';
import Link from 'next/link';
import ModalDeleteSibling from './modalDeleteSibling';

function ModalModifStudent(props) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [classroom_id, setClassroomId] = useState("");
  const [age, setAge] = useState("");
  const [siblings, setSiblings] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef();
  const [hasSiblings, setHasSiblings] = useState(false)
  const [siblingsinfo, setSiblingsinfo] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  async function handleSubmit(event) {
    console.log("handle modifystudent")
    setIsLoading(true);
    event.preventDefault();
    const data1 = {
      name: name || props.student.name,
      gender: gender || props.student.gender,
      classroom_id: parseInt(classroom_id) || props.student.classroom_id,
      age: parseInt(age) || props.student.age
    };
    const data2 = {siblings: [parseInt(siblings)]};
    if(props.token != null && props.token != undefined && props.token != 'undefined'){
      const response = await putData(`${process.env.NEXT_PUBLIC_API_URL}/students/${props.student.id}`, data1,props.token);
      if(hasSiblings&& siblings){
        const response2 = await postData(`${process.env.NEXT_PUBLIC_API_URL}/students/${response.id}/siblings`, data2,props.token);
      }
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
  async function putData(url = '', data = {},token) {
    setIsLoading(true);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    setIsLoading(false);
    return response.json();
  }
  async function getSiblingsInfo(url = '',token) {
    setIsLoading(true);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setIsLoading(false);
    return response.json();
  }
  async function fetchData() {
    const data = await getSiblingsInfo(`${process.env.NEXT_PUBLIC_API_URL}/students/${props.student.id}/siblings`,props.token);
    setSiblingsinfo(data);
  }
 function setShowModalfirst(param){
    setAge(props.student.age)
    setName(props.student.name)
    setGender(props.student.gender)
    setClassroomId(props.student.classroom_id)
    setShowModal(param);
    fetchData();
 }
 function getRandomColor(index) {
  const colors = ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-yellow-500", "bg-orange-500"];
  return colors[index % colors.length];
}
  useEffect(() => {
    if (hasSiblings) {
      // const filtered = props.students.filter(
      //   (student) =>
      //     student.id !== props.student.id &&
      //     !siblingsinfo.some(
      //       (sibling) =>
      //         (sibling.student && sibling.student.id === student.id) ||
      //         sibling.sibling.id === student.id
      //     )
      // );
      let filtered = [];
      if (Array.isArray(siblingsinfo)) {
        filtered = props.students.filter(
          (student) =>
            student.id !== props.student.id &&
            !siblingsinfo.some(
              (sibling) =>
                (sibling.student && sibling.student.id === student.id) ||
                (sibling.sibling && sibling.sibling.id === student.id)
            )
        );
      } else {
        filtered = props.students.filter(
          (student) => student.id !== props.student.id
        );
      }
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef,hasSiblings, props.students, props.siblingsinfo, props.student]);
  return (
    <>
      {/* <button
        type="button"
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4  rounded"
      >
        Add Student
      </button> */}
      <button className="w-1/2 bg-gray-300 hover:bg-gray-500 hover:text-gray-200 text-gray-500 font-bold py-2 px-4 rounded "
              onClick={() => setShowModalfirst(true)}>
          Edit
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
                  <h3 className="text-3xl font-semibold">Update student</h3>
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
                <form >
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder={props.student.name}
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
                      placeholder={props.student.gender}
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
                      placeholder={props.student.age}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />  
                    <div className="flex flex-col items-start">
                    <label htmlFor="hasSiblings" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                      Siblings:
                    </label>
                    {Array.isArray(siblingsinfo) && siblingsinfo.length > 0 ? (
                      <>
                        <div className="flex flex-row flex-wrap">
                          {siblingsinfo.map((sibling,index) => (
                            <div key={sibling.id} className="w-full p-2 ">
                              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-row">
                                <div className={`${getRandomColor(index)} w-1/12`} />
                                <div className="p-4 w-full">
                                <h2 className="text-lg font-bold mb-2">
                                  {sibling.student && sibling.student.id !== props.student.id ? sibling.student.name : (sibling.sibling && sibling.sibling.name)}
                                </h2>
                                  <ul className="text-sm">
                                  <li>Gender: {sibling.student && sibling.student.id !== props.student.id ? sibling.student.gender : (sibling.sibling && sibling.sibling.gender)}</li>
                                  <li>Age: {sibling.student && sibling.student.id !== props.student.id ? sibling.student.age : (sibling.sibling && sibling.sibling.age)}</li>
                                  </ul>
                                </div>
                                <div className="flex items-center justify-center">
                                  {/* <button className="bg-white rounded-full p-2 hover:bg-gray-200">
                                    <TrashIcon className="h-5 w-5 text-gray-400" />
                                  </button> */}
                                  <ModalDeleteSibling sibling={sibling} token={sessionStorage.getItem('token')}/>
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
                    <label htmlFor="hasSiblings" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                      Add new sibling?:
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
                        {filteredStudents.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.name}
                          </option>
                        ))}
                        </select>
                    )}
                    </div>
                        <button
                        onClick={handleSubmit}
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Update student
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

export default ModalModifStudent;