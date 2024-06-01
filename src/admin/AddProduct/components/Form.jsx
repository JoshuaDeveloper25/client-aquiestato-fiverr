import { InputForm } from "../../../components/InputForm";

const Form = ({ slug, setSlug, isPending }) => {
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
            onChange={(e) => setSlug(e?.target?.value)}
            valueEvent={slug}
          />
        </div>

        <div className="col-span-2">
          <h3 className="bg-secondary/30 text-white font-semibold rounded text-sm px-2 py-1 w-full">
            Link del producto:{" "}
            <span className="text-primary underline font-medium">
              {slug?.replace(/ /g, "-")}
            </span>
          </h3>
        </div>

        <div className="col-span-2">
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
              className="opacity-0"
              accept=".jpeg, .jpg, .png"
            />
            <p className="text-xs font-medium text-gray-400 mt-2">
              JPG, JPEG, PNG están Permitidos.
            </p>
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-blue" disabled={isPending}>
        {isPending ? (
          <>
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-800 fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>{" "}
              Agregando...
              <span class="sr-only">Agregando...</span>
            </div>
          </>
        ) : (
          "Agregar"
        )}
      </button>
    </>
  );
};

export default Form;
