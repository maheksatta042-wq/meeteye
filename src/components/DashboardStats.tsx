import { Users, Activity, Clock, TrendingUp, Monitor, Zap } from 'lucide-react';

interface Employee {
  status: string;
  screenTime: number;
  activeTime: number;
  productivity: number;
  screenshots: any[];
}

interface DashboardStatsProps {
  employees: Employee[];
}

export function DashboardStats({ employees }: DashboardStatsProps) {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const idleEmployees = employees.filter(e => e.status === 'idle').length;
  const offlineEmployees = employees.filter(e => e.status === 'offline').length;
  
  const avgScreenTime = (employees.reduce((sum, e) => sum + e.screenTime, 0) / employees.length).toFixed(1);
  const avgActiveTime = (employees.reduce((sum, e) => sum + e.activeTime, 0) / employees.length).toFixed(1);
  const avgProductivity = Math.round(employees.reduce((sum, e) => sum + e.productivity, 0) / employees.length);
  const totalScreenshots = employees.reduce((sum, e) => sum + e.screenshots.length, 0);

  const stats = [
    {
      label: 'Total Employees',
      value: totalEmployees,
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      subtext: `${activeEmployees} active, ${idleEmployees} idle, ${offlineEmployees} offline`
    },
    {
      label: 'Active Now',
      value: activeEmployees,
      icon: Activity,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      subtext: `${Math.round((activeEmployees/totalEmployees)*100)}% of team`
    },
    {
      label: 'Avg Screen Time',
      value: `${avgScreenTime}h`,
      icon: Clock,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      subtext: `${avgActiveTime}h active time`
    },
    {
      label: 'Avg Productivity',
      value: `${avgProductivity}%`,
      icon: TrendingUp,
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      subtext: '+5% from yesterday'
    },
    {
      label: 'Screenshots Today',
      value: totalScreenshots,
      icon: Monitor,
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      subtext: 'Captured every 5 min'
    },
    {
      label: 'Peak Hours',
      value: '2-5 PM',
      icon: Zap,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      subtext: 'Most productive time'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
          <p className="text-slate-500 mb-1">{stat.label}</p>
          <p className="text-slate-900 mb-2">{stat.value}</p>
          <p className="text-slate-400">{stat.subtext}</p>
        </div>
      ))}
    </div>
  );
}
