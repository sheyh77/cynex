import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const PORT = process.env.PORT || 5000;

app.post("/send-message", async (req, res) => {
  const { name, phone, message } = req.body;

  const text = `📩 Yangi xabar:

👤 Ism: ${name}
📱 Telefon: ${phone}
📝 Xabar: ${message}`;

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      }
    );

    const telegramData = await telegramResponse.json();

    if (!telegramData.ok) {
      return res.status(500).json({
        ok: false,
        msg: "Telegram xabar yuborishda xatolik",
      });
    }

    res.json({
      ok: true,
      msg: "Xabar yuborildi!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: "Xatolik bo‘ldi",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishlayapti`);
});