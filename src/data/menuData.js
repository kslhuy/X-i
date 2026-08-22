export const STALL_INFO = {
  name: "XôïS — Xôi Chay Lề Đường",
  pronunciation: "Xôi iiii Sờ",
  slogan: "Xôi Chay Nóng Hổi • Đặt Hàng 1-Touch Không Chờ Đợi",
  address: "Quán Xôi Lề Đường • Nhận Đơn Tại Quán & Mang Về",
  phone: "0987.654.321"
};

export const MENU_ITEMS = [
  {
    id: 'combo-ngu-sac',
    name: 'Combo Ngũ Sắc 5 Màu',
    subtitle: '5 sắc màu xôi chay rực rỡ năng lượng',
    price: 99000,
    image: '/images/xoi_ngu_sac.jpeg',
    category: 'combo',
    calories: '950 kcal',
    description: 'TỔNG HỢP 5 VỊ XÔI CHAY (Gấc Đỏ, Xéo Vàng, Dừa Trắng, Lạc Nâu, Ruốc Nấm). Tặng 2 chai nước đậu nành dừa tươi.',
    isPopular: true
  },
  {
    id: 'xoi-gac',
    name: 'Xôi Gấc Chay',
    subtitle: 'Đỏ tươi • Ngọt thanh • Dừa nạo',
    price: 25000,
    image: '/images/xôi_gấc.jpg',
    category: 'red',
    calories: '380 kcal',
    description: 'Xôi nếp thơm đồ gấc tươi chín đỏ, dừa nạo giòn ngọt và muối vừng rang thơm.',
    isPopular: true
  },
  {
    id: 'xoi-xeo',
    name: 'Xôi Xéo Chay',
    subtitle: 'Vàng nghệ • Đỗ xanh • Hành phi',
    price: 25000,
    image: '/images/xôi_xéo.jpg',
    category: 'yellow',
    calories: '360 kcal',
    description: 'Xôi nghệ tươi vàng ươm, đậu xanh giã mịn như lụa, mỡ hành chay và hành phi giòn tan.',
    isPopular: true
  },
  {
    id: 'xoi-dua',
    name: 'Xôi Dừa Bến Tre',
    subtitle: 'Trắng dẻo • Cốt dừa béo ngậy',
    price: 20000,
    image: '/images/xôi_dừa.jpg',
    category: 'white',
    calories: '340 kcal',
    description: 'Xôi dẻo ngấm trọn nước cốt dừa tươi Bến Tre béo ngậy, phủ dừa bào và vừng rang.',
    isPopular: false
  },
  {
    id: 'xoi-dua-vung-den',
    name: 'Xôi Dừa Vừng Đen',
    subtitle: 'Dừa sợi ngậy • Vừng đen bổ dưỡng',
    price: 25000,
    image: '/images/xôi_dừa_2.jpg',
    category: 'white',
    calories: '350 kcal',
    description: 'Dừa bào sợi dày béo thơm xới cùng xôi dẻo và vừng đen thơm nức.',
    isPopular: false
  },
  {
    id: 'xoi-lac',
    name: 'Xôi Lạc Chay',
    subtitle: 'Lạc ninh bùi • Muối vừng nướng',
    price: 20000,
    image: '/images/xôi_lạc.jpg',
    category: 'brown',
    calories: '390 kcal',
    description: 'Hạt lạc đỏ bùi béo ninh mềm bọc trong từng hạt nếp dẻo quánh, kèm muối vừng.',
    isPopular: false
  },
  {
    id: 'xoi-ruoc-nam',
    name: 'Xôi Ruốc Nấm Chay',
    subtitle: 'Ruốc nấm chân giòn • Mỡ hành',
    price: 30000,
    image: '/images/xôi_ruốc.jpg',
    category: 'savory',
    calories: '400 kcal',
    description: 'Xôi nếp trắng mỡ hành chay phủ ngập ruốc nấm hương mặn ngọt đậm đà.',
    isPopular: true
  },
  {
    id: 'xoi-vo-che',
    name: 'Xôi Vò Chè Hoa Cau',
    subtitle: 'Xôi vò tơi • Bát chè đỗ xanh',
    price: 30000,
    image: '/images/xôi_vò_chè.jpg',
    category: 'dessert',
    calories: '420 kcal',
    description: 'Xôi vò tơi xốp bọc đậu xanh mịn ăn cùng bát chè đỗ xanh ướp hoa lài thanh dịu.',
    isPopular: false
  }
];

export const TOPPING_OPTIONS = [
  { id: 'ruoc-nam', name: 'Ruốc nấm chay', price: 5000 },
  { id: 'dua-sao', name: 'Dừa nạo sợi', price: 3000 },
  { id: 'muoi-vung', name: 'Muối vừng rang', price: 2000 },
  { id: 'hanh-phi', name: 'Hành phi giòn', price: 3000 }
];
