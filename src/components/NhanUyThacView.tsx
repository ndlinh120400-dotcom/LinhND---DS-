import React, { useState } from 'react';
import { NhanUyThacRecord } from '../types';
import { Search, ChevronDown, Printer, RefreshCw, MoreVertical, Eye, RotateCcw } from 'lucide-react';

interface NhanUyThacViewProps {
  records: NhanUyThacRecord[];
  onPrintReport?: () => void;
}

export const NhanUyThacView: React.FC<NhanUyThacViewProps> = ({
  records: initialRecords,
  onPrintReport,
}) => {
  const [records, setRecords] = useState<NhanUyThacRecord[]>(initialRecords);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState<boolean>(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState<NhanUyThacRecord | null>(null);

  // Advanced filters
  const [filterBiAn, setFilterBiAn] = useState<string>('');
  const [filterVuAn, setFilterVuAn] = useState<string>('');
  const [filterSoBA, setFilterSoBA] = useState<string>('');
  const [filterTrangThai, setFilterTrangThai] = useState<string>('Tất cả');

  const handleToggleCheck = (id: string) => {
    setRecords((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, checked: !rec.checked } : rec))
    );
  };

  const allChecked = records.length > 0 && records.every((r) => r.checked);
  const handleSelectAll = () => {
    const nextVal = !allChecked;
    setRecords((prev) => prev.map((r) => ({ ...r, checked: nextVal })));
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setFilterBiAn('');
    setFilterVuAn('');
    setFilterSoBA('');
    setFilterTrangThai('Tất cả');
  };

  const filteredRecords = records.filter((rec) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchBiAn = rec.tenBiAn.toLowerCase().includes(q);
      const matchVuAn = rec.tenVuAn.toLowerCase().includes(q);
      const matchSoBA = rec.soBanAn.toLowerCase().includes(q);
      const matchToiDanh = rec.toiDanh.toLowerCase().includes(q);
      if (!matchBiAn && !matchVuAn && !matchSoBA && !matchToiDanh) return false;
    }
    if (filterBiAn.trim() && !rec.tenBiAn.toLowerCase().includes(filterBiAn.toLowerCase())) {
      return false;
    }
    if (filterVuAn.trim() && !rec.tenVuAn.toLowerCase().includes(filterVuAn.toLowerCase())) {
      return false;
    }
    if (filterSoBA.trim() && !rec.soBanAn.toLowerCase().includes(filterSoBA.toLowerCase())) {
      return false;
    }
    if (filterTrangThai !== 'Tất cả' && rec.trangThai !== filterTrangThai) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-4 font-['Roboto',sans-serif]">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-1.5 text-xs text-gray-500">
        <span>Trang chủ</span>
        <span>/</span>
        <span>Thi hành án</span>
        <span>/</span>
        <span>Nhận ủy thác thi hành án</span>
        <span>/</span>
        <span className="text-gray-800 font-semibold">Xem danh sách</span>
      </div>

      {/* Page Title */}
      <h1 className="text-xl font-bold text-gray-900">Nhận ủy thác Thi hành án</h1>

      {/* Top Search & Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pt-1">
        {/* Search Bar & Advanced Search Toggle */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden shadow-2xs">
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 text-xs w-64 md:w-80 outline-none text-gray-800 placeholder-gray-400"
            />
            <button className="bg-[#800000] hover:bg-[#660000] text-white p-2 flex items-center justify-center transition-colors cursor-pointer">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
            className="text-xs font-medium text-[#1890FF] hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${isAdvancedSearchOpen ? 'rotate-180' : ''}`}
            />
            <span>Tìm kiếm nâng cao</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrintReport}
            className="flex items-center space-x-1.5 bg-[#800000] hover:bg-[#660000] text-white px-3.5 py-1.5 text-xs font-medium rounded shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In báo cáo</span>
          </button>

          <button
            onClick={handleRefresh}
            className="p-1.5 bg-white border border-gray-300 hover:bg-gray-50 rounded text-gray-600 transition-colors cursor-pointer"
            title="Làm mới"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Advanced Search Panel (Collapsible) */}
      {isAdvancedSearchOpen && (
        <div className="bg-white p-4 rounded border border-gray-200 shadow-2xs space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Tên bị án</label>
              <input
                type="text"
                value={filterBiAn}
                onChange={(e) => setFilterBiAn(e.target.value)}
                placeholder="Nhập tên bị án..."
                className="w-full border border-gray-300 rounded px-2.5 py-1.5 outline-none focus:border-[#800000]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Tên vụ án</label>
              <input
                type="text"
                value={filterVuAn}
                onChange={(e) => setFilterVuAn(e.target.value)}
                placeholder="Nhập tên vụ án..."
                className="w-full border border-gray-300 rounded px-2.5 py-1.5 outline-none focus:border-[#800000]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Số bản án</label>
              <input
                type="text"
                value={filterSoBA}
                onChange={(e) => setFilterSoBA(e.target.value)}
                placeholder="Nhập số bản án..."
                className="w-full border border-gray-300 rounded px-2.5 py-1.5 outline-none focus:border-[#800000]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Trạng thái</label>
              <select
                value={filterTrangThai}
                onChange={(e) => setFilterTrangThai(e.target.value)}
                className="w-full border border-gray-300 rounded px-2.5 py-1.5 outline-none focus:border-[#800000] bg-white"
              >
                <option value="Tất cả">Tất cả</option>
                <option value="Đã nhận">Đã nhận</option>
                <option value="Đã trả lại">Đã trả lại</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-1">
            <button className="bg-[#800000] hover:bg-[#660000] text-white px-3.5 py-1 text-xs font-semibold rounded cursor-pointer transition-colors">
              Tìm kiếm
            </button>
            <button
              onClick={handleRefresh}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-1 text-xs font-medium rounded cursor-pointer"
            >
              Làm mới
            </button>
          </div>
        </div>
      )}

      {/* Main Data Table */}
      <div className="bg-white border border-gray-200 rounded shadow-2xs overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F5F5F5] border-b border-gray-200 text-gray-800 font-bold">
              <th className="py-2.5 px-3 text-center w-10">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#800000] focus:ring-0 cursor-pointer"
                />
              </th>
              <th className="py-2.5 px-2 text-center w-12">STT</th>
              <th className="py-2.5 px-3 w-[260px]">Thông tin hồ sơ ủy thác</th>
              <th className="py-2.5 px-3 w-[280px]">Hình phạt</th>
              <th className="py-2.5 px-3 w-[220px]">Tòa án ủy thác</th>
              <th className="py-2.5 px-3 w-[200px]">Lý do ủy thác</th>
              <th className="py-2.5 px-3 w-[120px]">Ngày ủy thác</th>
              <th className="py-2.5 px-3 text-center w-[120px]">Trạng thái</th>
              <th className="py-2.5 px-3 text-center w-[80px]">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRecords.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/80 transition-colors align-top">
                {/* Checkbox */}
                <td className="py-3 px-3 text-center pt-3.5">
                  <input
                    type="checkbox"
                    checked={item.checked || false}
                    onChange={() => handleToggleCheck(item.id)}
                    className="rounded border-gray-300 text-[#800000] focus:ring-0 cursor-pointer"
                  />
                </td>

                {/* STT */}
                <td className="py-3 px-2 text-center font-medium text-gray-800 pt-3.5">
                  {item.stt}
                </td>

                {/* Thông tin hồ sơ ủy thác */}
                <td className="py-3 px-3 space-y-1 pt-3.5">
                  <p className="text-gray-900">
                    <span className="font-bold">Tên bị án:</span> {item.tenBiAn}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-bold">Tên vụ án:</span> {item.tenVuAn}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-bold">Số bản án:</span> {item.soBanAn}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-bold">Ngày bản án:</span> {item.ngayBanAn}
                  </p>
                </td>

                {/* Hình phạt */}
                <td className="py-3 px-3 space-y-1 pt-3.5">
                  <p className="text-gray-900">
                    <span className="font-bold">Tội danh:</span> {item.toiDanh}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-bold">Hình phạt chính:</span> {item.hinhPhatChinh}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-bold">Hình phạt bổ sung:</span> {item.hinhPhatBoSung}
                  </p>
                </td>

                {/* Tòa án ủy thác */}
                <td className="py-3 px-3 text-gray-900 pt-3.5">
                  {item.toaAnUyThac}
                </td>

                {/* Lý do ủy thác */}
                <td className="py-3 px-3 text-gray-900 pt-3.5">
                  {item.lyDoUyThac}
                </td>

                {/* Ngày ủy thác */}
                <td className="py-3 px-3 text-gray-900 pt-3.5">
                  {item.ngayUyThac}
                </td>

                {/* Trạng thái */}
                <td className="py-3 px-3 text-center pt-3.5">
                  {item.trangThai === 'Đã nhận' ? (
                    <span className="bg-[#EEFBF4] text-[#1EAA61] font-medium text-[11px] px-3 py-1 rounded-full inline-block">
                      Đã nhận
                    </span>
                  ) : (
                    <span className="bg-[#FEF8EC] text-[#D98A2A] font-medium text-[11px] px-3 py-1 rounded-full inline-block">
                      Đã trả lại
                    </span>
                  )}
                </td>

                {/* Thao tác */}
                <td className="py-3 px-3 text-center pt-3.5 relative">
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                    className="text-gray-500 hover:text-gray-800 p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4 mx-auto" />
                  </button>

                  {/* Dropdown menu */}
                  {activeMenuId === item.id && (
                    <div className="absolute right-3 top-10 w-40 bg-white border border-gray-200 rounded shadow-lg z-20 py-1 text-left text-xs">
                      <button
                        onClick={() => {
                          setSelectedRecordForDetail(item);
                          setActiveMenuId(null);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center space-x-2 text-gray-700 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-gray-500" />
                        <span>Xem chi tiết</span>
                      </button>
                      <button
                        onClick={() => {
                          setRecords((prev) =>
                            prev.map((r) =>
                              r.id === item.id
                                ? { ...r, trangThai: r.trangThai === 'Đã nhận' ? 'Đã trả lại' : 'Đã nhận' }
                                : r
                            )
                          );
                          setActiveMenuId(null);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center space-x-2 text-gray-700 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                        <span>Đổi trạng thái</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal View Detail */}
      {selectedRecordForDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="bg-[#800000] text-white px-5 py-3 flex justify-between items-center">
              <h3 className="font-bold text-sm">Chi tiết hồ sơ ủy thác thi hành án</h3>
              <button
                onClick={() => setSelectedRecordForDetail(null)}
                className="text-white hover:text-gray-200 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-5 space-y-3 text-xs text-gray-800">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded border border-gray-200">
                <p><span className="font-bold">Tên bị án:</span> {selectedRecordForDetail.tenBiAn}</p>
                <p><span className="font-bold">Số bản án:</span> {selectedRecordForDetail.soBanAn}</p>
                <p className="col-span-2"><span className="font-bold">Tên vụ án:</span> {selectedRecordForDetail.tenVuAn}</p>
                <p><span className="font-bold">Ngày bản án:</span> {selectedRecordForDetail.ngayBanAn}</p>
                <p><span className="font-bold">Trạng thái:</span> {selectedRecordForDetail.trangThai}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-200 space-y-1">
                <p><span className="font-bold">Tội danh:</span> {selectedRecordForDetail.toiDanh}</p>
                <p><span className="font-bold">Hình phạt chính:</span> {selectedRecordForDetail.hinhPhatChinh}</p>
                <p><span className="font-bold">Hình phạt bổ sung:</span> {selectedRecordForDetail.hinhPhatBoSung}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-200 space-y-1">
                <p><span className="font-bold">Tòa án ủy thác:</span> {selectedRecordForDetail.toaAnUyThac}</p>
                <p><span className="font-bold">Lý do ủy thác:</span> {selectedRecordForDetail.lyDoUyThac}</p>
                <p><span className="font-bold">Ngày ủy thác:</span> {selectedRecordForDetail.ngayUyThac}</p>
              </div>
            </div>
            <div className="bg-gray-100 px-5 py-2.5 flex justify-end">
              <button
                onClick={() => setSelectedRecordForDetail(null)}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-1.5 rounded text-xs text-gray-800 cursor-pointer font-medium"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
