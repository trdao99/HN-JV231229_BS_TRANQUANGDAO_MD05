import React, { useEffect, useState } from "react";
import List from "./List";
import Modal from "./Modal";

function Form() {
  const [isOpen, setIsOpen] = useState(false);

  const [id, setID] = useState(0);
  const openModal = (id) => {
    setIsOpen(true);
    setID(id);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [list, setList] = useState(() => {
    const listLocals = JSON.parse(localStorage.getItem("list")) || [];
    return listLocals;
  });
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const [validate, setValidate] = useState(false);
  const handleAddItem = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return setValidate(true);

    const newItem = {
      id: Math.random() * 1000000,
      name: inputValue,
      status: true,
    };

    const updatedList = [...list, newItem];
    setList(updatedList);
    localStorage.setItem("list", JSON.stringify(updatedList));
    setValidate(false);
    setInputValue("");
  };
  const [checkList, setcheckList] = useState(() => {
    const check = list.filter((item) => item.status == false);
    return check;
  });
  useEffect(() => {
    const check = list.filter((item) => item.status === false);
    setcheckList(check);
  }, [list]);
  const handleIsDone = (idItem) => {
    const findIndex = list.findIndex((item) => item.id === idItem);
    if (findIndex !== -1) {
      const cloneList = [...list];
      cloneList[findIndex] = {
        ...cloneList[findIndex],
        status: !cloneList[findIndex].status,
      };
      setList(cloneList);
      localStorage.setItem("list", JSON.stringify(cloneList));
    }
  };
  const deleteItem = (itemID) => {
    // Show a confirmation dialog with SweetAlert
    Swal.fire({
      title: "Confirm Deletion",
      text: "Bạn có chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        const lissst = JSON.parse(localStorage.getItem("list"));
        const updatedList = lissst.filter((item) => item.id !== itemID);
        setList(updatedList);
        localStorage.setItem("list", JSON.stringify(updatedList));
      }
    });
  };

  const handleUpdate = (updateList) => {
    setList(updateList);
    localStorage.setItem("list", JSON.stringify(updateList));
    closeModal();
  };
  return (
    <>
      <div className="h-[100vh] w-full flex items-center justify-center drop-shadow-md z-0">
        <div className="border-solid border-2 w-1/2 h-max rounded">
          <div className="w-2/3 mx-auto mb-9 mt-10">
            <h1 className="text-center font-bold text-xl py-6">
              Danh sách công việc
            </h1>
            <form className="flex gap-4" onSubmit={handleAddItem}>
              <input
                className="focus:border-black hover:shadow-md h-9 border outline-none px-4 rounded flex-1"
                value={inputValue}
                onChange={handleInputChange}
              ></input>
              <button
                className="h-9 rounded px-4 border bg-blue-500 hover:bg-blue-600 text-white"
                type="submit"
              >
                Thêm
              </button>
            </form>
            {validate && <p className="text-red-600">Không được để trống</p>}
            <div>
              {list.length > 0 ? (
                <>
                  {" "}
                  <List
                    list={list}
                    handleIsDone={handleIsDone}
                    openModal={openModal}
                    closeModal={closeModal}
                    deleteItem={deleteItem}
                  />
                  <div className="mt-3 bg-gray-100 p-2 rounded">
                    Công việc đã hoàn thành : {checkList.length}/{list.length}
                  </div>
                </>
              ) : (
                <img
                  className="h-48 w-52 shadow-lg mx-auto my-8"
                  src="https://t4.ftcdn.net/jpg/05/86/21/03/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg"
                ></img>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        id={id}
        list={list}
        handleUpdate={handleUpdate}
      />
    </>
  );
}

export default Form;
