import { InputPassword } from "./InputPassword";

export const InputForm = ({
  inputPlaceholder,
  inputClassName,
  inputType,
  inputName,
  inputEye,
}) => {
  return (
    <label className={`mb-3 block`}>
      <span>{inputPlaceholder}</span>
      {inputEye ? null : (
        <input
          className={inputClassName || "bootstrap-input"}
          type={inputType}
          name={inputName}
        />
      )}

      <InputPassword
        inputEye={inputEye}
        inputClassName={inputClassName}
        inputName={inputName}
      />
    </label>
  );
};
