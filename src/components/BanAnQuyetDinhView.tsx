import React, { useState } from 'react';
import { BanAnQuyetDinhRecord } from '../types';
import { Search, ChevronDown, Printer, RefreshCw, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface BanAnQuyetDinhViewProps {
  records: BanAnQuyetDinhRecord[];
  onViewDetail?: (record: BanAnQuyetDinhRecord) => void;
  onPrintReport?: () => void;
}

export const BanAnQuyetDinhView: React.FC<BanAnQuyetDinhViewProps> = ({
  records: initialRecords,
  onViewDetail,
  onPrintReport,
}) => {
  const [records, setRecords] = useState<BanAnQuyetDinhRecord[]>(initialRecords);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [jumpPageInput, setJumpPageInput] = useState<string>('');

  // Advanced search states
  const [filterSoBA, setFilterSoBA] = useState<string>('');
  const [filterTenVuAn, setFilterTenVuAn] = useState<string>('');
  const [filterToaAn, setFilterToaAn] = useState<string>('');
  const [filterGiaiDoan, setFilterGiaiDoan] = useState<string>('Tất cả');

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
    setFilterSoBA('');
    setFilterTenVuAn('');
    setFilterToaAn('');
    setFilterGiaiDoan('Tất cả');
    setCurrentPage(1);
  };

  // Filter logic
  const filteredRecords = records.filter((rec) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchBA = rec.soBanAnQuyetDinh.toLowerCase().includes(q);
      const matchTen = rec.tenVuAn.toLowerCase().includes(q);
      const matchMa = rec.maVuAn.toLowerCase().includes(q);
      if (!matchBA && !matchTen && !matchMa) return false;
    }
    if (filterSoBA.trim() && !rec.soBanAnQuyetDinh.toLowerCase().includes(filterSoBA.toLowerCase())) {
      return false;
    }
    if (filterTenVuAn.trim() && !rec.tenVuAn.toLowerCase().includes(filterTenVuAn.toLowerCase())) {
      return false;
    }
    if (filterToaAn.trim() && !rec.toaAnBanHanh.toLowerCase().includes(filterToaAn.toLowerCase())) {
      return false;
    }
    if (filterGiaiDoan !== 'Tất cả' && rec.giaiDoan !== filterGiaiDoan) {
      return false;
    }
    return true;
  });

  const totalItems = 110; // Fixed total to match screenshot "110 bản án/quyết định"
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 11;

  const handleJumpPage = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(jumpPageInput, 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      setCurrentPage(p);
      setJumpPageInput('');
    }
  };

  return (
    <div className="space-y-4 font-['Roboto',sans-serif]">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-1.5 text-xs text-gray-500">
        <span>Trang chủ</span>
        <span>/</span>
        <span>Thi hành án</span>
        <span>/</span>
        <span className="text-gray-800 font-semibold">DS bản án quyết định</span>
      </div>

      {/* Page Title */}
      <h1 className="text-xl font-bold text-gray-900">DS bản án quyết định</h1>

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
            <button
              onClick={() => setCurrentPage(1)}
              className="bg-[#800000] hover:bg-[#660000] text-white p-2 flex items-center justify-center transition-colors cursor-pointer"
            >
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
              <label className="block text-gray-700 font-medium mb-1">Số BA/QĐ</label>
              <input
                type="text"
                value={filterSoBA}
                onChange={(e) => setFilterSoBA(e.target.value)}
                placeholder="Nhập số bản án..."
                className="w-full border border-gray-300 rounded px-2.5 py-1.5 outline-none focus:border-[#800000]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Tên/Mã vụ án</label>
              <input
                type="text"
                value={filterTenVuAn}
                onChange={(e) => setFilterTenVuAn(e.target.value)}
                placeholder="Nhập tên vụ án..."
                className="w-full border border-gray-300 rounded px-2.5 py-1.5 outline-none focus:border-[#800000]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Tòa án ban hành</label>
              <input
                type="text"
                value={filterToaAn}
                onChange={(e) => setFilterToaAn(e.target.value)}
                placeholder="Tên tòa án..."
                className="w-full border border-gray-300 rounded px-2.5 py-1.5 outline-none focus:border-[#800000]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Giai đoạn</label>
              <select
                value={filterGiaiDoan}
                onChange={(e) => setFilterGiaiDoan(e.target.value)}
                className="w-full border border-gray-300 rounded px-2.5 py-1.5 outline-none focus:border-[#800000] bg-white"
              >
                <option value="Tất cả">Tất cả</option>
                <option value="Sơ thẩm">Sơ thẩm</option>
                <option value="Phúc thẩm">Phúc thẩm</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-1">
            <button
              onClick={() => setCurrentPage(1)}
              className="bg-[#800000] hover:bg-[#660000] text-white px-3.5 py-1 text-xs font-semibold rounded cursor-pointer transition-colors"
            >
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
              <th className="py-2.5 px-3 w-[260px]">Thông tin BA/QĐ</th>
              <th className="py-2.5 px-3 w-[230px]">Thông tin vụ án</th>
              <th className="py-2.5 px-3 w-[190px]">Kết quả giải quyết</th>
              <th className="py-2.5 px-3 w-[190px]">Thông tin thi hành án</th>
              <th className="py-2.5 px-3 text-center w-[150px]">Tình trạng giải quyết</th>
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

                {/* Thông tin BA/QĐ */}
                <td className="py-3 px-3">
                  <div className="border-l-2 border-[#800000] pl-2.5 space-y-1">
                    <p className="text-gray-900">
                      <span className="font-bold">Số BA/QĐ:</span> {item.soBanAnQuyetDinh}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-bold">Ngày BA/QĐ:</span> {item.ngayBanAnQuyetDinh}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-bold">Tòa án ban hành:</span> {item.toaAnBanHanh}
                    </p>
                    <div className="py-0.5">
                      <span className="bg-amber-50 text-amber-600 text-[11px] font-medium px-2 py-0.5 rounded-full inline-block">
                        Giai đoạn: {item.giaiDoan}
                      </span>
                    </div>
                    <p className="text-gray-900">
                      <span className="font-bold">Trạng thái:</span>{' '}
                      <span
                        className={
                          item.trangThaiHieuLuc === 'Có hiệu lực'
                            ? 'text-emerald-600 font-bold'
                            : 'text-red-600 font-bold'
                        }
                      >
                        {item.trangThaiHieuLuc}
                      </span>
                    </p>
                    <p className="text-gray-900">
                      <span className="font-bold">Ngày hiệu lực:</span> {item.ngayHieuLuc}
                    </p>
                  </div>
                </td>

                {/* Thông tin vụ án */}
                <td className="py-3 px-3 pt-3.5 space-y-1">
                  <p className="text-gray-900">
                    <span className="font-bold">Tên vụ án:</span> {item.tenVuAn}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-bold">Mã vụ án:</span> {item.maVuAn}
                  </p>
                </td>

                {/* Kết quả giải quyết */}
                <td className="py-3 px-3 pt-3.5 space-y-1">
                  <p className="text-gray-900">
                    <span className="font-bold">Số bị án có hiệu lực:</span>{' '}
                    <span className="text-red-600 font-bold">{item.soBiAnCoHieuLuc}</span>
                  </p>
                  <p className="text-gray-900">
                    <span className="font-bold">Số bị án có KN/KC:</span>{' '}
                    <span className="text-red-600 font-bold">{item.soBiAnCoKNKC}</span>
                  </p>
                </td>

                {/* Thông tin thi hành án */}
                <td className="py-3 px-3 pt-3.5 space-y-1">
                  <p className="text-gray-900">
                    <span className="font-bold">Số bị án đã thụ lý:</span>{' '}
                    <span className="text-red-600 font-bold">{item.soBiAnDaThuLy}</span>
                  </p>
                  <p className="text-gray-900">
                    <span className="font-bold">Số bị án có QĐ thi hành án:</span>{' '}
                    <span className="text-red-600 font-bold">{item.soBiAnCoQDThiHanhAn}</span>
                  </p>
                </td>

                {/* Tình trạng giải quyết */}
                <td className="py-3 px-3 text-center pt-3.5">
                  <span className="bg-red-50 text-red-500 font-medium text-[11px] px-2.5 py-1 rounded-full inline-block">
                    {item.tinhTrangGiaiQuyet}
                  </span>
                </td>

                {/* Thao tác */}
                <td className="py-3 px-3 text-center pt-3.5">
                  <button
                    onClick={() => onViewDetail && onViewDetail(item)}
                    className="text-gray-700 hover:text-[#800000] p-1.5 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                    title="Xem chi tiết"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Bottom Pagination Bar (Exactly matches screenshot) */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600 pt-2 gap-3">
        {/* Left item counter */}
        <div>
          Hiển thị 1-10 trong tổng số {totalItems} bản án/quyết định
        </div>

        {/* Right controls */}
        <div className="flex flex-wrap items-center space-x-2">
          {/* Previous Page Button */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers: 1, 2, 3, 4, 5, ..., 11 */}
          {[1, 2, 3, 4, 5].map((p) => {
            const isCurrent = currentPage === p;
            return (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-7 h-7 rounded-full flex items-center justify-center font-medium cursor-pointer transition-colors ${
                  isCurrent
                    ? 'bg-white text-red-600 border border-red-500 font-bold shadow-2xs'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            );
          })}

          <span className="px-1 text-gray-400">...</span>

          <button
            onClick={() => setCurrentPage(11)}
            className={`w-7 h-7 rounded-full flex items-center justify-center font-medium cursor-pointer transition-colors ${
              currentPage === 11
                ? 'bg-white text-red-600 border border-red-500 font-bold shadow-2xs'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            11
          </button>

          {/* Next Page Button */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Items Per Page Selector */}
          <div className="relative inline-block ml-2">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-xs bg-white text-gray-700 outline-none cursor-pointer pr-6 appearance-none"
            >
              <option value={10}>10 / trang</option>
              <option value={20}>20 / trang</option>
              <option value={50}>50 / trang</option>
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-1.5 top-2 pointer-events-none" />
          </div>

          {/* Jump to page form */}
          <form onSubmit={handleJumpPage} className="flex items-center space-x-1 ml-2">
            <span className="text-gray-600">Đến</span>
            <input
              type="text"
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              className="w-10 border border-gray-300 rounded px-1.5 py-0.5 text-center text-xs outline-none focus:border-[#800000]"
            />
            <span className="text-gray-600">Trang</span>
          </form>
        </div>
      </div>
    </div>
  );
};
