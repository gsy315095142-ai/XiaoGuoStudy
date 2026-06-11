/**
 * 馃彧 灏忔暟渚垮埄搴?- 绗叚鍗曞厓锛氬皬鏁扮殑鍔犳硶鍜屽噺娉? *
 * 鍥涗釜绔犺妭锛? *   1. 鏀堕摱鍙?   鈥?灏忔暟鍔犳硶锛堜袱浠跺晢鍝佺畻鎬讳环锛? *   2. 鎵鹃浂閽?   鈥?灏忔暟鍑忔硶锛堥【瀹粯閽憋紝閫夌‖甯佹壘闆讹級
 *   3. 杩涜揣鍗?   鈥?浣嶆暟涓嶅悓鐨勫皬鏁板姞鍑忥紙绔栧紡灞曠ず锛岃ˉ0瀵归綈锛? *   4. 鐗逛环澶ф寫鎴?鈥?娣峰悎杩愮畻 + 绠€渚胯绠? */

// ============================================================
// 鍏冲崱鏁版嵁
// ============================================================

var LEVELS = {

  // ===== 绗竴绔狅細鏀堕摱鍙帮紙灏忔暟鍔犳硶锛?====
  // items: [{emoji, name, price}]  answer: 鎬讳环  choices: 閫夐」
  1: [
    {
      items: [
        { emoji: '馃崼', name: '宸у厠鍔?, price: 3.50 },
        { emoji: '馃イ', name: '鏋滄眮', price: 2.80 }
      ],
      answer: 6.30,
      choices: [6.30, 5.80, 6.13],
      hint: '3.50 + 2.80 = ?'
    },
    {
      items: [
        { emoji: '馃崬', name: '闈㈠寘', price: 4.25 },
        { emoji: '馃', name: '鐗涘ザ', price: 3.60 }
      ],
      answer: 7.85,
      choices: [7.85, 7.75, 8.25],
      hint: '4.25 + 3.60 = ?'
    },
    {
      items: [
        { emoji: '馃枈锔?, name: '閽㈢瑪', price: 8.90 },
        { emoji: '馃摀', name: '绗旇鏈?, price: 5.45 }
      ],
      answer: 14.35,
      choices: [14.35, 13.35, 14.25],
      hint: '8.90 + 5.45 = ? 娉ㄦ剰杩涗綅锛?
    },
    {
      items: [
        { emoji: '馃崐', name: '姗欏瓙', price: 6.75 },
        { emoji: '馃崕', name: '鑻规灉', price: 4.38 }
      ],
      answer: 11.13,
      choices: [11.13, 10.13, 11.23],
      hint: '6.75 + 4.38 = ? 鐧惧垎浣嶄篃瑕佸姞锛?
    },
    {
      items: [
        { emoji: '馃帹', name: '姘村僵绗?, price: 12.80 },
        { emoji: '鉁傦笍', name: '鍓垁', price: 7.65 }
      ],
      answer: 20.45,
      choices: [20.45, 19.45, 20.55],
      hint: '12.80 + 7.65 = ?'
    },
    {
      items: [
        { emoji: '馃摎', name: '鏁呬簨涔?, price: 15.60 },
        { emoji: '馃Ц', name: '灏忕唺', price: 9.85 }
      ],
      answer: 25.45,
      choices: [25.45, 24.45, 25.55],
      hint: '15.60 + 9.85 = ?'
    }
  ],

  // ===== 绗簩绔狅細鎵鹃浂閽憋紙灏忔暟鍑忔硶锛?====
  // item: 鍟嗗搧  price: 浠锋牸  paid: 椤惧浠樼殑閽? answer: 鎵鹃浂
  2: [
    {
      emoji: '馃嵖', name: '鐖嗙背鑺?, price: 6.50,
      paid: 10,
      answer: 3.50,
      hint: '10 - 6.50 = ?'
    },
    {
      emoji: '馃崷', name: '鍐版穱娣?, price: 4.25,
      paid: 10,
      answer: 5.75,
      hint: '10 - 4.25 = ?'
    },
    {
      emoji: '馃巶', name: '铔嬬硶', price: 8.60,
      paid: 20,
      answer: 11.40,
      hint: '20 - 8.60 = ?'
    },
    {
      emoji: '馃帓', name: '涔﹀寘', price: 35.80,
      paid: 50,
      answer: 14.20,
      hint: '50 - 35.80 = ?'
    },
    {
      emoji: '鈿?, name: '瓒崇悆', price: 28.50,
      paid: 50,
      answer: 21.50,
      hint: '50 - 28.50 = ?'
    },
    {
      emoji: '馃幉', name: '妗屾父', price: 42.75,
      paid: 100,
      answer: 57.25,
      hint: '100 - 42.75 = ?'
    }
  ],

  // ===== 绗笁绔狅細杩涜揣鍗曪紙浣嶆暟涓嶅悓鐨勫皬鏁板姞鍑忥級
  // op: '+' 鎴?'-'  a, b: 涓や釜鏁? answer  choices
  // verticalLines: 绔栧紡灞曠ず鐨勮锛堝惈琛?鎻愮ず锛?  3: [
    {
      emoji: '鉁忥笍', name1: '閾呯瑪', name2: '姗＄毊',
      op: '+', a: 3.5, b: 1.26,
      answer: 4.76,
      choices: [4.76, 4.85, 3.76],
      hint: '浣嶆暟涓嶅悓锛?.5 瑕佽ˉ鎴?3.50 鍐嶅姞'
    },
    {
      emoji: '馃搹', name1: '鐩村昂', name2: '鑳舵',
      op: '+', a: 2.8, b: 4.56,
      answer: 7.36,
      choices: [7.36, 6.36, 7.46],
      hint: '2.8 琛ユ垚 2.80 鍐嶈绠?
    },
    {
      emoji: '馃枍锔?, name1: '铚＄瑪', name2: '璐寸焊',
      op: '-', a: 5.4, b: 2.18,
      answer: 3.22,
      choices: [3.22, 3.32, 2.22],
      hint: '5.4 琛ユ垚 5.40 鍐嶅噺'
    },
    {
      emoji: '馃摃', name1: '瀛楀吀', name2: '涔︾',
      op: '-', a: 12.6, b: 3.85,
      answer: 8.75,
      choices: [8.75, 8.85, 9.75],
      hint: '12.6 琛ユ垚 12.60 鍐嶅噺'
    },
    {
      emoji: '馃帹', name1: '棰滄枡', name2: '鐢荤瑪',
      op: '+', a: 6.5, b: 8.73,
      answer: 15.23,
      choices: [15.23, 14.23, 15.33],
      hint: '6.5 琛ユ垚 6.50 鍐嶅姞锛屾敞鎰忚繘浣?
    }
  ],

  // ===== 绗洓绔狅細鐗逛环澶ф寫鎴橈紙娣峰悎杩愮畻 + 绠€渚胯绠楋級
  // question: HTML棰樼洰  answer  choices
  4: [
    {
      question: '钖墖鍘熶环 <span class="pq-price">12.80鍏?/span>锛岀幇鍦ㄧ壒浠?<span class="pq-save">9.90鍏?/span><br>渚垮疁浜嗗灏戦挶锛?,
      answer: 2.90,
      choices: [2.90, 3.10, 2.80]
    },
    {
      question: '涔颁簡涓夋牱涓滆タ锛?br><span class="pq-price">5.36鍏?/span> + <span class="pq-price">2.78鍏?/span> + <span class="pq-price">4.64鍏?/span><br>涓€鍏卞灏戦挶锛燂紙璇曡瘯鍑戞暣锛侊級',
      answer: 12.78,
      choices: [12.78, 11.78, 12.88]
    },
    {
      question: '灏忔槑鏈?<span class="pq-price">20鍏?/span>锛屼拱浜?<span class="pq-price">6.80鍏?/span> 鐨勭瑪鍜?<span class="pq-price">5.50鍏?/span> 鐨勬湰瀛?br>杩樺墿澶氬皯閽憋紵',
      answer: 7.70,
      choices: [7.70, 7.80, 8.70]
    },
    {
      question: '涔板洓鏍烽浂椋燂細<br><span class="pq-price">3.45鍏?/span> + <span class="pq-price">6.55鍏?/span> + <span class="pq-price">2.18鍏?/span> + <span class="pq-price">7.82鍏?/span><br>涓€鍏卞灏戦挶锛燂紙鑳藉噾鏁寸殑涓ゅ锛侊級',
      answer: 20.00,
      choices: [20.00, 19.00, 18.00]
    },
    {
      question: '涔﹀寘 <span class="pq-price">45.60鍏?/span>锛屾枃鍏风洅 <span class="pq-price">18.75鍏?/span><br>濡堝浠樹簡 <span class="pq-price">100鍏?/span>锛屽簲鎵惧洖澶氬皯閽憋紵',
      answer: 35.65,
      choices: [35.65, 34.65, 36.35]
    },
    {
      question: '鏄ㄥぉ涔颁簡 <span class="pq-price">15.80鍏?/span> 鐨勪笢瑗?br>浠婂ぉ鍙堜拱浜?<span class="pq-price">23.40鍏?/span> 鐨勪笢瑗?br>涓ゅぉ涓€鍏辫姳浜嗗灏戦挶锛?,
      answer: 39.20,
      choices: [39.20, 38.20, 39.30]
    }
  ]
};

// ============================================================
// 娓告垙鐘舵€?// ============================================================

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

// 妯″紡1閿佸畾
var mode1Locked = false;
// 妯″紡2锛氬凡閫夌‖甯?var selectedCoins = [];
var mode2Locked = false;
// 妯″紡3閿佸畾
var mode3Locked = false;
// 妯″紡4閿佸畾
var mode4Locked = false;

// ============================================================
// 绔犺妭閫夋嫨
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
// 寮€濮嬪叧鍗?// ============================================================

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

  document.getElementById('levelInfo').textContent = '绗?' + (currentLevel + 1) + ' 鍏?;
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
// 閫氱敤锛氱瓟瀵?/ 绛旈敊
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
  showToast('鉁?, '绛斿浜嗭紒' + (combo >= 3 ? '馃敟' + combo + '杩炲嚮锛? : ''), 1200);
  setTimeout(function() { currentLevel++; startLevel(); }, 1400);
}

function onWrong() {
  combo = 0;
  wrongCount++;
  hp = Math.max(0, hp - 1);
  updateHUD();
  if (hp <= 0) {
    showToast('馃挃', '琛€閲忕敤瀹屼簡鈥?, 1500);
    setTimeout(function() { showResult(); }, 1600);
  } else {
    showToast('鉂?, '鍐嶆兂鎯筹紒杩樺墿 ' + hp + ' 棰楀績', 1200);
  }
}

// ============================================================
// 妯″紡1锛氭敹閾跺彴锛堝皬鏁板姞娉?- 閫夋€讳环锛?// ============================================================

function startMode1() {
  var modeEl = document.getElementById('mode1');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;

  // 娓叉煋鍟嗗搧鍗＄墖
  var rowEl = document.getElementById('productRow');
  rowEl.innerHTML = '';

  for (var i = 0; i < data.items.length; i++) {
    var item = data.items[i];
    var card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML =
      '<div class="product-emoji">' + item.emoji + '</div>' +
      '<div class="product-name">' + item.name + '</div>' +
      '<div class="product-price">' + item.price.toFixed(2) + ' 鍏?/div>';
    rowEl.appendChild(card);

    // 鍔犲彿
    if (i < data.items.length - 1) {
      var plus = document.createElement('div');
      plus.className = 'product-plus';
      plus.textContent = '+';
      rowEl.appendChild(plus);
    }
  }

  // 鏀堕摱鏈烘樉绀?  document.getElementById('totalValue').textContent = '? 鍏?;

  // 閫夐」
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
    document.getElementById('totalValue').textContent = formatMoney(currentLevelData.answer) + ' 鍏?;
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
// 妯″紡2锛氭壘闆堕挶锛堝皬鏁板噺娉?- 閫夌‖甯佹壘闆讹級
// ============================================================

function startMode2() {
  var modeEl = document.getElementById('mode2');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;
  selectedCoins = [];

  // 鍟嗗搧淇℃伅
  var infoEl = document.getElementById('changeInfo');
  infoEl.innerHTML =
    data.emoji + ' ' + data.name + '锛?span class="highlight">' + formatMoney(data.price) + ' 鍏?/span><br>' +
    '椤惧浠樹簡锛?span class="highlight">' + formatMoney(data.paid) + ' 鍏?/span>';

  // 鐩爣鎵鹃浂
  var targetEl = document.getElementById('changeTarget');
  targetEl.textContent = '馃幆 闇€瑕佹壘闆讹細' + formatMoney(data.answer) + ' 鍏?;

  // 纭竵鎵樼洏
  var trayEl = document.getElementById('coinTray');
  trayEl.innerHTML = '';

  var coinTypes = [
    { val: 5, cls: 'coin-5yuan', label: '5鍏? },
    { val: 1, cls: 'coin-1yuan', label: '1鍏? },
    { val: 0.5, cls: 'coin-5jiao', label: '5瑙? },
    { val: 0.1, cls: 'coin-1jiao', label: '1瑙? }
  ];

  for (var i = 0; i < coinTypes.length; i++) {
    // 姣忕纭竵鏀?涓?    for (var k = 0; k < 3; k++) {
      (function(ct) {
        var coin = document.createElement('div');
        coin.className = 'coin ' + ct.cls;
        coin.innerHTML = '<span class="coin-symbol">楼</span><span class="coin-val">' + ct.label + '</span>';
        coin.onclick = function() { addCoin(ct.val); };
        trayEl.appendChild(coin);
      })(coinTypes[i]);
    }
  }

  // 闅愯棌缁撴灉
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

  // 鏄剧ず宸查€夌‖甯?  var coinText = selectedCoins.length > 0
    ? selectedCoins.map(function(c) {
        if (c >= 1) return c + '鍏?;
        if (c === 0.5) return '5瑙?;
        return '1瑙?;
      }).join(' + ')
    : '杩樻病閫夌‖甯?;

  if (Math.abs(total - target) < 0.001) {
    resultEl.className = 'change-result exact';
    resultEl.innerHTML = '鉁?' + coinText + ' = ' + formatMoney(total) + ' 鍏?路 鍒氬ソ锛?;
    document.getElementById('changeConfirmBtn').disabled = false;
  } else if (total > target) {
    resultEl.className = 'change-result over';
    resultEl.innerHTML = '鈿狅笍 ' + coinText + ' = ' + formatMoney(total) + ' 鍏?路 澶氫簡锛?;
    document.getElementById('changeConfirmBtn').disabled = true;
  } else {
    resultEl.className = 'change-result not-enough';
    resultEl.innerHTML = '馃獧 宸查€?' + coinText + ' = ' + formatMoney(total) + ' 鍏冿紙杩樺樊 ' + formatMoney(target - total) + ' 鍏冿級';
    document.getElementById('changeConfirmBtn').disabled = true;
  }
}

function confirmChange() {
  if (mode2Locked) return;
  mode2Locked = true;
  onCorrect();
}

// 【修复 #3】跳过当前找零题
function skipChange() {
  if (mode2Locked) return;
  mode2Locked = true;
  onWrong();
  showToast('⏭️', '已跳过！正确答案是 ' + formatMoney(currentLevelData.answer) + ' 元', 1500);
  setTimeout(function() {
    currentLevel++;
    startLevel();
  }, 1600);
}

// ============================================================
// 妯″紡3锛氳繘璐у崟锛堜綅鏁颁笉鍚岀珫寮忥級
// ============================================================

function startMode3() {
  var modeEl = document.getElementById('mode3');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;

  // 杩涜揣淇℃伅
  var itemsEl = document.getElementById('receiptItems');
  itemsEl.innerHTML =
    '<div class="receipt-item-line">' +
      '<span class="receipt-item-emoji">' + data.emoji + '</span>' +
      '<span>' + data.name1 + '锛?/span>' +
      '<span class="receipt-item-price">' + data.a + ' 鍏?/span>' +
    '</div>' +
    '<div class="receipt-item-line">' +
      '<span style="font-size:18px;font-weight:bold;margin:0 4px">' + (data.op === '+' ? '锛? : '锛?) + '</span>' +
      '<span>' + data.name2 + '锛?/span>' +
      '<span class="receipt-item-price">' + data.b + ' 鍏?/span>' +
    '</div>';

  // 绔栧紡璁＄畻灞曠ず
  var calcEl = document.getElementById('verticalCalc');
  var aStr = data.a.toString();
  var bStr = data.b.toString();

  // 琛?瀵归綈
  var aDec = aStr.split('.');
  var bDec = bStr.split('.');
  var aInt = aDec[0], aFrac = aDec[1] || '';
  var bInt = bDec[0], bFrac = bDec[1] || '';

  // 灏忔暟浣嶆暟瀵归綈
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

  // 鏁存暟浣嶆暟瀵归綈
  var maxInt = Math.max(aInt.length, bInt.length);
  aInt = repeatStr(' ', maxInt - aInt.length) + aInt;
  bInt = repeatStr(' ', maxInt - bInt.length) + bInt;

  var aFull = aInt + '.' + aPad;
  var bFull = bInt + '.' + bPad;

  // 鏋勫缓绔栧紡HTML
  var html = '';

  // 绗竴琛?  html += '<div class="vc-line">' + renderVcLine(aFull, aPadHighlight, maxFrac) + '</div>';

  // 绗簩琛岋紙杩愮畻绗?+ 绗簩涓暟锛?  var opChar = data.op === '+' ? '锛? : '锛?;
  html += '<div class="vc-line"><span class="vc-operator">' + opChar + '</span> ' + renderVcLine(bFull, bPadHighlight, maxFrac) + '</div>';

  // 鍒嗛殧绾?  html += '<div class="vc-separator"></div>';

  // 缁撴灉琛?  html += '<div class="vc-line"><span class="vc-result">  = ?</span></div>';

  calcEl.innerHTML = html;

  // 鎻愮ず
  if (aPadHighlight || bPadHighlight) {
    document.getElementById('mode3Hint').textContent = '馃搵 绾㈣壊涓嬪垝绾跨殑 0 鏄ˉ涓婂幓鐨勶紝灏忔暟鐐硅瀵归綈锛?;
  } else {
    document.getElementById('mode3Hint').textContent = '馃搵 瀵归綈灏忔暟鐐癸紝閫愪綅璁＄畻';
  }

  // 閫夐」
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
  // full: "12.60" 杩欐牱鐨勫瓧绗︿覆
  // padHighlight: 闇€瑕侀珮浜ˉ0鐨勯儴鍒?  var html = '';
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
    // 鏄剧ず缁撴灉
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
// 妯″紡4锛氱壒浠峰ぇ鎸戞垬锛堟贩鍚堣繍绠楅€夋嫨棰橈級
// ============================================================

function startMode4() {
  var modeEl = document.getElementById('mode4');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;

  var banners = ['馃敟 闄愭椂鐗规儬', '馃帀 瓒呯骇淇冮攢', '馃挵 娓呬粨澶х敥鍗?, '馃巵 涔板氨鍒掔畻', '馃彿锔?浠婃棩鐗逛环'];
  document.getElementById('promoBanner').textContent = banners[currentLevel % banners.length];

  document.getElementById('promoQuestion').innerHTML = data.question;

  var choicesEl = document.getElementById('promoChoices');
  choicesEl.innerHTML = '';
  var shuffled = data.choices.slice();
  shuffleArray(shuffled);
  for (var i = 0; i < shuffled.length; i++) {
    var btn = document.createElement('button');
    btn.className = 'promo-choice';
    btn.textContent = formatMoney(shuffled[i]) + ' 鍏?;
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
// HUD / 杩涘害
// ============================================================

function updateHUD() {
  var hearts = '';
  for (var i = 0; i < hpMax; i++) {
    hearts += '<span' + (i < hp ? '' : ' style="opacity:0.3"') + '>鉂わ笍</span>';
  }
  document.getElementById('heartsDisplay').innerHTML = hearts;
  document.getElementById('scoreDisplay').textContent = score;
  document.getElementById('comboDisplay').textContent = combo >= 2 ? '馃敟' + combo + '杩炲嚮' : '';
}

function updateProgress() {
  var levels = LEVELS[currentChapter];
  var pct = (currentLevel / levels.length) * 100;
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('progressText').textContent = (currentLevel + 1) + '/' + levels.length;
}

// ============================================================
// 缁撴灉鐢婚潰
// ============================================================

function showResult() {
  document.getElementById('gameScreen').classList.add('hidden');
  document.getElementById('resultScreen').classList.remove('hidden');

  var levels = LEVELS[currentChapter];
  var allDone = currentLevel >= levels.length;

  document.getElementById('resultEmoji').textContent = allDone ? '馃弳' : '馃挭';
  document.getElementById('resultTitle').textContent = allDone ? '鍏ㄩ儴閫氬叧锛侀噾鐗屾敹閾跺憳锛? : '鍒伆蹇冿紝鍐嶆潵涓€娆★紒';

  var earnedStars = allDone ? 15 + hp * 3 : Math.max(0, currentLevel * 2 + hp);
  if (earnedStars > 0) addStars(earnedStars);

  var rate = (correctCount + wrongCount) > 0
    ? Math.round(correctCount / (correctCount + wrongCount) * 100) : 0;

  var statsHtml = '';
  statsHtml += '<div class="stat-row"><span>馃弳 寰楀垎锛?/span><strong>' + score + '</strong></div>';
  statsHtml += '<div class="stat-row"><span>鉂わ笍 鍓╀綑琛€閲忥細</span><strong>' + hp + '/' + hpMax + '</strong></div>';
  statsHtml += '<div class="stat-row"><span>馃敟 鏈€楂樿繛鍑伙細</span><strong>' + maxCombo + '</strong></div>';
  statsHtml += '<div class="stat-row"><span>鉁?姝ｇ‘鐜囷細</span><strong>' + rate + '%</strong></div>';
  statsHtml += '<div class="stat-row"><span>猸?鑾峰緱鏄熸槦锛?/span><strong>猸?' + earnedStars + '</strong></div>';

  var chapterNames = { 1:'灏忔暟鍔犳硶', 2:'灏忔暟鍑忔硶', 3:'浣嶆暟涓嶅悓鐨勫皬鏁板姞鍑?, 4:'灏忔暟娣峰悎杩愮畻' };
  var chapterTips = {
    1: '灏忔暟鍔犳硶锛氬厛鎶婂皬鏁扮偣瀵归綈锛堢浉鍚屾暟浣嶅榻愶級锛屽啀鎸夋暣鏁板姞娉曡绠楋紝鏈€鍚庡湪缁撴灉閲岀偣涓婂皬鏁扮偣銆?,
    2: '灏忔暟鍑忔硶锛氬悓鏍峰厛瀵归綈灏忔暟鐐广€傚鏋滆鍑忔暟浣嶆暟涓嶅锛岀敤0琛ラ綈鍐嶅噺銆傛敞鎰忛€€浣嶏紒',
    3: '浣嶆暟涓嶅悓鏃讹紝鍦ㄦ湯灏捐ˉ0浣垮皬鏁颁綅鏁扮浉鍚岋紝鍐嶅榻愬皬鏁扮偣璁＄畻銆備緥濡?3.5 + 1.26 鈫?3.50 + 1.26',
    4: '娣峰悎杩愮畻涓紝鑳藉噾鏁寸殑鍏堝噾鏁达紒濡?5.36 + 4.64 = 10锛屽啀绠楀墿涓嬬殑锛屽張蹇張鍑嗐€?
  };
  statsHtml += '<div class="knowledge-card">';
  statsHtml += '<h3>馃摎 鏈叧鐭ヨ瘑鐐癸細' + chapterNames[currentChapter] + '</h3>';
  statsHtml += '<p>馃挕 ' + chapterTips[currentChapter] + '</p>';
  statsHtml += '</div>';

  document.getElementById('resultStats').innerHTML = statsHtml;
  initStars();
}

// ============================================================
// 閲嶆柊寮€濮?// ============================================================

function restartGame() {
  score = 0; combo = 0; maxCombo = 0; hp = 3;
  correctCount = 0; wrongCount = 0; currentLevel = 0;

  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('startScreen').classList.remove('hidden');
}

// ============================================================
// 宸ュ叿鍑芥暟
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

