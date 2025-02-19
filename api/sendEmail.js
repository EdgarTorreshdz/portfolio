import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { name, email, message, recaptcha } = req.body;

  try {
    // Validar reCAPTCHA en Vercel
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${recaptcha}`,
      { method: "POST" }
    ).then((res) => res.json());

    if (!recaptchaRes.success || recaptchaRes.score < 0.5) {
      return res.status(400).json({ error: "Fallo en la validación de reCAPTCHA" });
    }

    // Configuración de nodemailer en Vercel
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "eath2497@gmail.com",
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error enviando el correo:", error);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
}
