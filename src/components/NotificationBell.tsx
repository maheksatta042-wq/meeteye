import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}

interface NotificationBellProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationBell({ notifications, onMarkAsRead, onMarkAllAsRead }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pulse, setPulse] = useState(true);

  const unreadCount = notifications.filter(n => !n.read).length;
  const hasUnread = unreadCount > 0;

  useEffect(() => {
    if (hasUnread) {
      setPulse(true);
    } else {
      setPulse(false);
    }
  }, [hasUnread]);

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          animate={pulse && hasUnread ? {
            scale: [1, 1.2, 1],
          } : {}}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Bell className="h-5 w-5" />
        </motion.div>
        <AnimatePresence>
          {hasUnread && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 0 0px rgba(239, 68, 68, 0.7)',
                    '0 0 0 8px rgba(239, 68, 68, 0)',
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="relative"
              >
                <Badge className="bg-red-600 text-white border-2 border-white min-w-[20px] h-5 flex items-center justify-center px-1">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
                {hasUnread && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkAllAsRead();
                    }}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 hover:bg-gray-50 transition-colors relative ${
                          !notification.read ? 'bg-red-50' : ''
                        }`}
                      >
                        <motion.div
                          animate={!notification.read ? {
                            backgroundColor: ['rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.1)'],
                          } : {}}
                          transition={{
                            duration: 2,
                            repeat: !notification.read ? Infinity : 0,
                          }}
                          className="absolute inset-0"
                        />
                        <div className="relative flex items-start justify-between">
                          <div className="flex-1 pr-4">
                            <div className="flex items-center space-x-2 mb-1">
                              {!notification.read && (
                                <motion.div
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0.7, 1],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                  }}
                                >
                                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                                </motion.div>
                              )}
                              <h4 className="font-semibold text-sm">{notification.title}</h4>
                              {notification.priority === 'high' && (
                                <Badge className="bg-red-600 text-white text-xs">High Priority</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                            <p className="text-xs text-gray-400">{notification.timestamp}</p>
                          </div>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onMarkAsRead(notification.id);
                              }}
                              className="h-8 w-8 p-0 hover:bg-gray-200"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
