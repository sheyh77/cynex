import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tabs,
  Tag,
  Typography,
  message,
} from "antd";
import {
  Boxes,
  FilePlus2,
  LayoutDashboard,
  Layers3,
  BellRing,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import Header from "../layout/Header";

const { Text, Title } = Typography;
const { TextArea } = Input;

const collectionConfigs = {
  projects: {
    title: "Loyihalar",
    description: "Project bo'limida chiqadigan yangi ishlar.",
    icon: FilePlus2,
    collectionName: "projects",
    nameField: "title",
    emptyText: "Hali loyiha qo'shilmagan",
    fields: [
      { name: "title", label: "Nomi", required: true },
      { name: "category", label: "Kategoriya", required: true },
      { name: "description", label: "Qisqa tavsif", type: "textarea", required: true },
      { name: "details", label: "Batafsil matn", type: "textarea" },
      { name: "image", label: "Rasm URL" },
      { name: "link", label: "Loyiha linki" },
      { name: "browserLabel", label: "Rasm ustidagi label" },
      { name: "technologiesText", label: "Texnologiyalar", placeholder: "React, Node.js, Firebase" },
      { name: "order", label: "Tartib", type: "number" },
      { name: "active", label: "Saytda ko'rinsin", type: "switch" },
    ],
  },
  products: {
    title: "Productlar",
    description: "Saytga qo'shiladigan mahsulot yoki xizmat kartalari.",
    icon: Boxes,
    collectionName: "products",
    nameField: "name",
    emptyText: "Hali product qo'shilmagan",
    fields: [
      { name: "name", label: "Product nomi", required: true },
      { name: "category", label: "Kategoriya" },
      { name: "price", label: "Narx / tarif" },
      { name: "description", label: "Tavsif", type: "textarea", required: true },
      { name: "image", label: "Rasm URL" },
      { name: "link", label: "Link" },
      { name: "featuresText", label: "Imkoniyatlar", placeholder: "CRM, Hisobot, Integratsiya" },
      { name: "order", label: "Tartib", type: "number" },
      { name: "active", label: "Saytda ko'rinsin", type: "switch" },
    ],
  },
  sections: {
    title: "Qo'shimcha bo'limlar",
    description: "Landing pagega yangi informatsion bo'lim qo'shish.",
    icon: Layers3,
    collectionName: "siteSections",
    nameField: "title",
    emptyText: "Hali bo'lim qo'shilmagan",
    fields: [
      { name: "eyebrow", label: "Kichik label" },
      { name: "title", label: "Sarlavha", required: true },
      { name: "subtitle", label: "Subtitle" },
      { name: "body", label: "Asosiy matn", type: "textarea", required: true },
      { name: "image", label: "Rasm URL" },
      { name: "buttonText", label: "Button matni" },
      { name: "buttonLink", label: "Button linki" },
      { name: "order", label: "Tartib", type: "number" },
      { name: "active", label: "Saytda ko'rinsin", type: "switch" },
    ],
  },
  notifications: {
    title: "Notificationlar",
    description: "Userlarga ovozli xabar yuborish.",
    icon: BellRing,
    collectionName: "notifications",
    nameField: "title",
    emptyText: "Hali notification yuborilmagan",
    sortField: "createdAt",
    sortDirection: "desc",
    fields: [
      { name: "title", label: "Sarlavha", required: true },
      { name: "text", label: "Xabar matni", type: "textarea", required: true },
      { name: "userId", label: "Kimga yuboriladi", required: true, placeholder: "all yoki user UID" },
      { name: "order", label: "Tartib", type: "number" },
    ],
  },
};

const csvToArray = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const arrayToCsv = (value) => (Array.isArray(value) ? value.join(", ") : "");

function Admin({ currentUser }) {
  const [activeTab, setActiveTab] = useState("projects");
  const [items, setItems] = useState({
    projects: [],
    products: [],
    sections: [],
    notifications: [],
  });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    if (!isAdmin) return undefined;

    const unsubscribers = Object.entries(collectionConfigs).map(([key, config]) => {
      const contentQuery = query(
        collection(db, config.collectionName),
        orderBy(config.sortField || "order", config.sortDirection || "asc")
      );

      return onSnapshot(
        contentQuery,
        (snapshot) => {
          setItems((current) => ({
            ...current,
            [key]: snapshot.docs.map((document) => ({
              id: document.id,
              ...document.data(),
            })),
          }));
          setLoading(false);
        },
        (error) => {
          console.error(error);
          message.error("Admin ma'lumotlarini olishda xatolik");
          setLoading(false);
        }
      );
    });

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [isAdmin]);

  const stats = useMemo(
    () => [
      { label: "Loyihalar", value: items.projects.length },
      { label: "Productlar", value: items.products.length },
      { label: "Bo'limlar", value: items.sections.length },
      { label: "Xabarlar", value: items.notifications.length },
    ],
    [items]
  );

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const config = collectionConfigs[activeTab];
  const Icon = config.icon;

  const openCreateModal = () => {
    setEditingItem(null);
    form.resetFields();
    form.setFieldsValue({
      active: true,
      userId: "all",
      order: items[activeTab].length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    form.setFieldsValue({
      ...item,
      technologiesText: arrayToCsv(item.technologies),
      featuresText: arrayToCsv(item.features),
      active: item.active !== false,
    });
    setModalOpen(true);
  };

  const normalizeValues = (values) => {
    const normalized = {
      ...values,
      active: values.active !== false,
      order: Number(values.order || 99),
      updatedAt: serverTimestamp(),
    };

    if (activeTab === "projects") {
      normalized.technologies = csvToArray(values.technologiesText);
      delete normalized.technologiesText;
    }

    if (activeTab === "products") {
      normalized.features = csvToArray(values.featuresText);
      delete normalized.featuresText;
    }

    if (activeTab === "notifications") {
      normalized.userId = values.userId || "all";
      normalized.read = false;
    }

    return normalized;
  };

  const handleSave = async (values) => {
    setSaving(true);

    try {
      const payload = normalizeValues(values);
      const collectionName = config.collectionName;

      if (editingItem) {
        await updateDoc(doc(db, collectionName, editingItem.id), payload);
        message.success("Ma'lumot yangilandi");
      } else {
        await addDoc(collection(db, collectionName), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        message.success("Yangi ma'lumot qo'shildi");
      }

      setModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Saqlashda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      await deleteDoc(doc(db, config.collectionName, item.id));
      message.success("O'chirildi");
    } catch (error) {
      console.error(error);
      message.error("O'chirishda xatolik yuz berdi");
    }
  };

  const columns = [
    {
      title: "Nomi",
      dataIndex: config.nameField,
      render: (value, record) => (
        <div className="admin-table-title">
          <strong>{value || record.title}</strong>
          <span>{record.category || record.eyebrow || "Kontent"}</span>
        </div>
      ),
    },
    {
      title: "Tartib",
      dataIndex: "order",
      width: 90,
      render: (value) => value || 99,
    },
    {
      title: "Holat",
      dataIndex: "active",
      width: 120,
      render: (active) => (
        <Tag color={active === false ? "red" : "green"}>
          {active === false ? "Yashirin" : "Aktiv"}
        </Tag>
      ),
    },
    {
      title: "Amallar",
      width: 160,
      render: (_, record) => (
        <Space>
          <Button icon={<Pencil size={15} />} onClick={() => openEditModal(record)} />
          <Popconfirm
            title="O'chirilsinmi?"
            okText="Ha"
            cancelText="Yo'q"
            onConfirm={() => handleDelete(record)}
          >
            <Button danger icon={<Trash2 size={15} />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <main className="admin-page">
      <Header currentUser={currentUser} />

      <div className="admin-bg-grid" />
      <div className="admin-glow admin-glow-1" />
      <div className="admin-glow admin-glow-2" />

      <div className="admin-container">
        <section className="admin-hero">
          <div>
            <div className="admin-label">
              <LayoutDashboard size={16} />
              <span>CYNEX ADMIN</span>
            </div>

            <Title>Kontent boshqaruvi</Title>
            <Text>
              Loyihalar, productlar va sayt bo'limlarini bitta paneldan qo'shing,
              tahrirlang yoki yashiring.
            </Text>
          </div>

          <Button type="primary" icon={<Plus size={17} />} onClick={openCreateModal}>
            Yangi qo'shish
          </Button>
        </section>

        <div className="admin-stats">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </Card>
          ))}
        </div>

        <Card className="admin-board">
          <div className="admin-board-head">
            <div>
              <Icon size={19} />
              <div>
                <strong>{config.title}</strong>
                <span>{config.description}</span>
              </div>
            </div>
          </div>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={Object.entries(collectionConfigs).map(([key, item]) => ({
              key,
              label: item.title,
            }))}
          />

          <Table
            rowKey="id"
            columns={columns}
            dataSource={items[activeTab]}
            loading={loading}
            pagination={{ pageSize: 8 }}
            locale={{ emptyText: config.emptyText }}
            scroll={{ x: 620 }}
          />
        </Card>
      </div>

      <Modal
        open={modalOpen}
        title={editingItem ? "Tahrirlash" : `Yangi ${config.title.toLowerCase()}`}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={760}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          className="admin-form"
          onFinish={handleSave}
          initialValues={{ active: true, order: 99 }}
        >
          <div className="admin-form-grid">
            {config.fields.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.label}
                valuePropName={field.type === "switch" ? "checked" : "value"}
                rules={field.required ? [{ required: true, message: `${field.label} kiriting` }] : []}
              >
                {field.type === "textarea" ? (
                  <TextArea rows={4} placeholder={field.placeholder} />
                ) : field.type === "number" ? (
                  <InputNumber min={1} />
                ) : field.type === "switch" ? (
                  <Switch />
                ) : (
                  <Input placeholder={field.placeholder} />
                )}
              </Form.Item>
            ))}
          </div>

          <div className="admin-form-actions">
            <Button onClick={() => setModalOpen(false)}>Bekor qilish</Button>
            <Button type="primary" htmlType="submit" loading={saving}>
              Saqlash
            </Button>
          </div>
        </Form>
      </Modal>
    </main>
  );
}

export default Admin;