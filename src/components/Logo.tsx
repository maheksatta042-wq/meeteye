import { Activity } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-sm opacity-75"></div>
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
          <Activity className="h-6 w-6 text-white" />
        </div>
      </div>
      <span className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        WorkEye
      </span>
    </div>
  );
}
