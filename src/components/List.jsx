import {
  CheckSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import React from "react";

function List({ list, handleIsDone, openModal, deleteItem }) {
  return (
    <ul className="flex flex-col gap-3 mt-5 max-h-72 overflow-y-auto">
      {list.map((item, index) => (
        <>
          <li
            className="flex px-2 rounded justify-between items-center hover:bg-gray-200 cursor-pointer relative"
            key={item.id}
          >
            <p
              onClick={() => handleIsDone(item.id)}
              className={item.status === false ? "line-through " : ""}
            >
              <CheckSquareOutlined
                className={
                  item.status === false ? "bg-blue-600 text-white " : ""
                }
              />{" "}
              {item.name}
            </p>
            <EditOutlined
              className=" cursor-pointer hover:bg-gray-300 p-2 rounded-full text-orange-500 absolute right-9"
              onClick={() => openModal(item.id)}
            />
            <DeleteOutlined
              className=" cursor-pointer hover:bg-gray-300 p-2 rounded-full text-red-500 "
              onClick={() => deleteItem(item.id)}
            />
          </li>
        </>
      ))}
    </ul>
  );
}

export default List;
