import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("🔹 API llamada: /api/sendEmail");

  if (req.method !== "POST") {
    console.error("❌ Método no permitido:", req.method);
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { name, email, message, recaptcha } = req.body;
  console.log("📨 Datos recibidos:", { name, email, message });

  try {
    // Validar si las variables de entorno existen
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ Faltan variables de entorno");
      return res.status(500).json({ error: "Faltan configuraciones de servidor" });
    }

    // Configurar el envío de correo
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

    console.log("📤 Enviando correo...");
    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado correctamente");

    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("❌ Error enviando el correo:", error);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
}
