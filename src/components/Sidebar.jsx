import React from "react";
import "./Sidebar.css";

function Sidebar({
  activePage,
  setActivePage,
  isOpen,
  toggleSidebar,
  onLogout,
}) {

  const menuItems = [
    { id: "dashboard", name: "📊 Dashboard" },
    { id: "rooms", name: "🛏️ Manage Rooms" },
    { id: "people", name: "👥 People Staying" },
    { id: "parking", name: "🚗 Parking & CCTV" },
    { id: "contacts", name: "📇 Guest Directory" },
    { id: "gallery", name: "📸 Media Gallery" },
    { id: "starrating", name: "⭐ Star Rating" },
    { id: "location", name: "📍 Hotel Location" },
    { id: "transport", name: "🚖 Pick & Drop" },
    { id: "payment", name: "💳 Contact & Payment" },
    { id: "gameplace", name: "🎮 Game Palace" },
    { id: "rooftop", name: "🌃 Rooftop Disco Club" },
    { id: "bathroom", name: "🛁 Bathroom Suite" },
  ];


  const handleClick = (page) => {

    setActivePage(page);

    if(window.innerWidth <= 768){
      toggleSidebar();
    }

  };


  return (

    <aside className={`sidebar ${isOpen ? "open" : ""}`}>

      
      {/* Header */}

      <div className="sidebar-header">

        <h2>🏨 GS Hotel</h2>


        <button
          className="close-btn"
          onClick={toggleSidebar}
        >
          ✕
        </button>


      </div>



      {/* Scroll Menu */}

      <div className="sidebar-content">

        <ul className="sidebar-menu">


          {
            menuItems.map((item)=>(

              <li
                key={item.id}

                className={
                  activePage === item.id 
                  ? "active"
                  :
                  ""
                }

                onClick={() => handleClick(item.id)}

              >

                {item.name}

              </li>

            ))
          }


        </ul>


      </div>



      {/* Logout */}

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={onLogout}
        >

          🚪 Logout Session

        </button>


      </div>


    </aside>

  );

}


export default Sidebar;