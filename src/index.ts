import { newLine, newModule } from './helpers'
(
    () => console.log('Welcome\n')
 )();


newModule('Why you should not use any')
console.log('const str: string = \'not a string\'');
//  const str: string = 'not a string'
console.log('const num: number = str as any');
//  const num: number = str as any
console.log('console.log(\'num\'); //=>  \'not a string\'');
// console.log(num);
console.log('WITH ANY, YOU DISABLE THE TYPECHECKING');

newModule('Use ! to asset an object')
console.log('Use ! to asset that an object is not undefined');
console.log('let aO: string;');
console.log('const now = Date.now();');
console.log('if (now % 2 == 0) aO = \'now\';');
console.log('console.log(aO!); // => string');

newModule('Api response Declared type variables, runtime variables');
console.log(`
interface LightApiResponse {
    lightSwitchValue: boolean;
  }
  async function setLight() {
    const response = await fetch('/light');
    const result: LightApiResponse = await response.json();
    setLightSwitch(result.lightSwitchValue);
  }
`);
console.log('Careful, because typescript does not know what the object result at run type, if the object is a string, this code will fail');
console.log('Typescript only enforces variable at declared types, after that the code in transpired to Javascript');
console.log('**Runtime variables** (ex: responses from APIs), can change, and so there might be so false positives in the code.');

newModule('TypeScript Types Have No Effect on Runtime Performance')
console.log('Because types and type operations are erased when you generate JavaScript, they cannot have an effect on runtime performance. TypeScript’s static types are truly zero cost. The next time someone offers runtime overhead as a reason to not use TypeScript, you’ll know exactly how well they’ve tested this claim!');

newModule('TypeScript Typed, still works with different name types')
console.log(`
interface Vector2D {
    x: number;
    y: number;
}

interface NamedVector {
    name: string;
    x: number;
    y: number;
}

function calculateLength(v: Vector2D) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}
const v: NamedVector = { x: 3, y: 4, name: 'Zee' };
calculateLength(v)  // OK, result is 5`
);
console.log('Typescript does not force to be the same type, as long it has the same properties. It is tested in runtime.');
console.log('They normalize the object typeOf NamedVector to fit the type Vector2D.');

newModule('Structural typing can also lead to surprises with classes')
console.log(`class C {
    foo: string;
    constructor(foo: string) {
      this.foo = foo;
    }
  }
  
  const c = new C('instance of C');
  const d: C = { foo: 'object literal' };  // OK!`);

newModule('Any disables typechecking')
console.log(  `let age: number;
  age = '12';
// ~~~ Type '"12"' is not assignable to type 'number'
  age = '12' as any;  // OK
  age += 1;  // OK; at runtime, age is now "121"`
  );

newModule('typeof null i object do be careful')
console.log('this does not work as intended');
console.log(`function getElement(elOrId: string|HTMLElement|null): HTMLElement {
  if (typeof elOrId === 'object') {
    return elOrId;
 // ~~~~~~~~~~~~~~ 'HTMLElement | null' is not assignable to 'HTMLElement'
  } else if (elOrId === null) {
    return document.body;
  } else {
    const el = document.getElementById(elOrId);
    return el;
 // ~~~~~~~~~~ 'HTMLElement | null' is not assignable to 'HTMLElement'
  }
}`);
console.log('you need to check if null first!');

newModule('use Types as set of values')
console.log('typeof /y/ //=>', typeof /y/);
console.log('The smalled type has a single value');
console.log('type A = \'A\'');
newLine()
newLine()

console.log('how keyof works');
newLine()
console.log(`interface Point {
  x: number;
  y: number;
}
type PointKeys = keyof Point;  // Type is "x" | "y"

function sortBy<K extends keyof T, T>(vals: T[], key: K): T[] {
  // ...
}
const pts: Point[] = [{x: 1, y: 1}, {x: 2, y: 0}];
sortBy(pts, 'x');  // OK, 'x' extends 'x'|'y' (aka keyof T)
sortBy(pts, 'y');  // OK, 'y' extends 'x'|'y'
sortBy(pts, Math.random() < 0.5 ? 'x' : 'y');  // OK, 'x'|'y' extends 'x'|'y'
sortBy(pts, 'z');
// ~~~ Type '"z"' is not assignable to parameter of type '"x" | "y"`);

console.log('in the function name we declare the available type, in this case <K extends keyof T, T> is the same as <T, K extends keyof T>');

console.log('<Person>{} is the same as {} as Person');

console.log(`
type TopNavState = {
  userId: State['userId'];
  pageTitle: State['pageTitle'];
  recentFiles: State['recentFiles'];
};

is the same as

type TopNavState = {
  [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k]
};
`);

console.log(`Types are different that functions, types you need to specify: 
interface Name {
  first: string;
  last: string;
}
type DancingDuo<T extends Name> = [T, T];

const couple1: DancingDuo<Name> = [
  {first: 'Fred', last: 'Astaire'},
  {first: 'Ginger', last: 'Rogers'}
];  // OK
`);

console.log('arrays are objects, so their keys are strings, not numbers. number as an index signature is a purely TypeScript construct which is designed to help catch bugs.');
console.log('const a = \'123\' as const make the type readonly string')

console.log('Dictionary<string> is the same as {[key: string]: string} or Record<string, string>.')

console.log(`only use {} instead of unknown if you really do know that null and undefined aren’t possibilities.`)

console.log(`for type coverage use:
$ npx type-coverage
9985 / 10117 98.69%

or

$ npx type-coverage --detail
path/to/code.ts:1:10 getColumnInfo
path/to/module.ts:7:1 pt2
...`);

console.log(`When the type is available only the variable use this to fetch the type:
type MySanta = ReturnType<typeof getGift>;  // SecretSanta
type MyName = Parameters<typeof getGift>[0];  // SecretName`);


newModule('TSDocs')
console.log(`You can document type using the typescript default documentation:
/** A measurement performed at a time and place. */
interface Measurement {
  /** Where was the measurement made? */
  position: Vector3D;
  /** When was the measurement made? In seconds since epoch. */
  time: number;
  /** Observed momentum */
  momentum: Vector3D;
}`);

newModule('Calling callbacks')

console.log(`class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  @logged
  greet() {
    return "Hello, " + this.greeting;
  }
}

function logged(target: any, name: string, descriptor: PropertyDescriptor) {
  const fn = target[name];
  descriptor.value = function() {
    console.log(`Calling ${name}`);
    return fn.apply(this, arguments);
  };
}
console.log(new Greeter('Dave').greet());`);

newModule('private access')
console.log(`The private indicator is gone, and your secret is out! Much like the _private convention, TypeScript’s access modifiers only discourage you from accessing private data. With a type assertion, you can even access a private property from within TypeScript:

class Diary {
  private secret = 'cheated on my English test';
}

const diary = new Diary();
(diary as any).secret  // OK
`);
