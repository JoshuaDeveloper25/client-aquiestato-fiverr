import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductsAddedTable from "./components/ProductsAddedTable";
import FormCreateProduct from "./components/FormCreateProduct";
import { getError } from "../../utils/getError";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [openModal, setOpenModal] = useState(false);
  const [slug, setSlug] = useState("");
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: async (productInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/`,
        productInfo
      ),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("¡Producto Creado Exitosamente!");
      setOpenModal(false);
      setSlug("");
    },
    onError: (err) => {
      toast.error(getError(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e?.target);

    const formSend = {
      productName: formData.get("productName").trim(),
      slug: slug,
      stock: formData.get("stock").trim(),
      uploadImages: e?.target?.uploadImages?.files[0],
      description: formData.get("description").trim(),
      price: formData.get("price").trim(),
    };

    if (
      [
        formSend?.productName,
        formSend?.slug,
        formSend?.stock,
        formSend?.description,
      ].includes("")
    ) {
      return toast.error(`¡Llena los espacios disponibles!`);
    } else if (formSend?.stock < 0) {
      return toast.error(`¡El stock no puede ser menos 0!`);
    } else if (!formSend?.uploadImages) {
      return toast.error(`¡Imagen es requerida!`);
    } else if (formSend?.price < 0) {
      return toast.error(`¡El precio no puede ser menos 0!`);
    }

    addProductMutation?.mutate(formSend);
  };

  return (
    <section className="container-page md:px-2 px-0">
      <button
        onClick={() => setOpenModal(true)}
        className="btn btn-blue w-auto inline"
      >
        Agregar Producto
      </button>

      <Modal
        titleModal={"Crear Nuevo Producto"}
        handleSubmit={handleSubmit}
        setOpenModal={setOpenModal}
        openModal={openModal}
        setSlug={setSlug}
      >
        <FormCreateProduct
          setSlug={setSlug}
          slug={slug}
          isPending={addProductMutation?.isPending}
        />
      </Modal>

      {/* Table Products Added */}
      <ProductsAddedTable />
    </section>
  );
};

export default AddProduct;
