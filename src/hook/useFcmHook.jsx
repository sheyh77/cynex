import { useEffect, useRef } from "react";

export default function useFCM(user) {
  const notificationAudio = useRef(new Audio("/sounds/notification.mp3"));
  const tokenSavedRef = useRef(false); // Token faqat bir marta saqlansin

  useEffect(() => {
    if (!user?.uid) return;

    let unsubscribe = () => {};
    let cancelled = false;

    // Browser notification permission
    const requestPermissionAndSaveToken = async () => {
      if (!("Notification" in window)) return;

      if (!tokenSavedRef.current) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          try {
            const [{ getToken }, { doc, setDoc }, { messaging, db }] = await Promise.all([
              import("firebase/messaging"),
              import("firebase/firestore"),
              import("../../firebaseConfig"),
            ]);

            if (cancelled) return;

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
    const subscribeToForegroundMessages = async () => {
      try {
        const [{ onMessage }, { messaging }] = await Promise.all([
          import("firebase/messaging"),
          import("../../firebaseConfig"),
        ]);

        if (cancelled) return;

        unsubscribe = onMessage(messaging, (payload) => {
          console.log("Xabar keldi:", payload);
          notificationAudio.current.play().catch((e) => console.log(e));
        });
      } catch (err) {
        console.error("Foreground notification listener xatoligi:", err);
      }
    };

    subscribeToForegroundMessages();

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [user]);
}