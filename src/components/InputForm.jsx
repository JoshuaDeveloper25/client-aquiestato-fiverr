import { InputPassword } from "./InputPassword";

export const InputForm = ({
  inputPlaceholder,
  inputPlaceholderBox,
  inputClassNameScratch,
  inputClassNameAditional,
  inputClassNameAdd,
  labelClassNameAdd,
  defaultValue,
  inputType,
  inputName,
  inputEye,
  onChange,
  valueEvent,
}) => {
  return (
    <label className={`block ${labelClassNameAdd || "mb-3"}`}>
      <span>{inputPlaceholder}</span>
      {inputEye ? null : (
        <input
          className={
            `bootstrap-input block ${inputClassNameAditional}` ||
            inputClassNameScratch
          }
          type={inputType}
          name={inputName}
          onChange={onChange}
          value={valueEvent}
          space="&nbsp;"
          placeholder={inputPlaceholderBox}
          defaultValue={defaultValue}
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
