import 'foo';

export default (foo: any, x: string): void => {
  console.log('hey', x);
};

const foo: Buffer = Buffer.from('foo');
console.log(foo);
