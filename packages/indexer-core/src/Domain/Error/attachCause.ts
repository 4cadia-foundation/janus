export function attachCause(err: Error, cause: Error): Error {
  return Object.defineProperty(err, 'cause', {
    value: cause,
    enumerable: true,
  });
}
