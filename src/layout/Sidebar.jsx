import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getNavs } from "../navigation/index";
import { logout } from "../store/Reducers/authReducer";
import { BiLogInCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import logo from "../assets/logo-white.png";
import indilogo from "../assets/indihalf.png";
import secondhalf from "../assets/indert_indei.png";
const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { role } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNavs(role);
    setAllNav(navs);
  }, [role]);

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={`w-[260px] fixed bg-[#283046] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
        showSidebar ? "left-0" : "-left-[260px] lg:left-0"
      }`}
    >
      {/* Fixed Logo Section */}
      <div className="h-[70px] flex justify-center items-center bg-[#283046] sticky top-0 z-10">
        <Link to="/" className="flex items-center justify-center">
          <img className="object-cover w-full h-10" src={indilogo} alt="" />
          <img className="object-cover w-full h-10" src={secondhalf} alt="" />
        </Link>
      </div>

      {/* Scrollable Menu Section */}
      <div className="px-[16px] mt-8 h-[calc(100vh-70px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <ul>
          {allNav.map((n, i) => (
            <li key={i} className="mb-1">
              <Link to={n.path}>
                <div
                  onClick={() => n.subItems && toggleDropdown(n.id)}
                  className={`cursor-pointer ${
                    pathname === n.path
                      ? "bg-slate-600 shadow-indigo-500/30 text-white duration-500"
                      : "text-[#d0d2d6] font-normal duration-200"
                  } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full`}
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                  {n.subItems && (
                    <span className="ml-auto">
                      {openDropdown === n.id ? "▲" : "▼"}
                    </span>
                  )}
                </div>
              </Link>

              {n.subItems && openDropdown === n.id && (
                <ul className="ml-6 mt-1">
                  {n.subItems.map((sub, index) => (
                    <li key={index}>
                      <Link
                        to={sub.path}
                        className={`${
                          pathname === sub.path
                            ? "bg-slate-700 text-white"
                            : "text-[#d0d2d6]"
                        } block px-[10px] py-[6px] rounded-md hover:bg-slate-800`}
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <button
              onClick={() => dispatch(logout({ navigate, role }))}
              className="text-[#d0d2d6] font-normal duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1"
            >
              <span>
                <BiLogInCircle />
              </span>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
