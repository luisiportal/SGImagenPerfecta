import jwt from "jsonwebtoken";

// Definición directa del secreto (en producción usa variables de entorno del sistema)
export const TOKEN_SECRET = "Ichbin";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "6h",
        algorithm: "HS256",
      },
      (err, token) => {
        if (err) {
          console.error("Error al generar token:", err);
          reject(new Error("Error al generar el token de acceso"));
        }
        resolve(token);
      }
    );
  });
}

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error("Error al verificar token:", err);
        reject(new Error("Token inválido o expirado"));
      }
      resolve(decoded);
    });
  });
}
