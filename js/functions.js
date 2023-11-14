function checkStringLength (inStr, inStrLength){
  return (inStr.length <= inStrLength);
}

function isPalindrome(inStr) {
  /*Приводим к нижнему регистру, убираем все что не буквы/цифры на всей длине строки*/
  const preparedString = inStr.toLowerCase().replace(/[^а-яёa-z0-9]/gi, '');
  const lastIndex = preparedString.length - 1;
  for (let i = 0; i < preparedString.length / 2; i++) {
    if (preparedString[i] !== preparedString[lastIndex - i]) {
      return false;
    }
  }
  return true;
}

function extractNumbers(inStr) {
  let str = inStr;

  if (!Number.isNaN(str)){
    str = str.toString();
  }
  /*убираем все что не цифра на всей длине строки*/
  str = str.replace(/[\D]/gi, '');
  return parseInt(str,10);
}


checkStringLength('Тестовая строка', 14);
isPalindrome('Лёша на полке клопа нашёл ');
extractNumbers('2023 год');
extractNumbers('ECMAScript 2022');
extractNumbers('1 кефир, 0.5 батона');
extractNumbers('агент 007');
extractNumbers('а я томат');
extractNumbers('-1');
