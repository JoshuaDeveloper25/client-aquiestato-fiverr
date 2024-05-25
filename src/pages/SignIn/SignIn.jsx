import { useMutation } from "@tanstack/react-query";
import AppContext from "../../context/AppProvider";
import { getError } from "../../utils/getError";
import { toast } from "react-toastify";
import Form from "./components/Form";
import { useContext } from "react";
import axios from "axios";

const SignIn = () => {
  const { setUserInfo } = useContext(AppContext);

  const { mutate, isPending } = useMutation({
    mutationFn: async (userInfo) =>
      axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userInfo),
    onSuccess: (res) => {
      toast.success("¡Ingresado exitosamente!");
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setUserInfo(res.data);
      console.log(res);

      // Placing globally the token
      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${res?.data?.access_token}`;
    },
    onError: (err) => {
      toast.error(getError(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      email: e?.target?.email?.value.trim(),
      password: e?.target?.password?.value.trim(),
    };

    // Form validation
    if ([userInfo?.email, userInfo?.password].includes("")) {
      return toast.error("¡Llena los campos disponibles!");
    }

    mutate(userInfo);
  };

  return (
    <section className="container-page">
      <div className="flex flex-col items-center justify-center min-h-[100vh]">
        <div className="text-center my-4">
          <h2 className="heading-title">Conectarme a mi cuenta</h2>
          <p className="text-md text-[#575c63] mt-2">
            Ingresar tu e-mail y contraseña:
          </p>
        </div>

        <Form handleSubmit={handleSubmit} isPending={isPending} />
      </div>
    </section>
  );
};

export default SignIn;
