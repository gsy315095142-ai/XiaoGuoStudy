/**
 * 🏗️ 积木建筑师 - 第二单元：观察物体（二）
 * 核心玩法：
 *   📸 拍照模式：看立体 → 选视图
 *   🏗️ 建造模式：看视图 → 搭积木
 *
 * 纯 CSS/JS 等轴视角渲染，无需 WebGL
 */

// ========== 游戏状态 ==========
var mode = 'photo';       // 'photo' | 'build'
var currentChapter = 1;   // 1=拍照简单, 2=拍照进阶, 3=建造
var currentLevel = 0;     // 当前关卡索引
var stars = 0;            // 本关获得星星
var totalLevelStars = 0;  // 累计关卡星星
var lives = 3;            // 剩余生命
var combo = 0;            // 连击
var score = 0;            // 得分
var answered = false;     // 当前题是否已答
var photoTimer = null;    // 拍照模式计时器
var photoTimeLeft = 0;    // 拍照模式剩余时间

// 建造模式状态
var buildGrid = {};       // {'x,y': z}  当前搭建的积木
var buildCheckInterval = null;
var buildStartTime = 0;
var buildTarget = null;   // 当前关卡目标积木配置

// 视角切换
var currentView = 'iso';  // 'iso' | 'front' | 'top' | 'left'

// 方块配色
var BLOCK_COLORS = {
  top: '#FFD93D',
  front: '#F4A7C1',
  right: '#7EC8E3',
  outline: '#E8769A'
};

// 方向颜色映射
var DIR_COLORS = {
  top: '#FFD93D',
  front: '#F4A7C1',
  left: '#7EC8E3'
};

var DIR_NAMES = {
  top: '上面',
  front: '正面',
  left: '左面'
};

// ========== 关卡数据 ==========
// 积木数据格式：数组，每个元素 [x, y, z] 表示该位置有一个方块
// x=列(0-3,左右), y=行(0-3,前后), z=层(0-3,上下)
//
// 视图投影规则（正交投影，同一条视线上只看到最前面的）：
//   正面(front)：从 y负方向 看向 y正方向 → 投影到 (x, z) 面
//     px = x,  py = z
//   上面(top)：从 z正方向 看向 z负方向 → 投影到 (x, y) 面
//     px = x,  py = y
//   左面(left)：从 x负方向 看向 x正方向 → 投影到 (y, z) 面
//     px = y,  py = z

var LEVELS = {
  photo1: [
    // ===== 第一章 简单拍照 2~3个方块 =====
    // 第1题：两块并排
    {
      blocks: [[0,0,0],[1,0,0]],
      question: '从正面看是什么形状？（看前面的粉色面）',
      view: 'front',
      // 正面投影：(0,0),(1,0) → 两个并排格子
      options: [
        [[0,0],[1,0]],       // A: 两格并排 □□
        [[0,0]],             // B: 单格 □
        [[0,0],[0,1]]        // C: 两格竖着 □/□
      ],
      answer: 0,  // A
      hint: '从正面看，两块方块并排，所以是两个并排的格子。'
    },
    // 第2题：叠高两块
    {
      blocks: [[0,0,0],[0,0,1]],
      question: '从正面看是什么形状？（从粉色面方向看过去）',
      view: 'front',
      // 正面投影：(0,0),(0,1) → 两个竖着
      options: [
        [[0,0],[0,1]],       // A: 两格竖着 □/□
        [[0,0],[1,0]],       // B: 两格并排 □□
        [[0,0]]              // C: 单格 □
      ],
      answer: 0,  // A（原来是2=C，已修正）
      hint: '两块方块上下叠在一起，从正面能看到上下两个格子。'
    },
    // 第3题：L形，问左面
    {
      blocks: [[0,0,0],[1,0,0],[0,0,1]],
      question: '从左面看是什么形状？（看蓝色面方向）',
      view: 'left',
      // 左面投影 px=y,py=z：(0,0),(0,0),(0,1) → {(0,0),(0,1)} 两格竖着
      options: [
        [[0,0],[0,1]],       // A: 两格竖着 □/□
        [[0,0]],             // B: 单格 □
        [[0,0],[1,0]]        // C: 两格并排 □□
      ],
      answer: 0,  // A（原来是1=B，已修正）
      hint: '从左面看，所有方块的 y 都等于 0，叠成一列；但 z 有 0 和 1 两层，所以是两格竖着。'
    },
    // 第4题：L形，问上面
    {
      blocks: [[0,0,0],[1,0,0],[1,1,0]],
      question: '从上面看是什么形状？（看黄色面方向）',
      view: 'top',
      // 上面投影 px=x,py=y：(0,0),(1,0),(1,1) → L形
      options: [
        [[0,0],[1,0],[1,1]], // A: L形
        [[0,0],[1,0]],       // B: 两格并排
        [[0,0],[1,1]]        // C: 对角
      ],
      answer: 0,  // A
      hint: '从上面看可以看到所有方块的位置，是L形。'
    },
    // 第5题：三块L+叠高，问正面
    {
      blocks: [[0,0,0],[1,0,0],[0,0,1]],
      question: '从正面看是什么形状？（从粉色面方向看过去）',
      view: 'front',
      // 正面投影 px=x,py=z：(0,0),(1,0),(0,1) → L形
      options: [
        [[0,0],[0,1]],              // A: 两格竖着
        [[0,0],[1,0]],              // B: 两格并排
        [[0,0],[1,0],[0,1]]         // C: L形（三格）
      ],
      answer: 2,  // C（原来是1=B，已修正）
      hint: '从正面看，底层两格并排，还有一格在上面左边，形成L形。'
    }
  ],
  photo2: [
    // ===== 第二章 进阶拍照 3~5个方块 =====
    // 第1题：4块，问正面
    {
      blocks: [[0,0,0],[1,0,0],[0,1,0],[1,0,1]],
      question: '从正面看是什么形状？（从粉色面方向看过去）',
      view: 'front',
      // 正面投影 px=x,py=z：
      //   (0,0),(1,0),(0,0),(1,1) → {(0,0),(1,0),(1,1)} L形
      options: [
        [[0,0],[1,0],[0,1]],       // A: 底部两格+左上
        [[0,0],[1,0],[1,1]],       // B: 底部两格+右上（L形）
        [[0,0],[1,0]]              // C: 两格并排
      ],
      answer: 1,  // B（原来是2=C，已修正）
      hint: '底层两格并排，右边上面还有一格（[1,0,1]投到(1,1)），形成L形。'
    },
    // 第2题：4块平铺，问上面
    {
      blocks: [[0,0,0],[1,0,0],[0,1,0],[1,1,0]],
      question: '从上面看是什么形状？（看黄色面方向）',
      view: 'top',
      // 上面投影：(0,0),(1,0),(0,1),(1,1) → 2×2正方形
      options: [
        [[0,0],[1,0],[0,1],[1,1]], // A: 2×2正方形
        [[0,0],[1,0],[0,1]],       // B: L形
        [[0,0],[1,0]]              // C: 两格并排
      ],
      answer: 0,  // A
      hint: '四个方块在同一层铺开，从上面看是2×2正方形。'
    },
    // 第3题：一列3层+旁边1个，问左面
    {
      blocks: [[0,0,0],[0,0,1],[0,0,2],[1,0,0]],
      question: '从左面看是什么形状？（看蓝色面方向）',
      view: 'left',
      // 左面投影 px=y,py=z：
      //   (0,0),(0,1),(0,2),(0,0) → {(0,0),(0,1),(0,2)} 一列3格
      options: [
        [[0,0],[0,1],[0,2]],       // A: 一列3格竖着
        [[0,0]],                   // B: 单格
        [[0,0],[1,0]]              // C: 两格并排
      ],
      answer: 0,  // A（原来是1=B，已修正）
      hint: '从左面看，所有方块的 y 都等于 0，但 z 有 0、1、2 三层，所以是一列3格。'
    },
    // 第4题：前排2+后排2，问正面
    {
      blocks: [[0,0,0],[1,0,0],[0,0,1],[1,0,1]],
      question: '从正面看是什么形状？（从粉色面方向看过去）',
      view: 'front',
      // 正面投影：(0,0),(1,0),(0,1),(1,1) → 2×2正方形
      options: [
        [[0,0],[1,0],[0,1],[1,1]], // A: 2×2正方形
        [[0,0],[1,0]],             // B: 两格并排
        [[0,0],[0,1]]              // C: 两格竖着
      ],
      answer: 0,  // A
      hint: '底层2格并排，上层也有2格并排，从正面看是2×2正方形。'
    },
    // 第5题：5块，问左面
    {
      blocks: [[0,0,0],[1,0,0],[0,1,0],[0,0,1]],
      question: '从左面看是什么形状？（看蓝色面方向）',
      view: 'left',
      // 左面投影 px=y,py=z：
      //   (0,0),(0,0),(1,0),(0,1) → {(0,0),(1,0),(0,1)} L形
      options: [
        [[0,0],[0,1]],             // A: 两格竖着
        [[0,0],[1,0],[0,1]],       // B: L形（三格）
        [[0,0],[1,0]]              // C: 两格并排
      ],
      answer: 1,  // B（原来是0=A，已修正）
      hint: '从左面看，y=0处有两层高(0,0)(0,1)，y=1处有一层(1,0)，形成L形。'
    },
    // 第6题：5块，问上面
    {
      blocks: [[0,0,0],[1,0,0],[0,1,0],[0,0,1],[1,0,1]],
      question: '从上面看是什么形状？（看黄色面方向）',
      view: 'top',
      // 上面投影：(0,0),(1,0),(0,1),(0,0),(1,0) → {(0,0),(1,0),(0,1)} L形
      options: [
        [[0,0],[1,0],[0,1]],       // A: L形
        [[0,0],[1,0],[0,1],[1,1]], // B: 2×2
        [[0,0],[1,0]]              // C: 两格并排
      ],
      answer: 0,  // A
      hint: '从上面看，5个方块分布在3个位置(x,y)，是L形。'
    }
  ],
  build: [
    // ===== 第三章 建造模式 =====
    // 第1关：两块并排（入门）
    {
      blocks: [[0,0,0],[1,0,0]],
      description: '根据正面视图搭建积木',
      showViews: ['front'],
      frontView: [[0,0],[1,0]],   // 投影 (0,0),(1,0) ✅
      topView: [[0,0],[1,0]],
      leftView: [[0,0]]
    },
    // 第2关：叠高两块
    {
      blocks: [[0,0,0],[0,0,1]],
      description: '根据正面视图搭建积木',
      showViews: ['front'],
      frontView: [[0,0],[0,1]],   // 投影 (0,0),(0,1) ✅
      topView: [[0,0]],
      leftView: [[0,0],[0,1]]
    },
    // 第3关：三块L+叠高
    {
      blocks: [[0,0,0],[1,0,0],[0,0,1]],
      description: '根据正面和上面视图搭建积木',
      showViews: ['front', 'top'],
      frontView: [[0,0],[1,0],[0,1]],  // 投影 (0,0),(1,0),(0,1)（原为两格，已修正）
      topView: [[0,0],[1,0]],           // 投影 (0,0),(1,0) ✅
      leftView: [[0,0],[0,1]]
    },
    // 第4关：三块L形平铺
    {
      blocks: [[0,0,0],[1,0,0],[0,1,0]],
      description: '根据正面和上面视图搭建积木',
      showViews: ['front', 'top'],
      frontView: [[0,0],[1,0]],         // 投影 (0,0),(1,0) ✅
      topView: [[0,0],[1,0],[0,1]],     // 投影 (0,0),(1,0),(0,1) ✅
      leftView: [[0,0],[1,0]]           // 投影 (0,0),(1,0)（原为单格，已修正）
    },
    // 第5关：四块长方体
    {
      blocks: [[0,0,0],[1,0,0],[0,0,1],[1,0,1]],
      description: '根据三个视图搭建积木',
      showViews: ['front', 'top', 'left'],
      frontView: [[0,0],[1,0],[0,1],[1,1]],  // ✅
      topView: [[0,0],[1,0]],                 // ✅
      leftView: [[0,0],[0,1]]                 // ✅
    }
  ]
};

// ========== 方向标注 ==========
// 在等轴视图容器上叠加方向标签
function addDirectionTags(container, highlightView) {
  // 先移除旧标签
  container.querySelectorAll('.dir-tag').forEach(function(el) { el.remove(); });

  var tags = [
    { cls: 'dir-tag-top',    color: DIR_COLORS.top,    text: '⬆ 上面（黄色面）', dir: 'top' },
    { cls: 'dir-tag-front',  color: DIR_COLORS.front,  text: '⬅ 正面（粉色面）', dir: 'front' },
    { cls: 'dir-tag-left',   color: DIR_COLORS.left,   text: '左面（蓝色面）➡', dir: 'left' }
  ];

  tags.forEach(function(t) {
    var el = document.createElement('div');
    el.className = 'dir-tag ' + t.cls;
    if (highlightView === t.dir) el.classList.add('dir-active');
    el.innerHTML = '<span class="dir-dot" style="background:' + t.color + '"></span> ' + t.text;
    container.appendChild(el);
  });
}

// ========== 等轴视角渲染引擎 ==========
function renderIsoBlocks(container, blocks, viewMode, blockSize) {
  blockSize = blockSize || 40;
  container.innerHTML = '';

  if (viewMode === 'front') {
    renderOrthoView(container, blocks, 'front', blockSize);
    return;
  }
  if (viewMode === 'top') {
    renderOrthoView(container, blocks, 'top', blockSize);
    return;
  }
  if (viewMode === 'left') {
    renderOrthoView(container, blocks, 'left', blockSize);
    return;
  }

  // 等轴视角
  var scene = document.createElement('div');
  scene.className = 'iso-scene';
  scene.style.width = (blockSize * 6) + 'px';
  scene.style.height = (blockSize * 6) + 'px';
  scene.style.position = 'relative';
  scene.style.margin = '0 auto';

  // 计算每个方块的渲染位置和层级
  var sorted = blocks.slice().sort(function(a, b) {
    if (a[2] !== b[2]) return a[2] - b[2];
    if (a[0] !== b[0]) return a[0] - b[0];
    return b[1] - a[1];
  });

  sorted.forEach(function(block) {
    var el = createIsoBlock(block[0], block[1], block[2], blockSize);
    scene.appendChild(el);
  });

  container.appendChild(scene);
}

function createIsoBlock(x, y, z, size) {
  var el = document.createElement('div');
  el.className = 'iso-block';
  
  // 等轴坐标转换
  var isoX = (x - y) * size * 0.866;
  var isoY = (x + y) * size * 0.5 - z * size;

  el.style.position = 'absolute';
  el.style.left = '50%';
  el.style.top = '50%';
  el.style.marginLeft = (isoX - size * 0.72) + 'px';
  el.style.marginTop = (isoY - size * 0.72) + 'px';
  el.style.width = (size * 1.44) + 'px';
  el.style.height = (size * 1.44) + 'px';

  // SVG 等轴方块
  var s = size * 0.72;
  var w = s * 1;
  var h = s * 0.6;

  var points = {
    top: (w/2)+',0 '+(w)+','+(h/2)+' '+(w/2)+','+h+' 0,'+(h/2),
    left: '0,'+(h/2)+' '+(w/2)+','+h+' '+(w/2)+','+(h+h)+' 0,'+(h+h/2),
    right: (w/2)+','+h+' '+w+','+(h/2)+' '+w+','+(h+h/2)+' '+(w/2)+','+(h+h)
  };

  el.innerHTML = '<svg viewBox="0 0 ' + w + ' ' + (h * 2) + '" width="' + (size * 1.44) + '" height="' + (size * 1.44) + '">' +
    '<polygon points="' + points.left + '" fill="' + BLOCK_COLORS.front + '" stroke="' + BLOCK_COLORS.outline + '" stroke-width="1.5"/>' +
    '<polygon points="' + points.right + '" fill="' + BLOCK_COLORS.right + '" stroke="' + BLOCK_COLORS.outline + '" stroke-width="1.5"/>' +
    '<polygon points="' + points.top + '" fill="' + BLOCK_COLORS.top + '" stroke="' + BLOCK_COLORS.outline + '" stroke-width="1.5"/>' +
    '</svg>';

  return el;
}

// 正交视图渲染（正面/上面/左面）
function renderOrthoView(container, blocks, viewDir, cellSize) {
  cellSize = cellSize || 36;
  
  var viewData = calculateView(blocks, viewDir);
  var grid = viewData.grid;
  var maxX = viewData.maxX;
  var maxY = viewData.maxY;

  var wrapper = document.createElement('div');
  wrapper.className = 'ortho-view ortho-' + viewDir;
  wrapper.style.display = 'inline-block';

  // 标签
  var label = document.createElement('div');
  label.className = 'view-label';
  var labels = { front: '📷 正面视图', top: '📷 上面视图', left: '📷 左面视图' };
  label.textContent = labels[viewDir] || viewDir;
  wrapper.appendChild(label);

  var table = document.createElement('div');
  table.className = 'view-grid';
  table.style.gridTemplateColumns = 'repeat(' + maxX + ', ' + cellSize + 'px)';
  table.style.gridTemplateRows = 'repeat(' + maxY + ', ' + cellSize + 'px)';

  for (var gy = 0; gy < maxY; gy++) {
    for (var gx = 0; gx < maxX; gx++) {
      var cell = document.createElement('div');
      cell.className = 'view-cell';
      cell.style.width = cellSize + 'px';
      cell.style.height = cellSize + 'px';
      if (grid[gy] && grid[gy][gx]) {
        cell.classList.add('filled');
      }
      table.appendChild(cell);
    }
  }

  wrapper.appendChild(table);
  container.appendChild(wrapper);
}

// 计算视图（正面/上面/左面）
function calculateView(blocks, viewDir) {
  var grid = {};
  var maxX = 1;
  var maxY = 1;

  blocks.forEach(function(b) {
    var px, py;
    if (viewDir === 'front') {
      px = b[0];  // x
      py = b[2];  // z
    } else if (viewDir === 'top') {
      px = b[0];  // x
      py = b[1];  // y
    } else if (viewDir === 'left') {
      px = b[1];  // y
      py = b[2];  // z
    }
    if (!grid[py]) grid[py] = {};
    grid[py][px] = 1;
    if (px + 1 > maxX) maxX = px + 1;
    if (py + 1 > maxY) maxY = py + 1;
  });

  return { grid: grid, maxX: maxX, maxY: maxY };
}

// 将视图转为可比较的字符串
function viewToString(viewArr) {
  if (!viewArr || viewArr.length === 0) return '';
  return viewArr.map(function(p) { return p[0] + ',' + p[1]; }).sort().join('|');
}

// 检查视图是否匹配
function viewsMatch(actual, expected) {
  return viewToString(actual) === viewToString(expected);
}

// 将积木配置转为视图数组
function blocksToViewArr(blocks, viewDir) {
  var viewData = calculateView(blocks, viewDir);
  var result = [];
  for (var gy = 0; gy < viewData.maxY; gy++) {
    for (var gx = 0; gx < viewData.maxX; gx++) {
      if (viewData.grid[gy] && viewData.grid[gy][gx]) {
        result.push([gx, gy]);
      }
    }
  }
  return result;
}

// ========== 拍照模式 ==========
function startPhotoMode(chapter) {
  mode = 'photo';
  currentChapter = chapter;
  currentLevel = 0;
  score = 0;
  combo = 0;
  lives = 3;
  answered = false;
  photoTimeLeft = chapter === 1 ? 999 : 60;

  showScreen('gameScreen');
  loadPhotoLevel();
}

function loadPhotoLevel() {
  answered = false;
  var levels;
  if (currentChapter === 1) {
    levels = LEVELS.photo1;
  } else {
    levels = LEVELS.photo2;
  }

  if (currentLevel >= levels.length) {
    showPhotoResult();
    return;
  }

  var level = levels[currentLevel];

  // 更新UI
  updateHUD();

  // 关卡信息
  document.getElementById('levelInfo').textContent = '第 ' + (currentLevel + 1) + ' 题';
  document.getElementById('questionText').textContent = level.question;

  // 渲染立体（默认等轴视角）
  var isoContainer = document.getElementById('isoContainer');
  isoContainer.innerHTML = '';
  currentView = 'iso';
  renderIsoBlocks(isoContainer, level.blocks, 'iso', 44);

  // 叠加方向标签（高亮当前题目问的方向）
  addDirectionTags(isoContainer, level.view);

  // 更新底部方向提示面板
  updateDirectionPanel(level.view);

  // 视图切换按钮
  var viewBtns = document.getElementById('viewBtns');
  viewBtns.innerHTML = '';
  var views = ['iso', 'front', 'top', 'left'];
  var viewIcons = { iso: '🔄 立体', front: '🩷 正面', top: '🟨 上面', left: '🩵 左面' };
  views.forEach(function(v) {
    var btn = document.createElement('button');
    btn.className = 'view-btn' + (v === 'iso' ? ' active' : '');
    btn.textContent = viewIcons[v];
    btn.onclick = function() {
      currentView = v;
      document.querySelectorAll('.view-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      isoContainer.innerHTML = '';
      renderIsoBlocks(isoContainer, level.blocks, v, v === 'iso' ? 44 : 36);
      // 等轴视角才显示方向标签
      if (v === 'iso') {
        addDirectionTags(isoContainer, level.view);
      }
      // 更新方向提示面板可见性
      var panel = document.getElementById('directionPanel');
      if (panel) panel.style.display = v === 'iso' ? 'flex' : 'none';
    };
    viewBtns.appendChild(btn);
  });

  // 选项
  var optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';
  var optLabels = ['A', 'B', 'C', 'D', 'E'];

  level.options.forEach(function(opt, idx) {
    var optDiv = document.createElement('div');
    optDiv.className = 'option-card';
    optDiv.onclick = function() { checkPhotoAnswer(idx, level.answer); };

    var optLabel = document.createElement('div');
    optLabel.className = 'option-label';
    optLabel.textContent = optLabels[idx];
    optDiv.appendChild(optLabel);

    var optGrid = document.createElement('div');
    optGrid.className = 'option-grid';
    
    var maxX = 0, maxY = 0;
    opt.forEach(function(p) {
      if (p[0] + 1 > maxX) maxX = p[0] + 1;
      if (p[1] + 1 > maxY) maxY = p[1] + 1;
    });

    optGrid.style.gridTemplateColumns = 'repeat(' + maxX + ', 28px)';
    optGrid.style.gridTemplateRows = 'repeat(' + maxY + ', 28px)';

    for (var gy = 0; gy < maxY; gy++) {
      for (var gx = 0; gx < maxX; gx++) {
        var cell = document.createElement('div');
        cell.className = 'opt-cell';
        var isFilled = opt.some(function(p) { return p[0] === gx && p[1] === gy; });
        if (isFilled) cell.classList.add('filled');
        optGrid.appendChild(cell);
      }
    }

    optDiv.appendChild(optGrid);
    optionsContainer.appendChild(optDiv);
  });

  // 提示按钮
  var hintBtn = document.getElementById('hintBtn');
  hintBtn.style.display = 'inline-block';
  hintBtn.onclick = function() {
    showToast('💡', level.hint, 4000);
    hintBtn.style.display = 'none';
  };

  // 进度条
  updateProgressBar(currentLevel, levels.length);

  // 第二章开始倒计时
  if (currentChapter === 2) {
    startPhotoTimer();
  }
}

// 更新底部方向提示面板
function updateDirectionPanel(activeView) {
  var panel = document.getElementById('directionPanel');
  if (!panel) return;
  panel.style.display = 'flex';

  var items = panel.querySelectorAll('.dp-item');
  items.forEach(function(item) {
    item.classList.remove('dp-active');
    if (item.dataset.dir === activeView) {
      item.classList.add('dp-active');
    }
  });
}

function startPhotoTimer() {
  if (photoTimer) clearInterval(photoTimer);
  photoTimeLeft = 60;
  updateTimerDisplay();
  photoTimer = setInterval(function() {
    photoTimeLeft--;
    updateTimerDisplay();
    if (photoTimeLeft <= 0) {
      clearInterval(photoTimer);
      photoTimer = null;
      lives--;
      combo = 0;
      showToast('⏰', '时间到！', 1500);
      updateHUD();
      if (lives <= 0) {
        showPhotoResult();
      } else {
        setTimeout(function() {
          currentLevel++;
          loadPhotoLevel();
        }, 1500);
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  var timerEl = document.getElementById('timerDisplay');
  if (timerEl) {
    timerEl.textContent = '⏱ ' + photoTimeLeft + 's';
    timerEl.className = 'timer-display' + (photoTimeLeft <= 10 ? ' timer-danger' : '');
  }
}

function checkPhotoAnswer(selected, correct) {
  if (answered) return;
  answered = true;
  if (photoTimer) clearInterval(photoTimer);

  var optCards = document.querySelectorAll('.option-card');
  
  if (selected === correct) {
    optCards[selected].classList.add('correct');
    combo++;
    var bonus = combo >= 3 ? 2 : 1;
    var earnedStars = bonus;
    stars += earnedStars;
    score += 100 * bonus;
    totalLevelStars += earnedStars;
    
    showToast('✅', '回答正确！+' + earnedStars + '⭐', 1200);
    spawnParticles(window.innerWidth / 2, window.innerHeight / 2, ['⭐', '✨', '🎉']);
    
    if (combo >= 3) {
      showToast('🔥', combo + '连击！双倍星星！', 1500);
    }
  } else {
    optCards[selected].classList.add('wrong');
    optCards[correct].classList.add('correct');
    combo = 0;
    lives--;
    showToast('❌', '答错了，正确答案是 ' + ['A','B','C','D','E'][correct], 2000);
    if (lives <= 0) {
      setTimeout(function() { showPhotoResult(); }, 1500);
      return;
    }
  }

  updateHUD();

  setTimeout(function() {
    currentLevel++;
    loadPhotoLevel();
  }, 1800);
}

function showPhotoResult() {
  if (photoTimer) clearInterval(photoTimer);
  
  var levels = currentChapter === 1 ? LEVELS.photo1 : LEVELS.photo2;
  var isWin = lives > 0 || currentLevel >= levels.length;
  
  showScreen('resultScreen');

  var resultTitle = document.getElementById('resultTitle');
  var resultEmoji = document.getElementById('resultEmoji');
  var resultStats = document.getElementById('resultStats');

  if (isWin) {
    resultEmoji.textContent = '🏆';
    resultTitle.textContent = '闯关成功！';
    var totalPossible = levels.length;
    var completed = Math.min(currentLevel, totalPossible);
    resultStats.innerHTML =
      '<div class="stat-row">📊 完成题目：<strong>' + completed + '/' + totalPossible + '</strong></div>' +
      '<div class="stat-row">⭐ 获得星星：<strong>' + totalLevelStars + '</strong></div>' +
      '<div class="stat-row">🎯 总得分：<strong>' + score + '</strong></div>' +
      '<div class="stat-row">🔥 最高连击：<strong>' + combo + '</strong></div>';
    
    addStars(totalLevelStars);
    totalLevelStars = 0;
  } else {
    resultEmoji.textContent = '💪';
    resultTitle.textContent = '再接再厉！';
    var completed2 = currentLevel;
    resultStats.innerHTML =
      '<div class="stat-row">📊 完成题目：<strong>' + completed2 + '/' + levels.length + '</strong></div>' +
      '<div class="stat-row">⭐ 获得星星：<strong>' + totalLevelStars + '</strong></div>' +
      '<div class="stat-row">🎯 总得分：<strong>' + score + '</strong></div>' +
      '<div class="stat-row">💡 下次加油哦！</div>';
    
    addStars(totalLevelStars);
    totalLevelStars = 0;
  }
}

// ========== 建造模式 ==========
function startBuildMode() {
  mode = 'build';
  currentChapter = 3;
  currentLevel = 0;
  stars = 0;
  totalLevelStars = 0;
  score = 0;

  showScreen('buildScreen');
  loadBuildLevel();
}

function loadBuildLevel() {
  var levels = LEVELS.build;
  if (currentLevel >= levels.length) {
    showBuildResult();
    return;
  }

  var level = levels[currentLevel];
  buildTarget = level;
  buildGrid = {};
  buildStartTime = Date.now();

  // 更新关卡信息
  document.getElementById('buildLevelInfo').textContent = '第 ' + (currentLevel + 1) + ' 关';
  document.getElementById('buildDesc').textContent = level.description;

  // 渲染蓝图视图
  var blueprintContainer = document.getElementById('blueprintContainer');
  blueprintContainer.innerHTML = '';

  var viewLabels = { front: '正面视图', top: '上面视图', left: '左面视图' };
  var viewColors = { front: '#F4A7C1', top: '#FFD93D', left: '#7EC8E3' };
  
  level.showViews.forEach(function(v) {
    var viewDiv = document.createElement('div');
    viewDiv.className = 'blueprint-card';
    viewDiv.style.borderColor = viewColors[v];
    
    var viewLabel = document.createElement('div');
    viewLabel.className = 'blueprint-label';
    viewLabel.textContent = viewLabels[v];
    viewDiv.appendChild(viewLabel);

    var viewGridEl = document.createElement('div');
    var viewArr = v === 'front' ? level.frontView : (v === 'top' ? level.topView : level.leftView);
    
    var maxX = 0, maxY = 0;
    viewArr.forEach(function(p) {
      if (p[0] + 1 > maxX) maxX = p[0] + 1;
      if (p[1] + 1 > maxY) maxY = p[1] + 1;
    });
    maxX = Math.max(maxX, 2);
    maxY = Math.max(maxY, 2);

    viewGridEl.className = 'blueprint-grid';
    viewGridEl.style.gridTemplateColumns = 'repeat(' + maxX + ', 32px)';
    viewGridEl.style.gridTemplateRows = 'repeat(' + maxY + ', 32px)';

    for (var gy = 0; gy < maxY; gy++) {
      for (var gx = 0; gx < maxX; gx++) {
        var cell = document.createElement('div');
        cell.className = 'bp-cell';
        cell.style.backgroundColor = viewColors[v];
        if (viewArr.some(function(p) { return p[0] === gx && p[1] === gy; })) {
          cell.classList.add('filled');
        }
        viewGridEl.appendChild(cell);
      }
    }

    viewDiv.appendChild(viewGridEl);
    blueprintContainer.appendChild(viewDiv);
  });

  // 渲染搭建网格
  renderBuildGrid();

  // 3D预览
  updateBuildPreview();

  updateProgressBar(currentLevel, levels.length);
}

function renderBuildGrid() {
  var gridContainer = document.getElementById('buildGridContainer');
  gridContainer.innerHTML = '';

  var gridSize = 4;
  var table = document.createElement('div');
  table.className = 'build-grid';
  table.style.gridTemplateColumns = 'repeat(' + gridSize + ', 56px)';
  table.style.gridTemplateRows = 'repeat(' + gridSize + ', 56px)';

  for (var y = 0; y < gridSize; y++) {
    for (var x = 0; x < gridSize; x++) {
      var cell = document.createElement('div');
      cell.className = 'build-cell';
      cell.dataset.x = x;
      cell.dataset.y = y;

      var heightIndicator = document.createElement('div');
      heightIndicator.className = 'height-indicator';
      cell.appendChild(heightIndicator);

      cell.onclick = (function(cx, cy) {
        return function() { toggleBuildBlock(cx, cy); };
      })(x, y);

      table.appendChild(cell);
    }
  }

  gridContainer.appendChild(table);

  var hint = document.createElement('div');
  hint.className = 'build-hint';
  hint.innerHTML = '👆 点击格子添加/移除方块 | 使用 + / - 调整高度';
  gridContainer.appendChild(hint);

  var controls = document.createElement('div');
  controls.className = 'build-controls';
  controls.innerHTML =
    '<button class="ctrl-btn" onclick="changeBuildHeight(1)">⬆️ 加高一层</button>' +
    '<button class="ctrl-btn" onclick="changeBuildHeight(-1)">⬇️ 减低一层</button>' +
    '<button class="ctrl-btn ctrl-reset" onclick="clearBuildGrid()">🗑️ 清空</button>';
  gridContainer.appendChild(controls);
}

function toggleBuildBlock(x, y) {
  var key = x + ',' + y;
  if (buildGrid[key]) {
    delete buildGrid[key];
  } else {
    buildGrid[key] = 1;
  }
  window._lastBuildCell = key;
  refreshBuildDisplay();
  checkBuildAnswer();
}

function changeBuildHeight(delta) {
  if (!window._lastBuildCell) return;
  var key = window._lastBuildCell;
  if (!buildGrid[key]) return;
  
  var newH = buildGrid[key] + delta;
  if (newH <= 0) {
    delete buildGrid[key];
  } else if (newH <= 4) {
    buildGrid[key] = newH;
  }
  refreshBuildDisplay();
  checkBuildAnswer();
}

function clearBuildGrid() {
  buildGrid = {};
  refreshBuildDisplay();
}

function getBuildBlocks() {
  var blocks = [];
  for (var key in buildGrid) {
    var parts = key.split(',');
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    var h = buildGrid[key];
    for (var z = 0; z < h; z++) {
      blocks.push([x, y, z]);
    }
  }
  return blocks;
}

function refreshBuildDisplay() {
  var cells = document.querySelectorAll('.build-cell');
  cells.forEach(function(cell) {
    var x = parseInt(cell.dataset.x);
    var y = parseInt(cell.dataset.y);
    var key = x + ',' + y;
    var h = buildGrid[key] || 0;

    var indicator = cell.querySelector('.height-indicator');
    if (h > 0) {
      cell.classList.add('has-block');
      indicator.textContent = h;
      indicator.style.display = 'flex';
      var colors = ['', '#FFD93D', '#FFB93D', '#FF993D', '#FF793D'];
      cell.style.backgroundColor = colors[Math.min(h, 4)];
    } else {
      cell.classList.remove('has-block');
      indicator.style.display = 'none';
      cell.style.backgroundColor = '';
    }
  });

  updateBuildPreview();
}

function updateBuildPreview() {
  var preview = document.getElementById('buildPreview');
  if (!preview) return;
  preview.innerHTML = '';

  var blocks = getBuildBlocks();
  if (blocks.length === 0) {
    preview.innerHTML = '<div class="preview-empty">搭建区为空，点击网格开始搭建！</div>';
    return;
  }

  renderIsoBlocks(preview, blocks, 'iso', 32);
}

function checkBuildAnswer() {
  if (!buildTarget) return;

  var myBlocks = getBuildBlocks();
  var targetBlocks = buildTarget.blocks;

  var allMatch = true;
  var views = ['front', 'top', 'left'];
  
  for (var i = 0; i < views.length; i++) {
    var v = views[i];
    if (buildTarget.showViews.indexOf(v) === -1) continue;
    
    var myView = blocksToViewArr(myBlocks, v);
    var targetView = v === 'front' ? buildTarget.frontView : 
                     (v === 'top' ? buildTarget.topView : buildTarget.leftView);
    
    if (!viewsMatch(myView, targetView)) {
      allMatch = false;
      break;
    }
  }

  if (allMatch && myBlocks.length > 0) {
    var elapsed = Math.round((Date.now() - buildStartTime) / 1000);
    var timeBonus = Math.max(1, 5 - Math.floor(elapsed / 15));
    var earnedStars = Math.min(timeBonus, 3);
    
    stars += earnedStars;
    totalLevelStars += earnedStars;
    score += 100 * earnedStars;

    showToast('🎉', '搭建正确！+' + earnedStars + '⭐', 2000);
    spawnParticles(window.innerWidth / 2, window.innerHeight / 2, ['⭐', '✨', '🎊']);

    setTimeout(function() {
      currentLevel++;
      loadBuildLevel();
    }, 2200);
  }
}

function showBuildResult() {
  showScreen('resultScreen');

  var resultTitle = document.getElementById('resultTitle');
  var resultEmoji = document.getElementById('resultEmoji');
  var resultStats = document.getElementById('resultStats');

  resultEmoji.textContent = '🏗️';
  resultTitle.textContent = '建筑师毕业！';
  resultStats.innerHTML =
    '<div class="stat-row">📊 完成关卡：<strong>' + Math.min(currentLevel, LEVELS.build.length) + '/' + LEVELS.build.length + '</strong></div>' +
    '<div class="stat-row">⭐ 获得星星：<strong>' + totalLevelStars + '</strong></div>' +
    '<div class="stat-row">🎯 总得分：<strong>' + score + '</strong></div>';

  addStars(totalLevelStars);
  totalLevelStars = 0;
}

// ========== 通用UI ==========
function showScreen(screenId) {
  document.querySelectorAll('.game-screen').forEach(function(s) {
    s.classList.add('hidden');
  });
  document.getElementById(screenId).classList.remove('hidden');
}

function updateHUD() {
  var heartsEl = document.getElementById('hearts');
  var scoreEl = document.getElementById('scoreDisplay');
  var comboEl = document.getElementById('comboDisplay');
  var timerEl = document.getElementById('timerDisplay');

  if (heartsEl) {
    var h = '';
    for (var i = 0; i < 3; i++) {
      h += i < lives ? '❤️' : '🖤';
    }
    heartsEl.textContent = h;
  }
  if (scoreEl) scoreEl.textContent = '🎯 ' + score;
  if (comboEl && combo >= 2) {
    comboEl.textContent = '🔥 ' + combo + '连击';
    comboEl.style.display = 'inline-block';
  } else if (comboEl) {
    comboEl.style.display = 'none';
  }
  
  if (timerEl) {
    timerEl.style.display = currentChapter === 2 ? 'inline-block' : 'none';
  }
}

function updateProgressBar(current, total) {
  var bar = document.getElementById('progressBar');
  if (bar) {
    bar.style.width = Math.round((current / total) * 100) + '%';
  }
  var barText = document.getElementById('progressText');
  if (barText) {
    barText.textContent = (current + 1) + '/' + total;
  }
}

function selectChapter(ch) {
  if (ch === 1) {
    startPhotoMode(1);
  } else if (ch === 2) {
    startPhotoMode(2);
  } else if (ch === 3) {
    startBuildMode();
  }
}

function restartGame() {
  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('startScreen').classList.remove('hidden');
}

// 初始化
initStars();
