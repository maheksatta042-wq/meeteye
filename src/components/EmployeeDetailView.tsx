import { ArrowLeft, Clock, Activity, Moon, Camera, History } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  avatar: string;
  role: string;
  status: string;
  screenTime: number;
  activeTime: number;
  idleTime: number;
  lastActivity: string;
  productivity: number;
  screenshots: any[];
  activities: any[];
}

interface EmployeeDetailViewProps {
  employee: Employee;
  onBack: () => void;
}

export function EmployeeDetailView({ employee, onBack }: EmployeeDetailViewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-slate-400';
      default:
        return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Overview</span>
      </button>

      {/* Employee Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-24 h-24 rounded-2xl object-cover shadow-md"
            />
            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${getStatusColor(employee.status)}`}></div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-slate-900 mb-1">{employee.name}</h2>
            <p className="text-slate-500 mb-3">{employee.role}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="text-slate-500">Status:</span>
                <span className="capitalize">{employee.status}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300"></div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="text-slate-500">Last seen:</span>
                <span>{employee.lastActivity}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
            <div className="text-center">
              <div className="text-slate-900 mb-1">{employee.productivity}%</div>
              <div className="text-slate-500">Productivity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Stats - Simplified */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>Screen Time</div>
          </div>
          <div className="text-white">{employee.screenTime} hours</div>
          <p className="text-blue-100 mt-1">Today's total</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <div>Active Time</div>
          </div>
          <div className="text-white">{employee.activeTime} hours</div>
          <p className="text-green-100 mt-1">{Math.round((employee.activeTime / employee.screenTime) * 100)}% of screen time</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Moon className="w-6 h-6" />
            </div>
            <div>Idle Time</div>
          </div>
          <div className="text-white">{employee.idleTime} hours</div>
          <p className="text-orange-100 mt-1">{Math.round((employee.idleTime / employee.screenTime) * 100)}% of screen time</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Screenshots */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Camera className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-slate-900">Recent Screenshots</h3>
              <p className="text-slate-500">Captured every 5 minutes</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {employee.screenshots.slice(0, 4).map((screenshot) => (
              <div key={screenshot.id} className="group relative overflow-hidden rounded-xl border border-slate-200">
                <img
                  src={screenshot.url}
                  alt={`Screenshot at ${screenshot.timestamp}`}
                  className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-slate-700">
                  {screenshot.timestamp}
                </div>
              </div>
            ))}
          </div>

          {employee.screenshots.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Camera className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No screenshots available</p>
            </div>
          )}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <History className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-slate-900">Activity Log</h3>
              <p className="text-slate-500">What they've been working on</p>
            </div>
          </div>

          <div className="space-y-4">
            {employee.activities.map((activity, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-slate-900">{activity.action}</p>
                    <span className="text-slate-500 flex-shrink-0">{activity.time}</span>
                  </div>
                  <p className="text-slate-500">{activity.app}</p>
                </div>
              </div>
            ))}
          </div>

          {employee.activities.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No recent activities</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}