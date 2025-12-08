// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Form,
  Input,
  List,
  Spin,
  Tabs,
  Upload,
  Typography,
  message,
} from "antd";
import { UserOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
import { db, storage } from "../../firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "../layout/Header";

const { Title, Text } = Typography;

function Profile({ currentUser, onLogout }) {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Foydalanuvchi",
    username: "",
    email: "",
    phone: "",
    avatar: null,
    orders: [],
  });
  const [orders, setOrders] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  // Foydalanuvchi ma'lumotlarini olish
  const fetchUserData = async () => {
    if (!currentUser?.uid) return;
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserData(data);
        setOrders((data.orders || []).filter((order) => order.accepted));
      }
    } catch (err) {
      console.error(err);
      message.error("Ma’lumotlarni olishda xatolik ❌");
    } finally {
      setLoading(false);
    }
  };

  // Admin xabarlarini real-time olish
  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAnnouncements(
        data.filter(
          (item) => item.userId === "all" || item.userId === currentUser?.uid
        )
      );
    });
    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    fetchUserData();
  }, [currentUser]);

  // Profilni yangilash
  const handleUpdate = async (values) => {
    if (!currentUser?.uid) return;
    setLoading(true);
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, values);
      await fetchUserData();
      setEditing(false);
      message.success("Profil yangilandi ✅");
    } catch (err) {
      console.error(err);
      message.error("Yangilashda xatolik ❌");
    } finally {
      setLoading(false);
    }
  };

  // Avatar yuklash
  const handleAvatarUpload = async ({ file }) => {
    if (!currentUser?.uid) return;
    const storageRef = ref(storage, `avatars/${currentUser.uid}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, { avatar: url });
      await fetchUserData();
      message.success("Avatar yuklandi ✅");
    } catch (err) {
      console.error(err);
      message.error("Avatar yuklashda xatolik ❌");
    }
  };

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
    );

  return (
    <section className="profile">
      <Header />
      <div className="cantainer">
        <div className="profile-wrap">
          <Card className="profile-card">
            {/* Profil ma'lumotlari */}
            <div className="profile-card-item">
              <Avatar
                size={100}
                icon={<UserOutlined />}
                src={userData?.avatar}
                style={{ backgroundColor: "#1677ff" }}
              />
              <div>
                <Title className="profile-card-item-none" level={3}>{userData?.name}</Title>
                <Text type="secondary">@{userData?.username}</Text>
                <br />
                <Text className="profile-card-item-none">{userData?.email}</Text>
                <br />
                <Text className="profile-card-item-none">{userData?.phone}</Text>
              </div>
            </div>

            <Divider />

            {/* Tabs */}
            <Tabs
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key)}
              items={[
                {
                  key: "1",
                  label: "Kurslar tarixi",
                  children:
                    orders.length > 0 ? (
                      <List
                        itemLayout="horizontal"
                        dataSource={orders}
                        renderItem={(order) => (
                          <List.Item>
                            <List.Item.Meta
                              title={order.title}
                              description={`Sana: ${order.date}`}
                            />
                            <Text>{order.status}</Text>
                          </List.Item>
                        )}
                      />
                    ) : (
                      <Text>Hozircha tasdiqlangan kurslar yo‘q.</Text>
                    ),
                },
                {
                  key: "2",
                  label: "Sozlamalar",
                  children: editing ? (
                    <Form
                      layout="vertical"
                      initialValues={userData}
                      onFinish={handleUpdate}
                      style={{ maxWidth: 400 }}
                    >
                      <Form.Item label="Ism" name="name">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Username" name="username">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Email" name="email">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Telefon" name="phone">
                        <Input />
                      </Form.Item>
                      <div style={{ display: "flex", gap: 10 }}>
                        <Button type="primary" htmlType="submit">
                          Saqlash
                        </Button>
                        <Button onClick={() => setEditing(false)}>
                          Bekor qilish
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    <div>
                      <p>
                        <strong>Ism:</strong> {userData?.name}
                      </p>
                      <p>
                        <strong>Username:</strong> @{userData?.username}
                      </p>
                      <p>
                        <strong>Email:</strong> {userData?.email}
                      </p>
                      <p>
                        <strong>Telefon:</strong> {userData?.phone}
                      </p>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => setEditing(true)}
                      >
                        Tahrirlash
                      </Button>
                    </div>
                  ),
                },
                {
                  key: "3",
                  label: "Xabarlar",
                  children:
                    announcements.length > 0 ? (
                      <div
                        style={{
                          maxHeight: "250px",
                          overflowY: "auto",
                          paddingRight: "10px",
                        }}
                      >
                        <List
                          itemLayout="horizontal"
                          dataSource={announcements}
                          renderItem={(item) => (
                            <List.Item>
                              <List.Item.Meta
                                title={item.title}
                                description={item.text || item.message}
                              />
                              <Text type="secondary">
                                {item.createdAt?.toDate
                                  ? item.createdAt.toDate().toLocaleString()
                                  : ""}
                              </Text>
                            </List.Item>
                          )}
                        />
                      </div>
                    ) : (
                      <Text>Hozircha xabar yo‘q 🔔</Text>
                    ),
                },
              ]}
            />

            <Divider />
            <Button danger onClick={onLogout}>
              Chiqish
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Profile;
