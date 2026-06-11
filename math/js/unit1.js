/**
 * 🏰 城堡保卫战 - 第一单元：四则运算
 * 出题引擎 + 游戏逻辑
 * 
 * 玩法：怪物从上方进攻，点击正确答案消灭一波。
 * 城堡有血量，时间到且有血 = 胜利，血量归零 = 失败。
 * 速度越快击退越多波！
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

// ========== 游戏参数（按难度） ==========
// baseFallDuration: 怪物初始下落时间（秒）— 越大越慢
// minFallDuration: 加速下限 — 再快也不低于这个值
// speedUpPerWave: 每波加速量（秒）
var GAME_CONFIG = {
  1: { hp: 5, time: 90, baseFallDuration: 15, minFallDuration: 8,  speedUpPerWave: 0.3, label: '简单' },
  2: { hp: 4, time: 75, baseFallDuration: 12, minFallDuration: 6,  speedUpPerWave: 0.3, label: '中等' },
  3: { hp: 3, time: 60, baseFallDuration: 10, minFallDuration: 5,  speedUpPerWave: 0.3, label: '困难' }
};

// ========== 游戏状态 ==========
var score = 0;
var combo = 0;
var maxCombo = 0;
var correctCount = 0;
var wrongCount = 0;
var waveCount = 0;
var hp = 5;
var hpMax = 5;
var timeLeft = 90;
var config = GAME_CONFIG[1];
var timerInterval = null;
var currentQuestion = null;
var gameActive = false;
var waveTimeout = null;
var fallTimers = [];

// ========== 怪物颜色库 ==========
var monsterColors = [
  '#E74C3C', '#E67E22', '#8E44AD', '#2ECC71',
  '#1ABC9C', '#3498DB', '#E84393', '#6C5CE7',
  '#D63031', '#00B894', '#FDCB6E', '#636E72'
];

// ========== 怪物 SVG 模板（有身体有手脚的小怪物） ==========
function monsterSVG(color) {
  var expressions = [
    '<path d="M 32 52 Q 50 46 68 52" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<rect x="34" y="52" width="32" height="8" rx="2" fill="#333"/>' +
    '<rect x="34" y="52" width="32" height="4" rx="2" fill="white"/>',
    '<line x1="30" y1="56" x2="70" y2="56" stroke="#333" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M 38 44 L 44 50" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>' +
    '<path d="M 62 44 L 56 50" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>',
    '<ellipse cx="50" cy="54" rx="16" ry="10" fill="#333"/>' +
    '<ellipse cx="50" cy="50" rx="14" ry="6" fill="white"/>',
    '<path d="M 32 52 Q 50 64 68 52" stroke="#333" stroke-width="3" fill="#333"/>' +
    '<ellipse cx="50" cy="60" rx="6" ry="8" fill="#E74C3C"/>'
  ];
  var expr = expressions[Math.floor(Math.random() * expressions.length)];

  var horns = [
    '<polygon points="28,18 22,2 36,14" fill="' + color + '" stroke="#333" stroke-width="1.5"/>' +
    '<polygon points="72,18 78,2 64,14" fill="' + color + '" stroke="#333" stroke-width="1.5"/>',
    '<circle cx="28" cy="14" r="8" fill="' + color + '" stroke="#333" stroke-width="1.5"/>' +
    '<circle cx="72" cy="14" r="8" fill="' + color + '" stroke="#333" stroke-width="1.5"/>',
    '<path d="M 30 20 L 22 4 L 38 16 Z" fill="' + color + '"/>' +
    '<path d="M 70 20 L 78 4 L 62 16 Z" fill="' + color + '"/>'
  ];
  var horn = horns[Math.floor(Math.random() * horns.length)];

  return '<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">' +
    '<ellipse cx="50" cy="52" rx="38" ry="38" fill="' + color + '" stroke="#333" stroke-width="2.5"/>' +
    '<ellipse cx="50" cy="60" rx="22" ry="20" fill="rgba(255,255,255,0.2)"/>' +
    horn +
    '<ellipse cx="38" cy="40" rx="11" ry="12" fill="white" stroke="#333" stroke-width="1.5"/>' +
    '<ellipse cx="62" cy="40" rx="11" ry="12" fill="white" stroke="#333" stroke-width="1.5"/>' +
    '<circle cx="38" cy="44" r="5.5" fill="#333"/>' +
    '<circle cx="62" cy="44" r="5.5" fill="#333"/>' +
    '<circle cx="40" cy="41" r="2" fill="white"/>' +
    '<circle cx="64" cy="41" r="2" fill="white"/>' +
    expr +
    '<ellipse cx="14" cy="58" rx="8" ry="6" fill="' + color + '" stroke="#333" stroke-width="1.5" transform="rotate(-20, 14, 58)"/>' +
    '<ellipse cx="86" cy="58" rx="8" ry="6" fill="' + color + '" stroke="#333" stroke-width="1.5" transform="rotate(20, 86, 58)"/>' +
    '<ellipse cx="36" cy="92" rx="10" ry="6" fill="' + color + '" stroke="#333" stroke-width="1.5"/>' +
    '<ellipse cx="64" cy="92" rx="10" ry="6" fill="' + color + '" stroke="#333" stroke-width="1.5"/>' +
    '</svg>';
}

// ========================================================
// 出题引擎
// ========================================================

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
    var templates = [
      function() { var a = randInt(10,50),b=randInt(2,9),c=randInt(1,30); return {expr:a+' + '+b+' × '+c,answer:a+b*c,steps:'先算 '+b+'×'+c+'='+(b*c)+'，再算 '+a+'+'+(b*c)+'='+(a+b*c)}; },
      function() { var a = randInt(20,80),b=randInt(2,8),c=randInt(1,20); return {expr:a+' - '+b+' × '+c,answer:a-b*c,steps:'先算 '+b+'×'+c+'='+(b*c)+'，再算 '+a+'-'+(b*c)+'='+(a-b*c)}; },
      function() { var a = randInt(2,12),b=randInt(2,9),c=randInt(2,9); return {expr:a+' × '+b+' + '+c,answer:a*b+c,steps:'先算 '+a+'×'+b+'='+(a*b)+'，再算 '+(a*b)+'+'+c+'='+(a*b+c)}; },
      function() { var b = randInt(2,9),c=randInt(2,9),a=randInt(2,12); return {expr:b+' × '+c+' - '+a,answer:b*c-a,steps:'先算 '+b+'×'+c+'='+(b*c)+'，再算 '+(b*c)+'-'+a+'='+(b*c-a)}; }
    ];
    var t = templates[Math.floor(Math.random()*templates.length)]();
    if (t.answer < 0) return genCalcQuestion();
    expr=t.expr; answer=t.answer; steps=t.steps;
  } else if (difficulty === 2) {
    var a=randInt(10,40),b=randInt(5,30),c=randInt(2,8);
    var ops = [
      function(){return{expr:'('+a+' + '+b+') × '+c,answer:(a+b)*c,steps:'先算 ('+a+'+'+b+')='+(a+b)+'，再算 '+(a+b)+'×'+c+'='+((a+b)*c)};},
      function(){return{expr:'('+a+' - '+b+') × '+c,answer:(a-b)*c,steps:'先算 ('+a+'-'+b+')='+(a-b)+'，再算 '+(a-b)+'×'+c+'='+((a-b)*c)};},
      function(){return{expr:a+' × ('+b+' + '+c+')',answer:a*(b+c),steps:'先算 ('+b+'+'+c+')='+(b+c)+'，再算 '+a+'×'+(b+c)+'='+(a*(b+c))};}
    ];
    var t2=ops[Math.floor(Math.random()*ops.length)]();
    if(t2.answer<0) return genCalcQuestion();
    expr=t2.expr;answer=t2.answer;steps=t2.steps;
  } else {
    var a2=randInt(2,8),b2=randInt(2,8),c2=randInt(2,8),d2=randInt(5,20);
    var ops2=[
      function(){return{expr:a2+' × '+b2+' + '+c2+' × '+d2,answer:a2*b2+c2*d2,steps:'先算 '+a2+'×'+b2+'='+(a2*b2)+' 和 '+c2+'×'+d2+'='+(c2*d2)+'，再加'};},
      function(){return{expr:'('+a2+' + '+b2+') × '+c2+' - '+d2,answer:(a2+b2)*c2-d2,steps:'先算 ('+a2+'+'+b2+')='+(a2+b2)+'，再算 '+(a2+b2)+'×'+c2+'='+((a2+b2)*c2)+'，最后减'+d2};},
      function(){return{expr:a2+' × '+b2+' - ('+c2+' + '+d2+')',answer:a2*b2-c2-d2,steps:'先算 '+a2+'×'+b2+'='+(a2*b2)+' 和 ('+c2+'+'+d2+')='+(c2+d2)+'，再相减'};}
    ];
    var t3=ops2[Math.floor(Math.random()*ops2.length)]();
    if(t3.answer<0) return genCalcQuestion();
    expr=t3.expr;answer=t3.answer;steps=t3.steps;
  }
  var options=[answer];
  while(options.length<4){
    var offset=randInt(1,Math.max(5,Math.abs(answer)>0?Math.floor(Math.abs(answer)*0.3):5));
    var fake=answer+(Math.random()>0.5?offset:-offset);
    if(fake!==answer&&options.indexOf(fake)===-1&&fake>=0) options.push(fake);
  }
  shuffle(options);
  return {type:'calc',text:expr+' = ?',hint:'点击正确答案的怪物！',options:options,answer:answer,steps:steps};
}

// --- 运算顺序判断题 ---
function genOrderQuestion() {
  var a=randInt(10,30),b=randInt(2,8),c=randInt(2,8),d=randInt(5,20);
  var qs=[
    {expr:a+' + '+b+' × '+c,firstStep:b+' × '+c,wrongSteps:[a+' + '+b,c+' × '+a,a+' + '+c]},
    {expr:a+' - '+b+' × '+c,firstStep:b+' × '+c,wrongSteps:[a+' - '+b,c+' × '+a,a+' - '+c]},
    {expr:b+' × '+c+' + '+d,firstStep:b+' × '+c,wrongSteps:[c+' + '+d,b+' × '+d,b+' + '+d]},
    {expr:a+' × '+b+' - '+d,firstStep:a+' × '+b,wrongSteps:[b+' - '+d,a+' × '+d,a+' - '+d]}
  ];
  var q=qs[Math.floor(Math.random()*qs.length)];
  var options=[q.firstStep];
  q.wrongSteps.forEach(function(s){if(options.indexOf(s)===-1)options.push(s);});
  while(options.length<4) options.push(String(randInt(1,50)));
  options=options.slice(0,4); shuffle(options);
  return {type:'order',text:'💡 '+q.expr+'  第一步算什么？',hint:'先乘除，后加减，有括号先算括号',options:options,answer:q.firstStep,steps:'先算 '+q.firstStep+'，乘除要优先'};
}

// --- 0的特性判断题 ---
function genZeroQuestion() {
  var qs=[
    {text:'0 + 5 = 5',correct:true},{text:'0 × 8 = 0',correct:true},
    {text:'0 ÷ 3 = 0',correct:true},{text:'5 + 0 = 5',correct:true},
    {text:'8 × 0 = 0',correct:true},{text:'0 ÷ 5 = 0',correct:true},
    {text:'5 × 0 = 5',correct:false},{text:'0 ÷ 0 = 0',correct:false},
    {text:'5 ÷ 0 = 0',correct:false},{text:'0 + 3 = 0',correct:false},
    {text:'0 × 7 = 7',correct:false},{text:'3 ÷ 0 = 3',correct:false}
  ];
  var q=qs[Math.floor(Math.random()*qs.length)];
  return {type:'zero',text:'🤔 '+q.text+'  对不对？',hint:q.correct?'想想0加任何数等于…':'小心，0不能做除数！',
    options:['✅ 对的','❌ 错的'],answer:q.correct?'✅ 对的':'❌ 错的',
    steps:q.correct?'正确！'+q.text+' 是对的':'不对！'+(q.text.indexOf('÷ 0')!==-1?'0不能做除数！':q.text.replace('=','≠')+' 才对')};
}

// --- 逆运算填空题 ---
function genInverseQuestion() {
  var a=randInt(10,99),b=randInt(10,99),s=a+b;
  var qs=[
    {text:s+' - ? = '+a,answer:b,steps:s+' - '+a+' = '+b+'（减法是加法的逆运算）'},
    {text:s+' - ? = '+b,answer:a,steps:s+' - '+b+' = '+a+'（减法是加法的逆运算）'}
  ];
  var c=randInt(2,9),d=randInt(2,9),p=c*d;
  qs.push(
    {text:p+' ÷ ? = '+d,answer:c,steps:p+' ÷ '+d+' = '+c+'（除法是乘法的逆运算）'},
    {text:p+' ÷ ? = '+c,answer:d,steps:p+' ÷ '+c+' = '+d+'（除法是乘法的逆运算）'}
  );
  var q=qs[Math.floor(Math.random()*qs.length)];
  var options=[q.answer];
  while(options.length<4){
    var fake=q.answer+randInt(1,10)*(Math.random()>0.5?1:-1);
    if(fake!==q.answer&&fake>0&&options.indexOf(fake)===-1) options.push(fake);
  }
  shuffle(options);
  return {type:'inverse',text:'🔗 '+q.text,hint:'想一想逆运算的关系',options:options.map(String),answer:String(q.answer),steps:q.steps};
}


// ========================================================
// 游戏流程控制
// ========================================================

function startGame() {
  config = GAME_CONFIG[difficulty];
  score = 0; combo = 0; maxCombo = 0;
  correctCount = 0; wrongCount = 0;
  waveCount = 0;
  hp = config.hp; hpMax = config.hp;
  timeLeft = config.time;
  gameActive = true;

  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');

  updateHUD();
  updateHPBar();
  startTimer();
  nextWave();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(function() {
    timeLeft--;
    document.getElementById('timerDisplay').textContent = timeLeft;
    if (timeLeft <= 10) document.querySelector('.hud-timer').classList.add('warning');
    if (timeLeft <= 0) {
      endGame(true);
    }
  }, 1000);
}

function updateHUD() {
  // 红心显示
  var hearts = '';
  for (var i = 0; i < hpMax; i++) {
    hearts += '<span class="hp-heart' + (i < hp ? '' : ' lost') + '">❤️</span>';
  }
  document.getElementById('hpHearts').innerHTML = hearts;

  document.getElementById('waveDisplay').textContent = waveCount;
  document.getElementById('scoreDisplay').textContent = score;
  document.getElementById('timerDisplay').textContent = timeLeft;

  var comboEl = document.getElementById('comboDisplay');
  if (combo >= 2) {
    comboEl.textContent = '🔥' + combo + '连击';
    comboEl.classList.add('pop');
    setTimeout(function() { comboEl.classList.remove('pop'); }, 200);
  } else {
    comboEl.textContent = '';
  }
}

function updateHPBar() {
  var pct = (hp / hpMax) * 100;
  var hpBar = document.getElementById('hpBar');
  hpBar.style.width = pct + '%';

  if (pct <= 30) hpBar.classList.add('low');
  else hpBar.classList.remove('low');
}

// ========== 波次逻辑 ==========

function nextWave() {
  if (!gameActive) return;

  clearFallTimers();
  waveCount++;
  currentQuestion = generateQuestion();

  document.getElementById('questionText').textContent = currentQuestion.text;
  document.getElementById('questionHint').textContent = currentQuestion.hint;

  var qEl = document.getElementById('questionText');
  qEl.style.animation = 'none';
  qEl.offsetHeight;
  qEl.style.animation = 'questionIn 0.3s ease-out';

  updateHUD();
  spawnEnemies(currentQuestion.options, currentQuestion.answer);
}

function getFallDuration() {
  var dur = config.baseFallDuration - (waveCount - 1) * config.speedUpPerWave;
  return Math.max(config.minFallDuration, dur);
}

/**
 * 生成一波怪物：从顶部掉落
 */
function spawnEnemies(options, correctAnswer) {
  var field = document.getElementById('battlefield');
  field.innerHTML = '';

  var fieldWidth = field.offsetWidth;
  var fieldHeight = field.offsetHeight;
  var count = options.length;
  var enemyWidth = 110;
  var totalWidth = count * enemyWidth + (count - 1) * 20;
  var startX = Math.max(10, (fieldWidth - totalWidth) / 2);
  var fallDur = getFallDuration();

  var colors = shuffle(monsterColors.slice());

  for (var i = 0; i < count; i++) {
    var x = startX + i * (enemyWidth + 20);
    var optionText = String(options[i]);
    var isCorrect = (optionText === String(correctAnswer));
    var color = colors[i % colors.length];

    var enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.left = x + 'px';
    enemy.style.top = '-130px';
    enemy.style.setProperty('--fall-duration', fallDur + 's');
    enemy.style.setProperty('--sway-duration', (1.5 + Math.random() * 1.5) + 's');
    enemy.style.setProperty('--sway-delay', (i * 0.2) + 's');
    enemy.dataset.correct = isCorrect ? '1' : '0';
    enemy.dataset.answer = optionText;

    enemy.innerHTML =
      '<div class="enemy-body">' +
        monsterSVG(color) +
        '<div class="enemy-text">' + optionText + '</div>' +
      '</div>';

    enemy.addEventListener('click', function(e) {
      handleEnemyClick(this, e);
    });

    field.appendChild(enemy);

    // 延迟触发下落
    (function(el, delay) {
      setTimeout(function() {
        if (el.parentNode && !el.classList.contains('pop') && gameActive) {
          el.classList.add('sway');
          el.style.top = (fieldHeight - 30) + 'px';
        }
      }, delay + 50);
    })(enemy, i * 100);

    // 落地检测
    (function(el, delay) {
      var timer = setTimeout(function() {
        if (el.parentNode && !el.classList.contains('pop') && gameActive) {
          enemyReachedCastle(el);
        }
      }, (fallDur + delay / 1000) * 1000 + 200);
      fallTimers.push(timer);
    })(enemy, i * 100);
  }
}

function clearFallTimers() {
  fallTimers.forEach(function(t) { clearTimeout(t); });
  fallTimers = [];
}

// ========== 点击怪物 ==========

function handleEnemyClick(enemy, event) {
  if (!gameActive) return;

  var isCorrect = enemy.dataset.correct === '1';
  var rect = enemy.getBoundingClientRect();
  var field = document.getElementById('battlefield');
  var fieldRect = field.getBoundingClientRect();
  var popX = rect.left - fieldRect.left + rect.width / 2;
  var popY = rect.top - fieldRect.top + rect.height / 2;

  if (isCorrect) {
    combo++;
    if (combo > maxCombo) maxCombo = combo;
    correctCount++;

    var points = 10;
    if (combo >= 5) points = 30;
    else if (combo >= 3) points = 20;
    score += points;

    popEnemy(enemy, popX, popY, true);
    showFloatFeedback(popX, popY - 20, '+' + points + ' ✨', '#6BCB77');

    document.getElementById('castle').classList.add('celebrate');
    setTimeout(function() { document.getElementById('castle').classList.remove('celebrate'); }, 1500);

    clearEnemies();
    clearFallTimers();
    updateHUD();

    clearTimeout(waveTimeout);
    waveTimeout = setTimeout(function() { nextWave(); }, 700);

  } else {
    combo = 0;
    wrongCount++;
    hp = Math.max(0, hp - 1);

    popEnemy(enemy, popX, popY, false);
    showFloatFeedback(popX, popY - 20, '答错了！💔', '#FF6B6B');
    shakeCastle();

    updateHUD();
    updateHPBar();

    if (hp <= 0) endGame(false);
  }
}

function enemyReachedCastle(enemy) {
  if (!gameActive) return;

  if (enemy.dataset.correct === '1') {
    hp = Math.max(0, hp - 1);
    shakeCastle();

    var field = document.getElementById('battlefield');
    showDamageFeedback(field.offsetWidth / 2, field.offsetHeight - 10, '敌人入侵！💔');

    updateHUD();
    updateHPBar();

    if (hp <= 0) { endGame(false); return; }
  }

  if (enemy.parentNode) enemy.remove();

  var remaining = document.querySelectorAll('.enemy:not(.pop)');
  if (remaining.length === 0 && gameActive) {
    clearTimeout(waveTimeout);
    waveTimeout = setTimeout(function() { nextWave(); }, 500);
  }
}

function shakeCastle() {
  var castle = document.getElementById('castle');
  castle.classList.remove('shake');
  castle.offsetHeight;
  castle.classList.add('shake');
  setTimeout(function() { castle.classList.remove('shake'); }, 400);
}

// ========== 视觉效果 ==========

function popEnemy(enemy, x, y, success) {
  enemy.classList.remove('sway');
  enemy.classList.add('pop');

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
    var dist = 25 + Math.random() * 35;
    p.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: 'translate(' + Math.cos(angle)*dist + 'px, ' + Math.sin(angle)*dist + 'px) scale(0.3)', opacity: 0 }
    ], { duration: 500, easing: 'ease-out' });
    document.getElementById('battlefield').appendChild(p);
    setTimeout(function(el) { if (el.parentNode) el.remove(); }, 500, p);
  }
  setTimeout(function() { if (enemy.parentNode) enemy.remove(); }, 400);
}

function clearEnemies() {
  var enemies = document.querySelectorAll('.enemy:not(.pop)');
  enemies.forEach(function(e) {
    e.classList.remove('sway');
    e.classList.add('pop');
    setTimeout(function() { if (e.parentNode) e.remove(); }, 400);
  });
}

function showFloatFeedback(x, y, text, color) {
  var el = document.createElement('div');
  el.className = 'float-feedback';
  el.textContent = text;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.color = color;
  document.getElementById('battlefield').appendChild(el);
  setTimeout(function() { if (el.parentNode) el.remove(); }, 1000);
}

function showDamageFeedback(x, y, text) {
  var el = document.createElement('div');
  el.className = 'damage-feedback';
  el.textContent = text;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.color = '#E74C3C';
  document.getElementById('battlefield').appendChild(el);
  setTimeout(function() { if (el.parentNode) el.remove(); }, 1000);
}

// ========== 游戏结束 ==========
function endGame(survived) {
  gameActive = false;
  clearInterval(timerInterval);
  clearTimeout(waveTimeout);
  clearFallTimers();

  var total = correctCount + wrongCount;
  var rate = total > 0 ? Math.round(correctCount / total * 100) : 0;

  var earnedStars = 0;
  if (survived) {
    earnedStars = 5 + Math.floor(waveCount / 3) + hp;
  } else {
    earnedStars = Math.floor(waveCount / 3);
  }
  if (earnedStars > 0) addStars(earnedStars);

  var emoji, title, outcome;
  if (survived) {
    outcome = '🎉 胜利';
    if (rate >= 90 && hp >= hpMax * 0.8) { emoji = '🏆'; title = '完美守城！数学大将军！'; }
    else if (rate >= 70) { emoji = '🎉'; title = '守城成功！英勇无畏！'; }
    else { emoji = '💪'; title = '守住了！但可以更强！'; }
  } else {
    outcome = '💥 败北';
    emoji = '🏰';
    title = '城堡沦陷了…再来一次！';
  }

  document.getElementById('gameScreen').classList.add('hidden');
  document.getElementById('resultScreen').classList.remove('hidden');

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultOutcome').textContent = outcome;
  document.getElementById('resultOutcome').style.color = survived ? '#6BCB77' : '#E74C3C';
  document.getElementById('resultScore').textContent = score;
  document.getElementById('resultWave').textContent = waveCount + ' 波';
  document.getElementById('resultHP').textContent = hp + '/' + hpMax + ' ❤️';
  document.getElementById('resultRate').textContent = rate + '%';
  document.getElementById('resultStars').textContent = '⭐ ' + earnedStars;

  initStars();
}

function restartGame() {
  // 【修复 #10】重置难度为简单
  difficulty = 1;
  document.querySelectorAll('.diff-btn').forEach(function(b) { b.classList.remove('active'); });
  var firstBtn = document.querySelector('.diff-btn[data-diff="1"]');
  if (firstBtn) firstBtn.classList.add('active');

  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('startScreen').classList.remove('hidden');
}

// 初始化
initStars();
