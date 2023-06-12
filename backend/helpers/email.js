import nodemailer from "nodemailer";

export const emailRegistro = async(datos) => {

    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6b8784cf81e7d1",
        pass: "c3bc70918c7727",
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