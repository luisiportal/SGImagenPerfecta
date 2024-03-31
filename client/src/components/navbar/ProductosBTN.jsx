import React from 'react'

const ProductosBTN = () => {
  return (
    <button className="bg-slate-700 px-2 py-1 font-bold text-white rounded hover:bg-slate-900 transition-all duration-500 ease-in-out">
    <Link to={"/cliente"}>{titulo}</Link>
  </button>
  )
}

export default ProductosBTN