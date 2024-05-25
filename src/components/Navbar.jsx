import { IoBagOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";
import logo from "../img/logo.jpg";

const Navbar = () => {
  return (
    <nav className="mt-3">
      <div className="container-page">
        <div className="flex justify-between gap-4 items-center">
          <div className="flex gap-5 items-center">
            <div className="min-[1030px]:hidden">
              <AiOutlineMenu className="size-8" />
            </div>

            <img className="w-24" src={logo} />
          </div>

          <div className="max-[500px]:hidden flex-1 relative">
            <input
              type="search"
              className="bootstrap-input rounded-full focus:rounded-full px-4 py-2"
              placeholder="Busca Modelo, Marca o piezas..."
            />
            <FcSearch className="absolute size-6 top-2 right-8" />
          </div>

          <div className="max-[1030px]:hidden">
            <button className="btn btn-blue rounded-full animation-fade">
              Cliente nuevo? Cómo ordenar!
            </button>
          </div>

          <div className="flex items-center">
            <div>
              <div className="max-[1030px]:hidden">
                <p className="text-sm">Iniciar sesión</p>
              </div>

              <div className="max-[1030px]:hidden">
                <Link to={"/sign-in"} className="font-bold">
                  Mi cuenta
                </Link>
              </div>
            </div>

            <div className="max-[1030px]:hidden bg-[#e1e1e2] h-10 w-[.1rem] mx-6"></div>

            <div className="flex gap-4 items-center">
              <div className="min-[1030px]:hidden">
                <FaRegUser className="size-6" />
              </div>

              <div className="relative">
                <IoBagOutline className="size-7" />
                <div className="bg-primary text-white flex justify-center items-center absolute rounded-full -top-2 min-[1030px]:-right-3 -right-[.5rem]">
                  <h4 className="text-sm px-[.3rem]">0</h4>
                </div>
              </div>

              <div className="max-[1030px]:hidden">
                <h2 className="font-medium">Carrito</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="min-[500px]:hidden mt-3 flex-1 relative">
          <input
            type="search"
            className="bootstrap-input rounded-full focus:rounded-full px-4 py-2"
            placeholder="Busca Modelo, Marca o piezas..."
          />
          <FcSearch className="absolute size-6 top-2 right-8" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
