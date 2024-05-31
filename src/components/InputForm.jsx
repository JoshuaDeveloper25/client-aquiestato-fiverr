import { InputPassword } from "./InputPassword";

export const InputForm = ({
  inputPlaceholder,
  inputClassNameScratch,
  inputClassNameAdd,
  labelClassNameAdd,
  inputType,
  inputName,
  inputEye,
}) => {
  return (
    <label className={`block ${labelClassNameAdd || 'mb-3'}`}>
      <span>{inputPlaceholder}</span>
      {inputEye ? null : (
        <input
          className={"bootstrap-input" || inputClassNameScratch}
          type={inputType}
          name={inputName}
        />
      )}

      <InputPassword
        inputEye={inputEye}
        inputClassNameAdd={inputClassNameAdd}
        inputName={inputName}
      />
    </label>
  );
};
