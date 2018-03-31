 import winston from 'winston';
// let maintext = 'welcome';
// let newstr = '';
// for(let i = maintext.length-1; i>=0; i = i-1) {
//   newstr += maintext[i];
// }
// let sumOfMultiples = 0;
// for(let i =5; i<=100; i++) {
//   if(i%5 === 0) {
//     sumOfMultiples += i;
//   }
// }

const states = [
  "Abia",
  "Adamawa",
  "Anambra",
  "AkwaIbom",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "CrossRiver",
  "Delta",
  "Ebonyi",
  "Enugu",
  "Edo",
  "Ekiti",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara"
];
let newObj = {}
for(let i = 0; i <states.length; i++) {
  let number = states[i].length;
  newObj[states[i]] = states[i].length;
}

var items = Object.keys(newObj).map(function(key) {
  return [key, newObj[key]];
});

// Sort the array based on the second element
items.sort(function(first, second) {
  return second[1] - first[1];
});

// Create a new array with only the first 5 items
console.log(items.slice(0, 35));

//winston.info(newObj);