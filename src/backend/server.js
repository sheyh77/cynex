import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Telegram config
const BOT_TOKEN = "8416977698:AAHew3xLWBRlKPlJWKLnU_u6JLP_jXFOudU";
const CHAT_ID = "8348827765";

// Endpoint
app.post("/send-message", async (req, res) => {
  const { name, phone, message } = req.body;

  const text = `📩 Yangi xabar:\n👤 Ism: ${name}\n📱 Telefon: ${phone}\n📝 Xabar: ${message}`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
      }),
    });

    res.json({ success: true, message: "Xabar yuborildi!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Xatolik bo‘ldi" });
  }
});

app.listen(5000, () => console.log("Server 5000-portda ishlayapti 🚀"));