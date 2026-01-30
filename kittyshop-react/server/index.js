import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/order', async (req, res) => {
  const { items, total, phone, address, message } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'El carrito esta vacio.' });
  }
  if (!phone || !address) {
    return res.status(400).json({ error: 'Faltan telefono o direccion.' });
  }

  const to = process.env.ORDER_TO;
  const from = process.env.RESEND_FROM || 'AmiKittyShop <onboarding@resend.dev>';

  if (!to || !process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Faltan variables de entorno.' });
  }

  const lines = items
    .map((item) => `${item.title} x${item.quantity} - $${item.price}`)
    .join('\n');

  const text = [
    'Nuevo pedido',
    '',
    `Productos:\n${lines}`,
    '',
    `Total: $${total}`,
    `Telefono: ${phone}`,
    `Direccion: ${address}`,
    `Mensaje: ${message || '-'}`,
  ].join('\n');

  const htmlItems = items
    .map(
      (item) =>
        `<li>${item.title} x${item.quantity} - $${item.price}</li>`,
    )
    .join('');

  const html = `
    <h2>Nuevo pedido</h2>
    <p><strong>Total:</strong> $${total}</p>
    <p><strong>Telefono:</strong> ${phone}</p>
    <p><strong>Direccion:</strong> ${address}</p>
    <p><strong>Mensaje:</strong> ${message || '-'}</p>
    <h3>Productos</h3>
    <ul>${htmlItems}</ul>
  `;

  try {
    const data = await resend.emails.send({
      from,
      to,
      subject: 'Nuevo pedido - AmiKittyShop',
      text,
      html,
    });
    return res.json({ ok: true, data });
  } catch (error) {
    return res.status(500).json({ error: 'No se pudo enviar el email.' });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});
