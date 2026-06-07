/**
 * 气球大作战 - 第一单元：四则运算
 * 出题引擎 + 游戏逻辑
 */

// ========== 难度选择 ==========
var difficulty = 1;
document.querySelectorAll('.diff-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.diff-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    difficulty = parseInt(btn.dataset.diff);
  });
});

// ========== 游戏状态 ==========
var score = 0;
var combo = 0;
var maxCombo = 0;
var correctCount = 0;
var wrongCount = 0;
var timeLeft = 60;
var timerInterval = null;
var currentQuestion = null;
var balloonsActive = false;
var questionTimeout = null;

// ========== 气球颜色库 ==========
var balloonColors = [
  '#FF6B6B', '#FF9F43', '#FFD93D', '#6BCB77',
  '#7EC8E3', '#C77DFF', '#FF6B9D', '#4ECDC4',
  '#45B7D1', '#F7DC6F', '#BB8FCE', '#76D7C4'
];

// ========== 气球SVG模板 ==========
function balloonSVG(color) {
  return '<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">' +
    '<ellipse cx="50" cy="45" rx="38" ry="45" fill="' + color + '"/>' +
    '<ellipse cx="40" cy="32" rx="12" ry="18" fill="rgba(255,255,255,0.25)" transform="rotate(-15, 40, 32)"/>' +
    '<polygon points="44,88 56,88 50,98" fill="' + color + '"/>' +
    '<line x1="50" y1="98" x2="50" y2="120" stroke="#888" stroke-width="1.5"/>' +
    '</svg>';
}

// ========================================================
// 出题引擎
// ========================================================

/**
 * 生成一道题
 * 题型：
 *   type: 'calc'     - 混合运算求结果
 *   type: 'order'    - 运算顺序判断（选择第一步算什么）
 *   type: 'zero'     - 0的特性判断（对/错）
 *   type: 'inverse'  - 逆运算填空
 */
function generateQuestion() {
  var types;
  if (difficulty === 1) {
    types = ['calc', 'calc', 'order', 'zero'];
  } else if (difficulty === 2) {
    types = ['calc', 'calc', 'order', 'zero', 'inverse'];
  } else {
    types = ['calc', 'calc', 'calc', 'order', 'inverse', 'inverse'];
  }
  var type = types[Math.floor(Math.random() * types.length)];

  switch (type) {
    case 'calc': return genCalcQuestion();
    case 'order': return genOrderQuestion();
    case 'zero': return genZeroQuestion();
    case 'inverse': return genInverseQuestion();
  }
}

// --- 辅助函数 ---
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

// --- 混合运算计算题 ---
function genCalcQuestion() {
  var expr, answer, steps;

  if (difficulty === 1) {
    // 简单：两步运算，无括号
    var templates = [
      function() {
        var a = randInt(10, 50), b = randInt(2, 9), c = randInt(1, 30);
        return { expr: a + ' + ' + b + ' × ' + c, answer: a + b * c, steps: '先算 ' + b + '×' + c + '=' + (b*c) + '，再算 ' + a + '+' + (b*c) + '=' + (a+b*c) };
      },
      function() {
        var a = randInt(20, 80), b = randInt(2, 8), c = randInt(1, 20);
        return { expr: a + ' - ' + b + ' × ' + c, answer: a - b * c, steps: '先算 ' + b + '×' + c + '=' + (b*c) + '，再算 ' + a + '-' + (b*c) + '=' + (a-b*c) };
      },
      function() {
        var a = randInt(2, 12), b = randInt(2, 9), c = randInt(2, 9);
        return { expr: a + ' × ' + b + ' + ' + c, answer: a * b + c, steps: '先算 ' + a + '×' + b + '=' + (a*b) + '，再算 ' + (a*b) + '+' + c + '=' + (a*b+c) };
      },
      function() {
        var b = randInt(2, 9), c = randInt(2, 9), a = randInt(2, 12);
        return { expr: b + ' × ' + c + ' - ' + a, answer: b * c - a, steps: '先算 ' + b + '×' + c + '=' + (b*c) + '，再算 ' + (b*c) + '-' + a + '=' + (b*c-a) };
      }
    ];
    var t = templates[Math.floor(Math.random() * templates.length)]();

    // 确保答案非负
    if (t.answer < 0) return genCalcQuestion();

    expr = t.expr;
    answer = t.answer;
    steps = t.steps;

  } else if (difficulty === 2) {
    // 中等：含小括号
    var a = randInt(10, 40), b = randInt(5, 30), c = randInt(2, 8);
    var ops = [
      function() { return { expr: '(' + a + ' + ' + b + ') × ' + c, answer: (a+b)*c, steps: '先算 (' + a + '+' + b + ')=' + (a+b) + '，再算 ' + (a+b) + '×' + c + '=' + ((a+b)*c) }; },
      function() { return { expr: '(' + a + ' - ' + b + ') × ' + c, answer: (a-b)*c, steps: '先算 (' + a + '-' + b + ')=' + (a-b) + '，再算 ' + (a-b) + '×' + c + '=' + ((a-b)*c) }; },
      function() { return { expr: a + ' × (' + b + ' + ' + c + ')', answer: a*(b+c), steps: '先算 (' + b + '+' + c + ')=' + (b+c) + '，再算 ' + a + '×' + (b+c) + '=' + (a*(b+c)) }; }
    ];
    var t2 = ops[Math.floor(Math.random() * ops.length)]();
    if (t2.answer < 0) return genCalcQuestion();
    expr = t2.expr; answer = t2.answer; steps = t2.steps;

  } else {
    // 困难：三步运算
    var a2 = randInt(2, 8), b2 = randInt(2, 8), c2 = randInt(2, 8), d2 = randInt(5, 20);
    var ops2 = [
      function() { return { expr: a2 + ' × ' + b2 + ' + ' + c2 + ' × ' + d2, answer: a2*b2 + c2*d2, steps: '先算 ' + a2 + '×' + b2 + '=' + (a2*b2) + ' 和 ' + c2 + '×' + d2 + '=' + (c2*d2) + '，再加' }; },
      function() { return { expr: '(' + a2 + ' + ' + b2 + ') × ' + c2 + ' - ' + d2, answer: (a2+b2)*c2 - d2, steps: '先算 (' + a2 + '+' + b2 + ')=' + (a2+b2) + '，再算 ' + (a2+b2) + '×' + c2 + '=' + ((a2+b2)*c2) + '，最后减' + d2 }; },
      function() { return { expr: a2 + ' × ' + b2 + ' - (' + c2 + ' + ' + d2 + ')', answer: a2*b2 - c2 - d2, steps: '先算 ' + a2 + '×' + b2 + '=' + (a2*b2) + ' 和 (' + c2 + '+' + d2 + ')=' + (c2+d2) + '，再相减' }; }
    ];
    var t3 = ops2[Math.floor(Math.random() * ops2.length)]();
    if (t3.answer < 0) return genCalcQuestion();
    expr = t3.expr; answer = t3.answer; steps = t3.steps;
  }

  // 生成4个选项（包含正确答案）
  var options = [answer];
  while (options.length < 4) {
    var offset = randInt(1, Math.max(5, Math.abs(answer) > 0 ? Math.floor(Math.abs(answer) * 0.3) : 5));
    var fake = answer + (Math.random() > 0.5 ? offset : -offset);
    if (fake !== answer && options.indexOf(fake) === -1 && fake >= 0) {
      options.push(fake);
    }
  }
  shuffle(options);

  return {
    type: 'calc',
    text: expr + ' = ?',
    hint: '点击正确答案的气球',
    options: options,
    answer: answer,
    steps: steps
  };
}

// --- 运算顺序判断题 ---
function genOrderQuestion() {
  var a = randInt(10, 30), b = randInt(2, 8), c = randInt(2, 8), d = randInt(5, 20);
  var questions = [
    {
      expr: a + ' + ' + b + ' × ' + c,
      firstStep: b + ' × ' + c,
      wrongSteps: [a + ' + ' + b, c + ' × ' + String(a), String(a) + ' + ' + c]
    },
    {
      expr: a + ' - ' + b + ' × ' + c,
      firstStep: b + ' × ' + c,
      wrongSteps: [a + ' - ' + b, c + ' × ' + String(a), String(a) + ' - ' + c]
    },
    {
      expr: b + ' × ' + c + ' + ' + d,
      firstStep: b + ' × ' + c,
      wrongSteps: [c + ' + ' + d, b + ' × ' + d, String(b) + ' + ' + d]
    },
    {
      expr: a + ' × ' + b + ' - ' + d,
      firstStep: a + ' × ' + b,
      wrongSteps: [b + ' - ' + d, a + ' × ' + d, String(a) + ' - ' + d]
    }
  ];

  var q = questions[Math.floor(Math.random() * questions.length)];
  var options = [q.firstStep];
  q.wrongSteps.forEach(function(s) {
    if (options.indexOf(s) === -1) options.push(s);
  });
  // 确保有4个选项
  while (options.length < 4) {
    options.push(String(randInt(1, 50)));
  }
  options = options.slice(0, 4);
  shuffle(options);

  return {
    type: 'order',
    text: '💡 ' + q.expr + '  第一步应该算什么？',
    hint: '想一想运算顺序：先乘除，后加减，有括号先算括号',
    options: options,
    answer: q.firstStep,
    steps: '正确顺序：先算 ' + q.firstStep + '，这是乘法/除法，要优先算'
  };
}

// --- 0的特性判断题 ---
function genZeroQuestion() {
  var questions = [
    { text: '0 + 5 = 5', correct: true },
    { text: '0 × 8 = 0', correct: true },
    { text: '0 ÷ 3 = 0', correct: true },
    { text: '5 + 0 = 5', correct: true },
    { text: '8 × 0 = 0', correct: true },
    { text: '0 ÷ 5 = 0', correct: true },
    { text: '5 × 0 = 5', correct: false },
    { text: '0 ÷ 0 = 0', correct: false },
    { text: '5 ÷ 0 = 0', correct: false },
    { text: '0 + 3 = 0', correct: false },
    { text: '0 × 7 = 7', correct: false },
    { text: '3 ÷ 0 = 3', correct: false }
  ];

  var q = questions[Math.floor(Math.random() * questions.length)];

  return {
    type: 'zero',
    text: '🤔 ' + q.text + '  对不对？',
    hint: q.correct ? '想想0加任何数等于…' : '小心哦，0不能做除数！',
    options: ['✅ 对的', '❌ 错的'],
    answer: q.correct ? '✅ 对的' : '❌ 错的',
    steps: q.correct
      ? '正确！' + q.text + ' 是对的'
      : '不对哦！' + (q.text.indexOf('÷ 0') !== -1
        ? '0不能做除数！'
        : q.text.replace('=', '≠') + ' 才对')
  };
}

// --- 逆运算填空题 ---
function genInverseQuestion() {
  var a = randInt(10, 99), b = randInt(10, 99);
  var s = a + b;
  var questions = [
    {
      text: s + ' - ? = ' + a,
      answer: b,
      steps: s + ' - ' + a + ' = ' + b + '（减法是加法的逆运算）'
    },
    {
      text: s + ' - ? = ' + b,
      answer: a,
      steps: s + ' - ' + b + ' = ' + a + '（减法是加法的逆运算）'
    }
  ];

  // 乘除法
  var c = randInt(2, 9), d = randInt(2, 9);
  var p = c * d;
  questions.push(
    {
      text: p + ' ÷ ? = ' + d,
      answer: c,
      steps: p + ' ÷ ' + d + ' = ' + c + '（除法是乘法的逆运算）'
    },
    {
      text: p + ' ÷ ? = ' + c,
      answer: d,
      steps: p + ' ÷ ' + c + ' = ' + d + '（除法是乘法的逆运算）'
    }
  );

  var q = questions[Math.floor(Math.random() * questions.length)];

  var options = [q.answer];
  while (options.length < 4) {
    var fake = q.answer + randInt(1, 10) * (Math.random() > 0.5 ? 1 : -1);
    if (fake !== q.answer && fake > 0 && options.indexOf(fake) === -1) {
      options.push(fake);
    }
  }
  shuffle(options);

  return {
    type: 'inverse',
    text: '🔗 ' + q.text,
    hint: '想一想逆运算的关系',
    options: options.map(String),
    answer: String(q.answer),
    steps: q.steps
  };
}


// ========================================================
// 游戏流程控制
// ========================================================

function startGame() {
  score = 0;
  combo = 0;
  maxCombo = 0;
  correctCount = 0;
  wrongCount = 0;
  timeLeft = 60;
  balloonsActive = true;

  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');

  updateHUD();
  startTimer();
  nextQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(function() {
    timeLeft--;
    document.getElementById('timerDisplay').textContent = timeLeft;
    if (timeLeft <= 10) {
      document.querySelector('.hud-timer').classList.add('warning');
    }
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function updateHUD() {
  document.getElementById('scoreDisplay').textContent = score;
  document.getElementById('timerDisplay').textContent = timeLeft;

  var comboEl = document.getElementById('comboDisplay');
  if (combo >= 2) {
    comboEl.textContent = '🔥 ' + combo + ' 连击！';
    comboEl.classList.add('pop');
    setTimeout(function() { comboEl.classList.remove('pop'); }, 200);
  } else {
    comboEl.textContent = '';
  }
}

function nextQuestion() {
  if (!balloonsActive) return;

  currentQuestion = generateQuestion();

  // 更新题目
  document.getElementById('questionText').textContent = currentQuestion.text;
  document.getElementById('questionHint').textContent = currentQuestion.hint;

  // 重新触发题目动画
  var qEl = document.getElementById('questionText');
  qEl.style.animation = 'none';
  qEl.offsetHeight; // 触发reflow
  qEl.style.animation = 'questionIn 0.3s ease-out';

  // 生成气球
  spawnBalloons(currentQuestion.options, currentQuestion.answer);
}

function spawnBalloons(options, correctAnswer) {
  var field = document.getElementById('balloonField');
  field.innerHTML = '';

  var fieldWidth = field.offsetWidth;
  var count = options.length;
  var balloonWidth = 110;
  var totalWidth = count * balloonWidth + (count - 1) * 30;
  var startX = Math.max(20, (fieldWidth - totalWidth) / 2);

  // 随机颜色顺序
  var colors = shuffle(balloonColors.slice());

  for (var i = 0; i < count; i++) {
    var x = startX + i * (balloonWidth + 30);
    var optionText = String(options[i]);
    var isCorrect = (optionText === String(correctAnswer));
    var color = colors[i % colors.length];
    var floatDuration = 10 + Math.random() * 4; // 10-14秒飘完

    var balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = x + 'px';
    balloon.style.bottom = '-140px';
    balloon.style.animationDuration = floatDuration + 's';
    balloon.dataset.correct = isCorrect ? '1' : '0';
    balloon.dataset.answer = optionText;

    balloon.innerHTML =
      '<div class="balloon-body">' +
        balloonSVG(color) +
        '<div class="balloon-text">' + optionText + '</div>' +
      '</div>';

    balloon.addEventListener('click', function(e) {
      handleBalloonClick(this, e);
    });

    // 气球飘完后移除
    balloon.addEventListener('animationend', function() {
      if (this.parentNode) this.remove();
    });

    field.appendChild(balloon);
  }
}

function handleBalloonClick(balloon, event) {
  if (!balloonsActive) return;

  var isCorrect = balloon.dataset.correct === '1';
  var rect = balloon.getBoundingClientRect();
  var field = document.getElementById('balloonField');
  var fieldRect = field.getBoundingClientRect();
  var popX = rect.left - fieldRect.left + rect.width / 2;
  var popY = rect.top - fieldRect.top + rect.height / 2;

  if (isCorrect) {
    // 答对！
    combo++;
    if (combo > maxCombo) maxCombo = combo;
    correctCount++;

    var points = 10;
    if (combo >= 5) points = 30;
    else if (combo >= 3) points = 20;
    score += points;

    // 气球爆炸效果
    popBalloon(balloon, popX, popY, true);

    // 飘浮反馈
    showFloatFeedback(popX, popY - 30, '+' + points + ' 分 ✨', '#6BCB77');

    // 清除其他气球
    clearBalloons();

    // 下一题
    clearTimeout(questionTimeout);
    questionTimeout = setTimeout(function() {
      updateHUD();
      nextQuestion();
    }, 600);

  } else {
    // 答错
    combo = 0;
    wrongCount++;
    timeLeft = Math.max(0, timeLeft - 3); // 扣3秒

    // 气球爆炸（灰色）
    popBalloon(balloon, popX, popY, false);

    // 飘浮反馈
    showFloatFeedback(popX, popY - 30, '-3秒 💨', '#FF6B6B');

    // 显示正确答案提示
    if (currentQuestion.steps) {
      document.getElementById('questionHint').textContent = currentQuestion.steps;
      document.getElementById('questionHint').style.color = '#FF6B6B';
      setTimeout(function() {
        document.getElementById('questionHint').style.color = '#999';
      }, 1500);
    }

    updateHUD();

    if (timeLeft <= 0) endGame();
  }
}

function popBalloon(balloon, x, y, success) {
  balloon.classList.add('pop');

  // 爆炸粒子
  var colors = success
    ? ['#FFD93D', '#6BCB77', '#FF6B6B', '#7EC8E3']
    : ['#999', '#aaa', '#bbb'];

  for (var i = 0; i < 8; i++) {
    var p = document.createElement('div');
    p.className = 'pop-particle';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    var angle = (Math.PI * 2 / 8) * i;
    var dist = 30 + Math.random() * 40;
    p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    p.style.animation = 'none';
    // 内联动画
    p.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: 'translate(' + Math.cos(angle)*dist + 'px, ' + Math.sin(angle)*dist + 'px) scale(0.3)', opacity: 0 }
    ], { duration: 500, easing: 'ease-out' });
    document.getElementById('balloonField').appendChild(p);
    setTimeout(function(el) { if (el.parentNode) el.remove(); }, 500, p);
  }

  setTimeout(function() { if (balloon.parentNode) balloon.remove(); }, 400);
}

function clearBalloons() {
  var balloons = document.querySelectorAll('.balloon:not(.pop)');
  balloons.forEach(function(b) {
    b.classList.add('pop');
    setTimeout(function() { if (b.parentNode) b.remove(); }, 400);
  });
}

function showFloatFeedback(x, y, text, color) {
  var el = document.createElement('div');
  el.className = 'float-feedback';
  el.textContent = text;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.color = color;
  document.getElementById('balloonField').appendChild(el);
  setTimeout(function() { if (el.parentNode) el.remove(); }, 1000);
}

// ========== 游戏结束 ==========
function endGame() {
  balloonsActive = false;
  clearInterval(timerInterval);
  clearTimeout(questionTimeout);

  var total = correctCount + wrongCount;
  var rate = total > 0 ? Math.round(correctCount / total * 100) : 0;

  // 计算获得星星
  var earnedStars = Math.floor(score / 20);
  if (earnedStars > 0) addStars(earnedStars);

  // 评价
  var emoji, title;
  if (rate >= 90) { emoji = '🏆'; title = '太厉害了！你是数学天才！'; }
  else if (rate >= 70) { emoji = '🎉'; title = '非常棒！继续保持！'; }
  else if (rate >= 50) { emoji = '💪'; title = '不错哦，再练练会更好！'; }
  else { emoji = '🌱'; title = '加油！多练几次就会了！'; }

  document.getElementById('gameScreen').classList.add('hidden');
  document.getElementById('resultScreen').classList.remove('hidden');

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultScore').textContent = score;
  document.getElementById('resultCorrect').textContent = correctCount;
  document.getElementById('resultWrong').textContent = wrongCount;
  document.getElementById('resultRate').textContent = rate + '%';
  document.getElementById('resultStars').textContent = '⭐ ' + earnedStars;

  // 更新顶部星星栏
  initStars();
}

function restartGame() {
  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('startScreen').classList.remove('hidden');
}

// 初始化
initStars();
