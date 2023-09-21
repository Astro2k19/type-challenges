/*
  11 - Tuple to Object
  -------
  by sinoon (@sinoon) #easy #object-keys

  ### Question

  Given an array, transform it into an object type and the key/value must be in the provided array.

  For example:

  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```

  > View on GitHub: https://tsch.js.org/11
*/

/* _____________ Your Code Here _____________ */

type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const sym1 = Symbol(1)
const sym2 = Symbol(2)
const tupleSymbol = [sym1, sym2] as const
const tupleMix = [1, '2', 3, '4', sym1] as const

type test = TupleToObject<typeof tuple>

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleSymbol>, { [sym1]: typeof sym1; [sym2]: typeof sym2 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4'; [sym1]: typeof sym1 }>>,
]

type error = TupleToObject<[[1, 2], {}]>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/11/answer
  > View solutions: https://tsch.js.org/11/solutions
  > More Challenges: https://tsch.js.org
*/

type ListenersToObj<Type> = {
  [P in keyof Type as `on${Capitalize<P & string>}Change`]?: () => void
}
const listenerToObj = <T>(obj: T, listeners: ListenersToObj<T>): void => {
  console.log(obj, listeners)
}

type Test = {
  [P in 'test' | 'lol']: P
}

type DogInfo = {
  name: string
  age: number
}

const dog: DogInfo = {
  name: 'lol',
  age: 22,
}

listenerToObj(
  dog,
  {
    onNameChange: () => {},
    onAgeChange: () => {},
  },
)

const MyArray = [
  { name: 'Alice', age: 15 },
  { name: 'Bob', age: 23 },
  { name: 'Eve', age: 38 },
  { name: 'Eve', age: '58', gender: 'male' },
  '',
]

type IndexedAccess = typeof MyArray[number]

type PersonAge = IndexedAccess['age']
