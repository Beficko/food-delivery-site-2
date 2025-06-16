import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import Dashboard from "@/components/courier/Dashboard";
import GeolocationTracker from "@/components/courier/GeolocationTracker";
import ChatInterface from "@/components/courier/ChatInterface";
import RatingReviews from "@/components/courier/RatingReviews";
import ScheduleManager from "@/components/courier/ScheduleManager";
import EarningsCalculator from "@/components/courier/EarningsCalculator";

export default function Index() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Icon name="Truck" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  CourierApp
                </h1>
                <p className="text-sm text-muted-foreground">
                  Личный кабинет курьера
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">Алексей Петров</p>
                <p className="text-xs text-muted-foreground">
                  Курьер • ID: 1247
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Icon name="User" className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6">
            <TabsTrigger
              value="dashboard"
              className="flex items-center space-x-2"
            >
              <Icon name="LayoutDashboard" className="h-4 w-4" />
              <span className="hidden sm:inline">Дашборд</span>
            </TabsTrigger>
            <TabsTrigger
              value="location"
              className="flex items-center space-x-2"
            >
              <Icon name="MapPin" className="h-4 w-4" />
              <span className="hidden sm:inline">Карта</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <Icon name="MessageSquare" className="h-4 w-4" />
              <span className="hidden sm:inline">Чаты</span>
            </TabsTrigger>
            <TabsTrigger value="rating" className="flex items-center space-x-2">
              <Icon name="Star" className="h-4 w-4" />
              <span className="hidden sm:inline">Рейтинг</span>
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="flex items-center space-x-2"
            >
              <Icon name="Calendar" className="h-4 w-4" />
              <span className="hidden sm:inline">График</span>
            </TabsTrigger>
            <TabsTrigger
              value="earnings"
              className="flex items-center space-x-2"
            >
              <Icon name="DollarSign" className="h-4 w-4" />
              <span className="hidden sm:inline">Доходы</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="location">
            <GeolocationTracker />
          </TabsContent>

          <TabsContent value="chat">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="rating">
            <RatingReviews />
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleManager />
          </TabsContent>

          <TabsContent value="earnings">
            <EarningsCalculator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
