import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, closeModal, id, list, handleUpdate }) => {
  const [findIndex, setFindIndex] = useState(-1);
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    if (id > 0) {
      const index = list.findIndex((item) => item.id === id);
      if (index !== -1) {
        setFindIndex(index);
        setUpdatedName(list[index].name);
      }
    }
  }, [id, list]);

  const handleNameChange = (e) => {
    setUpdatedName(e.target.value);
  };

  const handleUpdateClick = () => {
    const updatedList = [...list];
    if (findIndex !== -1) {
      updatedList[findIndex].name = updatedName;
      handleUpdate(updatedList);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Cập nhật công việc</h2>
            <p className="mb-6">tên công việc</p>
            <input
              className="rounded h-9 border px-4 outline-none hover:shadow-md shadow focus:border-[#004999]"
              value={updatedName}
              onChange={handleNameChange}
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                type="button"
                className="border px-4 h-9 rounded cursor-pointer hover:bg-[#E0E0E0] focus:bg-[#BDBDBD]"
                onClick={closeModal}
              >
                Hủy
              </button>
              <button
                type="button"
                className="text-white bg-[#007AFF] hover:bg-[#3395FF] focus:bg-[#0062CC] border px-4 h-9 rounded cursor-pointer"
                onClick={handleUpdateClick}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
