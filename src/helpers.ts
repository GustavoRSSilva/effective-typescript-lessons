export const newModule = (str: string) => {
    const spaces = ' '.repeat(5)
    const border = '#'.repeat(str.length + (spaces.length * 2) + 6) 
    const intro = ' '.repeat((100 - border.length) / 2)

    newLine()
    newLine()
    console.log(intro,border, intro);
    console.log(intro,'#',spaces,str,spaces, '#', intro);
    console.log(intro,border, intro);
    newLine()
 }

 export const newLine = () => console.log('\n');