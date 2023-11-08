/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #medium #template-literal

  ### Question

  Compute the length of a string literal, which behaves like `String#length`.

  > View on GitHub: https://tsch.js.org/298
*/

/* _____________ Your Code Here _____________ */

type LengthOfString<S extends string, T extends string[] = []> =
    S extends `${infer First}${infer Rest}`
        ? LengthOfString<Rest, [...T, First]>
        : T['length']

type LengthOfStringFirst<S extends string> = StrToArr<S>

type StrToArr<S extends string> =
    S extends ''
        ? []
        : S extends `${infer First}${infer Rest}`
            ? [First, ...StrToArr<Rest>]
            : []

type t1 = StrToArr<'hello1'>

// kumiko
// k  - first, rest - umiko
// [k, ...LengthOfString<umiko>]
// u  - first, rest - miko
// [u, ...LengthOfString<miko>]
// m  - first, rest - iko
// [m, ...LengthOfString<iko>]
// i  - first, rest - ko
// [i, ...LengthOfString<ko>]
// k  - first, rest - o
// [k, ...LengthOfString<o>]

type test = 'O' extends `${infer A}${infer B}` ? A : never





/* _____________ Test Cases _____________ */
import type {Equal, Expect} from '@type-challenges/utils'

type cases = [
    Expect<Equal<LengthOfString<''>, 0>>,
    Expect<Equal<LengthOfString<'kumiko'>, 6>>,
    Expect<Equal<LengthOfString<'reina'>, 5>>,
    Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

type a = 'gg'['length']

type Arr = Expect<Equal<a, number>>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/298/answer
  > View solutions: https://tsch.js.org/298/solutions
  > More Challenges: https://tsch.js.org
*/
