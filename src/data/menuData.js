export const STALL_INFO = {
  name: "XôïS — Xôi Phú Thượng",
  subtitle: "Làng Nghề Xôi Truyền Thống Phú Thượng",
  origin: "Làng Nghề Phú Thượng, Quận Tây Hồ, Hà Nội",
  businessType: "Bán Buôn & Bán Lẻ",
  deliveryPolicy: "Phục vụ tại chỗ & đóng gói mang về. Quán hiện tại chưa hỗ trợ giao hàng tận nơi.",
  slogan: "Hạt nếp cái hoa vàng dẻo thơm nguyên bản, đượm hồn làng nghề cổ truyền",
  address: "Phú Thượng, Q. Tây Hồ, TP. Hà Nội",
  hotline: "0987.654.321",
  openHours: "06:00 – 13:00 (Tất cả các ngày trong tuần)",
  bank: {
    bankName: "MB Bank (Ngân Hàng Quân Đội)",
    accountNumber: "0987654321",
    accountHolder: "NGUYEN QUANG HUY",
    branch: "Tây Hồ, Hà Nội",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=https://vietqr.me/mb/0987654321/NGUYEN%20QUANG%20HUY/XOI%20PHU%20THUONG&color=1e382b&bgcolor=ffffff"
  }
};

export const MENU_ITEMS = [
  {
    id: 'combo-ngu-sac',
    name: 'Mẹt Xôi Ngũ Sắc Phú Thượng',
    subtitle: 'Năm sắc vị truyền thống từ thảo mộc thiên nhiên',
    price: 12000,
    image: '/images/xoi_ngu_sac.jpeg',
    category: 'combo',
    badge: 'Mâm Cỗ & Gia Đình',
    description: 'Hòa quyện 5 vị xôi đặc trưng: Gấc tươi đỏ son, Xéo vàng nghệ nếp, Dừa non cốt béo, Lạc đỏ ninh bùi và Ruốc nấm hương mặn mà. Thích hợp mâm cỗ, liên hoan gia đình.',
    isPopular: true
  },
  {
    id: 'xoi-gac',
    name: 'Xôi Gấc Phú Thượng',
    subtitle: 'Gấc nếp đỏ son • Dừa nạo • Muối vừng',
    price: 12000,
    image: '/images/xôi_gấc.jpg',
    category: 'traditional',
    badge: 'Món Truyền Thống',
    description: 'Nếp cái hoa vàng đồ cùng thịt gấc chín đỏ mọng tự nhiên, hạt bóng dẻo, ngọt thanh nhẹ nhàng, ăn kèm muối vừng rang giã tay.',
    isPopular: true
  },
  {
    id: 'xoi-xeo',
    name: 'Xôi Xéo Nghệ Đậu Xanh',
    subtitle: 'Nghệ tươi • Đậu xanh thái mỏng • Hành phi',
    price: 12000,
    image: '/images/xôi_xéo.jpg',
    category: 'traditional',
    badge: 'Đặc Sản Hà Nội',
    description: 'Nếp ủ nghệ tươi vàng ươm, đậu xanh giã nhuyễn nắm chặt thái mỏng mịn như lụa, rưới mỡ hành thơm phức và hành phi giòn.',
    isPopular: true
  },
  {
    id: 'xoi-dua',
    name: 'Xôi Dừa Nước Cốt Thơm',
    subtitle: 'Dừa nạo sợi • Nước cốt béo thanh',
    price: 12000,
    image: '/images/xôi_dừa.jpg',
    category: 'traditional',
    badge: 'Vị Dịu Béo',
    description: 'Hạt nếp trắng ngần ngấm đều nước cốt dừa tươi thơm béo, rắc dừa non nạo sợi dài giòn sần sật và mè rang vàng.',
    isPopular: false
  },
  {
    id: 'xoi-dua-vung-den',
    name: 'Xôi Dừa Vừng Đen Bổ Dưỡng',
    subtitle: 'Vừng đen thơm bùi • Cốt dừa non',
    price: 12000,
    image: '/images/xôi_dừa_2.jpg',
    category: 'healthy',
    badge: 'Dinh Dưỡng',
    description: 'Sự kết hợp tinh tế giữa xôi dừa dẻo ngậy và vừng đen sao thơm nức, bổ dưỡng cho sức khỏe.',
    isPopular: false
  },
  {
    id: 'xoi-lac',
    name: 'Xôi Lạc Nhân Đỏ',
    subtitle: 'Lạc quê ninh bùi • Muối vừng cổ truyền',
    price: 12000,
    image: '/images/xôi_lạc.jpg',
    category: 'traditional',
    badge: 'Mộc Mạc',
    description: 'Lạc cúc đỏ hạt mẩy được ninh mềm dẻo quyện chặt cùng từng hạt nếp thơm, chấm muối vừng rang giòn rụm.',
    isPopular: false
  },
  {
    id: 'xoi-ruoc-nam',
    name: 'Xôi Ruốc Nấm Hương',
    subtitle: 'Ruốc nấm chân giòn rim đậm đà',
    price: 12000,
    image: '/images/xôi_ruốc.jpg',
    category: 'savory',
    badge: 'Đậm Vị',
    description: 'Xôi nếp dẻo thơm kèm lớp ruốc nấm hương xào thơm lừng, mặn ngọt vừa vặn và hành phi mộc.',
    isPopular: true
  },
  {
    id: 'xoi-vo-che',
    name: 'Xôi Vò Chè Hoa Cau',
    subtitle: 'Xôi vò tơi hạt • Chè đỗ xanh ướp hoa lài',
    price: 12000,
    image: '/images/xôi_vò_chè.jpg',
    category: 'traditional',
    badge: 'Hương Vị Tràng An',
    description: 'Xôi vò vàng ươm tơi từng hạt bọc đậu xanh mịn, dùng kèm bát chè đường hoa cau thanh ngọt ngát hương lài truyền thống.',
    isPopular: false
  }
];

export const WHOLESALE_SERVICES = [
  {
    title: "Đặt Xôi Cúng & Rằm Mùng Một",
    desc: "Đĩa xôi gấc, xôi chè tạo hình hoa sen, chữ Vạn/Phúc tinh tế, giữ độ dẻo thơm trọn ngày cúng lễ."
  },
  {
    title: "Cung Cấp Xôi Tiệc Cưới & Hội Nghị",
    desc: "Nhận đặt số lượng lớn từ 20 đến 500 suất xôi đóng hộp giữ nhiệt hoặc mẹt bày tiệc sang trọng."
  },
  {
    title: "Phân Phối Bán Buôn Cho Đại Lý & Quán Ăn Sáng",
    desc: "Cung ứng xôi mẻ lớn theo cân/kg đầu ngày cho các điểm bán lẻ, chất lượng làng nghề chuẩn vị ổn định."
  }
];
