import React from 'react';
import { BiAnRecord } from '../types';

interface DefendantTableProps {
  data: BiAnRecord[];
  onSelectDefendant: (record: BiAnRecord) => void;
  onToggleCheckbox: (id: string) => void;
}

export const DefendantTable: React.FC<DefendantTableProps> = ({
  data,
  onSelectDefendant,
  onToggleCheckbox,
}) => {
  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-sm shadow-sm">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-[#F3F4F6] text-gray-800 font-bold border-b border-gray-200 divide-x divide-gray-200">
            <th className="py-2.5 px-2 text-center w-12 shrink-0">STT</th>
            <th className="py-2.5 px-3 min-w-[220px]">Thông tin bị án</th>
            <th className="py-2.5 px-3 min-w-[200px]">Hình phạt</th>
            <th className="py-2.5 px-3 min-w-[190px]">Kết quả ra quyết định về THA</th>
            <th className="py-2.5 px-3 min-w-[200px]">Kết quả thi hành quyết định THA</th>
            <th className="py-2.5 px-3 min-w-[220px]">Theo dõi thi hành án</th>
            <th className="py-2.5 px-2 text-center min-w-[140px] max-w-[160px]">
              Bị án chưa có thông tin trên hệ thống
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-800">
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-8 text-center text-gray-500 italic">
                Không tìm thấy bản ghi nào phù hợp.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/80 transition-colors divide-x divide-gray-200 align-top"
              >
                {/* STT */}
                <td className="py-3 px-2 text-center font-semibold text-gray-700">
                  {item.stt}
                </td>

                {/* Thông tin bị án */}
                <td className="py-3 px-3 space-y-1">
                  <div>
                    <button
                      onClick={() => onSelectDefendant(item)}
                      className="text-blue-700 hover:text-blue-900 font-bold cursor-pointer text-left hover:underline block"
                    >
                      Họ tên bị án: {item.hoTen}
                    </button>
                  </div>
                  <div className="text-gray-900">
                    <span className="font-semibold">Số bản án:</span> {item.soBanAn}
                  </div>
                  <div className="text-gray-900">
                    <span className="font-semibold">Ngày bản án:</span> {item.ngayBanAn}
                  </div>
                  <div className="text-gray-900">
                    <span className="font-semibold">Toà xét xử:</span> {item.toaXetXu}
                  </div>
                  <div className="text-gray-900">
                    <span className="font-semibold">Tội danh:</span> {item.toiDanh}
                  </div>
                  <div className="pt-1">
                    <span className="bg-[#FEF3C7] text-[#D97706] text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-block">
                      Giai đoạn: {item.giaiDoan}
                    </span>
                  </div>
                </td>

                {/* Hình phạt */}
                <td className="py-3 px-3 space-y-2">
                  <div>
                    <span className="font-bold text-gray-900">Hình phạt chính:</span>{' '}
                    <span>{item.hinhPhatChinh}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">Hình phạt bổ sung:</span>{' '}
                    <span>{item.hinhPhatBoSung}</span>
                  </div>
                </td>

                {/* Kết quả ra quyết định về THA */}
                <td className="py-3 px-3 space-y-1">
                  {item.soThuLy && (
                    <div className="text-gray-900">
                      <span className="font-bold">Số thụ lý:</span> {item.soThuLy}
                    </div>
                  )}
                  {item.soQDThiHanhAn && (
                    <div className="text-gray-900">
                      <span className="font-bold">Số QĐ thi hành án:</span> {item.soQDThiHanhAn}
                    </div>
                  )}
                  {item.ngayQDTHA && (
                    <div className="text-gray-900">
                      <span className="font-bold">Ngày QĐTHA:</span> {item.ngayQDTHA}
                    </div>
                  )}

                  <div className="pt-1">
                    {item.ketQuaRaQDTHAStatus === 'Đã có quyết định THA' ? (
                      <span className="bg-[#E0F2FE] text-[#0284C7] font-bold px-3 py-1 rounded-full text-[11px] inline-block shadow-2xs">
                        Đã có quyết định THA
                      </span>
                    ) : item.ketQuaRaQDTHAStatus === 'Chưa thụ lý' ? (
                      <span className="bg-[#FEE2E2] text-[#DC2626] font-bold px-3 py-1 rounded-full text-[11px] inline-block shadow-2xs">
                        Chưa thụ lý
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-full text-[11px] inline-block">
                        {item.ketQuaRaQDTHAStatus}
                      </span>
                    )}
                  </div>
                </td>

                {/* Kết quả thi hành quyết định THA */}
                <td className="py-3 px-3 space-y-1">
                  <div className="text-gray-900">
                    <span className="font-bold">Trạng thái bị án:</span>{' '}
                    {item.trangThaiBiAn}
                  </div>
                  {item.coSoGiamGiu !== undefined && (
                    <div className="text-gray-900">
                      <span className="font-bold">Cơ sở giam giữ:</span>{' '}
                      {item.coSoGiamGiu}
                    </div>
                  )}
                  {item.coQuanGiaoDucGiamSat && (
                    <div className="text-gray-900">
                      <span className="font-bold">Cơ quan giáo dục, giám sát:</span>{' '}
                      {item.coQuanGiaoDucGiamSat}
                    </div>
                  )}
                  {item.coQuanThiHanhQuyetDinh && (
                    <div className="text-gray-900">
                      <span className="font-bold">Cơ quan thi hành quyết định:</span>{' '}
                      {item.coQuanThiHanhQuyetDinh}
                    </div>
                  )}
                  {item.noiChapHanhAn !== undefined && (
                    <div className="text-gray-900">
                      <span className="font-bold">Nơi chấp hành án:</span>{' '}
                      {item.noiChapHanhAn}
                    </div>
                  )}
                </td>

                {/* Theo dõi thi hành án */}
                <td className="py-3 px-3">
                  {item.theoDoiThiHanhAn &&
                  (item.theoDoiThiHanhAn.quyetDinh || item.theoDoiThiHanhAn.ghiChu) ? (
                    <div>
                      {item.theoDoiThiHanhAn.quyetDinh && (
                        <div className="space-y-1">
                          <p className="font-bold text-gray-900">
                            {item.theoDoiThiHanhAn.quyetDinh}
                          </p>
                          {item.theoDoiThiHanhAn.soQD && (
                            <p className="text-gray-800">
                              <span className="font-semibold">Số QĐ:</span> {item.theoDoiThiHanhAn.soQD}
                            </p>
                          )}
                          {item.theoDoiThiHanhAn.ngayQD && (
                            <p className="text-gray-800">
                              <span className="font-semibold">Ngày QĐ:</span> {item.theoDoiThiHanhAn.ngayQD}
                            </p>
                          )}
                        </div>
                      )}
                      
                      {item.theoDoiThiHanhAn.quyetDinh && item.theoDoiThiHanhAn.ghiChu && (
                        <hr className="my-2 border-t border-gray-300" />
                      )}

                      {item.theoDoiThiHanhAn.ghiChu && (
                        <p className="text-gray-800 leading-snug">
                          {item.theoDoiThiHanhAn.ghiChu}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500 font-semibold">-</span>
                  )}
                </td>

                {/* Bị án chưa có thông tin trên hệ thống */}
                <td className="py-3 px-2 text-center align-middle">
                  <input
                    type="checkbox"
                    checked={item.chuaCoThongTinTrenHeThong}
                    onChange={() => onToggleCheckbox(item.id)}
                    className="w-4 h-4 text-[#800000] rounded focus:ring-[#800000] border-gray-300 cursor-pointer"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
