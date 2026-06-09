/**
 * 🪞 魔法变形镜 - 第七单元：图形的运动（二）
 *
 * 四个章节：
 *   1. 照妖镜    — 判断轴对称（Canvas画图形 + 对称轴动画）
 *   2. 魔法补全  — 选出轴对称的另一半
 *   3. 滑板大冒险 — 平移（网格上选方向+距离）
 *   4. 魔法工厂  — 综合选择题
 */

// ============================================================
// 关卡数据
// ============================================================

var LEVELS = {

  // ===== 第一章：照妖镜（判断轴对称）=====
  // name: 图形名  sym: 是否对称  draw: 绘图函数名  axis: 对称轴描述
  1: [
    {
      name: '等腰三角形', sym: true,
      axis: '1条对称轴（竖直）',
      draw: function(ctx, w, h) {
        ctx.beginPath();
        ctx.moveTo(w/2, 30); ctx.lineTo(50, h-40); ctx.lineTo(w-50, h-40);
        ctx.closePath(); ctx.fillStyle = '#BB8FCE'; ctx.fill();
        ctx.strokeStyle = '#6C3483'; ctx.lineWidth = 3; ctx.stroke();
      }
    },
    {
      name: '平行四边形', sym: false,
      axis: '',
      draw: function(ctx, w, h) {
        ctx.beginPath();
        ctx.moveTo(70, 60); ctx.lineTo(w-30, 60); ctx.lineTo(w-70, h-60); ctx.lineTo(30, h-60);
        ctx.closePath(); ctx.fillStyle = '#F1948A'; ctx.fill();
        ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 3; ctx.stroke();
      }
    },
    {
      name: '正方形', sym: true,
      axis: '4条对称轴',
      draw: function(ctx, w, h) {
        var s = Math.min(w, h) * 0.55;
        var x = (w - s) / 2, y = (h - s) / 2;
        ctx.fillStyle = '#85C1E9'; ctx.fillRect(x, y, s, s);
        ctx.strokeStyle = '#2471A3'; ctx.lineWidth = 3; ctx.strokeRect(x, y, s, s);
      }
    },
    {
      name: '字母 S', sym: false,
      axis: '',
      draw: function(ctx, w, h) {
        ctx.font = 'bold 140px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = '#F0B27A'; ctx.fillText('S', w/2, h/2);
        ctx.strokeStyle = '#CA6F1E'; ctx.lineWidth = 2; ctx.strokeText('S', w/2, h/2);
      }
    },
    {
      name: '心形', sym: true,
      axis: '1条对称轴（竖直）',
      draw: function(ctx, w, h) {
        var cx = w/2, cy = h/2;
        ctx.beginPath();
        ctx.moveTo(cx, cy + 60);
        ctx.bezierCurveTo(cx - 90, cy - 10, cx - 90, cy - 70, cx, cy - 30);
        ctx.bezierCurveTo(cx + 90, cy - 70, cx + 90, cy - 10, cx, cy + 60);
        ctx.closePath();
        ctx.fillStyle = '#E74C3C'; ctx.fill();
        ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 3; ctx.stroke();
      }
    },
    {
      name: '字母 A', sym: true,
      axis: '1条对称轴（竖直）',
      draw: function(ctx, w, h) {
        ctx.font = 'bold 150px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = '#76D7C4'; ctx.fillText('A', w/2, h/2);
        ctx.strokeStyle = '#1ABC9C'; ctx.lineWidth = 2; ctx.strokeText('A', w/2, h/2);
      }
    },
    {
      name: '箭头 →', sym: false,
      axis: '',
      draw: function(ctx, w, h) {
        ctx.beginPath();
        ctx.moveTo(30, h/2); ctx.lineTo(w/2 - 20, h/2);
        ctx.lineTo(w/2 - 20, 40); ctx.lineTo(w - 30, h/2);
        ctx.lineTo(w/2 - 20, h - 40); ctx.lineTo(w/2 - 20, h/2);
        ctx.closePath();
        ctx.fillStyle = '#F7DC6F'; ctx.fill();
        ctx.strokeStyle = '#D4AC0D'; ctx.lineWidth = 3; ctx.stroke();
      }
    },
    {
      name: '五角星', sym: true,
      axis: '5条对称轴',
      draw: function(ctx, w, h) {
        var cx = w/2, cy = h/2, r = 80, ir = 35;
        ctx.beginPath();
        for (var i = 0; i < 5; i++) {
          var a1 = (i * 72 - 90) * Math.PI / 180;
          var a2 = ((i * 72) + 36 - 90) * Math.PI / 180;
          if (i === 0) ctx.moveTo(cx + r * Math.cos(a1), cy + r * Math.sin(a1));
          else ctx.lineTo(cx + r * Math.cos(a1), cy + r * Math.sin(a1));
          ctx.lineTo(cx + ir * Math.cos(a2), cy + ir * Math.sin(a2));
        }
        ctx.closePath();
        ctx.fillStyle = '#F9E79F'; ctx.fill();
        ctx.strokeStyle = '#D4AC0D'; ctx.lineWidth = 3; ctx.stroke();
      }
    }
  ],

  // ===== 第二章：魔法补全（选另一半）=====
  // halfDraw: 画左半边  options: [{correct, draw}]
  2: [
    {
      hint: '这是一棵树的一半',
      halfDraw: function(ctx, w, h) {
        // 树干
        ctx.fillStyle = '#8B4513'; ctx.fillRect(w/2 - 15, h/2, 30, h/2 - 20);
        // 树冠左半
        ctx.beginPath();
        ctx.moveTo(w/2, 40);
        ctx.lineTo(30, h/2 + 10);
        ctx.lineTo(w/2, h/2 + 10);
        ctx.closePath();
        ctx.fillStyle = '#27AE60'; ctx.fill();
        ctx.strokeStyle = '#1E8449'; ctx.lineWidth = 2; ctx.stroke();
      },
      options: [
        {
          correct: true,
          draw: function(ctx, w, h) {
            ctx.fillStyle = '#8B4513'; ctx.fillRect(w/2 - 15, h/2, 30, h/2 - 20);
            ctx.beginPath();
            ctx.moveTo(w/2, 40); ctx.lineTo(w - 30, h/2 + 10); ctx.lineTo(w/2, h/2 + 10);
            ctx.closePath();
            ctx.fillStyle = '#27AE60'; ctx.fill();
            ctx.strokeStyle = '#1E8449'; ctx.lineWidth = 2; ctx.stroke();
          }
        },
        {
          correct: false,
          draw: function(ctx, w, h) {
            ctx.fillStyle = '#8B4513'; ctx.fillRect(w/2 - 15, h/2, 30, h/2 - 20);
            ctx.beginPath();
            ctx.moveTo(w/2, 60); ctx.lineTo(w - 20, h/2 - 10); ctx.lineTo(w/2, h/2 + 20);
            ctx.closePath();
            ctx.fillStyle = '#27AE60'; ctx.fill();
            ctx.strokeStyle = '#1E8449'; ctx.lineWidth = 2; ctx.stroke();
          }
        },
        {
          correct: false,
          draw: function(ctx, w, h) {
            ctx.fillStyle = '#8B4513'; ctx.fillRect(w/2 - 15, h/2, 30, h/2 - 20);
            ctx.beginPath();
            ctx.moveTo(w/2, 30); ctx.lineTo(w - 50, h/2 + 30); ctx.lineTo(w/2, h/2);
            ctx.closePath();
            ctx.fillStyle = '#E74C3C'; ctx.fill();
            ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 2; ctx.stroke();
          }
        }
      ]
    },
    {
      hint: '这是一座房子的半边',
      halfDraw: function(ctx, w, h) {
        // 墙壁左半
        ctx.fillStyle = '#F5CBA7'; ctx.fillRect(w/2, h/2 - 20, -w/2 + 30, h/2 - 20);
        ctx.strokeStyle = '#AF601A'; ctx.lineWidth = 2; ctx.strokeRect(w/2, h/2 - 20, -w/2 + 30, h/2 - 20);
        // 屋顶左半
        ctx.beginPath();
        ctx.moveTo(w/2, 40); ctx.lineTo(30, h/2 - 20); ctx.lineTo(w/2, h/2 - 20);
        ctx.closePath();
        ctx.fillStyle = '#E74C3C'; ctx.fill();
        ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 2; ctx.stroke();
        // 门
        ctx.fillStyle = '#8B4513'; ctx.fillRect(w/2 - 35, h - 55, 25, 35);
      },
      options: [
        {
          correct: false,
          draw: function(ctx, w, h) {
            ctx.fillStyle = '#F5CBA7'; ctx.fillRect(w/2, h/2 - 20, w/2 - 30, h/2 - 20);
            ctx.strokeStyle = '#AF601A'; ctx.lineWidth = 2; ctx.strokeRect(w/2, h/2 - 20, w/2 - 30, h/2 - 20);
            ctx.beginPath();
            ctx.moveTo(w/2, 60); ctx.lineTo(w - 30, h/2 - 20); ctx.lineTo(w/2, h/2 - 20);
            ctx.closePath();
            ctx.fillStyle = '#E74C3C'; ctx.fill();
          }
        },
        {
          correct: true,
          draw: function(ctx, w, h) {
            ctx.fillStyle = '#F5CBA7'; ctx.fillRect(w/2, h/2 - 20, w/2 - 30, h/2 - 20);
            ctx.strokeStyle = '#AF601A'; ctx.lineWidth = 2; ctx.strokeRect(w/2, h/2 - 20, w/2 - 30, h/2 - 20);
            ctx.beginPath();
            ctx.moveTo(w/2, 40); ctx.lineTo(w - 30, h/2 - 20); ctx.lineTo(w/2, h/2 - 20);
            ctx.closePath();
            ctx.fillStyle = '#E74C3C'; ctx.fill();
            ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 2; ctx.stroke();
            ctx.fillStyle = '#8B4513'; ctx.fillRect(w/2 + 10, h - 55, 25, 35);
          }
        },
        {
          correct: false,
          draw: function(ctx, w, h) {
            ctx.fillStyle = '#AED6F1'; ctx.fillRect(w/2, h/2 - 20, w/2 - 30, h/2 - 20);
            ctx.strokeStyle = '#2471A3'; ctx.lineWidth = 2; ctx.strokeRect(w/2, h/2 - 20, w/2 - 30, h/2 - 20);
            ctx.beginPath();
            ctx.moveTo(w/2, 40); ctx.lineTo(w - 30, h/2 - 20); ctx.lineTo(w/2, h/2 - 20);
            ctx.closePath();
            ctx.fillStyle = '#F9E79F'; ctx.fill();
          }
        }
      ]
    },
    {
      hint: '这是一只蝴蝶的左翅',
      halfDraw: function(ctx, w, h) {
        // 身体
        ctx.fillStyle = '#2C3E50';
        ctx.fillRect(w/2 - 4, 50, 8, h - 100);
        // 左翅
        ctx.beginPath();
        ctx.moveTo(w/2, 70);
        ctx.bezierCurveTo(30, 40, 20, h/2, 40, h - 50);
        ctx.lineTo(w/2, h - 60);
        ctx.closePath();
        ctx.fillStyle = '#BB8FCE'; ctx.fill();
        ctx.strokeStyle = '#6C3483'; ctx.lineWidth = 2; ctx.stroke();
        // 触角
        ctx.beginPath(); ctx.moveTo(w/2 - 2, 50);
        ctx.quadraticCurveTo(w/2 - 30, 20, w/2 - 40, 15);
        ctx.strokeStyle = '#2C3E50'; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(w/2 - 40, 15, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#2C3E50'; ctx.fill();
      },
      options: [
        {
          correct: false,
          draw: function(ctx, w, h) {
            ctx.fillStyle = '#2C3E50'; ctx.fillRect(w/2 - 4, 50, 8, h - 100);
            ctx.beginPath();
            ctx.moveTo(w/2, 90);
            ctx.bezierCurveTo(w - 20, 50, w - 30, h/2 + 20, w - 50, h - 40);
            ctx.lineTo(w/2, h - 50);
            ctx.closePath();
            ctx.fillStyle = '#F1948A'; ctx.fill();
          }
        },
        {
          correct: false,
          draw: function(ctx, w, h) {
            ctx.fillStyle = '#2C3E50'; ctx.fillRect(w/2 - 4, 50, 8, h - 100);
            ctx.beginPath();
            ctx.moveTo(w/2, 70);
            ctx.bezierCurveTo(w - 30, 40, w - 20, h/2, w - 40, h - 50);
            ctx.lineTo(w/2, h - 60);
            ctx.closePath();
            ctx.fillStyle = '#85C1E9'; ctx.fill();
            ctx.strokeStyle = '#2471A3'; ctx.lineWidth = 2; ctx.stroke();
          }
        },
        {
          correct: true,
          draw: function(ctx, w, h) {
            ctx.fillStyle = '#2C3E50'; ctx.fillRect(w/2 - 4, 50, 8, h - 100);
            ctx.beginPath();
            ctx.moveTo(w/2, 70);
            ctx.bezierCurveTo(w - 30, 40, w - 20, h/2, w - 40, h - 50);
            ctx.lineTo(w/2, h - 60);
            ctx.closePath();
            ctx.fillStyle = '#BB8FCE'; ctx.fill();
            ctx.strokeStyle = '#6C3483'; ctx.lineWidth = 2; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(w/2 + 2, 50);
            ctx.quadraticCurveTo(w/2 + 30, 20, w/2 + 40, 15);
            ctx.strokeStyle = '#2C3E50'; ctx.lineWidth = 2; ctx.stroke();
            ctx.beginPath(); ctx.arc(w/2 + 40, 15, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#2C3E50'; ctx.fill();
          }
        }
      ]
    },
    {
      hint: '这是一颗半星',
      halfDraw: function(ctx, w, h) {
        var cx = w/2, cy = h/2, r = 70, ir = 30;
        ctx.beginPath();
        var a0 = -90 * Math.PI / 180;
        ctx.moveTo(cx, cy - r);
        var a1 = (-90 + 36) * Math.PI / 180;
        ctx.lineTo(cx + ir * Math.cos(a1), cy + ir * Math.sin(a1));
        var a2 = (-90 + 72) * Math.PI / 180;
        ctx.lineTo(cx + r * Math.cos(a2), cy + r * Math.sin(a2));
        var a3 = (-90 + 108) * Math.PI / 180;
        ctx.lineTo(cx + ir * Math.cos(a3), cy + ir * Math.sin(a3));
        ctx.lineTo(cx, cy);
        ctx.closePath();
        ctx.fillStyle = '#F9E79F'; ctx.fill();
        ctx.strokeStyle = '#D4AC0D'; ctx.lineWidth = 2; ctx.stroke();
      },
      options: [
        {
          correct: true,
          draw: function(ctx, w, h) {
            var cx = w/2, cy = h/2, r = 70, ir = 30;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            var a3 = (-90 + 108) * Math.PI / 180;
            ctx.lineTo(cx + ir * Math.cos(a3), cy + ir * Math.sin(a3));
            var a4 = (-90 + 144) * Math.PI / 180;
            ctx.lineTo(cx + r * Math.cos(a4), cy + r * Math.sin(a4));
            var a5 = (-90 + 180) * Math.PI / 180;
            ctx.lineTo(cx + ir * Math.cos(a5), cy + ir * Math.sin(a5));
            var a6 = (-90 + 216) * Math.PI / 180;
            ctx.lineTo(cx + r * Math.cos(a6), cy + r * Math.sin(a6));
            var a7 = (-90 + 252) * Math.PI / 180;
            ctx.lineTo(cx + ir * Math.cos(a7), cy + ir * Math.sin(a7));
            ctx.lineTo(cx, cy - r);
            ctx.closePath();
            ctx.fillStyle = '#F9E79F'; ctx.fill();
            ctx.strokeStyle = '#D4AC0D'; ctx.lineWidth = 2; ctx.stroke();
          }
        },
        {
          correct: false,
          draw: function(ctx, w, h) {
            var cx = w/2, cy = h/2;
            ctx.beginPath();
            ctx.moveTo(cx, cy); ctx.lineTo(cx, h - 20);
            ctx.lineTo(w - 30, cy); ctx.lineTo(cx, cy - 40);
            ctx.closePath();
            ctx.fillStyle = '#AED6F1'; ctx.fill();
          }
        },
        {
          correct: false,
          draw: function(ctx, w, h) {
            var cx = w/2, cy = h/2;
            ctx.beginPath();
            ctx.moveTo(cx, cy); ctx.lineTo(w - 20, cy - 30);
            ctx.lineTo(w - 30, cy + 20); ctx.lineTo(cx, h - 30);
            ctx.closePath();
            ctx.fillStyle = '#F5CBA7'; ctx.fill();
          }
        }
      ]
    },
    {
      hint: '这是半个花瓶',
      halfDraw: function(ctx, w, h) {
        ctx.beginPath();
        ctx.moveTo(w/2, 30);
        ctx.bezierCurveTo(w/2 - 20, 50, w/2 - 60, 80, w/2 - 40, h/2);
        ctx.bezierCurveTo(w/2 - 30, h/2 + 30, w/2 - 50, h - 50, w/2, h - 40);
        ctx.lineTo(w/2, 30);
        ctx.closePath();
        ctx.fillStyle = '#85C1E9'; ctx.fill();
        ctx.strokeStyle = '#2471A3'; ctx.lineWidth = 2; ctx.stroke();
      },
      options: [
        {
          correct: false,
          draw: function(ctx, w, h) {
            ctx.beginPath();
            ctx.moveTo(w/2, 30);
            ctx.bezierCurveTo(w/2 + 30, 50, w/2 + 40, 80, w/2 + 30, h/2);
            ctx.lineTo(w/2, h - 40);
            ctx.lineTo(w/2, 30);
            ctx.closePath();
            ctx.fillStyle = '#85C1E9'; ctx.fill();
          }
        },
        {
          correct: false,
          draw: function(ctx, w, h) {
            ctx.beginPath();
            ctx.moveTo(w/2, 40);
            ctx.bezierCurveTo(w/2 + 20, 60, w/2 + 70, 100, w/2 + 50, h/2);
            ctx.bezierCurveTo(w/2 + 40, h/2 + 30, w/2 + 30, h - 50, w/2, h - 40);
            ctx.lineTo(w/2, 40);
            ctx.closePath();
            ctx.fillStyle = '#F1948A'; ctx.fill();
          }
        },
        {
          correct: true,
          draw: function(ctx, w, h) {
            ctx.beginPath();
            ctx.moveTo(w/2, 30);
            ctx.bezierCurveTo(w/2 + 20, 50, w/2 + 60, 80, w/2 + 40, h/2);
            ctx.bezierCurveTo(w/2 + 30, h/2 + 30, w/2 + 50, h - 50, w/2, h - 40);
            ctx.lineTo(w/2, 30);
            ctx.closePath();
            ctx.fillStyle = '#85C1E9'; ctx.fill();
            ctx.strokeStyle = '#2471A3'; ctx.lineWidth = 2; ctx.stroke();
          }
        }
      ]
    }
  ],

  // ===== 第三章：滑板大冒险（平移）=====
  // start: {col, row}  target: {col, row}  grid: 6x6
  3: [
    {
      start: {col: 1, row: 4}, target: {col: 4, row: 1},
      answerRight: 3, answerUp: 3,
      maxRight: 5, maxUp: 5,
      hint: '把角色滑到 ⭐ 的位置'
    },
    {
      start: {col: 2, row: 5}, target: {col: 5, row: 3},
      answerRight: 3, answerUp: 2,
      maxRight: 5, maxUp: 5,
      hint: '先想想要往右几格，再往上几格'
    },
    {
      start: {col: 0, row: 3}, target: {col: 3, row: 0},
      answerRight: 3, answerUp: 3,
      maxRight: 5, maxUp: 5,
      hint: '数清楚格子数！'
    },
    {
      start: {col: 1, row: 5}, target: {col: 5, row: 2},
      answerRight: 4, answerUp: 3,
      maxRight: 5, maxUp: 5,
      hint: '注意方向和距离'
    },
    {
      start: {col: 0, row: 4}, target: {col: 4, row: 1},
      answerRight: 4, answerUp: 3,
      maxRight: 5, maxUp: 5,
      hint: '看清起点和终点的位置'
    },
    {
      start: {col: 2, row: 5}, target: {col: 5, row: 1},
      answerRight: 3, answerUp: 4,
      maxRight: 5, maxUp: 5,
      hint: '平移时方向要对，格数要准'
    }
  ],

  // ===== 第四章：魔法工厂（综合）
  4: [
    {
      question: '把一个三角形向右平移 3 格，图形的形状和大小会怎样？',
      answer: '形状和大小都不变',
      choices: ['形状和大小都不变', '形状变了大小不变', '形状不变大小变了']
    },
    {
      question: '下面哪个图形是轴对称图形？',
      answer: '等腰三角形',
      choices: ['平行四边形', '等腰三角形', '不等边三角形']
    },
    {
      question: '一个正方形有 <span class="fq-highlight">几条对称轴</span>？',
      answer: '4条',
      choices: ['2条', '4条', '无数条']
    },
    {
      question: '平移后的图形和原图形相比，什么变了？',
      answer: '位置变了',
      choices: ['位置变了', '大小变了', '形状变了']
    },
    {
      question: '一个圆有 <span class="fq-highlight">几条对称轴</span>？',
      answer: '无数条',
      choices: ['1条', '2条', '无数条']
    },
    {
      question: '把字母 <span class="fq-highlight">M</span> 上下对折，能重合吗？',
      answer: '不能',
      choices: ['能', '不能']
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

var mode1Locked = false;
var mode2Locked = false;
var mode3Locked = false;
var mode3Right = 0;
var mode3Up = 0;
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
  mode3Right = 0;
  mode3Up = 0;
  mode4Locked = false;

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
  setTimeout(function() { currentLevel++; startLevel(); }, 1500);
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
// 模式1：照妖镜（判断轴对称）
// ============================================================

function startMode1() {
  var modeEl = document.getElementById('mode1');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;

  // 画图形
  var canvas = document.getElementById('mirrorCanvas');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  data.draw(ctx, canvas.width, canvas.height);

  // 重置对称轴和覆盖层
  var symLine = document.getElementById('symmetryLine');
  symLine.classList.remove('show');
  symLine.classList.add('hidden');

  var foldOv = document.getElementById('foldOverlay');
  foldOv.classList.add('hidden');
  foldOv.className = 'fold-overlay hidden';

  var label = document.getElementById('mirrorLabel');
  label.textContent = '';
  label.className = 'mirror-label';

  // 启用按钮
  document.getElementById('btnSymYes').disabled = false;
  document.getElementById('btnSymNo').disabled = false;

  document.getElementById('questionText').textContent = '「' + data.name + '」是对称图形吗？';
}

function judgeSymmetry(playerSaysSym) {
  if (mode1Locked) return;
  mode1Locked = true;

  var data = currentLevelData;
  document.getElementById('btnSymYes').disabled = true;
  document.getElementById('btnSymNo').disabled = true;

  var correct = (playerSaysSym === data.sym);
  var label = document.getElementById('mirrorLabel');

  if (data.sym) {
    // 是对称的 → 显示对称轴动画
    var symLine = document.getElementById('symmetryLine');
    symLine.classList.remove('hidden');
    setTimeout(function() { symLine.classList.add('show'); }, 50);
    label.textContent = '✅ 是对称图形！' + data.axis;
    label.className = 'mirror-label sym';
  } else {
    label.textContent = '❌ 不是对称图形，找不到对折重合的线';
    label.className = 'mirror-label nosym';
  }

  if (correct) { onCorrect(); }
  else { onWrong(); }
}

// ============================================================
// 模式2：魔法补全（选另一半）
// ============================================================

function startMode2() {
  var modeEl = document.getElementById('mode2');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;

  // 画左半边
  var canvas = document.getElementById('completeCanvas');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 画浅色网格背景
  ctx.strokeStyle = '#F0F0F0'; ctx.lineWidth = 1;
  for (var x = 0; x < canvas.width; x += 20) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (var y = 0; y < canvas.height; y += 20) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }

  data.halfDraw(ctx, canvas.width, canvas.height);

  // 生成选项
  var optionsEl = document.getElementById('completeOptions');
  optionsEl.innerHTML = '';

  var shuffled = data.options.slice();
  shuffleArray(shuffled);

  for (var i = 0; i < shuffled.length; i++) {
    (function(opt, idx) {
      var div = document.createElement('div');
      div.className = 'complete-option';
      div.dataset.correct = opt.correct ? '1' : '0';

      var optCanvas = document.createElement('canvas');
      optCanvas.width = 140;
      optCanvas.height = 110;
      div.appendChild(optCanvas);

      var optCtx = optCanvas.getContext('2d');
      // 画网格
      optCtx.strokeStyle = '#F0F0F0'; optCtx.lineWidth = 1;
      for (var ox = 0; ox < 140; ox += 20) {
        optCtx.beginPath(); optCtx.moveTo(ox, 0); optCtx.lineTo(ox, 110); optCtx.stroke();
      }
      for (var oy = 0; oy < 110; oy += 20) {
        optCtx.beginPath(); optCtx.moveTo(0, oy); optCtx.lineTo(140, oy); optCtx.stroke();
      }
      opt.draw(optCtx, 140, 110);

      div.onclick = function() { submitComplete(div); };
      optionsEl.appendChild(div);
    })(shuffled[i], i);
  }
}

function submitComplete(divEl) {
  if (mode2Locked) return;
  mode2Locked = true;

  var opts = document.querySelectorAll('.complete-option');
  for (var i = 0; i < opts.length; i++) opts[i].style.pointerEvents = 'none';

  if (divEl.dataset.correct === '1') {
    divEl.classList.add('correct');
    onCorrect();
  } else {
    divEl.classList.add('wrong');
    for (var j = 0; j < opts.length; j++) {
      if (opts[j].dataset.correct === '1') opts[j].classList.add('correct');
    }
    onWrong();
  }
}

// ============================================================
// 模式3：滑板大冒险（平移）
// ============================================================

function startMode3() {
  var modeEl = document.getElementById('mode3');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;
  mode3Right = 0;
  mode3Up = 0;

  drawGrid();

  // 生成数字按钮
  buildSlideBtns('slideRight', data.maxRight, 'right');
  buildSlideBtns('slideUp', data.maxUp, 'up');

  document.getElementById('slideGoBtn').disabled = false;
}

function buildSlideBtns(containerId, max, dir) {
  var el = document.getElementById(containerId);
  el.innerHTML = '';
  for (var i = 0; i <= max; i++) {
    var btn = document.createElement('button');
    btn.className = 'slide-num' + (i === 0 ? ' selected' : '');
    btn.textContent = i;
    btn.dataset.val = i;
    btn.dataset.dir = dir;
    btn.onclick = function() {
      selectSlideNum(this, this.dataset.dir, parseInt(this.dataset.val));
    };
    el.appendChild(btn);
  }
}

function selectSlideNum(btnEl, dir, val) {
  // 取消同组其他选中
  var siblings = btnEl.parentNode.querySelectorAll('.slide-num');
  for (var i = 0; i < siblings.length; i++) siblings[i].classList.remove('selected');
  btnEl.classList.add('selected');

  if (dir === 'right') mode3Right = val;
  else mode3Up = val;

  drawGrid();
}

function drawGrid() {
  var canvas = document.getElementById('gridCanvas');
  var ctx = canvas.getContext('2d');
  var w = canvas.width, h = canvas.height;
  var data = currentLevelData;

  ctx.clearRect(0, 0, w, h);

  var gridSize = 6;
  var cellW = (w - 20) / gridSize;
  var cellH = (h - 20) / gridSize;
  var ox = 10, oy = 10;

  // 画网格
  ctx.strokeStyle = '#D0D8E0'; ctx.lineWidth = 1;
  for (var c = 0; c <= gridSize; c++) {
    ctx.beginPath();
    ctx.moveTo(ox + c * cellW, oy);
    ctx.lineTo(ox + c * cellW, oy + gridSize * cellH);
    ctx.stroke();
  }
  for (var r = 0; r <= gridSize; r++) {
    ctx.beginPath();
    ctx.moveTo(ox, oy + r * cellH);
    ctx.lineTo(ox + gridSize * cellW, oy + r * cellH);
    ctx.stroke();
  }

  // 画目标 ⭐
  var tx = ox + data.target.col * cellW + cellW / 2;
  var ty = oy + data.target.row * cellH + cellH / 2;
  ctx.font = '28px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('⭐', tx, ty);

  // 画平移预览路径（虚线箭头）
  if (mode3Right > 0 || mode3Up > 0) {
    var sx = ox + data.start.col * cellW + cellW / 2;
    var sy = oy + data.start.row * cellH + cellH / 2;
    var ex = ox + (data.start.col + mode3Right) * cellW + cellW / 2;
    var ey = oy + (data.start.row - mode3Up) * cellH + cellH / 2;

    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = '#3498DB'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.setLineDash([]);

    // 预览角色位置（半透明）
    ctx.globalAlpha = 0.4;
    ctx.font = '28px Arial';
    ctx.fillText('🛹', ex, ey);
    ctx.globalAlpha = 1;
  }

  // 画角色 🛹（起点）
  var sx = ox + data.start.col * cellW + cellW / 2;
  var sy = oy + data.start.row * cellH + cellH / 2;
  ctx.font = '28px Arial';
  ctx.fillText('🛹', sx, sy);
}

function executeSlide() {
  if (mode3Locked) return;
  mode3Locked = true;

  var data = currentLevelData;
  document.getElementById('slideGoBtn').disabled = true;

  var correct = (mode3Right === data.answerRight && mode3Up === data.answerUp);

  // 滑动动画
  var canvas = document.getElementById('gridCanvas');
  var ctx = canvas.getContext('2d');
  var w = canvas.width, h = canvas.height;
  var gridSize = 6;
  var cellW = (w - 20) / gridSize;
  var cellH = (h - 20) / gridSize;
  var ox = 10, oy = 10;

  var startCol = data.start.col;
  var startRow = data.start.row;
  var endCol = startCol + mode3Right;
  var endRow = startRow - mode3Up;

  // 动画参数
  var frames = 30;
  var frame = 0;
  var startPx = { x: ox + startCol * cellW + cellW / 2, y: oy + startRow * cellH + cellH / 2 };
  var endPx = { x: ox + endCol * cellW + cellW / 2, y: oy + endRow * cellH + cellH / 2 };

  // 保存轨迹
  var trail = [];

  function animFrame() {
    frame++;
    var t = frame / frames;
    var cx = startPx.x + (endPx.x - startPx.x) * t;
    var cy = startPx.y + (endPx.y - startPx.y) * t;
    trail.push({x: cx, y: cy});

    // 重绘
    drawGridStatic(ctx, w, h, data, gridSize, cellW, cellH, ox, oy);

    // 画轨迹
    if (trail.length > 1) {
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (var k = 1; k < trail.length; k++) ctx.lineTo(trail[k].x, trail[k].y);
      ctx.strokeStyle = 'rgba(52,152,219,0.5)'; ctx.lineWidth = 4;
      ctx.stroke();
    }

    // 画角色
    ctx.font = '28px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🛹', cx, cy);

    if (frame < frames) {
      requestAnimationFrame(animFrame);
    } else {
      // 动画结束
      if (correct) {
        onCorrect();
      } else {
        onWrong();
      }
    }
  }

  requestAnimationFrame(animFrame);
}

function drawGridStatic(ctx, w, h, data, gridSize, cellW, cellH, ox, oy) {
  ctx.clearRect(0, 0, w, h);

  ctx.strokeStyle = '#D0D8E0'; ctx.lineWidth = 1;
  for (var c = 0; c <= gridSize; c++) {
    ctx.beginPath();
    ctx.moveTo(ox + c * cellW, oy);
    ctx.lineTo(ox + c * cellW, oy + gridSize * cellH);
    ctx.stroke();
  }
  for (var r = 0; r <= gridSize; r++) {
    ctx.beginPath();
    ctx.moveTo(ox, oy + r * cellH);
    ctx.lineTo(ox + gridSize * cellW, oy + r * cellH);
    ctx.stroke();
  }

  // 目标
  var tx = ox + data.target.col * cellW + cellW / 2;
  var ty = oy + data.target.row * cellH + cellH / 2;
  ctx.font = '28px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('⭐', tx, ty);
}

// ============================================================
// 模式4：魔法工厂（综合选择题）
// ============================================================

function startMode4() {
  var modeEl = document.getElementById('mode4');
  modeEl.classList.remove('hidden');

  var data = currentLevelData;
  document.getElementById('factoryQuestion').innerHTML = data.question;

  // 不需要 canvas 的题目，隐藏
  var canvasWrap = document.querySelector('.factory-canvas-wrap');
  canvasWrap.style.display = 'none';

  var choicesEl = document.getElementById('factoryChoices');
  choicesEl.innerHTML = '';
  var shuffled = data.choices.slice();
  shuffleArray(shuffled);
  for (var i = 0; i < shuffled.length; i++) {
    var btn = document.createElement('button');
    btn.className = 'factory-choice';
    btn.textContent = shuffled[i];
    btn.dataset.value = shuffled[i];
    btn.onclick = function() { submitFactory(this); };
    choicesEl.appendChild(btn);
  }
}

function submitFactory(btnEl) {
  if (mode4Locked) return;
  mode4Locked = true;

  var data = currentLevelData;
  var btns = document.querySelectorAll('.factory-choice');
  for (var i = 0; i < btns.length; i++) btns[i].disabled = true;

  if (btnEl.dataset.value === data.answer) {
    btnEl.classList.add('correct');
    onCorrect();
  } else {
    btnEl.classList.add('wrong');
    for (var j = 0; j < btns.length; j++) {
      if (btns[j].dataset.value === data.answer) btns[j].classList.add('correct');
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
  document.getElementById('resultTitle').textContent = allDone ? '全部通关！变形大师！' : '别灰心，再来一次！';

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

  var chapterNames = { 1:'轴对称判断', 2:'补全轴对称图形', 3:'平移', 4:'对称与平移综合' };
  var chapterTips = {
    1: '如果一个图形沿一条直线对折，两侧能够完全重合，这个图形就是轴对称图形。这条直线叫对称轴。',
    2: '补全轴对称图形的方法：找到关键点，在对称轴另一侧找到对称点，连线。注意：对应点到对称轴的距离相等！',
    3: '平移是物体沿着一条直线移动。平移不改变图形的形状、大小和方向，只改变位置。要注意方向（上下左右）和距离（几格）。',
    4: '轴对称和平移都不改变图形的形状和大小。对称关注的是"折叠重合"，平移关注的是"方向和距离"。'
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

initStars();
