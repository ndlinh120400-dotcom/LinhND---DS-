import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SidebarProps {
  activeSubmenu: string;
  onSelectSubmenu: (menu: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSubmenu, onSelectSubmenu }) => {
  const [openSection, setOpenSection] = useState<string | null>('Thi hành án');

  const mainNavItems = [
    { title: 'Trang chủ', hasChildren: false },
    { title: 'Hình sự', hasChildren: true },
    { title: 'Dân sự', hasChildren: true },
    { title: 'Hôn nhân và gia đình', hasChildren: true },
    { title: 'Kinh doanh thương mại', hasChildren: true },
    { title: 'Lao động', hasChildren: true },
    { title: 'Hành chính', hasChildren: true },
    { title: 'Phá sản', hasChildren: true },
    { title: 'Biện pháp XLHC', hasChildren: true },
    { title: 'Sở hữu trí tuệ', hasChildren: true },
  ];

  const thiHanhAnSubmenu = [
    { id: 'danh-sach-ban-an', label: 'Danh sách bản án/quyết định' },
    { id: 'danh-sach-bi-an', label: 'Danh sách bị án' },
    { id: 'nhan-uy-thac', label: 'Nhận ủy thác thi hành án' },
  ];

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] flex-shrink-0 select-none py-2">
      <nav className="text-sm">
        {mainNavItems.map((item) => (
          <div key={item.title} className="border-b border-gray-100/60">
            <button
              onClick={() => item.hasChildren && toggleSection(item.title)}
              className="w-full text-left px-4 py-2.5 flex items-center justify-between text-gray-800 hover:bg-gray-50 font-medium transition-colors cursor-pointer"
            >
              <span>{item.title}</span>
              {item.hasChildren && (
                openSection === item.title ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )
              )}
            </button>
          </div>
        ))}

        {/* Thi hành án Group */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection('Thi hành án')}
            className={`w-full text-left px-4 py-2.5 flex items-center justify-between font-bold cursor-pointer transition-colors ${
              openSection === 'Thi hành án' ? 'text-[#800000] bg-red-50/40' : 'text-gray-800 hover:bg-gray-50'
            }`}
          >
            <span>Thi hành án</span>
            {openSection === 'Thi hành án' ? (
              <ChevronUp className="w-4 h-4 text-[#800000]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {/* Submenu for Thi hành án */}
          {openSection === 'Thi hành án' && (
            <div className="bg-gray-50/50 py-1">
              {thiHanhAnSubmenu.map((sub) => {
                const isActive = activeSubmenu === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => onSelectSubmenu(sub.id)}
                    className={`w-full text-left pl-7 pr-4 py-2 text-xs transition-colors cursor-pointer flex items-center ${
                      isActive
                        ? 'bg-[#FDE8E8] text-[#800000] font-bold border-l-4 border-[#800000]'
                        : 'text-gray-700 hover:bg-gray-100 font-normal'
                    }`}
                  >
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};
