// js/data/python/m_if_else.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_if_else",
    icon: "ri-git-branch-line",
    color: "#f59e0b", // Amber/Orange color
    title: "Умови (if / else)",
    desc: "Як навчити програму думати: if, else, elif, порівняння та логічні оператори.",
    tasks: [
      
      // ====== ЧАСТИНА 1: Базовий if та відступи ======

      {
        title: "1. Проста умова (if)",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Якщо ..., то ...</h2>
          <p>Щоб програма могла приймати рішення, ми використовуємо команду <b><code>if</code></b> (з англійської — "якщо").</p>
          <p>Після <code>if</code> ми пишемо умову, а в кінці рядка <b>ОБОВ'ЯЗКОВО ставимо двокрапку <code>:</code></b>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">score = 100<br>if score > 50:<br>    print("Ти переміг!")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Ти переміг!</div>
        `,
        desc: `Створи змінну <code>hp = 10</code>. Зроби перевірку: якщо <code>hp > 0</code>, надрукуй <code>Гравець живий</code>.`,
        hint: `
          1) hp = 10
          2) if hp > 0:
          3) На наступному рядку зроби відступ (4 пробіли або Tab) і напиши print("Гравець живий")
        `,
        expected: `Гравець живий`,
        tests: [
          { type: "stdoutEquals", name: "Правильний вивід", value: "Гравець живий", normalize: "soft" },
          { type: "codeRegex", name: "Використано if", pattern: "if\\s+hp\\s*>\\s*0\\s*:" }
        ]
      },

      {
        title: "2. Магія відступів",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Відступи (Indentation)</h2>
          <p>У Python відступи (пробіли зліва) — це не просто для краси. Вони показують, які саме команди знаходяться ВСЕРЕДИНІ умови <code>if</code>.</p>
          <p>Зазвичай це <b>4 пробіли</b> (або клавіша Tab).</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">if 5 > 2:<br>    print("Це всередині if")<br>    print("Це теж")<br>print("А це вже зовні, виконається завжди")</div>
        `,
        desc: `Зчитай число від користувача: <code>money = int(input())</code>. Якщо <code>money > 1000</code>, надрукуй два рядки (кожен з нового <code>print</code>):<br>
        1 рядок: <code>Ти багатий!</code><br>
        2 рядок: <code>Можеш купити дракона</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> у віконці введи число <b>5000</b>.
        </div>`,
        hint: `
          1) Зчитай money через int(input()).
          2) Напиши if money > 1000:
          3) Зроби відступи для ОБОХ print(), щоб вони виконалися лише тоді, коли грошей багато.
        `,
        expected: `Ти багатий!\nМожеш купити дракона`,
        tests: [
          { type: "stdoutEquals", name: "Два рядки виведено", value: "Ти багатий!\nМожеш купити дракона", normalize: "soft" },
          { type: "codeRegex", name: "Використано if", pattern: "if\\s+.*:" }
        ]
      },

      {
        title: "3. Інакше (else)",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Два шляхи: if / else</h2>
          <p>Що робити, якщо умова НЕ виконалася? Для цього є команда <b><code>else:</code></b> (інакше). Вона ловить усі інші випадки.</p>
          <p>Зверни увагу: <code>else:</code> пишеться БЕЗ умови (просто слово і двокрапка) і на тому ж рівні відступу, що й <code>if</code>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">age = 15<br>if age > 18:<br>    print("Доступ дозволено")<br>else:<br>    print("Доступ заборонено")</div>
        `,
        desc: `Зчитай вік: <code>age = int(input())</code>. Якщо <code>age > 12</code>, виведи <code>Можна грати</code>. <b>Інакше</b> виведи <code>Замалий вік</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> у віконці введи <b>10</b>. (Очікується: Замалий вік).
        </div>`,
        hint: `
          1) if age > 12:
          2)     print(...)
          3) else: (на одному рівні з if)
          4)     print(...)
        `,
        expected: `Замалий вік`,
        tests: [
          { type: "stdoutEquals", name: "Спрацював else", value: "Замалий вік", normalize: "soft" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      // ====== ЧАСТИНА 2: Порівняння ======

      {
        title: "4. Перевірка на рівність (==)",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Два дорівнює? ==</h2>
          <p>Один знак <code>=</code> означає <b>покласти</b> значення у змінну (x = 5).<br>
          Два знаки <code>==</code> означають <b>перевірити</b>, чи рівні значення між собою (чи x дорівнює 5?).</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">password = input()<br>if password == "12345":<br>    print("Увійшли!")<br>else:<br>    print("Помилка")</div>
        `,
        desc: `Зчитай слово: <code>answer = input()</code>. Якщо воно дорівнює <code>"Пітон"</code> (використай <code>==</code>), виведи <code>Правильно!</code>. Інакше виведи <code>Помилка</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи <b>Пітон</b>.
        </div>`,
        hint: `
          1) answer = input() (без int, бо це текст!)
          2) if answer == "Пітон":
        `,
        expected: `Правильно!`,
        tests: [
          { type: "stdoutEquals", name: "Перевірка пройдена", value: "Правильно!", normalize: "soft" },
          { type: "codeIncludes", name: "Використано == (два дорівнює)", value: "==" }
        ]
      },

      {
        title: "5. Не дорівнює (!=)",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Знак оклику означає "НІ"</h2>
          <p>Щоб перевірити, чи значення <b>НЕ рівні</b>, використовують знак <code>!=</code>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">status = "Отруєно"<br>if status != "Норма":<br>    print("Треба випити зілля!")</div>
        `,
        desc: `Зчитай ім'я: <code>user = input()</code>. Якщо воно <b>НЕ дорівнює</b> <code>"Адмін"</code>, виведи <code>Ти звичайний гравець</code>. Інакше виведи <code>Вітаю, бос</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи <b>Антон</b>. (Очікується: Ти звичайний гравець).
        </div>`,
        hint: `
          1) if user != "Адмін":
          2) Надрукуй текст для звичайного гравця.
          3) У блоці else надрукуй текст для Адміна.
        `,
        expected: `Ти звичайний гравець`,
        tests: [
          { type: "stdoutEquals", name: "Правильний вивід", value: "Ти звичайний гравець", normalize: "soft" },
          { type: "codeIncludes", name: "Використано != (не дорівнює)", value: "!=" }
        ]
      },

      // ====== ЧАСТИНА 3: Багато умов (elif) ======

      {
        title: "6. Кілька варіантів (elif)",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Коли варіантів більше ніж два</h2>
          <p>Якщо у нас є три шляхи (наприклад, світлофор: червоний, жовтий, зелений), ми використовуємо <b><code>elif</code></b> (скорочено від "else if").</p>
          <p>Він перевіряється тільки якщо перший <code>if</code> не спрацював.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">color = "жовтий"<br>if color == "червоний":<br>    print("Стій")<br>elif color == "жовтий":<br>    print("Чекай")<br>else:<br>    print("Йди")</div>
        `,
        desc: `Зчитай число: <code>points = int(input())</code>.<br>
        Якщо <code>points > 50</code>, виведи <code>Золото</code>.<br>
        Якщо <code>points > 20</code> (але менше або дорівнює 50), виведи <code>Срібло</code> (використай elif).<br>
        Інакше (else) виведи <code>Бронза</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи <b>30</b>. Очікується: Срібло.
        </div>`,
        hint: `
          1) if points > 50:
          2) elif points > 20:
          3) else:
        `,
        expected: `Срібло`,
        tests: [
          { type: "stdoutEquals", name: "Спрацював elif", value: "Срібло", normalize: "soft" },
          { type: "codeRegex", name: "Є elif", pattern: "elif\\s+.*:" }
        ]
      },

      // ====== ЧАСТИНА 4: Логічні оператори (and / or) ======

      {
        title: "7. Обидві умови (and)",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Оператор and (ТА)</h2>
          <p>Іноді дія має відбутися тільки якщо <b>обидві умови правдиві</b>. Для цього між ними пишуть слово <code>and</code>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">hp = 100<br>key = "є"<br>if hp > 0 and key == "є":<br>    print("Ти відкрив двері!")</div>
        `,
        desc: `Створи <code>lvl = int(input())</code> та <code>coins = int(input())</code>. Якщо рівень більше 5 <b>ТА</b> монет більше 100, виведи <code>Куплено супер-меч</code>. Інакше виведи <code>Не вистачає ресурсів</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи <b>6</b>, потім <b>150</b>.
        </div>`,
        hint: `
          if lvl > 5 and coins > 100:
              print(...)
          else:
              print(...)
        `,
        expected: `Куплено супер-меч`,
        tests: [
          { type: "stdoutEquals", name: "Умова and спрацювала", value: "Куплено супер-меч", normalize: "soft" },
          { type: "codeRegex", name: "Використано and", pattern: "\\band\\b" }
        ]
      },

      {
        title: "8. Хоча б одне (or)",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Оператор or (АБО)</h2>
          <p>Якщо нам підходить <b>хоча б один</b> з варіантів, ми використовуємо <code>or</code>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">day = "Субота"<br>if day == "Субота" or day == "Неділя":<br>    print("Вихідний!")</div>
        `,
        desc: `Зчитай роль: <code>role = input()</code>. Якщо роль дорівнює <code>"Адмін"</code> <b>АБО</b> роль дорівнює <code>"Модератор"</code>, виведи <code>Доступ до панелі</code>. Інакше виведи <code>Доступ закрито</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи <b>Модератор</b>.
        </div>`,
        hint: `
          if role == "Адмін" or role == "Модератор":
              ...
        `,
        expected: `Доступ до панелі`,
        tests: [
          { type: "stdoutEquals", name: "Умова or спрацювала", value: "Доступ до панелі", normalize: "soft" },
          { type: "codeRegex", name: "Використано or", pattern: "\\bor\\b" }
        ]
      },

      {
        title: "9. Парне чи непарне?",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Залишок від ділення (%)</h2>
          <p>У програмуванні є крутий математичний знак <code>%</code>. Він повертає <b>залишок від ділення</b>.</p>
          <p>Якщо число поділити на 2, і залишок буде 0 (<code>x % 2 == 0</code>) — значить воно <b>парне</b> (2, 4, 10). Якщо залишок 1 — <b>непарне</b>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">x = 10<br>if x % 2 == 0:<br>    print("Парне")</div>
        `,
        desc: `Зчитай число <code>num = int(input())</code>. Якщо залишок від ділення на 2 дорівнює 0, виведи <code>Парне</code>. Інакше виведи <code>Непарне</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи <b>7</b>. (Очікується: Непарне).
        </div>`,
        hint: `
          if num % 2 == 0:
              ...
          else:
              ...
        `,
        expected: `Непарне`,
        tests: [
          { type: "stdoutEquals", name: "Перевірка непарного", value: "Непарне", normalize: "soft" },
          { type: "codeIncludes", name: "Використано %", value: "%" }
        ]
      },

      // ====== ЧАСТИНА 5: Підсумкові завдання ======

      {
        title: "Підсумкова 1: Калькулятор оцінок",
        xp: 220,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Перевірка: Багато умов</h2>
          <p>Час поєднати if, elif та else для створення шкільної системи оцінювання.</p>
        `,
        desc: `Зчитай бал <code>mark = int(input())</code>.<br>
        Якщо <code>mark >= 10</code>, виведи <code>Відмінно</code>.<br>
        Якщо <code>mark >= 7</code> (і до 9 включно), виведи <code>Добре</code> (через elif).<br>
        Якщо <code>mark >= 4</code>, виведи <code>Задовільно</code>.<br>
        Інакше виведи <code>Погано</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи <b>8</b>. (Очікується: Добре).
        </div>`,
        hint: `
          if mark >= 10:
              ...
          elif mark >= 7:
              ...
          elif mark >= 4:
              ...
          else:
              ...
        `,
        expected: `Добре`,
        tests: [
          { type: "stdoutEquals", name: "Виведено Добре", value: "Добре", normalize: "soft" },
          { type: "codeRegex", name: "Є декілька elif", pattern: "elif\\s+.*:", flags: "g", min: 2 }
        ]
      },

      {
        title: "Підсумкова 2: Система логіна",
        xp: 250,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Перевірка: Логічне ТА (and)</h2>
          <p>Справжні сайти перевіряють одночасно і логін, і пароль.</p>
        `,
        desc: `Зчитай логін: <code>login = input()</code>. Зчитай пароль: <code>pwd = input()</code>.<br>
        Якщо логін дорівнює <code>"admin"</code> ТА пароль дорівнює <code>"qwerty"</code>, виведи <code>Секретні дані</code>.<br>
        Інакше виведи <code>Хто ти такий?</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи логін <b>admin</b>, а потім пароль <b>123</b> (неправильний). Очікується: Хто ти такий?.
        </div>`,
        hint: `
          if login == "admin" and pwd == "qwerty":
              print(...)
          else:
              print(...)
        `,
        expected: `Хто ти такий?`,
        tests: [
          { type: "stdoutEquals", name: "Відмова при поганому паролі", value: "Хто ти такий?", normalize: "soft" },
          { type: "codeRegex", name: "Перевірка обох умов", pattern: "\\band\\b" }
        ]
      },

      {
        title: "Підсумкова 3: Текстовий квест",
        xp: 350,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Фінальний іспит: Свобода вибору</h2>
          <p>Напишемо міні-гру, де вибір гравця (1 або 2) визначає його долю!</p>
        `,
        desc: `Виведи текст: <code>Перед тобою 2 двері (1 або 2). Куди підеш?</code><br>
        Зчитай вибір як число: <code>choice = int(input())</code>.<br>
        Якщо <code>choice == 1</code>, виведи: <code>Там був скарб!</code><br>
        Якщо <code>choice == 2</code>, виведи: <code>Тебе з'їв зомбі.</code><br>
        Інакше (якщо ввели інше число), виведи: <code>Ти стоїш на місці.</code><br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи <b>1</b>. (Врахуй, що програма має вивести спочатку питання, а потім результат).
        </div>`,
        hint: `
          1) print("Перед тобою 2 двері (1 або 2). Куди підеш?")
          2) choice = int(input())
          3) if ... elif ... else ...
        `,
        expected: `Перед тобою 2 двері (1 або 2). Куди підеш?\nТам був скарб!`,
        tests: [
          { type: "stdoutEquals", name: "Шлях номер 1 пройдено", value: "Перед тобою 2 двері (1 або 2). Куди підеш?\nТам був скарб!", normalize: "soft" },
          { type: "codeRegex", name: "Є if", pattern: "if\\s+.*:" },
          { type: "codeRegex", name: "Є elif", pattern: "elif\\s+.*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      }

    ]
  };

  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
