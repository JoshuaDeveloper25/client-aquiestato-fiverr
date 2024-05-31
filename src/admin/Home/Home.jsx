import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="container-page px-0">
      <div>
        <Link
          className="border-2 border-primary hover:bg-primary hover:text-white animation-fade font-medium rounded inline-block p-4"
          to={"/admin/add-product"}
        >
          Agregar Producto
        </Link>
      </div>
    </section>
  );
};

export default Home;
