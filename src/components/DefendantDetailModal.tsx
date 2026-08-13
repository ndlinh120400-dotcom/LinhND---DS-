import React, { useState } from 'react';
import { BiAnRecord } from '../types';
import { X, Printer, Edit2, CheckCircle2, AlertCircle, FileText, UserCheck } from 'lucide-react';

interface DefendantDetailModalProps {
  defendant: BiAnRecord | null;
  onClose: () => void;
  onSave: (updated: BiAnRecord) => void;
}

export const DefendantDetailModal: React.FC<DefendantDetailModalProps> = ({
  defendant,
  onClose,
  onSave,
}) => {
  if (!defendant) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BiAnRecord>({ ...defendant });

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-md shadow-2xl w-full max-w-3xl border border-gray-300 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-[#800000] text-white px-6 py-3.5 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base">
              Hồ sơ chi tiết bị án: {defendant.hoTen}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-6 text-xs text-gray-800">
          {!isEditing ? (
            <>
              {/* Profile Summary Card */}
              <div className="bg-red-50/50 p-4 rounded border border-red-100 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-gray-500 font-medium block">Họ và tên</span>
                  <span className="font-bold text-sm text-[#800000]">{defendant.hoTen}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium block">Số CCCD / Hộ chiếu</span>
                  <span className="font-semibold text-gray-900">{defendant.soCCCD || 'Chưa cập nhật'}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium block">Giai đoạn xét xử</span>
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold inline-block mt-0.5">
                    {defendant.giaiDoan}
                  </span>
                </div>
              </div>

              {/* Grid 1: Bản án & Toà */}
              <div>
                <h4 className="font-bold text-sm text-[#800000] border-b border-gray-200 pb-1.5 mb-3 flex items-center space-x-2">
                  <span>1. Thông tin bản án & Tòa án xét xử</span>
                </h4>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded border border-gray-200">
                  <div>
                    <span className="font-semibold text-gray-600">Số bản án:</span>{' '}
                    <span className="font-bold text-gray-900">{defendant.soBanAn}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Ngày bản án:</span>{' '}
                    <span>{defendant.ngayBanAn}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-gray-600">Toà xét xử:</span>{' '}
                    <span>{defendant.toaXetXu}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-gray-600">Tội danh:</span>{' '}
                    <span className="font-medium text-gray-900">{defendant.toiDanh}</span>
                  </div>
                </div>
              </div>

              {/* Grid 2: Hình phạt */}
              <div>
                <h4 className="font-bold text-sm text-[#800000] border-b border-gray-200 pb-1.5 mb-3">
                  2. Hình phạt đã tuyên
                </h4>
                <div className="space-y-2 bg-gray-50 p-3 rounded border border-gray-200">
                  <div>
                    <span className="font-semibold text-gray-600">Hình phạt chính:</span>{' '}
                    <span className="font-bold text-gray-900">{defendant.hinhPhatChinh}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Hình phạt bổ sung:</span>{' '}
                    <span>{defendant.hinhPhatBoSung}</span>
                  </div>
                </div>
              </div>

              {/* Grid 3: Quyết định Thi hành án */}
              <div>
                <h4 className="font-bold text-sm text-[#800000] border-b border-gray-200 pb-1.5 mb-3">
                  3. Quyết định thi hành án
                </h4>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded border border-gray-200">
                  <div>
                    <span className="font-semibold text-gray-600">Số thụ lý:</span>{' '}
                    <span>{defendant.soThuLy || '-'}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Số QĐ thi hành án:</span>{' '}
                    <span>{defendant.soQDThiHanhAn || '-'}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Ngày QĐTHA:</span>{' '}
                    <span>{defendant.ngayQDTHA || '-'}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Trạng thái QĐ:</span>{' '}
                    <span className="font-bold text-blue-700">{defendant.ketQuaRaQDTHAStatus}</span>
                  </div>
                </div>
              </div>

              {/* Grid 4: Kết quả & Theo dõi */}
              <div>
                <h4 className="font-bold text-sm text-[#800000] border-b border-gray-200 pb-1.5 mb-3">
                  4. Kết quả & Quá trình theo dõi thi hành án
                </h4>
                <div className="space-y-2 bg-gray-50 p-3 rounded border border-gray-200">
                  <div>
                    <span className="font-semibold text-gray-600">Trạng thái bị án:</span>{' '}
                    <span className="font-bold text-gray-900">{defendant.trangThaiBiAn}</span>
                  </div>
                  {defendant.coSoGiamGiu && (
                    <div>
                      <span className="font-semibold text-gray-600">Cơ sở giam giữ:</span>{' '}
                      <span>{defendant.coSoGiamGiu}</span>
                    </div>
                  )}
                  {defendant.coQuanGiaoDucGiamSat && (
                    <div>
                      <span className="font-semibold text-gray-600">Cơ quan giám sát:</span>{' '}
                      <span>{defendant.coQuanGiaoDucGiamSat}</span>
                    </div>
                  )}

                  {defendant.theoDoiThiHanhAn && (
                    <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded">
                      <span className="font-bold text-amber-900 block mb-1">Thông tin hoãn/miễn/theo dõi:</span>
                      {defendant.theoDoiThiHanhAn.quyetDinh && (
                        <p className="font-semibold">{defendant.theoDoiThiHanhAn.quyetDinh}</p>
                      )}
                      {defendant.theoDoiThiHanhAn.soQD && (
                        <p>Số QĐ: {defendant.theoDoiThiHanhAn.soQD} | Ngày: {defendant.theoDoiThiHanhAn.ngayQD}</p>
                      )}
                      {defendant.theoDoiThiHanhAn.ghiChu && (
                        <p className="mt-1 text-gray-700 italic">{defendant.theoDoiThiHanhAn.ghiChu}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Editing Mode Form */
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-[#800000]">Chỉnh sửa thông tin bị án</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Họ tên bị án</label>
                  <input
                    type="text"
                    value={formData.hoTen}
                    onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                    className="w-full p-2 border rounded border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Số CCCD</label>
                  <input
                    type="text"
                    value={formData.soCCCD || ''}
                    onChange={(e) => setFormData({ ...formData, soCCCD: e.target.value })}
                    className="w-full p-2 border rounded border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Số bản án</label>
                  <input
                    type="text"
                    value={formData.soBanAn}
                    onChange={(e) => setFormData({ ...formData, soBanAn: e.target.value })}
                    className="w-full p-2 border rounded border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Ngày bản án</label>
                  <input
                    type="text"
                    value={formData.ngayBanAn}
                    onChange={(e) => setFormData({ ...formData, ngayBanAn: e.target.value })}
                    className="w-full p-2 border rounded border-gray-300"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold mb-1">Tội danh</label>
                  <input
                    type="text"
                    value={formData.toiDanh}
                    onChange={(e) => setFormData({ ...formData, toiDanh: e.target.value })}
                    className="w-full p-2 border rounded border-gray-300"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold mb-1">Hình phạt chính</label>
                  <input
                    type="text"
                    value={formData.hinhPhatChinh}
                    onChange={(e) => setFormData({ ...formData, hinhPhatChinh: e.target.value })}
                    className="w-full p-2 border rounded border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Trạng thái bị án</label>
                  <input
                    type="text"
                    value={formData.trangThaiBiAn}
                    onChange={(e) => setFormData({ ...formData, trangThaiBiAn: e.target.value })}
                    className="w-full p-2 border rounded border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Kết quả ra QĐ THA</label>
                  <select
                    value={formData.ketQuaRaQDTHAStatus}
                    onChange={(e) => setFormData({ ...formData, ketQuaRaQDTHAStatus: e.target.value })}
                    className="w-full p-2 border rounded border-gray-300"
                  >
                    <option value="Đã có quyết định THA">Đã có quyết định THA</option>
                    <option value="Chưa thụ lý">Chưa thụ lý</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex justify-between items-center">
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In trích lục</span>
          </button>

          <div className="flex items-center space-x-3">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-1.5 px-4 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Chỉnh sửa</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 text-xs font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                >
                  Đóng
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-1.5 px-4 py-1.5 text-xs font-medium text-white bg-[#800000] hover:bg-[#660000] rounded cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Lưu thay đổi</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1.5 text-xs font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                >
                  Hủy
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
