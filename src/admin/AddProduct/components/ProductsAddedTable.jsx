import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getError } from "../../../utils/getError";
import { Table } from "../../../components/Table";
import FormEditProduct from "./FormEditProduct";
import Modal from "../../../components/Modal";
import FormEditImages from "./FormEditImages";
import FormEditStock from "./FormEditStock";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const ProductsAddedTable = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      await axios?.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/products/get-all-products-admin-empleados`
      ),
  });

  const columns = [
    {
      header: "Nombre",
      accessorKey: "productName",
    },

    {
      header: "Descripción",
      accessorKey: "description",
    },

    {
      header: "Precio",
      accessorKey: "price",
    },

    {
      header: "Cantidad (Stock)",
      accessorKey: "stock",
    },

    {
      header: "Acciones",
      cell: (info) => <ActionsProducts info={info} />,
    },
  ];

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <p>Ocurrió algo...</p>;
  }

  return (
    <div className="my-5">
      {/* --> Table */}
      <Table columns={columns} data={data?.data} />
    </div>
  );
};

export default ProductsAddedTable;

const ActionsProducts = ({ info }) => {
  const [openEditImagesModal, setOpenEditImagesModal] = useState(false);
  const [openEditStockModal, setOpenEditStockModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [addedImages, setAddedImages] = useState([]);
  const [slug, setSlug] = useState("");
  const queryClient = useQueryClient();
  console.log(addedImages);

  const deleteProductMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/products/delete-product/${
          info?.row?.original?._id
        }`
      ),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("¡Producto eliminado exitosamente!");
    },
    onError: (err) => {
      toast.error(getError(err));
    },
  });

  const handleDeleteProduct = () => {
    const user_request = confirm(`¿Deseas eliminar este producto?`);

    if (!user_request) {
      return;
    }

    deleteProductMutation?.mutate();
  };

  const editProductMutation = useMutation({
    mutationFn: async (productInfo) =>
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/products/edit-product/${
          info?.row?.original?._id
        }`,
        productInfo
      ),
    onSuccess: (res) => {
      toast.success("¡Producto editado exitosamente!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpenEditModal(false);
    },
    onError: (err) => {
      toast.error(getError(err));
    },
  });

  const handleEditProduct = (e) => {
    e.preventDefault();

    const formData = new FormData(e?.target);

    const formSend = {
      productName: formData.get("productName").trim(),
      slug: slug,
      description: formData.get("description").trim(),
      price: formData.get("price").trim(),
    };

    if (
      [formSend?.productName, formSend?.slug, formSend?.description].includes(
        ""
      )
    ) {
      return toast.error(`¡Llena los espacios disponibles!`);
    } else if (formSend?.stock < 0) {
      return toast.error(`¡El stock no puede ser menos 0!`);
    } else if (formSend?.price < 0) {
      return toast.error(`¡El precio no puede ser menos 0!`);
    }

    editProductMutation?.mutate(formSend);
  };

  const editStockMutation = useMutation({
    mutationFn: async (productInfo) =>
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/products/edit-stock/${
          info?.row?.original?._id
        }`,
        productInfo
      ),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("¡Stock editado exitosamente!");
      setOpenEditStockModal(false);
      console.log(res);
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const handleEditStock = (e) => {
    e.preventDefault();

    const formData = new FormData(e?.target);

    const formSend = {
      stock: formData.get("stock").trim(),
    };

    if ([formSend?.stock].includes("")) {
      return toast.error(`¡Llena los espacios disponibles!`);
    } else if (formSend?.stock < 0) {
      return toast.error(`¡El stock no puede ser menos 0!`);
    }

    editStockMutation?.mutate(formSend);
  };

  const editImagesMutation = useMutation({
    mutationFn: async (imagesInfo) =>
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/products/upload-images/${
          info?.row?.original?._id
        }`,
        {
          params: imagesInfo,
        }
      ),
    onSuccess: (res) => {
      toast.success("¡Acción exitosamente realizada!");
      console.log(res);
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const handleEditImages = (e) => {
    e.preventDefault();

    const formSend = {
      uploadImages: e?.target?.uploadImages?.files[0],
    };

    if (!formSend?.uploadImages) {
      return toast.error(`¡Imagen es requerida!`);
    }

    editImagesMutation?.mutate(addedImages);
  };

  return (
    <>
      <div className="font-[sans-serif] w-max mx-auto">
        <button
          id="dropdownDividerButton"
          data-dropdown-toggle="dropdownDivider"
          className="animation-fade text-xl hover:rounded-full hover:opacity-45 hover:bg-black/20 p-2"
          onClick={() => setOpenDropDown(!openDropDown)}
          type="button"
        >
          <BsThreeDotsVertical />
        </button>

        {openDropDown && (
          <>
            {createPortal(
              <div
                onClick={() => setOpenDropDown(!openDropDown)}
                className="h-[100vh] fixed top-0 w-full"
              ></div>,
              document.body
            )}

            <ul className="absolute right-24 shadow-lg bg-white py-2 z-[1000]  w-max rounded max-h-96 overflow-auto">
              <li
                onClick={() => {
                  setOpenEditModal(true);
                  setOpenDropDown(false);
                  setSlug(info?.row?.original?.slug);
                }}
                className="py-2.5 px-5 hover:bg-primary hover:text-white font-semibold animation-fade text-black text-sm cursor-pointer"
              >
                Editar
              </li>
              <li
                onClick={() => {
                  setOpenEditImagesModal(true);
                  setOpenDropDown(false);
                }}
                className="py-2.5 px-5 hover:bg-primary hover:text-white font-semibold animation-fade text-black text-sm cursor-pointer"
              >
                Editar Imágenes
              </li>
              <li
                onClick={() => {
                  setOpenEditStockModal(true);
                  setOpenDropDown(false);
                }}
                className="py-2.5 px-5 hover:bg-primary hover:text-white font-semibold animation-fade text-black text-sm cursor-pointer"
              >
                Editar Stock
              </li>
              <li
                onClick={handleDeleteProduct}
                className="py-2.5 px-5 hover:bg-red-500 hover:text-white font-semibold animation-fade text-black text-sm cursor-pointer"
              >
                Eliminar
              </li>
            </ul>
          </>
        )}
      </div>

      {/* Edit Product Modal */}
      {openEditModal && (
        <Modal
          handleSubmit={handleEditProduct}
          titleModal={"Editar Producto"}
          setOpenModal={setOpenEditModal}
          openModal={openEditModal}
        >
          <FormEditProduct
            isPending={editProductMutation?.isPending}
            infoRow={info?.row?.original}
            setSlug={setSlug}
            slug={slug}
          />
        </Modal>
      )}

      {/* Edit Images Modal */}
      {openEditImagesModal && (
        <Modal
          handleSubmit={handleEditImages}
          titleModal={"Editar Imágenes"}
          setOpenModal={setOpenEditImagesModal}
          openModal={openEditImagesModal}
        >
          <FormEditImages
            setOpenEditImagesModal={setOpenEditImagesModal}
            isPending={editImagesMutation?.isPending}
            setAddedImages={setAddedImages}
            infoRow={info?.row?.original}
            addedImages={addedImages}
          />
        </Modal>
      )}

      {/* Edit Stock Modal */}
      {openEditStockModal && (
        <Modal
          handleSubmit={handleEditStock}
          titleModal={"Editar Stock"}
          setOpenModal={setOpenEditStockModal}
          openModal={openEditStockModal}
        >
          <FormEditStock
            isPending={editStockMutation?.isPending}
            infoRow={info?.row?.original}
          />
        </Modal>
      )}
    </>
  );
};
