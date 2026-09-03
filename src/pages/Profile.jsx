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
import {
  BookOpen,
  Bell,
  Settings,
  LogOut,
  Camera,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  UserRound,
  ShieldCheck,
} from "lucide-react";

import {
  EditOutlined,
  UserOutlined,
  
} from "@ant-design/icons";

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
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAnnouncements(
        data.filter(
          (item) =>
            item.userId === "all" || item.userId === currentUser?.uid
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

      await updateDoc(userRef, {
        avatar: url,
      });

      await fetchUserData();

      message.success("Avatar yuklandi ✅");
    } catch (err) {
      console.error(err);
      message.error("Avatar yuklashda xatolik ❌");
    }
  };

  if (loading) {
    return (
      <section className="profile profile-loading">
        <div className="profile-loading-content">
          <Spin size="large" />
          <p>Yuklanmoqda...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="profile">
      <div className="profile-bg-grid" />
      <div className="profile-glow profile-glow-1" />
      <div className="profile-glow profile-glow-2" />

      <Header />

      <div className="container">
        <div className="profile-wrap">

          {/* TOP HEADER */}
          <div className="profile-heading">
            <div>
              <div className="profile-heading-label">
                <ShieldCheck size={15} />
                <span>ACCOUNT CENTER</span>
              </div>

              <h1>
                Shaxsiy <span>profil</span>
              </h1>

              <p>
                Shaxsiy ma'lumotlaringiz, kurslaringiz va xabarlaringizni
                bir joydan boshqaring.
              </p>
            </div>
          </div>

          {/* PROFILE HERO */}
          <Card className="profile-card profile-card-main">

            <div className="profile-hero">

              <div className="profile-avatar-section">

                <div className="profile-avatar-wrapper">
                  <Avatar
                    size={125}
                    icon={<UserOutlined />}
                    src={userData?.avatar}
                    className="profile-avatar"
                  />

                  <Upload
                    showUploadList={false}
                    customRequest={handleAvatarUpload}
                    accept="image/*"
                  >
                    <button
                      type="button"
                      className="profile-avatar-upload"
                    >
                      <Camera size={17} />
                    </button>
                  </Upload>
                </div>

                <div className="profile-user-info">
                  <div className="profile-user-status">
                    <span />
                    ACTIVE ACCOUNT
                  </div>

                  <Title level={2}>
                    {userData?.name}
                  </Title>

                  <Text className="profile-username">
                    @{userData?.username}
                  </Text>
                </div>
              </div>

              <div className="profile-contact-info">

                <div className="profile-contact-item">
                  <div className="profile-contact-icon">
                    <Mail size={18} />
                  </div>

                  <div>
                    <span>Email</span>
                    <strong>{userData?.email || "—"}</strong>
                  </div>
                </div>

                <div className="profile-contact-item">
                  <div className="profile-contact-icon">
                    <Phone size={18} />
                  </div>

                  <div>
                    <span>Telefon</span>
                    <strong>{userData?.phone || "—"}</strong>
                  </div>
                </div>

              </div>
            </div>

            <Divider />

            {/* TABS */}
            <Tabs
              className="profile-tabs"
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key)}
              items={[
                {
                  key: "1",

                  label: (
                    <span className="profile-tab-label">
                      <BookOpen size={16} />
                      Kurslar tarixi
                    </span>
                  ),

                  children:
                    orders.length > 0 ? (
                      <div className="profile-orders">

                        <div className="profile-section-heading">
                          <div>
                            <span>COURSE HISTORY</span>
                            <h3>Sizning kurslaringiz</h3>
                          </div>

                          <div className="profile-count">
                            {orders.length}
                          </div>
                        </div>

                        <List
                          className="profile-order-list"
                          itemLayout="horizontal"
                          dataSource={orders}
                          renderItem={(order, index) => (
                            <List.Item>
                              <div className="profile-order-number">
                                {String(index + 1).padStart(2, "0")}
                              </div>

                              <List.Item.Meta
                                title={
                                  <span className="profile-order-title">
                                    {order.title}
                                  </span>
                                }
                                description={
                                  <span className="profile-order-date">
                                    <Clock3 size={14} />
                                    Sana: {order.date}
                                  </span>
                                }
                              />

                              <div className="profile-order-status">
                                <CheckCircle2 size={15} />
                                {order.status}
                              </div>
                            </List.Item>
                          )}
                        />
                      </div>
                    ) : (
                      <div className="profile-empty">
                        <BookOpen size={35} />
                        <h3>Hozircha tasdiqlangan kurslar yo‘q.</h3>
                        <p>
                          Kursga yozilganingizdan so‘ng bu yerda ko‘rinadi.
                        </p>
                      </div>
                    ),
                },

                {
                  key: "2",

                  label: (
                    <span className="profile-tab-label">
                      <Settings size={16} />
                      Sozlamalar
                    </span>
                  ),

                  children: editing ? (
                    <div className="profile-settings">

                      <div className="profile-section-heading">
                        <div>
                          <span>PROFILE SETTINGS</span>
                          <h3>Ma'lumotlarni tahrirlash</h3>
                        </div>
                      </div>

                      <Form
                        layout="vertical"
                        initialValues={userData}
                        onFinish={handleUpdate}
                        className="profile-edit-form"
                      >
                        <div className="profile-form-grid">

                          <Form.Item
                            label="Ism"
                            name="name"
                          >
                            <Input
                              prefix={<UserRound size={17} />}
                              placeholder="Ismingizni kiriting"
                            />
                          </Form.Item>

                          <Form.Item
                            label="Username"
                            name="username"
                          >
                            <Input
                              prefix={<span>@</span>}
                              placeholder="Username"
                            />
                          </Form.Item>

                          <Form.Item
                            label="Email"
                            name="email"
                          >
                            <Input
                              prefix={<Mail size={17} />}
                              placeholder="Email"
                            />
                          </Form.Item>

                          <Form.Item
                            label="Telefon"
                            name="phone"
                          >
                            <Input
                              prefix={<Phone size={17} />}
                              placeholder="+998 90 123 45 67"
                            />
                          </Form.Item>

                        </div>

                        <div className="profile-form-actions">

                          <Button
                            type="primary"
                            htmlType="submit"
                            className="profile-save-btn"
                            icon={<CheckCircle2 size={17} />}
                          >
                            Saqlash
                          </Button>

                          <Button
                            onClick={() => setEditing(false)}
                            className="profile-cancel-btn"
                          >
                            Bekor qilish
                          </Button>

                        </div>
                      </Form>
                    </div>
                  ) : (
                    <div className="profile-settings">

                      <div className="profile-section-heading">
                        <div>
                          <span>PERSONAL INFORMATION</span>
                          <h3>Shaxsiy ma'lumotlar</h3>
                        </div>
                      </div>

                      <div className="profile-info-grid">

                        <div className="profile-info-box">
                          <span>Ism</span>
                          <strong>{userData?.name}</strong>
                        </div>

                        <div className="profile-info-box">
                          <span>Username</span>
                          <strong>@{userData?.username}</strong>
                        </div>

                        <div className="profile-info-box">
                          <span>Email</span>
                          <strong>{userData?.email}</strong>
                        </div>

                        <div className="profile-info-box">
                          <span>Telefon</span>
                          <strong>{userData?.phone || "—"}</strong>
                        </div>

                      </div>

                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => setEditing(true)}
                        className="profile-edit-btn"
                      >
                        Tahrirlash
                      </Button>

                    </div>
                  ),
                },

                {
                  key: "3",

                  label: (
                    <span className="profile-tab-label">
                      <Bell size={16} />
                      Xabarlar

                      {announcements.length > 0 && (
                        <span className="profile-notification-count">
                          {announcements.length}
                        </span>
                      )}
                    </span>
                  ),

                  children:
                    announcements.length > 0 ? (
                      <div className="profile-announcements">

                        <div className="profile-section-heading">
                          <div>
                            <span>NOTIFICATIONS</span>
                            <h3>Sizga yuborilgan xabarlar</h3>
                          </div>

                          <Bell size={20} />
                        </div>

                        <div className="profile-announcement-scroll">

                          <List
                            itemLayout="horizontal"
                            dataSource={announcements}
                            renderItem={(item) => (
                              <List.Item>

                                <div className="profile-notification-icon">
                                  <Bell size={17} />
                                </div>

                                <List.Item.Meta
                                  title={item.title}
                                  description={
                                    item.text || item.message
                                  }
                                />

                                <Text className="profile-notification-date">
                                  {item.createdAt?.toDate
                                    ? item.createdAt
                                        .toDate()
                                        .toLocaleString()
                                    : ""}
                                </Text>

                              </List.Item>
                            )}
                          />

                        </div>
                      </div>
                    ) : (
                      <div className="profile-empty">
                        <Bell size={35} />
                        <h3>Hozircha xabar yo‘q 🔔</h3>
                        <p>
                          Yangi xabarlar shu yerda ko‘rinadi.
                        </p>
                      </div>
                    ),
                },
              ]}
            />

            <Divider />

            {/* LOGOUT */}
            <div className="profile-logout-section">
              <div>
                <span>ACCOUNT</span>
                <p>Hisobingizdan xavfsiz chiqishingiz mumkin.</p>
              </div>

              <Button
                danger
                onClick={onLogout}
                icon={<LogOut size={17} />}
                className="profile-logout-btn"
              >
                Chiqish
              </Button>
            </div>

          </Card>
        </div>
      </div>
    </section>
  );
}

export default Profile;