const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  // ✅ Configurar CORS correctamente
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // ✅ Manejar solicitudes `OPTIONS` (preflight)
  if (req.method === "OPTIONS") {
    return res.status(204).end(); // Código 204 No Content
  }

  // ✅ Solo aceptar POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // ✅ Obtener datos del formulario
  const { name, email, message, recaptcha } = req.body;
  if (!name || !email || !message || !recaptcha) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // ✅ Validar reCAPTCHA (Omitir si es dummy_token)
  if (recaptcha !== "dummy_token") {
    const recaptchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
    }).then(res => res.json());

    if (!recaptchaRes.success || recaptchaRes.score < 0.5) {
      return res.status(400).json({ error: "Fallo en la validación de reCAPTCHA" });
    }
  } else {
    console.log("Usando dummy token, omitiendo validación de reCAPTCHA.");
  }

  // ✅ Configurar nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "eath2497@gmail.com",
    subject: `Nuevo mensaje de ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error enviando el correo", details: error.message });
  }
};
