import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Table } from "../../../components/Table";
import { getError } from "../../../utils/getError";
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
  const queryClient = useQueryClient();
  const [openDropDown, setOpenDropDown] = useState(false);

  const deleteProductMutation = useMutation({
    mutationFn: async () =>
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/products/delete-product/${
          info?.row?.original?._id
        }`
      ),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("¡Producto eliminado exitosamentez!");
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

  return (
    <>
      <div class="font-[sans-serif] w-max mx-auto">
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

            <ul class="absolute right-24 shadow-lg bg-white py-2 z-[1000]  w-max rounded max-h-96 overflow-auto">
              <li class="py-2.5 px-5 hover:bg-primary hover:text-white font-semibold animation-fade text-black text-sm cursor-pointer">
                Editar
              </li>
              <li class="py-2.5 px-5 hover:bg-primary hover:text-white font-semibold animation-fade text-black text-sm cursor-pointer">
                Editar Imágenes
              </li>
              <li class="py-2.5 px-5 hover:bg-primary hover:text-white font-semibold animation-fade text-black text-sm cursor-pointer">
                Editar Stock
              </li>
              <li
                onClick={handleDeleteProduct}
                class="py-2.5 px-5 hover:bg-red-500 hover:text-white font-semibold animation-fade text-black text-sm cursor-pointer"
              >
                Eliminar
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
};
