import { useMutation } from "@tanstack/react-query";
import { getError } from "../../utils/getError";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "./components/Form";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (userInfo) =>
      axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, userInfo),
    onSuccess: (res) => {
      toast.success("¡Registrado exitosamente!");
      navigate("/sign-in");
      console.log(res);
    },
    onError: (err) => {
      toast.error(getError(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      name: e?.target?.name?.value.trim(),
      surNames: e?.target?.surNames?.value.trim(),
      email: e?.target?.email?.value.trim(),
      password: e?.target?.password?.value.trim(),
    };

    // Form validation
    if (
      [
        userInfo?.name,
        userInfo?.surNames,
        userInfo?.email,
        userInfo?.password,
        e?.target?.repeatPassword?.value?.trim(),
      ].includes("")
    ) {
      return toast.error("¡Llena los campos disponibles!");
    } else if (
      e?.target?.value?.password !== e?.target?.value?.repeatPassword
    ) {
      return toast.error("¡Contraseñas no coinciden!");
    }

    mutate(userInfo);
  };

  return (
    <section className="container-page">
      <div className="flex flex-col justify-center items-center min-h-[100vh]">
        <div className="text-center my-4">
          <h2 className="heading-title">Crear mi cuenta</h2>
          <p className="text-md text-[#575c63] mt-2">
            Por favor complete la información{" "}
            <span className="block">a continuación:</span>
          </p>
        </div>

        <Form handleSubmit={handleSubmit} isPending={isPending} />
      </div>
    </section>
  );
};

export default Register;
