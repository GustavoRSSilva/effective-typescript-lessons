(
    () => console.log('Welcome\n')
 )();

 console.log('// Why you should not use any');
 console.log('const str: string = \'not a string\'');
//  const str: string = 'not a string'
 console.log('const num: number = str as any');
//  const num: number = str as any
 console.log('console.log(\'num\'); //=>  \'not a string\'');
// console.log(num);
