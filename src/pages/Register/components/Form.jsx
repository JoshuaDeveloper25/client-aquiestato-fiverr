import { InputForm } from "../../../components/InputForm";
import { Link } from "react-router-dom";

const Form = ({ handleSubmit, isPending }) => {
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <InputForm
        inputPlaceholder={"Nombre"}
        inputType={"text"}
        inputName={"name"}
      />

      <InputForm
        inputPlaceholder={"Apellidos"}
        inputType={"text"}
        inputName={"surNames"}
      />

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
        Crear mi cuenta
      </button>

      <p className="text-center text-sm text-[#31353A] mt-2">
        ¿Ya tienes una cuenta?{" "}
        <Link className="text-primary" to={"/sign-in"}>
          Entrar aquí
        </Link>
      </p>
    </form>
  );
};

export default Form;
