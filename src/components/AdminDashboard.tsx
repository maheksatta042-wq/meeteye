import { useState } from 'react';
import { LogOut, LayoutDashboard, Users, Building2, BarChart3, Settings, Shield, Bell, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AdminDashboardProps {
  userName: string;
  onLogout: () => void;
}

export function AdminDashboard({ userName, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: Users, label: 'Total Users', value: '10,245', change: '+245', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: Building2, label: 'Organizations', value: '523', change: '+12', color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: Activity, label: 'Active Sessions', value: '8,567', change: '+1.2k', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: BarChart3, label: 'MRR', value: '$284K', change: '+15%', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  const recentOrganizations = [
    { name: 'Acme Corporation', users: 145, plan: 'Enterprise', status: 'Active', mrr: '$4,350' },
    { name: 'TechStart Inc', users: 89, plan: 'Business', status: 'Active', mrr: '$2,670' },
    { name: 'Global Solutions Ltd', users: 234, plan: 'Enterprise', status: 'Active', mrr: '$7,020' },
    { name: 'Digital Wave Agency', users: 45, plan: 'Professional', status: 'Trial', mrr: '$0' },
  ];

  const systemHealth = [
    { metric: 'Server Uptime', value: '99.98%', status: 'Excellent' },
    { metric: 'API Response Time', value: '45ms', status: 'Good' },
    { metric: 'Database Performance', value: '98%', status: 'Excellent' },
    { metric: 'Error Rate', value: '0.02%', status: 'Excellent' },
  ];

  const partners = [
    { name: 'TechSolutions Inc.', clients: 28, revenue: '$8,450', tier: 'Gold' },
    { name: 'Digital Growth Agency', clients: 45, revenue: '$13,500', tier: 'Platinum' },
    { name: 'HR Consulting Group', clients: 12, revenue: '$3,600', tier: 'Silver' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Logo />
              <span className="px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full">
                Admin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-500">Administrator</p>
                <p className="text-sm capitalize">{userName}</p>
              </div>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">System overview and management controls</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className="text-sm text-green-600">{stat.change}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="organizations">
              <Building2 className="h-4 w-4 mr-2" />
              Organizations
            </TabsTrigger>
            <TabsTrigger value="partners">
              <Users className="h-4 w-4 mr-2" />
              Partners
            </TabsTrigger>
            <TabsTrigger value="system">
              <Shield className="h-4 w-4 mr-2" />
              System
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Real-time system performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {systemHealth.map((item, index) => (
                    <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-gray-600 mb-1">{item.metric}</p>
                      <p className="text-2xl mb-1">{item.value}</p>
                      <span className="text-xs px-2 py-1 bg-green-200 text-green-700 rounded-full">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Organizations</CardTitle>
                <CardDescription>Latest organizational sign-ups and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrganizations.map((org, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{org.name}</p>
                        <p className="text-sm text-gray-600">{org.users} users · {org.plan} Plan</p>
                      </div>
                      <div className="text-right mr-4">
                        <p className="font-semibold">{org.mrr}/mo</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          org.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {org.status}
                        </span>
                      </div>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organizations">
            <Card>
              <CardHeader>
                <CardTitle>All Organizations</CardTitle>
                <CardDescription>Manage all client organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrganizations.map((org, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{org.name}</p>
                        <p className="text-sm text-gray-600">{org.users} users · {org.plan} · {org.status}</p>
                      </div>
                      <div className="text-right mr-4">
                        <p className="font-semibold">{org.mrr}/month</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partners">
            <Card>
              <CardHeader>
                <CardTitle>Partner Management</CardTitle>
                <CardDescription>Oversee all partner accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {partners.map((partner, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{partner.name}</p>
                        <p className="text-sm text-gray-600">{partner.clients} clients · {partner.tier} Tier</p>
                      </div>
                      <div className="text-right mr-4">
                        <p className="font-semibold">{partner.revenue}/mo</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm">Manage</Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    Approve New Partner
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Administration</CardTitle>
                <CardDescription>Advanced system controls and monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Shield className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="font-semibold mb-1">Security Settings</h3>
                    <p className="text-sm text-gray-600 mb-4">Configure security policies and authentication</p>
                    <Button variant="outline">Manage</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Activity className="h-8 w-8 text-green-600 mb-2" />
                    <h3 className="font-semibold mb-1">System Logs</h3>
                    <p className="text-sm text-gray-600 mb-4">View detailed system activity logs</p>
                    <Button variant="outline">View Logs</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
                    <h3 className="font-semibold mb-1">Analytics</h3>
                    <p className="text-sm text-gray-600 mb-4">Deep dive into platform analytics</p>
                    <Button variant="outline">View Reports</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Settings className="h-8 w-8 text-orange-600 mb-2" />
                    <h3 className="font-semibold mb-1">Platform Config</h3>
                    <p className="text-sm text-gray-600 mb-4">Configure platform-wide settings</p>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>Manage your administrator account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Profile Information</h3>
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Security</h3>
                    <Button variant="outline">Change Password</Button>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Two-Factor Authentication</h3>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Admin Permissions</h3>
                    <Button variant="outline">Manage Roles</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
