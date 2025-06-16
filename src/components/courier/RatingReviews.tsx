import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import { useCourierData } from "@/hooks/useCourierData";

export default function RatingReviews() {
  const { courier, reviews, metrics } = useCourierData();

  const ratingDistribution = [
    { stars: 5, count: 156, percentage: 78 },
    { stars: 4, count: 32, percentage: 16 },
    { stars: 3, count: 8, percentage: 4 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 1, percentage: 0 },
  ];

  const achievements = [
    {
      title: "Быстрая доставка",
      icon: "Zap",
      count: 89,
      color: "text-yellow-600",
    },
    { title: "Вежливость", icon: "Heart", count: 67, color: "text-pink-600" },
    {
      title: "Аккуратность",
      icon: "Shield",
      count: 45,
      color: "text-blue-600",
    },
    { title: "Качество", icon: "Star", count: 78, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Star" className="h-5 w-5 text-yellow-500" />
              <span>Общий рейтинг</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-yellow-600 mb-2">
                {courier.rating}
              </div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    className={`h-6 w-6 ${
                      star <= Math.floor(courier.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Основано на {reviews.length} отзывах
              </p>
            </div>

            <div className="space-y-3">
              {ratingDistribution.map((rating) => (
                <div key={rating.stars} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm">{rating.stars}</span>
                    <Icon name="Star" className="h-3 w-3 text-yellow-400" />
                  </div>
                  <Progress value={rating.percentage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-8">
                    {rating.count}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="TrendingUp" className="h-5 w-5 text-green-600" />
              <span>Показатели качества</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Принятие заказов</span>
                <div className="flex items-center space-x-2">
                  <Progress value={metrics.acceptanceRate} className="w-20" />
                  <span className="text-sm font-medium">
                    {metrics.acceptanceRate}%
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Доставка вовремя</span>
                <div className="flex items-center space-x-2">
                  <Progress
                    value={metrics.onTimeDeliveryRate}
                    className="w-20"
                  />
                  <span className="text-sm font-medium">
                    {metrics.onTimeDeliveryRate}%
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Удовлетворенность клиентов</span>
                <div className="flex items-center space-x-2">
                  <Progress
                    value={metrics.customerSatisfaction * 20}
                    className="w-20"
                  />
                  <span className="text-sm font-medium">
                    {metrics.customerSatisfaction}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {metrics.deliveriesThisWeek}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Доставок за неделю
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {metrics.averageDeliveryTime}м
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Среднее время
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Award" className="h-5 w-5 text-purple-600" />
            <span>Достижения</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className="text-center p-4 bg-gray-50 rounded-lg"
              >
                <Icon
                  name={achievement.icon as any}
                  className={`h-8 w-8 mx-auto mb-2 ${achievement.color}`}
                />
                <div className="text-lg font-bold">{achievement.count}</div>
                <div className="text-sm text-muted-foreground">
                  {achievement.title}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="MessageCircle" className="h-5 w-5 text-blue-600" />
            <span>Недавние отзывы</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium">{review.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        Заказ #{review.orderId}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                          key={star}
                          name="Star"
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium">
                        {review.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm mb-3">{review.comment}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {review.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
