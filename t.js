/* eslint-disable @typescript-eslint/no-unused-vars */
// function fun1(str1, str2) {
//   let ans = '';

//   for(let i = 0; i < str1.length; i++) {
//     let a = str1[i];
//     if (str2[i]) {
//       let b = str2[i];
//       if (a === b) {
//         ans += a;
//       } else {
//         return ans;
//       }
//     } else {
//       return ans;
//     }
//   }
//   return ans;
// }

// console.log(fun1('1flower', 'flight'))
// console.log(fun1('dog', 'car'))

function fun1(num) {
  const sign = num >= 0 ? 1 : -1;
  let ans = 0;

  let n = sign === -1 ? Math.abs(num) : num;
  let l = 10;
  while (n > 0) {
    let n1 = n % 10;
    n = Math.floor(n / 10);
    ans = ans * l + n1;
    // console.log('ans: ' + ans);
    // l *= 10;
  }

  return sign * ans;
}

function removeDuplicates(nums) {
  let i = 0;
  let len = nums.length - 1;
  let num = 0;
  while (i < len - 1) {
      console.log(i);
      if (nums[i] === nums[i + 1]) {
          // 
          let j = i;
          while (j < len - 1) {
              nums[j] = nums[j + 1];
              j++;
          }
          
      } else {
          i++;
      }

  }
  return num;
}
let n = [1,1,1,2,2,3]
console.log(removeDuplicates(n))
console.log(n);


