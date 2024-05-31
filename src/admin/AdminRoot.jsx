import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { IoArrowBack, IoCloseSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

import logo from "../img/logo.jpg";

const AdminRoot = () => {
  const [toggled, setToggled] = useState(false);
  const location = useLocation();

  return (
    <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
      <Sidebar
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="sm"
      >
        <Menu>
          {/* Icono Flecha */}
          <div className="flex items-center justify-between px-2 py-3">
            <NavLink className="inline-block" to={"/"}>
              <IoArrowBack className="size-6" />
            </NavLink>

            <div>
              <IoCloseSharp
                onClick={() => setToggled(false)}
                className="min-[577px]:hidden size-6 cursor-pointer"
              />
            </div>
          </div>

          {/* Logo */}
          <NavLink to={"/admin/"}>
            <img className="w-28 mx-auto rounded-full mb-6" src={logo} />
          </NavLink>

          {/* Inicio */}
          <NavLink
            className={
              location?.pathname === "/admin/"
                ? "dashboard-active"
                : "dashboard-inactive"
            }
            to="/admin/"
          >
            Inicio
          </NavLink>

          <NavLink
            className={
              location?.pathname === "/admin/add-product"
                ? "dashboard-active"
                : "dashboard-inactive"
            }
            to="/admin/add-product"
          >
            Agregar Producto
          </NavLink>
        </Menu>
      </Sidebar>

      <main style={{ display: "flex", padding: 10 }}>
        <div>
          {/* Hamburguer Button */}
          <button
            className="sb-button min-[577px]:hidden"
            onClick={() => setToggled(!toggled)}
          >
            <FiMenu className="size-8" />
          </button>

          {/* General Information */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminRoot;
