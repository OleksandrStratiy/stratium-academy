window.App = window.App || {};

window.App.uiTeacher = (function () {
  "use strict";

  function create(deps) {
    const { $, supa, state, toast, save, refreshSidebar } = deps;

    const escapeHtml = window.App.helpers?.escapeHtml || ((v) =>
      String(v ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;")
    );

    let activeClassCode = null;
    let activeStudents = [];

    async function fetchStudents(classCode) {
      if (!supa) return [];
      try {
        const { data, error } = await supa
          .from("profiles")
          .select("id, full_name, progress, updated_at, class_code, role")
          .eq("role", "student")
          .eq("class_code", classCode);

        if (error) throw error;
        return data || [];
      } catch (err) {
        console.error("Помилка завантаження учнів:", err);
        toast("❌ Не вдалося завантажити учнів");
        return [];
      }
    }

    async function removeStudentFromClass(studentId) {
      if (!supa) {
        toast("❌ Supabase не підключений");
        return false;
      }

      try {
        const { error } = await supa
          .from("profiles")
          .update({
            class_code: null,
            updated_at: new Date().toISOString()
          })
          .eq("id", studentId);

        if (error) throw error;
        return true;
      } catch (err) {
        console.error("Помилка видалення учня з класу:", err);
        toast("❌ Не вдалося вигнати учня з класу");
        return false;
      }
    }
    function generateClassCode() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";

  const prefix =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];

  const numbers = Math.floor(100 + Math.random() * 900);

  return `${prefix}-${numbers}`;
}

    function getStudentXP(student) {
      return Number(student?.progress?.user?.xp || 0);
    }

    function getStudentStreak(student) {
      return Number(student?.progress?.user?.streak || 0);
    }

    function getStudentLevel(student) {
      const xp = getStudentXP(student);
      const lvlObj = window.App.helpers.levelFromXp(xp);
      return lvlObj ? lvlObj.level : 1;
    }

    function formatDate(dateValue) {
      if (!dateValue) return "Немає даних";
      const d = new Date(dateValue);
      return d.toLocaleDateString("uk-UA") + " о " + d.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit"
      });
    }

    function calcClassStats(students) {
      const count = students.length;
      const totalXp = students.reduce((sum, s) => sum + getStudentXP(s), 0);
      const avgXp = count ? Math.round(totalXp / count) : 0;

      let topStudent = null;
      students.forEach(s => {
        if (!topStudent || getStudentXP(s) > getStudentXP(topStudent)) {
          topStudent = s;
        }
      });

      return {
        count,
        avgXp,
        topName: topStudent?.full_name || "—",
        topXp: topStudent ? getStudentXP(topStudent) : 0
      };
    }

    function getModuleTaskTotal(mod) {
      if (Array.isArray(mod.tasks)) return mod.tasks.length;
      if (Array.isArray(mod.taskRefs)) return mod.taskRefs.length;
      return 0;
    }

    function buildStudentModuleStats(student) {
      const progress = student?.progress || {};
      const user = progress.user || {};
      const completed = user.completed || {};
      const attempts = user.attempts || {};
      const spoiled = user.spoiled || {};

      const modules = [];

      (window.DB || []).forEach(course => {
        (course.modules || []).forEach(mod => {
          const prefix = `${course.id}_${mod.id}_`;

          const doneIds = Object.keys(completed).filter(k => k.startsWith(prefix));
          const attemptIds = Object.keys(attempts).filter(k => k.startsWith(prefix));
          const spoiledIds = Object.keys(spoiled).filter(k => k.startsWith(prefix));
          const spoiledCount = spoiledIds.length;
          const totalTasks = getModuleTaskTotal(mod);
          const junior = [];
const middle = [];
const senior = [];

(mod.tasks || []).forEach((task, i) => {

  const key = `${course.id}_${mod.id}_${i}`;
  const done = !!completed[key];

  const obj = {
    index: i,
    done,
    title: task.title
  };

  if (task.difficulty === "Junior") junior.push(obj);
  else if (task.difficulty === "Middle") middle.push(obj);
  else if (task.difficulty === "Senior") senior.push(obj);

});
          const doneTasks = doneIds.length;
          const attemptsSum = attemptIds.reduce((sum, key) => sum + Number(attempts[key] || 0), 0);

          if (totalTasks === 0 && doneTasks === 0 && attemptsSum === 0 && spoiledIds.length === 0) {
            return;
          }

          modules.push({
  courseTitle: course.title,
  moduleTitle: mod.title,

  junior,
  middle,
  senior,

  totalTasks,
  doneTasks,
  attemptsSum,
  spoiledCount
});
        });
      });

      return modules;
    }

    function closeStudentModal() {
      const existing = document.getElementById("teacherStudentModal");
      if (existing) existing.remove();
    }
    function renderLevel(name, tasks){

  if(!tasks.length) return "";

  return `
  <div style="margin-top:10px">

    <div style="font-weight:700;margin-bottom:6px">
      ${name}
    </div>

    <div style="display:flex;flex-wrap:wrap;gap:6px">
      ${tasks.map(t=>`
        <span style="
          padding:4px 8px;
          border-radius:6px;
          font-size:11px;
          background:${t.done ? 'rgba(34,197,94,.15)' : 'rgba(239,68,68,.12)'};
          color:${t.done ? '#22c55e' : '#ef4444'};
        ">
        ${t.done ? "✔" : "✖"} ${t.index+1}
        </span>
      `).join("")}
    </div>

  </div>
  `
}
    function openStudentModal(student) {
      closeStudentModal();

      const xp = getStudentXP(student);
      const lvl = getStudentLevel(student);
      const streak = getStudentStreak(student);
      const progress = student?.progress || {};
      const user = progress.user || {};
      const errorLogs = user.errorLogs || {};
      const moduleStats = buildStudentModuleStats(student);

      const totalDone = moduleStats.reduce((sum, m) => sum + m.doneTasks, 0);
      const totalTasks = moduleStats.reduce((sum, m) => sum + m.totalTasks, 0);
      const totalAttempts = moduleStats.reduce((sum, m) => sum + m.attemptsSum, 0);
      const totalSpoiled = moduleStats.reduce((sum, m) => sum + m.spoiledCount, 0);

      const modal = document.createElement("div");
      modal.id = "teacherStudentModal";
      modal.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: rgba(0,0,0,.68);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      `;

      modal.innerHTML = `
        <div style="
          width:min(980px, 96vw);
          max-height:90vh;
          overflow:auto;
          background: var(--card, #111827);
          border: 1px solid var(--border, rgba(255,255,255,.08));
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 24px 80px rgba(0,0,0,.45);
        ">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin-bottom:18px;">
            <div>
              <h2 style="margin:0 0 8px 0;">👨‍🎓 ${escapeHtml(student.full_name || "Без імені")}</h2>
              <div style="color:var(--text-dim); font-size:13px;">
                Остання активність: ${escapeHtml(formatDate(student.updated_at))}
              </div>
            </div>
            <button id="btnCloseStudentModal" style="
              border:none;
              background:rgba(255,255,255,.06);
              color:var(--text);
              border-radius:10px;
              padding:8px 12px;
              cursor:pointer;
            ">✖ Закрити</button>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); gap:12px; margin-bottom:18px;">
            <div style="padding:14px; border-radius:14px; background:rgba(34,197,94,.08); border:1px solid rgba(34,197,94,.18);">
              <div style="font-size:12px; color:var(--text-dim);">XP</div>
              <div style="font-size:24px; font-weight:800; color:var(--success);">${xp}</div>
            </div>
            <div style="padding:14px; border-radius:14px; background:rgba(14,165,233,.08); border:1px solid rgba(14,165,233,.18);">
              <div style="font-size:12px; color:var(--text-dim);">Рівень</div>
              <div style="font-size:24px; font-weight:800; color:var(--primary);">Lvl ${lvl}</div>
            </div>
            <div style="padding:14px; border-radius:14px; background:rgba(251,191,36,.08); border:1px solid rgba(251,191,36,.18);">
              <div style="font-size:12px; color:var(--text-dim);">🔥 Стрік</div>
              <div style="font-size:24px; font-weight:800; color:#fbbf24;">${streak}</div>
            </div>
            <div style="padding:14px; border-radius:14px; background:rgba(139,92,246,.08); border:1px solid rgba(139,92,246,.18);">
              <div style="font-size:12px; color:var(--text-dim);">Завдань пройдено</div>
              <div style="font-size:24px; font-weight:800; color:var(--accent);">${totalDone}/${totalTasks}</div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); gap:12px; margin-bottom:18px;">
            <div style="padding:14px; border-radius:14px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08);">
              <div style="font-size:12px; color:var(--text-dim);">Усього спроб</div>
              <div style="font-size:22px; font-weight:800;">${totalAttempts}</div>
            </div>
            <div style="padding:14px; border-radius:14px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08);">
              <div style="font-size:12px; color:var(--text-dim);">Модулів із прогресом</div>
              <div style="font-size:22px; font-weight:800;">${moduleStats.length}</div>
            </div>
            <div style="padding:14px; border-radius:14px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08);">
              <div style="font-size:12px; color:var(--text-dim);">Показів розв'язку</div>
              <div style="font-size:22px; font-weight:800;">${totalSpoiled}</div>
            </div>
          </div>
          <div style="margin-top:20px;">
  <h3 style="margin:0 0 12px 0;">❌ Останні помилки</h3>

  ${
    Object.keys(errorLogs).length === 0
      ? `<div style="padding:16px; border-radius:12px; background:rgba(255,255,255,.03); color:var(--text-dim);">
           Помилок поки немає.
         </div>`
      : `
        <div style="display:grid; gap:10px;">
          ${
            Object.values(errorLogs)
              .flat()
              .slice(0,10)
              .map(err => `
                <div style="
                  padding:14px;
                  border-radius:12px;
                  background:rgba(239,68,68,.05);
                  border:1px solid rgba(239,68,68,.25);
                ">

                  <div style="font-size:12px; color:var(--text-dim); margin-bottom:4px;">
                    ${new Date(err.at).toLocaleString("uk-UA")}
                  </div>

                  <div style="font-weight:700; margin-bottom:4px;">
                    ${escapeHtml(err.moduleTitle || "")}
                  </div>

                  <div style="font-size:13px; margin-bottom:6px;">
                    Завдання: ${escapeHtml(err.taskTitle || "")}
                  </div>

                  ${
                    err.runtimeError
                      ? `<div style="color:#ef4444; font-size:12px;">
                           ${escapeHtml(err.runtimeError)}
                         </div>`
                      : ""
                  }

                  ${
                    err.failedTests?.length
                      ? `<div style="font-size:12px; color:#f59e0b;">
                           Провалені тести: ${err.failedTests.length}
                         </div>`
                      : ""
                  }

                </div>
              `).join("")
          }
        </div>
      `
  }
</div>
          <div style="margin-top:10px;">
            <h3 style="margin:0 0 12px 0;">📘 Деталі по модулях</h3>
            ${
              moduleStats.length === 0
                ? `<div style="padding:16px; border-radius:12px; background:rgba(255,255,255,.03); color:var(--text-dim);">
                    Ще немає збереженого прогресу по модулях.
                   </div>`
                : `
                  <div style="display:grid; gap:10px;">
                    ${moduleStats.map(m => `
                      <div style="padding:14px; border-radius:14px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08);">
                        <div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;">
                          <div>
                            <div style="font-size:12px; color:var(--text-dim); margin-bottom:4px;">${escapeHtml(m.courseTitle)}</div>
                            <div style="font-size:16px; font-weight:800;">${escapeHtml(m.moduleTitle)}</div>
                          </div>
                          <div style="font-size:12px; color:${m.completed ? 'var(--success)' : 'var(--text-dim)'}; font-weight:700;">
                            ${m.completed ? "✅ Завершено" : "⏳ В процесі"}
                          </div>
                        </div>

                        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px,1fr)); gap:10px; margin-top:12px;">
                          <div><b>Завдань:</b> ${m.doneTasks}/${m.totalTasks}</div>
                          <div><b>Спроб:</b> ${m.attemptsSum}</div>
                          <div><b>Розв'язок:</b> ${m.spoiledCount}</div>
                        </div>
                        ${renderLevel("🟢 Junior", m.junior)}
${renderLevel("🟡 Middle", m.middle)}
${renderLevel("🔴 Senior", m.senior)}
                      </div>
                    `).join("")}
              
                    </div>
                `
            }
          </div>
            <div style="margin-top:20px;">
  <h3 style="margin:0 0 12px 0;">❌ Останні помилки</h3>

  ${
    Object.keys(errorLogs).length === 0
      ? `<div style="padding:16px; border-radius:12px; background:rgba(255,255,255,.03); color:var(--text-dim);">
           Помилок поки немає.
         </div>`
      : `
        <div style="display:grid; gap:10px;">
          ${
            Object.values(errorLogs)
              .flat()
              .slice(0,10)
              .map(err => `
                <div style="
                  padding:14px;
                  border-radius:12px;
                  background:rgba(239,68,68,.05);
                  border:1px solid rgba(239,68,68,.25);
                ">

                  <div style="font-size:12px; color:var(--text-dim); margin-bottom:4px;">
                    ${new Date(err.at).toLocaleString("uk-UA")}
                  </div>

                  <div style="font-weight:700; margin-bottom:4px;">
                    ${escapeHtml(err.moduleTitle || "")}
                  </div>

                  <div style="font-size:13px; margin-bottom:6px;">
                    Завдання: ${escapeHtml(err.taskTitle || "")}
                  </div>

                  ${
                    err.runtimeError
                      ? `<div style="color:#ef4444; font-size:12px;">
                           ${escapeHtml(err.runtimeError)}
                         </div>`
                      : ""
                  }

                  ${
                    err.failedTests?.length
                      ? `<div style="font-size:12px; color:#f59e0b;">
                           Провалені тести: ${err.failedTests.length}
                         </div>`
                      : ""
                  }

                </div>
              `).join("")
          }
        </div>
      `
  }
</div>
          <div style="margin-top:16px; color:var(--text-dim); font-size:12px;">
            Історія конкретних помилок зараз не показується, бо вона ще не зберігається у твоєму state / Supabase.
            Зараз доступні: XP, рівень, стрік, модулі, кількість завдань, спроби і покази розв'язку.
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeStudentModal();
      });

      const closeBtn = document.getElementById("btnCloseStudentModal");
      if (closeBtn) closeBtn.onclick = closeStudentModal;
    }

function renderClasses() {
  const list = $("classesList");
  if (!list) return;

  state.user.teacherClasses = state.user.teacherClasses || [];

  if (state.user.teacherClasses.length === 0) {
    list.innerHTML = `<div style="color:var(--text-dim); font-size:14px; padding:10px 0;">У тебе ще немає класів.</div>`;
    return;
  }

  list.innerHTML = state.user.teacherClasses.map(c => `
    <div class="class-badge" style="
      background:${activeClassCode === c.code ? "rgba(139,92,246,0.22)" : "rgba(139,92,246,0.10)"};
      border:1px solid var(--accent);
      color:var(--text);
      padding:10px 16px;
      border-radius:12px;
      display:flex;
      align-items:center;
      gap:12px;
      cursor:pointer;
      transition:.2s;
    ">
      <span class="open-class" data-code="${escapeHtml(c.code)}">
        <div style="font-weight:800;">
          ${escapeHtml(c.name)}
        </div>

        <div style="font-size:12px;color:var(--text-dim)">
          код: ${escapeHtml(c.code)}
        </div>
      </span>

      <button class="delete-class" data-del="${escapeHtml(c.code)}" style="
        background:transparent;
        border:none;
        color:var(--danger);
        cursor:pointer;
        padding:2px;
        font-size:16px;
        opacity:.75;
      " title="Видалити клас">
        <i class="ri-delete-bin-line" style="pointer-events:none;"></i>
      </button>
    </div>
  `).join("");

  list.querySelectorAll(".class-badge").forEach(badge => {
    badge.addEventListener("click", async (e) => {
      if (e.target.closest(".delete-class")) {
        const btn = e.target.closest(".delete-class");
        const c = btn.getAttribute("data-del");

        if (confirm(`Дійсно видалити клас ${c}? Дані учнів не видаляться, але ти більше не бачитимеш цей клас.`)) {
          state.user.teacherClasses = state.user.teacherClasses.filter(x => x.code !== c);
          save();

          if (activeClassCode === c) {
            activeClassCode = null;
            activeStudents = [];
            $("studentsContainer").innerHTML = `
              <div style="text-align:center; color: var(--text-dim); font-size: 16px;">
                <i class="ri-group-line" style="font-size: 32px; display: block; margin-bottom: 10px; opacity: 0.5;"></i>
                Обери клас зверху, щоб побачити прогрес учнів
              </div>
            `;
          }

          renderClasses();
          toast("🗑 Клас видалено");
        }
        return;
      }

      const codeNode = badge.querySelector(".open-class");
      if (codeNode) {
        await loadStudents(codeNode.getAttribute("data-code"));
      }
    });
  });
}

    function bindStudentActions(classCode, students) {
      const btnCopy = $("btnCopyClassCode");
      const btnRefresh = $("btnRefreshStudents");

      if (btnCopy) {
        btnCopy.onclick = async () => {
          try {
            await navigator.clipboard.writeText(classCode);
            toast("📋 Код класу скопійовано");
          } catch {
            toast("⚠️ Не вдалося скопіювати код");
          }
        };
      }

      if (btnRefresh) {
        btnRefresh.onclick = () => loadStudents(classCode);
      }

      document.querySelectorAll("[data-student-open]").forEach(row => {
        row.addEventListener("click", () => {
          const studentId = row.getAttribute("data-student-open");
          const student = students.find(s => s.id === studentId);
          if (student) openStudentModal(student);
        });
      });

      document.querySelectorAll("[data-kick-student]").forEach(btn => {
        btn.addEventListener("click", async (e) => {
          e.stopPropagation();

          const studentId = btn.getAttribute("data-kick-student");
          const student = students.find(s => s.id === studentId);
          if (!student) return;

          const ok = confirm(`Вигнати учня "${student.full_name}" з класу ${classCode}?`);
          if (!ok) return;

          const success = await removeStudentFromClass(studentId);
          
          if (success) {
            toast("✅ Учня видалено з класу");
            await loadStudents(classCode);
          }
        });
      });
    }
    
    function renderStudentsTable(classCode, students) {
      const cont = $("studentsContainer");
      const stats = calcClassStats(students);

      let html = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:18px;">
          <div>
            <h3 style="margin:0 0 6px 0;">Клас: <span style="color:var(--accent)">${escapeHtml(classCode)}</span></h3>
            <div style="color:var(--text-dim); font-size:13px;">Клік по учню відкриває детальну статистику.</div>
          </div>

          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button id="btnCopyClassCode" class="btn-primary" style="padding:10px 14px; border-radius:10px;">
              <i class="ri-file-copy-line"></i> Скопіювати код
            </button>
            <button id="btnRefreshStudents" style="
              padding:10px 14px;
              border-radius:10px;
              border:1px solid var(--border);
              background:rgba(255,255,255,.04);
              color:var(--text);
              cursor:pointer;
            ">
              <i class="ri-refresh-line"></i> Оновити
            </button>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; margin-bottom:18px;">
          <div style="padding:14px; border-radius:14px; background:rgba(139,92,246,.08); border:1px solid rgba(139,92,246,.18);">
            <div style="font-size:12px; color:var(--text-dim);">Кількість учнів</div>
            <div style="font-size:24px; font-weight:800;">${stats.count}</div>
          </div>

          <div style="padding:14px; border-radius:14px; background:rgba(34,197,94,.08); border:1px solid rgba(34,197,94,.18);">
            <div style="font-size:12px; color:var(--text-dim);">Середній XP</div>
            <div style="font-size:24px; font-weight:800; color:var(--success);">${stats.avgXp}</div>
          </div>

          <div style="padding:14px; border-radius:14px; background:rgba(251,191,36,.08); border:1px solid rgba(251,191,36,.18);">
            <div style="font-size:12px; color:var(--text-dim);">Топ учень</div>
            <div style="font-size:18px; font-weight:800;">${escapeHtml(stats.topName)}</div>
            <div style="font-size:12px; color:var(--text-dim);">${stats.topXp} XP</div>
          </div>
        </div>

        <div style="overflow-x:auto; background:rgba(0,0,0,.2); border-radius:12px; border:1px solid rgba(255,255,255,.05);">
          <table style="width:100%; border-collapse:collapse; text-align:left; font-size:14px;">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,.1); color:var(--text-dim); background:rgba(255,255,255,.02);">
                <th style="padding:14px 16px;">Учень</th>
                <th style="padding:14px 16px;">XP</th>
                <th style="padding:14px 16px;">Рівень</th>
                <th style="padding:14px 16px;">🔥 Стрік</th>
                <th style="padding:14px 16px;">Остання активність</th>
                <th style="padding:14px 16px;">Дія</th>
              </tr>
            </thead>
            <tbody>
      `;

      students.forEach((s, index) => {
        const xp = getStudentXP(s);
        const streak = getStudentStreak(s);
        const lvl = getStudentLevel(s);
        const dateStr = formatDate(s.updated_at);
        const medal = index === 0 ? "🥇 " : index === 1 ? "🥈 " : index === 2 ? "🥉 " : "";

        html += `
          <tr data-student-open="${s.id}" style="
            border-bottom:1px solid rgba(255,255,255,.03);
            transition:.2s;
            cursor:pointer;
          "
          onmouseover="this.style.background='rgba(255,255,255,.03)'"
          onmouseout="this.style.background='transparent'">
            <td style="padding:14px 16px; font-weight:800; color:var(--text);">${medal}${escapeHtml(s.full_name || "Без імені")}</td>
            <td style="padding:14px 16px; color:var(--success); font-weight:800;">${xp} XP</td>
            <td style="padding:14px 16px;">
              <span style="background:rgba(14,165,233,.10); color:var(--primary); padding:4px 8px; border-radius:6px; font-size:12px; font-weight:bold;">
                Lvl ${lvl}
              </span>
            </td>
            <td style="padding:14px 16px; font-weight:bold; color:${streak > 0 ? "#fbbf24" : "var(--text-dim)"};">
              ${streak > 0 ? streak : "-"}
            </td>
            <td style="padding:14px 16px; color:var(--text-dim); font-size:12px;">${escapeHtml(dateStr)}</td>
            <td style="padding:14px 16px;">
              <button
                data-kick-student="${s.id}"
                style="
                  background:rgba(239,68,68,.10);
                  color:#ef4444;
                  border:1px solid rgba(239,68,68,.25);
                  border-radius:8px;
                  padding:8px 10px;
                  cursor:pointer;
                  font-weight:700;
                "
              >
                Вигнати
              </button>
            </td>
          </tr>
        `;
      });

      html += `
            </tbody>
          </table>
        </div>
      `;

      cont.innerHTML = html;
      bindStudentActions(classCode, students);
    }

    async function loadStudents(classCode) {
      const cont = $("studentsContainer");
      activeClassCode = classCode;

      cont.innerHTML = `
        <div style="text-align:center; padding:40px;">
          <i class="ri-loader-4-line ri-spin" style="font-size:24px; color: var(--primary);"></i>
          <br><br>
          Шукаємо учнів класу ${escapeHtml(classCode)}...
        </div>
      `;
      cont.style.display = "block";

      const students = await fetchStudents(classCode);

      students.sort((a, b) => getStudentXP(b) - getStudentXP(a));
      activeStudents = students;

      renderClasses();

      if (students.length === 0) {
        cont.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:20px;">
            <h3 style="margin:0;">Клас: <span style="color:var(--accent)">${escapeHtml(classCode)}</span></h3>
            <div style="display:flex; gap:10px;">
              <button id="btnCopyClassCode" class="btn-primary" style="padding:10px 14px; border-radius:10px;">
                <i class="ri-file-copy-line"></i> Скопіювати код
              </button>
              <button id="btnRefreshStudents" style="
                padding:10px 14px;
                border-radius:10px;
                border:1px solid var(--border);
                background:rgba(255,255,255,.04);
                color:var(--text);
                cursor:pointer;
              ">
                <i class="ri-refresh-line"></i> Оновити
              </button>
            </div>
          </div>

          <div style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 30px; text-align:center; color:var(--text-dim);">
             <div style="font-size: 30px; margin-bottom: 10px;">📭</div>
             В цьому класі ще немає учнів.<br>Дай учням код <b style="color:var(--text);">${escapeHtml(classCode)}</b>, щоб вони ввели його у Налаштуваннях.
          </div>
        `;

        bindStudentActions(classCode, students);
        return;
      }

      renderStudentsTable(classCode, students);
    }

    async function renderDashboard() {
      const container = $("teacherContent");
      if (!container) return;

      state.user.teacherClasses = state.user.teacherClasses || [];

      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:24px; flex-wrap:wrap; gap:14px;">
          <div>
            <h3 style="margin-bottom:6px;">📚 Твої класи</h3>
            <div style="color: var(--text-dim); font-size: 13px;">Створи код класу і дай його учням.</div>
          </div>

          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <input
              type="text"
              id="newClassInput"
              placeholder="Назва класу (напр. 7-А Python)"
              style="
                padding:10px 14px;
                border-radius:10px;
                border:1px solid var(--border);
                background: rgba(0,0,0,0.2);
                color: var(--text);
                text-transform: uppercase;
                width: 180px;
              "
            >
            <button id="btnAddClass" class="btn-primary" style="padding:10px 16px; border-radius:10px;">
              <i class="ri-add-line"></i> Створити
            </button>
          </div>
        </div>

        <div id="classesList" style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:30px;"></div>

        <div id="studentsContainer" style="
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        ">
          <div style="text-align:center; color: var(--text-dim); font-size: 16px;">
            <i class="ri-group-line" style="font-size: 32px; display: block; margin-bottom: 10px; opacity: 0.5;"></i>
            Обери клас зверху, щоб побачити прогрес учнів
          </div>
        </div>
      `;

      renderClasses();

      const addBtn = $("btnAddClass");
      if (addBtn) {
        addBtn.onclick = () => {
          const name = $("newClassInput").value.trim();

if (!name) return toast("⚠️ Введи назву класу!");

state.user.teacherClasses = state.user.teacherClasses || [];

let code = generateClassCode();

while(state.user.teacherClasses.some(c => c.code === code)){
  code = generateClassCode();
}

state.user.teacherClasses.push({
  name,
  code
});
          save();

          $("newClassInput").value = "";
          toast("✅ Клас успішно створено!");
          renderClasses();

          if (typeof refreshSidebar === "function") refreshSidebar();
        };
      }
    }

    return { renderDashboard };
  }

  return { create };
})();
