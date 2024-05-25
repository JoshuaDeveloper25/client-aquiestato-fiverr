import { useMutation } from "@tanstack/react-query";
import { getError } from "../../utils/getError";
import { toast } from "react-toastify";
import Form from "./components/Form";
import axios from "axios";

const ForgotPassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (userInfo) =>
      axios.post(`${import.meta.env.VITE_BASE_URL}/users/forgotpassword`, userInfo),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      toast.error(getError(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      email: e?.target?.email?.value.trim(),
    };

    // Form validation
    if ([userInfo?.email].includes("")) {
      return toast.error("¡Llena los campos disponibles!");
    }

    mutate(userInfo);
  };

  return (
    <section className="container-page">
      <div className="flex flex-col items-center justify-center min-h-[100vh]">
        <div className="text-center my-4">
          <h2 className="heading-title">Recuperar mi contraseña</h2>
          <p className="text-md text-[#575c63] mt-2">
            Ingresa tu e-mail para recuperar tu contraseña.
          </p>
        </div>

        <Form handleSubmit={handleSubmit} isPending={isPending} />
      </div>
    </section>
  );
};

export default ForgotPassword;
