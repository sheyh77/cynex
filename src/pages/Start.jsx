import React from "react";
import { Modal, Button, Typography, Space, message } from "antd";
import { db } from "../../firebaseConfig"; // Firebase config
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "antd/dist/reset.css";

const { Title, Paragraph } = Typography;

function Start({ visible, setVisible, currentUser }) {

    const test = null
    
    const handleJoinCourse = async () => {
        if (!currentUser) {
            message.error("Avval login qiling!");
            return;
        }

        try {
            // Firebase ga yangi so'rov qo'shish
            await addDoc(collection(db, "courseRequests"), {
                userId: currentUser.id || "",        // bu username bo‘ladi
                username: currentUser.username || "",
                name: currentUser.name || "",
                createdAt: serverTimestamp(),
                status: "pending"
            });


            // Muvaffaqiyatli xabar
            message.success("So‘rovingiz qabul qilindi! Tez orada habar beriladi.");
            setVisible(false); // modalni yopish
        } catch (err) {
            console.error(err);
            message.error("Xatolik yuz berdi! Iltimos qayta urinib ko‘ring.");
        }
    };

    const handleLearnMore = () => {
        message.info("Batafsil ma’lumot sahifaga yo‘naltirildi!");
        setVisible(false);
    };

    return (
        <Modal
            title="Bizning Maxsus Kursimiz"
            open={visible}
            onCancel={() => setVisible(false)}
            footer={null}
            centered
            width={500}
        >
            <Typography>
                <Title level={3}>Salom! Kursimizga xush kelibsiz!</Title>
                <Paragraph>
                    Bu yerda siz React, JavaScript va boshqa zamonaviy web texnologiyalarni o‘rganishingiz mumkin.
                    Kursimiz interaktiv, amaliyotga boy va har bir bosqichda qo‘llab-quvvatlash mavjud.
                </Paragraph>
                <Paragraph>
                    Siz darhol kursga qo‘shilib, o‘zingizga qulay vaqtda darslarni boshlashingiz mumkin.
                </Paragraph>
            </Typography>

            <Space style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
                <Button type="primary" onClick={handleJoinCourse}>
                    Kursga qo‘shilish
                </Button>
                <Button onClick={handleLearnMore}>
                    Batafsil
                </Button>
            </Space>
        </Modal>
    );
}

export default Start;