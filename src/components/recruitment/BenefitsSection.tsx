import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const benefits = [
  {
    icon: "DollarSign",
    title: "Высокий доход",
    description: "До 80 000 ₽ в месяц + чаевые и бонусы за выполнение планов",
  },
  {
    icon: "Clock",
    title: "Гибкий график",
    description: "Работай когда удобно - выбирай смены по своему расписанию",
  },
  {
    icon: "Smartphone",
    title: "Удобное приложение",
    description: "Интуитивное приложение с навигацией и поддержкой 24/7",
  },
  {
    icon: "TrendingUp",
    title: "Быстрый старт",
    description: "Начни зарабатывать уже через 2 дня после подачи заявки",
  },
  {
    icon: "Gift",
    title: "Бонусы и призы",
    description: "Участвуй в конкурсах, получай призы и дополнительные выплаты",
  },
  {
    icon: "Users",
    title: "Дружная команда",
    description: "Поддержка коллег, корпоративные мероприятия и обучение",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Почему выбирают нас?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Мы создали лучшие условия для курьеров, чтобы ты мог зарабатывать
            больше и работать с удовольствием
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon
                    name={benefit.icon as any}
                    className="h-8 w-8 text-white"
                  />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
