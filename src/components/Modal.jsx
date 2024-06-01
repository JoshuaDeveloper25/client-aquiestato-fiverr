const Modal = ({
  handleSubmit,
  children,
  titleModal,
  openModal,
  setOpenModal,
  setSlug,
}) => {
  const handleCloseModal = () => {
    setOpenModal(false);
    setSlug("");
  };

  return (
    openModal && (
      <>
        {/* Main modal  */}
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full min-h-full bg-black/50"
        >
          <div className="relative p-4 w-full max-w-md mx-auto ">
            {/* Modal content */}
            <div className="relative rounded-lg shadow dark:bg-white max-h-[80vh] overflow-y-auto">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 ">
                  {titleModal}
                </h3>

                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Cerrar modal</span>
                </button>
              </div>

              {/*  Modal body */}
              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                {children}
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Modal;
