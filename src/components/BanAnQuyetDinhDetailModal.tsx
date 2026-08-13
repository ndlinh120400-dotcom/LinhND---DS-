import React from 'react';
import { BanAnQuyetDinhRecord } from '../types';
import { X, FileText, Scale, UserCheck } from 'lucide-react';

interface Props {
  record: BanAnQuyetDinhRecord;
  onClose: () => void;
}

export const BanAnQuyetDinhDetailModal: React.FC<Props> = ({ record, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto font-['Roboto',sans-serif]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#800000] text-white px-5 py-3.5 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base">Chi tiết bản án / quyết định: {record.soBanAnQuyetDinh}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-xs text-gray-800 max-h-[80vh] overflow-y-auto">
          {/* Thông tin bản án / quyết định */}
          <div>
            <h4 className="text-sm font-bold text-[#800000] border-b border-gray-200 pb-2 mb-3 flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              <span>Thông tin bản án / quyết định</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded border border-gray-200">
              <p><span className="font-bold text-gray-900">Số BA/QĐ:</span> {record.soBanAnQuyetDinh}</p>
              <p><span className="font-bold text-gray-900">Ngày BA/QĐ:</span> {record.ngayBanAnQuyetDinh}</p>
              <p className="col-span-1 md:col-span-2">
                <span className="font-bold text-gray-900">Tòa án ban hành:</span> {record.toaAnBanHanh}
              </p>
              <p>
                <span className="font-bold text-gray-900">Giai đoạn xét xử:</span>{' '}
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium text-[11px]">
                  {record.giaiDoan}
                </span>
              </p>
              <p>
                <span className="font-bold text-gray-900">Trạng thái hiệu lực:</span>{' '}
                <span className={record.trangThaiHieuLuc === 'Có hiệu lực' ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
                  {record.trangThaiHieuLuc}
                </span>
              </p>
              <p><span className="font-bold text-gray-900">Ngày hiệu lực:</span> {record.ngayHieuLuc}</p>
              <p>
                <span className="font-bold text-gray-900">Tình trạng giải quyết:</span>{' '}
                <span className="bg-red-50 text-red-500 font-semibold px-2 py-0.5 rounded">
                  {record.tinhTrangGiaiQuyet}
                </span>
              </p>
            </div>
          </div>

          {/* Thông tin vụ án */}
          <div>
            <h4 className="text-sm font-bold text-[#800000] border-b border-gray-200 pb-2 mb-3 flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Thông tin vụ án</span>
            </h4>
            <div className="bg-gray-50 p-3.5 rounded border border-gray-200 space-y-2">
              <p><span className="font-bold text-gray-900">Tên vụ án:</span> {record.tenVuAn}</p>
              <p><span className="font-bold text-gray-900">Mã vụ án:</span> {record.maVuAn}</p>
            </div>
          </div>

          {/* Tổng hợp thi hành án */}
          <div>
            <h4 className="text-sm font-bold text-[#800000] border-b border-gray-200 pb-2 mb-3 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4" />
              <span>Thống kê bị án & Thi hành án</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-red-50/50 p-3 rounded border border-red-100 text-center">
                <div className="text-gray-500 text-[11px]">Bị án có hiệu lực</div>
                <div className="text-lg font-bold text-red-600 mt-1">{record.soBiAnCoHieuLuc}</div>
              </div>
              <div className="bg-red-50/50 p-3 rounded border border-red-100 text-center">
                <div className="text-gray-500 text-[11px]">Bị án có KN/KC</div>
                <div className="text-lg font-bold text-red-600 mt-1">{record.soBiAnCoKNKC}</div>
              </div>
              <div className="bg-red-50/50 p-3 rounded border border-red-100 text-center">
                <div className="text-gray-500 text-[11px]">Bị án đã thụ lý</div>
                <div className="text-lg font-bold text-red-600 mt-1">{record.soBiAnDaThuLy}</div>
              </div>
              <div className="bg-red-50/50 p-3 rounded border border-red-100 text-center">
                <div className="text-gray-500 text-[11px]">Bị án có QĐ THA</div>
                <div className="text-lg font-bold text-red-600 mt-1">{record.soBiAnCoQDThiHanhAn}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded text-xs transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
