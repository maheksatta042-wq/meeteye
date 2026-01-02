import { useState } from 'react';
import { LogOut, LayoutDashboard, Users, DollarSign, TrendingUp, FileText, Settings, Award, Trophy, Flame, Target, Star, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { NotificationBell, Notification } from './NotificationBell';
import { motion } from 'motion/react';

interface PartnerDashboardProps {
  userName: string;
  onLogout: () => void;
}

export function PartnerDashboard({ userName, onLogout }: PartnerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Notification state
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: '🎉 New Feature Alert!',
      message: 'Advanced AI Analytics now available in all plans. Check it out in the Product section!',
      timestamp: '2 hours ago',
      priority: 'high',
      read: false,
    },
    {
      id: '2',
      title: '💰 Commission Update',
      message: 'Your commission tier has been upgraded to Gold! You now earn 30% on all sales.',
      timestamp: '5 hours ago',
      priority: 'high',
      read: false,
    },
    {
      id: '3',
      title: '📢 Important Announcement',
      message: 'New pricing plans released. Updated partner materials available in Resources section.',
      timestamp: '1 day ago',
      priority: 'medium',
      read: false,
    },
    {
      id: '4',
      title: '🏆 Achievement Unlocked!',
      message: 'You\'ve reached 25 clients milestone! Bonus reward points added to your account.',
      timestamp: '2 days ago',
      priority: 'low',
      read: true,
    },
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  // Gamification Data
  const partnerLevel = {
    current: 'Gold',
    icon: Trophy,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-600',
    gradient: 'from-yellow-400 to-yellow-600',
    nextLevel: 'Platinum',
    progress: 68,
    pointsToNext: 1600,
    currentPoints: 5440,
  };

  const achievements = [
    { icon: Trophy, title: 'Top Performer', description: '25+ clients acquired', unlocked: true },
    { icon: Star, title: 'Rising Star', description: '10 clients in first month', unlocked: true },
    { icon: Flame, title: 'On Fire', description: '5 sales in one week', unlocked: true },
    { icon: Target, title: 'Sharpshooter', description: '90% conversion rate', unlocked: false },
    { icon: Zap, title: 'Speed Demon', description: 'Close 3 deals in 24 hours', unlocked: false },
    { icon: Award, title: 'Elite Partner', description: 'Reach Platinum tier', unlocked: false },
  ];

  const rewardPoints = {
    total: 5440,
    thisMonth: 850,
    breakdown: [
      { action: 'New client signup', points: 200, count: 3 },
      { action: 'Client upgrade', points: 150, count: 1 },
      { action: 'Referral bonus', points: 100, count: 2 },
      { action: 'Monthly milestone', points: 100, count: 1 },
    ],
  };

  // Commission Data with Performance Tiers
  const commissionData = {
    currentTier: 'Gold',
    commissionRate: 30,
    monthlyRevenue: 8450,
    totalEarnings: 2535,
    performanceScore: 85,
    tiers: [
      { name: 'Bronze', rate: 20, minRevenue: 0, color: 'from-orange-400 to-orange-600', icon: '🥉' },
      { name: 'Silver', rate: 25, minRevenue: 5000, color: 'from-gray-400 to-gray-600', icon: '🥈' },
      { name: 'Gold', rate: 30, minRevenue: 7500, color: 'from-yellow-400 to-yellow-600', icon: '🥇' },
      { name: 'Platinum', rate: 35, minRevenue: 15000, color: 'from-cyan-400 to-cyan-600', icon: '💎' },
      { name: 'Diamond', rate: 40, minRevenue: 25000, color: 'from-purple-400 to-purple-600', icon: '👑' },
    ],
    performanceMetrics: [
      { metric: 'Client Retention', value: 92, target: 90, bonus: 2 },
      { metric: 'Response Time', value: 95, target: 85, bonus: 3 },
      { metric: 'Client Satisfaction', value: 88, target: 90, bonus: 0 },
      { metric: 'Sales Velocity', value: 78, target: 75, bonus: 1 },
    ],
    monthlyBreakdown: [
      { month: 'Oct 2025', revenue: 8450, rate: 30, earned: 2535, tier: 'Gold' },
      { month: 'Sep 2025', revenue: 7230, rate: 25, earned: 1808, tier: 'Silver' },
      { month: 'Aug 2025', revenue: 6890, rate: 25, earned: 1723, tier: 'Silver' },
      { month: 'Jul 2025', revenue: 5450, rate: 25, earned: 1363, tier: 'Silver' },
    ],
  };

  const stats = [
    { icon: Users, label: 'Total Clients', value: '28', change: '+12%', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: DollarSign, label: 'Monthly Revenue', value: `$${commissionData.monthlyRevenue.toLocaleString()}`, change: '+23%', color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: TrendingUp, label: 'Commission Rate', value: `${commissionData.commissionRate}%`, change: commissionData.currentTier, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: Trophy, label: 'Reward Points', value: rewardPoints.total.toLocaleString(), change: `+${rewardPoints.thisMonth}`, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  const recentClients = [
    { name: 'Acme Corp', employees: 45, status: 'Active', revenue: 1350, date: 'Oct 28' },
    { name: 'TechStart Inc', employees: 23, status: 'Active', revenue: 690, date: 'Oct 25' },
    { name: 'Global Solutions', employees: 67, status: 'Active', revenue: 2010, date: 'Oct 22' },
    { name: 'Digital Wave', employees: 12, status: 'Trial', revenue: 0, date: 'Oct 30' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="flex items-center space-x-4">
              <NotificationBell
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
              />
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-500">Partner</p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm capitalize">{userName}</p>
                  <Badge className={`bg-gradient-to-r ${partnerLevel.gradient} text-white`}>
                    {partnerLevel.current}
                  </Badge>
                </div>
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
        {/* Welcome Section with Level */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl mb-2">
                Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent capitalize">{userName}</span>!
              </h1>
              <p className="text-gray-600">Here's your performance overview</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-r ${partnerLevel.gradient} text-white rounded-2xl p-6 min-w-[250px]`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <partnerLevel.icon className="h-8 w-8" />
                  <div>
                    <p className="text-sm opacity-90">Current Level</p>
                    <p className="text-2xl">{partnerLevel.current}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress to {partnerLevel.nextLevel}</span>
                  <span>{partnerLevel.progress}%</span>
                </div>
                <Progress value={partnerLevel.progress} className="h-2 bg-white/30" />
                <p className="text-xs mt-2 opacity-90">{partnerLevel.pointsToNext} points to next level</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
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
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="commissions">
              <DollarSign className="h-4 w-4 mr-2" />
              Commissions
            </TabsTrigger>
            <TabsTrigger value="gamification">
              <Trophy className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="clients">
              <Users className="h-4 w-4 mr-2" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="resources">
              <FileText className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Clients */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Clients</CardTitle>
                <CardDescription>Your latest client acquisitions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentClients.map((client, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold">{client.name}</p>
                        <p className="text-sm text-gray-600">{client.employees} employees · {client.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${client.revenue}/mo</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {client.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col space-y-2">
                    <Users className="h-6 w-6" />
                    <span>Add Client</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>View Reports</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col space-y-2">
                    <DollarSign className="h-6 w-6" />
                    <span>Billing</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col space-y-2">
                    <Trophy className="h-6 w-6" />
                    <span>Rewards</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commissions" className="space-y-6">
            {/* Commission Tiers */}
            <Card>
              <CardHeader>
                <CardTitle>Commission Tiers & Performance</CardTitle>
                <CardDescription>Your earnings are based on monthly revenue and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-5 gap-4 mb-8">
                  {commissionData.tiers.map((tier, index) => {
                    const isCurrentTier = tier.name === commissionData.currentTier;
                    const isAchieved = commissionData.monthlyRevenue >= tier.minRevenue;
                    
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`relative p-6 rounded-2xl text-center border-2 transition-all ${
                          isCurrentTier
                            ? `bg-gradient-to-br ${tier.color} text-white border-transparent shadow-xl`
                            : isAchieved
                            ? 'bg-gray-50 border-gray-300'
                            : 'bg-white border-gray-200 opacity-60'
                        }`}
                      >
                        {isCurrentTier && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-white text-gray-900">Current</Badge>
                          </div>
                        )}
                        <div className="text-4xl mb-2">{tier.icon}</div>
                        <h3 className={`text-lg mb-1 ${isCurrentTier ? 'text-white' : 'text-gray-900'}`}>
                          {tier.name}
                        </h3>
                        <p className={`text-2xl mb-2 ${isCurrentTier ? 'text-white' : 'text-gray-900'}`}>
                          {tier.rate}%
                        </p>
                        <p className={`text-sm ${isCurrentTier ? 'text-white/80' : 'text-gray-600'}`}>
                          ${tier.minRevenue.toLocaleString()}+ revenue
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Performance Metrics */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg mb-4">Performance Bonuses</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {commissionData.performanceMetrics.map((metric, index) => (
                      <div key={index} className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">{metric.metric}</span>
                          <Badge className={metric.bonus > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                            {metric.bonus > 0 ? `+${metric.bonus}%` : 'Target'}
                          </Badge>
                        </div>
                        <div className="flex items-end space-x-2 mb-2">
                          <span className="text-2xl">{metric.value}%</span>
                          <span className="text-sm text-gray-500 mb-1">/ {metric.target}% target</span>
                        </div>
                        <Progress value={(metric.value / metric.target) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Total Performance Bonus</p>
                    <p className="text-2xl text-green-600">+{commissionData.performanceMetrics.reduce((acc, m) => acc + m.bonus, 0)}%</p>
                  </div>
                </div>

                {/* Commission History */}
                <div>
                  <h3 className="text-lg mb-4">Commission History</h3>
                  <div className="space-y-3">
                    {commissionData.monthlyBreakdown.map((month, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">
                            {commissionData.tiers.find(t => t.name === month.tier)?.icon}
                          </div>
                          <div>
                            <p className="font-semibold">{month.month}</p>
                            <p className="text-sm text-gray-600">
                              ${month.revenue.toLocaleString()} revenue · {month.rate}% rate · {month.tier} tier
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl text-green-600">${month.earned.toLocaleString()}</p>
                          <span className="text-xs px-2 py-1 bg-green-200 text-green-700 rounded-full">
                            Paid
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gamification" className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Rewards</CardTitle>
                <CardDescription>Unlock badges and earn reward points</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
                      className={`p-6 rounded-2xl text-center border-2 ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400'
                          : 'bg-gray-100 border-gray-300 opacity-50'
                      }`}
                    >
                      <achievement.icon className={`h-12 w-12 mx-auto mb-3 ${
                        achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                      }`} />
                      <h3 className="text-lg mb-2">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      {achievement.unlocked && (
                        <Badge className="mt-3 bg-green-600">Unlocked</Badge>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Reward Points Breakdown */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                  <h3 className="text-xl mb-4">Reward Points This Month</h3>
                  <div className="space-y-3">
                    {rewardPoints.breakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                        <div>
                          <p className="font-semibold">{item.action}</p>
                          <p className="text-sm text-gray-600">×{item.count} times</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl text-purple-600">+{item.points * item.count}</p>
                          <p className="text-xs text-gray-500">{item.points} pts each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg">
                    <p className="text-sm opacity-90">Total Points This Month</p>
                    <p className="text-3xl">{rewardPoints.thisMonth}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>All Clients</CardTitle>
                <CardDescription>Manage your client portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentClients.map((client, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{client.name}</p>
                        <p className="text-sm text-gray-600">{client.employees} employees · {client.status}</p>
                      </div>
                      <div className="text-right mr-4">
                        <p className="font-semibold">${client.revenue}/month</p>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
                  ))}
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    <Users className="h-4 w-4 mr-2" />
                    Add New Client
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Partner Resources</CardTitle>
                <CardDescription>Marketing materials and documentation - Access based on your tier level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <partnerLevel.icon className="h-8 w-8 text-yellow-600" />
                    <div>
                      <p className="font-semibold">Your Current Tier: {partnerLevel.current}</p>
                      <p className="text-sm text-gray-600">Unlock more resources by upgrading to {partnerLevel.nextLevel}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Free Resources - Available to All */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 border-2 border-green-200 rounded-lg bg-gradient-to-br from-green-50 to-blue-50 hover:shadow-lg transition-shadow cursor-pointer relative"
                  >
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-600 text-white">Unlocked</Badge>
                    </div>
                    <FileText className="h-8 w-8 text-green-600 mb-3" />
                    <h3 className="font-semibold mb-2">Basic Sales Materials</h3>
                    <p className="text-sm text-gray-600 mb-3">Product brochures and basic presentations</p>
                    <div className="flex items-center text-sm text-green-600">
                      <span>✓ Available for all partners</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 border-2 border-green-200 rounded-lg bg-gradient-to-br from-green-50 to-blue-50 hover:shadow-lg transition-shadow cursor-pointer relative"
                  >
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-600 text-white">Unlocked</Badge>
                    </div>
                    <FileText className="h-8 w-8 text-green-600 mb-3" />
                    <h3 className="font-semibold mb-2">Getting Started Guide</h3>
                    <p className="text-sm text-gray-600 mb-3">Step-by-step onboarding documentation</p>
                    <div className="flex items-center text-sm text-green-600">
                      <span>✓ Available for all partners</span>
                    </div>
                  </motion.div>

                  {/* Silver Tier Resources */}
                  <motion.div
                    whileHover={{ scale: partnerLevel.current === 'Bronze' ? 1 : 1.02 }}
                    className={`p-6 border-2 rounded-lg hover:shadow-lg transition-shadow relative ${
                      partnerLevel.current === 'Bronze'
                        ? 'border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed'
                        : 'border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 cursor-pointer'
                    }`}
                  >
                    <div className="absolute top-3 right-3">
                      {partnerLevel.current === 'Bronze' ? (
                        <Badge className="bg-gray-500 text-white">🔒 Locked</Badge>
                      ) : (
                        <Badge className="bg-green-600 text-white">Unlocked</Badge>
                      )}
                    </div>
                    <FileText className={`h-8 w-8 mb-3 ${partnerLevel.current === 'Bronze' ? 'text-gray-400' : 'text-blue-600'}`} />
                    <h3 className="font-semibold mb-2">Advanced Marketing Kit</h3>
                    <p className="text-sm text-gray-600 mb-3">Premium presentations, case studies, and email templates</p>
                    <div className="flex items-center text-sm">
                      {partnerLevel.current === 'Bronze' ? (
                        <span className="text-gray-500">🔒 Requires Silver tier or higher</span>
                      ) : (
                        <span className="text-green-600">✓ Silver tier resource</span>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: partnerLevel.current === 'Bronze' ? 1 : 1.02 }}
                    className={`p-6 border-2 rounded-lg hover:shadow-lg transition-shadow relative ${
                      partnerLevel.current === 'Bronze'
                        ? 'border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed'
                        : 'border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 cursor-pointer'
                    }`}
                  >
                    <div className="absolute top-3 right-3">
                      {partnerLevel.current === 'Bronze' ? (
                        <Badge className="bg-gray-500 text-white">🔒 Locked</Badge>
                      ) : (
                        <Badge className="bg-green-600 text-white">Unlocked</Badge>
                      )}
                    </div>
                    <FileText className={`h-8 w-8 mb-3 ${partnerLevel.current === 'Bronze' ? 'text-gray-400' : 'text-purple-600'}`} />
                    <h3 className="font-semibold mb-2">API Documentation</h3>
                    <p className="text-sm text-gray-600 mb-3">Technical integration guides and API reference</p>
                    <div className="flex items-center text-sm">
                      {partnerLevel.current === 'Bronze' ? (
                        <span className="text-gray-500">🔒 Requires Silver tier or higher</span>
                      ) : (
                        <span className="text-green-600">✓ Silver tier resource</span>
                      )}
                    </div>
                  </motion.div>

                  {/* Gold Tier Resources */}
                  <motion.div
                    whileHover={{ scale: ['Gold', 'Platinum', 'Diamond'].includes(partnerLevel.current) ? 1.02 : 1 }}
                    className={`p-6 border-2 rounded-lg hover:shadow-lg transition-shadow relative ${
                      ['Gold', 'Platinum', 'Diamond'].includes(partnerLevel.current)
                        ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 cursor-pointer'
                        : 'border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="absolute top-3 right-3">
                      {['Gold', 'Platinum', 'Diamond'].includes(partnerLevel.current) ? (
                        <Badge className="bg-green-600 text-white">Unlocked</Badge>
                      ) : (
                        <Badge className="bg-gray-500 text-white">🔒 Locked</Badge>
                      )}
                    </div>
                    <FileText className={`h-8 w-8 mb-3 ${['Gold', 'Platinum', 'Diamond'].includes(partnerLevel.current) ? 'text-yellow-600' : 'text-gray-400'}`} />
                    <h3 className="font-semibold mb-2">White-Label Resources</h3>
                    <p className="text-sm text-gray-600 mb-3">Customizable branded materials and templates</p>
                    <div className="flex items-center text-sm">
                      {['Gold', 'Platinum', 'Diamond'].includes(partnerLevel.current) ? (
                        <span className="text-green-600">✓ Gold tier resource</span>
                      ) : (
                        <span className="text-gray-500">🔒 Requires Gold tier or higher</span>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: ['Gold', 'Platinum', 'Diamond'].includes(partnerLevel.current) ? 1.02 : 1 }}
                    className={`p-6 border-2 rounded-lg hover:shadow-lg transition-shadow relative ${
                      ['Gold', 'Platinum', 'Diamond'].includes(partnerLevel.current)
                        ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 cursor-pointer'
                        : 'border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="absolute top-3 right-3">
                      {['Gold', 'Platinum', 'Diamond'].includes(partnerLevel.current) ? (
                        <Badge className="bg-green-600 text-white">Unlocked</Badge>
                      ) : (
                        <Badge className="bg-gray-500 text-white">🔒 Locked</Badge>
                      )}
                    </div>
                    <FileText className={`h-8 w-8 mb-3 ${['Gold', 'Platinum', 'Diamond'].includes(partnerLevel.current) ? 'text-orange-600' : 'text-gray-400'}`} />
                    <h3 className="font-semibold mb-2">Training Videos Library</h3>
                    <p className="text-sm text-gray-600 mb-3">Comprehensive product demos and certification courses</p>
                    <div className="flex items-center text-sm">
                      {['Gold', 'Platinum', 'Diamond'].includes(partnerLevel.current) ? (
                        <span className="text-green-600">✓ Gold tier resource</span>
                      ) : (
                        <span className="text-gray-500">🔒 Requires Gold tier or higher</span>
                      )}
                    </div>
                  </motion.div>

                  {/* Platinum Tier Resources */}
                  <motion.div
                    whileHover={{ scale: ['Platinum', 'Diamond'].includes(partnerLevel.current) ? 1.02 : 1 }}
                    className={`p-6 border-2 rounded-lg hover:shadow-lg transition-shadow relative ${
                      ['Platinum', 'Diamond'].includes(partnerLevel.current)
                        ? 'border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 cursor-pointer'
                        : 'border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="absolute top-3 right-3">
                      {['Platinum', 'Diamond'].includes(partnerLevel.current) ? (
                        <Badge className="bg-green-600 text-white">Unlocked</Badge>
                      ) : (
                        <Badge className="bg-gray-500 text-white">🔒 Locked</Badge>
                      )}
                    </div>
                    <FileText className={`h-8 w-8 mb-3 ${['Platinum', 'Diamond'].includes(partnerLevel.current) ? 'text-cyan-600' : 'text-gray-400'}`} />
                    <h3 className="font-semibold mb-2">Enterprise Sales Playbook</h3>
                    <p className="text-sm text-gray-600 mb-3">Advanced strategies for enterprise deals and negotiations</p>
                    <div className="flex items-center text-sm">
                      {['Platinum', 'Diamond'].includes(partnerLevel.current) ? (
                        <span className="text-green-600">✓ Platinum tier resource</span>
                      ) : (
                        <span className="text-gray-500">🔒 Requires Platinum tier or higher</span>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: ['Platinum', 'Diamond'].includes(partnerLevel.current) ? 1.02 : 1 }}
                    className={`p-6 border-2 rounded-lg hover:shadow-lg transition-shadow relative ${
                      ['Platinum', 'Diamond'].includes(partnerLevel.current)
                        ? 'border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 cursor-pointer'
                        : 'border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="absolute top-3 right-3">
                      {['Platinum', 'Diamond'].includes(partnerLevel.current) ? (
                        <Badge className="bg-green-600 text-white">Unlocked</Badge>
                      ) : (
                        <Badge className="bg-gray-500 text-white">🔒 Locked</Badge>
                      )}
                    </div>
                    <FileText className={`h-8 w-8 mb-3 ${['Platinum', 'Diamond'].includes(partnerLevel.current) ? 'text-purple-600' : 'text-gray-400'}`} />
                    <h3 className="font-semibold mb-2">Co-Marketing Materials</h3>
                    <p className="text-sm text-gray-600 mb-3">Joint marketing campaigns and MDF fund access</p>
                    <div className="flex items-center text-sm">
                      {['Platinum', 'Diamond'].includes(partnerLevel.current) ? (
                        <span className="text-green-600">✓ Platinum tier resource</span>
                      ) : (
                        <span className="text-gray-500">🔒 Requires Platinum tier or higher</span>
                      )}
                    </div>
                  </motion.div>

                  {/* Diamond Tier Resources */}
                  <motion.div
                    whileHover={{ scale: partnerLevel.current === 'Diamond' ? 1.02 : 1 }}
                    className={`p-6 border-2 rounded-lg hover:shadow-lg transition-shadow relative ${
                      partnerLevel.current === 'Diamond'
                        ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 cursor-pointer'
                        : 'border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="absolute top-3 right-3">
                      {partnerLevel.current === 'Diamond' ? (
                        <Badge className="bg-green-600 text-white">Unlocked</Badge>
                      ) : (
                        <Badge className="bg-gray-500 text-white">🔒 Locked</Badge>
                      )}
                    </div>
                    <FileText className={`h-8 w-8 mb-3 ${partnerLevel.current === 'Diamond' ? 'text-purple-600' : 'text-gray-400'}`} />
                    <h3 className="font-semibold mb-2">Executive Advisory Board Access</h3>
                    <p className="text-sm text-gray-600 mb-3">Direct access to leadership team and product roadmap influence</p>
                    <div className="flex items-center text-sm">
                      {partnerLevel.current === 'Diamond' ? (
                        <span className="text-green-600">✓ Diamond tier exclusive</span>
                      ) : (
                        <span className="text-gray-500">🔒 Requires Diamond tier</span>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: partnerLevel.current === 'Diamond' ? 1.02 : 1 }}
                    className={`p-6 border-2 rounded-lg hover:shadow-lg transition-shadow relative ${
                      partnerLevel.current === 'Diamond'
                        ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 cursor-pointer'
                        : 'border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="absolute top-3 right-3">
                      {partnerLevel.current === 'Diamond' ? (
                        <Badge className="bg-green-600 text-white">Unlocked</Badge>
                      ) : (
                        <Badge className="bg-gray-500 text-white">🔒 Locked</Badge>
                      )}
                    </div>
                    <FileText className={`h-8 w-8 mb-3 ${partnerLevel.current === 'Diamond' ? 'text-pink-600' : 'text-gray-400'}`} />
                    <h3 className="font-semibold mb-2">Custom Development Support</h3>
                    <p className="text-sm text-gray-600 mb-3">Dedicated engineering team for custom integrations</p>
                    <div className="flex items-center text-sm">
                      {partnerLevel.current === 'Diamond' ? (
                        <span className="text-green-600">✓ Diamond tier exclusive</span>
                      ) : (
                        <span className="text-gray-500">🔒 Requires Diamond tier</span>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Upgrade CTA */}
                {partnerLevel.current !== 'Diamond' && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white text-center">
                    <h3 className="text-xl mb-2">Want to unlock more resources?</h3>
                    <p className="mb-4 opacity-90">Upgrade to {partnerLevel.nextLevel} tier to access premium materials and exclusive benefits</p>
                    <Button className="bg-white text-blue-600 hover:bg-gray-100">
                      View Upgrade Options
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your partner account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Profile Information</h3>
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Payment Details</h3>
                    <Button variant="outline">Update Payment Info</Button>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Notification Preferences</h3>
                    <Button variant="outline">Manage Notifications</Button>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Security</h3>
                    <Button variant="outline">Change Password</Button>
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