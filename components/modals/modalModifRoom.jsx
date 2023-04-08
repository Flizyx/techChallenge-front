import React, { useState,useRef, useEffect } from 'react';

function ModalModifRoom(props) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef();

  async function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    const data = {
    name: name || props.classroom.name,
    capacity: parseInt(capacity) || props.classroom.capacity
    };
    const token = sessionStorage.getItem('token');
    if(token != null && token != undefined && token != 'undefined'){
      const response = await postData(`${process.env.NEXT_PUBLIC_API_URL}/classrooms/${props.classroom.id}`, data,token);
      window.location.reload();
    }
    setShowModal(false);
  }
  async function postData(url = '', data = {},token) {
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
  function setShowModalfirst(state){
    setCapacity(props.classroom.capacity)
    setName(props.classroom.name)
    setShowModal(state);
  }
  return (
    <>
      {/* <button
        type="button"
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
      >
        Modify Class
      </button> */}
      <button className={`w-1/2 bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-l`}
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
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div ref={modalRef} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Modify Class</h3>
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
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder={props.classroom.name}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                      Capacity
                    </label>
                    <input
                      id="capacity"
                      type="number"
                      value={capacity}
                      onChange={(event) => setCapacity(event.target.value)}
                      placeholder={props.classroom.capacity}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                      Modify Class
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

export default ModalModifRoom;