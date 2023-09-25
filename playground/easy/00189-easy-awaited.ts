/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise #built-in

  ### Question

  If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type?

  For example: if we have `Promise<ExampleType>` how to get ExampleType?

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > View on GitHub: https://tsch.js.org/189
*/

/* _____________ Your Code Here _____________ */


// type FakeReturnType<T> = T extends (...args: any[]) => infer R ? R : never
// type FakeReturnType2<T> = T extends (
//         ...args: any[]
//     ) => infer R ?
//     R extends string ?
//         `${R}_test` : never
//     : never
//
// type FakeReturnType3<T> = T extends ((...args: any[]) => infer R extends string) ? R : never
//
// type GetTypeFromDeepObj<T> = T extends {
//   a: {
//     b: {
//       c: infer C
//     }
//   }
// } | {
//   a: infer C
// } | {
//   a: {
//     b: infer C extends number
//   }
// } ? C : never
//
// const obj = {
//   a: {
//     b: 9
//   }
// }
//
// type ObjType = GetTypeFromDeepObj<typeof obj>
//
// const objvar: ObjType = 3
//
//
// const a = () => 'true'
// const number = 1
//
// type test = FakeReturnType3<typeof a>
// type test2 = FakeReturnType<typeof number>
//
// const b: test = '1'


type MyAwaited<T extends PromiseLike<any | PromiseLike<any>>> =
    T extends PromiseLike<infer U>
        ? U extends PromiseLike<any>
            ? MyAwaited<U>
            : U
        : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

// @ts-expect-error
type error = MyAwaited<number>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/189/answer
  > View solutions: https://tsch.js.org/189/solutions
  > More Challenges: https://tsch.js.org
*/
