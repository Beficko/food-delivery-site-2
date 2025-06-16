import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeroSectionProps {
  onApplyClick: () => void;
}

export default function HeroSection({ onApplyClick }: HeroSectionProps) {
  return (
    <section className="relative py-20 bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Стань курьером
                <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  мечты
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Зарабатывай до 80 000 ₽ в месяц, работая по гибкому графику.
                Присоединяйся к команде лучшего сервиса доставки еды!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={onApplyClick}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
              >
                <Icon name="Rocket" className="mr-2 h-5 w-5" />
                Подать заявку
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3"
              >
                <Icon name="Play" className="mr-2 h-5 w-5" />
                Смотреть видео
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">5000+</div>
                <div className="text-sm text-gray-600">Активных курьеров</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4.9</div>
                <div className="text-sm text-gray-600">Рейтинг в App Store</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Поддержка</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
              <Icon name="Bike" className="h-32 w-32 text-white" />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
              <Icon name="Star" className="h-12 w-12 text-yellow-800" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
