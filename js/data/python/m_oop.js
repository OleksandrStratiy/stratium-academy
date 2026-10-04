// js/data/python/m_oop.js
(function () {
  "use strict";

  const code = (...lines) => lines.join("\n");
  const h2 = (text, color = "#0ea5e9") => `<h2 style="color: ${color}; font-size: 18px; margin-bottom: 10px;">${text}</h2>`;

  const moduleObj = {
    id: "m_oop",
    title: "ООП: класи та об'єкти",
    icon: "ri-shapes-line",
    color: "#06b6d4",
    desc: "Класи, об'єкти, атрибути й методи, наслідування, властивості, спеціальні методи та проєктування програм з об'єктів.",

    tasks: [
      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR
      // ==========================================
      {
        title: "🐱 Перший клас",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Клас і об'єкт")}
          <p><b>Клас</b> — це креслення, а <b>об'єкт</b> — річ, створена за цим кресленням. Функції всередині класу називаються <b>методами</b>; першим параметром вони завжди отримують <code>self</code> — сам об'єкт.</p>
          <div class="code-box">class Dog:<br>    def bark(self):<br>        print("Гав!")<br><br>rex = Dog()<br>rex.bark()</div>
          <div class="output-box">Гав!</div>
        `,
        desc: `
          <div class="task-main"><p>Створи свій перший клас.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси клас <code>Cat</code> з методом <code>meow(self)</code>, що виводить <code>"Мяу!"</code>. Створи об'єкт <code>murka = Cat()</code> і виклич метод двічі.</div>
        `,
        hint: code("class Cat:", "    def meow(self):", '        print("Мяу!")', "", "murka = Cat()", "murka.meow()"),
        expected: code("Мяу!", "Мяу!"),
        solution: code("class Cat:", "    def meow(self):", '        print("Мяу!")', "", "murka = Cat()", "murka.meow()", "murka.meow()"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Мяу!\nМяу!" },
          { type: "codeRegex", name: "Клас Cat", pattern: "class\\s+Cat\\s*(\\(\\s*\\))?\\s*:" },
          { type: "codeRegex", name: "Метод з self", pattern: "def\\s+meow\\s*\\(\\s*self\\s*\\)" },
          { type: "codeCountIncludes", name: "Два виклики", value: "murka.meow()", min: 2 }
        ]
      },
      {
        title: "🏗️ Конструктор __init__",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Атрибути об'єкта")}
          <p>Метод <code>__init__</code> викликається автоматично при створенні об'єкта. У ньому задають <b>атрибути</b>: <code>self.name = name</code>.</p>
          <div class="code-box">class Pet:<br>    def __init__(self, name):<br>        self.name = name<br><br>p = Pet("Рекс")<br>print(p.name)</div>
          <div class="output-box">Рекс</div>
        `,
        desc: `
          <div class="task-main"><p>Створи клас учня.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси клас <code>Student</code> з <code>__init__(self, name, grade)</code>, що зберігає обидва атрибути. Створи <code>s = Student("Оля", 7)</code> і виведи <code>f"{s.name} навчається в {s.grade} класі"</code>.</div>
        `,
        hint: code("class Student:", "    def __init__(self, name, grade):", "        self.name = name", "        self.grade = grade"),
        expected: `Оля навчається в 7 класі`,
        solution: code("class Student:", "    def __init__(self, name, grade):", "        self.name = name", "        self.grade = grade", "", 's = Student("Оля", 7)', 'print(f"{s.name} навчається в {s.grade} класі")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Оля навчається в 7 класі" },
          { type: "codeRegex", name: "Конструктор", pattern: "def\\s+__init__\\s*\\(\\s*self\\s*,\\s*name\\s*,\\s*grade\\s*\\)" },
          { type: "codeIncludesAll", name: "Атрибути", values: ["self.name = name", "self.grade = grade"] }
        ]
      },
      {
        title: "👯 Кілька об'єктів",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Кожен об'єкт — окремий")}
          <p>З одного класу можна створити скільки завгодно об'єктів, і кожен має власні значення атрибутів.</p>
        `,
        desc: `
          <div class="task-main"><p>Два герої гри.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Hero</code> з атрибутами <code>name</code> і <code>hp</code>. Створи <code>knight = Hero("Лицар", 120)</code> і <code>elf = Hero("Ельф", 80)</code>. Виведи рядки <code>Лицар: 120 HP</code> та <code>Ельф: 80 HP</code>.</div>
        `,
        hint: code("class Hero:", "    def __init__(self, name, hp):", "        self.name = name", "        self.hp = hp"),
        expected: code("Лицар: 120 HP", "Ельф: 80 HP"),
        solution: code("class Hero:", "    def __init__(self, name, hp):", "        self.name = name", "        self.hp = hp", "", 'knight = Hero("Лицар", 120)', 'elf = Hero("Ельф", 80)', "for h in [knight, elf]:", '    print(f"{h.name}: {h.hp} HP")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Лицар: 120 HP\nЕльф: 80 HP" },
          { type: "codeCountIncludes", name: "Два об'єкти", value: "Hero(", min: 2 }
        ]
      },
      {
        title: "🤖 Метод з параметром",
        xp: 55,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Методи використовують атрибути")}
          <p>Усередині методу доступ до атрибутів об'єкта — через <code>self</code>: <code>self.name</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Робот, що розмовляє.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Robot</code> з атрибутом <code>name</code> і методом <code>say(self, text)</code>, що виводить <code>f"{self.name}: {text}"</code>. Створи робота <code>"R2"</code> і виклич <code>say("Привіт!")</code> та <code>say("Заряд 100%")</code>.</div>
        `,
        hint: code("    def say(self, text):", '        print(f"{self.name}: {text}")'),
        expected: code("R2: Привіт!", "R2: Заряд 100%"),
        solution: code("class Robot:", "    def __init__(self, name):", "        self.name = name", "", "    def say(self, text):", '        print(f"{self.name}: {text}")', "", 'bot = Robot("R2")', 'bot.say("Привіт!")', 'bot.say("Заряд 100%")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "R2: Привіт!\nR2: Заряд 100%" },
          { type: "codeRegex", name: "Метод say", pattern: "def\\s+say\\s*\\(\\s*self\\s*,\\s*text\\s*\\)" },
          { type: "codeCountIncludes", name: "Один print", value: "print(", max: 1 }
        ]
      },
      {
        title: "🔢 Метод змінює стан",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Стан об'єкта")}
          <p>Методи можуть змінювати атрибути: <code>self.value += 1</code>. Об'єкт «пам'ятає» свій стан між викликами.</p>
        `,
        desc: `
          <div class="task-main"><p>Лічильник відвідувачів.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Counter</code>: у <code>__init__</code> задай <code>self.value = 0</code>, метод <code>click()</code> збільшує значення на 1, метод <code>reset()</code> обнуляє. Зроби 3 кліки, виведи значення, скинь і виведи знову.</div>
        `,
        hint: code("    def click(self):", "        self.value += 1"),
        expected: code("3", "0"),
        solution: code("class Counter:", "    def __init__(self):", "        self.value = 0", "", "    def click(self):", "        self.value += 1", "", "    def reset(self):", "        self.value = 0", "", "c = Counter()", "c.click()", "c.click()", "c.click()", "print(c.value)", "c.reset()", "print(c.value)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "3\n0" },
          { type: "codeIncludes", name: "Зміна атрибута", value: "self.value += 1" },
          { type: "codeRegex", name: "Метод reset", pattern: "def\\s+reset\\s*\\(\\s*self\\s*\\)" }
        ]
      },
      {
        title: "📏 Методи повертають значення",
        xp: 65,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("return у методах")}
          <p>Метод може обчислити щось з атрибутів і повернути результат.</p>
        `,
        desc: `
          <div class="task-main"><p>Прямокутна кімната.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Rectangle(width, height)</code> з методами <code>area()</code> і <code>perimeter()</code>. Для прямокутника 5×3 виведи <code>f"Площа: {r.area()}"</code> та <code>f"Периметр: {r.perimeter()}"</code>.</div>
        `,
        hint: code("    def area(self):", "        return self.width * self.height"),
        expected: code("Площа: 15", "Периметр: 16"),
        solution: code("class Rectangle:", "    def __init__(self, width, height):", "        self.width = width", "        self.height = height", "", "    def area(self):", "        return self.width * self.height", "", "    def perimeter(self):", "        return 2 * (self.width + self.height)", "", "r = Rectangle(5, 3)", 'print(f"Площа: {r.area()}")', 'print(f"Периметр: {r.perimeter()}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Площа: 15\nПериметр: 16" },
          { type: "codeRegex", name: "Метод area повертає", pattern: "def\\s+area\\s*\\(\\s*self\\s*\\)\\s*:\\s*\\n\\s+return" }
        ]
      },
      {
        title: "🏦 Банківський рахунок",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Перевірки в методах")}
          <p>Методи захищають об'єкт від неправильних дій: наприклад, не дають зняти більше грошей, ніж є на рахунку.</p>
        `,
        desc: `
          <div class="task-main"><p>Створи простий банківський рахунок.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Account</code> з <code>balance = 0</code>. Метод <code>deposit(amount)</code> додає гроші. Метод <code>withdraw(amount)</code> знімає, якщо достатньо коштів, інакше виводить <code>"Недостатньо коштів"</code>. Виконай: покласти 500, зняти 200, зняти 400. Виведи <code>f"Баланс: {acc.balance}"</code>.</div>
        `,
        hint: code("    def withdraw(self, amount):", "        if amount > self.balance:", '            print("Недостатньо коштів")', "        else:", "            self.balance -= amount"),
        expected: code("Недостатньо коштів", "Баланс: 300"),
        solution: code("class Account:", "    def __init__(self):", "        self.balance = 0", "", "    def deposit(self, amount):", "        self.balance += amount", "", "    def withdraw(self, amount):", "        if amount > self.balance:", '            print("Недостатньо коштів")', "        else:", "            self.balance -= amount", "", "acc = Account()", "acc.deposit(500)", "acc.withdraw(200)", "acc.withdraw(400)", 'print(f"Баланс: {acc.balance}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Недостатньо коштів\nБаланс: 300" },
          { type: "codeIncludesAll", name: "Методи", values: ["def deposit(self, amount)", "def withdraw(self, amount)"] },
          { type: "codeIncludes", name: "Перевірка балансу", value: "amount > self.balance" }
        ]
      },
      {
        title: "📕 Текстовий вигляд: __str__",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("__str__")}
          <p>Метод <code>__str__</code> визначає, як об'єкт виглядає у <code>print()</code> та f-рядках. Він має повертати рядок.</p>
          <div class="code-box">class Pet:<br>    def __init__(self, name):<br>        self.name = name<br>    def __str__(self):<br>        return f"Улюбленець {self.name}"<br><br>print(Pet("Бім"))</div>
          <div class="output-box">Улюбленець Бім</div>
        `,
        desc: `
          <div class="task-main"><p>Красивий вивід книжки.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Book(title, author)</code> з <code>__str__</code>, що повертає <code>f"«{self.title}» — {self.author}"</code>. Виведи <code>print(book)</code> для «Кайдашева сім'я» Івана Нечуя-Левицького.</div>
        `,
        hint: code("    def __str__(self):", '        return f"«{self.title}» — {self.author}"'),
        expected: `«Кайдашева сім'я» — Іван Нечуй-Левицький`,
        solution: code("class Book:", "    def __init__(self, title, author):", "        self.title = title", "        self.author = author", "", "    def __str__(self):", '        return f"«{self.title}» — {self.author}"', "", 'book = Book("Кайдашева сім\'я", "Іван Нечуй-Левицький")', "print(book)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "«Кайдашева сім'я» — Іван Нечуй-Левицький", normalize: "strict" },
          { type: "codeRegex", name: "__str__", pattern: "def\\s+__str__\\s*\\(\\s*self\\s*\\)" },
          { type: "codeIncludes", name: "print(book)", value: "print(book)" }
        ]
      },
      {
        title: "🛍️ Список об'єктів",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Колекції об'єктів")}
          <p>Об'єкти можна зберігати у списку і обробляти циклом, звертаючись до атрибутів кожного.</p>
        `,
        desc: `
          <div class="task-main"><p>Порахуй вартість кошика товарів.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Product(name, price)</code>. Створи список: «Зошит» 30, «Ручка» 15, «Рюкзак» 750. Виведи кожен товар як <code>Зошит — 30 грн</code>, а потім <code>f"Разом: {total} грн"</code>.</div>
        `,
        hint: code("products = [Product(\"Зошит\", 30), Product(\"Ручка\", 15), Product(\"Рюкзак\", 750)]", "total = 0", "for p in products:", "    total += p.price"),
        expected: code("Зошит — 30 грн", "Ручка — 15 грн", "Рюкзак — 750 грн", "Разом: 795 грн"),
        solution: code("class Product:", "    def __init__(self, name, price):", "        self.name = name", "        self.price = price", "", 'products = [Product("Зошит", 30), Product("Ручка", 15), Product("Рюкзак", 750)]', "total = 0", "for p in products:", '    print(f"{p.name} — {p.price} грн")', "    total += p.price", 'print(f"Разом: {total} грн")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Зошит — 30 грн\nРучка — 15 грн\nРюкзак — 750 грн\nРазом: 795 грн" },
          { type: "codeCountIncludes", name: "Три об'єкти", value: "Product(", min: 3 },
          { type: "codeIncludes", name: "Сума цін", value: ".price" }
        ]
      },
      {
        title: "👥 Атрибут класу",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Спільні дані")}
          <p>Атрибут, оголошений прямо в класі (не через <code>self</code>), спільний для всіх об'єктів: <code>Player.count</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Порахуй, скільки гравців зареєструвалося.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Player</code> з атрибутом класу <code>count = 0</code>. У <code>__init__(self, nick)</code> збільшуй <code>Player.count</code>. Створи трьох гравців і виведи <code>f"Гравців: {Player.count}"</code>.</div>
        `,
        hint: code("class Player:", "    count = 0", "    def __init__(self, nick):", "        self.nick = nick", "        Player.count += 1"),
        expected: `Гравців: 3`,
        solution: code("class Player:", "    count = 0", "", "    def __init__(self, nick):", "        self.nick = nick", "        Player.count += 1", "", 'a = Player("neo")', 'b = Player("trinity")', 'c = Player("morpheus")', 'print(f"Гравців: {Player.count}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Гравців: 3" },
          { type: "codeIncludes", name: "Збільшення лічильника класу", value: "Player.count += 1" }
        ]
      },
      {
        title: "🐾 Улюбленець з клавіатури",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Об'єкт з введених даних")}
          <p>Аргументи конструктора можуть прийти з <code>input()</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Створи улюбленця за даними користувача.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Pet(name, kind)</code> з методом <code>info()</code>, що повертає <code>f"{self.kind} на ім'я {self.name}"</code>. Запитай ім'я та вид через <code>input()</code>, створи об'єкт і виведи <code>pet.info()</code>.</div>
        `,
        hint: code('pet = Pet(input("Ім\'я: "), input("Вид: "))', "print(pet.info())"),
        expected: code("Ім'я: Бублик", "Вид: Хом'як", "Хом'як на ім'я Бублик"),
        solution: code("class Pet:", "    def __init__(self, name, kind):", "        self.name = name", "        self.kind = kind", "", "    def info(self):", '        return f"{self.kind} на ім\'я {self.name}"', "", 'name = input("Ім\'я: ")', 'kind = input("Вид: ")', "pet = Pet(name, kind)", "print(pet.info())"),
        tests: [
          { type: "codeRegex", name: "Метод info", pattern: "def\\s+info\\s*\\(\\s*self\\s*\\)" },
          { type: "codeCountIncludes", name: "Два input()", value: "input(", min: 2 },
          { type: "codeIncludes", name: "Виклик info()", value: ".info()" }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Коло",
        xp: 200,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Площа кола: <code>π · r²</code>, довжина: <code>2 · π · r</code>. Візьми <code>pi = 3.14159</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Клас для кола.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Circle(radius)</code> з методами <code>area()</code> і <code>length()</code> (використай <code>3.14159</code>). Для радіусів 1 та 2.5 виведи <code>f"r={c.radius}: S={c.area():.2f}, L={c.length():.2f}"</code>.</div>
        `,
        hint: code("    def area(self):", "        return 3.14159 * self.radius ** 2"),
        expected: code("r=1: S=3.14, L=6.28", "r=2.5: S=19.63, L=15.71"),
        solution: code("class Circle:", "    def __init__(self, radius):", "        self.radius = radius", "", "    def area(self):", "        return 3.14159 * self.radius ** 2", "", "    def length(self):", "        return 2 * 3.14159 * self.radius", "", "for c in [Circle(1), Circle(2.5)]:", '    print(f"r={c.radius}: S={c.area():.2f}, L={c.length():.2f}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "r=1: S=3.14, L=6.28\nr=2.5: S=19.63, L=15.71" },
          { type: "codeIncludesAll", name: "Методи", values: ["def area(self)", "def length(self)"] }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Термостат",
        xp: 220,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Метод має утримувати значення в допустимих межах.</p>
        `,
        desc: `
          <div class="task-main"><p>Розумний термостат дозволяє температуру лише від 16 до 28 градусів.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Thermostat</code> з <code>temp = 20</code> і методом <code>set_temp(value)</code>: якщо значення менше 16 — встановлює 16, більше 28 — 28, інакше саме значення. Після кожного з викликів <code>set_temp(25)</code>, <code>set_temp(5)</code>, <code>set_temp(40)</code> виведи <code>f"Температура: {t.temp}°C"</code>.</div>
        `,
        hint: code("    def set_temp(self, value):", "        if value < 16:", "            value = 16", "        elif value > 28:", "            value = 28", "        self.temp = value"),
        expected: code("Температура: 25°C", "Температура: 16°C", "Температура: 28°C"),
        solution: code("class Thermostat:", "    def __init__(self):", "        self.temp = 20", "", "    def set_temp(self, value):", "        if value < 16:", "            value = 16", "        elif value > 28:", "            value = 28", "        self.temp = value", "", "t = Thermostat()", "for v in [25, 5, 40]:", "    t.set_temp(v)", '    print(f"Температура: {t.temp}°C")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Температура: 25°C\nТемпература: 16°C\nТемпература: 28°C" },
          { type: "codeRegex", name: "Метод set_temp", pattern: "def\\s+set_temp\\s*\\(\\s*self\\s*,\\s*value\\s*\\)" }
        ]
      },
      {
        title: "🐉 БОС (Junior): Тамагочі",
        xp: 600,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          ${h2("Фінальний іспит Junior", "#ef4444")}
          <p>Об'єкт зі станом, який змінюють різні методи.</p>
        `,
        desc: `
          <div class="task-main"><p>Створи віртуального улюбленця.</p></div>
          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. Клас <code>Tamagotchi(name)</code> з атрибутами <code>hunger = 5</code> і <code>mood = 5</code>.<br>
            2. <code>feed()</code>: голод −3 (не менше 0).<br>
            3. <code>play()</code>: настрій +2 (не більше 10), голод +1.<br>
            4. <code>status()</code>: повертає <code>f"{name}: голод {hunger}, настрій {mood}"</code>.<br>
            5. Створи <code>"Пухнастик"</code>, виконай <code>play()</code>, <code>play()</code>, <code>feed()</code>, <code>play()</code>, <code>feed()</code> і після кожної дії виведи <code>status()</code>.
          </div>
        `,
        hint: code("    def feed(self):", "        self.hunger = max(0, self.hunger - 3)"),
        expected: code("Пухнастик: голод 6, настрій 7", "Пухнастик: голод 7, настрій 9", "Пухнастик: голод 4, настрій 9", "Пухнастик: голод 5, настрій 10", "Пухнастик: голод 2, настрій 10"),
        solution: code(
          "class Tamagotchi:",
          "    def __init__(self, name):",
          "        self.name = name",
          "        self.hunger = 5",
          "        self.mood = 5",
          "",
          "    def feed(self):",
          "        self.hunger = max(0, self.hunger - 3)",
          "",
          "    def play(self):",
          "        self.mood = min(10, self.mood + 2)",
          "        self.hunger += 1",
          "",
          "    def status(self):",
          '        return f"{self.name}: голод {self.hunger}, настрій {self.mood}"',
          "",
          'pet = Tamagotchi("Пухнастик")',
          "for action in [pet.play, pet.play, pet.feed, pet.play, pet.feed]:",
          "    action()",
          "    print(pet.status())"
        ),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Пухнастик: голод 6, настрій 7\nПухнастик: голод 7, настрій 9\nПухнастик: голод 4, настрій 9\nПухнастик: голод 5, настрій 10\nПухнастик: голод 2, настрій 10" },
          { type: "codeIncludesAll", name: "Методи", values: ["def feed(self)", "def play(self)", "def status(self)"] },
          { type: "codeRegex", name: "Клас Tamagotchi", pattern: "class\\s+Tamagotchi" }
        ]
      },

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE
      // ==========================================
      {
        title: "🧬 Наслідування",
        xp: 100,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Дочірні класи")}
          <p><code>class Dog(Animal):</code> — клас <code>Dog</code> успадковує всі атрибути й методи <code>Animal</code> і може <b>перевизначити</b> деякі з них.</p>
        `,
        desc: `
          <div class="task-main"><p>Тварини говорять по-різному.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Animal(name)</code> з методом <code>speak()</code>, що повертає <code>"..."</code>. Класи <code>Dog</code> і <code>Cat</code> успадковують <code>Animal</code> і перевизначають <code>speak()</code> («Гав!» і «Мяу!»). Для списку з собаки «Рекс», кота «Мурчик» і тварини «Їжак» виведи <code>f"{a.name}: {a.speak()}"</code>.</div>
        `,
        hint: code("class Dog(Animal):", "    def speak(self):", '        return "Гав!"'),
        expected: code("Рекс: Гав!", "Мурчик: Мяу!", "Їжак: ..."),
        solution: code("class Animal:", "    def __init__(self, name):", "        self.name = name", "", "    def speak(self):", '        return "..."', "", "class Dog(Animal):", "    def speak(self):", '        return "Гав!"', "", "class Cat(Animal):", "    def speak(self):", '        return "Мяу!"', "", 'for a in [Dog("Рекс"), Cat("Мурчик"), Animal("Їжак")]:', '    print(f"{a.name}: {a.speak()}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Рекс: Гав!\nМурчик: Мяу!\nЇжак: ..." },
          { type: "codeIncludesAll", name: "Наслідування", values: ["class Dog(Animal)", "class Cat(Animal)"] },
          { type: "codeCountIncludes", name: "Один __init__", value: "__init__", max: 1 }
        ]
      },
      {
        title: "⬆️ Виклик батьківського методу: super()",
        xp: 110,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("super()")}
          <p><code>super().__init__(...)</code> викликає конструктор батьківського класу, щоб не дублювати код.</p>
          <div class="code-box">class Manager(Employee):<br>    def __init__(self, name, salary, team):<br>        super().__init__(name, salary)<br>        self.team = team</div>
        `,
        desc: `
          <div class="task-main"><p>Працівники та менеджери.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Employee(name, salary)</code> з методом <code>info()</code> → <code>f"{self.name}, зарплата {self.salary}"</code>. Клас <code>Manager(Employee)</code> додає атрибут <code>team</code> (кількість людей) через <code>super().__init__</code> і перевизначає <code>info()</code>: батьківський текст + <code>f", команда {self.team}"</code>. Виведи <code>info()</code> для працівника «Оля» 30000 і менеджера «Ігор» 50000 з командою 5.</div>
        `,
        hint: code("    def info(self):", '        return super().info() + f", команда {self.team}"'),
        expected: code("Оля, зарплата 30000", "Ігор, зарплата 50000, команда 5"),
        solution: code("class Employee:", "    def __init__(self, name, salary):", "        self.name = name", "        self.salary = salary", "", "    def info(self):", '        return f"{self.name}, зарплата {self.salary}"', "", "class Manager(Employee):", "    def __init__(self, name, salary, team):", "        super().__init__(name, salary)", "        self.team = team", "", "    def info(self):", '        return super().info() + f", команда {self.team}"', "", 'print(Employee("Оля", 30000).info())', 'print(Manager("Ігор", 50000, 5).info())'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Оля, зарплата 30000\nІгор, зарплата 50000, команда 5" },
          { type: "codeIncludesAll", name: "super()", values: ["super().__init__(", "super().info()"], checkRaw: true }
        ]
      },
      {
        title: "🔷 Поліморфізм",
        xp: 120,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Один інтерфейс — різна поведінка")}
          <p>Якщо різні класи мають метод з однаковою назвою, з ними можна працювати однаково, не перевіряючи тип.</p>
        `,
        desc: `
          <div class="task-main"><p>Сумарна площа різних фігур.</p></div>
          <div class="task-condition"><b>Умова:</b> Класи <code>Square(side)</code>, <code>Rect(w, h)</code>, <code>Triangle(base, h)</code> — кожен з методом <code>area()</code>. Для списку <code>[Square(3), Rect(2, 5), Triangle(4, 3)]</code> виведи площу кожної фігури (<code>:.1f</code>) і загальну суму.</div>
        `,
        hint: code("total = 0", "for s in shapes:", '    print(f"{type(s).__name__}: {s.area():.1f}")', "    total += s.area()"),
        expected: code("Square: 9.0", "Rect: 10.0", "Triangle: 6.0", "Разом: 25.0"),
        solution: code("class Square:", "    def __init__(self, side):", "        self.side = side", "    def area(self):", "        return self.side ** 2", "", "class Rect:", "    def __init__(self, w, h):", "        self.w = w", "        self.h = h", "    def area(self):", "        return self.w * self.h", "", "class Triangle:", "    def __init__(self, base, h):", "        self.base = base", "        self.h = h", "    def area(self):", "        return self.base * self.h / 2", "", "shapes = [Square(3), Rect(2, 5), Triangle(4, 3)]", "total = 0", "for s in shapes:", '    print(f"{type(s).__name__}: {s.area():.1f}")', "    total += s.area()", 'print(f"Разом: {total:.1f}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Square: 9.0\nRect: 10.0\nTriangle: 6.0\nРазом: 25.0" },
          { type: "codeCountIncludes", name: "Три методи area", value: "def area(self)", min: 3 }
        ]
      },
      {
        title: "🔎 isinstance()",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Перевірка типу")}
          <p><code>isinstance(obj, Class)</code> повертає <code>True</code>, якщо об'єкт належить класу або його нащадку.</p>
        `,
        desc: `
          <div class="task-main"><p>Розсортуй транспорт.</p></div>
          <div class="task-condition"><b>Умова:</b> Класи <code>Vehicle</code>, <code>Car(Vehicle)</code>, <code>Bike(Vehicle)</code> (можна з <code>pass</code>). Для списку <code>[Car(), Bike(), Car(), Vehicle()]</code> порахуй, скільки там <code>Car</code>, і скільки всього <code>Vehicle</code>. Виведи <code>f"Авто: {cars}, транспорту: {total}"</code>.</div>
        `,
        hint: code("cars = sum(1 for v in items if isinstance(v, Car))"),
        expected: `Авто: 2, транспорту: 4`,
        solution: code("class Vehicle:", "    pass", "", "class Car(Vehicle):", "    pass", "", "class Bike(Vehicle):", "    pass", "", "items = [Car(), Bike(), Car(), Vehicle()]", "cars = 0", "total = 0", "for v in items:", "    if isinstance(v, Car):", "        cars += 1", "    if isinstance(v, Vehicle):", "        total += 1", 'print(f"Авто: {cars}, транспорту: {total}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Авто: 2, транспорту: 4" },
          { type: "codeCountIncludes", name: "isinstance", value: "isinstance(", min: 2 }
        ]
      },
      {
        title: "🌡️ Властивість: @property",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("@property")}
          <p>Декоратор <code>@property</code> робить метод схожим на атрибут: <code>t.fahrenheit</code> без дужок. Значення обчислюється щоразу заново.</p>
        `,
        desc: `
          <div class="task-main"><p>Температура у двох шкалах.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Temperature(celsius)</code> з властивістю <code>fahrenheit</code> (<code>celsius * 9 / 5 + 32</code>). Створи <code>t = Temperature(25)</code>, виведи <code>t.fahrenheit</code>, зміни <code>t.celsius = 100</code> і виведи знову.</div>
        `,
        hint: code("    @property", "    def fahrenheit(self):", "        return self.celsius * 9 / 5 + 32"),
        expected: code("77.0", "212.0"),
        solution: code("class Temperature:", "    def __init__(self, celsius):", "        self.celsius = celsius", "", "    @property", "    def fahrenheit(self):", "        return self.celsius * 9 / 5 + 32", "", "t = Temperature(25)", "print(t.fahrenheit)", "t.celsius = 100", "print(t.fahrenheit)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "77.0\n212.0" },
          { type: "codeIncludes", name: "@property", value: "@property" },
          { type: "codeNotIncludes", name: "Без дужок при зверненні", value: "fahrenheit()" }
        ]
      },
      {
        title: "🛡️ Сеттер з перевіркою",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("@x.setter")}
          <p>Сеттер перехоплює присвоєння <code>obj.x = value</code> і може перевірити значення. Справжні дані зберігають у «прихованому» атрибуті <code>self._x</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Вік не може бути від'ємним.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Person</code> з властивістю <code>age</code>: сеттер приймає лише значення від 0 до 150, інакше виводить <code>"Некоректний вік"</code> і не змінює значення. Створи <code>p = Person(13)</code>, спробуй <code>p.age = -5</code>, потім <code>p.age = 14</code>, і виведи <code>p.age</code>.</div>
        `,
        hint: code("    @age.setter", "    def age(self, value):", "        if 0 <= value <= 150:", "            self._age = value", "        else:", '            print("Некоректний вік")'),
        expected: code("Некоректний вік", "14"),
        solution: code("class Person:", "    def __init__(self, age):", "        self._age = age", "", "    @property", "    def age(self):", "        return self._age", "", "    @age.setter", "    def age(self, value):", "        if 0 <= value <= 150:", "            self._age = value", "        else:", '            print("Некоректний вік")', "", "p = Person(13)", "p.age = -5", "p.age = 14", "print(p.age)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Некоректний вік\n14" },
          { type: "codeIncludesAll", name: "property і setter", values: ["@property", "@age.setter"] }
        ]
      },
      {
        title: "🧰 Статичний метод",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("@staticmethod")}
          <p>Статичний метод не отримує <code>self</code> і не працює з об'єктом — це просто функція, згрупована всередині класу. Викликається через клас: <code>Utils.f()</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Набір утиліт для перевірки даних.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Validator</code> зі статичними методами <code>is_email(s)</code> (містить <code>"@"</code> і <code>"."</code>) та <code>is_phone(s)</code> (рівно 10 символів і всі цифри). Виведи <code>Validator.is_email("a@b.ua")</code>, <code>Validator.is_phone("0501234567")</code>, <code>Validator.is_phone("050-123")</code>.</div>
        `,
        hint: code("    @staticmethod", "    def is_phone(s):", "        return len(s) == 10 and s.isdigit()"),
        expected: code("True", "True", "False"),
        solution: code("class Validator:", "    @staticmethod", "    def is_email(s):", '        return "@" in s and "." in s', "", "    @staticmethod", "    def is_phone(s):", "        return len(s) == 10 and s.isdigit()", "", 'print(Validator.is_email("a@b.ua"))', 'print(Validator.is_phone("0501234567"))', 'print(Validator.is_phone("050-123"))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "True\nTrue\nFalse" },
          { type: "codeCountIncludes", name: "@staticmethod", value: "@staticmethod", min: 2 }
        ]
      },
      {
        title: "🏭 Альтернативний конструктор: @classmethod",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("@classmethod")}
          <p>Метод класу отримує сам клас як <code>cls</code>. Його часто використовують як «альтернативний конструктор»: <code>Date.from_string("04.10.2026")</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Створення дати з рядка.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Date(day, month, year)</code> з методом <code>iso()</code> → <code>f"{self.year}-{self.month:02d}-{self.day:02d}"</code> і методом класу <code>from_string(cls, s)</code>, що розбирає рядок <code>"дд.мм.рррр"</code>. Виведи <code>Date.from_string("4.10.2026").iso()</code>.</div>
        `,
        hint: code("    @classmethod", "    def from_string(cls, s):", '        d, m, y = s.split(".")', "        return cls(int(d), int(m), int(y))"),
        expected: `2026-10-04`,
        solution: code("class Date:", "    def __init__(self, day, month, year):", "        self.day = day", "        self.month = month", "        self.year = year", "", "    @classmethod", "    def from_string(cls, s):", '        d, m, y = s.split(".")', "        return cls(int(d), int(m), int(y))", "", "    def iso(self):", '        return f"{self.year}-{self.month:02d}-{self.day:02d}"', "", 'print(Date.from_string("4.10.2026").iso())'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "2026-10-04" },
          { type: "codeIncludes", name: "@classmethod", value: "@classmethod" },
          { type: "codeIncludes", name: "Повертає cls(...)", value: "return cls(" }
        ]
      },
      {
        title: "🃏 Порівняння об'єктів",
        xp: 180,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("__eq__ та __lt__")}
          <p>Методи <code>__eq__</code> (для <code>==</code>) і <code>__lt__</code> (для <code>&lt;</code>) дозволяють порівнювати об'єкти та сортувати їх через <code>sorted()</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Сортування гральних карт.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Card(rank)</code> з методами <code>__eq__</code> і <code>__lt__</code>, що порівнюють <code>rank</code>. Виведи <code>Card(5) == Card(5)</code>, а потім ранги з <code>sorted([Card(9), Card(2), Card(7)])</code> через пробіл.</div>
        `,
        hint: code("    def __lt__(self, other):", "        return self.rank < other.rank"),
        expected: code("True", "2 7 9"),
        solution: code("class Card:", "    def __init__(self, rank):", "        self.rank = rank", "", "    def __eq__(self, other):", "        return self.rank == other.rank", "", "    def __lt__(self, other):", "        return self.rank < other.rank", "", "print(Card(5) == Card(5))", "cards = sorted([Card(9), Card(2), Card(7)])", 'print(" ".join(str(c.rank) for c in cards))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "True\n2 7 9" },
          { type: "codeIncludesAll", name: "__eq__ і __lt__", values: ["def __eq__(self, other)", "def __lt__(self, other)"] }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Рюкзак (композиція)",
        xp: 220,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p><b>Композиція</b> — один об'єкт містить інші: рюкзак має список предметів.</p>
        `,
        desc: `
          <div class="task-main"><p>Рюкзак з обмеженням ваги.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Item(name, weight)</code>. Клас <code>Backpack(max_weight)</code> зі списком <code>items</code>, методами <code>total_weight()</code> і <code>add(item)</code>: якщо предмет вміщується — додає і виводить <code>f"+ {item.name}"</code>, інакше <code>f"{item.name} не влазить"</code>. Рюкзак на 10 кг, додай: «Ноутбук» 3, «Намет» 6, «Казанок» 2, «Ліхтарик» 1. Наприкінці виведи <code>f"Вага: {bp.total_weight()} кг"</code>.</div>
        `,
        hint: code("    def add(self, item):", "        if self.total_weight() + item.weight <= self.max_weight:"),
        expected: code("+ Ноутбук", "+ Намет", "Казанок не влазить", "+ Ліхтарик", "Вага: 10 кг"),
        solution: code("class Item:", "    def __init__(self, name, weight):", "        self.name = name", "        self.weight = weight", "", "class Backpack:", "    def __init__(self, max_weight):", "        self.max_weight = max_weight", "        self.items = []", "", "    def total_weight(self):", "        return sum(i.weight for i in self.items)", "", "    def add(self, item):", "        if self.total_weight() + item.weight <= self.max_weight:", "            self.items.append(item)", '            print(f"+ {item.name}")', "        else:", '            print(f"{item.name} не влазить")', "", "bp = Backpack(10)", 'for item in [Item("Ноутбук", 3), Item("Намет", 6), Item("Казанок", 2), Item("Ліхтарик", 1)]:', "    bp.add(item)", 'print(f"Вага: {bp.total_weight()} кг")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "+ Ноутбук\n+ Намет\nКазанок не влазить\n+ Ліхтарик\nВага: 10 кг" },
          { type: "codeIncludesAll", name: "Два класи", values: ["class Item", "class Backpack"] },
          { type: "codeIncludes", name: "Список предметів", value: "self.items = []" }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Автопарк",
        xp: 240,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Наслідування + поліморфізм + атрибути батьківського класу.</p>
        `,
        desc: `
          <div class="task-main"><p>Розрахунок часу доставки.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Transport(name, speed)</code> з методом <code>time_for(km)</code> → <code>km / self.speed</code>. Класи <code>Truck</code> (швидкість 60, +1 година на розвантаження) і <code>Drone</code> (швидкість 90) успадковують <code>Transport</code>; <code>Truck</code> перевизначає <code>time_for</code> через <code>super().time_for(km) + 1</code>. Для 180 км виведи <code>f"{t.name}: {t.time_for(180):.1f} год"</code> для вантажівки «Волат» і дрона «Бджола».</div>
        `,
        hint: code("class Truck(Transport):", "    def __init__(self, name):", "        super().__init__(name, 60)", "    def time_for(self, km):", "        return super().time_for(km) + 1"),
        expected: code("Волат: 4.0 год", "Бджола: 2.0 год"),
        solution: code("class Transport:", "    def __init__(self, name, speed):", "        self.name = name", "        self.speed = speed", "", "    def time_for(self, km):", "        return km / self.speed", "", "class Truck(Transport):", "    def __init__(self, name):", "        super().__init__(name, 60)", "", "    def time_for(self, km):", "        return super().time_for(km) + 1", "", "class Drone(Transport):", "    def __init__(self, name):", "        super().__init__(name, 90)", "", 'for t in [Truck("Волат"), Drone("Бджола")]:', '    print(f"{t.name}: {t.time_for(180):.1f} год")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Волат: 4.0 год\nБджола: 2.0 год" },
          { type: "codeIncludesAll", name: "Наслідування", values: ["class Truck(Transport)", "class Drone(Transport)"] },
          { type: "codeIncludes", name: "super().time_for", value: "super().time_for(" }
        ]
      },
      {
        title: "🐉 БОС (Middle): Шкільна бібліотека",
        xp: 1000,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          ${h2("Фінальний іспит Middle", "#ef4444")}
          <p>Кілька класів, що взаємодіють: бібліотека керує книжками.</p>
        `,
        desc: `
          <div class="task-main"><p>Система видачі книжок.</p></div>
          <div class="task-condition">
            1. Клас <code>Book(title, author)</code> з атрибутом <code>available = True</code>.<br>
            2. Клас <code>Library</code> зі словником <code>books</code> (назва → Book) і методами:<br>
            &nbsp;&nbsp;<code>add(book)</code>;<br>
            &nbsp;&nbsp;<code>take(title)</code> → <code>"Видано: {title}"</code>, <code>"Вже видана: {title}"</code> або <code>"Немає книги: {title}"</code>;<br>
            &nbsp;&nbsp;<code>give_back(title)</code> → <code>"Повернено: {title}"</code>;<br>
            &nbsp;&nbsp;<code>report()</code> → назви доступних книжок через кому.<br>
            3. Додай «Захар Беркут» (І. Франко) і «Лісова пісня» (Л. Українка). Виведи результати: <code>take("Захар Беркут")</code>, <code>take("Захар Беркут")</code>, <code>take("Кобзар")</code>, <code>f"Доступні: {lib.report()}"</code>, <code>give_back("Захар Беркут")</code>, <code>f"Доступні: {lib.report()}"</code>.
          </div>
        `,
        hint: code("    def take(self, title):", "        if title not in self.books:", '            return f"Немає книги: {title}"'),
        expected: code("Видано: Захар Беркут", "Вже видана: Захар Беркут", "Немає книги: Кобзар", "Доступні: Лісова пісня", "Повернено: Захар Беркут", "Доступні: Захар Беркут, Лісова пісня"),
        solution: code(
          "class Book:",
          "    def __init__(self, title, author):",
          "        self.title = title",
          "        self.author = author",
          "        self.available = True",
          "",
          "class Library:",
          "    def __init__(self):",
          "        self.books = {}",
          "",
          "    def add(self, book):",
          "        self.books[book.title] = book",
          "",
          "    def take(self, title):",
          "        if title not in self.books:",
          '            return f"Немає книги: {title}"',
          "        book = self.books[title]",
          "        if not book.available:",
          '            return f"Вже видана: {title}"',
          "        book.available = False",
          '        return f"Видано: {title}"',
          "",
          "    def give_back(self, title):",
          "        self.books[title].available = True",
          '        return f"Повернено: {title}"',
          "",
          "    def report(self):",
          '        return ", ".join(t for t, b in self.books.items() if b.available)',
          "",
          "lib = Library()",
          'lib.add(Book("Захар Беркут", "І. Франко"))',
          'lib.add(Book("Лісова пісня", "Л. Українка"))',
          'print(lib.take("Захар Беркут"))',
          'print(lib.take("Захар Беркут"))',
          'print(lib.take("Кобзар"))',
          'print(f"Доступні: {lib.report()}")',
          'print(lib.give_back("Захар Беркут"))',
          'print(f"Доступні: {lib.report()}")'
        ),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Видано: Захар Беркут\nВже видана: Захар Беркут\nНемає книги: Кобзар\nДоступні: Лісова пісня\nПовернено: Захар Беркут\nДоступні: Захар Беркут, Лісова пісня" },
          { type: "codeIncludesAll", name: "Класи", values: ["class Book", "class Library"] },
          { type: "codeIncludesAll", name: "Методи", values: ["def take(self, title)", "def give_back(self, title)", "def report(self)"] }
        ]
      },

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR
      // ==========================================
      {
        title: "➕ Перевантаження операторів",
        xp: 150,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("__add__, __mul__, __str__")}
          <p>Спеціальні методи дозволяють об'єктам працювати з операторами: <code>v1 + v2</code> викликає <code>v1.__add__(v2)</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Двовимірні вектори.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Vector(x, y)</code> з <code>__add__</code> (сума векторів), <code>__mul__</code> (множення на число) і <code>__str__</code> → <code>f"({self.x}, {self.y})"</code>. Виведи <code>Vector(1, 2) + Vector(3, 4)</code> і <code>Vector(1, 2) * 3</code>.</div>
        `,
        hint: code("    def __add__(self, other):", "        return Vector(self.x + other.x, self.y + other.y)"),
        expected: code("(4, 6)", "(3, 6)"),
        solution: code("class Vector:", "    def __init__(self, x, y):", "        self.x = x", "        self.y = y", "", "    def __add__(self, other):", "        return Vector(self.x + other.x, self.y + other.y)", "", "    def __mul__(self, k):", "        return Vector(self.x * k, self.y * k)", "", "    def __str__(self):", '        return f"({self.x}, {self.y})"', "", "print(Vector(1, 2) + Vector(3, 4))", "print(Vector(1, 2) * 3)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "(4, 6)\n(3, 6)" },
          { type: "codeIncludesAll", name: "Спеціальні методи", values: ["__add__", "__mul__", "__str__"] }
        ]
      },
      {
        title: "📚 Власний контейнер",
        xp: 170,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("__len__ і __getitem__")}
          <p>Якщо реалізувати <code>__len__</code> та <code>__getitem__</code>, об'єкт працюватиме з <code>len()</code>, індексами <code>obj[i]</code> і зрізами — як справжня колекція.</p>
        `,
        desc: `
          <div class="task-main"><p>Плейлист як колекція.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Playlist(name)</code> зі списком <code>songs</code>, методом <code>add(song)</code>, а також <code>__len__</code> і <code>__getitem__(index)</code>. Додай три пісні: «Stefania», «Shum», «Teresa &amp; Maria». Виведи <code>len(p)</code>, <code>p[0]</code> і <code>p[-1]</code>.</div>
        `,
        hint: code("    def __len__(self):", "        return len(self.songs)", "    def __getitem__(self, index):", "        return self.songs[index]"),
        expected: code("3", "Stefania", "Teresa & Maria"),
        solution: code("class Playlist:", "    def __init__(self, name):", "        self.name = name", "        self.songs = []", "", "    def add(self, song):", "        self.songs.append(song)", "", "    def __len__(self):", "        return len(self.songs)", "", "    def __getitem__(self, index):", "        return self.songs[index]", "", 'p = Playlist("Хіти")', 'for s in ["Stefania", "Shum", "Teresa & Maria"]:', "    p.add(s)", "print(len(p))", "print(p[0])", "print(p[-1])"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "3\nStefania\nTeresa & Maria" },
          { type: "codeIncludesAll", name: "__len__ і __getitem__", values: ["def __len__(self)", "def __getitem__(self"] },
          { type: "codeIncludes", name: "len(p)", value: "len(p)" }
        ]
      },
      {
        title: "📐 Абстрактний клас",
        xp: 180,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Шаблон для нащадків")}
          <p>Базовий клас може оголосити метод, який <b>мусять</b> реалізувати нащадки: <code>raise NotImplementedError</code>. Так ми фіксуємо «контракт».</p>
        `,
        desc: `
          <div class="task-main"><p>Платіжні методи.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Payment</code> з методом <code>pay(amount)</code>, що кидає <code>NotImplementedError</code>. Нащадки: <code>Card</code> (комісія 1%: повертає <code>f"Картка: {amount * 1.01:.2f} грн"</code>) і <code>Cash</code> (повертає <code>f"Готівка: {amount:.2f} грн"</code>). Виведи <code>pay(250)</code> для обох. Потім спробуй <code>Payment().pay(1)</code> у <code>try/except NotImplementedError</code> і виведи <code>"Метод не реалізовано"</code>.</div>
        `,
        hint: code("class Payment:", "    def pay(self, amount):", "        raise NotImplementedError"),
        expected: code("Картка: 252.50 грн", "Готівка: 250.00 грн", "Метод не реалізовано"),
        solution: code("class Payment:", "    def pay(self, amount):", "        raise NotImplementedError", "", "class Card(Payment):", "    def pay(self, amount):", '        return f"Картка: {amount * 1.01:.2f} грн"', "", "class Cash(Payment):", "    def pay(self, amount):", '        return f"Готівка: {amount:.2f} грн"', "", "for method in [Card(), Cash()]:", "    print(method.pay(250))", "try:", "    Payment().pay(1)", "except NotImplementedError:", '    print("Метод не реалізовано")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Картка: 252.50 грн\nГотівка: 250.00 грн\nМетод не реалізовано" },
          { type: "codeIncludes", name: "raise NotImplementedError", value: "raise NotImplementedError" },
          { type: "codeIncludesAll", name: "Нащадки", values: ["class Card(Payment)", "class Cash(Payment)"] }
        ]
      },
      {
        title: "🆔 Автоматичні ID",
        xp: 190,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Лічильник у класі")}
          <p>Атрибут класу може видавати унікальні номери кожному новому об'єкту.</p>
        `,
        desc: `
          <div class="task-main"><p>Реєстрація користувачів з унікальними ID.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>User</code> з атрибутом класу <code>next_id = 1</code>. У <code>__init__(self, login)</code> об'єкт отримує <code>self.id = User.next_id</code>, після чого лічильник збільшується. Створи трьох користувачів і виведи рядки <code>#1 admin</code>, потім <code>f"Наступний ID: {User.next_id}"</code>.</div>
        `,
        hint: code("        self.id = User.next_id", "        User.next_id += 1"),
        expected: code("#1 admin", "#2 olya", "#3 max", "Наступний ID: 4"),
        solution: code("class User:", "    next_id = 1", "", "    def __init__(self, login):", "        self.login = login", "        self.id = User.next_id", "        User.next_id += 1", "", 'users = [User("admin"), User("olya"), User("max")]', "for u in users:", '    print(f"#{u.id} {u.login}")', 'print(f"Наступний ID: {User.next_id}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "#1 admin\n#2 olya\n#3 max\nНаступний ID: 4" },
          { type: "codeIncludes", name: "Лічильник", value: "User.next_id += 1" }
        ]
      },
      {
        title: "⚙️ Композиція: автомобіль і двигун",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Має, а не є")}
          <p>Автомобіль <b>має</b> двигун, а не <b>є</b> двигуном — тому тут краще композиція, а не наслідування. Об'єкт делегує роботу своїм частинам.</p>
        `,
        desc: `
          <div class="task-main"><p>Запуск автомобіля.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Engine(power)</code> з атрибутом <code>running = False</code> і методом <code>start()</code> → вмикає і повертає <code>f"Двигун {self.power} к.с. запущено"</code>. Клас <code>Car(model, power)</code> створює всередині <code>self.engine = Engine(power)</code>; метод <code>drive()</code>: якщо двигун не працює — спочатку запускає (виводить результат <code>start()</code>), потім виводить <code>f"{self.model} їде"</code>. Виклич <code>drive()</code> двічі.</div>
        `,
        hint: code("    def drive(self):", "        if not self.engine.running:", "            print(self.engine.start())", '        print(f"{self.model} їде")'),
        expected: code("Двигун 150 к.с. запущено", "Tesla їде", "Tesla їде"),
        solution: code("class Engine:", "    def __init__(self, power):", "        self.power = power", "        self.running = False", "", "    def start(self):", "        self.running = True", '        return f"Двигун {self.power} к.с. запущено"', "", "class Car:", "    def __init__(self, model, power):", "        self.model = model", "        self.engine = Engine(power)", "", "    def drive(self):", "        if not self.engine.running:", "            print(self.engine.start())", '        print(f"{self.model} їде")', "", 'car = Car("Tesla", 150)', "car.drive()", "car.drive()"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Двигун 150 к.с. запущено\nTesla їде\nTesla їде" },
          { type: "codeIncludes", name: "Композиція", value: "self.engine = Engine(" },
          { type: "codeNotIncludes", name: "Без наслідування від Engine", value: "(Engine)" }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Стек і дужки",
        xp: 260,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p><b>Стек</b> — структура «останнім прийшов — першим вийшов». З її допомогою перевіряють правильність дужок.</p>
        `,
        desc: `
          <div class="task-main"><p>Перевірка дужок за допомогою власного класу стеку.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Stack</code> з методами <code>push(x)</code>, <code>pop()</code>, <code>is_empty()</code>. Функція <code>balanced(s)</code>: для кожної відкриваючої дужки — push, для закриваючої — перевір, що стек не порожній і верхня дужка відповідна. Виведи результат для <code>"([]{()})"</code>, <code>"([)]"</code>, <code>"(("</code>.</div>
        `,
        hint: code('pairs = {")": "(", "]": "[", "}": "{"}', "for ch in s:", '    if ch in "([{":', "        st.push(ch)", "    elif ch in pairs:", "        if st.is_empty() or st.pop() != pairs[ch]:", "            return False", "return st.is_empty()"),
        expected: code("True", "False", "False"),
        solution: code(
          "class Stack:",
          "    def __init__(self):",
          "        self.items = []",
          "",
          "    def push(self, x):",
          "        self.items.append(x)",
          "",
          "    def pop(self):",
          "        return self.items.pop()",
          "",
          "    def is_empty(self):",
          "        return len(self.items) == 0",
          "",
          "def balanced(s):",
          '    pairs = {")": "(", "]": "[", "}": "{"}',
          "    st = Stack()",
          "    for ch in s:",
          '        if ch in "([{":',
          "            st.push(ch)",
          "        elif ch in pairs:",
          "            if st.is_empty() or st.pop() != pairs[ch]:",
          "                return False",
          "    return st.is_empty()",
          "",
          'for s in ["([]{()})", "([)]", "(("]:',
          "    print(balanced(s))"
        ),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "True\nFalse\nFalse" },
          { type: "codeIncludes", name: "Клас Stack", value: "class Stack" },
          { type: "codeIncludesAll", name: "Методи стеку", values: ["def push(self", "def pop(self)", "def is_empty(self)"] }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Гроші з валютою",
        xp: 280,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Об'єкт може відмовитися виконувати некоректну операцію, кинувши виняток: <code>raise ValueError("...")</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Не можна додавати гривні до доларів.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Money(amount, currency)</code> з <code>__add__</code>: якщо валюти різні — <code>raise ValueError("Різні валюти")</code>, інакше новий <code>Money</code>. <code>__str__</code> → <code>f"{self.amount:.2f} {self.currency}"</code>. Виведи <code>Money(100, "UAH") + Money(50.5, "UAH")</code>. Потім у <code>try/except ValueError as e</code> спробуй <code>Money(10, "USD") + Money(10, "UAH")</code> і виведи <code>f"Помилка: {e}"</code>.</div>
        `,
        hint: code("    def __add__(self, other):", "        if self.currency != other.currency:", '            raise ValueError("Різні валюти")'),
        expected: code("150.50 UAH", "Помилка: Різні валюти"),
        solution: code("class Money:", "    def __init__(self, amount, currency):", "        self.amount = amount", "        self.currency = currency", "", "    def __add__(self, other):", "        if self.currency != other.currency:", '            raise ValueError("Різні валюти")', "        return Money(self.amount + other.amount, self.currency)", "", "    def __str__(self):", '        return f"{self.amount:.2f} {self.currency}"', "", 'print(Money(100, "UAH") + Money(50.5, "UAH"))', "try:", '    print(Money(10, "USD") + Money(10, "UAH"))', "except ValueError as e:", '    print(f"Помилка: {e}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "150.50 UAH\nПомилка: Різні валюти" },
          { type: "codeIncludes", name: "raise ValueError", value: "raise ValueError(" },
          { type: "codeIncludes", name: "Обробка винятку", value: "except ValueError as e" }
        ]
      },
      {
        title: "🐉 БОС (Senior): Арена героїв",
        xp: 1500,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          ${h2("Фінальний іспит Senior", "#ef4444")}
          <p>Ієрархія класів з перевизначенням методів і викликом <code>super()</code> — основа ігрових рушіїв.</p>
        `,
        desc: `
          <div class="task-main"><p>Змоделюй бій двох героїв.</p></div>
          <div class="task-condition">
            1. <code>Character(name, hp, attack)</code>: методи <code>take_damage(dmg)</code> (hp зменшується, але не нижче 0; повертає отриману шкоду), <code>is_alive()</code>, <code>hit(other)</code> → <code>f"{self.name} б'є {other.name} на {dealt}"</code>.<br>
            2. <code>Warrior(Character)</code>: має <code>armor</code>; перевизначає <code>take_damage</code>: шкода зменшується на броню (мінімум 1) і передається в <code>super().take_damage(...)</code>.<br>
            3. <code>Mage(Character)</code>: кожен <b>другий</b> свій удар б'є подвійно.<br>
            4. Воїн «Святослав» (hp 30, атака 6, броня 2) і маг «Мольфар» (hp 24, атака 5) б'ються по черзі (першим — воїн), поки один не впаде. Виводь кожен удар, а наприкінці <code>f"Переміг {winner.name} ({winner.hp} HP)"</code>.
          </div>
        `,
        hint: code("class Warrior(Character):", "    def take_damage(self, dmg):", "        return super().take_damage(max(1, dmg - self.armor))"),
        expected: code(
          "Святослав б'є Мольфар на 6",
          "Мольфар б'є Святослав на 3",
          "Святослав б'є Мольфар на 6",
          "Мольфар б'є Святослав на 8",
          "Святослав б'є Мольфар на 6",
          "Мольфар б'є Святослав на 3",
          "Святослав б'є Мольфар на 6",
          "Переміг Святослав (16 HP)"
        ),
        solution: code(
          "class Character:",
          "    def __init__(self, name, hp, attack):",
          "        self.name = name",
          "        self.hp = hp",
          "        self.attack = attack",
          "",
          "    def take_damage(self, dmg):",
          "        dealt = min(self.hp, dmg)",
          "        self.hp -= dealt",
          "        return dealt",
          "",
          "    def is_alive(self):",
          "        return self.hp > 0",
          "",
          "    def damage(self):",
          "        return self.attack",
          "",
          "    def hit(self, other):",
          "        dealt = other.take_damage(self.damage())",
          "        return f\"{self.name} б'є {other.name} на {dealt}\"",
          "",
          "class Warrior(Character):",
          "    def __init__(self, name, hp, attack, armor):",
          "        super().__init__(name, hp, attack)",
          "        self.armor = armor",
          "",
          "    def take_damage(self, dmg):",
          "        return super().take_damage(max(1, dmg - self.armor))",
          "",
          "class Mage(Character):",
          "    def __init__(self, name, hp, attack):",
          "        super().__init__(name, hp, attack)",
          "        self.casts = 0",
          "",
          "    def damage(self):",
          "        self.casts += 1",
          "        if self.casts % 2 == 0:",
          "            return self.attack * 2",
          "        return self.attack",
          "",
          'a = Warrior("Святослав", 30, 6, 2)',
          'b = Mage("Мольфар", 24, 5)',
          "attacker, defender = a, b",
          "while a.is_alive() and b.is_alive():",
          "    print(attacker.hit(defender))",
          "    attacker, defender = defender, attacker",
          "winner = a if a.is_alive() else b",
          'print(f"Переміг {winner.name} ({winner.hp} HP)")'
        ),
        tests: [
          { type: "stdoutEquals", name: "Хід бою правильний", value: "Святослав б'є Мольфар на 6\nМольфар б'є Святослав на 3\nСвятослав б'є Мольфар на 6\nМольфар б'є Святослав на 8\nСвятослав б'є Мольфар на 6\nМольфар б'є Святослав на 3\nСвятослав б'є Мольфар на 6\nПереміг Святослав (16 HP)" },
          { type: "codeIncludesAll", name: "Ієрархія", values: ["class Warrior(Character)", "class Mage(Character)"] },
          { type: "codeIncludes", name: "super().take_damage", value: "super().take_damage(" }
        ]
      }
    ]
  };

  window.addModule("python_basics", moduleObj);
})();
