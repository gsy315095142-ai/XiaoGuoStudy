/**
 * 🧪 小数实验室 - 第四单元：小数的意义和性质
 *
 * 四个章节（模式）：
 *   1. 小数诞生  — 看方格涂色 → 点选正确小数
 *   2. 大小天平  — 比较两个小数的大小
 *   3. 魔幻药水  — ×10 / ÷10 移动小数点，凑目标值
 *   4. 精密刻度  — 四舍五入求近似数（选择题）
 */

// ============================================================
// 关卡数据
// ============================================================

var LEVELS = {

  // ===== 第一章：小数诞生（方格涂色 → 点选小数）=====
  // grid: [rows, cols]  colored: 涂色数  answer: 对应小数  choices: 选项（含干扰项）
  1: [
    {
      grid: [1, 10],
      colored: 3,
      answer: '0.3',
      choices: ['0.3', '0.03', '0.5'],
      hint: '数一数涂色的方格，10 格中涂了 3 格'
    },
    {
      grid: [1, 10],
      colored: 7,
      answer: '0.7',
      choices: ['0.7', '0.07', '0.3'],
      hint: '10 格中涂了 7 格，用小数怎么表示？'
    },
    {
      grid: [10, 10],
      colored: 45,
      answer: '0.45',
      choices: ['0.45', '0.54', '4.5'],
      hint: '100 个小方格，涂了 45 个'
    },
    {
      grid: [10, 10],
      colored: 8,
      answer: '0.08',
      choices: ['0.08', '0.8', '0.80'],
      hint: '100 个方格只涂了 8 个，注意占位！'
    },
    {
      grid: [10, 10],
      colored: 62,
      answer: '0.62',
      choices: ['0.62', '0.26', '6.2'],
      hint: '100 个方格涂了 62 个'
    }
  ],

  // ===== 第二章：大小天平（比较小数）=====
  // a, b 两个数，answer: '>' | '=' | '<'
  2: [
    {
      a: 0.3, b: 0.29,
      answer: '>',
      hint: '先比整数部分，再比十分位…'
    },
    {
      a: 1.25, b: 1.52,
      answer: '<',
      hint: '整数部分相同，比十分位'
    },
    {
      a: 0.6, b: 0.60,
      answer: '=',
      hint: '小数的性质：末尾添0大小不变'
    },
    {
      a: 3.14, b: 3.41,
      answer: '<',
      hint: '十分位 1 < 4'
    },
    {
      a: 0.99, b: 1.01,
      answer: '<',
      hint: '整数部分 0 < 1，整数部分大的数大'
    },
    {
      a: 5.8, b: 5.08,
      answer: '>',
      hint: '十分位 8 > 0'
    },
    {
      a: 2.73, b: 2.73,
      answer: '=',
      hint: '每个数位都一样，当然相等啦'
    }
  ],

  // ===== 第三章：魔幻药水（×10 / ÷10）=====
  // start: 起始数字  target: 目标数字  maxMoves: 最多步数
  3: [
    {
      start: 3.14,
      target: 31.4,
      maxMoves: 2,
      hint: '把小数点向右移一位 = ×10'
    },
    {
      start: 5.2,
      target: 520,
      maxMoves: 4,
      hint: '需要移两位 = ×100'
    },
    {
      start: 480,
      target: 4.8,
      maxMoves: 4,
      hint: '把小数点向左移 = ÷10'
    },
    {
      start: 0.7,
      target: 700,
      maxMoves: 6,
      hint: '小数点向右移三位 = ×1000'
    },
    {
      start: 36.5,
      target: 0.365,
      maxMoves: 4,
      hint: '向左移两位 = ÷100'
    },
    {
      start: 2.5,
      target: 2500,
      maxMoves: 6,
      hint: '三位大跳跃！'
    }
  ],

  // ===== 第四章：精密刻度（四舍五入）=====
  // number: 原数  place: 保留到哪位  answer: 正确答案  choices: 选项
  4: [
    {
      number: 3.14,
      place: '保留一位小数',
      answer: '3.1',
      choices: ['3.1', '3.2', '3.0'],
      hint: '看百分位 4 < 5，舍去'
    },
    {
      number: 2.56,
      place: '保留一位小数',
      answer: '2.6',
      choices: ['2.5', '2.6', '3.0'],
      hint: '看百分位 6 ≥ 5，进一'
    },
    {
      number: 9.99,
      place: '保留一位小数',
      answer: '10.0',
      choices: ['9.9', '10.0', '10'],
      hint: '9.99 → 百分位进一 → 10.0'
    },
    {
      number: 0.654,
      place: '保留两位小数',
      answer: '0.65',
      choices: ['0.65', '0.66', '0.64'],
      hint: '看千分位 4 < 5，舍去'
    },
    {
      number: 7.896,
      place: '保留两位小数',
      answer: '7.90',
      choices: ['7.89', '7.90', '7.96'],
      hint: '千分位 6 ≥ 5，进一 → 注意末尾0要保留'
    }
  ]
};

// ============================================================
// 游戏状态
// ============================================================

var currentChapter = 1;
var currentLevel = 0;
var currentLevelData = null;
var score = 0;
var combo = 0;
var maxCombo = 0;
var hp = 3;
var hpMax = 3;
var correctCount = 0;
var wrongCount = 0;

// 模式1：防止重复点击
var mode1Locked = false;

// 模式3专用
var potionCurrent = 0;
var potionMoves = 0;
var potionLocked = false;

// ============================================================
// 章节选择
// ============================================================

function selectChapter(ch, event) {
  if (event) createRipple(event, event.currentTarget);
  currentChapter = ch;
  currentLevel = 0;
  score = 0;
  combo = 0;
  maxCombo = 0;
  hp = 3;
  correctCount = 0;
  wrongCount = 0;

  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');

  startLevel();
}

// ============================================================
// 开始关卡
// ============================================================

function startLevel() {
  var levels = LEVELS[currentChapter];
  if (currentLevel >= levels.length) {
    showResult();
    return;
  }

  currentLevelData = levels[currentLevel];
  mode1Locked = false;
  updateHUD();
  updateProgress();

  document.getElementById('levelInfo').textContent = '第 ' + (currentLevel + 1) + ' 关';
  document.getElementById('questionText').textContent = currentLevelData.hint || '';

  hideAllModes();

  if (currentChapter === 1) startMode1();
  else if (currentChapter === 2) startMode2();
  else if (currentChapter === 3) startMode3();
  else if (currentChapter === 4) startMode4();
}

function hideAllModes() {
  var modes = document.querySelectorAll('.mode-area');
  for (var i = 0; i < modes.length; i++) {
    modes[i].classList.add('hidden');
  }
}

// ============================================================
// 通用：答对
// ============================================================

function onCorrect() {
  correctCount++;
  combo++;
  if (combo > maxCombo) maxCombo = combo;

  var points = 10;
  if (combo >= 5) points = 30;
  else if (combo >= 3) points = 20;
  score += points;

  updateHUD();
  showToast('✅', '答对了！' + (combo >= 3 ? '🔥' + combo + '连击！' : ''), 1200);

  setTimeout(function() {
    currentLevel++;
    startLevel();
  }, 1400);
}

// ============================================================
// 通用：答错
// ============================================================

function onWrong() {
  combo = 0;
  wrongCount++;
  hp = Math.max(0, hp - 1);
  updateHUD();

  if (hp <= 0) {
    showToast('💔', '血量用完了…', 1500);
    setTimeout(function() { showResult(); }, 1600);
  } else {
    showToast('❌', '再想想！还剩 ' + hp + ' 颗心', 1200);
  }
}

// ============================================================
// 模式1：小数诞生（方格涂色 → 点选小数）
// ============================================================

function startMode1() {
  var modeEl = document.getElementById('mode1');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;
  var rows = data.grid[0];
  var cols = data.grid[1];
  var total = rows * cols;

  // --- 渲染方格 ---
  var container = document.getElementById('gridContainer');
  container.innerHTML = '';

  var grid = document.createElement('div');
  grid.className = 'decimal-grid';
  grid.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';

  // 随机选 colored 个位置涂色
  var indices = [];
  for (var i = 0; i < total; i++) indices.push(i);
  shuffleArray(indices);
  var coloredSet = {};
  for (var j = 0; j < data.colored; j++) {
    coloredSet[indices[j]] = true;
  }

  for (var k = 0; k < total; k++) {
    var cell = document.createElement('div');
    cell.className = 'grid-cell';
    if (coloredSet[k]) {
      cell.classList.add('colored');
      cell.style.animationDelay = (Math.random() * 0.3) + 's';
    }
    grid.appendChild(cell);
  }
  container.appendChild(grid);

  // --- 显示分数 ---
  var fracEl = document.getElementById('fractionDisplay');
  fracEl.innerHTML =
    '<span style="display:inline-block;text-align:center;vertical-align:middle">' +
    '<span style="display:block;font-size:28px;font-weight:bold">' + data.colored + '</span>' +
    '<span style="display:block;height:3px;background:#555;margin:4px auto;border-radius:2px;width:' + Math.max(30, String(data.colored).length * 18) + 'px"></span>' +
    '<span style="display:block;font-size:28px;font-weight:bold">' + total + '</span>' +
    '</span>' +
    '<span style="font-size:28px;margin:0 12px">=</span>' +
    '<span style="font-size:28px;color:#888">？</span>';

  // --- 渲染选项按钮 ---
  var choicesEl = document.getElementById('gridChoices');
  choicesEl.innerHTML = '';

  var shuffledChoices = data.choices.slice();
  shuffleArray(shuffledChoices);

  for (var c = 0; c < shuffledChoices.length; c++) {
    var btn = document.createElement('button');
    btn.className = 'grid-choice';
    btn.textContent = shuffledChoices[c];
    btn.dataset.value = shuffledChoices[c];
    btn.onclick = function() { submitAnswer1(this); };
    choicesEl.appendChild(btn);
  }
}

function submitAnswer1(btnEl) {
  if (mode1Locked) return;
  mode1Locked = true;

  var val = btnEl.dataset.value;

  // 禁用所有按钮
  var btns = document.querySelectorAll('.grid-choice');
  for (var i = 0; i < btns.length; i++) btns[i].disabled = true;

  if (val === currentLevelData.answer) {
    btnEl.classList.add('correct');

    // 更新分数显示为答案
    var data = currentLevelData;
    document.getElementById('fractionDisplay').innerHTML =
      '<span style="display:inline-block;text-align:center;vertical-align:middle">' +
      '<span style="display:block;font-size:28px;font-weight:bold">' + data.colored + '</span>' +
      '<span style="display:block;height:3px;background:#555;margin:4px auto;border-radius:2px;width:' + Math.max(30, String(data.colored).length * 18) + 'px"></span>' +
      '<span style="display:block;font-size:28px;font-weight:bold">' + (data.grid[0] * data.grid[1]) + '</span>' +
      '</span>' +
      '<span style="font-size:28px;margin:0 12px">=</span>' +
      '<span style="font-size:32px;color:#27AE60;font-weight:bold">' + data.answer + '</span>';

    onCorrect();
  } else {
    btnEl.classList.add('wrong');
    // 高亮正确答案
    for (var j = 0; j < btns.length; j++) {
      if (btns[j].dataset.value === currentLevelData.answer) {
        btns[j].classList.add('correct');
      }
    }
    onWrong();
    // 答错后 1.2 秒解锁，允许继续看但不能重选（会进下一关或结束）
  }
}

// ============================================================
// 模式2：大小天平（比较小数）
// ============================================================

function startMode2() {
  var modeEl = document.getElementById('mode2');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;

  document.getElementById('balanceLeft').textContent = data.a;
  document.getElementById('balanceRight').textContent = data.b;
  document.getElementById('balanceBeam').textContent = '?';
  document.getElementById('balanceBeam').style.color = '';

  // 重置天平倾斜
  var stage = document.querySelector('.balance-stage');
  stage.className = 'balance-stage';

  // 渲染选择按钮
  var btnsEl = document.getElementById('choiceBtns2');
  btnsEl.innerHTML = '';

  var options = [
    { label: '>', cls: 'btn-gt', value: '>' },
    { label: '=', cls: 'btn-eq', value: '=' },
    { label: '<', cls: 'btn-lt', value: '<' }
  ];

  for (var i = 0; i < options.length; i++) {
    var btn = document.createElement('button');
    btn.className = 'choice-btn ' + options[i].cls;
    btn.textContent = options[i].label;
    btn.dataset.value = options[i].value;
    btn.onclick = function() { submitAnswer2(this); };
    btnsEl.appendChild(btn);
  }
}

function submitAnswer2(btnEl) {
  var val = btnEl.dataset.value;
  var stage = document.querySelector('.balance-stage');
  var beam = document.getElementById('balanceBeam');

  // 禁用所有按钮
  var btns = document.querySelectorAll('#choiceBtns2 .choice-btn');
  for (var i = 0; i < btns.length; i++) btns[i].disabled = true;

  if (val === currentLevelData.answer) {
    btnEl.classList.add('correct');
    beam.textContent = val;
    beam.style.color = '#27AE60';

    if (val === '>') stage.classList.add('tilt-left');
    else if (val === '<') stage.classList.add('tilt-right');

    onCorrect();
  } else {
    btnEl.classList.add('wrong');
    for (var j = 0; j < btns.length; j++) {
      if (btns[j].dataset.value === currentLevelData.answer) {
        btns[j].classList.add('correct');
      }
    }
    beam.textContent = currentLevelData.answer;
    beam.style.color = '#E74C3C';

    if (currentLevelData.answer === '>') stage.classList.add('tilt-left');
    else if (currentLevelData.answer === '<') stage.classList.add('tilt-right');

    onWrong();
  }
}

// ============================================================
// 模式3：魔幻药水（×10 / ÷10）
// ============================================================

function startMode3() {
  var modeEl = document.getElementById('mode3');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;
  potionCurrent = data.start;
  potionMoves = 0;
  potionLocked = false;

  document.getElementById('potionTarget').textContent = data.target;
  document.getElementById('flask').classList.remove('flask-success');
  updateFlask();

  // 启用药水按钮
  var btns = document.querySelectorAll('.potion-btn');
  for (var i = 0; i < btns.length; i++) btns[i].disabled = false;
}

function updateFlask() {
  var flaskNum = document.getElementById('flaskNumber');
  flaskNum.textContent = potionCurrent;
  flaskNum.style.transform = 'scale(1.2)';
  setTimeout(function() { flaskNum.style.transform = 'scale(1)'; }, 200);

  var data = currentLevelData;
  var hint = document.getElementById('potionHint');
  hint.textContent = '🧪 已用 ' + potionMoves + ' 步（最多 ' + data.maxMoves + ' 步）';
}

function usePotion(action) {
  if (potionLocked) return;

  var data = currentLevelData;

  if (action === 'reset') {
    potionCurrent = data.start;
    potionMoves = 0;
    updateFlask();
    document.getElementById('flask').classList.remove('flask-success');
    return;
  }

  potionLocked = true;
  potionMoves++;

  if (action === 'right') {
    potionCurrent = potionCurrent * 10;
    potionCurrent = parseFloat(potionCurrent.toPrecision(12));
  } else if (action === 'left') {
    potionCurrent = potionCurrent / 10;
    potionCurrent = parseFloat(potionCurrent.toPrecision(12));
  }

  updateFlask();

  if (Math.abs(potionCurrent - data.target) < 0.0001) {
    var flask = document.getElementById('flask');
    flask.classList.add('flask-success');
    showStarParticle(flask);
    onCorrect();
  } else if (potionMoves >= data.maxMoves) {
    showToast('😢', '步数用完了，点击重置再试！', 1500);
    potionLocked = false;
    potionCurrent = data.start;
    potionMoves = 0;
    setTimeout(function() {
      updateFlask();
      document.getElementById('flask').classList.remove('flask-success');
    }, 1500);
  } else {
    potionLocked = false;
  }
}

// ============================================================
// 模式4：精密刻度（四舍五入）
// ============================================================

function startMode4() {
  var modeEl = document.getElementById('mode4');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;

  document.getElementById('rulerNumber').textContent = data.number;
  document.getElementById('rulerHint').textContent = data.place + '（四舍五入）';

  var choicesEl = document.getElementById('rulerChoices');
  choicesEl.innerHTML = '';

  var shuffled = data.choices.slice();
  shuffleArray(shuffled);

  for (var i = 0; i < shuffled.length; i++) {
    var btn = document.createElement('button');
    btn.className = 'ruler-choice';
    btn.textContent = shuffled[i];
    btn.dataset.value = shuffled[i];
    btn.onclick = function() { submitAnswer4(this); };
    choicesEl.appendChild(btn);
  }
}

function submitAnswer4(btnEl) {
  var val = btnEl.dataset.value;

  var btns = document.querySelectorAll('.ruler-choice');
  for (var i = 0; i < btns.length; i++) btns[i].disabled = true;

  if (val === currentLevelData.answer) {
    btnEl.classList.add('correct');
    onCorrect();
  } else {
    btnEl.classList.add('wrong');
    for (var j = 0; j < btns.length; j++) {
      if (btns[j].dataset.value === currentLevelData.answer) {
        btns[j].classList.add('correct');
      }
    }
    onWrong();
  }
}

// ============================================================
// HUD 更新
// ============================================================

function updateHUD() {
  var hearts = '';
  for (var i = 0; i < hpMax; i++) {
    hearts += '<span' + (i < hp ? '' : ' style="opacity:0.3"') + '>❤️</span>';
  }
  document.getElementById('heartsDisplay').innerHTML = hearts;
  document.getElementById('scoreDisplay').textContent = score;

  var comboEl = document.getElementById('comboDisplay');
  comboEl.textContent = combo >= 2 ? '🔥' + combo + '连击' : '';
}

function updateProgress() {
  var levels = LEVELS[currentChapter];
  var pct = (currentLevel / levels.length) * 100;
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('progressText').textContent = (currentLevel + 1) + '/' + levels.length;
}

// ============================================================
// 结果画面
// ============================================================

function showResult() {
  document.getElementById('gameScreen').classList.add('hidden');
  document.getElementById('resultScreen').classList.remove('hidden');

  var levels = LEVELS[currentChapter];
  var allDone = currentLevel >= levels.length;

  var emoji, title;
  if (allDone) {
    emoji = '🏆'; title = '全部通关！小数大师！';
  } else {
    emoji = '💪'; title = '别灰心，再来一次！';
  }

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitle').textContent = title;

  var earnedStars = allDone ? 15 + hp * 3 : Math.max(0, currentLevel * 2 + hp);
  if (earnedStars > 0) addStars(earnedStars);

  var rate = (correctCount + wrongCount) > 0
    ? Math.round(correctCount / (correctCount + wrongCount) * 100) : 0;

  var statsHtml = '';
  statsHtml += '<div class="stat-row"><span>🏆 得分：</span><strong>' + score + '</strong></div>';
  statsHtml += '<div class="stat-row"><span>❤️ 剩余血量：</span><strong>' + hp + '/' + hpMax + '</strong></div>';
  statsHtml += '<div class="stat-row"><span>🔥 最高连击：</span><strong>' + maxCombo + '</strong></div>';
  statsHtml += '<div class="stat-row"><span>✅ 正确率：</span><strong>' + rate + '%</strong></div>';
  statsHtml += '<div class="stat-row"><span>⭐ 获得星星：</span><strong>⭐ ' + earnedStars + '</strong></div>';

  statsHtml += '<div class="knowledge-card">';
  var chapterNames = {
    1: '小数的意义',
    2: '小数的大小比较',
    3: '小数点移动规律',
    4: '四舍五入求近似数'
  };
  var chapterTips = {
    1: '分母是10、100、1000…的分数可以用小数表示。3/10 = 0.3，45/100 = 0.45',
    2: '比较小数：先比整数部分，再比十分位、百分位……小数末尾添0去0大小不变',
    3: '小数点右移一位→×10，右移两位→×100；左移一位→÷10，左移两位→÷100',
    4: '四舍五入：看要保留的下一位，≥5进1，<5舍去。末尾的0不能去掉！'
  };
  statsHtml += '<h3>📚 本关知识点：' + chapterNames[currentChapter] + '</h3>';
  statsHtml += '<p>💡 ' + chapterTips[currentChapter] + '</p>';
  statsHtml += '</div>';

  document.getElementById('resultStats').innerHTML = statsHtml;
  initStars();
}

// ============================================================
// 重新开始
// ============================================================

function restartGame() {
  score = 0;
  combo = 0;
  maxCombo = 0;
  hp = 3;
  correctCount = 0;
  wrongCount = 0;
  currentLevel = 0;
  potionLocked = false;
  mode1Locked = false;

  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('startScreen').classList.remove('hidden');
}

// ============================================================
// 工具函数
// ============================================================

function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

function showStarParticle(el) {
  var rect = el.getBoundingClientRect();
  for (var i = 0; i < 5; i++) {
    var p = document.createElement('div');
    p.className = 'star-particle';
    p.textContent = ['⭐', '✨', '💫', '🌟', '⭐'][i];
    p.style.left = (rect.left + Math.random() * rect.width) + 'px';
    p.style.top = (rect.top + Math.random() * rect.height) + 'px';
    p.style.animationDelay = (i * 0.08) + 's';
    document.body.appendChild(p);
    setTimeout(function(pp) { if (pp.parentNode) pp.remove(); }, 1300, p);
  }
}

// 初始化星星
initStars();
