import { Clock, TrendingUp, Eye } from 'lucide-react';

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
}

interface EmployeeOverviewTableProps {
  employees: Employee[];
  onEmployeeClick: (employee: Employee) => void;
}

export function EmployeeOverviewTable({ employees, onEmployeeClick }: EmployeeOverviewTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'idle':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'offline':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getProductivityColor = (productivity: number) => {
    if (productivity >= 90) return 'text-emerald-600';
    if (productivity >= 75) return 'text-green-600';
    if (productivity >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h2 className="text-slate-900">All Employees</h2>
        <p className="text-slate-500 mt-1">Comprehensive view of team activity and performance</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-left text-slate-700">Employee</th>
              <th className="px-6 py-4 text-left text-slate-700">Status</th>
              <th className="px-6 py-4 text-left text-slate-700">Screen Time</th>
              <th className="px-6 py-4 text-left text-slate-700">Active Time</th>
              <th className="px-6 py-4 text-left text-slate-700">Idle Time</th>
              <th className="px-6 py-4 text-left text-slate-700">Productivity</th>
              <th className="px-6 py-4 text-left text-slate-700">Screenshots</th>
              <th className="px-6 py-4 text-left text-slate-700">Last Activity</th>
              <th className="px-6 py-4 text-left text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr 
                key={employee.id}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                        employee.status === 'active' ? 'bg-green-500' : 
                        employee.status === 'idle' ? 'bg-yellow-500' : 'bg-slate-400'
                      }`}></div>
                    </div>
                    <div>
                      <p className="text-slate-900">{employee.name}</p>
                      <p className="text-slate-500">{employee.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full border capitalize ${getStatusColor(employee.status)}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{employee.screenTime}h</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2 w-20">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(employee.activeTime / employee.screenTime) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-700">{employee.activeTime}h</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2 w-20">
                      <div 
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${(employee.idleTime / employee.screenTime) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-700">{employee.idleTime}h</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${getProductivityColor(employee.productivity)}`} />
                    <span className={getProductivityColor(employee.productivity)}>
                      {employee.productivity}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-700">{employee.screenshots.length}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-500">{employee.lastActivity}</span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onEmployeeClick(employee)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
