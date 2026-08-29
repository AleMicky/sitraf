export function removeUndefined<T extends object>(value: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}
