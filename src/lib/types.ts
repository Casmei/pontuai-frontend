export interface Store {
  id: string
  name: string
  address: string
  phone: string
  description?: string
  customerCount: number
  createdAt: Date
}

export interface StoreConfig {
  pointsPerReal: number
  expirationDays: number
  minSpendToEarn: number
  minPointsToRedeem: number
}

export interface Customer {
  id: string
  name: string
  phone: string
  points: number
  createdAt: Date
}

export interface Reward {
  id: string
  name: string
  description?: string
  pointsRequired: number
  createdAt: Date
}

export interface Transaction {
  id: string
  type: "purchase" | "redeem"
  customer: Customer
  amount?: number
  pointsEarned?: number
  pointsSpent?: number
  reward?: Reward
  createdAt: Date
}

export interface StoreStats {
  totalCustomers: number
  newCustomersThisMonth: number
  totalSales: number
  salesThisMonth: number
  totalPointsRedeemed: number
  redeemedThisMonth: number
  activePoints: number
  pointsEarnedThisMonth: number
}
