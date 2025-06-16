import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import Icon from "@/components/ui/icon";
import { useCourierData } from "@/hooks/useCourierData";

const weekDays = [
  { key: "monday", label: "Понедельник", short: "ПН" },
  { key: "tuesday", label: "Вторник", short: "ВТ" },
  { key: "wednesday", label: "Среда", short: "СР" },
  { key: "thursday", label: "Четверг", short: "ЧТ" },
  { key: "friday", label: "Пятница", short: "ПТ" },
  { key: "saturday", label: "Суббота", short: "СБ" },
  { key: "sunday", label: "Воскресенье", short: "ВС" },
];

const shiftTypes = [
  { value: "morning", label: "Утренняя (08:00-14:00)", hours: 6, rate: 250 },
  { value: "afternoon", label: "Дневная (14:00-20:00)", hours: 6, rate: 280 },
  { value: "evening", label: "Вечерняя (20:00-02:00)", hours: 6, rate: 320 },
  { value: "night", label: "Ночная (02:00-08:00)", hours: 6, rate: 380 },
];

export default function ScheduleManager() {
  const { metrics } = useCourierData();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weeklySchedule, setWeeklySchedule] = useState<Record<string, any>>({
    monday: { isActive: true, shift: "morning", hours: 6 },
    tuesday: { isActive: true, shift: "afternoon", hours: 6 },
    wednesday: { isActive: false, shift: "", hours: 0 },
    thursday: { isActive: true, shift: "morning", hours: 6 },
    friday: { isActive: true, shift: "evening", hours: 6 },
    saturday: { isActive: true, shift: "evening", hours: 6 },
    sunday: { isActive: false, shift: "", hours: 0 },
  });

  const toggleDayAvailability = (day: string) => {
    setWeeklySchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], isActive: !prev[day].isActive },
    }));
  };

  const updateShift = (day: string, shift: string) => {
    const shiftInfo = shiftTypes.find((s) => s.value === shift);
    setWeeklySchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], shift, hours: shiftInfo?.hours || 0 },
    }));
  };

  const totalWeeklyHours = Object.values(weeklySchedule).reduce(
    (sum: number, day: any) => sum + (day.isActive ? day.hours : 0),
    0,
  );
  const estimatedWeeklyEarnings = Object.entries(weeklySchedule).reduce(
    (sum: number, [dayKey, day]: [string, any]) => {
      if (!day.isActive) return sum;
      const shiftInfo = shiftTypes.find((s) => s.value === day.shift);
      return sum + (shiftInfo ? shiftInfo.rate * day.hours : 0);
    },
    0,
  );

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {totalWeeklyHours}ч
                </p>
                <p className="text-xs text-muted-foreground">Часов в неделю</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {estimatedWeeklyEarnings.toLocaleString()}₽
                </p>
                <p className="text-xs text-muted-foreground">Прогноз дохода</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {
                    Object.values(weeklySchedule).filter(
                      (day: any) => day.isActive,
                    ).length
                  }
                </p>
                <p className="text-xs text-muted-foreground">Рабочих дней</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Calendar" className="h-5 w-5 text-blue-600" />
              <span>Недельный график</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weekDays.map((day) => {
              const daySchedule = weeklySchedule[day.key];
              const shiftInfo = shiftTypes.find(
                (s) => s.value === daySchedule.shift,
              );

              return (
                <div
                  key={day.key}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 text-center">
                      <div className="font-medium text-sm">{day.short}</div>
                      <div className="text-xs text-muted-foreground">
                        {day.label.slice(0, 3)}
                      </div>
                    </div>
                    <Switch
                      checked={daySchedule.isActive}
                      onCheckedChange={() => toggleDayAvailability(day.key)}
                    />
                  </div>

                  {daySchedule.isActive ? (
                    <div className="flex items-center space-x-2 flex-1 ml-4">
                      <Select
                        value={daySchedule.shift}
                        onValueChange={(value) => updateShift(day.key, value)}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Выберите смену" />
                        </SelectTrigger>
                        <SelectContent>
                          {shiftTypes.map((shift) => (
                            <SelectItem key={shift.value} value={shift.value}>
                              {shift.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {shiftInfo && (
                        <Badge variant="secondary">
                          {shiftInfo.rate * shiftInfo.hours}₽
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <div className="flex-1 ml-4 flex items-center">
                      <Badge variant="outline">Выходной</Badge>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="CalendarDays" className="h-5 w-5 text-green-600" />
              <span>Календарь смен</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />

            <div className="mt-4 space-y-2">
              <h4 className="font-medium">Легенда:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Утренняя смена</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>Дневная смена</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>Вечерняя смена</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span>Ночная смена</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shift Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Clock" className="h-5 w-5 text-orange-600" />
            <span>Шаблоны смен</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {shiftTypes.map((shift) => (
              <div
                key={shift.value}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{shift.label.split(" ")[0]}</h4>
                  <Badge variant="outline">{shift.hours}ч</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {shift.label.split(" ")[1]?.replace("(", "").replace(")", "")}
                </p>
                <div className="text-lg font-bold text-green-600">
                  {shift.rate * shift.hours}₽/смена
                </div>
                <div className="text-sm text-muted-foreground">
                  {shift.rate}₽/час
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Icon name="Copy" className="h-4 w-4 mr-2" />
              Копировать на следующую неделю
            </Button>
            <Button variant="outline">
              <Icon name="RotateCcw" className="h-4 w-4 mr-2" />
              Сбросить график
            </Button>
            <Button variant="outline">
              <Icon name="Download" className="h-4 w-4 mr-2" />
              Экспорт расписания
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
