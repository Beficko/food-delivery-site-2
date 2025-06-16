import { useState, useEffect, useCallback } from "react";
import {
  Courier,
  Order,
  ChatConversation,
  Review,
  WorkSchedule,
  EarningsData,
  Notification,
  PerformanceMetrics,
} from "@/types/courier";

// Mock data
const mockCourier: Courier = {
  id: "1",
  name: "Алексей Петров",
  phone: "+7 (999) 123-45-67",
  email: "alex.petrov@example.com",
  rating: 4.8,
  totalDeliveries: 1247,
  isOnline: true,
  currentLocation: {
    lat: 55.7558,
    lng: 37.6176,
    address: "Москва, Красная площадь",
  },
  vehicleType: "scooter",
};

const mockOrders: Order[] = [
  {
    id: "1",
    customerId: "c1",
    customerName: "Мария Иванова",
    customerPhone: "+7 (999) 111-22-33",
    status: "accepted",
    pickupAddress: "McDonald's, ул. Тверская, 15",
    deliveryAddress: "ул. Арбат, 25, кв. 10",
    pickupLocation: { lat: 55.7608, lng: 37.6094 },
    deliveryLocation: { lat: 55.7522, lng: 37.5928 },
    items: [
      { id: "1", name: "Биг Мак", quantity: 2, price: 350 },
      { id: "2", name: "Картофель фри", quantity: 1, price: 120 },
    ],
    totalAmount: 820,
    deliveryFee: 150,
    estimatedTime: 25,
    distance: 2.3,
    createdAt: new Date(Date.now() - 600000),
    acceptedAt: new Date(Date.now() - 300000),
  },
  {
    id: "2",
    customerId: "c2",
    customerName: "Дмитрий Сидоров",
    customerPhone: "+7 (999) 444-55-66",
    status: "pending",
    pickupAddress: "KFC, Новый Арбат, 8",
    deliveryAddress: "ул. Остоженка, 12, оф. 301",
    pickupLocation: { lat: 55.7539, lng: 37.604 },
    deliveryLocation: { lat: 55.7456, lng: 37.5987 },
    items: [{ id: "3", name: "Баскет M", quantity: 1, price: 420 }],
    totalAmount: 420,
    deliveryFee: 180,
    estimatedTime: 30,
    distance: 3.1,
    createdAt: new Date(Date.now() - 120000),
  },
];

const mockConversations: ChatConversation[] = [
  {
    id: "1",
    orderId: "1",
    participantId: "c1",
    participantName: "Мария Иванова",
    participantType: "customer",
    lastMessage: {
      id: "m1",
      senderId: "c1",
      receiverId: "1",
      type: "customer",
      content: "Можете позвонить в домофон, код 25К",
      timestamp: new Date(Date.now() - 180000),
      isRead: false,
    },
    unreadCount: 1,
    isActive: true,
  },
];

const mockReviews: Review[] = [
  {
    id: "1",
    orderId: "completed1",
    customerId: "c3",
    customerName: "Анна Смирнова",
    rating: 5,
    comment: "Быстрая доставка, курьер очень вежливый!",
    createdAt: new Date(Date.now() - 3600000),
    tags: ["быстро", "вежливо", "качественно"],
  },
  {
    id: "2",
    orderId: "completed2",
    customerId: "c4",
    customerName: "Игорь Волков",
    rating: 4,
    comment: "Все отлично, спасибо за доставку",
    createdAt: new Date(Date.now() - 7200000),
    tags: ["хорошо"],
  },
];

export const useCourierData = () => {
  const [courier, setCourier] = useState<Courier>(mockCourier);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [conversations, setConversations] =
    useState<ChatConversation[]>(mockConversations);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [schedule, setSchedule] = useState<WorkSchedule[]>([]);
  const [earnings, setEarnings] = useState<EarningsData>({
    daily: 2450,
    weekly: 15800,
    monthly: 67200,
    totalDeliveries: 23,
    averagePerDelivery: 285,
    tips: 1200,
    bonuses: 800,
    commission: 8600,
    expenses: 2400,
    netEarnings: 56000,
  });
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "new_order",
      title: "Новый заказ",
      message: "Заказ на сумму 820₽ ждет подтверждения",
      timestamp: new Date(Date.now() - 60000),
      isRead: false,
      actionRequired: true,
      relatedOrderId: "2",
      priority: "high",
    },
  ]);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    acceptanceRate: 92,
    onTimeDeliveryRate: 96,
    customerSatisfaction: 4.8,
    averageDeliveryTime: 23,
    totalEarningsThisWeek: 15800,
    deliveriesThisWeek: 56,
    hoursWorkedThisWeek: 38,
  });

  const toggleOnlineStatus = useCallback(() => {
    setCourier((prev) => ({ ...prev, isOnline: !prev.isOnline }));
  }, []);

  const acceptOrder = useCallback((orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: "accepted", acceptedAt: new Date() }
          : order,
      ),
    );
  }, []);

  const updateOrderStatus = useCallback(
    (orderId: string, status: Order["status"]) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order,
        ),
      );
    },
    [],
  );

  const markNotificationRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif,
      ),
    );
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate location updates
      setCourier((prev) => ({
        ...prev,
        currentLocation: {
          ...prev.currentLocation,
          lat: prev.currentLocation.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.currentLocation.lng + (Math.random() - 0.5) * 0.001,
        },
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return {
    courier,
    orders,
    conversations,
    reviews,
    schedule,
    earnings,
    notifications,
    metrics,
    toggleOnlineStatus,
    acceptOrder,
    updateOrderStatus,
    markNotificationRead,
  };
};
