import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getError } from "../../../utils/getError";
import { MdClose } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const FormEditImages = ({
  setOpenEditImagesModal,
  infoRow,
  isPending,
  addedImages,
  setAddedImages,
}) => {
  const [editSingleImage, setEditSingleImage] = useState({});
  const [prueba, setPrueba] = useState({});
  const queryClient = useQueryClient();
  const inputFile = useRef(null);

  const deleteSingleImageMutation = useMutation({
    mutationFn: async (imageInfo) =>
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/products/delete-image/${
          infoRow?._id
        }`,
        {
          params: imageInfo,
        }
      ),
    onSuccess: (res) => {
      toast.success("¡Imagen eliminada exitosamente!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpenEditImagesModal(false);
      console.log(res);
    },
    onError: (err) => {
      toast.error(getError(err));
    },
  });

  const handleDeleteSingleImage = (cloudinary_id) => {
    const user_request = confirm(`¿Deseas eliminar esta imagen?`);

    if (!user_request) {
      return;
    }

    deleteSingleImageMutation?.mutate({ imageId: cloudinary_id });
  };

  const handleDeleteUploadedImage = (id) => {
    const user_request = confirm(`¿Deseas quitar esta imagen?`);

    if (!user_request) return;

    const uploadedImagesAvailable = addedImages?.filter(
      (item) => item.id !== id
    );

    setAddedImages(uploadedImagesAvailable);
  };

  // --> ✅ Upload a file (jpg, jpeg, png)
  const handleUploadFile = (e) => {
    const uploadedImages = {
      url: URL.createObjectURL(e?.target?.files[0]),
      id: uuidv4(),
    };

    setAddedImages([...addedImages, uploadedImages]);
  };

  // --> ✅ Functionality to open upload files once the edit button is pressed
  const handleEditUploadFile = (id, url) => {
    inputFile?.current?.click();
  };

  // --> This is once the user has submitted the image
  const handleEditPenImage = (e, editSingleImageObject) => {
    console.log("Entramos");
    setEditSingleImage(editSingleImageObject);
    const itemId = 1;

    const uploadedImages = {
      url: URL.createObjectURL(inputFile.current?.files[0]),
      id: editSingleImageObject,
    };

    setPrueba((prevState) => {
      const index = prevState.findIndex(({ id }) => (id = itemId));
      const item = prevState[index];
      return [
        ...prevState.slice(0, index),
        { ...item, messages: [...item.messages, ...addedImages] },
        ...prevState.slice(index + 1),
      ];
    });
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-2">
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
              onChange={handleUploadFile}
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

      <div
        className="space-x-3 overflow-x-auto py-2 whitespace-nowrap gap-4"
        style={{
          margin: `${addedImages?.length !== 0 ? "1.5rem  0 0 0" : "0"}`,
        }}
      >
        {addedImages?.map((item) => {
          return (
            <div className="relative inline-block" key={uuidv4()}>
              <img className="h-28 w-28" src={item?.url} />
              <button
                type="button"
                onClick={() => handleEditUploadFile(item?.id)}
              >
                <input
                  ref={inputFile}
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onInput={(e) => handleEditPenImage(e, item)}
                />
                <MdEdit className="size-7 p-[.4rem] hover:text-blue-500 animation-fade hover:bg-white text-white rounded-full absolute cursor-pointer -top-2 right-6 bg-blue-500" />
              </button>
              <button type="button">
                {" "}
                <MdClose
                  onClick={() => handleDeleteUploadedImage(item?.id, item?.url)}
                  className="size-7 p-[.4rem] hover:text-red-500 animation-fade hover:bg-white text-white rounded-full absolute cursor-pointer -top-2 -right-2 bg-red-500"
                />
              </button>
            </div>
          );
        }) || []}
      </div>

      <button type="submit" className="btn btn-blue" disabled={isPending}>
        {isPending ? (
          <>
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-800 fill-white"
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
              Editando...
              <span className="sr-only">Editando...</span>
            </div>
          </>
        ) : (
          "Guardar Cambios"
        )}
      </button>

      <h3 className="heading-title font-medium text-base my-4">
        Imágenes Agregadas:{" "}
        <span className="font-bold">{infoRow?.images?.length}</span>
      </h3>

      <div className="space-x-3 overflow-x-auto py-2 whitespace-nowrap gap-4">
        {infoRow?.images?.map((item) => {
          return (
            <div className="relative inline-block" key={item?.cloudinary_id}>
              <img className="h-28 w-28" src={item?.cloudinary_url} />
              <MdClose
                onClick={() => handleDeleteSingleImage(item?.cloudinary_id)}
                className="size-6 hover:text-red-500 animation-fade hover:bg-white text-white rounded-full absolute cursor-pointer -top-2 -right-2 bg-red-500"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FormEditImages;
