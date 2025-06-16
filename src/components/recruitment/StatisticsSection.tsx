import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const stats = [
  {
    icon: "Users",
    value: "5000+",
    label: "Активных курьеров",
    color: "text-blue-500",
  },
  {
    icon: "MapPin",
    value: "50+",
    label: "Городов России",
    color: "text-green-500",
  },
  {
    icon: "Package",
    value: "1M+",
    label: "Доставок в месяц",
    color: "text-purple-500",
  },
  {
    icon: "Star",
    value: "4.9",
    label: "Рейтинг сервиса",
    color: "text-yellow-500",
  },
];

export default function StatisticsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg text-center">
              <CardContent className="py-8">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${stat.color.replace("text-", "bg-").replace("-500", "-100")}`}
                >
                  <Icon
                    name={stat.icon as any}
                    className={`h-8 w-8 ${stat.color}`}
                  />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
