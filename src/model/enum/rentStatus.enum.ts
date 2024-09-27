export enum RentStatus {
  CREATED = 'CREATED',
  WAITING_DROPOFF = 'WAITING_DROPOFF',
  WAITING_PICKUP = 'WAITING_PICKUP',
  DELIVERED = 'DELIVERED',
}

export function toRentStatus(status: string): RentStatus | undefined {
  if (Object.values(RentStatus).includes(status as RentStatus)) {
    return status as RentStatus;
  }
  return undefined;
}