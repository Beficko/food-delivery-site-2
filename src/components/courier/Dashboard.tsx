import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import { useCourierData } from "@/hooks/useCourierData";

export default function Dashboard() {
  const {
    courier,
    orders,
    metrics,
    toggleOnlineStatus,
    acceptOrder,
    updateOrderStatus,
  } = useCourierData();

  const activeOrders = orders.filter((order) =>
    ["accepted", "pickup", "delivery"].includes(order.status),
  );
  const pendingOrders = orders.filter((order) => order.status === "pending");

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">
                Добро пожаловать, {courier.name}!
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Рейтинг: {courier.rating} ⭐ • {courier.totalDeliveries}{" "}
                доставок
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={courier.isOnline ? "default" : "secondary"}>
                {courier.isOnline ? "Онлайн" : "Оффлайн"}
              </Badge>
              <Switch
                checked={courier.isOnline}
                onCheckedChange={toggleOnlineStatus}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {metrics.totalEarningsThisWeek.toLocaleString()}₽
                </p>
                <p className="text-xs text-muted-foreground">На этой неделе</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Icon name="Package" className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {metrics.deliveriesThisWeek}
                </p>
                <p className="text-xs text-muted-foreground">Доставок</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  {metrics.averageDeliveryTime}м
                </p>
                <p className="text-xs text-muted-foreground">Среднее время</p>
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
                  {metrics.acceptanceRate}%
                </p>
                <p className="text-xs text-muted-foreground">
                  Принятие заказов
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Active Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Navigation" className="h-5 w-5" />
              <span>Активные заказы ({activeOrders.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.totalAmount}₽ • {order.distance}км
                    </p>
                  </div>
                  <Badge
                    variant={
                      order.status === "accepted"
                        ? "default"
                        : order.status === "pickup"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {order.status === "accepted"
                      ? "Принят"
                      : order.status === "pickup"
                        ? "К ресторану"
                        : "Доставка"}
                  </Badge>
                </div>

                <div className="text-sm space-y-1">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" className="h-4 w-4 text-green-600" />
                    <span>{order.pickupAddress}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Home" className="h-4 w-4 text-blue-600" />
                    <span>{order.deliveryAddress}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {order.status === "accepted" && (
                    <Button
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, "pickup")}
                      className="flex-1"
                    >
                      <Icon name="Navigation" className="h-4 w-4 mr-1" />К
                      ресторану
                    </Button>
                  )}
                  {order.status === "pickup" && (
                    <Button
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, "delivery")}
                      className="flex-1"
                    >
                      <Icon name="Package" className="h-4 w-4 mr-1" />
                      Забрал заказ
                    </Button>
                  )}
                  {order.status === "delivery" && (
                    <Button
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, "completed")}
                      className="flex-1"
                    >
                      <Icon name="CheckCircle" className="h-4 w-4 mr-1" />
                      Доставлено
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Icon name="Phone" className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {activeOrders.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Icon
                  name="Package"
                  className="h-12 w-12 mx-auto mb-2 opacity-50"
                />
                <p>Нет активных заказов</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Bell" className="h-5 w-5" />
              <span>Новые заказы ({pendingOrders.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingOrders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 space-y-3 bg-gradient-to-r from-blue-50 to-cyan-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.totalAmount}₽ • {order.distance}км • ~
                      {order.estimatedTime}мин
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 border-yellow-300"
                  >
                    Новый
                  </Badge>
                </div>

                <div className="text-sm space-y-1">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" className="h-4 w-4 text-green-600" />
                    <span>{order.pickupAddress}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Home" className="h-4 w-4 text-blue-600" />
                    <span>{order.deliveryAddress}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => acceptOrder(order.id)}
                    className="flex-1"
                  >
                    <Icon name="Check" className="h-4 w-4 mr-1" />
                    Принять ({order.deliveryFee}₽)
                  </Button>
                  <Button size="sm" variant="outline">
                    <Icon name="X" className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {pendingOrders.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Icon
                  name="Bell"
                  className="h-12 w-12 mx-auto mb-2 opacity-50"
                />
                <p>Нет новых заказов</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
