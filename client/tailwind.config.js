/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        huellas_color: "#f9a217",
        grayFotos:"#474747",
        sect_gray:"#dddddd",
        he_card:"#54595f"
      },
      width:{
        w_4foto:569 ,
      },
      height:{
        h_4foto:379,
      }
    },
  },
  plugins: [],
};
