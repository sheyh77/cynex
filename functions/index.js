const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio");

admin.initializeApp();
const db = admin.firestore();

const TWILIO_SID = functions.config().twilio.sid; // set with firebase functions:config:set
const TWILIO_TOKEN = functions.config().twilio.token;
const TWILIO_FROM = functions.config().twilio.from; // Twilio phone number

const client = twilio(TWILIO_SID, TWILIO_TOKEN);

// HTTP trigger — admin UI dan chaqiriladi (auth tekshirish qo'shishni unutmang)
exports.sendSmsToSubscribers = functions.https.onCall(async (data, context) => {
  // context.auth tekshirish — faqat adminlar chaqirishi kerak
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  // (Qo'shimcha: context.auth.token.admin === true kabi role tekshirish)
  const message = data.message;
  if (!message) throw new functions.https.HttpsError('invalid-argument', 'Message is required');

  // Firestore dan subscribed foydalanuvchilarni o'qish
  const subsSnapshot = await db.collection("users").where("subscribed", "==", true).get();
  const results = [];

  for (const doc of subsSnapshot.docs) {
    const user = doc.data();
    const to = user.phone;
    try {
      const sent = await client.messages.create({
        body: message,
        from: TWILIO_FROM,
        to: to
      });
      results.push({ to, status: "sent", sid: sent.sid });
    } catch (err) {
      console.error("SMS error for", to, err.message);
      results.push({ to, status: "error", error: err.message });
    }
  }

  return { results };
});