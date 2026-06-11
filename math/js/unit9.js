/**
 * 🐔 农场大侦探 - 第九单元：鸡兔同笼
 *
 * 四个章节：
 *   1. 兔笼探秘  — 搭配鸡兔入笼，动手探索假设法
 *   2. 算术推理  — 经典鸡兔同笼计算
 *   3. 变形谜题  — 龟鹤同池、大船小船等变式
 *   4. 终极挑战  — 综合应用 + 反向推理
 *
 * 注意：totalStars、initStars、showToast、addStars 由 common.js 提供
 */

// ============================================================
// 关卡数据
// ============================================================

var LEVELS = {

  // ===== 第一章：兔笼探秘（搭配入笼） =====
  1: [
    {
      story: '🐔 农场有一个笼子，里面有 5 个头，14 只脚。猜猜有几只鸡、几只兔？',
      heads: 5, feet: 14, chicken: 3, rabbit: 2
    },
    {
      story: '🐔 笼子里有 8 个头，22 只脚。鸡和兔各有几只？',
      heads: 8, feet: 22, chicken: 5, rabbit: 3
    },
    {
      story: '🐔 一个笼子，6 个头，20 只脚。鸡兔各多少？',
      heads: 6, feet: 20, chicken: 2, rabbit: 4
    },
    {
      story: '🐔 大笼子里有 10 个头，28 只脚。有几只鸡几只兔？',
      heads: 10, feet: 28, chicken: 6, rabbit: 4
    },
    {
      story: '🐔 笼子里共 7 个头，24 只脚。鸡和兔各有多少？',
      heads: 7, feet: 24, chicken: 2, rabbit: 5
    },
    {
      story: '🐔 一个笼子有 9 个头，26 只脚。鸡兔各几只？',
      heads: 9, feet: 26, chicken: 5, rabbit: 4
    },
    {
      story: '🐔 最大的笼子！12 个头，32 只脚。鸡兔各几只？',
      heads: 12, feet: 32, chicken: 8, rabbit: 4
    }
  ],

  // ===== 第二章：算术推理（经典鸡兔同笼计算） =====
  2: [
    {
      story: '🧮 笼子里有鸡和兔共 10 只，数一数脚有 28 只。兔有多少只？',
      question: '假设全是鸡：10×2=20（只脚）\n少了 28-20=8（只脚）\n每换一只兔多 2 只脚\n兔 = 8÷2 = ？',
      answer: 4, choices: [3, 4, 5, 6]
    },
    {
      story: '🧮 笼中共有鸡兔 15 只，脚 40 只。鸡有几只？',
      question: '假设全是鸡：15×2=30（只脚）\n少了 40-30=10（只脚）\n兔 = 10÷2 = 5\n鸡 = 15-5 = ？',
      answer: 10, choices: [8, 9, 10, 11]
    },
    {
      story: '🧮 鸡兔同笼，共 20 只，脚 56 只。兔有多少只？',
      question: '假设全是鸡：20×2=40\n少了 56-40=16\n兔 = 16÷2 = ？',
      answer: 8, choices: [6, 7, 8, 9]
    },
    {
      story: '🧮 鸡兔共 12 只，脚 32 只。鸡有几只？',
      question: '假设全是鸡：12×2=24\n少了 32-24=8\n兔 = 8÷2=4\n鸡 = 12-4 = ？',
      answer: 8, choices: [6, 7, 8, 10]
    },
    {
      story: '🧮 笼中鸡兔共 25 只，脚 70 只。兔有多少只？',
      question: '假设全是鸡：25×2=50\n少了 70-50=20\n兔 = 20÷2 = ？',
      answer: 10, choices: [8, 10, 12, 15]
    },
    {
      story: '🧮 鸡兔共 30 只，脚 80 只。兔有几只？',
      question: '假设全是鸡：30×2=60\n少了 80-60=20\n兔 = 20÷2 = ？',
      answer: 10, choices: [10, 15, 20, 25]
    }
  ],

  // ===== 第三章：变形谜题（变式题） =====
  3: [
    {
      story: '🐢🦢 池塘里有龟和鹤共 10 只，数腿有 28 条。龟有几只？（龟4条腿，鹤2条腿）',
      question: '假设全是鹤：10×2=20（条腿）\n少了 28-20=8\n龟 = 8÷2 = ？',
      answer: 4, choices: [3, 4, 5, 6]
    },
    {
      story: '🚢 小船大船共 8 条，一共坐了 34 人。小船坐 4 人，大船坐 6 人。大船有几条？',
      question: '假设全小船：8×4=32（人）\n少了 34-32=2\n大船 = 2÷(6-4) = ？',
      answer: 1, choices: [1, 2, 3, 4]
    },
    {
      story: '💰 小明有 1 元和 5 角的硬币共 12 枚，加起来 8.5 元。1 元的硬币有几枚？',
      question: '假设全是5角：12×0.5=6元\n少了 8.5-6=2.5元=25角\n1元硬币 = 25÷(10-5) = ？',
      answer: 5, choices: [3, 4, 5, 7]
    },
    {
      story: '🏓 学校买篮球和足球共 6 个，花了 250 元。篮球 45 元/个，足球 35 元/个。篮球买了几个？',
      question: '假设全是足球：6×35=210元\n少了 250-210=40元\n篮球 = 40÷(45-35) = ？',
      answer: 4, choices: [2, 3, 4, 5]
    },
    {
      story: '🌳 种松树和柏树共 100 棵，松树每棵 3 元，柏树每棵 5 元，共花 360 元。松树种了多少棵？',
      question: '假设全是柏树：100×5=500元\n多出 500-360=140元\n松树 = 140÷(5-3) = ？',
      answer: 70, choices: [60, 65, 70, 75]
    },
    {
      story: '🏁 自行车（2轮）和三轮车共 20 辆，轮子共 50 个。三轮车有多少辆？',
      question: '假设全是自行车：20×2=40（个轮）\n少了 50-40=10\n三轮车 = 10÷(3-2) = ？',
      answer: 10, choices: [8, 10, 12, 15]
    }
  ],

  // ===== 第四章：终极挑战（综合 + 反向题） =====
  4: [
    {
      story: '🏆 笼子里有鸡 6 只、兔 4 只，一共有多少只脚？',
      question: '鸡的脚 + 兔的脚 = 6×2 + 4×4 = ？',
      answer: 28, choices: [24, 26, 28, 30]
    },
    {
      story: '🏆 有人说"鸡兔同笼，如果脚数恰好是头数的2倍，说明全是鸡"，对吗？',
      question: '脚数 = 头数 × 2 时，笼子里全是鸡吗？',
      answer: '对，鸡有2只脚，脚数=头数×2说明全是鸡',
      choices: ['对，全是鸡', '不对，可能有兔', '不对，全是兔', '无法确定']
    },
    {
      story: '🏆 鸡兔同笼，鸡比兔多 2 只，脚共 28 只。兔有几只？',
      question: '设兔有 x 只，鸡有 x+2 只\n4x + 2(x+2) = 28\n6x + 4 = 28\n兔 x = ？',
      answer: 4, choices: [3, 4, 5, 6]
    },
    {
      story: '🏆 笼中鸡兔共 11 只，兔比鸡多 1 只。脚一共有多少只？',
      question: '兔比鸡多1只：兔6只，鸡5只\n脚 = 5×2 + 6×4 = ？',
      answer: 34, choices: [30, 32, 34, 36]
    },
    {
      story: '🏆 农场有鸡兔共 35 只，脚共 94 只。兔有几只？',
      question: '假设全是鸡：35×2=70\n少了 94-70=24\n兔 = 24÷2 = ？',
      answer: 12, choices: [10, 11, 12, 13]
    },
    {
      story: '🏆 两个笼子：A笼鸡兔共5只脚14只，B笼鸡兔共7只脚20只。哪个笼子兔子多？',
      question: 'A笼兔=(14-5×2)÷2=2只\nB笼兔=(20-7×2)÷2=3只\n哪个兔子多？',
      answer: 'B笼子兔子多',
      choices: ['A笼子兔子多', 'B笼子兔子多', '一样多', '无法确定']
    }
  ]
};


// ============================================================
// 游戏状态
// ============================================================

var currentChapter = 0;
var currentLevel = 0;
var lives = 3;
var score = 0;
var combo = 0;
var answered = false;
var earnedStars = 0; // 【修复 #7】记录本局获得的星星数

// 模式1：搭配入笼状态
var m1 = {
  heads: 0,
  targetFeet: 0,
  chickenAnswer: 0,
  rabbitAnswer: 0,
  chicken: 0,       // 当前笼子里鸡的数量
  rabbit: 0,        // 当前笼子里兔的数量
  animating: false
};


// ============================================================
// 初始化 & 通用
// ============================================================

// 【修复 #11】接收 event 参数，添加波纹效果
function selectChapter(ch, event) {
  if (event) createRipple(event, event.currentTarget);

  currentChapter = ch;
  currentLevel = 0;
  lives = 3;
  score = 0;
  combo = 0;
  answered = false;
  earnedStars = 0; // 【修复 #7】重置星星
  m1.animating = false;

  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');
  document.getElementById('resultScreen').classList.add('hidden');

  loadLevel();
}

function loadLevel() {
  answered = false;
  m1.animating = false;

  var levels = LEVELS[currentChapter];
  if (!levels) return;
  if (currentLevel >= levels.length) {
    showResult();
    return;
  }

  updateHUD();
  updateProgress();

  for (var i = 1; i <= 4; i++) {
    var m = document.getElementById('mode' + i);
    if (m) m.classList.add('hidden');
  }

  switch (currentChapter) {
    case 1: loadMode1(); break;
    case 2: loadMode2(); break;
    case 3: loadMode3(); break;
    case 4: loadMode4(); break;
  }
}

function updateHUD() {
  var hearts = '';
  for (var i = 0; i < lives; i++) hearts += '❤️';
  for (var i = lives; i < 3; i++) hearts += '🖤';
  document.getElementById('heartsDisplay').textContent = hearts;
  document.getElementById('scoreDisplay').textContent = score;
  var comboEl = document.getElementById('comboDisplay');
  comboEl.textContent = combo >= 2 ? ('🔥 ×' + combo) : '';
}

function updateProgress() {
  var levels = LEVELS[currentChapter];
  var total = levels.length;
  var current = currentLevel + 1;
  var pct = Math.round((current / total) * 100);
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('progressText').textContent = current + '/' + total;
  document.getElementById('levelInfo').textContent = '第 ' + current + ' 关';
}

function onCorrect() {
  if (answered) return;
  answered = true;
  combo++;
  var pts = 10 + (combo >= 3 ? combo * 2 : 0);
  score += pts;
  earnedStars++; // 【修复 #7】
  addStars(1);
  showToast('⭐', '答对了！+' + pts + '分', 1200);
  spawnStarParticles(3);
  updateHUD();

  setTimeout(function() {
    currentLevel++;
    loadLevel();
  }, 1300);
}

function onWrong() {
  if (answered) return;
  answered = true; // 【修复 #5】答错后立即锁定，防止重复点击
  combo = 0;
  lives--;
  updateHUD();
  showToast('❌', '答错了，再想想！', 1200);
  if (lives <= 0) {
    setTimeout(showResult, 1200);
  } else {
    // 【修复 #5】还有生命时，1.3秒后自动跳到下一题
    setTimeout(function() {
      currentLevel++;
      loadLevel();
    }, 1300);
  }
}

function showResult() {
  document.getElementById('gameScreen').classList.add('hidden');
  document.getElementById('resultScreen').classList.remove('hidden');

  var won = lives > 0;
  document.getElementById('resultEmoji').textContent = won ? '🏆' : '💪';
  document.getElementById('resultTitle').textContent = won ? '谜题破解！' : '继续努力！';

  var chapterNames = { 1: '兔笼探秘', 2: '算术推理', 3: '变形谜题', 4: '终极挑战' };
  var stats = '<div class="stat-row">📌 章节：<strong>' + chapterNames[currentChapter] + '</strong></div>';
  stats += '<div class="stat-row">🎯 得分：<strong>' + score + '</strong></div>';
  stats += '<div class="stat-row">❤️ 剩余生命：<strong>' + lives + '</strong></div>';
  // 【修复 #7】用 earnedStars 替代 score 显示星星数
  stats += '<div class="stat-row">⭐ 获得星星：<strong>' + earnedStars + '</strong></div>';

  if (won) {
    stats += '<div class="knowledge-card">';
    stats += '<h3>💡 知识小贴士</h3>';
    if (currentChapter === 1) {
      stats += '<p>🔑 <b>假设法</b>：先假设全是鸡，算出脚数差，再用差÷2得到兔的数量。每把一只鸡换成兔，脚数就多2只！</p>';
    } else if (currentChapter === 2) {
      stats += '<p>🔑 <b>鸡兔同笼公式</b>：兔 = (总脚数 - 头数×2) ÷ 2，鸡 = 头数 - 兔</p>';
    } else if (currentChapter === 3) {
      stats += '<p>🔑 <b>举一反三</b>：龟鹤同池、大船小船、硬币问题…本质都是鸡兔同笼！找到"2只脚"和"4只脚"的对应关系就行。</p>';
    } else {
      stats += '<p>🔑 <b>鸡兔同笼</b>是中国古代经典数学题，出自《孙子算经》，距今已有1500多年历史！</p>';
    }
    stats += '</div>';
  }

  document.getElementById('resultStats').innerHTML = stats;
}

function restartGame() {
  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('startScreen').classList.remove('hidden');
}


// ============================================================
// 模式1：兔笼探秘（搭配鸡兔入笼）
// ============================================================

function loadMode1() {
  var modeEl = document.getElementById('mode1');
  modeEl.classList.remove('hidden');

  var lv = LEVELS[1][currentLevel];
  document.getElementById('questionText').textContent = lv.story;

  m1.heads = lv.heads;
  m1.targetFeet = lv.feet;
  m1.chickenAnswer = lv.chicken;
  m1.rabbitAnswer = lv.rabbit;
  m1.chicken = 0;
  m1.rabbit = 0;
  m1.animating = false;

  // 重置提示
  var hintEl = document.getElementById('penHint');
  hintEl.textContent = '🤔 想一想，放几只鸡、几只兔？';
  hintEl.className = 'pen-hint';

  // 重置围栏外观
  var pen = document.querySelector('.farm-pen');
  if (pen) pen.classList.remove('pen-clear');

  // 启用按钮
  document.getElementById('penSubmitBtn').disabled = false;

  renderCage();
  updateMode1Counters();
  updatePoolCounts();
}

/**
 * 渲染笼子里的动物
 */
function renderCage() {
  var container = document.getElementById('cageAnimals');
  var html = '';

  if (m1.chicken === 0 && m1.rabbit === 0) {
    html = '<div class="cage-empty">笼子还是空的，快放动物进来吧！</div>';
  } else {
    // 先放鸡，再放兔
    for (var i = 0; i < m1.chicken; i++) {
      html += '<div class="cage-animal chicken-animal">';
      html += '  <span class="animal-ico">🐔</span>';
      html += '  <span class="animal-ft">2脚</span>';
      html += '</div>';
    }
    for (var i = 0; i < m1.rabbit; i++) {
      html += '<div class="cage-animal rabbit-animal">';
      html += '  <span class="animal-ico">🐰</span>';
      html += '  <span class="animal-ft">4脚</span>';
      html += '</div>';
    }
  }

  container.innerHTML = html;
}

/**
 * 更新笼子计数器（头数、脚数）
 */
function updateMode1Counters() {
  var totalHeads = m1.chicken + m1.rabbit;
  var totalFeet = m1.chicken * 2 + m1.rabbit * 4;

  // 头数
  var headsEl = document.getElementById('cageHeads');
  var headsB = headsEl.querySelector('b');
  headsEl.innerHTML = '头数: <b class="' + getCounterClass(totalHeads, m1.heads) + '">' + totalHeads + '</b> / ' + m1.heads;

  // 脚数
  var feetEl = document.getElementById('cageFeet');
  var feetB = feetEl.querySelector('b');
  feetEl.innerHTML = '脚数: <b class="' + getCounterClass(totalFeet, m1.targetFeet) + '">' + totalFeet + '</b> / ' + m1.targetFeet;
}

function getCounterClass(current, target) {
  if (current === target) return 'match';
  if (current > target) return 'over';
  return '';
}

/**
 * 更新动物池里的数量显示
 */
function updatePoolCounts() {
  document.getElementById('chickenCount').textContent = m1.chicken;
  document.getElementById('rabbitCount').textContent = m1.rabbit;
}

/**
 * 加减动物
 */
function mode1Adjust(type, delta) {
  if (answered || m1.animating) return;

  var total = m1.chicken + m1.rabbit;

  if (type === 'chicken') {
    var newVal = m1.chicken + delta;
    if (newVal < 0) return;
    if (delta > 0 && total >= m1.heads) {
      showToast('🐔', '头数已经满了！最多 ' + m1.heads + ' 个头', 1000);
      return;
    }
    m1.chicken = newVal;
  } else {
    var newVal = m1.rabbit + delta;
    if (newVal < 0) return;
    if (delta > 0 && total >= m1.heads) {
      showToast('🐰', '头数已经满了！最多 ' + m1.heads + ' 个头', 1000);
      return;
    }
    m1.rabbit = newVal;
  }

  renderCage();
  updateMode1Counters();
  updatePoolCounts();

  // 更新提示
  var hintEl = document.getElementById('penHint');
  var curFeet = m1.chicken * 2 + m1.rabbit * 4;
  var curHeads = m1.chicken + m1.rabbit;

  if (curHeads === 0) {
    hintEl.textContent = '🤔 想一想，放几只鸡、几只兔？';
    hintEl.className = 'pen-hint';
  } else if (curHeads < m1.heads) {
    hintEl.textContent = '👀 还没放满哦，还需要 ' + (m1.heads - curHeads) + ' 只动物';
    hintEl.className = 'pen-hint hint-thinking';
  } else if (curHeads === m1.heads && curFeet !== m1.targetFeet) {
    // 头数对了但脚数不对
    if (curFeet < m1.targetFeet) {
      hintEl.textContent = '💭 头数对了，但脚数不够，想想该怎么调整？';
    } else {
      hintEl.textContent = '💭 头数对了，但脚数太多了，想想该怎么调整？';
    }
    hintEl.className = 'pen-hint hint-thinking';
  } else if (curHeads === m1.heads && curFeet === m1.targetFeet) {
    hintEl.textContent = '🎉 看起来刚好！快提交答案吧！';
    hintEl.className = 'pen-hint hint-done';
  }
}

/**
 * 清空笼子
 */
function mode1Clear() {
  if (answered || m1.animating) return;

  m1.chicken = 0;
  m1.rabbit = 0;

  renderCage();
  updateMode1Counters();
  updatePoolCounts();

  var hintEl = document.getElementById('penHint');
  hintEl.textContent = '🤔 想一想，放几只鸡、几只兔？';
  hintEl.className = 'pen-hint';
}

/**
 * 提交答案
 */
function mode1Submit() {
  if (answered || m1.animating) return;

  var totalHeads = m1.chicken + m1.rabbit;
  var totalFeet = m1.chicken * 2 + m1.rabbit * 4;

  // 检查头数
  if (totalHeads !== m1.heads) {
    showToast('❌', '头数不对！需要 ' + m1.heads + ' 个头，你放了 ' + totalHeads + ' 个', 1500);
    return;
  }

  // 检查答案
  if (m1.chicken === m1.chickenAnswer && m1.rabbit === m1.rabbitAnswer) {
    // 正确！
    answered = true;
    m1.animating = true;

    var hintEl = document.getElementById('penHint');
    hintEl.textContent = '🎉 完美！鸡 ' + m1.chicken + ' 只，兔 ' + m1.rabbit + ' 只！';
    hintEl.className = 'pen-hint hint-done';

    var pen = document.querySelector('.farm-pen');
    if (pen) pen.classList.add('pen-clear');

    document.getElementById('penSubmitBtn').disabled = true;

    combo++;
    var pts = 10 + (combo >= 3 ? combo * 2 : 0);
    score += pts;
    earnedStars++; // 【修复 #7】
    addStars(1);
    showToast('🎉', '太棒了！+' + pts + '分', 1500);
    spawnStarParticles(5);
    updateHUD();

    setTimeout(function() {
      m1.animating = false;
      currentLevel++;
      loadLevel();
    }, 1800);
  } else {
    // 错误：头数对了但脚数不对
    answered = true; // 【修复 #5】答错后锁定
    combo = 0;
    lives--;
    updateHUD();

    var hintEl = document.getElementById('penHint');
    if (totalFeet < m1.targetFeet) {
      hintEl.textContent = '😅 脚数不够，差了 ' + (m1.targetFeet - totalFeet) + ' 只脚，再想想怎么调整？';
    } else {
      hintEl.textContent = '😅 脚数太多了，多了 ' + (totalFeet - m1.targetFeet) + ' 只脚，再想想怎么调整？';
    }
    hintEl.className = 'pen-hint';
    showToast('❌', '答错了，脚数不对，再调整一下！', 1500);

    if (lives <= 0) {
      setTimeout(showResult, 1500);
    } else {
      // 【修复 #5】还有生命时，1.5秒后自动跳到下一题
      setTimeout(function() {
        currentLevel++;
        loadLevel();
      }, 1500);
    }
  }
}


// ============================================================
// 模式2：算术推理（经典鸡兔同笼计算）
// ============================================================

function loadMode2() {
  var modeEl = document.getElementById('mode2');
  modeEl.classList.remove('hidden');

  var lv = LEVELS[2][currentLevel];
  document.getElementById('questionText').textContent = '';

  var deskEl = document.getElementById('calcDesk');
  deskEl.innerHTML = '<div class="calc-story">' + lv.story + '</div>'
    + '<div class="calc-formula">' + lv.question.replace(/\n/g, '<br>') + '</div>';

  var choicesEl = document.getElementById('calcChoices');
  choicesEl.innerHTML = '';
  lv.choices.forEach(function(c) {
    var btn = document.createElement('button');
    btn.className = 'calc-choice';
    btn.textContent = formatNum(c);
    btn.onclick = function() {
      if (answered) return;
      var userAns = parseFloat(this.textContent);
      if (Math.abs(userAns - lv.answer) < 0.05) {
        this.classList.add('correct');
        onCorrect();
      } else {
        this.classList.add('wrong');
        onWrong();
      }
    };
    choicesEl.appendChild(btn);
  });
}


// ============================================================
// 模式3：变形谜题（变式选择题）
// ============================================================

function loadMode3() {
  var modeEl = document.getElementById('mode3');
  modeEl.classList.remove('hidden');

  var lv = LEVELS[3][currentLevel];
  document.getElementById('questionText').textContent = '';

  var deskEl = document.getElementById('puzzleDesk');
  deskEl.innerHTML = '<div class="puzzle-story">' + lv.story + '</div>'
    + '<div class="puzzle-question">' + lv.question.replace(/\n/g, '<br>') + '</div>';

  var choicesEl = document.getElementById('puzzleChoices');
  choicesEl.innerHTML = '';
  lv.choices.forEach(function(c) {
    var btn = document.createElement('button');
    btn.className = 'puzzle-choice';
    btn.textContent = (typeof c === 'string') ? c : formatNum(c);
    btn.onclick = function() {
      if (answered) return;
      var userAns = this.textContent;
      var correctAns = (typeof lv.answer === 'string') ? lv.answer : formatNum(lv.answer);
      if (userAns === correctAns || (typeof lv.answer === 'number' && Math.abs(parseFloat(userAns) - lv.answer) < 0.05)) {
        this.classList.add('correct');
        onCorrect();
      } else {
        this.classList.add('wrong');
        onWrong();
      }
    };
    choicesEl.appendChild(btn);
  });
}


// ============================================================
// 模式4：终极挑战（综合）
// ============================================================

function loadMode4() {
  var modeEl = document.getElementById('mode4');
  modeEl.classList.remove('hidden');

  var lv = LEVELS[4][currentLevel];
  document.getElementById('questionText').textContent = '';

  var deskEl = document.getElementById('finalDesk');
  deskEl.innerHTML = '<div class="final-story">' + lv.story + '</div>'
    + '<div class="final-formula">' + lv.question.replace(/\n/g, '<br>') + '</div>';

  var choicesEl = document.getElementById('finalChoices');
  choicesEl.innerHTML = '';
  lv.choices.forEach(function(c) {
    var btn = document.createElement('button');
    btn.className = 'final-choice';
    btn.textContent = (typeof c === 'string') ? c : formatNum(c);
    btn.onclick = function() {
      if (answered) return;
      var userAns = this.textContent;
      var correctAns = (typeof lv.answer === 'string') ? lv.answer : formatNum(lv.answer);
      if (userAns === correctAns || (typeof lv.answer === 'number' && Math.abs(parseFloat(userAns) - lv.answer) < 0.05)) {
        this.classList.add('correct');
        onCorrect();
      } else {
        this.classList.add('wrong');
        onWrong();
      }
    };
    choicesEl.appendChild(btn);
  });
}


// ============================================================
// 工具函数
// ============================================================

function formatNum(n) {
  if (typeof n === 'string') return n;
  if (n === Math.round(n)) return String(Math.round(n));
  var s = n.toFixed(2);
  s = s.replace(/\.?0+$/, '');
  return s;
}

function spawnStarParticles(count) {
  for (var i = 0; i < count; i++) {
    var p = document.createElement('div');
    p.className = 'star-particle';
    p.textContent = '⭐';
    p.style.left = (20 + Math.random() * 60) + '%';
    p.style.top = (30 + Math.random() * 30) + '%';
    p.style.animationDelay = (i * 0.1) + 's';
    document.body.appendChild(p);
    setTimeout(function(pp) { if (pp.parentNode) pp.remove(); }, 1300, p);
  }
}

// 页面初始化
initStars();
