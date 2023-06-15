import nodemailer from "nodemailer";

export const emailRegistro = async(datos) => {

    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transport.sendMail({
        from: '"APV - Administrador de pacientes de veterinaria" <cuentas@APV.com>',
        to: email,
        subject: "APV - Confirma tu cuenta",
        text: "Comprueba tu cuenta en APV",
        html: `
            <p>Hola: ${nombre} Comprueba tu cuenta en APV</p>
            <p>Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace:</p>

            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>

            <p>Si tu no creaste esta cuenta, ignora el mensaje</p>
        `
    })
};


export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  //TODO: Mover hacia variables de entorno
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"APV - Administrador de pacientes de veterinaria" <cuentas@APV.com>',
    to: email,
    subject: "APV - Reestablece tu password",
    text: "Comprueba tu cuenta en APV",
    html: `
            <p>Hola: ${nombre} Cha solicitado reestablecer tu password</p>
            <p>Sigue el siguiente enlace para generar el nuevo password:</p>

            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer passwrod</a>

            <p>Si tu no solicitaste este email, ignora el mensaje</p>
        `,
  });
};