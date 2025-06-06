import express from "express";
import multer from "multer";
import fs from "fs";
import { log } from "console";

const app = express();

export const uploadOferta = multer({
  dest: `../client/public/images/ofertas/`,
});
export const uploadTrabajador = multer({
  dest: `../client/public/images/trabajadores/perfil/`,
});

export function saveImage(file, tipoFoto) {
  if (file === undefined) {
    return;
  }
  try {
    const newPath = `../client/public/images/${tipoFoto}/${file.originalname}`;

    fs.renameSync(file.path, newPath);

    return newPath;
  } catch (error) {}
}
