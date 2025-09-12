// PhoneAuth.jsx
import React, { useState } from "react";
import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export default function PhoneAuth({ onComplete }) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }
  };

  const sendCode = async (e) => {
    e.preventDefault();
    setupRecaptcha();
    try {
      const recaptcha = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, recaptcha);
      setConfirmationResult(result);
      alert("Kod yuborildi");
    } catch (err) {
      console.error(err);
      alert("SMS yuborishda xatolik");
    }
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    try {
      const res = await confirmationResult.confirm(code); // foydalanuvchi tasdiqlandi
      const user = res.user;
      // Firestore ga user ma'lumotini saqlash va obunachi deb belgilash
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        phone: user.phone,
        createdAt: new Date().toISOString(),
        subscribed: true // agar obuna bo'lishini xohlasang true
      });
      onComplete && onComplete(user);
    } catch (err) {
      console.error(err);
      alert("Kod xato");
    }
  };

  return (
    <div>
      <form onSubmit={sendCode}>
        <input
          type="tel"
          placeholder="+998901234567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Kod yuborish</button>
      </form>

      <div id="recaptcha-container"></div>

      {confirmationResult && (
        <form onSubmit={verifyCode}>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" />
          <button type="submit">Tasdiqlash</button>
        </form>
      )}
    </div>
  );
}