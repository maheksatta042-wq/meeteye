import { useState, useMemo } from 'react';
import { EmployeeOverviewTable } from './EmployeeOverviewTable';
import { EmployeeDetailView } from './EmployeeDetailView';
import { DashboardStats } from './DashboardStats';
import { DashboardFilters, FilterState } from './DashboardFilters';
import { Activity, LogOut, Users, LayoutDashboard } from 'lucide-react';

// Mock data for employees
const employees = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    role: 'Frontend Developer',
    status: 'active',
    screenTime: 7.5,
    activeTime: 6.8,
    idleTime: 0.7,
    lastActivity: '2 mins ago',
    productivity: 91,
    screenshots: [
      { id: 1, timestamp: '14:35', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop' },
      { id: 2, timestamp: '14:30', url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop' },
      { id: 3, timestamp: '14:25', url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop' },
      { id: 4, timestamp: '14:20', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop' },
    ],
    activities: [
      { time: '14:35', action: 'Editing code in VS Code', app: 'Visual Studio Code' },
      { time: '14:20', action: 'Reviewed pull request', app: 'GitHub' },
      { time: '14:05', action: 'Team standup meeting', app: 'Zoom' },
      { time: '13:50', action: 'Updated documentation', app: 'Notion' },
    ]
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    role: 'Backend Developer',
    status: 'active',
    screenTime: 8.2,
    activeTime: 7.5,
    idleTime: 0.7,
    lastActivity: '1 min ago',
    productivity: 92,
    screenshots: [
      { id: 1, timestamp: '14:35', url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=250&fit=crop' },
      { id: 2, timestamp: '14:30', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop' },
      { id: 3, timestamp: '14:25', url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop' },
    ],
    activities: [
      { time: '14:35', action: 'Database optimization', app: 'PostgreSQL' },
      { time: '14:15', action: 'API development', app: 'Postman' },
      { time: '14:00', action: 'Code review', app: 'GitHub' },
    ]
  },
  {
    id: 3,
    name: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    role: 'UI/UX Designer',
    status: 'idle',
    screenTime: 6.3,
    activeTime: 5.2,
    idleTime: 1.1,
    lastActivity: '12 mins ago',
    productivity: 83,
    screenshots: [
      { id: 1, timestamp: '14:25', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop' },
      { id: 2, timestamp: '14:20', url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop' },
    ],
    activities: [
      { time: '14:25', action: 'Designing mockups', app: 'Figma' },
      { time: '14:10', action: 'Client feedback review', app: 'Slack' },
      { time: '13:50', action: 'Design system updates', app: 'Figma' },
    ]
  },
  {
    id: 4,
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    role: 'DevOps Engineer',
    status: 'active',
    screenTime: 7.8,
    activeTime: 7.1,
    idleTime: 0.7,
    lastActivity: '3 mins ago',
    productivity: 89,
    screenshots: [
      { id: 1, timestamp: '14:35', url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop' },
      { id: 2, timestamp: '14:30', url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=250&fit=crop' },
    ],
    activities: [
      { time: '14:35', action: 'Server monitoring', app: 'Terminal' },
      { time: '14:18', action: 'CI/CD pipeline updates', app: 'Jenkins' },
      { time: '14:02', action: 'Infrastructure review', app: 'AWS Console' },
    ]
  },
  {
    id: 5,
    name: 'Olivia Martinez',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
    role: 'Product Manager',
    status: 'active',
    screenTime: 6.9,
    activeTime: 6.3,
    idleTime: 0.6,
    lastActivity: '5 mins ago',
    productivity: 88,
    screenshots: [
      { id: 1, timestamp: '14:30', url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop' },
    ],
    activities: [
      { time: '14:30', action: 'Sprint planning', app: 'Jira' },
      { time: '14:10', action: 'Stakeholder meeting', app: 'Google Meet' },
      { time: '13:55', action: 'Roadmap updates', app: 'Confluence' },
    ]
  },
  {
    id: 6,
    name: 'David Thompson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    role: 'QA Engineer',
    status: 'offline',
    screenTime: 5.2,
    activeTime: 4.8,
    idleTime: 0.4,
    lastActivity: '45 mins ago',
    productivity: 75,
    screenshots: [
      { id: 1, timestamp: '13:50', url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop' },
    ],
    activities: [
      { time: '13:50', action: 'Test case execution', app: 'TestRail' },
      { time: '13:30', action: 'Bug reporting', app: 'Jira' },
      { time: '13:10', action: 'Automation testing', app: 'Selenium' },
    ]
  },
];

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<typeof employees[0] | null>(null);
  const [view, setView] = useState<'overview' | 'detail'>('overview');
  const [filters, setFilters] = useState<FilterState>({
    searchName: '',
    status: 'all',
    screenTimeMin: '',
    screenTimeMax: '',
    activeTimeMin: '',
    activeTimeMax: '',
    idleTimeMin: '',
    idleTimeMax: '',
    productivityMin: '',
    productivityMax: '',
    screenshotsMin: '',
    screenshotsMax: '',
  });

  // Filter employees based on filter state
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      // Name search
      if (filters.searchName && !employee.name.toLowerCase().includes(filters.searchName.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && employee.status !== filters.status) {
        return false;
      }

      // Screen time range
      if (filters.screenTimeMin && employee.screenTime < parseFloat(filters.screenTimeMin)) {
        return false;
      }
      if (filters.screenTimeMax && employee.screenTime > parseFloat(filters.screenTimeMax)) {
        return false;
      }

      // Active time range
      if (filters.activeTimeMin && employee.activeTime < parseFloat(filters.activeTimeMin)) {
        return false;
      }
      if (filters.activeTimeMax && employee.activeTime > parseFloat(filters.activeTimeMax)) {
        return false;
      }

      // Idle time range
      if (filters.idleTimeMin && employee.idleTime < parseFloat(filters.idleTimeMin)) {
        return false;
      }
      if (filters.idleTimeMax && employee.idleTime > parseFloat(filters.idleTimeMax)) {
        return false;
      }

      // Productivity range
      if (filters.productivityMin && employee.productivity < parseFloat(filters.productivityMin)) {
        return false;
      }
      if (filters.productivityMax && employee.productivity > parseFloat(filters.productivityMax)) {
        return false;
      }

      // Screenshots range
      if (filters.screenshotsMin && employee.screenshots.length < parseInt(filters.screenshotsMin)) {
        return false;
      }
      if (filters.screenshotsMax && employee.screenshots.length > parseInt(filters.screenshotsMax)) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleEmployeeClick = (employee: typeof employees[0]) => {
    setSelectedEmployee(employee);
    setView('detail');
  };

  const handleBackToOverview = () => {
    setView('overview');
    setSelectedEmployee(null);
  };

  const handleFilterReset = () => {
    setFilters({
      searchName: '',
      status: 'all',
      screenTimeMin: '',
      screenTimeMax: '',
      activeTimeMin: '',
      activeTimeMax: '',
      idleTimeMin: '',
      idleTimeMax: '',
      productivityMin: '',
      productivityMax: '',
      screenshotsMin: '',
      screenshotsMax: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">TrackPro Dashboard</h1>
                <p className="text-slate-500">Real-time employee monitoring</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700">Live Tracking Active</span>
              </div>
              
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-slate-700"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1800px] mx-auto px-8">
          <div className="flex gap-1">
            <button
              onClick={handleBackToOverview}
              className={`flex items-center gap-2 px-6 py-4 transition-all ${
                view === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900 border-b-2 border-transparent'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>
            {selectedEmployee && (
              <button
                className={`flex items-center gap-2 px-6 py-4 transition-all ${
                  view === 'detail'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900 border-b-2 border-transparent'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{selectedEmployee.name}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-8 py-8">
        {view === 'overview' ? (
          <>
            <DashboardStats employees={filteredEmployees} />
            <DashboardFilters 
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleFilterReset}
            />
            <EmployeeOverviewTable 
              employees={filteredEmployees}
              onEmployeeClick={handleEmployeeClick}
            />
          </>
        ) : selectedEmployee ? (
          <EmployeeDetailView 
            employee={selectedEmployee}
            onBack={handleBackToOverview}
          />
        ) : null}
      </div>
    </div>
  );
}
