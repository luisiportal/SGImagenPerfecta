import React from "react";

const Servicios = () => {
  return (
    <div>
      <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-4xl">
        Servicios
      </h1>
      <section className="grid sm:grid-cols-1 gap-10 xl:grid-cols-2 pt-5 mx-5 lg:mx-48">
        <article>
          <section>
            <h2 className="font-semibold text-2xl text-slate-700">
              Fotografía para eventos
            </h2>
            <p className="text-justify text-slate-600">
              Incluye la cobertura fotográfica de eventos como bodas,
              cumpleaños, reuniones, eventos deportivos, culturales y otros. En
              este caso, la empresa se encarga de la captura de fotografías y la
              edición para entregárselas al cliente.
            </p>
          </section>
        </article>
        <article>
          <section>
            <h2 className="font-semibold text-2xl text-slate-700">
              Estudio fotográfico en su local
            </h2>
            <p className="text-justify text-slate-600">
              Este servicio proporciona un espacio para la sesión fotográfica.
              Puede incluir fotomontajes, edición, impresión y enmarcado.
            </p>
          </section>
        </article>
        <article>
          <section>
            <h2 className="font-semibold text-2xl text-slate-700">
              Fotografía publicitaria
            </h2>
            <p className="text-justify text-slate-600">
              Comprende la elaboración de material fotográfico publicitario,
              como catálogos, folletos publicitarios, fotografías de productos,
              entre otros.
            </p>
          </section>
        </article>
        <article>
          <section>
            <h2 className="font-semibold text-2xl text-slate-700">
              Impresión fotográfica
            </h2>
            <p className="text-justify text-slate-600">
              Incluye la impresión, la ampliación y la entrega de las
              fotografías en diferentes formatos.
            </p>
          </section>
        </article>
        <article>
          <section>
            <h2 className="font-semibold text-2xl text-slate-700">
              Servicios de edición de fotografías
            </h2>
            <p className="text-justify text-slate-600">
              Este servicio comprende la edición de las fotografías para mejorar
              su calidad, eliminar imperfecciones y ajustar el color, entre
              otros ajustes.
            </p>
          </section>
        </article>
      </section>
    </div>
  );
};

export default Servicios;
