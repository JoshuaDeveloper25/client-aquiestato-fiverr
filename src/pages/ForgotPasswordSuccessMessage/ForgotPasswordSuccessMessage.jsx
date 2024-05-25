import logo from "../../img/logo.jpg";

const ForgotPasswordSuccessMessage = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[100vh]">
      <div className="max-w-md mx-auto shadow-xl p-5 rounded-md w-full">
        <img className="w-48 rounded-full mx-auto mb-4" src={logo} />
        <h2 className="heading-title text-center mb-3">
          Te hemos enviado un mensaje a tu correo electrónico
        </h2>

        <h4 className="heading-title text-base text-center">
          Nos preocupamos por tu seguridad.
        </h4>

        <p className="text-center text-sm text-[#31353A] mt-2">
          Puedes cerrar esta pestaña...
        </p>
      </div>
    </section>
  );
};

export default ForgotPasswordSuccessMessage;
