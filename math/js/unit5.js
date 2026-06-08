/**
 * 🏗️ 三角建造师 - 第五单元：三角形
 *
 * 四个章节：
 *   1. 材料检验  — 从仓库选3根木棍搭三角形（三边关系）+ 拼接动画
 *   2. 三角鉴定所 — 看三角形选分类（按角/按边）
 *   3. 角度拼图  — 已知两角算第三角（内角和 180°）
 *   4. 造桥大师  — 综合选择题
 */

// ============================================================
// 关卡数据
// ============================================================

var LEVELS = {

  // ===== 第一章：材料检验（三边关系）=====
  // sticks: 仓库里的木棍（5~6根，玩家选3根）
  // validSets: 所有能搭成三角形的3根组合
  1: [
    {
      sticks: [2, 3, 5, 4, 7],
      hint: '💡 任意两边之和要大于第三边！'
    },
    {
      sticks: [3, 4, 8, 5, 6],
      hint: '💡 太短的两根加起来够吗？'
    },
    {
      sticks: [3, 6, 10, 7, 4, 5],
      hint: '💡 仓库里有6根，找3根能搭的！'
    },
    {
      sticks: [2, 5, 9, 4, 7, 3],
      hint: '💡 先找最长的，再看其他两根加起来够不够'
    },
    {
      sticks: [1, 4, 6, 8, 10, 3],
      hint: '💡 有些组合差一点点就搭不了…'
    },
    {
      sticks: [2, 3, 10, 7, 5, 8],
      hint: '💡 别被短木棍骗了，要看三根一起能不能搭！'
    },
    {
      sticks: [5, 9, 12, 6, 3, 8],
      hint: '💡 高级关卡！仔细算一算每组的边之和'
    }
  ],

  // ===== 第二章：三角鉴定所（分类）=====
  2: [
    {
      type: 'angle',
      sides: [5, 5, 5],
      angles: [60, 60, 60],
      answer: '锐角三角形',
      choices: ['锐角三角形', '直角三角形', '钝角三角形'],
      info: '三个角都是 60°，都小于 90°'
    },
    {
      type: 'angle',
      sides: [3, 4, 5],
      angles: [37, 53, 90],
      answer: '直角三角形',
      choices: ['锐角三角形', '直角三角形', '钝角三角形'],
      info: '有一个角 = 90°'
    },
    {
      type: 'angle',
      sides: [4, 5, 8],
      angles: [24, 32, 124],
      answer: '钝角三角形',
      choices: ['锐角三角形', '直角三角形', '钝角三角形'],
      info: '有一个角 > 90°'
    },
    {
      type: 'side',
      sides: [5, 5, 3],
      angles: [67, 67, 46],
      answer: '等腰三角形',
      choices: ['等边三角形', '等腰三角形', '不等边三角形'],
      info: '两条边相等（5 = 5）'
    },
    {
      type: 'side',
      sides: [6, 6, 6],
      angles: [60, 60, 60],
      answer: '等边三角形',
      choices: ['等边三角形', '等腰三角形', '不等边三角形'],
      info: '三条边都相等（6 = 6 = 6）'
    },
    {
      type: 'side',
      sides: [3, 4, 5],
      angles: [37, 53, 90],
      answer: '不等边三角形',
      choices: ['等边三角形', '等腰三角形', '不等边三角形'],
      info: '三条边都不相等（3≠4≠5）'
    },
    {
      type: 'angle',
      sides: [4, 4, 4],
      angles: [60, 60, 60],
      answer: '锐角三角形',
      choices: ['锐角三角形', '直角三角形', '钝角三角形'],
      info: '三个角都是 60°，都小于 90°'
    }
  ],

  // ===== 第三章：角度拼图（内角和 180°）
  3: [
    {
      a: 60, b: 80,
      answer: 40,
      choices: [40, 50, 60],
      hint: '180 - 60 - 80 = ?'
    },
    {
      a: 90, b: 45,
      answer: 45,
      choices: [40, 45, 50],
      hint: '直角三角形！180 - 90 - 45 = ?'
    },
    {
      a: 55, b: 55,
      answer: 70,
      choices: [60, 70, 80],
      hint: '等腰三角形！两个底角相等'
    },
    {
      a: 30, b: 60,
      answer: 90,
      choices: [80, 90, 100],
      hint: '180 - 30 - 60 = ? 这是直角三角形！'
    },
    {
      a: 120, b: 30,
      answer: 30,
      choices: [30, 40, 60],
      hint: '钝角三角形！180 - 120 - 30 = ?'
    },
    {
      a: 72, b: 38,
      answer: 70,
      choices: [60, 70, 80],
      hint: '180 - 72 - 38 = ?'
    }
  ],

  // ===== 第四章：造桥大师（综合）
  4: [
    {
      question: '有三根木棍：<span class="q-highlight">3cm、4cm、5cm</span><br>能搭成三角形吗？',
      answer: '能，3+4=7>5 ✓',
      choices: ['能，3+4=7>5 ✓', '不能，3+4<5']
    },
    {
      question: '一个三角形三个角分别是 <span class="q-highlight">50°、60°、70°</span><br>这是什么三角形？',
      answer: '锐角三角形',
      choices: ['锐角三角形', '直角三角形', '钝角三角形']
    },
    {
      question: '等腰三角形的一个底角是 40°<br>顶角是多少度？',
      answer: '100°',
      choices: ['80°', '100°', '140°']
    },
    {
      question: '一个三角形中，<span class="q-highlight">最大的角是 95°</span><br>这是什么三角形？',
      answer: '钝角三角形',
      choices: ['锐角三角形', '直角三角形', '钝角三角形']
    },
    {
      question: '三角形三条边分别是 <span class="q-highlight">7cm、7cm、7cm</span><br>按边分是什么三角形？',
      answer: '等边三角形',
      choices: ['等腰三角形', '等边三角形', '不等边三角形']
    },
    {
      question: '三角形中两个角分别是 <span class="q-highlight">35° 和 55°</span><br>第三个角是多少度？这是什么三角形？',
      answer: '90°，直角三角形',
      choices: ['90°，直角三角形', '80°，锐角三角形', '100°，钝角三角形']
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

// 模式1：选中的木棍索引
var selectedStickIndices = [];
var mode1Locked = false;

// 模式3锁定
var mode3Locked = false;
// 模式4锁定
var mode4Locked = false;

// ============================================================
// 工具：判断三边能否构成三角形
// ============================================================

function canFormTriangle(a, b, c) {
  var sorted = [a, b, c].sort(function(x, y) { return x - y; });
  return sorted[0] + sorted[1] > sorted[2];
}

// ============================================================
// 章节选择
// ============================================================

function selectChapter(ch, event) {
  if (event) createRipple(event, event.currentTarget);
  currentChapter = ch;
  currentLevel = 0;
  score = 0; combo = 0; maxCombo = 0; hp = 3;
  correctCount = 0; wrongCount = 0;

  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');
  startLevel();
}

// ============================================================
// 开始关卡
// ============================================================

function startLevel() {
  var levels = LEVELS[currentChapter];
  if (currentLevel >= levels.length) { showResult(); return; }

  currentLevelData = levels[currentLevel];
  mode1Locked = false;
  mode3Locked = false;
  mode4Locked = false;
  selectedStickIndices = [];

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
  for (var i = 0; i < modes.length; i++) modes[i].classList.add('hidden');
}

// ============================================================
// 通用：答对 / 答错
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
  setTimeout(function() { currentLevel++; startLevel(); }, 1800);
}

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
// 模式1：材料检验（从仓库选3根木棍）
// ============================================================

function startMode1() {
  var modeEl = document.getElementById('mode1');
  modeEl.classList.remove('hidden');
  selectedStickIndices = [];

  // 隐藏拼接动画
  var assembleEl = document.getElementById('assembleStage');
  assembleEl.classList.add('hidden');

  var data = currentLevelData;

  // 渲染仓库木棍
  var shelfEl = document.getElementById('woodShelf');
  shelfEl.innerHTML = '<div class="shelf-label">📦 仓库</div>';

  var sticksWrap = document.createElement('div');
  sticksWrap.style.cssText = 'display:flex;justify-content:center;gap:10px;flex-wrap:wrap;';

  for (var i = 0; i < data.sticks.length; i++) {
    var len = data.sticks[i];
    var stick = document.createElement('div');
    stick.className = 'wood-stick';
    stick.dataset.idx = i;
    stick.innerHTML =
      '<div class="wood-length">' + len + '</div>' +
      '<div class="wood-bar" style="width:' + (len * 5 + 10) + 'px"></div>' +
      '<div class="wood-unit">cm</div>';
    stick.onclick = (function(idx) {
      return function() { pickStick(idx); };
    })(i);
    sticksWrap.appendChild(stick);
  }
  shelfEl.appendChild(sticksWrap);

  // 重置建造台
  resetBuildSlots();
  document.getElementById('buildBtn').disabled = true;
}

function pickStick(idx) {
  if (mode1Locked) return;

  var stickEls = document.querySelectorAll('.wood-stick');
  var stickEl = stickEls[idx];
  if (!stickEl) return;

  var pos = selectedStickIndices.indexOf(idx);

  if (pos >= 0) {
    // 取消选中
    selectedStickIndices.splice(pos, 1);
    stickEl.classList.remove('selected');
  } else {
    if (selectedStickIndices.length >= 3) return; // 已满
    selectedStickIndices.push(idx);
    stickEl.classList.add('selected');
  }

  updateBuildSlots();
}

function removeWood(slotIdx) {
  if (mode1Locked) return;
  if (slotIdx >= selectedStickIndices.length) return;

  var removedIdx = selectedStickIndices.splice(slotIdx, 1)[0];
  var stickEls = document.querySelectorAll('.wood-stick');
  if (stickEls[removedIdx]) stickEls[removedIdx].classList.remove('selected');

  updateBuildSlots();
}

function clearBuild() {
  if (mode1Locked) return;
  // 取消所有选中
  var stickEls = document.querySelectorAll('.wood-stick');
  for (var i = 0; i < selectedStickIndices.length; i++) {
    var el = stickEls[selectedStickIndices[i]];
    if (el) el.classList.remove('selected');
  }
  selectedStickIndices = [];
  updateBuildSlots();
}

function resetBuildSlots() {
  var slots = document.querySelectorAll('.build-slot');
  for (var i = 0; i < slots.length; i++) {
    slots[i].className = 'build-slot empty';
    slots[i].querySelector('.slot-value').textContent = '?';
  }
}

function updateBuildSlots() {
  var data = currentLevelData;
  var slots = document.querySelectorAll('.build-slot');

  for (var i = 0; i < 3; i++) {
    if (i < selectedStickIndices.length) {
      var len = data.sticks[selectedStickIndices[i]];
      slots[i].className = 'build-slot filled';
      slots[i].querySelector('.slot-value').textContent = len + 'cm';
    } else {
      slots[i].className = 'build-slot empty';
      slots[i].querySelector('.slot-value').textContent = '?';
    }
  }

  document.getElementById('buildBtn').disabled = selectedStickIndices.length < 3;
}

function tryBuild() {
  if (mode1Locked || selectedStickIndices.length < 3) return;
  mode1Locked = true;

  var data = currentLevelData;
  var a = data.sticks[selectedStickIndices[0]];
  var b = data.sticks[selectedStickIndices[1]];
  var c = data.sticks[selectedStickIndices[2]];
  var success = canFormTriangle(a, b, c);

  // 隐藏建造台，显示拼接动画
  document.getElementById('buildStage').classList.add('hidden');
  document.getElementById('woodShelf').classList.add('hidden');

  var assembleEl = document.getElementById('assembleStage');
  assembleEl.classList.remove('hidden');

  playAssembleAnimation(a, b, c, success);
}

function playAssembleAnimation(a, b, c, success) {
  var svg = document.getElementById('assembleSvg');
  svg.innerHTML = '';
  svg.className = 'assemble-svg';

  var resultEl = document.getElementById('assembleResult');
  resultEl.textContent = '';

  // 计算三角形顶点（用余弦定理）
  var maxSide = Math.max(a, b, c);
  var scale = 200 / maxSide;
  var sa = a * scale, sb = b * scale, sc = c * scale;

  // 顶点：A左下, B右下, C上方（或断裂位置）
  var Ax = 60, Ay = 160;
  var Bx = 60 + sc, By = 160;

  var cosA = (sb * sb + sc * sc - sa * sa) / (2 * sb * sc);
  cosA = Math.max(-1, Math.min(1, cosA));
  var angleA = Math.acos(cosA);

  var Cx = 60 + sb * Math.cos(angleA);
  var Cy = 160 - sb * Math.sin(angleA);

  if (!success) {
    // 断裂：C点故意偏移，让三角形合不上
    var gap = 30;
    Cx += gap;
    Cy -= gap * 0.5;
  }

  // 居中
  var allX = [Ax, Bx, Cx];
  var minX = Math.min.apply(null, allX);
  var maxX = Math.max.apply(null, allX);
  var offsetX = (320 - (maxX - minX)) / 2 - minX;
  Ax += offsetX; Bx += offsetX; Cx += offsetX;

  // 画三根木棍（线条），逐根动画
  var sides = [
    { x1: Ax, y1: Ay, x2: Bx, y2: By, len: c, delay: 0 },
    { x1: Bx, y1: By, x2: Cx, y2: Cy, len: a, delay: 0.4 },
    { x1: Cx, y1: Cy, x2: Ax, y2: Ay, len: b, delay: 0.8 }
  ];

  // 如果成功，先画三角形填充
  if (success) {
    var fill = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    fill.setAttribute('points', Ax+','+Ay + ' ' + Bx+','+By + ' ' + Cx+','+Cy);
    fill.setAttribute('fill', 'rgba(78,205,196,0)');
    fill.setAttribute('stroke', 'none');
    fill.classList.add('tri-fill');
    svg.appendChild(fill);
  }

  // 木棍颜色
  var colors = ['#8B4513', '#A0522D', '#6B3410'];

  for (var i = 0; i < sides.length; i++) {
    (function(s, idx) {
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', s.x1);
      line.setAttribute('y1', s.y1);
      line.setAttribute('x2', s.x2);
      line.setAttribute('y2', s.y2);
      line.setAttribute('stroke', colors[idx]);
      line.setAttribute('stroke-width', '8');
      line.setAttribute('stroke-linecap', 'round');

      // 计算线长用于 dasharray 动画
      var dx = s.x2 - s.x1, dy = s.y2 - s.y1;
      var len = Math.sqrt(dx * dx + dy * dy);
      line.style.strokeDasharray = len;
      line.style.strokeDashoffset = len;
      line.style.transition = 'stroke-dashoffset 0.5s ease ' + s.delay + 's, stroke 0.3s ease';

      svg.appendChild(line);

      // 触发动画
      setTimeout(function() {
        line.style.strokeDashoffset = '0';
      }, 50);

      // 长度标注
      var mx = (s.x1 + s.x2) / 2;
      var my = (s.y1 + s.y2) / 2;
      // 偏移到线段外侧
      var nx = -(s.y2 - s.y1), ny = s.x2 - s.x1;
      var nl = Math.sqrt(nx * nx + ny * ny) || 1;
      nx = nx / nl * 16; ny = ny / nl * 16;

      var label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', mx + nx);
      label.setAttribute('y', my + ny);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('dominant-baseline', 'middle');
      label.setAttribute('font-size', '14');
      label.setAttribute('font-weight', 'bold');
      label.setAttribute('fill', '#666');
      label.setAttribute('opacity', '0');
      label.textContent = s.len + 'cm';
      svg.appendChild(label);

      setTimeout(function() {
        label.setAttribute('opacity', '1');
        label.style.transition = 'opacity 0.3s ease';
      }, (s.delay + 0.5) * 1000);

    })(sides[i], i);
  }

  // 动画完成后显示结果
  setTimeout(function() {
    if (success) {
      svg.classList.add('success');
      // 填充渐显
      var fill = svg.querySelector('.tri-fill');
      if (fill) fill.style.transition = 'fill 0.5s ease';
      if (fill) fill.setAttribute('fill', 'rgba(78,205,196,0.2)');

      // 改变线条颜色
      var lines = svg.querySelectorAll('line');
      for (var j = 0; j < lines.length; j++) {
        lines[j].setAttribute('stroke', '#27AE60');
      }

      resultEl.className = 'assemble-result success';
      resultEl.innerHTML = '🎉 三根木棍首尾相连，搭成三角形！✅<br>' +
        '<span style="font-size:14px;opacity:0.7">' + a + ' + ' + b + ' > ' + c + ' 等',
        '满足三边关系</span>';

      onCorrect();
    } else {
      svg.classList.add('fail');

      // 断裂处加 ❌ 标记
      var gapX = (Bx + Cx) / 2;
      var gapY = (By + Cy) / 2;
      var cross = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      cross.setAttribute('x', gapX);
      cross.setAttribute('y', gapY - 10);
      cross.setAttribute('text-anchor', 'middle');
      cross.setAttribute('font-size', '24');
      cross.textContent = '💥';
      svg.appendChild(cross);

      resultEl.className = 'assemble-result fail';
      var sorted = [a, b, c].sort(function(x, y) { return x - y; });
      resultEl.innerHTML = '💥 桥塌了！' + sorted[0] + ' + ' + sorted[1] + ' = ' + (sorted[0]+sorted[1]) +
        (sorted[0]+sorted[1] > sorted[2] ? ' > ' : ' ≤ ') + sorted[2] + '<br>' +
        '<span style="font-size:14px;opacity:0.7">任意两边之和必须大于第三边！</span>';

      onWrong();

      // 答错后允许重试（解锁 + 重建UI）
      setTimeout(function() {
        mode1Locked = false;
        // 隐藏动画，恢复建造台
        document.getElementById('assembleStage').classList.add('hidden');
        document.getElementById('buildStage').classList.remove('hidden');
        document.getElementById('woodShelf').classList.remove('hidden');
      }, 1800);
    }
  }, 1600);
}

// ============================================================
// 模式2：三角鉴定所（分类）
// ============================================================

function startMode2() {
  var modeEl = document.getElementById('mode2');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;
  drawTriangleSvg(data.sides, data.angles);

  var infoEl = document.getElementById('triInfo');
  var html = '三条边：' + data.sides.join('、') + ' cm<br>';
  html += '三个角：' + data.angles.join('°、') + '°';
  infoEl.innerHTML = html;

  var btnsEl = document.getElementById('classifyBtns');
  btnsEl.innerHTML = '';
  var shuffled = data.choices.slice();
  shuffleArray(shuffled);
  for (var i = 0; i < shuffled.length; i++) {
    var btn = document.createElement('button');
    btn.className = 'classify-btn';
    btn.textContent = shuffled[i];
    btn.dataset.value = shuffled[i];
    btn.onclick = function() { submitClassify(this); };
    btnsEl.appendChild(btn);
  }
}

function drawTriangleSvg(sides, angles) {
  var svg = document.getElementById('triSvg');
  svg.innerHTML = '';

  var maxSide = Math.max(sides[0], sides[1], sides[2]);
  var scale = 220 / maxSide;
  var a = sides[0] * scale, b = sides[1] * scale, c = sides[2] * scale;

  var Ax = 40, Ay = 230;
  var Bx = 40 + c, By = 230;

  var cosA = (b * b + c * c - a * a) / (2 * b * c);
  cosA = Math.max(-1, Math.min(1, cosA));
  var angleA = Math.acos(cosA);

  var Cx = 40 + b * Math.cos(angleA);
  var Cy = 230 - b * Math.sin(angleA);

  var allX = [Ax, Bx, Cx];
  var minX = Math.min.apply(null, allX);
  var maxX = Math.max.apply(null, allX);
  var offsetX = (300 - (maxX - minX)) / 2 - minX;
  Ax += offsetX; Bx += offsetX; Cx += offsetX;

  var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', Ax+','+Ay + ' ' + Bx+','+By + ' ' + Cx+','+Cy);
  polygon.setAttribute('fill', 'rgba(240,165,0,0.15)');
  polygon.setAttribute('stroke', '#E67E22');
  polygon.setAttribute('stroke-width', '3');
  svg.appendChild(polygon);

  var labels = [
    { text: sides[0], x: (Cx+Bx)/2, y: (Cy+By)/2+20 },
    { text: sides[1], x: (Ax+Cx)/2-24, y: (Ay+Cy)/2 },
    { text: sides[2], x: (Ax+Bx)/2, y: Ay+22 }
  ];
  for (var i = 0; i < labels.length; i++) {
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', labels[i].x);
    text.setAttribute('y', labels[i].y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '16');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('fill', '#8B4513');
    text.textContent = labels[i].text;
    svg.appendChild(text);
  }

  var angleLabels = [
    { text: angles[0]+'°', x: Ax+22, y: Ay-10 },
    { text: angles[1]+'°', x: Bx-22, y: By-10 },
    { text: angles[2]+'°', x: Cx, y: Cy-12 }
  ];
  for (var j = 0; j < angleLabels.length; j++) {
    var atext = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    atext.setAttribute('x', angleLabels[j].x);
    atext.setAttribute('y', angleLabels[j].y);
    atext.setAttribute('text-anchor', 'middle');
    atext.setAttribute('font-size', '14');
    atext.setAttribute('fill', '#3498DB');
    atext.textContent = angleLabels[j].text;
    svg.appendChild(atext);
  }
}

function submitClassify(btnEl) {
  var btns = document.querySelectorAll('.classify-btn');
  for (var i = 0; i < btns.length; i++) btns[i].disabled = true;

  if (btnEl.dataset.value === currentLevelData.answer) {
    btnEl.classList.add('correct');
    onCorrect();
  } else {
    btnEl.classList.add('wrong');
    for (var j = 0; j < btns.length; j++) {
      if (btns[j].dataset.value === currentLevelData.answer) btns[j].classList.add('correct');
    }
    onWrong();
  }
}

// ============================================================
// 模式3：角度拼图（内角和 180°）
// ============================================================

function startMode3() {
  var modeEl = document.getElementById('mode3');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;
  document.getElementById('angleProof').classList.add('hidden');

  var a = data.a, b = data.b, c = data.answer;
  var sides = estimateSides(a, b, c);
  drawAngleTriangle(sides, a, b, c);

  var infoEl = document.getElementById('angleInfo');
  infoEl.innerHTML =
    '<span class="known">∠A = ' + a + '°</span> &nbsp; ' +
    '<span class="known">∠B = ' + b + '°</span> &nbsp; ' +
    '<span class="unknown">∠C = ？</span>';

  var choicesEl = document.getElementById('angleChoices');
  choicesEl.innerHTML = '';
  var shuffled = data.choices.slice();
  shuffleArray(shuffled);
  for (var i = 0; i < shuffled.length; i++) {
    var btn = document.createElement('button');
    btn.className = 'angle-choice';
    btn.textContent = shuffled[i] + '°';
    btn.dataset.value = shuffled[i];
    btn.onclick = function() { submitAngle(this); };
    choicesEl.appendChild(btn);
  }
}

function estimateSides(a, b, c) {
  var sinA = Math.sin(a * Math.PI / 180);
  var sinB = Math.sin(b * Math.PI / 180);
  var sinC = Math.sin(c * Math.PI / 180);
  var k = 100;
  return [k * sinA, k * sinB, k * sinC];
}

function drawAngleTriangle(sides, angA, angB, angC) {
  var svg = document.getElementById('angleSvg');
  svg.innerHTML = '';

  var maxSide = Math.max(sides[0], sides[1], sides[2]);
  var scale = 200 / maxSide;
  var a = sides[0]*scale, b = sides[1]*scale, c = sides[2]*scale;

  var Ax = 50, Ay = 220;
  var Bx = 50 + c, By = 220;

  var cosA = (b*b + c*c - a*a) / (2*b*c);
  cosA = Math.max(-1, Math.min(1, cosA));
  var angleA = Math.acos(cosA);
  var Cx = 50 + b * Math.cos(angleA);
  var Cy = 220 - b * Math.sin(angleA);

  var allX = [Ax, Bx, Cx];
  var minX = Math.min.apply(null, allX);
  var maxX = Math.max.apply(null, allX);
  var offsetX = (300 - (maxX - minX)) / 2 - minX;
  Ax += offsetX; Bx += offsetX; Cx += offsetX;

  var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', Ax+','+Ay + ' ' + Bx+','+By + ' ' + Cx+','+Cy);
  polygon.setAttribute('fill', 'rgba(155,89,182,0.12)');
  polygon.setAttribute('stroke', '#9B59B6');
  polygon.setAttribute('stroke-width', '3');
  svg.appendChild(polygon);

  var labels = [
    { text: angA+'°', x: Ax+24, y: Ay-12, color: '#3498DB' },
    { text: angB+'°', x: Bx-24, y: By-12, color: '#3498DB' },
    { text: '?', x: Cx, y: Cy-14, color: '#E74C3C' }
  ];
  for (var i = 0; i < labels.length; i++) {
    var t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', labels[i].x);
    t.setAttribute('y', labels[i].y);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('font-size', '18');
    t.setAttribute('font-weight', 'bold');
    t.setAttribute('fill', labels[i].color);
    t.textContent = labels[i].text;
    svg.appendChild(t);
  }
}

function submitAngle(btnEl) {
  if (mode3Locked) return;
  mode3Locked = true;

  var val = parseInt(btnEl.dataset.value);
  var btns = document.querySelectorAll('.angle-choice');
  for (var i = 0; i < btns.length; i++) btns[i].disabled = true;

  if (val === currentLevelData.answer) {
    btnEl.classList.add('correct');
    showAngleProof();
    onCorrect();
  } else {
    btnEl.classList.add('wrong');
    for (var j = 0; j < btns.length; j++) {
      if (parseInt(btns[j].dataset.value) === currentLevelData.answer) btns[j].classList.add('correct');
    }
    onWrong();
  }
}

function showAngleProof() {
  var proofEl = document.getElementById('angleProof');
  proofEl.classList.remove('hidden');

  var data = currentLevelData;
  var a = data.a, b = data.b, c = data.answer;

  var svg = document.getElementById('proofSvg');
  svg.innerHTML = '';

  var startX = 20;
  var colors = ['#3498DB', '#27AE60', '#E74C3C'];
  var angles = [a, b, c];
  var totalAngle = a + b + c;
  var pxPerDeg = 280 / totalAngle;

  for (var i = 0; i < 3; i++) {
    var w = angles[i] * pxPerDeg;

    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', startX);
    rect.setAttribute('y', 30);
    rect.setAttribute('width', w);
    rect.setAttribute('height', 50);
    rect.setAttribute('fill', colors[i]);
    rect.setAttribute('rx', '6');
    rect.setAttribute('opacity', '0.85');
    svg.appendChild(rect);

    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', startX + w/2);
    text.setAttribute('y', 62);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '16');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('fill', 'white');
    text.textContent = angles[i] + '°';
    svg.appendChild(text);

    startX += w;
  }

  var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', '20'); line.setAttribute('y1', '80');
  line.setAttribute('x2', '300'); line.setAttribute('y2', '80');
  line.setAttribute('stroke', '#333'); line.setAttribute('stroke-width', '3');
  svg.appendChild(line);

  var total = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  total.setAttribute('x', '310'); total.setAttribute('y', '62');
  total.setAttribute('font-size', '16');
  total.setAttribute('font-weight', 'bold');
  total.setAttribute('fill', '#9B59B6');
  total.textContent = '= 180°';
  svg.appendChild(total);
}

// ============================================================
// 模式4：造桥大师（综合选择题）
// ============================================================

function startMode4() {
  var modeEl = document.getElementById('mode4');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;
  document.getElementById('bridgeQuestion').innerHTML = data.question;

  var choicesEl = document.getElementById('bridgeChoices');
  choicesEl.innerHTML = '';
  var shuffled = data.choices.slice();
  shuffleArray(shuffled);
  for (var i = 0; i < shuffled.length; i++) {
    var btn = document.createElement('button');
    btn.className = 'bridge-choice';
    btn.textContent = shuffled[i];
    btn.dataset.value = shuffled[i];
    btn.onclick = function() { submitBridge(this); };
    choicesEl.appendChild(btn);
  }
}

function submitBridge(btnEl) {
  if (mode4Locked) return;
  mode4Locked = true;

  var btns = document.querySelectorAll('.bridge-choice');
  for (var i = 0; i < btns.length; i++) btns[i].disabled = true;

  if (btnEl.dataset.value === currentLevelData.answer) {
    btnEl.classList.add('correct');
    onCorrect();
  } else {
    btnEl.classList.add('wrong');
    for (var j = 0; j < btns.length; j++) {
      if (btns[j].dataset.value === currentLevelData.answer) btns[j].classList.add('correct');
    }
    onWrong();
  }
}

// ============================================================
// HUD / 进度
// ============================================================

function updateHUD() {
  var hearts = '';
  for (var i = 0; i < hpMax; i++) {
    hearts += '<span' + (i < hp ? '' : ' style="opacity:0.3"') + '>❤️</span>';
  }
  document.getElementById('heartsDisplay').innerHTML = hearts;
  document.getElementById('scoreDisplay').textContent = score;
  document.getElementById('comboDisplay').textContent = combo >= 2 ? '🔥' + combo + '连击' : '';
}

function updateProgress() {
  var levels = LEVELS[currentChapter];
  var pct = (currentLevel / levels.length) * 100;
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('progressText').textContent = (currentLevel+1) + '/' + levels.length;
}

// ============================================================
// 结果画面
// ============================================================

function showResult() {
  document.getElementById('gameScreen').classList.add('hidden');
  document.getElementById('resultScreen').classList.remove('hidden');

  var levels = LEVELS[currentChapter];
  var allDone = currentLevel >= levels.length;

  document.getElementById('resultEmoji').textContent = allDone ? '🏆' : '💪';
  document.getElementById('resultTitle').textContent = allDone ? '全部通关！建造大师！' : '别灰心，再来一次！';

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

  var chapterNames = { 1:'三角形三边关系', 2:'三角形分类', 3:'三角形内角和', 4:'三角形综合应用' };
  var chapterTips = {
    1: '三角形任意两边之和大于第三边。判断时只需验证最短的两条边之和是否大于最长边！',
    2: '按角分：锐角三角形（三个角都<90°）、直角三角形（有一个=90°）、钝角三角形（有一个>90°）<br>按边分：等边（三边相等）、等腰（两边相等）、不等边',
    3: '三角形内角和 = 180°。已知两个角，第三个角 = 180° - ∠A - ∠B',
    4: '综合运用三边关系、分类方法和内角和知识来解决问题！'
  };
  statsHtml += '<div class="knowledge-card">';
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
  score = 0; combo = 0; maxCombo = 0; hp = 3;
  correctCount = 0; wrongCount = 0; currentLevel = 0;
  mode1Locked = false; mode3Locked = false; mode4Locked = false;

  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('startScreen').classList.remove('hidden');
}

// ============================================================
// 工具函数
// ============================================================

function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
}

function showStarParticle(el) {
  if (!el) return;
  var rect = el.getBoundingClientRect();
  for (var i = 0; i < 5; i++) {
    var p = document.createElement('div');
    p.className = 'star-particle';
    p.textContent = ['⭐','✨','💫','🌟','⭐'][i];
    p.style.left = (rect.left + Math.random()*rect.width) + 'px';
    p.style.top = (rect.top + Math.random()*rect.height) + 'px';
    p.style.animationDelay = (i*0.08) + 's';
    document.body.appendChild(p);
    setTimeout(function(pp) { if (pp.parentNode) pp.remove(); }, 1300, p);
  }
}

initStars();
