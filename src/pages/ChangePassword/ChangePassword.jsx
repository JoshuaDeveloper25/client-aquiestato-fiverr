import { useMutation } from "@tanstack/react-query";
import { getError } from "../../utils/getError";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "./components/Form";
import axios from "axios";

const ChangePassword = () => {
  const { tokenid } = useParams();
  console.log(tokenid);

  const { mutate, isPending } = useMutation({
    mutationFn: async (userInfo) =>
      axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/change-password/${tokenid}`,
        userInfo
      ),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(getError(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      password: e?.target?.password?.value.trim(),
    };

    // Form validation
    if ([userInfo?.password].includes("")) {
      return toast.error("¡Llena los campos disponibles!");
    } else if (
      e?.target?.password?.value !== e?.target?.repeatPassword?.value
    ) {
      return toast.error("¡Contraseñas no coinciden!");
    }

    mutate(userInfo);
  };

  return (
    <section className="container-page">
      <div className="flex flex-col items-center justify-center min-h-[100vh]">
        <div className="text-center my-4">
          <h2 className="heading-title">Cambiar contraseña</h2>
          <p className="text-md text-[#575c63] mt-2">
            Ingresa tu nueva contraseña.
          </p>
        </div>

        <Form handleSubmit={handleSubmit} isPending={isPending} />
      </div>
    </section>
  );
};

export default ChangePassword;
