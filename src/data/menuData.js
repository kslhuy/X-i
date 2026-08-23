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
    isPopular: true
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
    isPopular: false
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

// Bán buôn được tách riêng khỏi thực đơn bán lẻ vì khách đặt theo cân
// và giá phụ thuộc vào khối lượng, thời điểm nhận hàng. Không tự đặt giá/kg
// khi chủ quán chưa cung cấp; đơn sẽ được gửi dưới dạng yêu cầu báo giá.
export const WHOLESALE_ITEMS = [
  {
    id: 'wholesale-xoi-lac',
    name: 'Xôi Lạc',
    subtitle: 'Lạc đỏ ninh bùi • Nếp cái hoa vàng',
    image: '/images/xôi_lạc.jpg',
    badge: 'Món bán chạy',
    description: 'Món chủ lực cho quán ăn sáng và điểm bán lại, đóng theo khối lượng đặt.',
    saleMode: 'wholesale',
    wholesaleGroup: 'main',
    unit: 'kg',
    step: 1,
    minQuantity: 5,
    price: null
  },
  {
    id: 'wholesale-xoi-gac',
    name: 'Xôi Gấc',
    subtitle: 'Gấc tươi đỏ son • Nếp dẻo thơm',
    image: '/images/xôi_gấc.jpg',
    badge: 'Món bán chạy',
    description: 'Xôi gấc màu đỏ tự nhiên, phù hợp bán sáng, mâm cỗ và đơn số lượng lớn.',
    saleMode: 'wholesale',
    wholesaleGroup: 'main',
    unit: 'kg',
    step: 1,
    minQuantity: 5,
    price: null
  },
  {
    id: 'wholesale-xoi-xeo',
    name: 'Xôi Xéo',
    subtitle: 'Đậu xanh thái mỏng • Hành phi thơm',
    image: '/images/xôi_xéo.jpg',
    badge: 'Món bán chạy',
    description: 'Xôi xéo vàng ươm, đậu xanh và hành phi được chuẩn bị đồng đều cho điểm bán.',
    saleMode: 'wholesale',
    wholesaleGroup: 'main',
    unit: 'kg',
    step: 1,
    minQuantity: 5,
    price: null
  },
  {
    id: 'wholesale-xoi-ngu-sac',
    name: 'Xôi Ngũ Sắc',
    subtitle: 'Năm sắc vị truyền thống từ thảo mộc',
    image: '/images/xoi_ngu_sac.jpeg',
    badge: 'Mâm Cỗ & Gia Đình',
    description: 'Xôi ngũ sắc tự nhiên, phù hợp đơn mâm cỗ, liên hoan và sự kiện.',
    saleMode: 'wholesale',
    wholesaleGroup: 'main',
    unit: 'kg',
    step: 1,
    minQuantity: 5,
    price: null
  },
  {
    id: 'wholesale-xoi-dua',
    name: 'Xôi Dừa',
    subtitle: 'Dừa nạo sợi • Nước cốt béo thanh',
    image: '/images/xôi_dừa.jpg',
    badge: 'Vị Dịu Béo',
    description: 'Xôi dừa dẻo thơm, nước cốt béo thanh và dừa non nạo sợi.',
    saleMode: 'wholesale',
    wholesaleGroup: 'main',
    unit: 'kg',
    step: 1,
    minQuantity: 5,
    price: null
  },
  {
    id: 'wholesale-xoi-dua-vung-den',
    name: 'Xôi Dừa Vừng Đen',
    subtitle: 'Vừng đen thơm bùi • Cốt dừa non',
    image: '/images/xôi_dừa_2.jpg',
    badge: 'Dinh Dưỡng',
    description: 'Xôi dừa kết hợp vừng đen rang thơm, vị bùi béo và dễ chia phần.',
    saleMode: 'wholesale',
    wholesaleGroup: 'main',
    unit: 'kg',
    step: 1,
    minQuantity: 5,
    price: null
  },
  {
    id: 'wholesale-xoi-vo',
    name: 'Xôi Vò',
    subtitle: 'Đậu xanh mịn • Tơi từng hạt',
    image: '/images/xôi_vò_chè.jpg',
    badge: 'Hương Vị Tràng An',
    description: 'Xôi vò vàng ươm, tơi hạt và phủ đều lớp đậu xanh mịn.',
    saleMode: 'wholesale',
    wholesaleGroup: 'main',
    unit: 'kg',
    step: 1,
    minQuantity: 5,
    price: null
  },
  {
    id: 'wholesale-ruoc-them',
    name: 'Ruốc Thêm',
    subtitle: 'Phần phụ ăn kèm • Đóng riêng',
    image: '/images/xôi_ruốc.jpg',
    badge: 'Món phụ',
    description: 'Đặt thêm ruốc theo cân và đóng riêng để tiện chia phần khi bán.',
    saleMode: 'wholesale',
    wholesaleGroup: 'addon',
    unit: 'kg',
    step: 0.1,
    minQuantity: 0.1,
    price: null
  },
  {
    id: 'wholesale-lac-them',
    name: 'Lạc Thêm',
    subtitle: 'Phần phụ ăn kèm • Đóng riêng',
    image: '/images/xôi_lạc.jpg',
    badge: 'Món phụ',
    description: 'Lạc thêm dành cho quán cần chia topping hoặc điều chỉnh khẩu vị riêng.',
    saleMode: 'wholesale',
    wholesaleGroup: 'addon',
    unit: 'kg',
    step: 0.1,
    minQuantity: 0.1,
    price: null
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
