import React, { useState } from 'react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isAudio?: boolean;
  audioDuration?: string;
}

const ChatManagement: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  
  const messages: Message[] = [
    {
      id: '1',
      senderId: 'ANH-2607',
      senderName: 'Nguyễn Tuấn Anh',
      senderAvatar: '/path-to-avatar.jpg',
      content: 'Xin chào! tôi là nguyễn tuấn anh, tôi muốn đặt sân này, không biết phải làm sao?',
      timestamp: '05:30 PM'
    },
    {
      id: '2',
      senderId: 'OWNER',
      senderName: 'Owner',
      senderAvatar: '/path-to-owner-avatar.jpg',
      content: 'Hello! xin chào bạn, rất vui được gặp bạn!',
      timestamp: '04:45 PM'
    },
    // ... more messages
  ];

  return (
    <div className="h-screen flex">
      {/* Left Sidebar - Chat List */}
      <div className="w-1/3 border-r bg-white">
        <div className="p-4 border-b">
          <select className="w-full p-2 border rounded-lg">
            <option>Tất cả tin nhắn</option>
          </select>
        </div>
        
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm tin nhắn"
              className="w-full p-2 pl-8 border rounded-lg"
            />
            <svg className="w-4 h-4 absolute left-2 top-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Chat List */}
        <div className="overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                selectedUser === message.senderId ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedUser(message.senderId)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={message.senderAvatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{message.senderName}</h3>
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src="/path-to-selected-user-avatar.jpg"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="font-medium">Nguyễn Tuấn Anh</h2>
              </div>
              <div className="flex gap-2">
                <button className="p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h.01M17 21h.01M12 17h.01M12 21h.01M7 17h.01M7 21h.01M3 13v8h18v-8M3 8h18v5H3V8zm0-5h18v5H3V3z" />
                  </svg>
                </button>
                <button className="p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button className="p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    message.senderId === 'OWNER' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === 'OWNER'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white'
                    }`}
                  >
                    {message.isAudio ? (
                      <div className="flex items-center gap-2">
                        <button className="p-1 rounded-full bg-white">
                          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                          </svg>
                        </button>
                        <div className="flex-1">
                          <div className="h-1 bg-white/30 rounded">
                            <div className="h-full w-1/3 bg-white rounded"></div>
                          </div>
                        </div>
                        <span className="text-sm">{message.audioDuration}</span>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                    <div className={`text-xs mt-1 ${
                      message.senderId === 'OWNER' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div className="flex-1 flex items-center gap-2 border rounded-lg px-3 py-2">
                  <input
                    type="text"
                    placeholder="Type your message here ..."
                    className="flex-1 outline-none"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Chọn một cuộc trò chuyện để bắt đầu
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatManagement; 