import { useEffect, useRef } from "react";
import { messaging, db } from "../../firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";

export default function useFCM(user) {
  const notificationAudio = useRef(new Audio("/sounds/notification.mp3"));
  const tokenSavedRef = useRef(false); // Token faqat bir marta saqlansin

  useEffect(() => {
    if (!user?.uid) return;

    // Browser notification permission
    const requestPermissionAndSaveToken = async () => {
      if (!tokenSavedRef.current) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          try {
            const token = await getToken(messaging, {
              vapidKey:
                "BLwaWokksQheSN9I_lv73x3LZ2ryvD1C5Mk0t9ICKcWToThGqkyjyHifRX3EUwKHlAVPRLBuVMr8o9BdxqwWT1o",
            });

            await setDoc(doc(db, "fcmTokens", user.uid), { token });
            console.log("Token Firestore ga saqlandi ✅");
            tokenSavedRef.current = true;
          } catch (err) {
            console.error("Token olishda yoki saqlashda xatolik:", err);
          }
        }
      }
    };

    requestPermissionAndSaveToken();

    // Real-time xabarlarni olish
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Xabar keldi:", payload);
      notificationAudio.current.play().catch((e) => console.log(e));
    });

    return () => unsubscribe();
  }, [user]);
}