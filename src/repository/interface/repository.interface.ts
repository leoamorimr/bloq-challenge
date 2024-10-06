export interface Repository<T> {
  findAll(args?: object): Promise<T[]>;
  findUnique(id: string, args?: object): Promise<T>;
  findUniqueOrThrow(id: string, args?: any): Promise<T>;
  create(entity: T, args?: object): Promise<T>;
  update(id: string, entity: T, args?: object): Promise<T>;
  delete(id: string, args?: object): Promise<void>;
}
