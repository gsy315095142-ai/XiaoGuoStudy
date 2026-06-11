/**
 * 🕵️ 数据侦探局 - 第八单元：平均数与条形统计图
 *
 * 四个章节：
 *   1. 线索平衡  — 点击搬运法（移多补少）
 *   2. 嫌疑人排查 — 求平均数（计算选择题）
 *   3. 案件档案  — 读复式条形统计图
 *   4. 终极破案  — 综合应用（混合题）
 *
 * 注意：totalStars、initStars、showToast、addStars 由 common.js 提供
 */

// ============================================================
// 关卡数据
// ============================================================

var LEVELS = {

  // ===== 第一章：线索平衡（移多补少 · 点击搬运） =====
  // 所有 values 的总和必须能被个数整除（平均数为整数）
  1: [
    {
      story: '🔍 4位证人的线索数量不同，点击柱子搬运方块，让每人都一样多！',
      labels: ['张三', '李四', '王五', '赵六'],
      values: [8, 2, 5, 5],
      answer: 5
    },
    {
      story: '🔍 5位嫌疑人的可疑行为次数不同，移多补少找平均！',
      labels: ['A', 'B', 'C', 'D', 'E'],
      values: [7, 3, 4, 6, 5],
      answer: 5
    },
    {
      story: '🔍 4个监控拍到的可疑人物数不一样，搬一搬！',
      labels: ['东门', '西门', '南门', '北门'],
      values: [9, 3, 5, 7],
      answer: 6
    },
    {
      story: '🔍 5个指纹采集点的指纹数量不同，移多补少！',
      labels: ['点1', '点2', '点3', '点4', '点5'],
      values: [10, 4, 6, 8, 2],
      answer: 6
    },
    {
      story: '🔍 6个脚印线索的清晰度评分不同，让它们一样多！',
      labels: ['左1', '左2', '左3', '右1', '右2', '右3'],
      values: [8, 4, 6, 4, 5, 3],
      answer: 5
    },
    {
      story: '🔍 4个目击者提供的线索数量不同，移多补少！',
      labels: ['甲', '乙', '丙', '丁'],
      values: [12, 4, 8, 8],
      answer: 8
    },
    {
      story: '🔍 5个时间段内巡逻次数不同，平衡巡逻次数！',
      labels: ['周一', '周二', '周三', '周四', '周五'],
      values: [11, 5, 7, 9, 3],
      answer: 7
    }
  ],

  // ===== 第二章：嫌疑人排查（求平均数） =====
  2: [
    {
      story: '🕵️ 嫌疑人甲4天分别走了 3km、5km、4km、8km，平均每天走多少km？',
      question: '(3 + 5 + 4 + 8) ÷ 4 = ?',
      answer: 5,
      choices: [4.5, 5, 5.5, 6]
    },
    {
      story: '🕵️ 嫌疑人乙5次测量的脉搏分别是 72、78、75、80、75 次/分，平均脉搏是？',
      question: '(72 + 78 + 75 + 80 + 75) ÷ 5 = ?',
      answer: 76,
      choices: [74, 75, 76, 78]
    },
    {
      story: '🕵️ 犯罪现场6件证物重量分别是 120g、150g、90g、180g、110g、130g，平均重量？',
      question: '(120 + 150 + 90 + 180 + 110 + 130) ÷ 6 = ?',
      answer: 130,
      choices: [120, 125, 130, 135]
    },
    {
      story: '🕵️ 3个可疑电话的通话时长分别是 3.5分钟、5.5分钟、4分钟，平均通话时长？',
      question: '(3.5 + 5.5 + 4) ÷ 3 ≈ ?',
      answer: 4.33,
      choices: [4.33, 4.5, 4, 5]
    },
    {
      story: '🕵️ 某嫌疑银行账户4笔转账金额分别是 2500元、1800元、3200元、4500元，平均每笔多少元？',
      question: '(2500 + 1800 + 3200 + 4500) ÷ 4 = ?',
      answer: 3000,
      choices: [2800, 2900, 3000, 3200]
    },
    {
      story: '🕵️ 一周内某小区盗窃案：周一到周日分别发生了 2、0、1、3、1、2、1 起，平均每天发生几起？',
      question: '(2 + 0 + 1 + 3 + 1 + 2 + 1) ÷ 7 ≈ ?',
      answer: 1.43,
      choices: [1, 1.43, 1.5, 2]
    }
  ],

  // ===== 第三章：案件档案（复式条形统计图） =====
  3: [
    {
      title: '📊 案件档案 #001：城东 vs 城西案件数量',
      subtitle: '城东（蓝色）和城西（橙色）过去4个月的案件数',
      categories: ['1月', '2月', '3月', '4月'],
      series: [
        { name: '城东', color: '#4A90D9', data: [12, 18, 15, 20] },
        { name: '城西', color: '#F5A623', data: [8, 14, 19, 11] }
      ],
      questions: [
        { question: '城东 4 个月一共发生了多少起案件？', answer: 65, choices: [60, 63, 65, 68] },
        { question: '城西哪个月案件最多？', answer: '3月', choices: ['1月', '2月', '3月', '4月'] },
        { question: '城东平均每月发生多少起案件？', answer: 16.25, choices: [15, 16, 16.25, 17] }
      ]
    },
    {
      title: '📊 案件档案 #002：两种犯罪类型对比',
      subtitle: '盗窃案（蓝色）和诈骗案（橙色）在四个城区的数量',
      categories: ['A区', 'B区', 'C区', 'D区'],
      series: [
        { name: '盗窃案', color: '#E74C3C', data: [25, 15, 30, 20] },
        { name: '诈骗案', color: '#9B59B6', data: [10, 22, 18, 28] }
      ],
      questions: [
        { question: '哪个区的盗窃案最多？', answer: 'C区', choices: ['A区', 'B区', 'C区', 'D区'] },
        { question: '诈骗案在四个城区一共发生了多少起？', answer: 78, choices: [72, 75, 78, 80] },
        { question: 'A区盗窃案比诈骗案多多少起？', answer: 15, choices: [10, 15, 20, 25] }
      ]
    },
    {
      title: '📊 案件档案 #003：破案率统计',
      subtitle: '上半年（蓝色）和下半年（橙色）各队的破案数',
      categories: ['甲队', '乙队', '丙队', '丁队'],
      series: [
        { name: '上半年', color: '#27AE60', data: [45, 38, 52, 40] },
        { name: '下半年', color: '#F39C12', data: [50, 42, 48, 55] }
      ],
      questions: [
        { question: '乙队全年一共破了多少个案子？', answer: 80, choices: [76, 78, 80, 82] },
        { question: '哪个队下半年比上半年进步最大？', answer: '丁队', choices: ['甲队', '乙队', '丙队', '丁队'] },
        { question: '丙队上半年的破案数比下半年多几件？', answer: 4, choices: [2, 4, 6, 8] }
      ]
    },
    {
      title: '📊 案件档案 #004：校园安全调查',
      subtitle: '四年级（蓝色）和五年级（橙色）安全知识答题分数',
      categories: ['交通安全', '食品安全', '网络安全', '消防安全', '地震安全'],
      series: [
        { name: '四年级', color: '#3498DB', data: [85, 78, 92, 88, 75] },
        { name: '五年级', color: '#E67E22', data: [90, 82, 88, 92, 80] }
      ],
      questions: [
        { question: '四年级哪个项目得分最高？', answer: '网络安全', choices: ['交通安全', '食品安全', '网络安全', '消防安全'] },
        { question: '五年级的平均分大约是多少？', answer: 86.4, choices: [84, 85, 86.4, 88] },
        { question: '哪个项目五年级比四年级多4分？', answer: '消防安全', choices: ['交通安全', '食品安全', '消防安全', '地震安全'] }
      ]
    }
  ],

  // ===== 第四章：终极破案（综合应用） =====
  4: [
    {
      type: 'avg',
      story: '🏆 7名嫌疑人的银行卡余额分别是 2000、3500、1500、5000、3000、2500、4000 元，平均余额是？',
      question: '(2000+3500+1500+5000+3000+2500+4000) ÷ 7 ≈ ?',
      answer: 3071.43,
      choices: [2800, 3000, 3071.43, 3500]
    },
    {
      type: 'judge',
      story: '🏆 有人说"平均数一定比最大的数小"，对吗？',
      question: '平均数一定比最大的数小吗？',
      answer: '不对，有时平均数等于最大数',
      choices: ['对，平均数一定比最大数小', '不对，有时平均数等于最大数', '对，平均数一定等于最大数', '不对，平均数一定比最大数大']
    },
    {
      type: 'read',
      story: '🏆 小明4次测验成绩分别是 88、92、85、95 分，第5次至少考多少分，平均分才能达到 92 分？',
      question: '92 × 5 - (88 + 92 + 85 + 95) = ?',
      answer: 100,
      choices: [98, 100, 102, 105]
    },
    {
      type: 'apply',
      story: '🏆 一个犯罪团伙5人，已知4人年龄分别是 25、30、28、32 岁，平均年龄 29 岁，第5人多少岁？',
      question: '29 × 5 - (25 + 30 + 28 + 32) = ?',
      answer: 30,
      choices: [28, 29, 30, 32]
    },
    {
      type: 'avg',
      story: '🏆 某案件6个月办案经费分别是 1.2万、0.8万、1.5万、1.0万、1.3万、0.6万，平均每月多少万元？',
      question: '(1.2+0.8+1.5+1.0+1.3+0.6) ÷ 6 ≈ ?',
      answer: 1.07,
      choices: [0.9, 1.0, 1.07, 1.2]
    },
    {
      type: 'read',
      story: '🏆 A组5人身高 140、145、138、150、142 cm，B组5人身高 135、148、141、144、147 cm，哪组更高？',
      question: 'A组平均 143cm，B组平均 143cm，结论是？',
      answer: '两组一样高',
      choices: ['A组更高', 'B组更高', '两组一样高', '无法确定']
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
var chartQIdx = 0;
var earnedStars = 0; // 【修复 #7】记录本局获得的星星数

// 模式1：搬运状态
var m1 = {
  values: [],       // 当前各柱子的值
  answer: 0,        // 目标平均值
  origValues: [],   // 初始值（用于重置）
  labels: [],       // 标签
  selectedCol: -1,  // 当前选中的柱子（-1=未选）
  steps: 0,         // 移动步数
  animating: false   // 飞行动画中，禁止操作
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
  chartQIdx = 0;
  earnedStars = 0; // 【修复 #7】重置星星
  m1.selectedCol = -1;
  m1.animating = false;

  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');
  document.getElementById('resultScreen').classList.add('hidden');

  loadLevel();
}

function loadLevel() {
  answered = false;
  m1.selectedCol = -1;
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
  var total, current;
  if (currentChapter === 3) {
    total = levels.reduce(function(s, lv) { return s + lv.questions.length; }, 0);
    current = levels.slice(0, currentLevel).reduce(function(s, lv) { return s + lv.questions.length; }, 0) + chartQIdx + 1;
  } else {
    total = levels.length;
    current = currentLevel + 1;
  }
  var pct = Math.round((current / total) * 100);
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('progressText').textContent = current + '/' + total;
  document.getElementById('levelInfo').textContent = '第 ' + (currentLevel + 1) + ' 关';
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
    if (currentChapter === 3) {
      chartQIdx++;
      var lv = LEVELS[3][currentLevel];
      if (chartQIdx >= lv.questions.length) {
        chartQIdx = 0;
        currentLevel++;
      }
    } else {
      currentLevel++;
    }
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
      if (currentChapter === 3) {
        chartQIdx++;
        var lv = LEVELS[3][currentLevel];
        if (chartQIdx >= lv.questions.length) {
          chartQIdx = 0;
          currentLevel++;
        }
      } else {
        currentLevel++;
      }
      loadLevel();
    }, 1300);
  }
}

function showResult() {
  document.getElementById('gameScreen').classList.add('hidden');
  document.getElementById('resultScreen').classList.remove('hidden');

  var won = lives > 0;
  document.getElementById('resultEmoji').textContent = won ? '🏆' : '💪';
  document.getElementById('resultTitle').textContent = won ? '案件告破！' : '继续努力！';

  var chapterNames = {1:'线索平衡', 2:'嫌疑人排查', 3:'案件档案', 4:'终极破案'};
  var stats = '<div class="stat-row">📌 章节：<strong>' + chapterNames[currentChapter] + '</strong></div>';
  stats += '<div class="stat-row">🎯 得分：<strong>' + score + '</strong></div>';
  stats += '<div class="stat-row">❤️ 剩余生命：<strong>' + lives + '</strong></div>';
  // 【修复 #7】用 earnedStars 替代 score 显示星星数
  stats += '<div class="stat-row">⭐ 获得星星：<strong>' + earnedStars + '</strong></div>';

  if (won) {
    stats += '<div class="knowledge-card">';
    stats += '<h3>💡 知识小贴士</h3>';
    if (currentChapter === 1) {
      stats += '<p>🔑 <b>移多补少</b>：把多的移给少的，让每个都一样多，这个相同的数就是<b>平均数</b>。</p>';
    } else if (currentChapter === 2) {
      stats += '<p>🔑 <b>求平均数</b>：平均数 = 总数量 ÷ 总份数</p>';
    } else if (currentChapter === 3) {
      stats += '<p>🔑 <b>复式条形统计图</b>：可以同时对比两组或多组数据，一眼看出谁多谁少！</p>';
    } else {
      stats += '<p>🔑 <b>平均数的特点</b>：平均数反映整体水平，不一定等于其中任何一个数。</p>';
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
// 模式1：线索平衡（点击搬运法）
// ============================================================

var BLOCK_H = 18;   // 每个方块高度(px)
var BLOCK_GAP = 2;  // 方块间距

function loadMode1() {
  var modeEl = document.getElementById('mode1');
  modeEl.classList.remove('hidden');

  var lv = LEVELS[1][currentLevel];
  document.getElementById('questionText').textContent = lv.story;

  // 初始化搬运状态
  m1.values = lv.values.slice();
  m1.origValues = lv.values.slice();
  m1.labels = lv.labels.slice();
  m1.answer = lv.answer;
  m1.selectedCol = -1;
  m1.steps = 0;
  m1.animating = false;

  renderBalanceColumns();
  updateBalanceHint();
  document.getElementById('balanceSteps').textContent = '已移动：0 步';

  // 平均线位置
  var avgLineEl = document.getElementById('balanceAvgLine');
  var avgLabelEl = document.getElementById('balanceAvgLabel');
  avgLineEl.classList.remove('line-show');
  avgLabelEl.classList.remove('label-show');
  avgLabelEl.textContent = '目标：让所有柱子一样高！';

  // 重置 desk 样式
  var desk = document.querySelector('.balance-desk');
  if (desk) desk.classList.remove('desk-clear');

  // 重置按钮
  document.getElementById('balanceResetBtn').style.display = '';
}

function renderBalanceColumns() {
  var deskEl = document.getElementById('balanceDesk');
  var html = '';
  for (var i = 0; i < m1.values.length; i++) {
    var val = m1.values[i];
    var h = Math.max(4, val * (BLOCK_H + BLOCK_GAP));
    html += '<div class="balance-column" data-idx="' + i + '">';
    html += '  <div class="balance-bar-wrap">';
    html += '    <div class="balance-bar" style="height:' + h + 'px">';
    for (var b = 0; b < val; b++) {
      html += '<div class="balance-block"></div>';
    }
    html += '    </div>';
    html += '  </div>';
    html += '  <div class="balance-val">' + val + '</div>';
    html += '  <div class="balance-label">' + m1.labels[i] + '</div>';
    html += '</div>';
  }
  deskEl.innerHTML = html;

  // 用事件委托绑定点击
  deskEl.onclick = function(e) {
    var col = e.target.closest('.balance-column');
    if (!col) return;
    var idx = parseInt(col.getAttribute('data-idx'));
    if (!isNaN(idx)) onColumnClick(idx);
  };
}

function updateColumn(idx) {
  var cols = document.querySelectorAll('#balanceDesk .balance-column');
  if (!cols[idx]) return;

  var val = m1.values[idx];
  var col = cols[idx];
  var bar = col.querySelector('.balance-bar');
  var valEl = col.querySelector('.balance-val');

  // 更新高度
  var h = Math.max(4, val * (BLOCK_H + BLOCK_GAP));
  bar.style.height = h + 'px';

  // 更新方块数量
  bar.innerHTML = '';
  for (var b = 0; b < val; b++) {
    var block = document.createElement('div');
    block.className = 'balance-block';
    bar.appendChild(block);
  }

  // 更新数值
  valEl.textContent = val;
}

function onColumnClick(idx) {
  if (answered || m1.animating) return;

  // 还没选源柱子 → 选中它
  if (m1.selectedCol === -1) {
    if (m1.values[idx] <= 0) return; // 空柱子不能选
    m1.selectedCol = idx;
    highlightColumn(idx);
    updateBalanceHint();
    return;
  }

  // 点击了自己 → 取消选择
  if (m1.selectedCol === idx) {
    m1.selectedCol = -1;
    clearAllHighlights();
    updateBalanceHint();
    return;
  }

  // 已选了源，现在选目标 → 执行搬运
  performMove(m1.selectedCol, idx);
}

/** 只清除 CSS 高亮，不动 m1.selectedCol */
function clearAllHighlights() {
  var cols = document.querySelectorAll('#balanceDesk .balance-column');
  for (var i = 0; i < cols.length; i++) {
    cols[i].classList.remove('col-selected');
  }
}

/** 高亮指定柱子（先清其他高亮） */
function highlightColumn(idx) {
  clearAllHighlights();
  var cols = document.querySelectorAll('#balanceDesk .balance-column');
  if (cols[idx]) cols[idx].classList.add('col-selected');
}

function updateBalanceHint() {
  var hintEl = document.getElementById('balanceHint');
  if (m1.selectedCol === -1) {
    hintEl.textContent = '👆 先点一下要取走方块的柱子';
    hintEl.classList.remove('hint-selected');
  } else {
    var name = m1.labels[m1.selectedCol];
    hintEl.textContent = '👉 已选「' + name + '（' + m1.values[m1.selectedCol] + '）」，点另一个柱子放下去';
    hintEl.classList.add('hint-selected');
  }
}

function performMove(fromIdx, toIdx) {
  m1.animating = true;

  // 清除选中高亮
  clearAllHighlights();

  m1.values[fromIdx]--;
  m1.values[toIdx]++;
  m1.steps++;

  // 获取柱子的 DOM 和位置
  var cols = document.querySelectorAll('#balanceDesk .balance-column');
  var fromCol = cols[fromIdx];
  var toCol = cols[toIdx];
  var fromRect = fromCol.getBoundingClientRect();
  var toRect = toCol.getBoundingClientRect();

  // 创建飞行方块
  var fly = document.createElement('div');
  fly.className = 'balance-fly-block';
  fly.style.left = (fromRect.left + fromRect.width / 2 - 22) + 'px';
  fly.style.top = (fromRect.top) + 'px';
  document.body.appendChild(fly);

  // 让源柱子顶部方块淡出
  var fromBar = fromCol.querySelector('.balance-bar');
  var blocks = fromBar.querySelectorAll('.balance-block');
  if (blocks.length > 0) {
    blocks[blocks.length - 1].style.opacity = '0';
    blocks[blocks.length - 1].style.transform = 'scale(0.5)';
  }

  // 飞到目标位置
  var flyEl = fly;
  setTimeout(function() {
    flyEl.style.left = (toRect.left + toRect.width / 2 - 22) + 'px';
    flyEl.style.top = (toRect.top) + 'px';
  }, 30);

  // 飞行结束后更新 DOM
  setTimeout(function() {
    if (flyEl.parentNode) flyEl.remove();
    m1.selectedCol = -1;
    updateColumn(fromIdx);
    updateColumn(toIdx);
    document.getElementById('balanceSteps').textContent = '已移动：' + m1.steps + ' 步';
    m1.animating = false;
    updateBalanceHint();

    // 检查是否过关
    checkBalanceComplete();
  }, 500);
}

function checkBalanceComplete() {
  if (answered) return;

  // 所有柱子的值是否都等于平均值
  var allEqual = true;
  for (var i = 0; i < m1.values.length; i++) {
    if (m1.values[i] !== m1.answer) {
      allEqual = false;
      break;
    }
  }

  if (allEqual) {
    answered = true;

    // 显示平均线
    var avgLineEl = document.getElementById('balanceAvgLine');
    var avgLabelEl = document.getElementById('balanceAvgLabel');
    avgLineEl.classList.add('line-show');
    avgLabelEl.textContent = '✅ 平均数 = ' + m1.answer;
    avgLabelEl.classList.add('label-show');

    // 柱子变绿 + 闪光
    var desk = document.querySelector('.balance-desk');
    if (desk) desk.classList.add('desk-clear');

    // 隐藏重置按钮
    document.getElementById('balanceResetBtn').style.display = 'none';

    showToast('🎉', '太棒了！用了 ' + m1.steps + ' 步完成！', 1500);

    // 得分
    combo++;
    var pts = 10 + (combo >= 3 ? combo * 2 : 0);
    score += pts;
    earnedStars++; // 【修复 #7】
    addStars(1);
    spawnStarParticles(5);
    updateHUD();

    setTimeout(function() {
      currentLevel++;
      loadLevel();
    }, 1800);
  }
}

function resetMode1() {
  if (answered || m1.animating) return;

  m1.values = m1.origValues.slice();
  m1.selectedCol = -1;
  m1.steps = 0;
  m1.animating = false;

  renderBalanceColumns();
  updateBalanceHint();
  document.getElementById('balanceSteps').textContent = '已移动：0 步';
}


// ============================================================
// 模式2：嫌疑人排查（求平均数）
// ============================================================

function loadMode2() {
  var modeEl = document.getElementById('mode2');
  modeEl.classList.remove('hidden');

  var lv = LEVELS[2][currentLevel];
  document.getElementById('questionText').innerHTML = '';

  var deskEl = document.getElementById('suspectDesk');
  deskEl.innerHTML = '<div class="suspect-story">' + lv.story + '</div>'
    + '<div class="suspect-formula">' + lv.question + '</div>';

  var choicesEl = document.getElementById('suspectChoices');
  choicesEl.innerHTML = '';
  lv.choices.forEach(function(c) {
    var btn = document.createElement('button');
    btn.className = 'suspect-choice';
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
// 模式3：案件档案（复式条形统计图 — Canvas）
// ============================================================

function loadMode3() {
  var modeEl = document.getElementById('mode3');
  modeEl.classList.remove('hidden');

  var lv = LEVELS[3][currentLevel];
  document.getElementById('questionText').textContent = lv.title;
  document.getElementById('chartSubtitle').textContent = lv.subtitle;

  drawBarChart(lv);
  showChartQuestion(lv);
}

function drawBarChart(lv) {
  var canvas = document.getElementById('chartCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width;
  var H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  var padL = 50, padR = 20, padT = 30, padB = 50;
  var chartW = W - padL - padR;
  var chartH = H - padT - padB;

  var allVals = [];
  lv.series.forEach(function(s) { allVals = allVals.concat(s.data); });
  var maxVal = Math.max.apply(null, allVals);
  var niceMax = Math.ceil(maxVal / 10) * 10;

  ctx.fillStyle = '#FAFBFC';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#888';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'right';
  for (var i = 0; i <= 5; i++) {
    var yVal = Math.round(niceMax * i / 5);
    var yPos = padT + chartH - (chartH * i / 5);
    ctx.fillText(yVal, padL - 8, yPos + 4);
    ctx.strokeStyle = '#EEE';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, yPos);
    ctx.lineTo(padL + chartW, yPos);
    ctx.stroke();
  }

  ctx.strokeStyle = '#CCC';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padL, padT + chartH);
  ctx.lineTo(padL + chartW, padT + chartH);
  ctx.stroke();

  var catCount = lv.categories.length;
  var groupW = chartW / catCount;
  var barCount = lv.series.length;
  var barW = Math.min(30, (groupW - 20) / barCount);
  var barGap = 4;

  for (var ci = 0; ci < catCount; ci++) {
    var groupX = padL + ci * groupW + groupW / 2;
    ctx.fillStyle = '#555';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(lv.categories[ci], groupX, padT + chartH + 22);

    for (var si = 0; si < barCount; si++) {
      var val = lv.series[si].data[ci];
      var barH = (val / niceMax) * chartH;
      var x = groupX - (barCount * barW + (barCount - 1) * barGap) / 2 + si * (barW + barGap);
      var y = padT + chartH - barH;

      var grad = ctx.createLinearGradient(x, y, x, padT + chartH);
      grad.addColorStop(0, lv.series[si].color);
      grad.addColorStop(1, adjustColor(lv.series[si].color, -30));
      ctx.fillStyle = grad;
      roundRect(ctx, x, y, barW, barH, 4);
      ctx.fill();

      ctx.fillStyle = '#333';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(val, x + barW / 2, y - 5);
    }
  }

  var legendX = padL + 10;
  var legendY = padT + 8;
  for (var si = 0; si < barCount; si++) {
    ctx.fillStyle = lv.series[si].color;
    ctx.fillRect(legendX, legendY + si * 18, 12, 12);
    ctx.fillStyle = '#555';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(lv.series[si].name, legendX + 16, legendY + si * 18 + 10);
  }
}

function showChartQuestion(lv) {
  var q = lv.questions[chartQIdx];
  document.getElementById('chartQuestion').textContent = q.question;

  var choicesEl = document.getElementById('chartChoices');
  choicesEl.innerHTML = '';
  q.choices.forEach(function(c) {
    var btn = document.createElement('button');
    btn.className = 'chart-choice';
    btn.textContent = (typeof c === 'string') ? c : formatNum(c);
    btn.onclick = function() {
      if (answered) return;
      var userAns = this.textContent;
      var correctAns = (typeof q.answer === 'string') ? q.answer : formatNum(q.answer);
      if (userAns === correctAns || (typeof q.answer === 'number' && Math.abs(parseFloat(userAns) - q.answer) < 0.05)) {
        this.classList.add('correct');
        onCorrect();
      } else {
        this.classList.add('wrong');
        onWrong();
      }
    };
    choicesEl.appendChild(btn);
  });
  updateProgress();
}

function roundRect(ctx, x, y, w, h, r) {
  if (h < 0) { y += h; h = -h; }
  if (h < r * 2) r = h / 2;
  if (w < r * 2) r = w / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, 0);
  ctx.arcTo(x, y + h, x, y, 0);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function adjustColor(hex, amount) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


// ============================================================
// 模式4：终极破案（综合选择）
// ============================================================

function loadMode4() {
  var modeEl = document.getElementById('mode4');
  modeEl.classList.remove('hidden');

  var lv = LEVELS[4][currentLevel];
  document.getElementById('questionText').innerHTML = '';

  var deskEl = document.getElementById('finalDesk');
  deskEl.innerHTML = '<div class="final-story">' + lv.story + '</div>'
    + '<div class="final-formula">' + lv.question + '</div>';

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
