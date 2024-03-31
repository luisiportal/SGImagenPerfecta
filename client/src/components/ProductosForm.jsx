import { Form, Formik } from "formik";
import { useProductos } from "../context/ProductoProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  actualizarProductoRequest,
  crearProductoRequest,
  listarunProductoRequest,
} from "../api/productos.api";
import Entradas from "./formulario/Entradas";

const schema = Yup.object().shape({
  nombre_producto: Yup.string().required("Nombre producto requerido"),
  precio_venta: Yup.number()
    .typeError("Debes escribir solo números")
    .positive("El precio debe ser mayor que cero")
    .required("Precio Requerido"),
});

const ProductoForm = () => {
  const { getProducto, updateProducto } = useProductos();
  const [file, setFile] = useState(null);
  const [producto, setProducto] = useState({
    id_producto: Date.now(),
    nombre_producto: "",
    descripcion: "",
    precio_venta: "",
    formato_entrega: "",
    locacion: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducto = async () => {
      if (params.id_producto) {
        const producto = await listarunProductoRequest(params.id_producto);
  

        setProducto({
          id_producto: producto.id_producto,
          nombre_producto: producto.nombre_producto,
          descripcion: producto.descripcion,
          precio_venta: producto.precio_venta,
          formato_entrega: producto.formato_entrega,
          locacion: producto.locacion,
        });

        (e) => {
          setFile(e.target.files[0]);
        };
      }
    };
    loadProducto();
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (params.id_producto) {
        await actualizarProductoRequest(params.id_producto, values);

        alert("Se ha actualizado el producto");
      } else {
        await crearProductoRequest(values);

        alert("Se ha creado el producto correctamente");
      }
      navigate("/productos");
    } catch (error) {
      console.log(error);
      alert("Error al actualizar producto  " + error);
    }
  };

  return (
    <div className="mx-2 bg-neutral-200 rounded-md p-4">
      <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-2xl lg:text-4xl">
        {params.id_producto ? "Editar Producto" : "Agregar producto"}
      </h1>

      <div className="mt-8">
        <Formik
          initialValues={producto}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({ handleChange, handleSubmit, errors, values, isSubmitting }) => (
            // FORMULARIO PARA RELLENAR CAMPOS
            <Form
              onSubmit={handleSubmit}
              className="bg-neutral-200 max-w-md rounded-md p-4 mx-auto"
            >
              {
                /*muestra la imagen preview */ file && (
                  <img
                    className="w-40 h-40 shadow-xl border-slate-50 border-spacing-2 rounded-md"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                )
              }
              <Entradas values={values} handleChange={handleChange} errors={errors} />
              <label htmlFor="imagenPerfil" className="block"></label>
              <input
                name="ruta_image"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className=" bg-huellas_color w-full text-2md text-black font-bold block p-2 rounded-md"
              >
                {params.id_producto
                  ? "Aplicar cambios"
                  : isSubmitting
                    ? "Guardando..."
                    : "Agregar"}
              </button>
              <br />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductoForm;
