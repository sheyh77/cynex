// Detail.jsx
import React from "react";
import { Typography, Card, Row, Col, Divider, List, Modal } from "antd";

const { Title, Paragraph, Text } = Typography;

function Detail({ visible, setVisible }) {
  const tarifs = [
    {
      title: "Start",
      desc: [
        "1-chi 5 ta dars bepul",
        "Keyingi darsliklarning har biri 20 000 so‘m",
        "Oylik to‘lov varianti: $20",
      ],
    },
    {
      title: "Premium",
      desc: [
        "24/7 istalgan vaqtda shaxsiy mentorlik",
        "Darslar guruh bo‘lib emas, individual tarzda",
        "Oylik: $30",
        "3 oylik: $70",
        "6 oylik: $150",
      ],
    },
  ];

  return (
    <Modal
      title="Kurs haqida ma’lumotnoma"
      open={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      centered
      width={800}
    >
      <Typography>
        <Paragraph>
          Ushbu kurs orqali siz <Text strong>Frontend dasturlash</Text>ni —
          HTML, CSS, JavaScript va React asoslarini o‘rganasiz. Kurs
          amaliyotga asoslangan bo‘lib, real loyihalarda ishlash tajribasini
          beradi.
        </Paragraph>

        <Divider />

        <Title level={4}>Tariflar</Title>
        <Row gutter={[16, 16]}>
          {tarifs.map((tarif) => (
            <Col xs={24} md={12} key={tarif.title}>
              <Card title={tarif.title} bordered>
                <List
                  dataSource={tarif.desc}
                  renderItem={(item) => <List.Item>- {item}</List.Item>}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Divider />

        <Title level={4}>Afzalliklari</Title>
        <List
          dataSource={[
            "Interaktiv darslar va amaliy mashg‘ulotlar",
            "Mentor yordamida murakkab mavzularni chuqur o‘rganish",
            "Har bir dars yozuvlari (video + materiallar)",
            "Kurs tugagach sertifikat",
          ]}
          renderItem={(item) => <List.Item>✅ {item}</List.Item>}
        />
      </Typography>
    </Modal>
  );
}

export default Detail;