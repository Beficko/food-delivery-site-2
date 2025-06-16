import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import HeroSection from "@/components/recruitment/HeroSection";
import BenefitsSection from "@/components/recruitment/BenefitsSection";
import RequirementsSection from "@/components/recruitment/RequirementsSection";

import StatisticsSection from "@/components/recruitment/StatisticsSection";

export default function Index() {
  const handleApplyClick = () => {
    window.open(
      "https://reg.eda.yandex.ru/?advertisement_campaign=forms_for_agents&user_invite_code=2e3cca1f52c54a71aa714bc77a3d0948&utm_content=blank",
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Icon name="Truck" className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                FastFood Delivery
              </h1>
            </div>
            <Button
              onClick={handleApplyClick}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Подать заявку
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HeroSection onApplyClick={handleApplyClick} />
        <StatisticsSection />
        <BenefitsSection />
        <RequirementsSection />

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-white mb-4">
              Готов начать зарабатывать?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Присоединяйся к команде лучших курьеров города!
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={handleApplyClick}
              className="bg-white text-orange-500 hover:bg-orange-50"
            >
              <Icon name="UserPlus" className="mr-2 h-5 w-5" />
              Подать заявку сейчас
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                FastFood Delivery (Партнер Яндекс Еды)
              </h3>
              <p className="text-gray-400">
                Лидер рынка доставки еды с лучшими условиями для курьеров
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <div className="space-y-2 text-gray-400">
                <p>📞Telegram +7 (999) 771 68 98</p>
                <p>📧 hr@fastfoodpro.ru</p>
                <p>📍 Санкт-Петербург</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Режим работы</h3>
              <div className="space-y-2 text-gray-400">
                <p>Понедельник-Воскресенье</p>
                <p>24/7 - работай когда удобно!</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
