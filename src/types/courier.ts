export interface Courier {
  id: string;
  name: string;
  phone: string;
  email: string;
  rating: number;
  totalDeliveries: number;
  isOnline: boolean;
  currentLocation: Location;
  vehicleType: "bike" | "scooter" | "car" | "foot";
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  status:
    | "pending"
    | "accepted"
    | "pickup"
    | "delivery"
    | "completed"
    | "cancelled";
  pickupAddress: string;
  deliveryAddress: string;
  pickupLocation: Location;
  deliveryLocation: Location;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee: number;
  estimatedTime: number;
  actualTime?: number;
  createdAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
  distance: number;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface DeliveryRoute {
  id: string;
  orderId: string;
  waypoints: Location[];
  distance: number;
  estimatedDuration: number;
  actualDuration?: number;
  optimized: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  type: "customer" | "support" | "system";
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: string[];
}

export interface ChatConversation {
  id: string;
  orderId?: string;
  participantId: string;
  participantName: string;
  participantType: "customer" | "support";
  lastMessage: ChatMessage;
  unreadCount: number;
  isActive: boolean;
}

export interface Review {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  tags: string[];
}

export interface WorkSchedule {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  breakTime?: string;
  isAvailable: boolean;
  shiftType: "morning" | "afternoon" | "evening" | "night";
  expectedEarnings: number;
}

export interface EarningsData {
  daily: number;
  weekly: number;
  monthly: number;
  totalDeliveries: number;
  averagePerDelivery: number;
  tips: number;
  bonuses: number;
  commission: number;
  expenses: number;
  netEarnings: number;
}

export interface Notification {
  id: string;
  type: "new_order" | "order_update" | "system" | "promotion" | "rating";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionRequired: boolean;
  relatedOrderId?: string;
  priority: "low" | "medium" | "high" | "urgent";
}

export interface PerformanceMetrics {
  acceptanceRate: number;
  onTimeDeliveryRate: number;
  customerSatisfaction: number;
  averageDeliveryTime: number;
  totalEarningsThisWeek: number;
  deliveriesThisWeek: number;
  hoursWorkedThisWeek: number;
}
