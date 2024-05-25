import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import logo from "../../img/logo.jpg";

const Confirm = () => {
  const { tokenid } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["confirmTokenId"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/confirm/${tokenid}`
      ),
  });

  return (
    <section className="flex flex-col items-center justify-center min-h-[100vh]">
      <div className="max-w-md mx-auto shadow-xl p-5 rounded-md w-full">
        <img className="w-48 rounded-full mx-auto mb-4" src={logo} />
        <h2 className="heading-title text-center mb-3">
          {isPending
            ? "Verificando Tu Cuenta..."
            : error
            ? "Token Inválido"
            : "Tu Cuenta Ha Sido Verificada"}
        </h2>

        <h4 className="heading-title text-base text-center">
          Nos preocupamos por tu seguridad.
        </h4>

        <p className="text-center text-sm text-[#31353A] mt-2">
          ¿Regresar a{" "}
          <Link className="text-primary" to={"/sign-in"}>
            Iniciar sesión
          </Link>
          ?
        </p>
      </div>
    </section>
  );
};

export default Confirm;
