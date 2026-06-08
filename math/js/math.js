/**
 * 数学单元目录页专用逻辑
 * - 选择单元
 */

var unitInfo = {
  1: { icon: '🧮', name: '四则运算', page: 'unit1.html' },
  2: { icon: '👀', name: '观察物体（二）', page: 'unit2.html' },
  3: { icon: '🫧', name: '运算定律', page: 'unit3.html' },
  4: { icon: '🔢', name: '小数的意义和性质' },
  5: { icon: '📐', name: '三角形' },
  6: { icon: '➕', name: '小数的加法和减法' },
  7: { icon: '✨', name: '图形的运动（二）' },
  8: { icon: '📊', name: '平均数与条形统计图' },
  9: { icon: '🐔', name: '鸡兔同笼' },
  review: { icon: '🏆', name: '综合大闯关' }
};

function selectUnit(unit, event) {
  createRipple(event, event.currentTarget);
  var info = unitInfo[unit];
  if (!info) return;

  if (info.page) {
    // 有页面的单元，跳转
    setTimeout(function() { window.location.href = info.page; }, 400);
  } else {
    showToast(info.icon, '「' + info.name + '」\n练习模块开发中，敬请期待！🚀', 2000);
  }
}

// 初始化星星
initStars();
