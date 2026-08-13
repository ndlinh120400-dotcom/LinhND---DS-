import React from 'react';
import { FilterState } from '../types';
import { Calendar } from 'lucide-react';

interface AdvancedSearchPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isExpanded: boolean;
  setIsExpanded: (val: boolean | ((prev: boolean) => boolean)) => void;
  onSearch: () => void;
  onReset: () => void;
}

export const AdvancedSearchPanel: React.FC<AdvancedSearchPanelProps> = ({
  filters,
  setFilters,
  isExpanded,
  setIsExpanded,
  onSearch,
  onReset,
}) => {
  const handleChange = (field: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mb-4">
      {/* Quick Search & Toggle Link Bar */}
      <div className="flex items-center space-x-4 mb-3">
        <input
          type="text"
          value={filters.quickSearch}
          onChange={(e) => handleChange('quickSearch', e.target.value)}
          placeholder="Nhập từ khóa tìm kiếm"
          className="w-80 px-3 py-1.5 text-xs bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#800000] focus:border-[#800000]"
        />
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-xs text-blue-600 hover:underline font-medium cursor-pointer"
        >
          {isExpanded ? 'Ẩn tìm kiếm nâng cao' : 'Tìm kiếm nâng cao'}
        </button>
      </div>

      {/* Expanded Filter Panel */}
      {isExpanded && (
        <div className="bg-white border border-gray-200 rounded p-4 shadow-sm">
          <h2 className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">
            Tìm kiếm nâng cao
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">
            {/* Field 1: Bị án */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Bị án
              </label>
              <select
                value={filters.biAnCategory}
                onChange={(e) => handleChange('biAnCategory', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded text-gray-800 focus:outline-none focus:border-[#800000]"
              >
                <option value="Tất cả">Tất cả</option>
                <option value="Bị án Tòa quản lý">Bị án Tòa quản lý</option>
                <option value="Bị án nơi khác">Bị án nơi khác</option>
              </select>
            </div>

            {/* Field 2: Tên bị án */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Tên bị án
              </label>
              <input
                type="text"
                value={filters.tenBiAn}
                onChange={(e) => handleChange('tenBiAn', e.target.value)}
                placeholder="Tên bị án"
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#800000]"
              />
            </div>

            {/* Field 3: Số bản án */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Số bản án
              </label>
              <input
                type="text"
                value={filters.soBanAn}
                onChange={(e) => handleChange('soBanAn', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#800000]"
              />
            </div>

            {/* Field 4: Ngày bản án */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Ngày bản án
              </label>
              <input
                type="text"
                value={filters.ngayBanAn}
                onChange={(e) => handleChange('ngayBanAn', e.target.value)}
                placeholder="dd/mm/yyyy"
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#800000]"
              />
            </div>

            {/* Field 5: Số CCCD / Hộ chiếu */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Số CCCD / Hộ chiếu
              </label>
              <input
                type="text"
                value={filters.soCCCD}
                onChange={(e) => handleChange('soCCCD', e.target.value)}
                placeholder="Nhập số CCCD/Hộ chiếu"
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#800000]"
              />
            </div>

            {/* Field 6: Tình trạng giải quyết */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Tình trạng giải quyết
              </label>
              <select
                value={filters.tinhTrangGiaiQuyet}
                onChange={(e) => handleChange('tinhTrangGiaiQuyet', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded text-gray-800 focus:outline-none focus:border-[#800000]"
              >
                <option value="Tất cả">Tất cả</option>
                <option value="Đã có quyết định ủy thác thi hành án">
                  Đã có quyết định ủy thác thi hành án
                </option>
                <option value="Chưa thụ lý">Chưa thụ lý</option>
                <option value="Đã có quyết định THA">Đã có quyết định THA</option>
              </select>
            </div>

            {/* Field 7: Số quyết định thi hành án */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Số quyết định thi hành án
              </label>
              <input
                type="text"
                value={filters.soQDThiHanhAn}
                onChange={(e) => handleChange('soQDThiHanhAn', e.target.value)}
                placeholder="Nhập số quyết định"
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#800000]"
              />
            </div>

            {/* Field 8: Ngày quyết định thi hành án (Range) */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Ngày quyết định thi hành án
              </label>
              <div className="flex items-center space-x-1.5 border border-gray-300 rounded px-2 py-1 bg-white">
                <input
                  type="text"
                  value={filters.ngayQDTuNgay}
                  onChange={(e) => handleChange('ngayQDTuNgay', e.target.value)}
                  placeholder="Từ ngày"
                  className="w-full text-xs focus:outline-none text-gray-700"
                />
                <span className="text-gray-400 font-bold">→</span>
                <input
                  type="text"
                  value={filters.ngayQDDenNgay}
                  onChange={(e) => handleChange('ngayQDDenNgay', e.target.value)}
                  placeholder="Đến ngày"
                  className="w-full text-xs focus:outline-none text-gray-700"
                />
                <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              </div>
            </div>

            {/* Field 9: Trạng thái thi hành án */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Trạng thái thi hành án
              </label>
              <select
                value={filters.trangThaiThiHanhAn}
                onChange={(e) => handleChange('trangThaiThiHanhAn', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded text-gray-800 focus:outline-none focus:border-[#800000]"
              >
                <option value="Tất cả">Tất cả</option>
                <option value="Chờ thi hành án">Chờ thi hành án</option>
                <option value="Đang chấp hành án">Đang chấp hành án</option>
                <option value="Chấp hành án cộng đồng">Chấp hành án cộng đồng</option>
                <option value="Tại ngoại, chưa chấp hành">Tại ngoại, chưa chấp hành</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center space-x-3 mt-4 pt-3 border-t border-gray-100">
            <button
              onClick={onSearch}
              className="bg-[#800000] hover:bg-[#660000] text-white px-7 py-1.5 text-xs font-medium rounded transition-colors shadow-sm cursor-pointer"
            >
              Tìm kiếm
            </button>
            <button
              onClick={onReset}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-7 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer"
            >
              Làm mới
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
