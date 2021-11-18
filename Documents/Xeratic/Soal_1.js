const usedCombination = 'one who two bob add owl fab den mia tat'

function getFirstCharacters(usedCombination) {
    let result = [];
  
    usedCombination.split(' ').map(word => word.charAt(0) != '' ? result.push(word.charAt(0)) : '');
    
    return result;
  }

  function getSecondCharacters(usedCombination) {
    let result = [];
  
    usedCombination.split(' ').map(word => word.charAt(1) != '' ? result.push(word.charAt(1)) : '');
    
    return result;
  }

  function getThirdCharacters(usedCombination) {
    let result = [];
  
    usedCombination.split(' ').map(word => word.charAt(2) != '' ? result.push(word.charAt(2)) : '');
    
    return result;
  }

const letter1 = getFirstCharacters(usedCombination)
const letter2 = getSecondCharacters(usedCombination)
const letter3 = getThirdCharacters(usedCombination)

// console.log(letter1)

console.log(checkCombination('win'))
console.log(checkCombination('deb'))
console.log(checkCombination('hat'))
``