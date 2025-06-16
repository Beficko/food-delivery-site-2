import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useCourierData } from "@/hooks/useCourierData";

export default function GeolocationTracker() {
  const { courier, orders } = useCourierData();

  const activeOrder = orders.find((order) =>
    ["accepted", "pickup", "delivery"].includes(order.status),
  );

  return (
    <div className="space-y-6">
      {/* Current Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="MapPin" className="h-5 w-5 text-blue-600" />
            <span>Текущее местоположение</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-semibold">
                  {courier.currentLocation.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  {courier.currentLocation.lat.toFixed(4)},{" "}
                  {courier.currentLocation.lng.toFixed(4)}
                </p>
              </div>
              <Badge variant={courier.isOnline ? "default" : "secondary"}>
                {courier.isOnline ? "Отслеживается" : "Отключено"}
              </Badge>
            </div>

            {/* Mock Map Placeholder */}
            <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center mb-4">
              <div className="text-center">
                <Icon
                  name="Map"
                  className="h-12 w-12 mx-auto mb-2 text-gray-400"
                />
                <p className="text-gray-600">Карта местоположения</p>
                <p className="text-sm text-gray-500">
                  Интеграция с Яндекс.Картами
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                <Icon name="Navigation" className="h-4 w-4 mr-2" />
                Обновить местоположение
              </Button>
              <Button variant="outline" className="flex-1">
                <Icon name="Share" className="h-4 w-4 mr-2" />
                Поделиться
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Route */}
      {activeOrder && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Route" className="h-5 w-5 text-green-600" />
              <span>Активный маршрут</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Заказ #{activeOrder.id}</h3>
                <Badge
                  variant={
                    activeOrder.status === "accepted"
                      ? "secondary"
                      : activeOrder.status === "pickup"
                        ? "default"
                        : "outline"
                  }
                >
                  {activeOrder.status === "accepted"
                    ? "К ресторану"
                    : activeOrder.status === "pickup"
                      ? "Забираю заказ"
                      : "Доставляю"}
                </Badge>
              </div>

              <div className="space-y-3">
                {/* Pickup Point */}
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <Icon name="MapPin" className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-green-800">Точка забора</p>
                    <p className="text-sm text-green-700">
                      {activeOrder.pickupAddress}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-green-600">
                      <span>📍 1.2 км</span>
                      <span>⏱️ 5 мин</span>
                    </div>
                  </div>
                  {activeOrder.status === "accepted" && (
                    <Button size="sm" variant="outline">
                      <Icon name="Navigation" className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Route Line */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-green-400 to-blue-400"></div>
                </div>

                {/* Delivery Point */}
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Icon name="Home" className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-blue-800">Точка доставки</p>
                    <p className="text-sm text-blue-700">
                      {activeOrder.deliveryAddress}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-blue-600">
                      <span>📍 {activeOrder.distance} км</span>
                      <span>⏱️ {activeOrder.estimatedTime} мин</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Icon name="Navigation" className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Route Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Icon
                    name="Clock"
                    className="h-5 w-5 mx-auto mb-1 text-gray-600"
                  />
                  <p className="text-sm font-medium">
                    {activeOrder.estimatedTime} мин
                  </p>
                  <p className="text-xs text-muted-foreground">Время</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Icon
                    name="MapPin"
                    className="h-5 w-5 mx-auto mb-1 text-gray-600"
                  />
                  <p className="text-sm font-medium">
                    {activeOrder.distance} км
                  </p>
                  <p className="text-xs text-muted-foreground">Расстояние</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Icon
                    name="DollarSign"
                    className="h-5 w-5 mx-auto mb-1 text-gray-600"
                  />
                  <p className="text-sm font-medium">
                    {activeOrder.deliveryFee}₽
                  </p>
                  <p className="text-xs text-muted-foreground">Доход</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* GPS Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Satellite" className="h-5 w-5 text-purple-600" />
            <span>GPS статистика</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Точность GPS:
                </span>
                <span className="text-sm font-medium text-green-600">
                  Высокая (±3м)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Спутники:</span>
                <span className="text-sm font-medium">12/15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Последнее обновление:
                </span>
                <span className="text-sm font-medium">5 сек назад</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Скорость:</span>
                <span className="text-sm font-medium">32 км/ч</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Направление:
                </span>
                <span className="text-sm font-medium">СВ (45°)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Пройдено сегодня:
                </span>
                <span className="text-sm font-medium">47.3 км</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
