import React, { useState } from "react";
import { Modal, Button, Typography, Space, message, Input, DatePicker, Form } from "antd";
import { db } from "../../firebaseConfig"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "antd/dist/reset.css";

const { Title, Paragraph } = Typography;

function Start({ visible, setVisible, currentUser }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleJoinCourse = async () => {
    try {
      const values = await form.validateFields();

      if (!currentUser) {
        message.error("Avval login qiling!");
        return;
      }

      setLoading(true);

      // Firebase ga yangi so'rov qo'shish
      await addDoc(collection(db, "courseRequests"), {
        userId: currentUser.id,
        username: currentUser.username,
        name: values.name,
        surname: values.surname,
        birthDate: values.birthDate ? values.birthDate.format("YYYY-MM-DD") : null,
        phone: values.phone,
        createdAt: serverTimestamp(),
        status: "pending",
      });

      message.success("So‘rovingiz qabul qilindi! Tez orada habar beriladi.");
      form.resetFields();
      setVisible(false);
    } catch (err) {
      console.error(err);
      message.error("Xatolik yuz berdi! Iltimos qayta urinib ko‘ring.");
    } finally {
      setLoading(false);
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
        </Paragraph>
        <Paragraph>
          Ro‘yxatdan o‘tish uchun quyidagi ma’lumotlarni kiriting:
        </Paragraph>
      </Typography>

      {/* Forma */}
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Ism"
          rules={[{ required: true, message: "Ismingizni kiriting!" }]}
        >
          <Input placeholder="Ismingizni kiriting" />
        </Form.Item>

        <Form.Item
          name="surname"
          label="Familiya"
          rules={[{ required: true, message: "Familiyangizni kiriting!" }]}
        >
          <Input placeholder="Familiyangizni kiriting" />
        </Form.Item>

        <Form.Item
          name="birthDate"
          label="Tug‘ilgan sana"
          rules={[{ required: true, message: "Tug‘ilgan sanangizni kiriting!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telefon raqami"
          rules={[{ required: true, message: "Telefon raqamingizni kiriting!" }]}
        >
          <Input placeholder="+998901234567" />
        </Form.Item>
      </Form>

      {/* Tugmalar */}
      <Space style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
        <Button type="primary" loading={loading} onClick={handleJoinCourse}>
          Kursga qo‘shilish
        </Button>
        <Button onClick={handleLearnMore}>Batafsil</Button>
      </Space>
    </Modal>
  );
}

export default Start;