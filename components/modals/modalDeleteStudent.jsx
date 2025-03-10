import React, { useState,useRef, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

function ModalDeleteStudent(props) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef();

  async function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    if(props.token != null && props.token != undefined && props.token != 'undefined'){
      const response = await postData(`${process.env.NEXT_PUBLIC_API_URL}/students/${props.student.id}`,props.token);
      window.location.reload();
    }
    setShowModal(false);
  }
  async function postData(url = '',token) {
    setIsLoading(true);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
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
      <button className="w-1/2 bg-gray-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
        onClick={() => setShowModal(true)}>
        Del
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
                  <h3 className="text-3xl font-semibold">Are you sure?</h3>
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
                    <button
                    onClick={handleSubmit}
                      type="submit"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                      Delete Student info
                    </button>
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

export default ModalDeleteStudent;