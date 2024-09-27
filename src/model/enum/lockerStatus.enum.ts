export enum LockerStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export function toLockerStatus(status: string): LockerStatus | undefined {
  if (Object.values(LockerStatus).includes(status as LockerStatus)) {
    return status as LockerStatus;
  }
  return undefined;
}
