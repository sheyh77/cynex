// ... boshqa importlar bir xil qoladi
import { db, storage } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore"; // 🔴 faqat kerakli qismlar
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";

function Profile({ currentUser, onLogout }) {
  const location = useLocation();
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
  const [activeTab, setActiveTab] = useState("1");

  // 🔴 NOTIFICATION USEEFFECT olib tashlandi!

  // User ma'lumotlarini olish
  const fetchUserData = async () => {
    if (!currentUser?.uid) return;
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserData(data);
        setOrders((data.orders || []).filter((order) => order.accepted));
      } else {
        setUserData({
          name: "Foydalanuvchi",
          username: "",
          email: "",
          phone: "",
          avatar: null,
          orders: [],
        });
        setOrders([]);
      }
    } catch (err) {
      console.error(err);
      message.error("Ma’lumotlarni olishda xatolik ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

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
    return <Spin size="large" style={{ display: "block", margin: "100px auto" }} />;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px" }}>
      <Card bordered style={{ borderRadius: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        {/* Profil ma'lumotlari */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={userData?.avatar}
            style={{ backgroundColor: "#1677ff" }}
          />
          <div>
            <Title level={3}>{userData?.name}</Title>
            <Text type="secondary">@{userData?.username}</Text>
            <br />
            <Text>{userData?.email}</Text>
            <br />
            <Text>{userData?.phone}</Text>
          </div>
          <Upload customRequest={handleAvatarUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Avatarni yuklash</Button>
          </Upload>
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
              children: orders.length > 0 ? (
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
                    <Button type="primary" htmlType="submit">Saqlash</Button>
                    <Button onClick={() => setEditing(false)}>Bekor qilish</Button>
                  </div>
                </Form>
              ) : (
                <div>
                  <p><strong>Ism:</strong> {userData?.name}</p>
                  <p><strong>Username:</strong> @{userData?.username}</p>
                  <p><strong>Email:</strong> {userData?.email}</p>
                  <p><strong>Telefon:</strong> {userData?.phone}</p>
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
              children: <Text>Hamma xabarlar App darajasida tinglanmoqda 🔔</Text>,
            },
          ]}
        />

        <Divider />
        <Button danger onClick={onLogout}>Chiqish</Button>
      </Card>
    </div>
  );
}

export default Profile;