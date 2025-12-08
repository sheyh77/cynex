// firebaseAuthPhone.js
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth();

export const setupRecaptcha = (containerId) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      containerId,
      {
        size: "invisible", // "normal" ham bo'lishi mumkin
        callback: (response) => {
          console.log("reCAPTCHA tasdiqlandi", response);
        },
      },
      auth
    );
  }
  return window.recaptchaVerifier;
};

export const sendOtp = async (phoneNumber) => {
  const appVerifier = setupRecaptcha("recaptcha-container");
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  window.confirmationResult = confirmationResult;
  return confirmationResult;
};