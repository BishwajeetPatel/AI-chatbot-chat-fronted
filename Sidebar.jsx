import { IoIosCloseCircle } from "react-icons/io";
import { ChatData } from "../context/ChatContext";
import { MdDelete } from "react-icons/md";
import { LoadingSpinner } from "./Loading";
import { UserData } from "../context/UserContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, setSelected, deleteChat } = ChatData();
  const { logoutHandler } = UserData();

  const deleteChatHandler = (e, id) => {
    e.stopPropagation(); // Prevent parent click event
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id);
    }
  };

  const clickEvent = (id) => {
    setSelected(id);
    toggleSidebar();
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 p-4 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="md:hidden p-2 mb-4 bg-gray-700 rounded text-2xl"
        onClick={toggleSidebar}
      >
        <IoIosCloseCircle />
      </button>

      <div className="text-2xl font-semibold mb-6">Mern ChatBot</div>
      
      <div className="mb-4">
        <button
          onClick={createChat}
          className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded"
        >
          {createLod ? <LoadingSpinner /> : "New Chat +"}
        </button>
      </div>
      
      <div>
        <p className="text-sm text-gray-400 mb-2">Recent</p>

        <div className="max-h-[500px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar">
          {chats && chats.length > 0 ? (
            chats.map((e) => (
              <div
                key={e._id}
                className="w-full text-left py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded mt-2 flex justify-between items-center cursor-pointer"
                onClick={() => clickEvent(e._id)}
              >
                <span className="flex-1 truncate pr-2">
                  {e.latestMessage.slice(0, 38)}...
                </span>
                
                {/* Fixed: Separate delete button - not nested */}
                <div
                  className="bg-red-600 text-white text-xl px-3 py-2 rounded-md hover:bg-red-700 cursor-pointer flex items-center justify-center"
                  onClick={(event) => deleteChatHandler(event, e._id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      deleteChatHandler(event, e._id);
                    }
                  }}
                >
                  <MdDelete />
                </div>
              </div>
            ))
          ) : (
            <p>No chats yet</p>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 mb-6 w-full">
        <button
          className="bg-red-600 text-white text-xl px-3 py-2 rounded-md hover:bg-red-700"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;