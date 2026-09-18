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
  Bell,
  Settings,
  LogOut,
  Camera,
  CheckCircle2,
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
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "../layout/Header";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

function Profile({ currentUser, onLogout, notifications = [] }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: "Foydalanuvchi",
    username: "",
    email: "",
    phone: "",
    avatar: null,
  });

  const [activeTab, setActiveTab] = useState("settings");

  // Foydalanuvchi ma'lumotlarini olish
  const fetchUserData = async () => {
    if (!currentUser?.uid) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();

        setUserData(data);
      }
    } catch (err) {
      console.error(err);
      message.error(t("messages.dataError"));
    } finally {
      setLoading(false);
    }
  };

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

      message.success(t("messages.profileUpdated"));
    } catch (err) {
      console.error(err);
      message.error(t("messages.updateError"));
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

      message.success(t("messages.avatarUploaded"));
    } catch (err) {
      console.error(err);
      message.error(t("messages.avatarError"));
    }
  };

  if (loading) {
    return (
      <section className="profile profile-loading">
        <div className="profile-loading-content">
          <Spin size="large" />
          <p>{t("profile.loading")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="profile">
      <div className="profile-bg-grid" />
      <div className="profile-glow profile-glow-1" />
      <div className="profile-glow profile-glow-2" />

      <Header currentUser={currentUser} />

      <div className="container">
        <div className="profile-wrap">

          {/* TOP HEADER */}
          <div className="profile-heading">
            <div>
              <div className="profile-heading-label">
                <ShieldCheck size={15} />
                <span>{t("profile.accountCenter")}</span>
              </div>

              <h1>
                {t("profile.titlePart1")} <span>{t("profile.titleHighlight")}</span>
              </h1>

              <p>
                {t("profile.description")}
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
                    {t("profile.activeAccount")}
                  </div>

                  <Title level={2}>
                    {userData?.name}
                  </Title>

                  <Text className="profile-username">
                    @{userData?.username}
                  </Text>

                  <div className="profile-user-chips">
                    <span>{currentUser?.role === "admin" ? t("profile.adminRole") : t("profile.userRole")}</span>
                    <span>{userData?.active === false ? t("profile.blocked") : t("profile.verified")}</span>
                  </div>
                </div>
              </div>

              <div className="profile-contact-info">

                <div className="profile-contact-item">
                  <div className="profile-contact-icon">
                    <Mail size={18} />
                  </div>

                  <div>
                    <span>{t("profile.email")}</span>
                    <strong>{userData?.email || "—"}</strong>
                  </div>
                </div>

                <div className="profile-contact-item">
                  <div className="profile-contact-icon">
                    <Phone size={18} />
                  </div>

                  <div>
                    <span>{t("profile.phone")}</span>
                    <strong>{userData?.phone || "—"}</strong>
                  </div>
                </div>

              </div>
            </div>

            <div className="profile-overview-strip">
              <div className="profile-overview-card">
                <Bell size={18} />
                <span>{t("profile.messages")}</span>
                <strong>{notifications.length}</strong>
              </div>

              <div className="profile-overview-card">
                <ShieldCheck size={18} />
                <span>{t("profile.account")}</span>
                <strong>{userData?.active === false ? t("profile.off") : t("profile.on")}</strong>
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
                  key: "settings",

                  label: (
                    <span className="profile-tab-label">
                      <Settings size={16} />
                      {t("profile.settings")}
                    </span>
                  ),

                  children: editing ? (
                    <div className="profile-settings">

                      <div className="profile-section-heading">
                        <div>
                          <span>{t("profile.settingsLabel")}</span>
                          <h3>{t("profile.editInfo")}</h3>
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
                            label={t("profile.name")}
                            name="name"
                          >
                            <Input
                              prefix={<UserRound size={17} />}
                              placeholder={t("profile.namePlaceholder")}
                            />
                          </Form.Item>

                          <Form.Item
                            label={t("profile.username")}
                            name="username"
                          >
                            <Input
                              prefix={<span>@</span>}
                              placeholder="Username"
                            />
                          </Form.Item>

                          <Form.Item
                            label={t("profile.email")}
                            name="email"
                          >
                            <Input
                              prefix={<Mail size={17} />}
                              placeholder="Email"
                              disabled
                            />
                          </Form.Item>

                          <Form.Item
                            label={t("profile.phone")}
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
                            {t("profile.save")}
                          </Button>

                          <Button
                            onClick={() => setEditing(false)}
                            className="profile-cancel-btn"
                          >
                            {t("profile.cancel")}
                          </Button>

                        </div>
                      </Form>
                    </div>
                  ) : (
                    <div className="profile-settings">

                      <div className="profile-section-heading">
                        <div>
                          <span>{t("profile.personalInfoLabel")}</span>
                          <h3>{t("profile.personalInfo")}</h3>
                        </div>
                      </div>

                      <div className="profile-info-grid">

                        <div className="profile-info-box">
                          <span>{t("profile.name")}</span>
                          <strong>{userData?.name}</strong>
                        </div>

                        <div className="profile-info-box">
                          <span>{t("profile.username")}</span>
                          <strong>@{userData?.username}</strong>
                        </div>

                        <div className="profile-info-box">
                          <span>{t("profile.email")}</span>
                          <strong>{userData?.email}</strong>
                        </div>

                        <div className="profile-info-box">
                          <span>{t("profile.phone")}</span>
                          <strong>{userData?.phone || "—"}</strong>
                        </div>

                      </div>

                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => setEditing(true)}
                        className="profile-edit-btn"
                      >
                        {t("profile.edit")}
                      </Button>

                    </div>
                  ),
                },

                {
                  key: "messages",

                  label: (
                    <span className="profile-tab-label">
                      <Bell size={16} />
                      {t("profile.messages")}

                      {notifications.length > 0 && (
                        <span className="profile-notification-count">
                          {notifications.length}
                        </span>
                      )}
                    </span>
                  ),

                  children:
                    notifications.length > 0 ? (
                      <div className="profile-announcements">

                        <div className="profile-section-heading">
                          <div>
                            <span>{t("profile.notificationsLabel")}</span>
                            <h3>{t("profile.sentMessages")}</h3>
                          </div>

                          <Bell size={20} />
                        </div>

                        <div className="profile-announcement-scroll">

                          <List
                            itemLayout="horizontal"
                            dataSource={notifications}
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
                        <h3>{t("profile.noMessages")}</h3>
                        <p>
                          {t("profile.noMessagesDescription")}
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
                <span>{t("profile.account")}</span>
                <p>{t("profile.logoutDescription")}</p>
              </div>

              <Button
                danger
                onClick={onLogout}
                icon={<LogOut size={17} />}
                className="profile-logout-btn"
              >
                {t("profile.logout")}
              </Button>
            </div>

          </Card>
        </div>
      </div>
    </section>
  );
}

export default Profile;