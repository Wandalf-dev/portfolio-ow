import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation des champs requis
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  // Validation de la longueur du nom (min 3 caractères)
  if (name.trim().length < 3) {
    return res.status(400).json({ error: 'Le nom doit contenir au moins 3 caractères' });
  }

  // Validation du format email
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Format d\'email invalide' });
  }

  // Validation de la longueur du message (min 10 caractères)
  if (message.trim().length < 10) {
    return res.status(400).json({ error: 'Le message doit contenir au moins 10 caractères' });
  }

  try {
    const response = await axios.post('https://api.brevo.com/v3/smtp/email', {
      sender: {
        name: "Portfolio Contact",
        email: process.env.VITE_CONTACT_EMAIL
      },
      to: [
        {
          email: process.env.VITE_CONTACT_EMAIL,
          name: "Portfolio Contact"
        }
      ],
      subject: `Nouveau message depuis votre portfolio - ${name}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">Nouveau message depuis votre portfolio</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Date :</strong> ${new Date().toLocaleString('fr-FR')}</p>
          </div>
          <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #1f2937; margin-top: 0;">Message :</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            Pour répondre, cliquez simplement sur "Répondre"
          </p>
        </div>
      `,
      replyTo: {
        email: email,
        name: name
      }
    }, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.VITE_BREVO_API_KEY
      }
    });

    res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur Brevo:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Erreur lors de l\'envoi de l\'email',
      details: error.response?.data?.message || error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
});
