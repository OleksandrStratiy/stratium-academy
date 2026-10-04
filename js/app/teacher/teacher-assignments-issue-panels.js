// Вибір завдань і бічні панелі вкладки видачі (база вчителя та авто-практикуми).
window.App = window.App || {};

window.App.teacherAssignmentsIssuePanels = (function () {
  "use strict";

  function create(deps) {
    const { escapeHtml, getTaskThemeLabel, ctx, ensureUiState } = deps;

    function renderBankSourcePanel({
      ui,
      allManualTasks,
      manualThemes,
      filteredManualTasks,
      selectedManualItems
    }) {
      return `<div style="display: ${ui.issueSource === "bank" ? "grid" : "none"}; grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.95fr); gap: 20px; align-items: start;">
                
                <div style="min-width:0; display:flex; flex-direction:column; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden;">
                  
                  <div style="padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(15,23,42,0.6);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
                      <label style="margin: 0; font-size: 14px; font-weight: 600; color: var(--text);">Оберіть завдання з вашої бази</label>

                      <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                        <button type="button" class="teacher-btn teacher-btn--ghost" data-open-create-task="1" style="margin: 0; border: 1px dashed rgba(14,165,233,0.38); color: var(--primary);">
                          <i class="ri-add-line"></i> Створити в базу
                        </button>
                      </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 12px; color: var(--text-dim); white-space: nowrap;"><i class="ri-filter-3-line"></i> Тема:</span>
                      <select id="teacherIssueThemeFilter" class="teacher-input" style="flex: 1; margin: 0; padding: 8px 12px; font-size: 13px; background: #0f172a; color: #f8fafc; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                        <option value="all" ${ui.issueThemeFilter === "all" ? "selected" : ""}>Усі теми (${allManualTasks.length})</option>
                        ${manualThemes.map((t) => `<option value="${escapeHtml(t)}" ${ui.issueThemeFilter === t ? "selected" : ""}>${escapeHtml(t)}</option>`).join("")}
                      </select>
                    </div>
                  </div>

                  <div id="teacherManualTasksScroll" class="dash-scroll-wrap teacher-assignments-list" style="max-height: 690px; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
                    <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" onload="if(window._tsBank) this.parentNode.scrollTop = window._tsBank; this.parentNode.addEventListener('scroll', e => window._tsBank = e.target.scrollTop); this.remove();" style="display:none;">
                    
                    ${
                      filteredManualTasks.length
                        ? filteredManualTasks
                            .map((t, index) => {
                              const isSelected = ui.selectedTaskIds.includes(String(t.id));
                              const isExpanded = window._expandedTasks && window._expandedTasks[t.id];

                              return `
                        <label class="auto-task-card ${isSelected ? "is-selected" : ""}" style="display:block; cursor:pointer; margin:0;">
                          <input type="checkbox" class="bank-task-radio-input" name="taskIdBank" value="${escapeHtml(t.id)}" ${isSelected ? "checked" : ""} style="display:none;">

                          <div class="radio-card-body" style="padding:10px 12px; background: rgba(255,255,255,0.02); border: 1px solid ${isSelected ? "var(--primary)" : "rgba(255,255,255,0.05)"}; border-radius: 10px; transition: all 0.2s;">
                            <div style="display:flex; align-items:flex-start; gap:10px;">

                              <div class="radio-check-icon" style="width:18px; height:18px; border-radius:50%; border:2px solid ${isSelected ? "var(--primary)" : "var(--text-dim)"}; display:flex; align-items:center; justify-content:center; flex-shrink:0; background:${isSelected ? "rgba(14,165,233,0.2)" : "transparent"}; margin-top:2px;">
                                <div class="radio-check-dot" style="width:8px; height:8px; border-radius:50%; background:var(--primary); opacity:${isSelected ? "1" : "0"}; transform:scale(${isSelected ? "1" : "0.6"}); transition:all 0.2s;"></div>
                              </div>

                              <div style="min-width:0; flex:1;">
                                <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:10px;">
                                  <div style="min-width:0; flex:1;">
                                    <div style="font-weight:700; font-size:14px; color:${isSelected ? "#fff" : "var(--text)"}; line-height:1.25; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:3px;">
                                      ${escapeHtml(t.title)}
                                    </div>
                                    <div style="font-size:10px; color:var(--text-dim); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                      ${escapeHtml(getTaskThemeLabel(t))}
                                    </div>
                                  </div>

                                  <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                                    <div style="font-size:10px; font-weight:800; color:var(--success); background:rgba(34,197,94,0.1); padding:3px 7px; border-radius:6px; white-space:nowrap;">
                                      ${t.max_score} б.
                                    </div>

                                    <button
                                      type="button"
                                      onclick="event.preventDefault(); event.stopPropagation(); const content = this.closest('.auto-task-card').querySelector('.task-preview-content'); const isVisible = content.style.display === 'block'; content.style.display = isVisible ? 'none' : 'block'; this.style.background = isVisible ? 'rgba(14,165,233,0.1)' : 'rgba(255,255,255,0.05)'; this.style.color = isVisible ? 'var(--primary)' : 'var(--text-dim)'; window._expandedTasks = window._expandedTasks || {}; window._expandedTasks['${escapeHtml(t.id)}'] = !isVisible;"
                                      style="height:26px; padding:0 8px; border-radius:7px; border:1px solid rgba(14,165,233,0.28); background:${isExpanded ? "rgba(14,165,233,0.1)" : "rgba(255,255,255,0.05)"}; color:${isExpanded ? "var(--primary)" : "var(--text-dim)"}; font-size:11px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:5px; white-space:nowrap;"
                                    >
                                      <i class="ri-eye-line"></i> Перегляд
                                    </button>

                                    <button
                                      type="button"
                                      data-edit-task="${escapeHtml(t.id)}"
                                      onclick="event.preventDefault(); event.stopPropagation();"
                                      style="height:26px; width:26px; display:flex; justify-content:center; align-items:center; border-radius:7px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.05); color:var(--text-dim); cursor:pointer; transition:0.2s;"
                                      onmouseover="this.style.color='var(--warn)'; this.style.borderColor='rgba(251,191,36,0.3)'; this.style.background='rgba(251,191,36,0.1)';" 
                                      onmouseout="this.style.color='var(--text-dim)'; this.style.borderColor='rgba(255,255,255,0.1)'; this.style.background='rgba(255,255,255,0.05)';"
                                    >
                                      <i class="ri-pencil-line"></i>
                                    </button>

                                    <button
                                      type="button"
                                      data-delete-task="${escapeHtml(t.id)}"
                                      onclick="event.preventDefault(); event.stopPropagation();"
                                      style="height:26px; width:26px; display:flex; justify-content:center; align-items:center; border-radius:7px; border:1px solid rgba(244,63,94,0.2); background:rgba(244,63,94,0.05); color:var(--danger); cursor:pointer; transition:0.2s;"
                                    >
                                      <i class="ri-delete-bin-line"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="task-preview-content" style="display: ${isExpanded ? "block" : "none"}; margin-top: 14px; padding-top: 14px; border-top: 1px dashed rgba(255,255,255,0.10);">
                              <div style="display:flex; flex-direction:column; gap:14px;">
                                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; padding: 14px;">
                                  <div style="display:flex; align-items:center; gap:6px; font-size:11px; text-transform:uppercase; color:var(--primary); font-weight:800; letter-spacing:0.05em; margin-bottom:8px;">
                                    <i class="ri-file-text-line"></i> Умова завдання
                                  </div>
                                  <div style="font-size:13px; color: var(--text); line-height:1.5; white-space: pre-wrap;">${escapeHtml(t.description || "Умова не вказана")}</div>
                                </div>
                                ${
                                  t.starter_code
                                    ? `
                                  <div style="background:#020617; border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; overflow:hidden;">
                                    <div style="padding: 8px 14px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05); display:flex; align-items:center; gap:6px; font-size:11px; text-transform:uppercase; color:var(--primary); font-weight:800; letter-spacing:0.05em;">
                                      <i class="ri-code-box-line"></i> Початковий код
                                    </div>
                                    <pre style="margin:0; padding:14px; font-family: var(--mono); font-size: 12px; color: var(--text); white-space: pre-wrap; overflow-x:auto; line-height:1.5;">${escapeHtml(t.starter_code)}</pre>
                                  </div>
                                `
                                    : ``
                                }
                              </div>
                            </div>

                          </div>
                        </label>
                      `;
                            })
                            .join("")
                        : `<div style="text-align:center; padding: 30px; color: var(--text-dim);">У цій темі немає завдань.</div>`
                    }
                  </div>
                </div>

                ${ui.issueSource === "bank" ? renderManualIssueSidebar(ui, selectedManualItems) : ""}

              </div>`;
    }

    function renderManualIssueSidebar(ui, selectedManualItems) {
      return `
        <aside style="background: rgba(15,23,42,0.82); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 18px; position: sticky; top: 16px;">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:14px;">
            <div>
              <div style="font-size:11px; text-transform:uppercase; color:var(--primary); font-weight:800; letter-spacing:.08em; margin-bottom:4px;">
                База вчителя
              </div>
              <div style="font-size:18px; font-weight:800; color:var(--text);">
                Ручні завдання
              </div>
            </div>
            <div style="font-size:11px; font-weight:800; color:var(--success); background:rgba(34,197,94,0.1); padding:5px 8px; border-radius:8px; white-space:nowrap;">
              Власні оцінки
            </div>
          </div>

          <div style="margin-bottom:14px; padding:12px; border-radius:12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05);">
            <div style="font-size:12px; color:var(--text-dim); margin-bottom:6px;">
              Обрано завдань
            </div>
            <div style="font-size:26px; line-height:1; font-weight:900; color:var(--text); margin-bottom:8px;">
              ${selectedManualItems.length}
            </div>
            <div style="font-size:12px; color:var(--text-dim); line-height:1.45;">
              Оцінюються вчителем вручну (код, текст або файл). Бали підуть у загальний рейтинг.
            </div>
          </div>

          <div style="margin-bottom:16px;">
            <div style="font-size:12px; font-weight:700; color:var(--text-dim); margin-bottom:8px; text-transform:uppercase;">
              Вибрані завдання
            </div>

            <div class="dash-scroll-wrap" style="display:flex; flex-direction:column; gap:8px; max-height:190px; overflow-y:auto; padding-right:6px;">
              ${
                selectedManualItems.length
                  ? selectedManualItems
                      .map(
                        (item, idx) => `
                  <div style="padding:10px 12px; border-radius:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05);">
                    <div style="display:flex; justify-content:space-between; gap:8px; align-items:flex-start;">
                      <div style="min-width:0; flex:1;">
                        <div style="font-size:13px; font-weight:700; color:var(--text); line-height:1.3; margin-bottom:3px;">
                          ${idx + 1}. ${escapeHtml(item.title)}
                        </div>
                        <div style="font-size:11px; color:var(--text-dim); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                          ${escapeHtml(getTaskThemeLabel(item))}
                        </div>
                      </div>
                      <div style="font-size:10px; font-weight:800; color:var(--success); background:rgba(34,197,94,0.1); padding:3px 7px; border-radius:6px; white-space:nowrap;">
                        ${item.max_score} б.
                      </div>
                    </div>
                  </div>
                `
                      )
                      .join("")
                  : `
                  <div style="padding:14px; border-radius:10px; background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.08); color:var(--text-dim); font-size:12px; text-align:center;">
                    Ще не обрано жодного завдання
                  </div>
                `
              }
            </div>
          </div>

          <div style="display:grid; gap:14px;">
            <div>
              <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
                Клас
              </label>
              <select id="assignmentClassCode" class="teacher-input" name="classCode" style="width:100%; margin:0;">
                ${ctx.teacherClasses.map((cls) => `<option value="${escapeHtml(cls.code)}" ${String(ui.issueClassCode || "") === String(cls.code) ? "selected" : ""}>${escapeHtml(cls.name || cls.code)}</option>`).join("")}
              </select>
            </div>

            <div>
              <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
                Кому призначити
              </label>
              <select id="assignmentTargetType" class="teacher-input" name="targetType" style="width:100%; margin:0;">
                <option value="class" ${ui.issueTargetType === "class" ? "selected" : ""}>👨‍👩‍👧‍👦 Усьому класу</option>
                <option value="student" ${ui.issueTargetType === "student" ? "selected" : ""}>👤 Окремому учню</option>
              </select>
            </div>

            ${
              ui.issueTargetType === "student"
                ? `
              <div style="padding:12px; background:rgba(14,165,233,0.08); border:1px solid rgba(14,165,233,0.18); border-radius:12px;">
                <label style="display:block; font-size:11px; font-weight:800; color:var(--primary); margin-bottom:6px; text-transform:uppercase;">
                  Учень
                </label>
                <select id="assignmentStudentId" class="teacher-input" name="studentId" style="width:100%; margin:0;">
                  ${
                    ctx.classStudents.length
                      ? ctx.classStudents
                          .map(
                            (s) =>
                              `<option value="${escapeHtml(s.id)}" ${String(ui.issueStudentId || "") === String(s.id) ? "selected" : ""}>${escapeHtml(s.full_name || "Без імені")}</option>`
                          )
                          .join("")
                      : `<option value="">У класі ще немає учнів</option>`
                  }
                </select>
              </div>
            `
                : ""
            }

            <div>
              <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
                Дедлайн
              </label>
              <input class="teacher-input" name="dueAt" type="datetime-local" style="width:100%; margin:0;">
            </div>

            <div>
              <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
                Примітка / підказка
              </label>
              <input class="teacher-input" name="noteForStudent" placeholder="Напишіть щось учням." style="width:100%; margin:0;">
            </div>

            <button
              class="teacher-btn teacher-btn--primary"
              type="submit"
              style="width:100%; justify-content:center; min-height:46px; margin-top:4px;"
            >
              <i class="ri-send-plane-fill"></i>
              Видати ${selectedManualItems.length ? `${selectedManualItems.length} завд.` : "завдання"}
            </button>
          </div>
        </aside>
      `;
    }

    function renderAutoSourcePanel({
      ui,
      autoModules,
      currentAutoLevel,
      levelFilteredModules,
      currentAutoFilter,
      filteredAutoModules,
      selectedAutoItems
    }) {
      return `<div style="display: ${ui.issueSource === "auto" ? "grid" : "none"}; grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.95fr); gap: 20px; align-items: start;">
                <div style="min-width:0; display:flex; flex-direction:column; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden;">
                  
                  <div style="padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(15,23,42,0.6);">
                    <div style="display: flex; gap: 4px; background: rgba(0,0,0,0.4); padding: 4px; border-radius: 10px; margin-bottom: 16px; border: 1px solid rgba(255,255,255,0.05);">
                      ${["all", "junior", "middle", "senior"]
                        .map((lvl) => {
                          const isActive = currentAutoLevel === lvl;
                          const labels = { all: "Усі", junior: "Junior", middle: "Middle", senior: "Senior" };
                          return `
                          <button type="button" class="auto-level-btn" data-level="${lvl}" style="flex: 1; border: none; padding: 6px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; background: ${isActive ? "var(--accent)" : "transparent"}; color: ${isActive ? "#fff" : "var(--text-dim)"}; box-shadow: ${isActive ? "0 2px 8px rgba(139,92,246,0.3)" : "none"};">
                            ${labels[lvl]}
                          </button>
                        `;
                        })
                        .join("")}
                    </div>

                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 12px; color: var(--text-dim); white-space: nowrap;"><i class="ri-folder-2-line"></i> Тема:</span>
                      <select id="teacherIssueAutoFilter" class="teacher-input" style="flex: 1; margin: 0; padding: 8px 12px; font-size: 13px; background: #0f172a; color: #f8fafc; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                        <option value="all">Усі вибрані практикуми</option>
                        ${levelFilteredModules.map((m) => `<option value="${escapeHtml(m.id)}" ${currentAutoFilter === String(m.id) ? "selected" : ""}>${escapeHtml(m.title)}</option>`).join("")}
                      </select>
                    </div>
                  </div>

                  <div id="teacherAutoTasksScroll" class="dash-scroll-wrap teacher-assignments-list" style="max-height: 690px; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
                    ${
                      filteredAutoModules
                        .map((mod) => {
                          if (!mod.tasks || !mod.tasks.length) return "";

                          const sourceModule =
                            autoModules.find((m) => String(m.id) === String(mod.id)) || mod;

                          return mod.tasks
                            .map((t, i) => {
                              const originalIndex = Array.isArray(sourceModule.tasks)
                                ? sourceModule.tasks.findIndex((task) => task === t)
                                : i;

                              const safeIndex = originalIndex >= 0 ? originalIndex : i;
                              const val = `auto|${mod.courseId}|${mod.id}|${safeIndex}`;
                              const isSelected = (ui.selectedAutoTaskIds || []).includes(val);

                              return `
                          <label class="auto-task-card ${isSelected ? "is-selected" : ""}" style="display:block; cursor:pointer; margin:0;">
                            <input type="checkbox" class="auto-task-radio-input" name="taskIdAuto" value="${val}" ${isSelected ? "checked" : ""} style="display:none;">

                            <div class="radio-card-body" style="padding:10px 12px; background: rgba(255,255,255,0.02); border: 1px solid ${isSelected ? "var(--accent)" : "rgba(255,255,255,0.05)"}; border-radius: 10px; transition: all 0.2s;">
                              <div style="display:flex; align-items:flex-start; gap:10px;">

                                <div class="radio-check-icon" style="width:18px; height:18px; border-radius:50%; border:2px solid ${isSelected ? "var(--accent)" : "var(--text-dim)"}; display:flex; align-items:center; justify-content:center; flex-shrink:0; background:${isSelected ? "rgba(139,92,246,0.2)" : "transparent"}; margin-top:2px;">
                                  <div class="radio-check-dot" style="width:8px; height:8px; border-radius:50%; background:var(--accent); opacity:${isSelected ? "1" : "0"}; transform:scale(${isSelected ? "1" : "0.6"}); transition:all 0.2s;"></div>
                                </div>

                                <div style="min-width:0; flex:1;">
                                  <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:10px;">

                                    <div style="min-width:0; flex:1;">
                                      <div style="font-weight:700; font-size:14px; color:${isSelected ? "#fff" : "var(--text)"}; line-height:1.25; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:3px;">
                                        ${escapeHtml(t.title || "Завдання " + (safeIndex + 1))}
                                      </div>

                                      <div style="font-size:10px; color:var(--text-dim); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                        ${escapeHtml(mod.title)}
                                      </div>
                                    </div>

                                    <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                                      <div style="font-size:10px; font-weight:800; color:var(--success); background:rgba(34,197,94,0.1); padding:3px 7px; border-radius:6px; white-space:nowrap;">
                                        12 б.
                                      </div>

                                      <button
                                        type="button"
                                        data-preview-auto-task="${escapeHtml(`${mod.courseId}|${mod.id}|${safeIndex}`)}"
                                        onclick="event.preventDefault(); event.stopPropagation();"
                                        style="height:26px; padding:0 8px; border-radius:7px; border:1px solid rgba(139,92,246,0.28); background:rgba(139,92,246,0.10); color:var(--accent); font-size:11px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:5px; white-space:nowrap;"
                                      >
                                        <i class="ri-eye-line"></i> Перегляд
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </label>
                        `;
                            })
                            .join("");
                        })
                        .join("") ||
                      `<div style="text-align:center; padding:40px; color:var(--text-dim); font-size:14px;">Немає завдань.</div>`
                    }
                  </div>
                </div>

                ${ui.issueSource === "auto" ? renderAutoIssueSidebar(selectedAutoItems) : ""}
              </div>`;
    }

    function renderAutoIssueSidebar(selectedAutoItems = []) {
      const ui = ensureUiState();
      const selectedCount = selectedAutoItems.length;

      return `
    <aside
      style="
        background: rgba(15,23,42,0.82);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 14px;
        padding: 18px;
        position: sticky;
        top: 16px;
      "
    >
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:14px;">
        <div>
          <div style="font-size:11px; text-transform:uppercase; color:var(--accent); font-weight:800; letter-spacing:.08em; margin-bottom:4px;">
            Авто-практикум
          </div>
          <div style="font-size:18px; font-weight:800; color:var(--text);">
            Видати завдання
          </div>
        </div>

        <div style="font-size:11px; font-weight:800; color:var(--success); background:rgba(34,197,94,0.1); padding:5px 8px; border-radius:8px; white-space:nowrap;">
          12-бальна шкала
        </div>
      </div>

      <div style="margin-bottom:14px; padding:12px; border-radius:12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05);">
        <div style="font-size:12px; color:var(--text-dim); margin-bottom:6px;">
          Обрано завдань
        </div>
        <div style="font-size:26px; line-height:1; font-weight:900; color:var(--text); margin-bottom:8px;">
          ${selectedCount}
        </div>
        <div style="font-size:12px; color:var(--text-dim); line-height:1.45;">
          XP не додається до загального рейтингу. Учень отримує оцінку в балах.
        </div>
      </div>

      <div style="margin-bottom:16px;">
        <div style="font-size:12px; font-weight:700; color:var(--text-dim); margin-bottom:8px; text-transform:uppercase;">
          Вибрані завдання
        </div>

        <div id="teacherSelectedAutoList" class="teacher-selected-auto-list" style="display:flex; flex-direction:column; gap:8px; max-height:190px; overflow-y:auto; padding-right:6px;">
          ${
            selectedAutoItems.length
              ? selectedAutoItems
                  .map(
                    (item, idx) => `
              <div style="padding:10px 12px; border-radius:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05);">
                <div style="display:flex; justify-content:space-between; gap:8px; align-items:flex-start;">
                  <div style="min-width:0; flex:1;">
                    <div style="font-size:13px; font-weight:700; color:var(--text); line-height:1.3; margin-bottom:3px;">
                      ${idx + 1}. ${escapeHtml(item.title)}
                    </div>
                    <div style="font-size:11px; color:var(--text-dim); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                      ${escapeHtml(item.moduleTitle)}
                    </div>
                  </div>
                  <div style="font-size:10px; font-weight:800; color:var(--success); background:rgba(34,197,94,0.1); padding:3px 7px; border-radius:6px; white-space:nowrap;">
                    12 б.
                  </div>
                </div>
              </div>
            `
                  )
                  .join("")
              : `
              <div style="padding:14px; border-radius:10px; background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.08); color:var(--text-dim); font-size:12px; text-align:center;">
                Ще не обрано жодного авто-завдання
              </div>
            `
          }
        </div>
      </div>

      <div style="display:grid; gap:14px;">
        <div>
          <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
            Клас
          </label>
          <select id="assignmentClassCode" class="teacher-input" name="classCode" style="width:100%; margin:0;">
            ${ctx.teacherClasses
              .map(
                (cls) => `
              <option value="${escapeHtml(cls.code)}" ${String(ui.issueClassCode || "") === String(cls.code) ? "selected" : ""}>
                ${escapeHtml(cls.name || cls.code)}
              </option>
            `
              )
              .join("")}
          </select>
        </div>

        <div>
          <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
            Кому призначити
          </label>
          <select id="assignmentTargetType" class="teacher-input" name="targetType" style="width:100%; margin:0;">
            <option value="class" ${ui.issueTargetType === "class" ? "selected" : ""}>👨‍👩‍👧‍👦 Усьому класу</option>
            <option value="student" ${ui.issueTargetType === "student" ? "selected" : ""}>👤 Окремому учню</option>
          </select>
        </div>

        ${
          ui.issueTargetType === "student"
            ? `
          <div style="padding:12px; background:rgba(139,92,246,0.08); border:1px solid rgba(139,92,246,0.18); border-radius:12px;">
            <label style="display:block; font-size:11px; font-weight:800; color:var(--accent); margin-bottom:6px; text-transform:uppercase;">
              Учень
            </label>
            <select id="assignmentStudentId" class="teacher-input" name="studentId" style="width:100%; margin:0;">
              ${
                ctx.classStudents.length
                  ? ctx.classStudents
                      .map(
                        (s) => `
                    <option value="${escapeHtml(s.id)}" ${String(ui.issueStudentId || "") === String(s.id) ? "selected" : ""}>
                      ${escapeHtml(s.full_name || "Без імені")}
                    </option>
                  `
                      )
                      .join("")
                  : `<option value="">У класі ще немає учнів</option>`
              }
            </select>
          </div>
        `
            : ""
        }

        <div>
          <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
            Дедлайн
          </label>
          <input class="teacher-input" name="dueAt" type="datetime-local" style="width:100%; margin:0;">
        </div>

        <div>
          <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
            Примітка / підказка
          </label>
          <input class="teacher-input" name="noteForStudent" placeholder="Напишіть щось учням." style="width:100%; margin:0;">
        </div>

        <button
          class="teacher-btn teacher-btn--primary"
          type="submit"
          style="width:100%; justify-content:center; min-height:46px; margin-top:4px;"
        >
          <i class="ri-send-plane-fill"></i>
          Видати ${selectedCount ? `${selectedCount} завд.` : "завдання"}
        </button>
      </div>
    </aside>
  `;
    }

    return { renderBankSourcePanel, renderAutoSourcePanel };
  }

  return { create };
})();
