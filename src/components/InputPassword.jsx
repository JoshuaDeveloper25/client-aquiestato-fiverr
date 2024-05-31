import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";

export const InputPassword = ({ inputEye, inputClassNameAdd, inputName }) => {
  const [visible, setVisible] = useState(false);

  return inputEye ? (
    <div style={{ position: `${inputEye ? "relative" : "static"}` }}>
      <input
        className={inputClassNameAdd || "bootstrap-input"}
        type={visible ? "text" : "password"}
        name={inputName}
      />

      {visible ? (
        <FaRegEye
          onClick={() => setVisible(!visible)}
          className="cursor-pointer absolute size-5 top-3 right-5"
        />
      ) : (
        <FaRegEyeSlash
          onClick={() => setVisible(!visible)}
          className="cursor-pointer absolute size-5 top-3 right-5"
        />
      )}
    </div>
  ) : null;
};
