import { InputForm } from "../../../components/InputForm";
import { Link } from "react-router-dom";

const Form = ({ handleSubmit, isPending }) => {
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <InputForm
        inputPlaceholder={"Email"}
        inputType={"email"}
        inputName={"email"}
      />

      <InputForm
        inputPlaceholder={"Contraseña"}
        inputType={"password"}
        inputName={"password"}
        inputEye={true}
      />

      <button
        type="submit"
        className="btn btn-blue animation-fade"
        disabled={isPending}
      >
        Entrar
      </button>

      <p className="text-center text-sm text-[#31353A] mt-2">
        ¿Nuevo cliente?{" "}
        <Link className="text-primary" to={"/register"}>
          Crear cuenta
        </Link>
      </p>

      <p className="text-center text-sm text-[#31353A] mt-2">
        ¿Contraseña olvidada?{" "}
        <Link className="text-primary" to={"/forgot-password"}>
          Recuperar contraseña
        </Link>
      </p>
    </form>
  );
};

export default Form;
