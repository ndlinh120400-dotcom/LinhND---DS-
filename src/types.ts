export interface NhanUyThacRecord {
  id: string;
  stt: number;
  tenBiAn: string;
  tenVuAn: string;
  soBanAn: string;
  ngayBanAn: string;
  toiDanh: string;
  hinhPhatChinh: string;
  hinhPhatBoSung: string;
  toaAnUyThac: string;
  lyDoUyThac: string;
  ngayUyThac: string;
  trangThai: 'Đã nhận' | 'Đã trả lại' | string;
  checked?: boolean;
}

export interface BanAnQuyetDinhRecord {
  id: string;
  stt: number;
  soBanAnQuyetDinh: string;
  ngayBanAnQuyetDinh: string;
  toaAnBanHanh: string;
  giaiDoan: string;
  trangThaiHieuLuc: 'Có hiệu lực' | 'Chưa có hiệu lực';
  ngayHieuLuc: string;
  tenVuAn: string;
  maVuAn: string;
  soBiAnCoHieuLuc: string;
  soBiAnCoKNKC: string;
  soBiAnDaThuLy: string;
  soBiAnCoQDThiHanhAn: string;
  tinhTrangGiaiQuyet: 'Chưa giải quyết' | 'Đã giải quyết';
  checked?: boolean;
}

export interface TheoDoiThiHanhAn {
  quyetDinh?: string;
  soQD?: string;
  ngayQD?: string;
  ghiChu?: string;
}

export interface BiAnRecord {
  id: string;
  stt: number;
  hoTen: string;
  soBanAn: string;
  ngayBanAn: string;
  toaXetXu: string;
  toiDanh: string;
  giaiDoan: 'Sơ thẩm' | 'Phúc thẩm';
  hinhPhatChinh: string;
  hinhPhatBoSung: string;
  soThuLy?: string;
  soQDThiHanhAn?: string;
  ngayQDTHA?: string;
  ketQuaRaQDTHAStatus: 'Đã có quyết định THA' | 'Chưa thụ lý' | string;
  trangThaiBiAn: string;
  coSoGiamGiu?: string;
  coQuanGiaoDucGiamSat?: string;
  coQuanThiHanhQuyetDinh?: string;
  noiChapHanhAn?: string;
  theoDoiThiHanhAn?: TheoDoiThiHanhAn;
  chuaCoThongTinTrenHeThong: boolean;
  soCCCD?: string;
}

export interface FilterState {
  biAnCategory: string;
  tenBiAn: string;
  soBanAn: string;
  ngayBanAn: string;
  soCCCD: string;
  tinhTrangGiaiQuyet: string;
  soQDThiHanhAn: string;
  ngayQDTuNgay: string;
  ngayQDDenNgay: string;
  trangThaiThiHanhAn: string;
  quickSearch: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  time: string;
  read: boolean;
  type: 'mail' | 'bell' | 'chat';
}
