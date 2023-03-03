`use strict`;

//! Task 1
/*
Створить масив «список покупок». Кожен елемент масиву є
об'єктом, який містить назву продукту, необхідну кількість і чи
був він куплений.
Напишіть декілька функцій для роботи із таким масивом.
1. Виведення всього списку на екран таким чином, щоб спо-
чатку йшли некуплені продукти, а потім куплені.
2. Додавання покупки до списку. Враховуйте, що при дода-
ванні покупки з вже існуючим продуктом у списку, необ-
хідно збільшувати кількість в існуючій покупці, а не до-
давати нову.
3. Купівля продукту. Функція приймає назву продукту і
помічає його як придбаний.
*/
const tbody = document.querySelector(".tbody");
const sortArray = document.querySelector(".sortArray");
const addName = document.querySelector(".addName");
const addNumber = document.querySelector(".addNumber");
const addBuyToList = document.querySelector(".addBuyToList");
const table = document.querySelector(".table");

//* Масив з обєктами
const shoppingList = [
  { name: "Bread", number: 2, status: "Not bought" },
  { name: "Oil", number: 1, status: "Bought" },
  { name: "Macaroni", number: 3, status: "Not bought" },
  { name: "Tomatoes", number: 7, status: "Bought" },
  { name: "Cucumbers", number: 5, status: "Not bought" },
  { name: "Pepsi", number: 1, status: "Bought" },
  { name: "Juice", number: 4, status: "Not bought" },
  { name: "Meat", number: 3, status: "Not bought" },
  { name: "Sauce", number: 2, status: "Bought" },
];

//* Функція для сортування масиву за статусом, статус "Bought", сортує в кінeць
const sortShoppingList = (array) => {
  array.sort((a, b) => {
    if (a.status === "Bought") {
      return 1;
    } else if (b.status === "Bought") {
      return -1;
    }
    return 0;
  });
};

//* Функція для додавання нового елементу до списка
function updateShoppingList(array, newProduct, number) {
  let added = false;
  array.forEach((element) => {
    if (element.name.toLowerCase() === newProduct.toLowerCase()) {
      element.number += number;
      added = true;
    }
  });
  if (!added) {
    array.push({ name: newProduct, number: number, status: "Not bought" });
  }
}

//* Функція для змінення статусу покупки
function buyProduct(array, nameProduct) {
  array.forEach((element) => {
    if (element.name === nameProduct && element.status === "Not bought") {
      element.status = "Bought";
    } else if (element.name === nameProduct && element.status === "Bought") {
      element.status = "Not bought";
    }
  });
}

//* Функція для виводу списка на сторінку
//* type="checkbox" class="checkBox" ${ array[status === "Bought" ? "checked" : "" }/> привязуємо статус покупки до стану чекбокса тернарним оператором
function showList(array) {
  tbody.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    tbody.innerHTML += `
      <tr>
        <td>${array[i].name}</td>
        <td>${array[i].number}</td>
        <td>${array[i].status} </td>
         <td><input type="checkbox" class="checkBox" ${
           array[i].status === "Bought" ? "checked" : ""
         }/> </td>
      </tr>
    `;
  }
}
//* Функція для очищення інпутів
function clearInputs() {
  addName.value = "";
  addNumber.value = "";
}
//* Викликаємо функцію і виводимо масив з обєктами на сторінку
showList(shoppingList);

//* При активації кнопки "Sort" викликаємо функції для сортування і виводу списка на екран
sortArray.addEventListener("click", () => {
  sortShoppingList(shoppingList);
  showList(shoppingList);
});

//* При активації кнопки "Add" приймаємо значення інпутів і запускаємо функію додавання нового елементу і воводу на екран
addBuyToList.addEventListener("click", () => {
  const newNameProduct = addName.value;
  const newNumberProduct = +addNumber.value;
  if (newNameProduct && newNumberProduct) {
    updateShoppingList(shoppingList, newNameProduct, newNumberProduct);
    showList(shoppingList);
  } else {
    alert("Enter value of name roduct and number");
  }

  clearInputs();
});

//* При "клікані" на чекбокс який знаходиться в таргеті таблиці витягуємо імя продукту і передаємо у функцію для зміни статусу
table.addEventListener("change", (event) => {
  if (event.target.classList.contains("checkBox")) {
    const nameStatus =
      event.target.parentNode.parentNode.firstElementChild.textContent;
    buyProduct(shoppingList, nameStatus);
    showList(shoppingList);
  }
});

//! Task 2
/*
Створить масив, який описує чек у магазині. Кожен елемент
масиву складається із назви товару, кількості та ціни за одиницю
товару.
Напишіть наступні функції.
1. Виведення чека на екран.
2. Підрахунок загальної суми покупки.
3. Отримання найдорожчої покупки у чеку.
4. Підрахунок середньої вартості одного товару у чеку.
*/

const tbody2 = document.querySelector(".tbody2");
const results = document.querySelector(".results");

//* Масив з обєктами, чек в магазині
const checkInStore = [
  { name: "iPhone", number: 3, price: 900 },
  { name: "MacBook", number: 10, price: 1500 },
  { name: "iPad", number: 5, price: 500 },
  { name: "Apple Watch", number: 8, price: 400 },
  { name: "AirPods", number: 3, price: 200 },
];

//* Функція для обчислення суми продукта і додавання нового ключа в масив
function calcSumProduct(array) {
  array.forEach((el) => {
    const sum = el.number * el.price;
    el.sum = sum;
  });
}
calcSumProduct(checkInStore);

//* Функція для підрахунку загальної суми покупки
function sumAllProduct(array) {
  let sumProduct = 0;
  array.forEach((el) => {
    sumProduct += el.sum;
  });
  return sumProduct;
}

//* Підрахунок найдорожчої суми покупки
function maxSum(array) {
  let maxSumInCheck = checkInStore[0].sum;
  array.forEach((el) => {
    if (el.sum > maxSumInCheck) {
      maxSumInCheck = el.sum;
    }
  });
  return maxSumInCheck;
}

//* Підрахунок середньої вартості одного товару у чеку
function averagePrice(array) {
  let averageCost = 0;
  let sum = 0;
  array.forEach((el) => {
    sum += el.price;
  });
  return (averageCost = sum / array.length);
}

//* Виведення чека на екран
function showCheck(array) {
  array.forEach((el) => {
    tbody2.innerHTML += `
    <tr>
        <td>${el.name}</td>
        <td>${el.number}</td>
        <td>${el.price}₴ </td>
        <td>${el.sum}₴</td>
      </tr>
    `;
  });
  results.innerHTML += `
   <p class="finalSum">Final sum =
      <mark> ${sumAllProduct(checkInStore)}₴</mark></p>
   <p class="finalSum">The most expensive purchase in the check =
   <mark>${maxSum(checkInStore)}₴</mark></p>
   <p class="finalSum">There is an average price of one product in the check = <mark>${averagePrice(
     checkInStore
   )}₴</mark></p>
  `;
}
showCheck(checkInStore);

//! Task 3
/*
Створіть масив CSS-стилів (колір, розмір шрифту, вирівню-
вання, підкреслення тощо). Кожен елемент масиву – це об’єкт, що
складається із двох властивостей: назва та значення стилю.
Напишіть функцію, яка приймає масив стилів та текст, і ви-
водить цей текст за допомогою document.write() у тегах <p></p>,
додавши у відкритий тег атрибут style з усіма стилями, переліче-
ними у масиві.
*/
const styleText = document.querySelector(".text");
const btnSubmitStyle = document.querySelector(".btnSubmitStyle");
const fontSizeStyle = document.querySelector("#fontSizeStyle");
const colorStyle = document.querySelector("#colorStyle");
const fontWeightStyle = document.querySelector("#fontWeightStyle");
const textAlingStyle = document.querySelector("#textAlingStyle");
const lineHeightStyle = document.querySelector("#lineHeightStyle");
const textarea = document.querySelector("#textarea");

//* Приймаємо значення select i створюємо з ними масив.
btnSubmitStyle.addEventListener("click", () => {
  const arrayCssStyle = [
    { cssName: "font-size", cssValue: fontSizeStyle.value },
    { cssName: "color", cssValue: colorStyle.value },
    { cssName: "font-weight", cssValue: fontWeightStyle.value },
    { cssName: "text-align", cssValue: textAlingStyle.value },
    { cssName: "line-height", cssValue: lineHeightStyle.value },
  ];
  if (textarea.value) {
    showStyleText(arrayCssStyle, textarea.value);
  } else alert("Enter text");
  textarea.value = "";
});

//* Не знаю чи це правильне рішення, я просто витягую значення з обєктів, перетворюю на стрінг і втавляю в стилі
function showStyleText(array, text) {
  let newStyle = [];
  array.forEach((el) => {
    newStyle.push(el.cssName + ": " + el.cssValue);
  });
  styleText.innerHTML = `
  <p style = "${newStyle.join(";")}">${text}</p>
  `;
  styleText.classList.add("textResult");
  // document.write(`<p style = "${newStyle.join(";")}">${text}</p>`);
}

//! Task 4
/*
Створіть масив аудиторій академії. Об’єкт-аудиторія склада-
ється із назви, кількості місць (від 10 до 20) та назви факультету,
для якого вона призначена.
Напишіть декілька функцій для роботи з ним.
1. Виведення на екран усіх аудиторій.
2. Виведення на екран аудиторій для зазначеного факульте-
ту.
3. Виведення на екран тільки тих аудиторій, які підходять
для переданої групи. Об’єкт-група складається з назви,
кількості студентів і назви факультету.
4. Функція сортування аудиторій за кількістю місць.
5. Функція сортування аудиторій за назвою (за алфавітом).
*/
const tbody4 = document.querySelector(".tbody4");
const selectAudience = document.querySelector("#selectAudience");
const btnSortbyNumber = document.querySelector(".btnSortbyNumber");
const btnSortAbc = document.querySelector(".btnSortAbc");
//* Масив з обєкт-аудиторіями
const audience = [
  { name: "Audience 18", number: 10, fuculty: "Front-end" },
  { name: "Audience 26", number: 17, fuculty: "Back-end" },
  { name: "Audience 37", number: 20, fuculty: "Design" },
  { name: "Audience 114", number: 13, fuculty: "Internet marketing" },
  { name: "Audience 75", number: 14, fuculty: "Cyber security" },
];

//* Виводимо на екран масив
const showAudience = (array) => {
  array.forEach(({ name, number, fuculty }) => {
    tbody4.innerHTML += `
  <tr>
  <td>${name}</td>
  <td>${number}</td>
  <td>${fuculty}</td>
</tr>`;
  });
};
showAudience(audience);

selectAudience.addEventListener("change", () => {
  if (selectAudience.value) {
    tbody4.innerHTML = "";
    filterByNameFuculty(audience, selectAudience.value);
  } else {
    tbody4.innerHTML = "";
    showAudience(audience);
  }
});

//*  Функція для виводу на екран лише обраного факультету
function filterByNameFuculty(array, nameFuculty) {
  let sortByFuculty = array.filter((el) => el.fuculty === nameFuculty);
  showAudience(sortByFuculty);
}

//* Сортування масиву за кількістю місцю
function sortByNumberPlace(array) {
  let sortByPlace = array.sort((a, b) => a.number - b.number);
  showAudience(sortByPlace);
}
//* При активації кнопки сортування, запускається функція сортування і виводить на екран
btnSortbyNumber.addEventListener("click", () => {
  if (!selectAudience.value) {
    tbody4.innerHTML = "";
    sortByNumberPlace(audience);
  }
});

//* Сортування за алфавітним порядком
function sortByAbc(array) {
  let sortAbc = array.sort((a, b) => a.fuculty.localeCompare(b.fuculty));
  showAudience(sortAbc);
}
//* При активації кнопки сортування Abc, запускається функція сортування за алфавітним порядком і виводить на екран
btnSortAbc.addEventListener("click", () => {
  if (!selectAudience.value) {
    tbody4.innerHTML = "";
    sortByAbc(audience);
  }
});
