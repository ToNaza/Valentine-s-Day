document.querySelector('.modal_box').addEventListener('click', function () {
  if (!this.classList.contains('open')) {
    this.classList.add('open'); /* Лише один раз додаємо клас */
  }
});





let clickCount = 0;

document.getElementById("con1").addEventListener("click", function () {
  clickCount++;

  if (clickCount === 2) {
    // Відкриваємо конверт
    document.querySelector(".modal_box").classList.add("open");

    const val = document.getElementById("val");
    const valBox = document.getElementById("val_box");
    const con2 = document.getElementById("con2");
    const con1 = document.getElementById("con1");

    // Спочатку піднімаємо модальне вікно з позиції -180%
    setTimeout(function () {
      val.style.transition = "transform 1s ease"; // Анімація підйому
      val.style.transform = "translate(-50%, -180%)"; // Піднімаємо знизу
    }, 1000); // Затримка на 1 секунду перед підйомом

    // Потім змінюємо його на позицію -50%
    setTimeout(function () {
      val.style.transition = "transform 1s ease"; // Плавний перехід
      val.style.transform = "translate(-50%, -50%)"; // Переміщаємо в центр екрану
    }, 2000); // Затримка на 2 секунди після підйому

    // Після цього змінюємо z-index, щоб модальне вікно було вище обох
    setTimeout(function () {
      val.style.zIndex = "6"; // Підвищуємо z-index для #val
    }, 3000); // Затримка 3 секунди перед зміною z-index

    // Збільшення розміру валу після ще однієї затримки
    setTimeout(function () {
      valBox.style.transition = "width 1s ease, height 1s ease";
      valBox.style.width = "800px"; // Збільшення ширини
      valBox.style.height = "500px"; // Збільшення висоти
    }, 3500); // Затримка на 3.5 секунди перед збільшенням розміру

    // Повертаємо z-index для #con2, коли лист повністю з'явиться
    setTimeout(function () {
      con2.style.zIndex = "1"; // Повертаємо z-index для #con2
    }, 5000); // Повертаємо знову через 5 секунд
  }
  setTimeout(function () {
    const pElement = document.querySelector("#val_box p"); // Знаходимо <p> в #val_box
    pElement.style.fontSize = "30px"; // Змінюємо розмір шрифта на 30px
  }, 5500); // Затримка перед зміною шрифта, можна змінити час
  
});
