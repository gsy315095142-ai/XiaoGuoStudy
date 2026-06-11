/**
 * 🫧 凑整消消乐 - 第三单元：运算定律
 * 游戏核心逻辑（v2 - 直接在公式中圈数配对）
 *
 * 玩法：
 *   屏幕展示一个算式，数字可点击。
 *   玩家点击两个能凑整的数字 → 配对成功 → 高亮 + 显示变形步骤。
 *   找出所有凑整对 → 展示完整简算过程 → 进入下一关。
 */

// ============================================================
// 关卡数据
// ============================================================
// type: 'add' | 'mul' | 'dist'
// tokens: 算式中的每个元素 [{v, t}]  t='n'(数字可点击) | 'o'(运算符)
// pairs: [[idx1, idx2, result], ...] tokens 数组中的索引对
// simplify: 简算步骤文字数组，「」内会高亮

var LEVELS = {
  // ===== 第一章：加法凑凑乐 =====
  1: [
    {
      type: 'add',
      tokens: [
        { v: 47, t: 'n' }, { v: '+', t: 'o' },
        { v: 138, t: 'n' }, { v: '+', t: 'o' },
        { v: 53, t: 'n' }
      ],
      pairs: [[0, 4, 100]],
      hint: '找两个加起来等于 100 的数！',
      lawName: '加法交换律 + 结合律',
      lawFormula: '47 + 53 = 100 → 100 + 138 = 238',
      simplify: [
        '47 + 138 + 53',
        '= 「47 + 53」+ 138',
        '= 100 + 138',
        '= 238'
      ]
    },
    {
      type: 'add',
      tokens: [
        { v: 72, t: 'n' }, { v: '+', t: 'o' },
        { v: 59, t: 'n' }, { v: '+', t: 'o' },
        { v: 28, t: 'n' }
      ],
      pairs: [[0, 4, 100]],
      hint: '看个位！2 + 8 = 10，能凑整百！',
      lawName: '加法交换律 + 结合律',
      lawFormula: '72 + 28 = 100 → 100 + 59 = 159',
      simplify: [
        '72 + 59 + 28',
        '= 「72 + 28」+ 59',
        '= 100 + 59',
        '= 159'
      ]
    },
    {
      type: 'add',
      tokens: [
        { v: 35, t: 'n' }, { v: '+', t: 'o' },
        { v: 87, t: 'n' }, { v: '+', t: 'o' },
        { v: 65, t: 'n' }
      ],
      pairs: [[0, 4, 100]],
      hint: '看尾数！5 + 5 = 10，凑整百！',
      lawName: '加法交换律 + 结合律',
      lawFormula: '35 + 65 = 100 → 100 + 87 = 187',
      simplify: [
        '35 + 87 + 65',
        '= 「35 + 65」+ 87',
        '= 100 + 87',
        '= 187'
      ]
    },
    {
      type: 'add',
      tokens: [
        { v: 18, t: 'n' }, { v: '+', t: 'o' },
        { v: 46, t: 'n' }, { v: '+', t: 'o' },
        { v: 54, t: 'n' }, { v: '+', t: 'o' },
        { v: 82, t: 'n' }
      ],
      pairs: [[0, 6, 100], [2, 4, 100]],
      hint: '两对好朋友！都凑成 100！',
      lawName: '加法交换律 + 结合律',
      lawFormula: '18+82=100, 46+54=100 → 200',
      simplify: [
        '18 + 46 + 54 + 82',
        '= 「18 + 82」+「46 + 54」',
        '= 100 + 100',
        '= 200'
      ]
    },
    {
      type: 'add',
      tokens: [
        { v: 23, t: 'n' }, { v: '+', t: 'o' },
        { v: 145, t: 'n' }, { v: '+', t: 'o' },
        { v: 77, t: 'n' }, { v: '+', t: 'o' },
        { v: 55, t: 'n' }
      ],
      pairs: [[0, 4, 100], [2, 6, 200]],
      hint: '23 找谁？145 找谁？',
      lawName: '加法交换律 + 结合律',
      lawFormula: '23+77=100, 145+55=200 → 300',
      simplify: [
        '23 + 145 + 77 + 55',
        '= 「23 + 77」+「145 + 55」',
        '= 100 + 200',
        '= 300'
      ]
    }
  ],

  // ===== 第二章：乘法魔法对 =====
  2: [
    {
      type: 'mul',
      tokens: [
        { v: 25, t: 'n' }, { v: '×', t: 'o' },
        { v: 37, t: 'n' }, { v: '×', t: 'o' },
        { v: 4, t: 'n' }
      ],
      pairs: [[0, 4, 100]],
      hint: '25 最喜欢和谁做朋友？',
      lawName: '乘法交换律 + 结合律',
      lawFormula: '25 × 4 = 100 → 100 × 37 = 3700',
      simplify: [
        '25 × 37 × 4',
        '= 「25 × 4」× 37',
        '= 100 × 37',
        '= 3700'
      ]
    },
    {
      type: 'mul',
      tokens: [
        { v: 125, t: 'n' }, { v: '×', t: 'o' },
        { v: 19, t: 'n' }, { v: '×', t: 'o' },
        { v: 8, t: 'n' }
      ],
      pairs: [[0, 4, 1000]],
      hint: '125 的黄金搭档是谁？',
      lawName: '乘法交换律 + 结合律',
      lawFormula: '125 × 8 = 1000 → 1000 × 19 = 19000',
      simplify: [
        '125 × 19 × 8',
        '= 「125 × 8」× 19',
        '= 1000 × 19',
        '= 19000'
      ]
    },
    {
      type: 'mul',
      tokens: [
        { v: 25, t: 'n' }, { v: '×', t: 'o' },
        { v: 125, t: 'n' }, { v: '×', t: 'o' },
        { v: 4, t: 'n' }, { v: '×', t: 'o' },
        { v: 8, t: 'n' }
      ],
      pairs: [[0, 4, 100], [2, 6, 1000]],
      hint: '两对黄金搭档！凑出 100 和 1000！',
      lawName: '乘法交换律 + 结合律',
      lawFormula: '25×4=100, 125×8=1000 → 100000',
      simplify: [
        '25 × 125 × 4 × 8',
        '= 「25 × 4」×「125 × 8」',
        '= 100 × 1000',
        '= 100000'
      ]
    },
    {
      type: 'mul',
      tokens: [
        { v: 50, t: 'n' }, { v: '×', t: 'o' },
        { v: 23, t: 'n' }, { v: '×', t: 'o' },
        { v: 2, t: 'n' }
      ],
      pairs: [[0, 4, 100]],
      hint: '50 × ? = 100',
      lawName: '乘法交换律 + 结合律',
      lawFormula: '50 × 2 = 100 → 100 × 23 = 2300',
      simplify: [
        '50 × 23 × 2',
        '= 「50 × 2」× 23',
        '= 100 × 23',
        '= 2300'
      ]
    },
    {
      type: 'mul',
      tokens: [
        { v: 25, t: 'n' }, { v: '×', t: 'o' },
        { v: 16, t: 'n' }
      ],
      pairs: [[0, 2, 100]],
      hint: '16 = 4×4，25×4=?',
      lawName: '乘法结合律',
      lawFormula: '25 × 16 = 25 × 4 × 4 = 100 × 4 = 400',
      specialNote: '把 16 拆成 4×4，先算 25×4=100',
      simplify: [
        '25 × 16',
        '= 25 × (4 × 4)',
        '= 「25 × 4」× 4',
        '= 100 × 4',
        '= 400'
      ]
    }
  ],

  // ===== 第三章：速算大师（分配律） =====
  3: [
    {
      type: 'dist',
      tokens: [
        { v: '(', t: 'o' }, { v: 40, t: 'n' }, { v: '+', t: 'o' },
        { v: 8, t: 'n' }, { v: ')', t: 'o' },
        { v: '×', t: 'o' }, { v: 25, t: 'n' }
      ],
      pairs: [[1, 6, 1000], [3, 6, 200]],
      hint: '分配律：把 25 分给括号里每个数！',
      lawName: '乘法分配律',
      lawFormula: '(40+8)×25 = 40×25 + 8×25 = 1200',
      simplify: [
        '(40 + 8) × 25',
        '= 40 × 25 + 8 × 25',
        '= 「1000」+「200」',
        '= 1200'
      ]
    },
    {
      type: 'dist',
      tokens: [
        { v: 36, t: 'n' }, { v: '×', t: 'o' },
        { v: 99, t: 'n' }
      ],
      pairs: [[0, 2, 3564]],
      hint: '99 = 100 - 1，巧用分配律！',
      lawName: '乘法分配律',
      lawFormula: '36 × (100 - 1) = 3600 - 36 = 3564',
      specialNote: '把 99 拆成 100-1，再分别乘 36',
      simplify: [
        '36 × 99',
        '= 36 × (100 - 1)',
        '= 36×100 - 36×1',
        '= 3600 - 36',
        '= 3564'
      ]
    },
    {
      type: 'dist',
      tokens: [
        { v: 52, t: 'n' }, { v: '×', t: 'o' },
        { v: 101, t: 'n' }
      ],
      pairs: [[0, 2, 5252]],
      hint: '101 = 100 + 1！',
      lawName: '乘法分配律',
      lawFormula: '52 × (100 + 1) = 5200 + 52 = 5252',
      specialNote: '把 101 拆成 100+1，再分别乘 52',
      simplify: [
        '52 × 101',
        '= 52 × (100 + 1)',
        '= 52×100 + 52×1',
        '= 5200 + 52',
        '= 5252'
      ]
    },
    {
      type: 'dist',
      tokens: [
        { v: 23, t: 'n' }, { v: '×', t: 'o' },
        { v: 54, t: 'n' }, { v: '+', t: 'o' },
        { v: 23, t: 'n' }, { v: '×', t: 'o' },
        { v: 46, t: 'n' }
      ],
      pairs: [[2, 6, 100]],
      hint: '共同的朋友是 23！54 + 46 = ?',
      lawName: '乘法分配律（逆用）',
      lawFormula: '23×54 + 23×46 = 23×(54+46) = 2300',
      simplify: [
        '23 × 54 + 23 × 46',
        '= 23 ×「54 + 46」',
        '= 23 × 100',
        '= 2300'
      ]
    },
    {
      type: 'dist',
      tokens: [
        { v: 78, t: 'n' }, { v: '×', t: 'o' },
        { v: 102, t: 'n' }, { v: '-', t: 'o' },
        { v: 78, t: 'n' }, { v: '×', t: 'o' },
        { v: 2, t: 'n' }
      ],
      pairs: [[2, 6, 100]],
      hint: '共同的朋友是 78！102 - 2 = ?',
      lawName: '乘法分配律（逆用）',
      lawFormula: '78×102 - 78×2 = 78×(102-2) = 7800',
      simplify: [
        '78 × 102 - 78 × 2',
        '= 78 ×「102 - 2」',
        '= 78 × 100',
        '= 7800'
      ]
    }
  ]
};

// ============================================================
// 游戏状态
// ============================================================

var currentChapter = 1;
var currentLevel = 0;
var currentLevelData = null;
var selectedTokenIdx = -1;     // 当前选中的 token 索引
var score = 0;
var combo = 0;
var maxCombo = 0;
var hp = 3;
var hpMax = 3;
var matchedPairIndices = [];   // 已匹配的 pair 索引（在 pairs 数组中的序号）
var wrongCount = 0;
var correctCount = 0;

// ============================================================
// 章节选择
// ============================================================

function selectChapter(ch, event) {
  if (event) createRipple(event, event.currentTarget);
  currentChapter = ch;
  currentLevel = 0;
  // 【修复 #4】切换章节时重置血量和得分
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
  if (currentLevel >= levels.length) {
    showResult();
    return;
  }

  currentLevelData = levels[currentLevel];
  selectedTokenIdx = -1;
  matchedPairIndices = [];
  wrongCount = 0;

  updateHUD();
  updateProgress();

  document.getElementById('levelInfo').textContent = '第 ' + (currentLevel + 1) + ' 关';
  document.getElementById('questionText').textContent = currentLevelData.hint;

  renderFormulaStage();
  clearSimplifySteps();

  var actionHint = document.getElementById('actionHint');
  if (currentChapter === 1) {
    actionHint.textContent = '👆 点击算式中两个能凑成整十/整百的数字！';
  } else if (currentChapter === 2) {
    actionHint.textContent = '👆 点击算式中两个能凑成整百/整千的数字！';
  } else {
    actionHint.textContent = '👆 点击算式中能凑整的数字对！';
  }
}

// ============================================================
// 渲染公式操作区
// ============================================================

function renderFormulaStage() {
  var stage = document.getElementById('formulaStage');
  stage.innerHTML = '';
  var tokens = currentLevelData.tokens;

  for (var i = 0; i < tokens.length; i++) {
    var tk = tokens[i];
    if (tk.t === 'o') {
      var op = document.createElement('span');
      op.className = 'fop';
      op.textContent = ' ' + tk.v + ' ';
      stage.appendChild(op);
    } else {
      var num = document.createElement('span');
      num.className = 'fnum';
      num.textContent = tk.v;
      num.dataset.idx = i;
      num.addEventListener('click', function() {
        onNumClick(parseInt(this.dataset.idx));
      });
      stage.appendChild(num);
    }
  }
}

// ============================================================
// 点击数字
// ============================================================

// 【修复 #6】检查某数字是否还有未配对的 pair
function hasUnmatchedPair(tokenIdx) {
  var pairs = currentLevelData.pairs;
  for (var i = 0; i < pairs.length; i++) {
    if (matchedPairIndices.indexOf(i) === -1) {
      if (pairs[i][0] === tokenIdx || pairs[i][1] === tokenIdx) {
        return true;
      }
    }
  }
  return false;
}

function onNumClick(idx) {
  var el = getTokenEl(idx);
  if (!el) return;
  // 已配对的不能再选
  if (el.classList.contains('fnum-matched')) return;

  if (selectedTokenIdx === -1) {
    // 选中第一个
    selectedTokenIdx = idx;
    el.classList.add('fnum-selected');

  } else if (selectedTokenIdx === idx) {
    // 取消选中
    el.classList.remove('fnum-selected');
    selectedTokenIdx = -1;

  } else {
    // 选中第二个，判断配对
    var firstEl = getTokenEl(selectedTokenIdx);
    var secondEl = getTokenEl(idx);

    var matchResult = checkMatch(selectedTokenIdx, idx);

    if (matchResult !== null) {
      // ✅ 配对成功
      correctCount++;
      combo++;
      if (combo > maxCombo) maxCombo = combo;

      var points = 10;
      if (combo >= 5) points = 30;
      else if (combo >= 3) points = 20;
      score += points;

      firstEl.classList.remove('fnum-selected');
      // 【修复 #6】只有该数字参与的 pair 全部配完才标记为 matched
      if (!hasUnmatchedPair(selectedTokenIdx)) firstEl.classList.add('fnum-matched');
      if (!hasUnmatchedPair(idx)) secondEl.classList.add('fnum-matched');

      // 弹出 "=结果"
      var opSym = currentLevelData.type === 'mul' ? ' × ' : ' + ';
      showMatchPopup(secondEl, opSym + parseInt(secondEl.textContent) + ' = ' + matchResult + ' ✅');
      showStarParticle(firstEl);
      showStarParticle(secondEl);

      // 追加简算步骤
      appendStep(currentLevelData.tokens[selectedTokenIdx].v + opSym +
        currentLevelData.tokens[idx].v + ' = ' + matchResult + ' ✅');

      selectedTokenIdx = -1;
      updateHUD();

      // 检查是否全部配完
      setTimeout(function() { checkLevelComplete(); }, 300);

    } else {
      // ❌ 配对失败
      combo = 0;
      wrongCount++;

      firstEl.classList.remove('fnum-selected');
      firstEl.classList.add('fnum-wrong');
      secondEl.classList.add('fnum-wrong');

      var w1 = firstEl, w2 = secondEl;
      setTimeout(function() {
        w1.classList.remove('fnum-wrong');
        w2.classList.remove('fnum-wrong');
      }, 500);

      selectedTokenIdx = -1;
      hp = Math.max(0, hp - 1);
      updateHUD();

      if (hp <= 0) {
        setTimeout(function() { showResult(); }, 600);
      }
    }

    updateHUD();
  }
}

// ============================================================
// 检查配对
// ============================================================

function checkMatch(idx1, idx2) {
  var pairs = currentLevelData.pairs;
  for (var i = 0; i < pairs.length; i++) {
    var p = pairs[i];
    if ((idx1 === p[0] && idx2 === p[1]) || (idx1 === p[1] && idx2 === p[0])) {
      if (matchedPairIndices.indexOf(i) === -1) {
        matchedPairIndices.push(i);
        return p[2];
      }
    }
  }
  return null;
}

// ============================================================
// 检查关卡完成
// ============================================================

function checkLevelComplete() {
  if (matchedPairIndices.length >= currentLevelData.pairs.length) {
    // 展示完整简算过程
    showSimplifySteps();

    showToast('🎉', '太棒了！第 ' + (currentLevel + 1) + ' 关通过！', 2000);

    setTimeout(function() {
      currentLevel++;
      startLevel();
    }, 3000);
  }
}

// ============================================================
// 简算步骤
// ============================================================

function clearSimplifySteps() {
  var el = document.getElementById('simplifySteps');
  el.innerHTML = '';
  el.classList.remove('visible');
}

function appendStep(text) {
  var el = document.getElementById('simplifySteps');
  el.classList.add('visible');
  var step = document.createElement('div');
  step.className = 'simplify-step';
  step.innerHTML = text;
  el.appendChild(step);
}

function showSimplifySteps() {
  if (!currentLevelData.simplify) return;
  var el = document.getElementById('simplifySteps');
  el.innerHTML = '';
  el.classList.add('visible');

  var lines = currentLevelData.simplify;
  for (var i = 0; i < lines.length; i++) {
    (function(idx) {
      setTimeout(function() {
        var step = document.createElement('div');
        var line = lines[idx];
        // 第一行是原式，灰色
        if (idx === 0) {
          step.className = 'simplify-step step-original';
        } else if (idx === lines.length - 1) {
          step.className = 'simplify-step step-final';
        } else {
          step.className = 'simplify-step';
        }
        // 「」内高亮
        line = line.replace(/「([^」]+)」/g, '<span class="step-highlight">$1</span>');
        step.innerHTML = line;
        el.appendChild(step);
      }, idx * 300);
    })(i);
  }
}

// ============================================================
// 辅助函数
// ============================================================

function getTokenEl(idx) {
  return document.querySelector('.fnum[data-idx="' + idx + '"]');
}

function showMatchPopup(anchorEl, text) {
  var stage = document.getElementById('formulaStage');
  var rect = anchorEl.getBoundingClientRect();
  var stageRect = stage.getBoundingClientRect();

  var popup = document.createElement('div');
  popup.className = 'match-popup';
  popup.textContent = text;
  popup.style.left = (rect.left - stageRect.left + rect.width / 2 - 40) + 'px';
  popup.style.top = (rect.top - stageRect.top - 30) + 'px';
  stage.appendChild(popup);
  setTimeout(function() { if (popup.parentNode) popup.remove(); }, 1000);
}

function showStarParticle(el) {
  var rect = el.getBoundingClientRect();
  for (var i = 0; i < 3; i++) {
    var p = document.createElement('div');
    p.className = 'star-particle';
    p.textContent = ['⭐', '✨', '💫'][i];
    p.style.left = (rect.left + Math.random() * rect.width) + 'px';
    p.style.top = (rect.top + Math.random() * rect.height) + 'px';
    p.style.animationDelay = (i * 0.1) + 's';
    document.body.appendChild(p);
    setTimeout(function(pp) { if (pp.parentNode) pp.remove(); }, 1200, p);
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
    emoji = '🏆'; title = '全部通关！速算大师！';
  } else if (hp <= 0) {
    emoji = '😢'; title = '别灰心，再来一次！';
  } else {
    emoji = '💪'; title = '继续加油！';
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

  if (currentLevelData) {
    statsHtml += '<div class="knowledge-card">';
    statsHtml += '<h3>📚 本关知识点：' + currentLevelData.lawName + '</h3>';
    statsHtml += '<p>💡 ' + currentLevelData.lawFormula + '</p>';
    if (currentLevelData.specialNote) {
      statsHtml += '<p>🔑 ' + currentLevelData.specialNote + '</p>';
    }
    statsHtml += '</div>';
  }

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
  matchedPairIndices = [];
  selectedTokenIdx = -1;

  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('startScreen').classList.remove('hidden');
}

// 初始化星星
initStars();
