import React, { useState } from 'react';
import { Mail, Bell, MessageSquare, User, ChevronDown, LogOut, Settings, HelpCircle, Scale } from 'lucide-react';
import { NotificationItem } from '../types';

export const Header: React.FC = () => {
  const [showMailMenu, setShowMailMenu] = useState(false);
  const [showBellMenu, setShowBellMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications: NotificationItem[] = [
    { id: '1', title: 'Ủy thác thi hành án mới', content: 'Hồ sơ Nguyễn Văn A đã nhận ủy thác từ TAND Cấp cao', time: '10 phút trước', read: false, type: 'bell' },
    { id: '2', title: 'Quyết định THA', content: 'Số 322/2026/QĐ-TA đã được ký duyệt', time: '1 giờ trước', read: false, type: 'bell' },
    { id: '3', title: 'Báo cáo cần xác nhận', content: 'Báo cáo thi hành án tháng 3/2026', time: '2 giờ trước', read: false, type: 'mail' },
    { id: '4', title: 'Yêu cầu cập nhật hồ sơ', content: 'Cập nhật tình trạng hoãn thi hành án cho Nguyễn Văn A', time: 'Hôm qua', read: true, type: 'chat' },
    { id: '5', title: 'Thông báo hệ thống', content: 'Hệ thống đã nâng cấp phiên bản quản lý án v2.4', time: '2 ngày trước', read: true, type: 'bell' },
  ];

  return (
    <header className="bg-[#800000] text-white h-16 px-4 flex items-center justify-between shadow-md relative z-30 select-none">
      {/* Left Title & Crest */}
      <div className="flex items-center space-x-3">
        {/* Emblem Crest SVG */}
        <div className="w-10 h-10 rounded-full bg-amber-400 p-0.5 flex items-center justify-center shadow border border-amber-200 shrink-0">
          <div className="w-full h-full rounded-full bg-[#800000] flex flex-col items-center justify-center relative overflow-hidden border border-amber-300">
            <Scale className="w-6 h-6 text-amber-300" />
            <div className="absolute inset-0 bg-amber-500/10 pointer-events-none" />
          </div>
        </div>

        <div>
          <h1 className="font-bold text-base md:text-lg leading-tight tracking-wide text-white">
            Phần mềm quản lý án
          </h1>
          <p className="text-xs md:text-sm text-red-100/90 font-normal">
            Tòa án nhân dân khu vực II - Thành phố Hà Nội
          </p>
        </div>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center space-x-3 md:space-x-5">
        {/* Mail Notification */}
        <div className="relative">
          <button
            onClick={() => {
              setShowMailMenu(!showMailMenu);
              setShowBellMenu(false);
              setShowUserMenu(false);
            }}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors relative cursor-pointer"
            title="Hộp thư thông báo"
          >
            <Mail className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#800000]">
              5
            </span>
          </button>

          {showMailMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-md shadow-lg border border-gray-200 z-50 overflow-hidden">
              <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 font-semibold text-sm text-[#800000] flex justify-between items-center">
                <span>Hộp thư đến (5)</span>
                <button className="text-xs text-blue-600 hover:underline font-normal">Đánh dấu đã đọc</button>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                {notifications.map((item) => (
                  <div key={item.id} className={`p-3 hover:bg-gray-50 cursor-pointer ${!item.read ? 'bg-blue-50/40' : ''}`}>
                    <p className="font-semibold text-xs text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-600 truncate mt-0.5">{item.content}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bell Notification */}
        <div className="relative">
          <button
            onClick={() => {
              setShowBellMenu(!showBellMenu);
              setShowMailMenu(false);
              setShowUserMenu(false);
            }}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors relative cursor-pointer"
            title="Thông báo vụ án"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#800000]">
              5
            </span>
          </button>

          {showBellMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-md shadow-lg border border-gray-200 z-50 overflow-hidden">
              <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 font-semibold text-sm text-[#800000] flex justify-between items-center">
                <span>Thông báo hệ thống</span>
                <span className="text-xs text-gray-500">Mới nhất</span>
              </div>
              <div className="p-3 text-xs text-gray-600 border-b border-gray-100 hover:bg-gray-50">
                <span className="font-bold text-red-700 block">Cảnh báo thi hành án</span>
                3 bị án đến hạn hết thời gian hoãn chấp hành án phạt tù trong tuần này.
              </div>
              <div className="p-3 text-xs text-gray-600 hover:bg-gray-50">
                <span className="font-bold text-blue-700 block">Ủy thác thành công</span>
                Đã tiếp nhận hồ sơ ủy thác thi hành án số 123/2026/QĐ-TA.
              </div>
            </div>
          )}
        </div>

        {/* Chat / Message icon */}
        <button
          className="p-1.5 hover:bg-white/10 rounded-full transition-colors relative cursor-pointer"
          title="Tin nhắn điều hành"
          onClick={() => alert('Chức năng Tin nhắn điều hành nghiệp vụ')}
        >
          <MessageSquare className="w-5 h-5 text-white" />
        </button>

        {/* User Info Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowMailMenu(false);
              setShowBellMenu(false);
            }}
            className="flex items-center space-x-2 pl-2 hover:bg-white/10 py-1 px-2 rounded cursor-pointer transition-colors"
          >
            <span className="text-sm font-semibold text-white whitespace-nowrap">
              Đỗ Hà Linh
            </span>
            <div className="w-8 h-8 rounded-full bg-amber-200 text-[#800000] flex items-center justify-center font-bold text-sm border border-white/50">
              <User className="w-5 h-5 text-[#800000]" />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-white/80" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-md shadow-lg border border-gray-200 z-50 py-1">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-bold text-sm text-gray-900">Đỗ Hà Linh</p>
                <p className="text-xs text-gray-500">Cán bộ Thi hành án</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <span>Hồ sơ cá nhân</span>
              </button>
              <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                <Settings className="w-4 h-4 text-gray-500" />
                <span>Cấu hình hệ thống</span>
              </button>
              <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-gray-500" />
                <span>Hướng dẫn sử dụng</span>
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 font-medium">
                <LogOut className="w-4 h-4 text-red-600" />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
