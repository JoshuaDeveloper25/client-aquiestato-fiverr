import { InputForm } from "../../../components/InputForm";

const Form = ({ isPending }) => {
  return (
    <>
      <div className="grid gap-4 mb-4 grid-cols-2">
        <div className="col-span-2">
          <InputForm
            inputPlaceholder="Nombre"
            inputClassNameAdd={"mb-1"}
            inputType="text"
            inputName="productName"
            labelClassNameAdd={"mb-0"}
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <InputForm
            inputPlaceholder="Slug"
            inputClassNameAdd={"mb-1"}
            labelClassNameAdd={"mb-0"}
            inputType="text"
            inputName="slug"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <InputForm
            inputPlaceholder="Stock"
            inputClassNameAdd={"mb-1"}
            inputType="number"
            inputName="stock"
            labelClassNameAdd={"mb-0"}
          />
        </div>

        <div className="col-span-2">
          <label className="block">
            <span>Descripción</span>
            <textarea
              name="description"
              className="bootstrap-input w-full h-20"
            ></textarea>
          </label>
        </div>

        <div className="col-span-2">
          <label
            htmlFor="uploadImages"
            className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-11 mb-2 fill-gray-500"
              viewBox="0 0 32 32"
            >
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000000"
              />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000"
              />
            </svg>
            Subir archivo
            <input
              type="file"
              name="uploadImages"
              id="uploadImages"
              className="hidden"
            />
            <p className="text-xs font-medium text-gray-400 mt-2">
              PNG, JPG SVG, WEBP, and GIF are Allowed.
            </p>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-blue"
        disabled={isPending}
      >
        {isPending ? "Agregando..." : "Agregar"}
      </button>
    </>
  );
};

export default Form;
