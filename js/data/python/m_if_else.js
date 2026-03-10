// js/data/python/m_if_else.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_if_else",
    title: "Умови: if / else",
    icon: "ri-split-cells-horizontal",
    color: "#ec4899",
    desc: "Вчимо програму приймати рішення! Оператори порівняння, розгалуження та блоки коду.",

    tasks: [
      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Базові умови та Відступи)
      // ==========================================

      {
        title: "Правда чи Брехня?",
        xp: 30,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Комп'ютер вміє відповідати</h2>
          <p>Перш ніж програма почне приймати рішення, вона має навчитися порівнювати речі. Для цього в Python є знаки <b>більше</b> <code>&gt;</code> та <b>менше</b> <code>&lt;</code>.</p>
          <p>Якщо ти запитаєш Python <code>5 &gt; 3</code>, він відповість <b style="color: #10b981;">True</b> (Правда). Якщо запитаєш <code>1 &gt; 10</code>, він відповість <b style="color: #ef4444;">False</b> (Брехня).</p>
          <div class="code-box">print(10 > 5)<br>print(2 < 1)</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">True<br>False</span>
          </div>
          <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 10px; margin-top: 10px;">
            <b style="color: #10b981;">Порада:</b> <code>True</code> та <code>False</code> — це спеціальні слова (булевий тип даних). Вони завжди пишуться з великої літери і БЕЗ лапок!
          </div>
        `,
        desc: "Давай перевіримо твій вік. Запитай: <code>age = int(input(\"Твій вік: \"))</code>. <br>На наступному рядку виведи результат порівняння: чи твій вік <b>більший за 18</b>? Використай <code>print(age > 18)</code>.",
        hint: `Тобі потрібно два рядки: один для вводу числа, інший для print з умовою > 18. Спробуй ввести 20, а потім 15, щоб побачити різні відповіді!`,
        expected: `Твій вік: 20\nTrue`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "age\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Порівняння > 18", pattern: "print\\s*\\(\\s*age\\s*>\\s*18\\s*\\)" }
        ]
      },

      {
        title: "Головна пастка: == чи =",
        xp: 35,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Як запитати \"Чи дорівнює?\"</h2>
          <p>В математиці ми використовуємо знак <b style="color: #3b82f6;"><code>=</code></b>. Але в Python цей знак вже зайнятий — він присвоює дані змінній (кладе їх у коробку)!</p>
          <p>Тому, щоб ПОРІВНЯТИ дві речі, ми використовуємо <b style="color: #f59e0b;">ПОДВІЙНЕ ДОРІВНЮЄ</b> <b style="color: #3b82f6;"><code>==</code></b>.</p>
          <div class="code-box">a = 5  <span style="color:gray;"># Поклали 5 у змінну 'a'</span><br>print(a == 5)  <span style="color:gray;"># ЗАПИТАЛИ: чи дорівнює 'a' п'яти? (True)</span></div>
          <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-top: 10px;">
            <b style="color: #ef4444;">⚠️ Обережно:</b> Найчастіша помилка новачків — писати <code>if x = 5:</code> замість <code>if x == 5:</code>. Запам'ятай: одне дорівнює — кладе, два — порівнює!
          </div>
        `,
        desc: "Запитай у користувача: <code>ans = int(input(\"Скільки буде 2 + 2? \"))</code>. <br>Виведи на екран результат порівняння: чи дорівнює <code>ans</code> числу <code>4</code>? (Використай <code>==</code> всередині <code>print</code>).",
        hint: `Просто напиши print(ans == 4). Обов'язково два знаки дорівнює!`,
        expected: `Скільки буде 2 + 2? 4\nTrue`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "ans\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Використано ==", pattern: "print\\s*\\(\\s*ans\\s*==\\s*4\\s*\\)" }
        ]
      },

      {
        title: "Вороги: Не дорівнює (!=)",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Протилежність</h2>
          <p>Іноді нам треба перевірити, чи дві речі РІЗНІ. Для цього є знак <b style="color: #3b82f6;"><code>!=</code></b> (читається як \"не дорівнює\"). Знак оклику означає заперечення.</p>
          <div class="code-box">print(10 != 5)  <span style="color:gray;"># Чи 10 НЕ дорівнює 5? (True)</span><br>print(3 != 3)   <span style="color:gray;"># Чи 3 НЕ дорівнює 3? (False, бо вони однакові)</span></div>
        `,
        desc: "Запитай: <code>pwd = input(\"Введи пароль: \")</code>. <br>Перевір, чи цей пароль <b>НЕ дорівнює</b> <code>\"1234\"</code>. Виведи результат за допомогою <code>print()</code>.",
        hint: `Твій другий рядок має бути: print(pwd != "1234"). (Пам'ятай про лапки для тексту!)`,
        expected: `Введи пароль: qwerty\nTrue`,
        tests: [
          { type: "codeRegex", name: "Ввід як текст", pattern: "pwd\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано !=", pattern: "print\\s*\\(\\s*pwd\\s*!=\\s*['\"]1234['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Більше або дорівнює (>=)",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Включні межі</h2>
          <p>Якщо для проходження тесту треба набрати мінімум 50 балів, то учень з рівно 50 балами також здає! Умова <code>score > 50</code> тут не спрацює (бо 50 не більше за 50).</p>
          <p>Ми використовуємо комбінацію <b style="color: #3b82f6;"><code>&gt;=</code></b> (більше або дорівнює) та <b style="color: #3b82f6;"><code>&lt;=</code></b> (менше або дорівнює).</p>
          <div class="code-box">score = 50<br>print(score >= 50)  <span style="color:gray;"># True!</span></div>
        `,
        desc: "Запитай <code>score = int(input(\"Твої бали: \"))</code>. <br>Виведи порівняння: чи <code>score</code> більше АБО дорівнює <code>50</code>?",
        hint: `print(score >= 50)`,
        expected: `Твої бали: 50\nTrue`,
        tests: [
          { type: "codeRegex", name: "Ввід score", pattern: "score\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Використано >=", pattern: "print\\s*\\(\\s*score\\s*>=\\s*50\\s*\\)" }
        ]
      },

      {
        title: "Перший if (Умова)",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Нарешті логіка!</h2>
          <p>Тепер ми навчимо програму діяти залежно від ситуації. Для цього є слово <b style="color: #f59e0b;"><code>if</code></b> (з англ. <i>якщо</i>).</p>
          <div class="code-box"><b style="color: #f59e0b;">if</b> 10 > 5<b style="color: #10b981;">:</b><br>    print("Десять більше!")</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Десять більше!</span>
          </div>
          <p>Зверни увагу на два суперважливих правила:</p>
          <ol>
            <li>В кінці умови ЗАВЖДИ ставиться <b style="color: #10b981;">двокрапка <code>:</code></b>. Це означає "тоді зроби наступне".</li>
            <li>Наступний рядок має бути зміщений вправо (натисни <kbd>Tab</kbd> або 4 пробіли). Це називається <b>відступ (indentation)</b>.</li>
          </ol>
        `,
        desc: "Запитай <code>money = int(input(\"Гроші: \"))</code>. <br>Напиши умову: <code>if money > 1000:</code><br>На наступному рядку (зробивши відступ!) виведи текст <code>\"Ти багач!\"</code>.",
        hint: `Рядок з print має бути посунутий вправо. Якщо працюєш з телефона, постав 4 пробіли перед словом print.`,
        expected: `Гроші: 2000\nТи багач!`,
        tests: [
          { type: "codeRegex", name: "Ввід money", pattern: "money\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Є if з двокрапкою", pattern: "if\\s*money\\s*>\\s*1000\\s*:" },
          { type: "codeRegex", name: "Є відступ (пробіли перед print)", pattern: "\\n\\s+print\\s*\\(\\s*['\"]Ти багач!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Забута двокрапка",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Синтаксична помилка</h2>
          <p>Найчастіша помилка першого дня — забути двокрапку в кінці <code>if</code>. Без неї Python не розуміє, де закінчилася умова і почалася дія.</p>
          <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-top: 10px;">
            <b style="color: #ef4444;">Помилка:</b> <code>SyntaxError: expected ':'</code>
          </div>
        `,
        desc: `Твій друг написав код, але він не працює:<br>
<code>if 5 == 5</code><br>
<code>    print(\"П'ять дорівнює п'яти!\")</code><br>
Виправ цей код, просто додавши двокрапку в потрібне місце.`,
        hint: `Двокрапка ставиться в самому кінці першого рядка, одразу після п'ятірки.`,
        expected: `П'ять дорівнює п'яти!`,
        tests: [
          { type: "codeRegex", name: "Додано двокрапку", pattern: "if\\s*5\\s*==\\s*5\\s*:" },
          { type: "codeRegex", name: "Print залишився", pattern: "print" }
        ]
      },

      {
        title: "Пастка відступів (Indentation)",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Блоки коду та відступи</h2>
          <p>Як Python розуміє, які команди належать до <code>if</code>, а які потрібно виконувати незалежно від умови?</p>
          <p>Для цього він використовує <b>відступи</b> (пробіли зліва від тексту). Усе, що візуально зсунуте вправо під <code>if</code> (зазвичай на 4 пробіли), вважається його внутрішньою частиною (блоком коду). Щойно ти напишеш команду з початку рядка (без відступу) — блок <code>if</code> закінчиться.</p>
          <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-top: 10px;">
            <b style="color: #ef4444;">Помилка:</b> <code>IndentationError: expected an indented block</code> — означає, що ти написав if, але забув зробити відступ на наступному рядку!
          </div>
          <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 10px; margin-top: 10px;">
            <b style="color: #10b981;">Цікавий факт:</b> У деяких інших мовах програмування (наприклад, C++ або JavaScript) для об'єднання команд у блок використовують спеціальні фігурні дужки <code>{}</code>. Але творці Python вирішили, що код має виглядати чисто і читатися як звичайний текст!
          </div>
        `,
        desc: `Ще один зламаний код:<br>
<code>if 10 > 2:</code><br>
<code>print(\"Відступів немає!\")</code><br>
Виправ його, додавши відступ (4 пробіли) перед <code>print</code>.`,
        hint: `Просто постав курсор перед словом print і натисни пробіл 4 рази.`,
        expected: `Відступів немає!`,
        tests: [
          { type: "codeRegex", name: "Додано відступ", pattern: "\\n\\s+print" }
        ]
      },

      {
        title: "Поєднання input та if",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Динамічні умови</h2>
          <p>Справжня магія починається, коли ми перевіряємо не просто <code>5 > 3</code>, а дані, які щойно ввів користувач!</p>
          <div class="code-box">lvl = int(input("Твій рівень: "))<br>if lvl >= 10:<br>    print("Доступ до турніру відкрито!")</div>
        `,
        desc: "Запитай <code>age = int(input(\"Вік: \"))</code>. <br>Напиши умову: якщо <code>age >= 18</code>, виведи <code>\"Ти дорослий!\"</code>.",
        hint: `Не забудь int() для інпуту, бо ми будемо порівнювати з числом 18. Після if не забудь двокрапку і відступ.`,
        expected: `Вік: 20\nТи дорослий!`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "age\\s*=\\s*int\\s*\\(\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Умова if", pattern: "if\\s*age\\s*>=\\s*18\\s*:" },
          { type: "codeRegex", name: "Вивід з відступом", pattern: "\\n\\s+print\\s*\\(\\s*['\"]Ти дорослий!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Пароль (Порівняння тексту)",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Текст також можна порівнювати</h2>
          <p>Оператор <code>==</code> чудово працює з текстом. Але пам'ятай: текст завжди має бути в лапках!</p>
          <div class="code-box">ans = input("2 + 2 = ? ")<br>if ans == "4":<br>    print("Правильно!")</div>
        `,
        desc: "Створи систему безпеки. Запитай <code>pwd = input(\"Пароль: \")</code>. (Тут <code>int()</code> НЕ треба!).<br>Напиши умову: якщо пароль дорівнює <code>\"qwerty\"</code>, виведи <code>\"Доступ відкрито\"</code>.",
        hint: `if pwd == "qwerty": (обов'язково слово в лапках!)`,
        expected: `Пароль: qwerty\nДоступ відкрито`,
        tests: [
          { type: "codeRegex", name: "Ввід як текст", pattern: "pwd\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Умова if з ==", pattern: "if\\s*pwd\\s*==\\s*['\"]qwerty['\"]\\s*:" },
          { type: "codeRegex", name: "Вивід з відступом", pattern: "\\n\\s+print\\s*\\(\\s*['\"]Доступ відкрито['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Кілька if підряд",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Окремі перевірки</h2>
          <p>Ти можеш написати стільки умов <code>if</code>, скільки захочеш. Вони будуть перевірятися одна за одною, абсолютно незалежно.</p>
          <div class="code-box">hp = 20<br>if hp < 50:<br>    print("Мало здоров'я!")<br>if hp < 30:<br>    print("Терміново шукай аптечку!")</div>
          <p>Оскільки 20 менше і за 50, і за 30, спрацюють <b>обидва</b> принти.</p>
        `,
        desc: "Запитай <code>money = int(input(\"Гроші: \"))</code>. <br>Напиши дві ОКРЕМІ умови:<br>1. Якщо <code>money > 100</code>, виведи <code>\"Ти багатий!\"</code><br>2. Якщо <code>money == 1000000</code>, виведи <code>\"Ти мільйонер!\"</code>",
        hint: `У тебе має бути два блоки if, кожен починається з початку рядка (без відступів), а от принти під ними — з відступами.`,
        expected: `Гроші: 1000000\nТи багатий!\nТи мільйонер!`,
        tests: [
          { type: "codeRegex", name: "Перший if", pattern: "if\\s*money\\s*>\\s*100\\s*:" },
          { type: "codeRegex", name: "Другий if", pattern: "if\\s*money\\s*==\\s*1000000\\s*:" },
          { type: "codeRegex", name: "Два принти", pattern: "print.*print", flags: "s" }
        ]
      },

      {
        title: "А інакше що? (else)",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Альтернативний шлях</h2>
          <p>Що робити, якщо умова в <code>if</code> виявилася Брехнею (False)? Якщо ми хочемо дати запасний план, ми використовуємо слово <b style="color: #ef4444;"><code>else:</code></b> (з англ. <i>інакше</i>).</p>
          <div class="code-box">if 10 > 50:<br>    print("Більше")<br><b style="color: #ef4444;">else:</b><br>    print("Менше")</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Менше</span>
          </div>
          <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 10px; margin-top: 10px;">
            <b style="color: #10b981;">Правила else:</b><br>
            1. <code>else</code> пишеться на тому ж рівні, що й <code>if</code> (без відступу).<br>
            2. Після <code>else</code> <b>завжди ставиться двокрапка <code>:</code></b>.<br>
            3. Біля <code>else</code> НІКОЛИ не пишеться умова (воно просто ловить все, що не підійшло під if).
          </div>
        `,
        desc: "Запитай здоров'я гравця: <code>hp = int(input(\"Здоров'я: \"))</code>. <br>Напиши: якщо <code>hp > 0</code>, виведи <code>\"Ти живий!\"</code>.<br>Інакше (<code>else:</code>) виведи <code>\"Game Over\"</code>.",
        hint: `if hp > 0:\n    print(...)\nelse:\n    print(...)`,
        expected: `Здоров'я: 0\nGame Over`,
        tests: [
          { type: "codeRegex", name: "Ввід hp", pattern: "hp\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Умова if", pattern: "if\\s*hp\\s*>\\s*0\\s*:" },
          { type: "codeRegex", name: "Блок else з двокрапкою", pattern: "^else\\s*:", flags: "m" },
          { type: "codeRegex", name: "Відступи є", pattern: "\\n\\s+print.*\\nelse\\s*:.*\\n\\s+print", flags: "s" }
        ]
      },

      {
        title: "Магазин: Вистачить грошей?",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Реальний сценарій</h2>
          <p>У більшості ігор купівля предметів працює саме через <code>if / else</code>.</p>
        `,
        desc: "Запитай <code>money = int(input(\"Твої гроші: \"))</code>. <br>Меч коштує 150 монет. <br>Напиши умову: якщо <code>money >= 150</code>, виведи <code>\"Меч куплено!\"</code>. <br>Інакше (<code>else:</code>) виведи <code>\"Не вистачає золота\"</code>.",
        hint: `if money >= 150: ... else: ...`,
        expected: `Твої гроші: 100\nНе вистачає золота`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "money\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Умова >=", pattern: "if\\s*money\\s*>=\\s*150\\s*:" },
          { type: "codeRegex", name: "Блок else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Таємне слово (if-else з текстом)",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Фейс-контроль</h2>
          <p>Комбінуємо <code>==</code>, текст і <code>else</code>.</p>
        `,
        desc: "Запитай <code>word = input(\"Секретне слово: \")</code>. <br>Якщо слово дорівнює <code>\"магія\"</code>, виведи <code>\"Проходь!\"</code>.<br>Інакше — виведи <code>\"Ти шпигун!\"</code>.",
        hint: `if word == "магія": ... else: ...`,
        expected: `Секретне слово: (ввід)\n(результат)`,
        tests: [
          { type: "codeRegex", name: "if слово", pattern: "if\\s*word\\s*==\\s*['\"]магія['\"]\\s*:" },
          { type: "codeRegex", name: "else є", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Життя після if (Рівні відступів)",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Де закінчується блок?</h2>
          <p>Блок коду всередині <code>if</code> триває доти, доки тривають відступи. Як тільки ти пишеш код <b>без відступу</b> (на тому ж рівні, що й слово <code>if</code>), програма вважає, що умова закінчилася, і цей код виконається ЗАВЖДИ, незалежно від умови.</p>
          <div class="code-box">if 10 > 5:<br>    print("В середині IF")<br>print("ЦЕЙ РЯДОК ВИВЕДЕТЬСЯ ЗАВЖДИ!")</div>
        `,
        desc: "Запитай <code>lvl = int(input(\"Рівень: \"))</code>.<br>Напиши умову: <code>if lvl < 5:</code> і всередині неї виведи <code>\"Новачок\"</code>.<br>Потім ПІСЛЯ блоку <code>if</code> (без відступу, з початку рядка!) напиши: <code>print(\"Програма завершена\")</code>.",
        hint: `Перший print має відступ. Другий print не має відступу. Якщо ти введеш рівень 10, виведеться ТІЛЬКИ другий рядок.`,
        expected: `Рівень: 10\nПрограма завершена`,
        tests: [
          { type: "codeRegex", name: "Ввід lvl", pattern: "lvl\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Умова lvl < 5", pattern: "if\\s*lvl\\s*<\\s*5\\s*:" },
          { type: "codeRegex", name: "Print всередині", pattern: "\\n\\s+print\\s*\\(\\s*['\"]Новачок['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Print зовні (без відступу)", pattern: "\\nprint\\s*\\(\\s*['\"]Програма завершена['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Комп'ютер — буквоїд",
        xp: 150,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Суворий регістр</h2>
          <p>Для Python <code>\"Так\"</code> і <code>\"так\"</code> — це два АБСОЛЮТНО різні слова. Одне з великої літери, інше з малої. Якщо ти просиш ввести \"так\", а користувач ввів \"Так\" або \"ТАК\", умова <code>== \"так\"</code> не спрацює і видасть False!</p>
          <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 10px; margin-top: 10px;">
            <b style="color: #10b981;">💡 Що таке методи?</b><br>
            В майбутньому (на рівні Middle) ми вивчимо так звані <b>методи</b>. Це спеціальні команди, які вміють редагувати текст на льоту. Наприклад, метод зможе автоматично перетворити "ТАК" на "так", щоб програма не ламалася. Але поки що ми будемо вводити текст точно буква в букву!
          </div>
        `,
        desc: "Запитай <code>ans = input(\"Граємо? (пиши 'так'): \")</code>. <br>Якщо <code>ans == \"так\"</code>, виведи <code>\"Старт\"</code>. <br>Інакше виведи <code>\"Стоп\"</code>. <br><i>Спробуй ввести 'Так' з великої літери, щоб на власні очі побачити, як суворо Python перевіряє текст!</i>",
        hint: `Просто перевір if ans == "так": і додай else.`,
        expected: `Граємо? (пиши 'так'): Так\nСтоп`,
        tests: [
          { type: "codeRegex", name: "Ввід тексту", pattern: "ans\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Умова з так", pattern: "if\\s*ans\\s*==\\s*['\"]так['\"]\\s*:" },
          { type: "codeRegex", name: "Блок else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Парне чи Непарне?",
        xp: 160,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Магія остачі (%)</h2>
          <p>Пам'ятаєш оператор <code>%</code> (остача від ділення)? Це найпопулярніший спосіб перевірити, чи число парне.</p>
          <p>Якщо поділити число на 2 і остача дорівнює нулю (<code>num % 2 == 0</code>) — воно <b>парне</b>. Якщо остача 1 — <b>непарне</b>.</p>
        `,
        desc: "Запитай <code>num = int(input(\"Число: \"))</code>. <br>Напиши умову: якщо <code>num % 2 == 0</code>, виведи <code>\"Парне\"</code>. <br>Інакше виведи <code>\"Непарне\"</code>.",
        hint: `Формула в if має виглядати так: if num % 2 == 0:`,
        expected: `Число: 8\nПарне`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Перевірка на парність", pattern: "if\\s*num\\s*%\\s*2\\s*==\\s*0\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Зворотна логіка (!=)",
        xp: 170,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Перевірка на НЕ</h2>
          <p>Іноді зручніше перевірити, чи чогось НЕ сталося.</p>
        `,
        desc: "Ти бос. Запитай <code>name = input(\"Хто ти? \")</code>. <br>Якщо ім'я <b>НЕ дорівнює</b> <code>\"бос\"</code> (використай <code>!=</code>), виведи <code>\"Геть звідси!\"</code>. <br>Інакше виведи <code>\"Вітаю, сер!\"</code>.",
        hint: `if name != "бос": ... else: ...`,
        expected: `Хто ти? (ввід)\n(результат)`,
        tests: [
          { type: "codeRegex", name: "Ввід name", pattern: "name\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Умова !=", pattern: "if\\s*name\\s*!=\\s*['\"]бос['\"]\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "F-рядки всередині if",
        xp: 180,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Персоналізація</h2>
          <p>Ми можемо використовувати будь-який код всередині блоків <code>if</code>, включаючи f-рядки та математику.</p>
        `,
        desc: "Запитай <code>name = input(\"Ім'я: \")</code> та <code>score = int(input(\"Очки: \"))</code>. <br>Якщо очки >= 100, виведи f-рядком: <code>\"{name}, ти чемпіон!\"</code>.<br>Інакше виведи f-рядком: <code>\"{name}, треба ще тренуватися.\"</code>",
        hint: `Не забудь літеру 'f' перед лапками у принтах!`,
        expected: `Ім'я: Макс\nОчки: 120\nМакс, ти чемпіон!`,
        tests: [
          { type: "codeRegex", name: "Опитування", pattern: "name\\s*=\\s*input.*score\\s*=\\s*int", flags: "s" },
          { type: "codeRegex", name: "Умова if", pattern: "if\\s*score\\s*>=\\s*100\\s*:" },
          { type: "codeRegex", name: "F-рядки у виводі", pattern: "print\\s*\\(\\s*f['\"].*\\{\\s*name\\s*\\}", flags: "s" }
        ]
      },

      {
        title: "Зміна змінних в умові",
        xp: 190,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Лікування та Урон</h2>
          <p>Всередині <code>if</code> ми можемо не лише виводити текст, але й змінювати інші змінні (наприклад, віднімати здоров'я).</p>
          <div class="code-box">hp = 100<br>trap = input("Ти наступив на пастку? ")<br>if trap == "так":<br>    <b style="color: #ef4444;">hp -= 50</b><br>print(f"Здоров'я: {hp}")</div>
        `,
        desc: "Створи змінну <code>hp = 100</code>. <br>Запитай <code>action = input(\"Випити зілля? \")</code>.<br>Якщо <code>action == \"так\"</code>, збільш hp на 50 (<code>hp += 50</code>).<br>В самому кінці, ПІСЛЯ блоку if (без відступу), виведи: <code>print(f\"Твоє ХП: {hp}\")</code>.",
        hint: `У тебе немає else. Просто if, всередині якого += 50. А потім звичайний принт зліва.`,
        expected: `Випити зілля? так\nТвоє ХП: 150`,
        tests: [
          { type: "codeRegex", name: "Створено hp = 100", pattern: "hp\\s*=\\s*100" },
          { type: "codeRegex", name: "Ввід action", pattern: "action\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Збільшення hp", pattern: "hp\\s*\\+=\\s*50" },
          { type: "codeRegex", name: "Фінальний принт зовні", pattern: "\\nprint\\s*\\(\\s*f['\"]Твоє ХП:\\s*\\{\\s*hp\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Порівняння двох змінних",
        xp: 200,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Бійка</h2>
          <p>Ми можемо порівнювати не тільки змінну з конкретним числом (<code>hp > 0</code>), але й дві змінні між собою!</p>
          <div class="code-box">if player_atk > boss_def:<br>    print("Пробиття!")</div>
        `,
        desc: "Запитай <code>my_atk = int(input(\"Моя атака: \"))</code> та <code>boss_def = int(input(\"Захист боса: \"))</code>.<br>Якщо <code>my_atk > boss_def</code>, виведи <code>\"Боса переможено!\"</code>.<br>Інакше виведи <code>\"Твоя атака заслабка...\"</code>",
        hint: `Умова буде виглядати так: if my_atk > boss_def:`,
        expected: `Моя атака: 20\nЗахист боса: 15\nБоса переможено!`,
        tests: [
          { type: "codeRegex", name: "Опитування як int", pattern: "my_atk\\s*=\\s*int.*boss_def\\s*=\\s*int", flags: "s" },
          { type: "codeRegex", name: "Порівняння змінних", pattern: "if\\s*my_atk\\s*>\\s*boss_def\\s*:" },
          { type: "codeRegex", name: "Блок else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Подвійна перевірка",
        xp: 210,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Співпадіння паролів</h2>
          <p>Щоб уникнути друкарських помилок при реєстрації, сайти часто просять ввести пароль двічі, а потім порівнюють ці дві змінні між собою.</p>
        `,
        desc: "Запитай <code>pass1 = input(\"Придумай пароль: \")</code>. <br>Потім запитай <code>pass2 = input(\"Повтори пароль: \")</code>. <br>Якщо <code>pass1 == pass2</code>, виведи <code>\"Збережено\"</code>. Інакше — <code>\"Помилка, паролі різні\"</code>.",
        hint: `if pass1 == pass2: print("Збережено") else: print("Помилка, паролі різні")`,
        expected: `Придумай пароль: 1234\nПовтори пароль: 1234\nЗбережено`,
        tests: [
          { type: "codeRegex", name: "Ввід двох паролів", pattern: "pass1\\s*=\\s*input.*pass2\\s*=\\s*input", flags: "s" },
          { type: "codeRegex", name: "Порівняння паролів", pattern: "if\\s*pass1\\s*==\\s*pass2\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Порожній рядок (False)",
        xp: 220,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Мовчання — знак згоди?</h2>
          <p>Як перевірити, чи користувач ВЗАГАЛІ щось ввів, а не просто натиснув Enter? Дуже просто!</p>
          <div class="code-box">text = input("Слово: ")<br>if text == "":<br>    print("Ти нічого не ввів!")</div>
          <p><code>\"\"</code> — це порожній рядок (лапки без нічого всередині).</p>
        `,
        desc: "Запитай <code>msg = input(\"Повідомлення: \")</code>. <br>Якщо <code>msg == \"\"</code>, виведи <code>\"Порожньо\"</code>.<br>Інакше виведи <code>\"Відправлено\"</code>.",
        hint: `Умова: if msg == "":`,
        expected: `Повідомлення: \nПорожньо`,
        tests: [
          { type: "codeRegex", name: "Перевірка на порожнечу", pattern: "if\\s*msg\\s*==\\s*['\"]['\"]\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) JUNIOR
      // ==========================================

      {
        title: "Підсумкова 1: Вибори",
        xp: 300,
        kind: "quiz",
        difficulty: "Junior",
        theory: `<h2>Перевірка: if-else та int()</h2>`,
        desc: `Створи систему допуску до виборів.<br>
        1. Запитай: <code>age = int(input(\"Твій вік: \"))</code>.<br>
        2. Якщо вік більше або дорівнює 18, виведи: <code>\"Можеш голосувати\"</code>.<br>
        3. Інакше виведи: <code>\"Ще зарано\"</code>.`,
        hint: `Використовуй >= 18.`,
        expected: `Твій вік: 18\nМожеш голосувати`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "age\\s*=\\s*int\\s*\\(\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Перевірка >=", pattern: "if\\s*age\\s*>=\\s*18\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Підсумкова 2: Система знижок",
        xp: 350,
        kind: "quiz",
        difficulty: "Junior",
        theory: `<h2>Перевірка: Математика в умові</h2>`,
        desc: `Магазин дає знижку 100 грн, якщо сума покупки 1000 грн або більше.<br>
        1. Запитай: <code>price = int(input(\"Ціна: \"))</code>.<br>
        2. Напиши умову: якщо <code>price >= 1000</code>, зменш ціну на 100 (<code>price -= 100</code>).<br>
        3. <b>Після умови (без відступу)</b> виведи f-рядком: <code>\"До сплати: {price}\"</code>.`,
        hint: `Тобі знадобиться лише if (без else). Відніми 100 всередині if, а виводь результат назовні.`,
        expected: `Ціна: 1200\nДо сплати: 1100`,
        tests: [
          { type: "codeRegex", name: "Ввід price", pattern: "price\\s*=\\s*int\\s*\\(\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Умова >= 1000", pattern: "if\\s*price\\s*>=\\s*1000\\s*:" },
          { type: "codeRegex", name: "Віднімання 100", pattern: "price\\s*\\-=\\s*100" },
          { type: "codeRegex", name: "Фінальний вивід", pattern: "\\nprint\\s*\\(\\s*f['\"]До сплати:\\s*\\{\\s*price\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Підсумкова 3: Сейф",
        xp: 400,
        kind: "quiz",
        difficulty: "Junior",
        theory: `<h2>Перевірка: Множинні зміни</h2>`,
        desc: `У тебе є <code>money = 100</code>.<br>
        1. Запитай <code>pin = input(\"Пін: \")</code>.<br>
        2. Якщо <code>pin == \"1234\"</code>, виведи <code>\"Сейф відкрито\"</code> <b>І НА НАСТУПНОМУ РЯДКУ (з відступом!)</b> додай до грошей 500 (<code>money += 500</code>).<br>
        3. Інакше виведи <code>\"Помилка\"</code>.<br>
        4. ПІСЛЯ всього блоку if/else (без відступу!) виведи f-рядком: <code>\"Баланс: {money}\"</code>.`,
        hint: `Всередині if у тебе має бути ДВА рядки з відступом: print та money += 500.`,
        expected: `Пін: 1234\nСейф відкрито\nБаланс: 600`,
        tests: [
          { type: "codeRegex", name: "Умова на 1234", pattern: "if\\s*pin\\s*==\\s*['\"]1234['\"]\\s*:" },
          { type: "codeRegex", name: "Гроші += 500 всередині if", pattern: "money\\s*\\+=\\s*500" },
          { type: "codeRegex", name: "Фінальний принт", pattern: "\\nprint\\s*\\(\\s*f['\"]Баланс:\\s*\\{\\s*money\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟢 JUNIOR BOSS
      // ==========================================

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Методи, Вкладеність та Логіка)
      // ==========================================

      {
        title: "Множинний вибір (elif)",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Більше, ніж два варіанти</h2>
          <p>До цього ми знали лише два шляхи: <code>if</code> (якщо Так) та <code>else</code> (у всіх інших випадках). Але в житті варіантів часто більше. Наприклад, світлофор має три кольори: зелений, жовтий, червоний.</p>
          <p>Щоб додати нові перевірки <b>між</b> <code>if</code> та <code>else</code>, використовується слово <b style="color: #f59e0b;"><code>elif</code></b> (скорочення від <i>else if</i> — "інакше якщо").</p>
          <p>Програма перевіряє їх зверху вниз. <b>Як тільки знаходить першу правду — виконує її, а решту ігнорує.</b></p>
          <p><b>Приклад:</b></p>
          <div class="code-box">color = input("Колір: ")<br>if color == "зелений":<br>    print("Йди!")<br><b style="color: #f59e0b;">elif</b> color == "жовтий":<br>    print("Приготуйся!")<br><b style="color: #f59e0b;">elif</b> color == "червоний":<br>    print("Стій!")<br>else:<br>    print("Світлофор зламався")</div>
        `,
        desc: "Напиши програму для автомата з напоями. Запитай: <code>choice = input(\"Твій вибір (кава/чай): \")</code>.<br>1. Якщо вибір <code>\"кава\"</code>, виведи <code>\"Готую каву\"</code>.<br>2. <b>Інакше якщо</b> (<code>elif</code>) вибір <code>\"чай\"</code>, виведи <code>\"Готую чай\"</code>.<br>3. У всіх інших випадках (<code>else</code>), виведи <code>\"Немає такого напою\"</code>.",
        hint: `Структура: if choice == "кава": ... elif choice == "чай": ... else: ...`,
        expected: `Твій вибір (кава/чай): чай\nГотую чай`,
        tests: [
          { type: "codeRegex", name: "Ввід choice", pattern: "choice\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Умова if кава", pattern: "if\\s*choice\\s*==\\s*['\"]кава['\"]\\s*:" },
          { type: "codeRegex", name: "Умова elif чай", pattern: "elif\\s*choice\\s*==\\s*['\"]чай['\"]\\s*:" },
          { type: "codeRegex", name: "Блок else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Різниця між if та elif",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Чому не можна просто написати багато if?</h2>
          <p>Це дуже важливе питання! Якщо ти напишеш кілька <code>if</code> підряд, комп'ютер буде перевіряти <b>КОЖЕН</b> із них, навіть якщо перший вже спрацював. Це може викликати баги.</p>
          <p>З <code>elif</code> комп'ютер працює розумніше: якщо він знайшов правильний варіант, він <b>перестрибує</b> всі наступні перевірки. Це економить час і гарантує, що виконається <b>лише один</b> блок коду.</p>
          
          <p><b>Приклад з багом (кілька if):</b></p>
          <div class="code-box">score = 100<br>if score >= 50:<br>    print("Ти пройшов!")<br>if score >= 100:  <span style="color:gray;"># Перевіряється знову!</span><br>    print("Ідеально!")</div>
          <p><i>Виведе обидва рядки, хоча ми хотіли видати лише один фінальний статус.</i></p>
        `,
        desc: "Створимо систему оцінок за допомогою <code>elif</code>! Запитай: <code>score = int(input(\"Бали: \"))</code>.<br>1. <code>if score >= 90:</code> виведи <code>\"Оцінка: А\"</code>.<br>2. <code>elif score >= 70:</code> виведи <code>\"Оцінка: B\"</code>.<br>3. <code>else:</code> виведи <code>\"Оцінка: C\"</code>.",
        hint: `Не забудь двокрапки та відступи після кожного if, elif та else.`,
        expected: `Бали: 85\nОцінка: B`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "score\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "if >= 90", pattern: "if\\s*score\\s*>=\\s*90\\s*:" },
          { type: "codeRegex", name: "elif >= 70", pattern: "elif\\s*score\\s*>=\\s*70\\s*:" },
          { type: "codeRegex", name: "else є", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Знайомство з Методами",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Що таке Метод?</h2>
          <p>На рівні Junior ми зіткнулися з проблемою: якщо користувач вводить <code>"ТАК"</code> з великої літери, а ми чекаємо <code>"так"</code>, програма ламається.</p>
          <p>Щоб керувати даними, у Python є <b>Методи</b>. Це ніби "вбудовані інструменти", які вміють редагувати текст. Вони викликаються через крапку <code>.</code> відразу після змінної або функції <code>input()</code>.</p>
          <ul style="margin-left: 20px; color: var(--text-dim);">
            <li><b style="color: #3b82f6;">.lower()</b> — перетворює всі букви на маленькі (<code>"МАКС" -> "макс"</code>).</li>
            <li><b style="color: #3b82f6;">.strip()</b> — відрізає випадкові пробіли по краях (<code>" ок " -> "ок"</code>).</li>
          </ul>
          <div class="code-box">ans = input("Згода? ")<br>clean_ans = ans.strip().lower()  <span style="color:gray;"># Ланцюжок методів!</span><br>if clean_ans == "так":<br>    print("Супер")</div>
        `,
        desc: "Запитай: <code>word = input(\"Напиши 'окей': \")</code>.<br>На наступному рядку застосуй до змінної відразу два методи: <code>word = word.strip().lower()</code>.<br>Потім напиши: <code>if word == \"окей\":</code> і виведи <code>\"Прийнято!\"</code>. Інакше виведи <code>\"Відмова\"</code>.<br><i>(При тестуванні введи '  ОкЕй  ' з пробілами і великими буквами).</i>",
        hint: `Ланцюжок .strip().lower() робить ввід ідеальним для перевірки.`,
        expected: `Напиши 'окей':   ОкЕй  \nПрийнято!`,
        tests: [
          { type: "codeRegex", name: "Ввід слова", pattern: "word\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Застосування методів", pattern: "word\\s*=\\s*word\\.strip\\s*\\(\\)\\.lower\\s*\\(\\)" },
          { type: "codeRegex", name: "Перевірка очищеного слова", pattern: "if\\s*word\\s*==\\s*['\"]окей['\"]\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Перевірка довжини: len()",
        xp: 180,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Чи достатньо символів?</h2>
          <p>Щоб дізнатися довжину тексту (скільки в ньому літер, цифр та пробілів), ми використовуємо вбудовану функцію <b style="color: #3b82f6;"><code>len()</code></b> (від слова <i>length</i>).</p>
          <div class="code-box">pwd = input("Пароль: ")<br>if len(pwd) < 8:<br>    print("Пароль занадто короткий!")</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Пароль: 123<br>Пароль занадто короткий!</span>
          </div>
        `,
        desc: "Запитай <code>name = input(\"Ім'я: \")</code>. <br>Напиши умову: якщо довжина імені менша за 3 (<code>len(name) < 3</code>), виведи <code>\"Ім'я закоротке\"</code>. <br>Інакше виведи <code>\"Ім'я підходить\"</code>.",
        hint: `Використай if len(name) < 3:`,
        expected: `Ім'я: Ян\nІм'я закоротке`,
        tests: [
          { type: "codeRegex", name: "Ввід name", pattern: "name\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано len() < 3", pattern: "if\\s*len\\s*\\(\\s*name\\s*\\)\\s*<\\s*3\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Метод .isdigit()",
        xp: 190,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Число чи Текст?</h2>
          <p>Що буде, якщо ми попросимо <code>int(input())</code>, а користувач введе слово <code>"привіт"</code>? Програма видасть червону помилку (ValueError) і повністю зупиниться.</p>
          <p>Щоб цього уникнути, ми перевіряємо текст ПЕРЕД тим, як перетворювати його на число. Для цього є метод <b style="color: #10b981;"><code>.isdigit()</code></b>. Він повертає <code>True</code>, якщо текст складається ТІЛЬКИ з цифр.</p>
          <div class="code-box">age_str = input("Вік: ")<br>if age_str.isdigit() == True:<br>    print("Дякую, це дійсно число!")<br>else:<br>    print("Помилка, ти ввів букви!")</div>
        `,
        desc: "Запитай <code>pin = input(\"Пін-код: \")</code>. (Зверни увагу: ми НЕ використовуємо <code>int()</code>).<br>Напиши умову: <code>if pin.isdigit() == True:</code> і виведи <code>\"Код прийнято\"</code>.<br>Інакше виведи <code>\"Мають бути лише цифри!\"</code>.",
        hint: `if pin.isdigit() == True: (або можна ще коротше: if pin.isdigit(): )`,
        expected: `Пін-код: 12ab\nМають бути лише цифри!`,
        tests: [
          { type: "codeRegex", name: "input без int()", pattern: "pin\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано isdigit()", pattern: "if\\s*pin\\.isdigit\\s*\\(\\)\\s*(==\\s*True)?\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Вкладені умови (if всередині if)",
        xp: 200,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Матрьошка рішень</h2>
          <p>Часто нам потрібно зробити другу перевірку <b>тільки після того</b>, як успішно виконалась перша. Для цього ми поміщаємо один <code>if</code> всередину іншого.</p>
          <p>Головне правило: внутрішній <code>if</code> має бути посунутий ще далі вправо (подвійний відступ = 8 пробілів).</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">door = input("Двері (відчинити/зачинити): ")<br>if door == "відчинити":<br>    print("Ти зайшов у кімнату.")<br>    <b style="color: #3b82f6;">chest = input("Там скриня! Відкрити? ")</b><br>    <b style="color: #3b82f6;">if chest == "так":</b><br>        print("Ти знайшов скарб!")<br>else:<br>    print("Ти пішов геть.")</div>
        `,
        desc: "Напиши систему входу.<br>1. Запитай <code>login = input(\"Логін: \")</code>.<br>2. Якщо <code>login == \"admin\"</code>, тоді (з відступом!) запитай пароль: <code>pwd = input(\"Пароль: \")</code>.<br>3. Всередині цього ж блоку напиши вкладений <code>if pwd == \"1234\":</code> (з подвійним відступом!) і виведи <code>\"Доступ відкрито\"</code>.<br>4. Вкладений <code>else:</code> виводить <code>\"Невірний пароль\"</code>.<br>5. Зовнішній <code>else:</code> (на одному рівні з першим if) виводить <code>\"Хто ти?\"</code>.",
        hint: `Уважно з відступами! pwd = input() має 1 відступ (4 пробіли). Внутрішній if має 1 відступ. А print("Доступ відкрито") має 2 відступи (8 пробілів).`,
        expected: `Логін: admin\nПароль: 1234\nДоступ відкрито`,
        tests: [
          { type: "codeRegex", name: "Зовнішній if", pattern: "if\\s*login\\s*==\\s*['\"]admin['\"]\\s*:" },
          { type: "codeRegex", name: "Запит пароля всередині", pattern: "\\n\\s+pwd\\s*=\\s*input" },
          { type: "codeRegex", name: "Вкладений if (подвійний відступ)", pattern: "\\n\\s{4,}if\\s*pwd\\s*==\\s*['\"]1234['\"]\\s*:" },
          { type: "codeRegex", name: "Вкладений else", pattern: "\\n\\s{4,}else\\s*:" },
          { type: "codeRegex", name: "Зовнішній else", pattern: "\\nelse\\s*:" }
        ]
      },

      {
        title: "Вкладений ланцюг (elif всередині if)",
        xp: 210,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Складні лабіринти</h2>
          <p>Всередині <code>if</code> можна писати не тільки інший <code>if</code>, але й повноцінний ланцюг з <code>elif</code> та <code>else</code>!</p>
        `,
        desc: "Запитай <code>action = input(\"Дія (йти/стояти): \")</code>.<br>Якщо <code>action == \"йти\"</code>:<br>&nbsp;&nbsp;&nbsp;&nbsp;Запитай <code>way = input(\"Куди (ліво/право): \")</code><br>&nbsp;&nbsp;&nbsp;&nbsp;Якщо <code>way == \"ліво\"</code> виведи <code>\"Там монстр\"</code><br>&nbsp;&nbsp;&nbsp;&nbsp;Інакше якщо <code>way == \"право\"</code> (використай <b>elif</b>) виведи <code>\"Там скарб\"</code><br>&nbsp;&nbsp;&nbsp;&nbsp;Інакше (внутрішній else) виведи <code>\"Стіна\"</code><br>Зовнішній else (якщо дія не 'йти') виводить <code>\"Ти завмер\"</code>.",
        hint: `Пам'ятай про відступи: way = input() та внутрішні if/elif/else повинні мати 4 пробіли. А принти всередині них — 8 пробілів.`,
        expected: `Дія (йти/стояти): йти\nКуди (ліво/право): право\nТам скарб`,
        tests: [
          { type: "codeRegex", name: "Зовнішній if", pattern: "if\\s*action\\s*==\\s*['\"]йти['\"]\\s*:" },
          { type: "codeRegex", name: "Ввід way всередині", pattern: "\\n\\s+way\\s*=\\s*input" },
          { type: "codeRegex", name: "Вкладений if та elif", pattern: "\\n\\s{4,}if\\s*way\\s*==\\s*['\"]ліво['\"]\\s*:.*\\n\\s{4,}elif\\s*way\\s*==\\s*['\"]право['\"]\\s*:", flags: "s" },
          { type: "codeRegex", name: "Зовнішній else", pattern: "\\nelse\\s*:" }
        ]
      },

      {
        title: "Оператор AND (І те, і інше)",
        xp: 220,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Сувора перевірка</h2>
          <p>Вкладені <code>if</code> — це круто, але код може стати занадто "драбинчастим". Якщо нам треба, щоб ОБИДВІ умови були правдою одночасно, ми використовуємо логічний оператор <b style="color: #10b981;"><code>and</code></b> (з англ. <i>та / і</i>).</p>
          <p>Щоб <code>and</code> видав True, ліва і права частина мають бути True. Якщо хоча б одна з них False — результат усього виразу буде False.</p>
          <p><b>Приклад:</b> Щоб керувати авто, треба бути повнолітнім <b>І</b> мати права.</p>
          <div class="code-box">age = int(input("Вік: "))<br>license = input("Є права? ")<br><br>if age >= 18 <b style="color: #10b981;">and</b> license == "так":<br>    print("Можеш їхати!")</div>
        `,
        desc: "Запитай <code>age = int(input(\"Вік: \"))</code> та <code>height = int(input(\"Зріст: \"))</code>. <br>Атракціон пускає тільки тих, кому є 12 років <b>І</b> чий зріст мінімум 140 см.<br>Напиши ОДИН <code>if</code>, який перевіряє: <code>age >= 12 and height >= 140</code>. Якщо так — виведи <code>\"Проходь!\"</code>. Інакше виведи <code>\"Заборонено\"</code>.",
        hint: `if age >= 12 and height >= 140:`,
        expected: `Вік: 14\nЗріст: 150\nПроходь!`,
        tests: [
          { type: "codeRegex", name: "Ввід age та height", pattern: "age\\s*=\\s*int.*height\\s*=\\s*int", flags: "s" },
          { type: "codeRegex", name: "Використано and", pattern: "if\\s*age\\s*>=\\s*12\\s*and\\s*height\\s*>=\\s*140\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Перевірка діапазону (and)",
        xp: 230,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Число між межами</h2>
          <p>Найчастіше <code>and</code> використовується для перевірки, чи потрапило число у певний діапазон. Наприклад, чи знаходиться час між 9:00 та 18:00?</p>
          <div class="code-box">time = 14<br>if time >= 9 and time <= 18:<br>    print("Магазин відчинено!")</div>
          <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 10px; margin-top: 10px;">
            <b style="color: #10b981;">Фішка Python:</b> Python настільки розумний, що дозволяє писати це ще коротше (як у математиці): <code>if 9 <= time <= 18:</code>. Але для початку краще навчитися працювати з <code>and</code>!
          </div>
        `,
        desc: "Запитай <code>temp = int(input(\"Температура: \"))</code>. <br>Якщо температура >= 15 <b>and</b> температура <= 25, виведи <code>\"Ідеальна погода\"</code>. <br>Інакше виведи <code>\"Сиди вдома\"</code>.",
        hint: `if temp >= 15 and temp <= 25:`,
        expected: `Температура: 20\nІдеальна погода`,
        tests: [
          { type: "codeRegex", name: "Умова діапазону", pattern: "if\\s*temp\\s*>=\\s*15\\s*and\\s*temp\\s*<=\\s*25\\s*:|if\\s*15\\s*<=\\s*temp\\s*<=\\s*25\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Оператор OR (Хоча б щось)",
        xp: 240,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Добрий охоронець</h2>
          <p>Якщо <code>and</code> вимагає, щоб усі умови були правдою, то оператору <b style="color: #3b82f6;"><code>or</code></b> (з англ. <i>або</i>) достатньо, щоб <b>ХОЧА Б ОДНА</b> умова була правдою.</p>
          <p><b>Приклад:</b> Знижку в магазині дають пенсіонерам <b>АБО</b> студентам.</p>
          <div class="code-box">status = input("Ти хто? ")<br>if status == "пенсіонер" <b style="color: #3b82f6;">or</b> status == "студент":<br>    print("Ось ваша знижка!")<br>else:<br>    print("Повна вартість.")</div>
        `,
        desc: "Запитай день тижня: <code>day = input(\"День: \").strip().lower()</code>.<br>Якщо день дорівнює <code>\"субота\"</code> <b>or</b> день дорівнює <code>\"неділя\"</code>, виведи <code>\"Вихідний!\"</code>. <br>Інакше виведи <code>\"На роботу...\"</code>.",
        hint: `if day == "субота" or day == "неділя": (Увага: треба повністю писати 'day ==' з обох боків від or!)`,
        expected: `День: субота\nВихідний!`,
        tests: [
          { type: "codeRegex", name: "Умова or", pattern: "if\\s*day\\s*==\\s*['\"]субота['\"]\\s*or\\s*day\\s*==\\s*['\"]неділя['\"]\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Небезпека OR (Типова помилка)",
        xp: 250,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Як не треба писати</h2>
          <p>Дуже часто новачки перекладають людську мову на код дослівно і пишуть: <code>if role == "admin" or "moder":</code>.</p>
          <p><b>Це жахливий баг!</b> Комп'ютер читає це так: "Якщо роль admin... АБО якщо рядок 'moder' існує". Оскільки текст "moder" існує завжди, ця умова ЗАВЖДИ буде True!</p>
          <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-top: 10px;">
            <b style="color: #ef4444;">Правильно:</b> Комп'ютеру треба щоразу повторювати, ЩО САМЕ ми порівнюємо: <br><code>if role == "admin" or role == "moder":</code>
          </div>
        `,
        desc: `Код друга містить баг, через який двері відчиняються для всіх:<br>
<code>key = input(\"Ключ: \")</code><br>
<code>if key == \"золотий\" or \"срібний\":</code><br>
<code>    print(\"Двері відчинено\")</code><br>
Виправ цей код, щоб <code>or</code> працював правильно! Допиши до нього <code>else</code>, який виводить <code>\"Зачинено\"</code>.`,
        hint: `Виправ умову на: if key == "золотий" or key == "срібний":`,
        expected: `Ключ: іржавий\nЗачинено`,
        tests: [
          { type: "codeRegex", name: "Виправлений or", pattern: "if\\s*key\\s*==\\s*['\"]золотий['\"]\\s*or\\s*key\\s*==\\s*['\"]срібний['\"]\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Оператор NOT (Реверс)",
        xp: 260,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Все навпаки</h2>
          <p>Логічний оператор <b style="color: #ef4444;"><code>not</code></b> (з англ. <i>не</i>) робить магію — він перевертає значення з ніг на голову. True стає False, а False стає True.</p>
          <p>Це дуже зручно, коли ми хочемо перевірити, чи щось НЕ є правдою.</p>
          <div class="code-box">ans = input("Ти робот? ")<br>is_robot = (ans == "так")<br><br>if <b style="color: #ef4444;">not</b> is_robot:<br>    print("Доступ людині дозволено!")</div>
        `,
        desc: "Запитай <code>text = input(\"Введи цифри: \")</code>. <br>Використай метод <code>.isdigit()</code> разом з оператором <code>not</code>.<br>Напиши умову: <code>if not text.isdigit():</code> і виведи <code>\"Це не число!\"</code>. <br>Інакше виведи <code>\"Дякую за цифри\"</code>.",
        hint: `if not text.isdigit():`,
        expected: `Введи цифри: abc\nЦе не число!`,
        tests: [
          { type: "codeRegex", name: "Ввід тексту", pattern: "text\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано not isdigit", pattern: "if\\s*not\\s*text\\.isdigit\\s*\\(\\)\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Комбо: AND та OR разом",
        xp: 270,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Дужки мають значення</h2>
          <p>Що, якщо нам треба перевірити складну умову: "Щоб зайти в клуб, треба бути старшим 18 <b>АБО</b> мати VIP-карту... <b>І</b> при цьому не бути в чорному списку"?</p>
          <p>Як і в математиці з множенням та додаванням, логічний <code>and</code> виконується ПЕРШИМ, а <code>or</code> — ДРУГИМ. Щоб змінити пріоритет, ми групуємо умови <b>круглими дужками <code>()</code></b>.</p>
          <div class="code-box">if (age >= 18 or role == "vip") and status != "banned":<br>    print("Заходь!")</div>
        `,
        desc: "Пишемо систему доступу до гри.<br>Запитай: <code>lvl = int(input(\"Рівень: \"))</code>, <code>role = input(\"Роль: \")</code> та <code>status = input(\"Статус: \")</code>.<br>Напиши умову з дужками: Якщо (рівень >= 10 <b>or</b> роль == \"admin\") <b>and</b> статус == \"активний\", виведи <code>\"Грати\"</code>. Інакше — <code>\"Відхилено\"</code>.",
        hint: `if (lvl >= 10 or role == "admin") and status == "активний":`,
        expected: `Рівень: 5\nРоль: admin\nСтатус: активний\nГрати`,
        tests: [
          { type: "codeRegex", name: "Умова з дужками", pattern: "if\\s*\\(\\s*lvl\\s*>=\\s*10\\s*or\\s*role\\s*==\\s*['\"]admin['\"]\\s*\\)\\s*and\\s*status\\s*==\\s*['\"]активний['\"]\\s*:" }
        ]
      },

      {
        title: "Брехливі дані (Falsy / Truthy)",
        xp: 280,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Прихована логіка Python</h2>
          <p>Тобі не обов'язково писати <code>==</code> щоразу! У Python будь-які дані мають "правдивість".</p>
          <ul style="margin-left: 20px; color: var(--text-dim);">
            <li><b>Falsy (Брехливі):</b> число <code>0</code>, порожній рядок <code>""</code>. Вони вважаються <code>False</code>.</li>
            <li><b>Truthy (Правдиві):</b> УСЕ ІНШЕ. Будь-яке число (навіть -1), будь-який текст (навіть пробіл). Вони вважаються <code>True</code>.</li>
          </ul>
          <div class="code-box">name = input("Ім'я: ")<br>if name:  <span style="color:gray;"># Це те саме, що 'if name != "":'</span><br>    print(f"Привіт, {name}")<br>else:<br>    print("Ти нічого не ввів!")</div>
          <p><i>Це улюблений трюк Senior-розробників для перевірки, чи ввів користувач хоч щось.</i></p>
        `,
        desc: "Запитай <code>hero = input(\"Обери героя: \")</code>. <br>Замість <code>if hero != \"\":</code> напиши по-хакерськи коротко: <code>if hero:</code>. Всередині виведи <code>\"Герой обраний\"</code>. <br>В <code>else:</code> виведи <code>\"Ім'я не може бути порожнім!\"</code>.",
        hint: `Просто напиши: if hero:\n    print(...)`,
        expected: `Обери героя: \nІм'я не може бути порожнім!`,
        tests: [
          { type: "codeRegex", name: "Короткий if (без == чи !=)", pattern: "if\\s*hero\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) MIDDLE
      // ==========================================

      {
        title: "Підсумкова 1: Погода",
        xp: 300,
        kind: "quiz",
        difficulty: "Middle",
        theory: `<h2>Перевірка: Ланцюг elif</h2>`,
        desc: `Запитай: <code>t = int(input("Температура: "))</code>.<br>
        Напиши такий ланцюг:<br>
        1. Якщо t < 0: <code>"Мороз"</code>.<br>
        2. Інакше якщо t < 15: <code>"Холодно"</code>.<br>
        3. Інакше якщо t < 25: <code>"Тепло"</code>.<br>
        4. Інакше: <code>"Спека"</code>.`,
        hint: `Використай один if, два elif та один else в самому кінці.`,
        expected: `Температура: 18\nТепло`,
        tests: [
          { type: "codeRegex", name: "Ввід t", pattern: "t\\s*=\\s*int" },
          { type: "codeRegex", name: "if < 0", pattern: "if\\s*t\\s*<\\s*0\\s*:" },
          { type: "codeRegex", name: "Два elif", pattern: "elif\\s*t\\s*<\\s*15\\s*:.*elif\\s*t\\s*<\\s*25\\s*:", flags: "s" },
          { type: "codeRegex", name: "Блок else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Підсумкова 2: Надійний Пін",
        xp: 350,
        kind: "quiz",
        difficulty: "Middle",
        theory: `<h2>Перевірка: and + методи рядків</h2>`,
        desc: `Пін-код ідеальний, якщо він складається тільки з цифр (<code>.isdigit()</code>) <b>І</b> його довжина рівно 4 символи (<code>len() == 4</code>).<br>
        Запитай: <code>pin = input("Пін: ").strip()</code>.<br>
        Напиши ОДИН <code>if</code>, об'єднавши дві перевірки через <code>and</code>.<br>
        Якщо все ок, виведи <code>"Пін прийнято"</code>, інакше <code>"Помилка формату"</code>.`,
        hint: `if pin.isdigit() and len(pin) == 4:`,
        expected: `Пін: 12ab\nПомилка формату`,
        tests: [
          { type: "codeRegex", name: "Об'єднання умов через and", pattern: "if\\s*(pin\\.isdigit\\s*\\(\\)\\s*and\\s*len\\s*\\(\\s*pin\\s*\\)\\s*==\\s*4|len\\s*\\(\\s*pin\\s*\\)\\s*==\\s*4\\s*and\\s*pin\\.isdigit\\s*\\(\\))\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Підсумкова 3: Знижка або Бан",
        xp: 400,
        kind: "quiz",
        difficulty: "Middle",
        theory: `<h2>Перевірка: and, or та дужки</h2>`,
        desc: `Щоб зайти на VIP-вечірку, гість повинен мати квиток (<code>ticket == "vip"</code>) АБО бути зіркою (<code>status == "star"</code>). АЛЕ в обох випадках він НЕ повинен бути в чорному списку (<code>banned == "ні"</code>)!<br>
        Запитай три змінні через input(): <code>ticket</code>, <code>status</code>, <code>banned</code>.<br>
        Умова: <code>if (ticket == "vip" or status == "star") and banned == "ні":</code><br>
        Виведи "Дохід дозволено" або "Виганяємо".`,
        hint: `Логічне "або" обов'язково треба взяти в круглі дужки, щоб воно виконалося першим, як у математиці!`,
        expected: `Квиток: звичайний\nСтатус: star\nЗабанений: ні\nДохід дозволено`,
        tests: [
          { type: "codeRegex", name: "Запит трьох змінних", pattern: "ticket\\s*=\\s*input.*status\\s*=\\s*input.*banned\\s*=\\s*input", flags: "s" },
          { type: "codeRegex", name: "Складна умова з дужками", pattern: "if\\s*\\(\\s*ticket\\s*==\\s*['\"]vip['\"]\\s*or\\s*status\\s*==\\s*['\"]star['\"]\\s*\\)\\s*and\\s*banned\\s*==\\s*['\"]ні['\"]\\s*:" }
        ]
      },

      // ==========================================
      // 🟡 MIDDLE BOSS
      // ==========================================

      {
        title: "🟡 БОС (Middle): Створення Персонажа",
        xp: 800,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          <h2>Фінальний іспит: Гілкування логіки</h2>
          <p>Час поєднати вкладені <code>if</code>, логічний <code>and</code>, <code>or</code> та хакерську перевірку на порожнечу (truthy/falsy).</p>
        `,
        desc: `Напиши систему реєстрації в RPG:<br>
        1. Запитай <code>name = input("Ім'я: ").strip()</code>.<br>
        2. Якщо ім'я порожнє (використай коротку перевірку <code>if not name:</code> або <code>if name == "":</code>):<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Виведи <code>"Ім'я обов'язкове!"</code> і на цьому код закінчується.<br>
        3. Інакше (<code>else:</code>):<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Всередині цього else (зроби відступ!) запитай: <code>cls = input("Клас (маг/воїн): ").strip().lower()</code>.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Запитай: <code>age = int(input("Вік: "))</code>.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Якщо вік >= 12 <b>and</b> (клас == "маг" <b>or</b> клас == "воїн"):<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Виведи: <code>"Персонаж {name} створений!"</code>.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Інакше:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Виведи: <code>"Невірні дані або малий вік"</code>.`,
        hint: `У тебе буде головний if-else для перевірки імені. ВСЯ інша логіка (клас, вік, другий if-else) знаходиться ВСЕРЕДИНІ головного else (тобто має відступ!).`,
        expected: `Ім'я: Артур\nКлас (маг/воїн): воїн\nВік: 15\nПерсонаж Артур створений!`,
        tests: [
          { type: "codeRegex", name: "Очищення імені", pattern: "name\\s*=\\s*input\\s*\\(.*\\)\\.strip\\s*\\(\\)" },
          { type: "codeRegex", name: "Перевірка імені (if not name / == '')", pattern: "if\\s*not\\s*name\\s*:|if\\s*name\\s*==\\s*['\"]['\"]\\s*:" },
          { type: "codeRegex", name: "Головний else", pattern: "\\nelse\\s*:" },
          { type: "codeRegex", name: "Запит класу та віку всередині", pattern: "\\n\\s+cls\\s*=\\s*input.*\\.lower\\s*\\(\\).*\\n\\s+age\\s*=\\s*int\\s*\\(\\s*input", flags: "s" },
          { type: "codeRegex", name: "Вкладений складний if", pattern: "\\n\\s+if\\s*age\\s*>=\\s*12\\s*and\\s*\\(\\s*cls\\s*==\\s*['\"]маг['\"]\\s*or\\s*cls\\s*==\\s*['\"]воїн['\"]\\s*\\)\\s*:" },
          { type: "codeRegex", name: "Вивід f-рядком", pattern: "f['\"]Персонаж\\s*\\{\\s*name\\s*\\}\\s*створений!['\"]", checkRaw: true }
        ]
      },

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Оператор in, Тернарні вирази, Прапорці)
      // ==========================================

      {
        title: "Пошук у тексті: оператор in",
        xp: 250,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Чи є тут ця літера?</h2>
          <p>Часто нам потрібно перевірити, чи містить великий текст якесь конкретне слово або літеру. Для цього в Python є магічний оператор <b style="color: #10b981;"><code>in</code></b> (з англ. <i>в / всередині</i>).</p>
          <div class="code-box">word = "програмування"<br>if "грам" <b style="color: #10b981;">in</b> word:<br>    print("Знайдено!")</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат виконання:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Знайдено!</span>
          </div>
          <p>Оператор <code>in</code> повертає <code>True</code>, якщо шматочок тексту (зліва) знаходиться всередині іншого тексту (справа).</p>
        `,
        desc: "Запитай: <code>email = input(\"Твій email: \")</code>.<br>Напиши умову: якщо символ <code>\"@\"</code> є всередині <code>email</code> (використай <code>in</code>), виведи <code>\"Схоже на пошту\"</code>. Інакше виведи <code>\"Немає собачки\"</code>.",
        hint: `if "@" in email:`,
        expected: `Твій email: max@mail.com\nСхоже на пошту`,
        tests: [
          { type: "codeRegex", name: "Ввід email", pattern: "email\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано in", pattern: "if\\s*['\"]@['\"]\\s*in\\s*email\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Чорний список (not in)",
        xp: 260,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Фільтр поганих слів</h2>
          <p>Якщо є <code>in</code>, логічно, що є і його протилежність — <b style="color: #ef4444;"><code>not in</code></b> (НЕ всередині).</p>
          <div class="code-box">name = "Макс"<br>if "!" <b style="color: #ef4444;">not in</b> name:<br>    print("Ім'я чисте, без знаків оклику!")</div>
        `,
        desc: "Ти пишеш фільтр для чату. Запитай: <code>msg = input(\"Повідомлення: \")</code>.<br>Якщо слово <code>\"дурень\"</code> <b>НЕ знаходиться</b> в повідомленні (<code>not in</code>), виведи <code>\"Відправлено\"</code>. Інакше виведи <code>\"Повідомлення заблоковано\"</code>.",
        hint: `if "дурень" not in msg:`,
        expected: `Повідомлення: привіт!\nВідправлено`,
        tests: [
          { type: "codeRegex", name: "Ввід msg", pattern: "msg\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано not in", pattern: "if\\s*['\"]дурень['\"]\\s*not\\s*in\\s*msg\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Швидка перевірка списку",
        xp: 265,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Один з багатьох</h2>
          <p>Оператор <code>in</code> ідеально підходить для перевірки, чи є літера голосною! Замість того, щоб писати довжелезне <code>if char == 'а' or char == 'о' or ...</code>, ми можемо просто перевірити, чи є наша літера у рядку з усіма голосними.</p>
          <div class="code-box">if letter in "аеєиіїоуюя":<br>    print("Це голосна!")</div>
        `,
        desc: "Запитай літеру: <code>char = input(\"Літера: \").lower()</code>.<br>Якщо ця літера є всередині рядка <code>\"аеєиіїоуюя\"</code>, виведи <code>\"Голосна\"</code>. Інакше виведи <code>\"Приголосна\"</code>.",
        hint: `if char in "аеєиіїоуюя":`,
        expected: `Літера: О\nГолосна`,
        tests: [
          { type: "codeRegex", name: "Ввід char", pattern: "char\\s*=\\s*input\\s*\\(.*\\)\\.lower\\s*\\(\\)" },
          { type: "codeRegex", name: "Перевірка in голосні", pattern: "if\\s*char\\s*in\\s*['\"]аеєиіїоуюя['\"]\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Розумний пошук (in + lower)",
        xp: 270,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Ігноруємо регістр</h2>
          <p>Пошук через <code>in</code> суворо враховує регістр. Якщо ти шукаєш <code>"спам"</code>, а користувач написав <code>"СПАМ"</code>, оператор <code>in</code> його не знайде!</p>
          <p>Щоб пошук був ідеальним, ми завжди перетворюємо ввід на маленькі літери ПЕРЕД перевіркою (або прямо під час неї).</p>
          <div class="code-box">if "спам" in text.lower():<br>    print("Знайдено!")</div>
        `,
        desc: "Запитай: <code>comment = input(\"Коментар: \")</code>.<br>Перевір, чи є слово <code>\"реклама\"</code> у цьому коментарі, застосувавши <code>.lower()</code> прямо в умові: <code>if \"реклама\" in comment.lower():</code>.<br>Якщо є — виведи <code>\"Бан\"</code>, інакше — <code>\"Опубліковано\"</code>.",
        hint: `if "реклама" in comment.lower():`,
        expected: `Коментар: Купуйте РЕКЛАМА тут!\nБан`,
        tests: [
          { type: "codeRegex", name: "Ввід comment", pattern: "comment\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "in + lower()", pattern: "if\\s*['\"]реклама['\"]\\s*in\\s*comment\\.lower\\s*\\(\\)\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Перевірка країв (startswith)",
        xp: 275,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Початок і кінець</h2>
          <p>Іноді нам важливо, не просто чи Є текст всередині, а чи ПОЧИНАЄТЬСЯ з нього рядок. Для цього існують методи <b style="color: #3b82f6;"><code>.startswith()</code></b> (починається з) та <b style="color: #3b82f6;"><code>.endswith()</code></b> (закінчується на).</p>
          <div class="code-box">url = input("Сайт: ")<br>if url.startswith("https://"):<br>    print("Сайт безпечний")</div>
        `,
        desc: "Запитай файл: <code>file = input(\"Ім'я файлу: \")</code>.<br>Напиши умову: <code>if file.endswith(\".py\"):</code> і виведи <code>\"Це код на Python\"</code>.<br>Інакше виведи <code>\"Невідомий формат\"</code>.",
        hint: `Використовуй метод .endswith(".py") для перевірки кінця рядка.`,
        expected: `Ім'я файлу: script.py\nЦе код на Python`,
        tests: [
          { type: "codeRegex", name: "Ввід file", pattern: "file\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано endswith", pattern: "if\\s*file\\.endswith\\s*\\(\\s*['\"]\\.py['\"]\\s*\\)\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Абсолютна порожнеча",
        xp: 280,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Хитрі користувачі</h2>
          <p>Ми вже знаємо коротку перевірку на порожній ввід: <code>if not name:</code>. Але що, якщо користувач введе просто 5 пробілів і натисне Enter? Рядок <code>"     "</code> НЕ є порожнім, тому програма пропустить його далі!</p>
          <p>Щоб захиститися від цього, ми комбінуємо перевірку з методом <code>.strip()</code>, який зріже всі фейкові пробіли.</p>
          <div class="code-box">name = input("Ім'я: ")<br>if not name.strip():<br>    print("Помилка! Тільки пробіли.")</div>
        `,
        desc: "Запитай <code>text = input(\"Введи щось: \")</code>.<br>Перевір його на абсолютну порожнечу (навіть якщо там лише пробіли): <code>if not text.strip():</code>.<br>Якщо порожньо — виведи <code>\"Нічого немає\"</code>. Інакше виведи <code>\"Прийнято\"</code>.",
        hint: `if not text.strip(): (не забудь дужки після strip)`,
        expected: `Введи щось:    \nНічого немає`,
        tests: [
          { type: "codeRegex", name: "Ввід text", pattern: "text\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "not text.strip()", pattern: "if\\s*not\\s*text\\.strip\\s*\\(\\)\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Один рядок коду (Тернарний оператор)",
        xp: 285,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Хакерський синтаксис</h2>
          <p>Програмісти ліниві. Писати 4 рядки для простого <code>if/else</code> — це довго. Python дозволяє написати умову прямо під час створення змінної. Це називається <b>Тернарний оператор</b>.</p>
          <p><b>Формула:</b> <code>змінна = [Значення_ЯКЩО_ТАК] if [умова] else [Значення_ЯКЩО_НІ]</code></p>
          <div class="code-box">age = 20<br>status = "Дорослий" <b style="color: #f59e0b;">if</b> age >= 18 <b style="color: #ef4444;">else</b> "Дитина"<br>print(status)</div>
          <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 10px; margin-top: 10px;">
            <b style="color: #10b981;">Як це читати:</b> Статус дорівнює "Дорослий", ЯКЩО вік >= 18, ІНАКШЕ статус дорівнює "Дитина". Все в один рядок!
          </div>
        `,
        desc: "Запитай: <code>hp = int(input(\"Твоє здоров'я: \"))</code>.<br>Створи змінну в один рядок: <code>state = \"Живий\" if hp > 0 else \"Мертвий\"</code>.<br>Виведи змінну <code>state</code>.",
        hint: `Просто скопіюй тернарний вираз з опису та зроби print(state). Жодних двокрапок чи відступів тут не потрібно!`,
        expected: `Твоє здоров'я: 0\nМертвий`,
        tests: [
          { type: "codeRegex", name: "Ввід hp", pattern: "hp\\s*=\\s*int\\s*\\(\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Тернарний вираз", pattern: "state\\s*=\\s*['\"]Живий['\"]\\s*if\\s*hp\\s*>\\s*0\\s*else\\s*['\"]Мертвий['\"]", checkRaw: true },
          { type: "codeRegex", name: "Друк state", pattern: "print\\s*\\(\\s*state\\s*\\)" }
        ]
      },

      {
        title: "Тернарний оператор у Print",
        xp: 290,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Прямо в консоль</h2>
          <p>Тернарний оператор настільки гнучкий, що його можна вставити прямо всередину функції <code>print()</code>. Тоді нам навіть не потрібна додаткова змінна!</p>
          <div class="code-box">score = 100<br>print("Круто" if score == 100 else "Нормально")</div>
        `,
        desc: "Запитай число: <code>num = int(input(\"Введи число: \"))</code>.<br>Використовуючи тернарний вираз <b>прямо всередині <code>print()</code></b>, перевір його на парність (<code>num % 2 == 0</code>).<br>Якщо парне — виведи <code>\"Парне\"</code>, інакше — <code>\"Непарне\"</code>.",
        hint: `print("Парне" if num % 2 == 0 else "Непарне")`,
        expected: `Введи число: 5\nНепарне`,
        tests: [
          { type: "codeRegex", name: "Ввід num", pattern: "num\\s*=\\s*int\\s*\\(\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Тернарний print", pattern: "print\\s*\\(\\s*['\"]Парне['\"]\\s*if\\s*num\\s*%\\s*2\\s*==\\s*0\\s*else\\s*['\"]Непарне['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Тернарний оператор + f-рядок",
        xp: 300,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Вищий пілотаж</h2>
          <p>Тернарний вираз можна використовувати навіть всередині фігурних дужок <code>{}</code> f-рядка!</p>
          <div class="code-box">money = 50<br>print(f"У мене {'багато' if money > 100 else 'мало'} грошей.")</div>
          <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-top: 10px;">
            <b style="color: #ef4444;">Увага на лапки:</b> Якщо сам f-рядок написаний у подвійних лапках <code>"..."</code>, то слова всередині фігурних дужок мають бути в одинарних <code>'...'</code>, щоб код не зламався.
          </div>
        `,
        desc: "Запитай: <code>is_raining = input(\"Йде дощ? (так/ні): \")</code>.<br>Виведи f-рядком: <code>print(f\"Я візьму {'парасольку' if is_raining == 'так' else 'окуляри'}\")</code>.",
        hint: `Уважно перенеси код з опису. Одинарні лапки для 'парасольку' та 'окуляри' дуже важливі!`,
        expected: `Йде дощ? (так/ні): ні\nЯ візьму окуляри`,
        tests: [
          { type: "codeRegex", name: "Ввід дощу", pattern: "is_raining\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Тернарний f-рядок", pattern: "print\\s*\\(\\s*f['\"]Я візьму \\{\\s*['\"]парасольку['\"]\\s*if\\s*is_raining\\s*==\\s*['\"]так['\"]\\s*else\\s*['\"]окуляри['\"]\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Система Прапорців (Flags)",
        xp: 310,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Змінні-запобіжники</h2>
          <p>Іноді нам треба зробити багато перевірок (довжина, символи, регістр). Замість гігантського <code>and/or</code> ми можемо використати "прапорець".</p>
          <div class="code-box">is_valid = True  <span style="color:gray;"># Спочатку віримо, що все добре</span><br>if len(pwd) < 8:<br>    is_valid = False  <span style="color:gray;"># Опускаємо прапорець!</span><br><br>if is_valid:  <span style="color:gray;"># Перевіряємо прапорець в кінці</span><br>    print("Пароль супер")</div>
        `,
        desc: "Створимо валідатор нікнейму. Запитай: <code>nick = input(\"Нік: \")</code>.<br>1. Створи прапорець: <code>is_good = True</code>.<br>2. Якщо <code>len(nick) < 3</code>, зміни <code>is_good = False</code>.<br>3. Якщо <code>\" \" in nick</code> (якщо є пробіл), зміни <code>is_good = False</code>.<br>4. В кінці (без відступів): <code>if is_good:</code> виведи <code>\"Нік прийнято\"</code>, <code>else:</code> виведи <code>\"Поганий нік\"</code>.",
        hint: `Тут буде два окремих if для перевірок (вони скидають is_good в False), і ще один фінальний if is_good: / else: в кінці.`,
        expected: `Нік: A B\nПоганий нік`,
        tests: [
          { type: "codeRegex", name: "Створення is_good", pattern: "is_good\\s*=\\s*True" },
          { type: "codeRegex", name: "Перевірка довжини", pattern: "if\\s*len\\s*\\(\\s*nick\\s*\\)\\s*<\\s*3\\s*:\\s*\\n\\s*is_good\\s*=\\s*False" },
          { type: "codeRegex", name: "Перевірка на пробіл", pattern: "if\\s*['\"]\\s+['\"]\\s*in\\s*nick\\s*:\\s*\\n\\s*is_good\\s*=\\s*False" },
          { type: "codeRegex", name: "Фінальний if is_good", pattern: "if\\s*is_good\\s*:" }
        ]
      },

      {
        title: "Перемикач (Toggle)",
        xp: 320,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Увімкнути / Вимкнути</h2>
          <p>Щоразу, коли ти натискаєш кнопку ліхтарика, він змінює свій стан на протилежний. У коді це робиться за допомогою оператора <b style="color: #ef4444;"><code>not</code></b>.</p>
          <div class="code-box">is_on = False<br>is_on = <b style="color: #ef4444;">not</b> is_on  <span style="color:gray;"># Тепер True!</span><br>is_on = <b style="color: #ef4444;">not</b> is_on  <span style="color:gray;"># Знову False!</span></div>
        `,
        desc: "Створи змінну: <code>engine = False</code> (двигун вимкнено).<br>Запитай: <code>action = input(\"Натиснути кнопку? (так/ні): \")</code>.<br>Якщо <code>action == \"так\"</code>, перемкни двигун: <code>engine = not engine</code>.<br>В кінці виведи: <code>print(f\"Двигун працює: {engine}\")</code>.",
        hint: `Умова: if action == "так":\n    engine = not engine`,
        expected: `Натиснути кнопку? (так/ні): так\nДвигун працює: True`,
        tests: [
          { type: "codeRegex", name: "engine = False", pattern: "engine\\s*=\\s*False" },
          { type: "codeRegex", name: "if action", pattern: "if\\s*action\\s*==\\s*['\"]так['\"]\\s*:" },
          { type: "codeRegex", name: "Перемикання not", pattern: "engine\\s*=\\s*not\\s*engine" },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*f['\"]Двигун працює:\\s*\\{\\s*engine\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Множинна заміна з if",
        xp: 330,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Модератор коментарів</h2>
          <p>За допомогою <code>in</code> ми можемо дізнатися, чи є погане слово в тексті, а потім за допомогою <code>.replace()</code> замінити його на зірочки!</p>
        `,
        desc: "Запитай <code>text = input(\"Коментар: \")</code>.<br>Якщо <code>\"блін\" in text</code>, заміни його: <code>text = text.replace(\"блін\", \"****\")</code>.<br>Потім (ОКРЕМИМ if, без elif!) перевір: якщо <code>\"капець\" in text</code>, заміни його: <code>text = text.replace(\"капець\", \"******\")</code>.<br>В кінці виведи <code>text</code>.",
        hint: `У тебе має бути два незалежних блоки if підряд, щоб цензура спрацювала на обидва слова, якщо вони є.`,
        expected: `Коментар: блін, це капець!\n****, це ******!`,
        tests: [
          { type: "codeRegex", name: "Перший if in", pattern: "if\\s*['\"]блін['\"]\\s*in\\s*text\\s*:" },
          { type: "codeRegex", name: "Перший replace", pattern: "text\\s*=\\s*text\\.replace\\s*\\(\\s*['\"]блін['\"]\\s*,\\s*['\"]\\*\\*\\*\\*['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Другий if in", pattern: "if\\s*['\"]капець['\"]\\s*in\\s*text\\s*:" },
          { type: "codeRegex", name: "Другий replace", pattern: "text\\s*=\\s*text\\.replace\\s*\\(\\s*['\"]капець['\"]\\s*,\\s*['\"]\\*\\*\\*\\*\\*\\*['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*text\\s*\\)" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) SENIOR
      // ==========================================

      {
        title: "Підсумкова 1: Шпигун чи ні?",
        xp: 400,
        kind: "quiz",
        difficulty: "Senior",
        theory: `<h2>Перевірка: in + not in</h2>`,
        desc: `Щоб зайти на базу, в імені не повинно бути цифр, але має бути слово "агент".<br>
        Запитай: <code>name = input("Позивний: ").lower()</code>.<br>
        Напиши умову: якщо <code>"агент" in name</code> <b>and</b> <code>"0" not in name</code>:<br>
        Виведи <code>"Доступ є"</code>. Інакше <code>"Блок"</code>.`,
        hint: `if "агент" in name and "0" not in name:`,
        expected: `Позивний: Агент Макс\nДоступ є`,
        tests: [
          { type: "codeRegex", name: "Ввід з lower", pattern: "name\\s*=\\s*input\\s*\\(.*\\)\\.lower\\s*\\(\\)" },
          { type: "codeRegex", name: "Логіка in and not in", pattern: "if\\s*['\"]агент['\"]\\s*in\\s*name\\s*and\\s*['\"]0['\"]\\s*not\\s*in\\s*name\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Підсумкова 2: Швидка Знижка",
        xp: 450,
        kind: "quiz",
        difficulty: "Senior",
        theory: `<h2>Перевірка: Тернарний вираз</h2>`,
        desc: `Давай порахуємо ціну в ОДИН рядок!<br>
        1. Запитай <code>price = int(input("Ціна: "))</code>.<br>
        2. Створи змінну <code>final_price</code>. Використай тернарний оператор: вона дорівнює <code>price - 50</code>, якщо <code>price > 500</code>, інакше вона дорівнює просто <code>price</code>.<br>
        3. Виведи <code>final_price</code>.`,
        hint: `final_price = price - 50 if price > 500 else price`,
        expected: `Ціна: 600\n550`,
        tests: [
          { type: "codeRegex", name: "Ввід int", pattern: "price\\s*=\\s*int" },
          { type: "codeRegex", name: "Тернарна математика", pattern: "final_price\\s*=\\s*price\\s*-\\s*50\\s*if\\s*price\\s*>\\s*500\\s*else\\s*price" }
        ]
      },

      {
        title: "Підсумкова 3: Складний Прапорець",
        xp: 500,
        kind: "quiz",
        difficulty: "Senior",
        theory: `<h2>Перевірка: Flags та isdigit()</h2>`,
        desc: `1. <code>doc = input("Номер паспорта: ")</code><br>
        2. Створи <code>is_valid = True</code>.<br>
        3. Якщо довжина <code>doc</code> не дорівнює 8 (<code>!= 8</code>), то <code>is_valid = False</code>.<br>
        4. Якщо <code>doc.isdigit() == False</code> (або <code>not doc.isdigit()</code>), то <code>is_valid = False</code>.<br>
        5. В кінці виведи <code>print(f"Документ дійсний: {is_valid}")</code>.`,
        hint: `Два окремих if для перевірок довжини та цифр, які опускають прапорець.`,
        expected: `Номер паспорта: 1234ABCD\nДокумент дійсний: False`,
        tests: [
          { type: "codeRegex", name: "Прапорець True", pattern: "is_valid\\s*=\\s*True" },
          { type: "codeRegex", name: "Перевірка довжини", pattern: "if\\s*len\\s*\\(\\s*doc\\s*\\)\\s*!=\\s*8\\s*:\\s*\\n\\s*is_valid\\s*=\\s*False" },
          { type: "codeRegex", name: "Перевірка цифр", pattern: "if\\s*(doc\\.isdigit\\s*\\(\\)\\s*==\\s*False|not\\s*doc\\.isdigit\\s*\\(\\))\\s*:\\s*\\n\\s*is_valid\\s*=\\s*False" },
          { type: "codeRegex", name: "Друк прапорця", pattern: "print\\s*\\(\\s*f['\"]Документ дійсний:\\s*\\{\\s*is_valid\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      // ==========================================
      // 🔴 SENIOR BOSS
      // ==========================================

      {
        title: "🔴 БОС (Senior): Розумний Бот-Модератор",
        xp: 1000,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2>Фінальний іспит: Повна валідація</h2>
          <p>Об'єднай тернарні вирази, in/not in, перевірку типів і прапорці, щоб створити систему модерації коментарів.</p>
        `,
        desc: `Напиши скрипт для модерації:<br>
        1. Запитай: <code>msg = input("Коментар: ")</code>.<br>
        2. Прапорець <code>is_allowed = True</code>.<br>
        3. Якщо <code>"спам" in msg.lower()</code> <b>або</b> <code>"реклама" in msg.lower()</code> — опусти прапорець (False).<br>
        4. Якщо довжина повідомлення < 5 — опусти прапорець.<br>
        5. Зроби ОДИН <code>print()</code> з f-рядком і тернарним оператором всередині!<br>
        Формат: <code>print(f"Статус: {'Опубліковано' if is_allowed else 'Видалено'}")</code>.`,
        hint: `Уважно з умовою 3: if "спам" in msg.lower() or "реклама" in msg.lower(): is_allowed = False`,
        expected: `Коментар: купуйте мою РЕКЛАМА\nСтатус: Видалено`,
        tests: [
          { type: "codeRegex", name: "Ввід", pattern: "msg\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Прапорець True", pattern: "is_allowed\\s*=\\s*True" },
          { type: "codeRegex", name: "Перевірка на спам/рекламу", pattern: "if\\s*['\"]спам['\"]\\s*in\\s*msg\\.lower\\s*\\(\\)\\s*or\\s*['\"]реклама['\"]\\s*in\\s*msg\\.lower\\s*\\(\\)\\s*:\\s*\\n\\s*is_allowed\\s*=\\s*False" },
          { type: "codeRegex", name: "Перевірка довжини", pattern: "if\\s*len\\s*\\(\\s*msg\\s*\\)\\s*<\\s*5\\s*:\\s*\\n\\s*is_allowed\\s*=\\s*False" },
          { type: "codeRegex", name: "Тернарний print", pattern: "print\\s*\\(\\s*f['\"]Статус:\\s*\\{\\s*['\"]Опубліковано['\"]\\s*if\\s*is_allowed\\s*else\\s*['\"]Видалено['\"]\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      }
    ]
  };



  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
