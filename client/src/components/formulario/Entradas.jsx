import React from 'react'
import Input from './Input'
const Entradas = ({values, handleChange, errors}) => {
  return (
    <>
    <Input
                label={"Nombre Producto"}
                name={"nombre_producto"}
                type={"text"}
                value={values.nombre_producto}
                handleChange={handleChange}
                errors={errors}
              ></Input>

              <label htmlFor="descripcion" className="block"></label>
              <textarea
                name="descripcion"
                rows="3"
                placeholder="Detalles del producto"
                className="my-2 px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.descripcion}
              ></textarea>
              <Input
                label={"Precio"}
                name={"precio_venta"}
                type={"text"}
                value={values.precio_venta}
                handleChange={handleChange}
                errors={errors}
              ></Input>
              <Input
                label={"Formato entrega"}
                name={"formato_entrega"}
                type={"text"}
                value={values.formato_entrega}
                handleChange={handleChange}
                errors={errors}
              ></Input>
              <Input
                label={"Locación"}
                name={"locacion"}
                type={"text"}
                value={values.locacion}
                handleChange={handleChange}
                errors={errors}
              ></Input>
    
    </>
  )
}

export default Entradas
