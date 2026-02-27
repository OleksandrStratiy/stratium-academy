// js/data/python/m_variables.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_variables",
    icon: "ri-code-s-slash-line",
    color: "#8b5cf6",
    title: "Змінні",
    desc: "Збереження значень, рядки, оновлення, конкатенація та круті обчислення.",
    tasks: [
      
      // ====== ЧАСТИНА 1: Створення та базове використання ======

      {
        title: "Моя перша змінна",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Змінна — це “коробка” для даних</h2>
          <p>У програмуванні нам часто потрібно запам'ятовувати числа або текст, щоб використати їх пізніше. Для цього ми створюємо змінні.</p>
          <p>Ми придумуємо ім'я змінної і кладемо в неї значення за допомогою знаку <code>=</code>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">age = 12<br>print(age)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">12</div>
          <p class="mutedish tiny">Зверни увагу: коли ми виводимо змінну через print(), ми <b>не</b> ставимо лапки навколо її імені. Інакше надрукується саме слово, а не те, що сховано всередині!</p>
        `,
        desc: "Створи змінну з іменем points, поклади туди число 500 і виведи її значення на екран.",
        hint: `
          1) На першому рядку придумай "коробку" з назвою points і через дорівнює поклади туди 500.
          2) На другому рядку використай команду для виводу і передай їй назву твоєї коробки (без лапок).
        `,
        expected: `500`,
        tests: [
          { type: "stdoutEquals", name: "Вивід 500", value: "500", normalize: "soft" },
          { type: "codeRegex", name: "Створено змінну points", pattern: "points\\s*=" },
          { type: "codeIncludes", name: "Є print", value: "print(" }
        ]
      },

      {
        title: "Змінні з текстом (Рядки)",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Текст любить лапки</h2>
          <p>Змінні можуть зберігати не лише числа, а й слова чи цілі речення. Текст у програмуванні називається <b>рядком</b> (string).</p>
          <p>Головне правило: будь-який текст завжди береться в лапки (одинарні або подвійні). Якщо забути лапки, Python подумає, що це назва іншої змінної, і видасть помилку.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">hero_name = "Бетмен"<br>print(hero_name)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Бетмен</div>
        `,
        desc: "Створи змінну pet і збережи в ній текст \"Дракон\". Потім виведи цю змінну на екран.",
        hint: `
          1) Створи змінну pet.
          2) Значенням має бути слово Дракон обов'язково у лапках!
          3) Надрукуй змінну.
        `,
        expected: `Дракон`,
        tests: [
          { type: "stdoutEquals", name: "Вивід слова", value: "Дракон", normalize: "soft" },
          { type: "codeRegex", name: "Створено змінну pet", pattern: "pet\\s*=" },
          { type: "codeIncludes", name: "Є print", value: "print(" }
        ]
      },

      {
        title: "Текст + Змінна разом",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Друкуємо кілька елементів</h2>
          <p>Команда <code>print()</code> дуже розумна. Вона може надрукувати звичайний текст і значення змінної в одному рядку, якщо перелічити їх через кому.</p>
          <p>Python автоматично поставить пробіл замість коми.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">score = 100<br>print("Мій рахунок:", score)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Мій рахунок: 100</div>
        `,
        desc: "Створи змінну level зі значенням 5. Виведи на екран фразу: Поточний рівень: 5 (використай кому у print).",
        hint: `
          1) Змінна level отримує число 5.
          2) У print() напиши дві речі: спочатку текст "Поточний рівень:" (у лапках), потім постав кому, і напиши ім'я змінної (без лапок).
        `,
        expected: `Поточний рівень: 5`,
        tests: [
          { type: "stdoutEquals", name: "Правильний вивід", value: "Поточний рівень: 5", normalize: "soft" },
          { type: "codeRegex", name: "Є змінна level", pattern: "level\\s*=" },
          { type: "codeIncludes", name: "Використано кому", value: "," }
        ]
      },

      {
        title: "Перезапис змінної",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Чому змінна називається "змінною"?</h2>
          <p>Тому що її значення можна змінювати! Якщо ти покладеш у змінну нове значення, старе назавжди зітреться (перезапишеться).</p>
          <p>Програма виконується згори донизу, рядок за рядком.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">color = "Червоний"<br>color = "Синій"<br>print(color)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Синій</div>
          <p class="mutedish tiny">Виведеться "Синій", бо це значення було покладено останнім.</p>
        `,
        desc: "Створи змінну weather і збережи текст \"Дощ\". На наступному рядку перезапиши її, зберігши текст \"Сонце\". Виведи weather.",
        hint: `
          1) На першому рядку: weather дорівнює "Дощ".
          2) На другому рядку: знову пишеш weather дорівнює, але вже "Сонце".
          3) На третьому рядку роздрукуй weather.
        `,
        expected: `Сонце`,
        tests: [
          { type: "stdoutEquals", name: "Вивід Сонце", value: "Сонце", normalize: "soft" },
          { type: "codeRegex", name: "Змінну weather створено/перезаписано", pattern: "weather\\s*=" }
        ]
      },

      // ====== ЧАСТИНА 2: Математика зі змінними ======

      {
        title: "Додавання змінних",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Математика в коробках</h2>
          <p>Ти можеш робити математичні дії прямо з іменами змінних. Python зазирне всередину кожної, дістане числа і виконає дію.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">a = 10<br>b = 5<br>print(a + b)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">15</div>
        `,
        desc: "Створи змінну apples зі значенням 8. Створи змінну pears зі значенням 4. Виведи їхню суму.",
        hint: `
          1) Створи apples.
          2) Створи pears.
          3) У print() використай знак плюс між назвами цих двох змінних.
        `,
        expected: `12`,
        tests: [
          { type: "stdoutEquals", name: "Правильний результат", value: "12", normalize: "soft" },
          { type: "codeRegex", name: "Змінна apples", pattern: "apples\\s*=" },
          { type: "codeRegex", name: "Змінна pears", pattern: "pears\\s*=" },
          { type: "codeIncludes", name: "Використано додавання (+)", value: "+" }
        ]
      },

      {
        title: "Третя змінна — результат",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Зберігаємо результати обчислень</h2>
          <p>Замість того, щоб рахувати всередині <code>print()</code>, ми можемо створити третю змінну, яка збереже результат математичної дії.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">hp = 100<br>damage = 15<br>hp_left = hp - damage<br>print(hp_left)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">85</div>
        `,
        desc: "Є бюджет: budget = 500. Ти купуєш гру: game_price = 350. Створи змінну money_left, яка дорівнює budget мінус game_price. Виведи money_left.",
        hint: `
          1) Задай budget.
          2) Задай game_price.
          3) Створи money_left, після дорівнює напиши формулу віднімання змінних.
          4) Виведи money_left.
        `,
        expected: `150`,
        tests: [
          { type: "stdoutEquals", name: "Правильна здача", value: "150", normalize: "soft" },
          { type: "codeRegex", name: "Змінна budget", pattern: "budget\\s*=" },
          { type: "codeRegex", name: "Змінна money_left", pattern: "money_left\\s*=" },
          { type: "codeIncludes", name: "Використано віднімання (-)", value: "-" }
        ]
      },

      {
        title: "Множення змінних",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Рахуємо площу</h2>
          <p>Знак множення у Python — це зірочка <code>*</code>. Ми можемо перемножувати змінні так само легко, як і додавати.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">width = 5<br>height = 4<br>area = width * height<br>print(area)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">20</div>
        `,
        desc: "Створи змінну days = 7 і hours = 24. Створи змінну total_hours, яка є результатом множення днів на години. Виведи total_hours.",
        hint: `
          1) Задай days та hours.
          2) Створи total_hours, де перемножиш їх.
          3) Роздрукуй фінальну змінну.
        `,
        expected: `168`,
        tests: [
          { type: "stdoutEquals", name: "Правильний час", value: "168", normalize: "soft" },
          { type: "codeRegex", name: "Змінна total_hours", pattern: "total_hours\\s*=" },
          { type: "codeIncludes", name: "Множення (*)", value: "*" }
        ]
      },

      {
        title: "Оновлення: сам плюс сам",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Додаємо до того, що вже є</h2>
          <p>Як збільшити рахунок гравця на 1? У математиці вираз <code>x = x + 1</code> не має сенсу, але у програмуванні це означає:</p>
          <p><i>"Візьми поточне значення x, додай до нього 1, і поклади результат назад у x"</i>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">score = 10<br>score = score + 5<br>print(score)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">15</div>
        `,
        desc: "Задай змінну coins = 100. На наступному рядку збільш її на 50 (запиши це як coins = coins + 50). Виведи coins.",
        hint: `
          1) Створи coins і поклади туди 100.
          2) Напиши команду оновлення: coins дорівнює coins плюс 50.
          3) Виведи результат.
        `,
        expected: `150`,
        tests: [
          { type: "stdoutEquals", name: "Результат 150", value: "150", normalize: "soft" },
          { type: "codeRegex", name: "Змінна coins", pattern: "coins\\s*=" },
          { type: "codeIncludes", name: "Використано плюс (+)", value: "+" }
        ]
      },

      {
        title: "Копіювання змінних",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>З коробки в коробку</h2>
          <p>Ми можемо присвоїти одній змінній значення іншої змінної. Це створить копію значення.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">player1 = 50<br>player2 = player1<br>print(player2)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">50</div>
        `,
        desc: "Створи змінну secret зі значенням 999. Створи другу змінну guess і присвой їй значення змінної secret. Виведи guess.",
        hint: `
          1) secret = 999
          2) guess = secret (ми кажемо: поклади в guess те, що лежить у secret).
          3) print(guess)
        `,
        expected: `999`,
        tests: [
          { type: "stdoutEquals", name: "Вивід копії", value: "999", normalize: "soft" },
          { type: "codeRegex", name: "Створено змінну guess", pattern: "guess\\s*=" }
        ]
      },

      {
        title: "Правильні імена (snake_case)",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Як називати змінні?</h2>
          <p>У Python є правила для імен змінних:</p>
          <ul>
            <li>Можна використовувати букви, цифри та нижнє підкреслення <code>_</code>.</li>
            <li>Ім'я НЕ може починатися з цифри.</li>
            <li>Пробіли заборонені!</li>
          </ul>
          <p>Програмісти зазвичай пишуть слова через підкреслення, щоб було зручно читати. Цей стиль називається <b>snake_case</b> (зміїний регістр).</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">my_best_score = 100</div>
        `,
        desc: "Створи змінну з правильним іменем player_speed (з підкресленням) і збережи в ній число 15. Виведи її.",
        hint: `
          Просто назви змінну player_speed (без пробілів), дай їй значення 15 і виведи.
        `,
        expected: `15`,
        tests: [
          { type: "stdoutEquals", name: "Правильний вивід", value: "15", normalize: "soft" },
          { type: "codeRegex", name: "Зміїний регістр", pattern: "player_speed\\s*=" }
        ]
      },

      // ====== ЧАСТИНА 3: Спеціальні операції (Конкатенація та Форматування) ======

      {
        title: "Конкатенація (Додавання рядків)",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Склеювання слів плюсом</h2>
          <p>Числа при додаванні стають сумою (5+5=10). А що буде, якщо "додати" два тексти? Вони просто склеяться докупи!</p>
          <p>Це називається <b>конкатенація</b>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">word1 = "Спайдер"<br>word2 = "-Мен"<br>print(word1 + word2)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Спайдер-Мен</div>
          <p class="mutedish tiny">Зверни увагу: плюс не додає пробіл автоматично. Він приліплює текст впритул!</p>
        `,
        desc: "Є змінні: part1 = \"Супер\" та part2 = \"герой\". Виведи їх суму за допомогою плюса (+).",
        hint: `
          1) Задай дві текстові змінні.
          2) У print напиши part1 + part2.
        `,
        expected: `Супергерой`,
        tests: [
          { type: "stdoutEquals", name: "Склеєний текст", value: "Супергерой", normalize: "soft" },
          { type: "codeRegex", name: "Створено змінну part1", pattern: "part1\\s*=" },
          { type: "codeRegex", name: "Створено змінну part2", pattern: "part2\\s*=" },
          { type: "codeIncludes", name: "Використано плюс (+)", value: "+" }
        ]
      },

      {
        title: "Множення рядка на число",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Клонування тексту</h2>
          <p>Python вміє множити текст на число! Якщо ти помножиш слово на 3, воно повториться тричі підряд.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">sound = "Ха"<br>print(sound * 3)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">ХаХаХа</div>
        `,
        desc: "Створи змінну block = \"[ ]\". Виведи цей блок помножений на 5 (щоб вийшов паркан).",
        hint: `
          1) block дорівнює текст "[ ]" у лапках.
          2) У print() напиши block * 5.
        `,
        expected: `[ ][ ][ ][ ][ ]`,
        tests: [
          { type: "stdoutEquals", name: "Правильний паркан", value: "[ ][ ][ ][ ][ ]", normalize: "soft" },
          { type: "codeRegex", name: "Створено змінну block", pattern: "block\\s*=" },
          { type: "codeIncludes", name: "Множення (*)", value: "*" }
        ]
      },

      {
        title: "Змінні та гнучкий sep",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Розділюємо змінні</h2>
          <p>Ми вже вчили <code>sep</code> для звичайного тексту. Він чудово працює і зі змінними! Він вказує, що поставити МІЖ змінними при виводі.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">x = 10<br>y = 20<br>print(x, y, sep=":")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">10:20</div>
        `,
        desc: "Створи a = 1, b = 2, c = 3. Виведи їх через print, але використай параметр sep=\"-\", щоб між ними стали дефіси.",
        hint: `
          1) Задай три змінні.
          2) Напиши print(a, b, c, sep="-")
          Зверни увагу, що коми ставляться між аргументами!
        `,
        expected: `1-2-3`,
        tests: [
          { type: "stdoutEquals", name: "Вивід з дефісами", value: "1-2-3", normalize: "soft" },
          { type: "codeRegex", name: "Використано sep", pattern: "sep\\s*=" }
        ]
      },

      {
        title: "Змінні та невидимий end",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Склеюємо різні print()</h2>
          <p>Параметр <code>end</code> теж круто працює зі змінними. Якщо ми не хочемо, щоб print переходив на новий рядок, ми додаємо <code>end=""</code>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">part1 = "Завантаження"<br>print(part1, end="")<br>print("...")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Завантаження...</div>
        `,
        desc: "Є змінна hp = 50. Використай ДВА рядки print(). Перший друкує фразу Здоров'я: (без нового рядка), другий друкує змінну hp. Щоб вийшло все в одному рядку.",
        hint: `
          1) hp = 50
          2) print("Здоров'я: ", end="") (зверни увагу на пробіл перед закриттям лапок у тексті)
          3) print(hp)
        `,
        expected: `Здоров'я: 50`,
        tests: [
          { type: "stdoutEquals", name: "Все в одному рядку", value: "Здоров'я: 50", normalize: "soft" },
          { type: "codeRegex", name: "Використано end", pattern: "end\\s*=" }
        ]
      },

      {
        title: "Складна формула",
        xp: 160,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Кілька действий в одному виразі</h2>
          <p>Змінні можна комбінувати у великі математичні формули. Згадай порядок дій (множення і ділення виконуються першими, потім додавання і віднімання).</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">price = 10<br>count = 3<br>tax = 5<br>total = price * count + tax<br>print(total)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">35</div>
          <p class="mutedish tiny">Спочатку 10 помножили на 3, а потім додали 5.</p>
        `,
        desc: "Створи змінні: base = 10, bonus = 2, multiplier = 3. Створи final_score, яке дорівнює base плюс bonus, і все це помножене на multiplier. Виведи final_score.",
        hint: `
          1) Задай три змінні.
          2) Створи final_score. Оскільки додавання має відбутися ПЕРЕД множенням, візьми base + bonus у круглі дужки!
          Формула: (base + bonus) * multiplier.
        `,
        expected: `36`,
        tests: [
          { type: "stdoutEquals", name: "Правильний підрахунок", value: "36", normalize: "soft" },
          { type: "codeRegex", name: "Змінна final_score", pattern: "final_score\\s*=" },
          { type: "codeIncludes", name: "Формула з дужками", value: "(" }
        ]
      },

      {
        title: "Своп (Обмін значень)",
        xp: 170,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Міняємо місцями</h2>
          <p>Уяви, що у тебе є склянка з водою (a) і склянка з соком (b). Як поміняти їхній вміст місцями? Потрібна третя, порожня склянка (temp)!</p>
          <p>У програмуванні це класична задача. Ми створюємо тимчасову змінну <code>temp</code>, щоб не втратити значення під час перезапису.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">a = 1<br>b = 2<br>temp = a<br>a = b<br>b = temp</div>
          <p class="mutedish tiny">Тепер a дорівнює 2, а b дорівнює 1!</p>
        `,
        desc: "Є змінні x = 10 та y = 99. Поміняй їхні значення місцями за допомогою третьої змінної temp. Потім виведи їх через кому (print(x, y)).",
        hint: `
          1) Задай x і y.
          2) Створи temp і поклади туди x.
          3) В x поклади y.
          4) В y поклади temp.
          5) Виведи x та y.
        `,
        expected: `99 10`,
        tests: [
          { type: "stdoutEquals", name: "Значення помінялись", value: "99 10", normalize: "soft" },
          { type: "codeRegex", name: "Використано temp", pattern: "temp\\s*=" },
          { type: "codeRegex", name: "Перезапис y", pattern: "y\\s*=" }
        ]
      },

      // ====== ЧАСТИНА 4: Підсумкові завдання (Тести) ======

      {
        title: "Підсумкова 1: Магазин (Математика + Текст)",
        xp: 220,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Перевірка: Змінні та Форматування</h2>
          <p>Час поєднати все, що ми вивчили! Математика зі змінними, вивід тексту і склеювання результату.</p>
        `,
        desc: "У тебе є gold = 200. Ти купуєш 3 мечі по 50 монет кожен (sword_price = 50). Створи змінну total_cost, вирахуй ціну трьох мечів. Створи змінну left, вирахуй скільки золота лишилося. Виведи рядок: Залишок: 50 (де 50 — це змінна left).",
        hint: `
          1) gold = 200, sword_price = 50.
          2) total_cost = sword_price * 3.
          3) left = gold - total_cost.
          4) print("Залишок:", left)
        `,
        expected: `Залишок: 50`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Залишок: 50", normalize: "soft" },
          { type: "codeRegex", name: "Змінна total_cost", pattern: "total_cost\\s*=" },
          { type: "codeRegex", name: "Змінна left", pattern: "left\\s*=" }
        ]
      },

      {
        title: "Підсумкова 2: Симулятор рівня",
        xp: 250,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Перевірка: Оновлення змінної</h2>
          <p>Тут ми перевіримо, як ти вмієш оновлювати одну і ту ж змінну кілька разів поспіль, імітуючи прогрес гравця.</p>
        `,
        desc: "Створи exp = 0 (досвід). Потім гравець вбиває монстра: збільш exp на 10. Потім знаходить скриню: збільш exp ще на 25. Виведи фінальний exp.",
        hint: `
          1) exp = 0
          2) exp = exp + 10
          3) exp = exp + 25 (оновлюємо ще раз)
          4) print(exp)
        `,
        expected: `35`,
        tests: [
          { type: "stdoutEquals", name: "Правильний досвід", value: "35", normalize: "soft" },
          { type: "codeRegex", name: "Створено/Оновлено exp", pattern: "exp\\s*=" }
        ]
      },

      {
        title: "Підсумкова 3: Бій з Босом",
        xp: 350,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Фінальний іспит (Міні-гра)</h2>
          <p>Ти маєш написати програму, яка розраховує статистику бою і друкує гарний звіт у два рядки!</p>
        `,
        desc: "Є бос: boss_hp = 100. Герой завдає шкоди: attack = 40. Створи змінну result_hp, віднявши шкоду від здоров'я боса. \nДалі надрукуй два рядки (через два print):\n1 рядок: Удар!\n2 рядок: Бос: 60 (де 60 - це змінна).",
        hint: `
          1) Змінні: boss_hp = 100, attack = 40.
          2) result_hp = boss_hp - attack.
          3) Перший print просто текст "Удар!".
          4) Другий print текст "Бос:" та змінна result_hp.
        `,
        expected: `Удар!\nБос: 60`,
        tests: [
          { type: "stdoutEquals", name: "Повний звіт", value: "Удар!\nБос: 60", normalize: "soft" },
          { type: "codeRegex", name: "Змінна result_hp", pattern: "result_hp\\s*=" },
          { type: "codeIncludes", name: "Виведено звіт", value: "print(" }
        ]
      }

    ]
  };

  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
