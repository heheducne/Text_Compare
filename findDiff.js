const Diff = require('diff');
export function Worddiff(one, other){
    const diff = Diff.diffLines(one, other);
    let lst1 = []
    let lst2 = []
    diff.forEach((part) => {
       if(part.removed==true){lst1.push(part.value)}
       else if (part.added==true){lst2.push(part.value)}
    });
    return [lst1,lst2];
}
// console.log(Worddiff(one,other));

