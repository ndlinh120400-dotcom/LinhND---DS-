import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AdvancedSearchPanel } from './components/AdvancedSearchPanel';
import { DefendantTable } from './components/DefendantTable';
import { Pagination } from './components/Pagination';
import { DefendantDetailModal } from './components/DefendantDetailModal';
import { PrintReportModal } from './components/PrintReportModal';
import { BanAnQuyetDinhView } from './components/BanAnQuyetDinhView';
import { BanAnQuyetDinhDetailModal } from './components/BanAnQuyetDinhDetailModal';
import { NhanUyThacView } from './components/NhanUyThacView';
import { INITIAL_BI_AN_LIST, INITIAL_BAN_AN_QUYET_DINH_LIST, INITIAL_NHAN_UY_THAC_LIST } from './data/mockData';
import { BiAnRecord, BanAnQuyetDinhRecord, NhanUyThacRecord, FilterState } from './types';
import { Printer, RefreshCw } from 'lucide-react';

export default function App() {
  const [records, setRecords] = useState<BiAnRecord[]>(INITIAL_BI_AN_LIST);
  const [banAnRecords] = useState<BanAnQuyetDinhRecord[]>(INITIAL_BAN_AN_QUYET_DINH_LIST);
  const [nhanUyThacRecords] = useState<NhanUyThacRecord[]>(INITIAL_NHAN_UY_THAC_LIST);
  const [activeSubmenu, setActiveSubmenu] = useState<string>('danh-sach-bi-an');
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState<boolean>(true);

  // Selected BA/QĐ for detail modal
  const [selectedBAQD, setSelectedBAQD] = useState<BanAnQuyetDinhRecord | null>(null);

  // Initial filters preset
  const initialFilterState: FilterState = {
    biAnCategory: 'Tất cả',
    tenBiAn: '',
    soBanAn: '',
    ngayBanAn: '',
    soCCCD: '',
    tinhTrangGiaiQuyet: 'Tất cả',
    soQDThiHanhAn: '',
    ngayQDTuNgay: '',
    ngayQDDenNgay: '',
    trangThaiThiHanhAn: 'Tất cả',
    quickSearch: '',
  };

  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [activeFilterCriteria, setActiveFilterCriteria] = useState<FilterState>(initialFilterState);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Modals
  const [selectedDefendant, setSelectedDefendant] = useState<BiAnRecord | null>(null);
  const [showPrintReport, setShowPrintReport] = useState<boolean>(false);

  // Apply filters
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      // Quick search filter
      if (activeFilterCriteria.quickSearch.trim()) {
        const q = activeFilterCriteria.quickSearch.toLowerCase();
        const matchesName = rec.hoTen.toLowerCase().includes(q);
        const matchesCaseNo = rec.soBanAn.toLowerCase().includes(q);
        const matchesToiDanh = rec.toiDanh.toLowerCase().includes(q);
        if (!matchesName && !matchesCaseNo && !matchesToiDanh) return false;
      }

      // Name filter
      if (
        activeFilterCriteria.tenBiAn.trim() &&
        !rec.hoTen.toLowerCase().includes(activeFilterCriteria.tenBiAn.toLowerCase().trim())
      ) {
        return false;
      }

      // Case number filter
      if (
        activeFilterCriteria.soBanAn.trim() &&
        !rec.soBanAn.toLowerCase().includes(activeFilterCriteria.soBanAn.toLowerCase().trim())
      ) {
        return false;
      }

      // CCCD filter
      if (
        activeFilterCriteria.soCCCD.trim() &&
        rec.soCCCD &&
        !rec.soCCCD.includes(activeFilterCriteria.soCCCD.trim())
      ) {
        return false;
      }

      // QĐ THA filter
      if (
        activeFilterCriteria.soQDThiHanhAn.trim() &&
        rec.soQDThiHanhAn &&
        !rec.soQDThiHanhAn.toLowerCase().includes(activeFilterCriteria.soQDThiHanhAn.toLowerCase().trim())
      ) {
        return false;
      }

      return true;
    });
  }, [records, activeFilterCriteria]);

  // Paginated records
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const currentRecords = useMemo(() => {
    const pageToUse = Math.min(currentPage, totalPages);
    const start = (pageToUse - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage, totalPages]);

  const handleSearch = () => {
    setActiveFilterCriteria({ ...filters });
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    const resetState: FilterState = {
      biAnCategory: 'Tất cả',
      tenBiAn: '',
      soBanAn: '',
      ngayBanAn: '',
      soCCCD: '',
      tinhTrangGiaiQuyet: 'Tất cả',
      soQDThiHanhAn: '',
      ngayQDTuNgay: '',
      ngayQDDenNgay: '',
      trangThaiThiHanhAn: 'Tất cả',
      quickSearch: '',
    };
    setFilters(resetState);
    setActiveFilterCriteria(resetState);
    setCurrentPage(1);
  };

  const handleToggleCheckbox = (id: string) => {
    setRecords((prev) =>
      prev.map((rec) =>
        rec.id === id
          ? { ...rec, chuaCoThongTinTrenHeThong: !rec.chuaCoThongTinTrenHeThong }
          : rec
      )
    );
  };

  const handleSaveDefendant = (updated: BiAnRecord) => {
    setRecords((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    setSelectedDefendant(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-['Roboto',sans-serif]">
      {/* Top Navigation Header */}
      <Header />

      {/* Main Body with Left Sidebar & Right Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeSubmenu={activeSubmenu}
          onSelectSubmenu={(menu) => setActiveSubmenu(menu)}
        />

        {/* Right Content Workspace */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* Main Title Banner / Context */}
          {activeSubmenu === 'danh-sach-ban-an' ? (
            <BanAnQuyetDinhView
              records={banAnRecords}
              onViewDetail={(item) => setSelectedBAQD(item)}
              onPrintReport={() => setShowPrintReport(true)}
            />
          ) : activeSubmenu === 'danh-sach-bi-an' ? (
            <>
              {/* Search Panel */}
              <AdvancedSearchPanel
                filters={filters}
                setFilters={setFilters}
                isExpanded={isAdvancedSearchOpen}
                setIsExpanded={setIsAdvancedSearchOpen}
                onSearch={handleSearch}
                onReset={handleResetFilters}
              />

              {/* Action Toolbar above Table */}
              <div className="flex justify-between items-center mb-2.5">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center space-x-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-2.5 py-1.5 text-xs font-medium rounded cursor-pointer"
                    title="Tải lại danh sách"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Tải lại</span>
                  </button>
                </div>

                {/* Print Report Button */}
                <button
                  onClick={() => setShowPrintReport(true)}
                  className="flex items-center space-x-1.5 bg-[#800000] hover:bg-[#660000] text-white px-3.5 py-1.5 text-xs font-medium rounded shadow-2xs transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>In báo cáo</span>
                </button>
              </div>

              {/* Data Table */}
              <DefendantTable
                data={currentRecords}
                onSelectDefendant={(rec) => setSelectedDefendant(rec)}
                onToggleCheckbox={handleToggleCheckbox}
              />

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredRecords.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(p) => setCurrentPage(p)}
              />
            </>
          ) : activeSubmenu === 'nhan-uy-thac' ? (
            <NhanUyThacView
              records={nhanUyThacRecords}
              onPrintReport={() => setShowPrintReport(true)}
            />
          ) : (
            /* Fallback view for other menu items */
            <div className="bg-white p-8 rounded border border-gray-200 text-center text-gray-600">
              <h2 className="text-lg font-bold text-[#800000] mb-2">
                Nội dung đang cập nhật
              </h2>
              <p className="text-sm text-gray-500">
                Giao diện đang được cập nhật thêm các hồ sơ mới.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Defendant Detail Modal */}
      {selectedDefendant && (
        <DefendantDetailModal
          defendant={selectedDefendant}
          onClose={() => setSelectedDefendant(null)}
          onSave={handleSaveDefendant}
        />
      )}

      {/* Bản án / Quyết định Detail Modal */}
      {selectedBAQD && (
        <BanAnQuyetDinhDetailModal
          record={selectedBAQD}
          onClose={() => setSelectedBAQD(null)}
        />
      )}

      {/* Print Report Modal */}
      {showPrintReport && (
        <PrintReportModal
          data={filteredRecords}
          onClose={() => setShowPrintReport(false)}
        />
      )}
    </div>
  );
}
