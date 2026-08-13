import React from 'react';
import { BiAnRecord } from '../types';
import { Printer, X, Download } from 'lucide-react';

interface PrintReportModalProps {
  data: BiAnRecord[];
  onClose: () => void;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({ data, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded shadow-2xl w-full max-w-4xl border border-gray-300 overflow-hidden my-6">
        {/* Modal Action Bar (Hidden during printing) */}
        <div className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center print:hidden">
          <span className="font-bold text-sm">Xem trước Báo cáo Danh sách bị án</span>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 bg-[#800000] hover:bg-red-800 text-white px-4 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>In báo cáo</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white p-1 rounded cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Sheet */}
        <div className="p-8 bg-white text-gray-900 font-serif text-xs leading-relaxed space-y-6">
          {/* Header Quốc hiệu & Tên cơ quan */}
          <div className="flex justify-between items-start border-b border-gray-300 pb-4">
            <div className="text-center font-bold">
              <p className="uppercase text-[11px]">TÒA ÁN NHÂN DÂN KHU VỰC II</p>
              <p className="uppercase text-[11px]">THÀNH PHỐ HÀ NỘI</p>
              <p className="text-[10px] font-normal text-gray-600 mt-1">Số: ... /BC-TAII</p>
            </div>
            <div className="text-center font-bold">
              <p className="uppercase text-[11px]">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
              <p className="text-[11px]">Độc lập - Tự do - Hạnh phúc</p>
              <p className="text-[10px] font-normal text-gray-600 mt-1">Hà Nội, ngày 12 tháng 08 năm 2026</p>
            </div>
          </div>

          {/* Title */}
          <div className="text-center my-6">
            <h2 className="text-base font-bold uppercase text-[#800000]">
              BÁO CÁO DANH SÁCH BỊ ÁN VÀ TÌNH TRẠNG THI HÀNH ÁN
            </h2>
            <p className="text-xs italic text-gray-600 mt-1">
              (Thống kê dữ liệu quản lý thi hành án hình sự)
            </p>
          </div>

          {/* Data Table */}
          <table className="w-full border-collapse border border-gray-400 text-[11px]">
            <thead>
              <tr className="bg-gray-100 font-bold text-center">
                <th className="border border-gray-400 p-2 w-10">STT</th>
                <th className="border border-gray-400 p-2">Họ tên bị án</th>
                <th className="border border-gray-400 p-2">Số bản án / Ngày</th>
                <th className="border border-gray-400 p-2">Hình phạt chính</th>
                <th className="border border-gray-400 p-2">Số QĐ THA</th>
                <th className="border border-gray-400 p-2">Trạng thái thi hành án</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id} className="align-top">
                  <td className="border border-gray-400 p-2 text-center font-bold">{idx + 1}</td>
                  <td className="border border-gray-400 p-2 font-bold">{item.hoTen}</td>
                  <td className="border border-gray-400 p-2">
                    {item.soBanAn} ({item.ngayBanAn})
                  </td>
                  <td className="border border-gray-400 p-2">{item.hinhPhatChinh}</td>
                  <td className="border border-gray-400 p-2">{item.soQDThiHanhAn || '-'}</td>
                  <td className="border border-gray-400 p-2 font-semibold">
                    {item.trangThaiBiAn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 pt-10 text-center font-sans">
            <div>
              <p className="font-bold text-xs uppercase">NGƯỜI LẬP BÁO CÁO</p>
              <p className="text-[10px] text-gray-500 italic">(Ký và ghi rõ họ tên)</p>
              <div className="h-16"></div>
              <p className="font-bold">Đỗ Hà Linh</p>
            </div>
            <div>
              <p className="font-bold text-xs uppercase">THẨM PHÁN / LÃNH ĐẠO ĐƠN VỊ</p>
              <p className="text-[10px] text-gray-500 italic">(Ký, đóng dấu)</p>
              <div className="h-16"></div>
              <p className="font-bold">Nguyễn Văn Cường</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
