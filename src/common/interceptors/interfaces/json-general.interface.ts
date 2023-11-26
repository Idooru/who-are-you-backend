export interface JsonGeneralInterface<T> {
  statusCode: number;
  message: string;
  result?: T;
}
