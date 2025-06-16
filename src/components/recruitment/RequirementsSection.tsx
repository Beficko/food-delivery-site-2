import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const requirements = [
  {
    title: "Возраст",
    value: "от 18 лет",
    icon: "User",
  },
  {
    title: "Транспорт",
    value: "Велосипед, самокат или автомобиль",
    icon: "Bike",
  },
  {
    title: "Документы",
    value: "Паспорт и права (для авто)",
    icon: "FileText",
  },
  {
    title: "Телефон",
    value: "Смартфон с интернетом",
    icon: "Smartphone",
  },
];

const skills = [
  "Пунктуальность",
  "Ответственность",
  "Знание города",
  "Дружелюбие",
  "Стрессоустойчивость",
];

export default function RequirementsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Что нужно для работы?
          </h2>
          <p className="text-xl text-gray-600">
            Минимальные требования для старта карьеры курьера
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Icon
                  name="CheckCircle"
                  className="mr-2 h-6 w-6 text-green-500"
                />
                Обязательные требования
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Icon
                        name={req.icon as any}
                        className="h-5 w-5 text-orange-500"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {req.title}
                      </div>
                      <div className="text-sm text-gray-600">{req.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Icon name="Star" className="mr-2 h-6 w-6 text-yellow-500" />
                Желательные качества
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 mb-4">
                  Эти качества помогут тебе быстрее освоиться и зарабатывать
                  больше:
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <Icon name="Info" className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-green-700 font-medium">
                      Новичок? Не проблема! Мы обучим всему необходимому.
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
