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