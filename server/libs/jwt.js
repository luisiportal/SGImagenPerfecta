import jwt from "jsonwebtoken";

// Usar variable de entorno en producción
export const TOKEN_SECRET = "Ichbin";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "6h" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

// export function verifyToken(token) {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         console.error("Error al verificar token:", err);
//         reject(new Error("Token inválido o expirado"));
//       }
//       resolve(decoded);
//     });
//   });
// }
