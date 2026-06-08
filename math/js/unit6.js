/**
 * 🏪 小数便利店 - 第六单元：小数的加法和减法
 *
 * 四个章节：
 *   1. 收银台    — 小数加法（两件商品算总价）
 *   2. 找零钱    — 小数减法（顾客付钱，选硬币找零）
 *   3. 进货单    — 位数不同的小数加减（竖式展示，补0对齐）
 *   4. 特价大挑战 — 混合运算 + 简便计算
 */

// ============================================================
// 关卡数据
// ============================================================

var LEVELS = {

  // ===== 第一章：收银台（小数加法）=====
  // items: [{emoji, name, price}]  answer: 总价  choices: 选项
  1: [
    {
      items: [
        { emoji: '🍫', name: '巧克力', price: 3.50 },
        { emoji: '🥤', name: '果汁', price: 2.80 }
      ],
      answer: 6.30,
      choices: [6.30, 5.80, 6.13],
      hint: '3.50 + 2.80 = ?'
    },
    {
      items: [
        { emoji: '🍞', name: '面包', price: 4.25 },
        { emoji: '🥛', name: '牛奶', price: 3.60 }
      ],
      answer: 7.85,
      choices: [7.85, 7.75, 8.25],
      hint: '4.25 + 3.60 = ?'
    },
    {
      items: [
        { emoji: '🖊️', name: '钢笔', price: 8.90 },
        { emoji: '📓', name: '笔记本', price: 5.45 }
      ],
      answer: 14.35,
      choices: [14.35, 13.35, 14.25],
      hint: '8.90 + 5.45 = ? 注意进位！'
    },
    {
      items: [
        { emoji: '🍊', name: '橙子', price: 6.75 },
        { emoji: '🍎', name: '苹果', price: 4.38 }
      ],
      answer: 11.13,
      choices: [11.13, 10.13, 11.23],
      hint: '6.75 + 4.38 = ? 百分位也要加！'
    },
    {
      items: [
        { emoji: '🎨', name: '水彩笔', price: 12.80 },
        { emoji: '✂️', name: '剪刀', price: 7.65 }
      ],
      answer: 20.45,
      choices: [20.45, 19.45, 20.55],
      hint: '12.80 + 7.65 = ?'
    },
    {
      items: [
        { emoji: '📚', name: '故事书', price: 15.60 },
        { emoji: '🧸', name: '小熊', price: 9.85 }
      ],
      answer: 25.45,
      choices: [25.45, 24.45, 25.55],
      hint: '15.60 + 9.85 = ?'
    }
  ],

  // ===== 第二章：找零钱（小数减法）=====
  // item: 商品  price: 价格  paid: 顾客付的钱  answer: 找零
  2: [
    {
      emoji: '🍿', name: '爆米花', price: 6.50,
      paid: 10,
      answer: 3.50,
      hint: '10 - 6.50 = ?'
    },
    {
      emoji: '🍦', name: '冰淇淋', price: 4.25,
      paid: 10,
      answer: 5.75,
      hint: '10 - 4.25 = ?'
    },
    {
      emoji: '🎂', name: '蛋糕', price: 8.60,
      paid: 20,
      answer: 11.40,
      hint: '20 - 8.60 = ?'
    },
    {
      emoji: '🎒', name: '书包', price: 35.80,
      paid: 50,
      answer: 14.20,
      hint: '50 - 35.80 = ?'
    },
    {
      emoji: '⚽', name: '足球', price: 28.50,
      paid: 50,
      answer: 21.50,
      hint: '50 - 28.50 = ?'
    },
    {
      emoji: '🎲', name: '桌游', price: 42.75,
      paid: 100,
      answer: 57.25,
      hint: '100 - 42.75 = ?'
    }
  ],

  // ===== 第三章：进货单（位数不同的小数加减）
  // op: '+' 或 '-'  a, b: 两个数  answer  choices
  // verticalLines: 竖式展示的行（含补0提示）
  3: [
    {
      emoji: '✏️', name1: '铅笔', name2: '橡皮',
      op: '+', a: 3.5, b: 1.26,
      answer: 4.76,
      choices: [4.76, 4.85, 3.76],
      hint: '位数不同！3.5 要补成 3.50 再加'
    },
    {
      emoji: '📏', name1: '直尺', name2: '胶棒',
      op: '+', a: 2.8, b: 4.56,
      answer: 7.36,
      choices: [7.36, 6.36, 7.46],
      hint: '2.8 补成 2.80 再计算'
    },
    {
      emoji: '🖍️', name1: '蜡笔', name2: '贴纸',
      op: '-', a: 5.4, b: 2.18,
      answer: 3.22,
      choices: [3.22, 3.32, 2.22],
      hint: '5.4 补成 5.40 再减'
    },
    {
      emoji: '📕', name1: '字典', name2: '书签',
      op: '-', a: 12.6, b: 3.85,
      answer: 8.75,
      choices: [8.75, 8.85, 9.75],
      hint: '12.6 补成 12.60 再减'
    },
    {
      emoji: '🎨', name1: '颜料', name2: '画笔',
      op: '+', a: 6.5, b: 8.73,
      answer: 15.23,
      choices: [15.23, 14.23, 15.33],
      hint: '6.5 补成 6.50 再加，注意进位'
    }
  ],

  // ===== 第四章：特价大挑战（混合运算 + 简便计算）
  // question: HTML题目  answer  choices
  4: [
    {
      question: '薯片原价 <span class="pq-price">12.80元</span>，现在特价 <span class="pq-save">9.90元</span><br>便宜了多少钱？',
      answer: 2.90,
      choices: [2.90, 3.10, 2.80]
    },
    {
      question: '买了三样东西：<br><span class="pq-price">5.36元</span> + <span class="pq-price">2.78元</span> + <span class="pq-price">4.64元</span><br>一共多少钱？（试试凑整！）',
      answer: 12.78,
      choices: [12.78, 11.78, 12.88]
    },
    {
      question: '小明有 <span class="pq-price">20元</span>，买了 <span class="pq-price">6.80元</span> 的笔和 <span class="pq-price">5.50元</span> 的本子<br>还剩多少钱？',
      answer: 7.70,
      choices: [7.70, 7.80, 8.70]
    },
    {
      question: '买四样零食：<br><span class="pq-price">3.45元</span> + <span class="pq-price">6.55元</span> + <span class="pq-price">2.18元</span> + <span class="pq-price">7.82元</span><br>一共多少钱？（能凑整的两对！）',
      answer: 20.00,
      choices: [20.00, 19.00, 18.00]
    },
    {
      question: '书包 <span class="pq-price">45.60元</span>，文具盒 <span class="pq-price">18.75元</span><br>妈妈付了 <span class="pq-price">100元</span>，应找回多少钱？',
      answer: 35.65,
      choices: [35.65, 34.65, 36.35]
    },
    {
      question: '昨天买了 <span class="pq-price">15.80元</span> 的东西<br>今天又买了 <span class="pq-price">23.40元</span> 的东西<br>两天一共花了多少钱？',
      answer: 39.20,
      choices: [39.20, 38.20, 39.30]
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

// 模式1锁定
var mode1Locked = false;
// 模式2：已选硬币
var selectedCoins = [];
var mode2Locked = false;
// 模式3锁定
var mode3Locked = false;
// 模式4锁定
var mode4Locked = false;

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
  mode2Locked = false;
  mode3Locked = false;
  mode4Locked = false;
  selectedCoins = [];

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
  setTimeout(function() { currentLevel++; startLevel(); }, 1400);
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
// 模式1：收银台（小数加法 - 选总价）
// ============================================================

function startMode1() {
  var modeEl = document.getElementById('mode1');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;

  // 渲染商品卡片
  var rowEl = document.getElementById('productRow');
  rowEl.innerHTML = '';

  for (var i = 0; i < data.items.length; i++) {
    var item = data.items[i];
    var card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML =
      '<div class="product-emoji">' + item.emoji + '</div>' +
      '<div class="product-name">' + item.name + '</div>' +
      '<div class="product-price">' + item.price.toFixed(2) + ' 元</div>';
    rowEl.appendChild(card);

    // 加号
    if (i < data.items.length - 1) {
      var plus = document.createElement('div');
      plus.className = 'product-plus';
      plus.textContent = '+';
      rowEl.appendChild(plus);
    }
  }

  // 收银机显示
  document.getElementById('totalValue').textContent = '? 元';

  // 选项
  var choicesEl = document.getElementById('cashierChoices');
  choicesEl.innerHTML = '';
  var shuffled = data.choices.slice();
  shuffleArray(shuffled);
  for (var j = 0; j < shuffled.length; j++) {
    var btn = document.createElement('button');
    btn.className = 'cashier-choice';
    btn.textContent = formatMoney(shuffled[j]);
    btn.dataset.value = shuffled[j];
    btn.onclick = function() { submitCashier(this); };
    choicesEl.appendChild(btn);
  }
}

function submitCashier(btnEl) {
  if (mode1Locked) return;
  mode1Locked = true;

  var val = parseFloat(btnEl.dataset.value);
  var btns = document.querySelectorAll('.cashier-choice');
  for (var i = 0; i < btns.length; i++) btns[i].disabled = true;

  if (Math.abs(val - currentLevelData.answer) < 0.001) {
    btnEl.classList.add('correct');
    document.getElementById('totalValue').textContent = formatMoney(currentLevelData.answer) + ' 元';
    document.getElementById('totalValue').style.color = '#4ADE80';
    onCorrect();
  } else {
    btnEl.classList.add('wrong');
    for (var j = 0; j < btns.length; j++) {
      if (Math.abs(parseFloat(btns[j].dataset.value) - currentLevelData.answer) < 0.001) {
        btns[j].classList.add('correct');
      }
    }
    onWrong();
  }
}

// ============================================================
// 模式2：找零钱（小数减法 - 选硬币找零）
// ============================================================

function startMode2() {
  var modeEl = document.getElementById('mode2');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;
  selectedCoins = [];

  // 商品信息
  var infoEl = document.getElementById('changeInfo');
  infoEl.innerHTML =
    data.emoji + ' ' + data.name + '：<span class="highlight">' + formatMoney(data.price) + ' 元</span><br>' +
    '顾客付了：<span class="highlight">' + formatMoney(data.paid) + ' 元</span>';

  // 目标找零
  var targetEl = document.getElementById('changeTarget');
  targetEl.textContent = '🎯 需要找零：' + formatMoney(data.answer) + ' 元';

  // 硬币托盘
  var trayEl = document.getElementById('coinTray');
  trayEl.innerHTML = '';

  var coinTypes = [
    { val: 5, cls: 'coin-5yuan', label: '5元' },
    { val: 1, cls: 'coin-1yuan', label: '1元' },
    { val: 0.5, cls: 'coin-5jiao', label: '5角' },
    { val: 0.1, cls: 'coin-1jiao', label: '1角' }
  ];

  for (var i = 0; i < coinTypes.length; i++) {
    // 每种硬币放3个
    for (var k = 0; k < 3; k++) {
      (function(ct) {
        var coin = document.createElement('div');
        coin.className = 'coin ' + ct.cls;
        coin.innerHTML = '<span class="coin-symbol">¥</span><span class="coin-val">' + ct.label + '</span>';
        coin.onclick = function() { addCoin(ct.val); };
        trayEl.appendChild(coin);
      })(coinTypes[i]);
    }
  }

  // 隐藏结果
  var resultEl = document.getElementById('changeResult');
  resultEl.classList.add('hidden');
  resultEl.className = 'change-result hidden';

  document.getElementById('changeConfirmBtn').disabled = true;
}

function addCoin(val) {
  if (mode2Locked) return;
  selectedCoins.push(val);
  updateChangeDisplay();
}

function clearCoins() {
  if (mode2Locked) return;
  selectedCoins = [];
  updateChangeDisplay();
}

function updateChangeDisplay() {
  var total = 0;
  for (var i = 0; i < selectedCoins.length; i++) total += selectedCoins[i];
  total = Math.round(total * 100) / 100;

  var target = currentLevelData.answer;
  var resultEl = document.getElementById('changeResult');
  resultEl.classList.remove('hidden');

  // 显示已选硬币
  var coinText = selectedCoins.length > 0
    ? selectedCoins.map(function(c) {
        if (c >= 1) return c + '元';
        if (c === 0.5) return '5角';
        return '1角';
      }).join(' + ')
    : '还没选硬币';

  if (Math.abs(total - target) < 0.001) {
    resultEl.className = 'change-result exact';
    resultEl.innerHTML = '✅ ' + coinText + ' = ' + formatMoney(total) + ' 元 · 刚好！';
    document.getElementById('changeConfirmBtn').disabled = false;
  } else if (total > target) {
    resultEl.className = 'change-result over';
    resultEl.innerHTML = '⚠️ ' + coinText + ' = ' + formatMoney(total) + ' 元 · 多了！';
    document.getElementById('changeConfirmBtn').disabled = true;
  } else {
    resultEl.className = 'change-result not-enough';
    resultEl.innerHTML = '🪙 已选 ' + coinText + ' = ' + formatMoney(total) + ' 元（还差 ' + formatMoney(target - total) + ' 元）';
    document.getElementById('changeConfirmBtn').disabled = true;
  }
}

function confirmChange() {
  if (mode2Locked) return;
  mode2Locked = true;
  onCorrect();
}

// ============================================================
// 模式3：进货单（位数不同竖式）
// ============================================================

function startMode3() {
  var modeEl = document.getElementById('mode3');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;

  // 进货信息
  var itemsEl = document.getElementById('receiptItems');
  itemsEl.innerHTML =
    '<div class="receipt-item-line">' +
      '<span class="receipt-item-emoji">' + data.emoji + '</span>' +
      '<span>' + data.name1 + '：</span>' +
      '<span class="receipt-item-price">' + data.a + ' 元</span>' +
    '</div>' +
    '<div class="receipt-item-line">' +
      '<span style="font-size:18px;font-weight:bold;margin:0 4px">' + (data.op === '+' ? '＋' : '－') + '</span>' +
      '<span>' + data.name2 + '：</span>' +
      '<span class="receipt-item-price">' + data.b + ' 元</span>' +
    '</div>';

  // 竖式计算展示
  var calcEl = document.getElementById('verticalCalc');
  var aStr = data.a.toString();
  var bStr = data.b.toString();

  // 补0对齐
  var aDec = aStr.split('.');
  var bDec = bStr.split('.');
  var aInt = aDec[0], aFrac = aDec[1] || '';
  var bInt = bDec[0], bFrac = bDec[1] || '';

  // 小数位数对齐
  var maxFrac = Math.max(aFrac.length, bFrac.length);
  var aPad = aFrac;
  var bPad = bFrac;
  var aPadHighlight = false;
  var bPadHighlight = false;

  if (aFrac.length < maxFrac) {
    aPad = aFrac + repeatStr('0', maxFrac - aFrac.length);
    aPadHighlight = true;
  }
  if (bFrac.length < maxFrac) {
    bPad = bFrac + repeatStr('0', maxFrac - bFrac.length);
    bPadHighlight = true;
  }

  // 整数位数对齐
  var maxInt = Math.max(aInt.length, bInt.length);
  aInt = repeatStr(' ', maxInt - aInt.length) + aInt;
  bInt = repeatStr(' ', maxInt - bInt.length) + bInt;

  var aFull = aInt + '.' + aPad;
  var bFull = bInt + '.' + bPad;

  // 构建竖式HTML
  var html = '';

  // 第一行
  html += '<div class="vc-line">' + renderVcLine(aFull, aPadHighlight, maxFrac) + '</div>';

  // 第二行（运算符 + 第二个数）
  var opChar = data.op === '+' ? '＋' : '－';
  html += '<div class="vc-line"><span class="vc-operator">' + opChar + '</span> ' + renderVcLine(bFull, bPadHighlight, maxFrac) + '</div>';

  // 分隔线
  html += '<div class="vc-separator"></div>';

  // 结果行
  html += '<div class="vc-line"><span class="vc-result">  = ?</span></div>';

  calcEl.innerHTML = html;

  // 提示
  if (aPadHighlight || bPadHighlight) {
    document.getElementById('mode3Hint').textContent = '📋 红色下划线的 0 是补上去的，小数点要对齐！';
  } else {
    document.getElementById('mode3Hint').textContent = '📋 对齐小数点，逐位计算';
  }

  // 选项
  var choicesEl = document.getElementById('receiptChoices');
  choicesEl.innerHTML = '';
  var shuffled = data.choices.slice();
  shuffleArray(shuffled);
  for (var i = 0; i < shuffled.length; i++) {
    var btn = document.createElement('button');
    btn.className = 'receipt-choice';
    btn.textContent = formatMoney(shuffled[i]);
    btn.dataset.value = shuffled[i];
    btn.onclick = function() { submitReceipt(this); };
    choicesEl.appendChild(btn);
  }
}

function renderVcLine(full, padHighlight, maxFrac) {
  // full: "12.60" 这样的字符串
  // padHighlight: 需要高亮补0的部分
  var html = '';
  for (var i = 0; i < full.length; i++) {
    var ch = full[i];
    if (ch === '.') {
      html += '<span class="vc-dot">.</span>';
    } else if (padHighlight && i >= full.length - maxFrac && ch === '0') {
      html += '<span class="vc-pad">0</span>';
    } else {
      html += ch;
    }
  }
  return html;
}

function submitReceipt(btnEl) {
  if (mode3Locked) return;
  mode3Locked = true;

  var val = parseFloat(btnEl.dataset.value);
  var btns = document.querySelectorAll('.receipt-choice');
  for (var i = 0; i < btns.length; i++) btns[i].disabled = true;

  if (Math.abs(val - currentLevelData.answer) < 0.001) {
    btnEl.classList.add('correct');
    // 显示结果
    var resultLine = document.querySelector('.vc-line .vc-result');
    if (resultLine) resultLine.textContent = '  = ' + formatMoney(currentLevelData.answer);
    onCorrect();
  } else {
    btnEl.classList.add('wrong');
    for (var j = 0; j < btns.length; j++) {
      if (Math.abs(parseFloat(btns[j].dataset.value) - currentLevelData.answer) < 0.001) {
        btns[j].classList.add('correct');
      }
    }
    onWrong();
  }
}

// ============================================================
// 模式4：特价大挑战（混合运算选择题）
// ============================================================

function startMode4() {
  var modeEl = document.getElementById('mode4');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;

  var banners = ['🔥 限时特惠', '🎉 超级促销', '💰 清仓大甩卖', '🎁 买就划算', '🏷️ 今日特价'];
  document.getElementById('promoBanner').textContent = banners[currentLevel % banners.length];

  document.getElementById('promoQuestion').innerHTML = data.question;

  var choicesEl = document.getElementById('promoChoices');
  choicesEl.innerHTML = '';
  var shuffled = data.choices.slice();
  shuffleArray(shuffled);
  for (var i = 0; i < shuffled.length; i++) {
    var btn = document.createElement('button');
    btn.className = 'promo-choice';
    btn.textContent = formatMoney(shuffled[i]) + ' 元';
    btn.dataset.value = shuffled[i];
    btn.onclick = function() { submitPromo(this); };
    choicesEl.appendChild(btn);
  }
}

function submitPromo(btnEl) {
  if (mode4Locked) return;
  mode4Locked = true;

  var val = parseFloat(btnEl.dataset.value);
  var btns = document.querySelectorAll('.promo-choice');
  for (var i = 0; i < btns.length; i++) btns[i].disabled = true;

  if (Math.abs(val - currentLevelData.answer) < 0.001) {
    btnEl.classList.add('correct');
    onCorrect();
  } else {
    btnEl.classList.add('wrong');
    for (var j = 0; j < btns.length; j++) {
      if (Math.abs(parseFloat(btns[j].dataset.value) - currentLevelData.answer) < 0.001) {
        btns[j].classList.add('correct');
      }
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

  document.getElementById('resultEmoji').textContent = allDone ? '🏆' : '💪';
  document.getElementById('resultTitle').textContent = allDone ? '全部通关！金牌收银员！' : '别灰心，再来一次！';

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

  var chapterNames = { 1:'小数加法', 2:'小数减法', 3:'位数不同的小数加减', 4:'小数混合运算' };
  var chapterTips = {
    1: '小数加法：先把小数点对齐（相同数位对齐），再按整数加法计算，最后在结果里点上小数点。',
    2: '小数减法：同样先对齐小数点。如果被减数位数不够，用0补齐再减。注意退位！',
    3: '位数不同时，在末尾补0使小数位数相同，再对齐小数点计算。例如 3.5 + 1.26 → 3.50 + 1.26',
    4: '混合运算中，能凑整的先凑整！如 5.36 + 4.64 = 10，再算剩下的，又快又准。'
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

function formatMoney(n) {
  return n.toFixed(2);
}

function repeatStr(s, n) {
  var r = '';
  for (var i = 0; i < n; i++) r += s;
  return r;
}

initStars();
