import { InputForm } from "../../../components/InputForm";
import { Link } from "react-router-dom";

const Form = ({ handleSubmit, isPending }) => {
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <InputForm
        inputPlaceholder={"Contraseña"}
        inputType={"password"}
        inputName={"password"}
      />

      <InputForm
        inputPlaceholder={"Repetir Contraseña"}
        inputType={"password"}
        inputName={"repeatPassword"}
        inputEye={true}
      />

      <button
        type="submit"
        className="btn btn-blue animation-fade"
        disabled={isPending}
      >
        Cambiar
      </button>

      <p className="text-center text-sm text-[#31353A] mt-2">
        ¿Recordaste tu contraseña?{" "}
        <Link className="text-primary" to={"/sign-in"}>
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
};

export default Form;
