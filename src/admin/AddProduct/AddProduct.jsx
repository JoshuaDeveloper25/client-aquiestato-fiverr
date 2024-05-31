import { useMutation } from "@tanstack/react-query";
import { getError } from "../../utils/getError";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import Form from "./components/Form";
import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [openModal, setOpenModal] = useState(false);

  const addProductMutation = useMutation({
    mutationFn: async (productInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/`,
        productInfo
      ),
    onSuccess: (res) => {
      toast.success("¡Producto Creado Exitosamente!");
      setOpenModal(false);
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(getError(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e?.target);

    const formSend = {
      productName: formData.get("productName").trim(),
      slug: formData.get("slug").trim(),
      stock: formData.get("stock").trim(),
      uploadImages: e?.target?.uploadImages?.files[0],
      description: formData.get("description").trim(),
    };

    if (
      [
        formSend?.productName,
        formSend?.slug,
        formSend?.stock,
        formSend?.uploadImages,
        formSend?.description,
      ].includes("")
    ) {
      return toast.error(`¡Llena los espacios disponibles!`);
    }

    addProductMutation?.mutate(formSend);
  };

  return (
    <section className="container-page px-0">
      <button onClick={() => setOpenModal(true)} className="btn btn-blue">
        Agregar Producto
      </button>

      <Modal
        titleModal={"Crear Nuevo Producto"}
        handleSubmit={handleSubmit}
        setOpenModal={setOpenModal}
        openModal={openModal}
      >
        <Form isPending={addProductMutation?.isPending} />
      </Modal>
    </section>
  );
};

export default AddProduct;
