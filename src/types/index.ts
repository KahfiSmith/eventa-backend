import { UserRole, EventStatus, EventVisibility, AttendeeStatus, TicketStatus, PaymentStatus, NotificationType } from '@prisma/client';

// Re-export Prisma enums
export {
  UserRole,
  EventStatus,
  EventVisibility,
  AttendeeStatus,
  TicketStatus,
  PaymentStatus,
  NotificationType,
};

// User types
export interface UserDto {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  role: UserRole;
  isVerified: boolean;
  location?: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreateDto {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  role?: UserRole;
}

export interface UserUpdateDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
}

// Auth types
export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
}

// Event types
export interface EventDto {
  id: string;
  title: string;
  description: string;
  summary?: string;
  startDate: Date;
  endDate: Date;
  timezone: string;
  isOnline: boolean;
  onlineUrl?: string;
  maxAttendees?: number;
  minAge?: number;
  tags: string[];
  images: string[];
  status: EventStatus;
  visibility: EventVisibility;
  requiresApproval: boolean;
  organizerId: string;
  categoryId: string;
  venueId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventCreateDto {
  title: string;
  description: string;
  summary?: string;
  startDate: Date;
  endDate: Date;
  timezone?: string;
  isOnline: boolean;
  onlineUrl?: string;
  maxAttendees?: number;
  minAge?: number;
  tags?: string[];
  status?: EventStatus;
  visibility?: EventVisibility;
  requiresApproval?: boolean;
  categoryId: string;
  venueId?: string;
}

export interface EventUpdateDto {
  title?: string;
  description?: string;
  summary?: string;
  startDate?: Date;
  endDate?: Date;
  timezone?: string;
  isOnline?: boolean;
  onlineUrl?: string;
  maxAttendees?: number;
  minAge?: number;
  tags?: string[];
  status?: EventStatus;
  visibility?: EventVisibility;
  requiresApproval?: boolean;
  categoryId?: string;
  venueId?: string;
}

// Ticket types
export interface TicketTierDto {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  totalQuantity: number;
  remainingQuantity: number;
  salesStartDate?: Date;
  salesEndDate?: Date;
  maxPerUser?: number;
  isActive: boolean;
  eventId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketTierCreateDto {
  name: string;
  description?: string;
  price: number;
  currency?: string;
  totalQuantity: number;
  salesStartDate?: Date;
  salesEndDate?: Date;
  maxPerUser?: number;
  eventId: string;
}

export interface TicketDto {
  id: string;
  ticketNumber: string;
  qrCode: string;
  status: TicketStatus;
  purchaseDate: Date;
  usedAt?: Date;
  userId: string;
  eventId: string;
  ticketTierId: string;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Payment types
export interface PaymentDto {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  midtransOrderId?: string;
  midtransTransactionId?: string;
  paymentMethod?: string;
  paymentChannel?: string;
  paidAt?: Date;
  expiresAt?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentCreateDto {
  amount: number;
  currency?: string;
  userId: string;
  ticketIds: string[];
}

// Notification types
export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  userId: string;
  eventId?: string;
  createdAt: Date;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Search types
export interface EventSearchParams extends PaginationParams {
  query?: string;
  categoryId?: string;
  startDate?: Date;
  endDate?: Date;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  distance?: number;
  latitude?: number;
  longitude?: number;
  tags?: string[];
  isOnline?: boolean;
  status?: EventStatus;
}

// API Response types
export interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: any[];
}

// File upload types
export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
