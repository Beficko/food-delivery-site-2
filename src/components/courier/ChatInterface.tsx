import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useCourierData } from "@/hooks/useCourierData";

const mockMessages = [
  {
    id: "1",
    senderId: "c1",
    content: "Здравствуйте! Жду заказ",
    timestamp: new Date(Date.now() - 900000),
    isFromMe: false,
  },
  {
    id: "2",
    senderId: "1",
    content: "Здравствуйте! Уже еду к ресторану, через 10 минут буду",
    timestamp: new Date(Date.now() - 870000),
    isFromMe: true,
  },
  {
    id: "3",
    senderId: "c1",
    content: "Можете позвонить в домофон, код 25К",
    timestamp: new Date(Date.now() - 180000),
    isFromMe: false,
  },
];

const supportMessages = [
  {
    id: "1",
    senderId: "support",
    content: "Здравствуйте! Как дела на смене?",
    timestamp: new Date(Date.now() - 3600000),
    isFromMe: false,
  },
  {
    id: "2",
    senderId: "1",
    content: "Все отлично, спасибо!",
    timestamp: new Date(Date.now() - 3500000),
    isFromMe: true,
  },
];

const quickReplies = [
  "Еду к вам",
  "Забираю заказ",
  "На месте через 5 минут",
  "Жду возле подъезда",
  "Спасибо за заказ!",
];

export default function ChatInterface() {
  const { conversations } = useCourierData();
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("customers");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // В реальном приложении здесь была бы отправка сообщения
      setNewMessage("");
    }
  };

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="MessageSquare" className="h-5 w-5 text-blue-600" />
            <span>Чаты</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="customers"
                className="flex items-center space-x-2"
              >
                <Icon name="Users" className="h-4 w-4" />
                <span>Клиенты</span>
                {conversations.filter((c) => c.unreadCount > 0).length > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-1 px-1 py-0 text-xs"
                  >
                    {conversations.filter((c) => c.unreadCount > 0).length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="support"
                className="flex items-center space-x-2"
              >
                <Icon name="Headphones" className="h-4 w-4" />
                <span>Поддержка</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="customers">
              <div className="space-y-4">
                {/* Chat List */}
                <div className="space-y-2">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Icon
                              name="User"
                              className="h-4 w-4 text-blue-600"
                            />
                          </div>
                          <div>
                            <p className="font-medium">
                              {conversation.participantName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Заказ #{conversation.orderId}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {conversation.unreadCount > 0 && (
                            <Badge
                              variant="destructive"
                              className="px-1 py-0 text-xs"
                            >
                              {conversation.unreadCount}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {new Date(
                              conversation.lastMessage.timestamp,
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {conversation.lastMessage.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Active Chat */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon name="User" className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Мария Иванова</p>
                        <p className="text-xs text-muted-foreground">
                          Заказ #1
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        Онлайн
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Messages */}
                    <ScrollArea className="h-64 w-full border rounded-lg p-3">
                      <div className="space-y-3">
                        {mockMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isFromMe ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-xs px-3 py-2 rounded-lg ${
                                message.isFromMe
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-900"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.isFromMe
                                    ? "text-blue-100"
                                    : "text-gray-500"
                                }`}
                              >
                                {new Date(message.timestamp).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Quick Replies */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Быстрые ответы:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickReplies.map((reply, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickReply(reply)}
                            className="text-xs"
                          >
                            {reply}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Введите сообщение..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                      />
                      <Button onClick={handleSendMessage}>
                        <Icon name="Send" className="h-4 w-4" />
                      </Button>
                      <Button variant="outline">
                        <Icon name="Paperclip" className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="support">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Headphones"
                      className="h-5 w-5 text-green-600"
                    />
                    <div>
                      <p className="font-medium">Служба поддержки</p>
                      <p className="text-sm text-green-600">
                        Онлайн • Обычно отвечают в течение 5 минут
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Support Messages */}
                  <ScrollArea className="h-64 w-full border rounded-lg p-3">
                    <div className="space-y-3">
                      {supportMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isFromMe ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs px-3 py-2 rounded-lg ${
                              message.isFromMe
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.isFromMe
                                  ? "text-green-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {new Date(message.timestamp).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      <Icon name="AlertCircle" className="h-4 w-4 mr-2" />
                      Проблема с заказом
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Icon name="CreditCard" className="h-4 w-4 mr-2" />
                      Вопрос по выплатам
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Icon name="Settings" className="h-4 w-4 mr-2" />
                      Настройки аккаунта
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Icon name="HelpCircle" className="h-4 w-4 mr-2" />
                      Общий вопрос
                    </Button>
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Опишите вашу проблему..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button onClick={handleSendMessage}>
                      <Icon name="Send" className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
