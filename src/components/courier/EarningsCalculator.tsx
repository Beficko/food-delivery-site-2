import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { useCourierData } from "@/hooks/useCourierData";

export default function EarningsCalculator() {
  const { earnings, metrics } = useCourierData();
  const [calculatorData, setCalculatorData] = useState({
    hoursPerDay: 8,
    daysPerWeek: 5,
    averageOrdersPerHour: 3,
    averageOrderValue: 450,
    commissionRate: 15,
    fuelCostPerDay: 300,
    vehicleType: "scooter",
  });

  const vehicleTypes = [
    { value: "foot", label: "Пешком", costPerDay: 0, ordersPerHour: 2 },
    { value: "bike", label: "Велосипед", costPerDay: 50, ordersPerHour: 3 },
    { value: "scooter", label: "Скутер", costPerDay: 300, ordersPerHour: 4 },
    { value: "car", label: "Автомобиль", costPerDay: 500, ordersPerHour: 5 },
  ];

  const calculateEarnings = () => {
    const dailyOrders =
      calculatorData.hoursPerDay * calculatorData.averageOrdersPerHour;
    const grossDaily =
      dailyOrders *
      ((calculatorData.averageOrderValue * calculatorData.commissionRate) /
        100);
    const netDaily = grossDaily - calculatorData.fuelCostPerDay;
    const weeklyNet = netDaily * calculatorData.daysPerWeek;
    const monthlyNet = weeklyNet * 4.33;

    return {
      dailyOrders,
      grossDaily,
      netDaily,
      weeklyNet,
      monthlyNet,
      yearlyNet: monthlyNet * 12,
    };
  };

  const projectedEarnings = calculateEarnings();

  const expenseCategories = [
    { name: "Топливо/Зарядка", amount: 8400, percentage: 42, icon: "Fuel" },
    { name: "Обслуживание ТС", amount: 2800, percentage: 14, icon: "Wrench" },
    { name: "Страховка", amount: 1500, percentage: 8, icon: "Shield" },
    { name: "Штрафы", amount: 500, percentage: 3, icon: "AlertTriangle" },
    { name: "Прочее", amount: 1800, percentage: 9, icon: "MoreHorizontal" },
  ];

  return (
    <div className="space-y-6">
      {/* Current Earnings Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {earnings.daily.toLocaleString()}₽
              </div>
              <div className="text-xs text-muted-foreground">Сегодня</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {earnings.weekly.toLocaleString()}₽
              </div>
              <div className="text-xs text-muted-foreground">Неделя</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {earnings.monthly.toLocaleString()}₽
              </div>
              <div className="text-xs text-muted-foreground">Месяц</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {earnings.averagePerDelivery}₽
              </div>
              <div className="text-xs text-muted-foreground">За заказ</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {earnings.netEarnings.toLocaleString()}₽
              </div>
              <div className="text-xs text-muted-foreground">Чистый доход</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">Калькулятор</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          <TabsTrigger value="expenses">Расходы</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Calculator" className="h-5 w-5 text-blue-600" />
                  <span>Настройки расчета</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Часов в день</label>
                    <Input
                      type="number"
                      value={calculatorData.hoursPerDay}
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          hoursPerDay: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Дней в неделю</label>
                    <Input
                      type="number"
                      value={calculatorData.daysPerWeek}
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          daysPerWeek: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Тип транспорта</label>
                  <Select
                    value={calculatorData.vehicleType}
                    onValueChange={(value) => {
                      const vehicle = vehicleTypes.find(
                        (v) => v.value === value,
                      );
                      setCalculatorData({
                        ...calculatorData,
                        vehicleType: value,
                        fuelCostPerDay: vehicle?.costPerDay || 0,
                        averageOrdersPerHour: vehicle?.ordersPerHour || 3,
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map((vehicle) => (
                        <SelectItem key={vehicle.value} value={vehicle.value}>
                          {vehicle.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Заказов в час</label>
                    <Input
                      type="number"
                      value={calculatorData.averageOrdersPerHour}
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          averageOrdersPerHour: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Средний чек (₽)
                    </label>
                    <Input
                      type="number"
                      value={calculatorData.averageOrderValue}
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          averageOrderValue: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Комиссия (%)</label>
                    <Input
                      type="number"
                      value={calculatorData.commissionRate}
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          commissionRate: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Расходы в день (₽)
                    </label>
                    <Input
                      type="number"
                      value={calculatorData.fuelCostPerDay}
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          fuelCostPerDay: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="TrendingUp" className="h-5 w-5 text-green-600" />
                  <span>Прогноз доходов</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Заказов в день:</span>
                    <span className="font-medium">
                      {projectedEarnings.dailyOrders}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm">Доход за день:</span>
                    <span className="font-medium text-blue-600">
                      {projectedEarnings.netDaily.toLocaleString()}₽
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">Доход за неделю:</span>
                    <span className="font-medium text-green-600">
                      {projectedEarnings.weeklyNet.toLocaleString()}₽
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm">Доход за месяц:</span>
                    <span className="font-medium text-purple-600">
                      {projectedEarnings.monthlyNet.toLocaleString()}₽
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm">Доход за год:</span>
                    <span className="font-medium text-orange-600">
                      {projectedEarnings.yearlyNet.toLocaleString()}₽
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full">
                    <Icon name="Save" className="h-4 w-4 mr-2" />
                    Сохранить настройки
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Динамика доходов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Icon
                      name="BarChart3"
                      className="h-12 w-12 mx-auto mb-2 text-gray-400"
                    />
                    <p className="text-gray-600">График доходов</p>
                    <p className="text-sm text-gray-500">
                      Интеграция с Chart.js
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика по дням недели</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { day: "Понедельник", amount: 2200, orders: 12 },
                    { day: "Вторник", amount: 2450, orders: 14 },
                    { day: "Среда", amount: 2100, orders: 11 },
                    { day: "Четверг", amount: 2650, orders: 15 },
                    { day: "Пятница", amount: 3200, orders: 18 },
                    { day: "Суббота", amount: 3800, orders: 22 },
                    { day: "Воскресенье", amount: 2900, orders: 16 },
                  ].map((stat) => (
                    <div
                      key={stat.day}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{stat.day}</span>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={(stat.amount / 4000) * 100}
                          className="w-20"
                        />
                        <span className="text-sm font-medium w-16">
                          {stat.amount}₽
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {stat.orders}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="PieChart" className="h-5 w-5 text-red-600" />
                  <span>Структура расходов</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {expenseCategories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon
                        name={category.icon as any}
                        className="h-4 w-4 text-gray-600"
                      />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={category.percentage} className="w-16" />
                      <span className="text-sm font-medium w-16">
                        {category.amount}₽
                      </span>
                      <span className="text-xs text-muted-foreground w-8">
                        {category.percentage}%
                      </span>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Общие расходы:</span>
                    <span className="text-lg font-bold text-red-600">
                      {expenseCategories
                        .reduce((sum, cat) => sum + cat.amount, 0)
                        .toLocaleString()}
                      ₽
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Оптимизация расходов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start space-x-2">
                      <Icon
                        name="Lightbulb"
                        className="h-5 w-5 text-green-600 mt-0.5"
                      />
                      <div>
                        <h4 className="font-medium text-green-800">
                          Совет по экономии
                        </h4>
                        <p className="text-sm text-green-700">
                          Заправляйтесь на партнерских АЗС для получения скидки
                          5%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-2">
                      <Icon
                        name="Target"
                        className="h-5 w-5 text-blue-600 mt-0.5"
                      />
                      <div>
                        <h4 className="font-medium text-blue-800">
                          Цель на месяц
                        </h4>
                        <p className="text-sm text-blue-700">
                          Сократить расходы на топливо до 7,500₽ (-900₽)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Plus" className="h-4 w-4 mr-2" />
                      Добавить расход
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Download" className="h-4 w-4 mr-2" />
                      Экспорт отчета
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
