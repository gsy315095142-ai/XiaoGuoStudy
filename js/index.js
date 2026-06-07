/**
 * 首页专用逻辑
 * - 生成草地小花
 * - 选择学科跳转
 * - 底部小动物互动
 */

// ========== 生成草地小花 ==========
(function() {
  var flowerEmojis = ['🌸', '🌼', '🌺', '🌻', '🌷', '💐', '🌹', '🌿'];
  var flowersContainer = document.getElementById('flowers');
  if (!flowersContainer) return;
  for (var i = 0; i < 20; i++) {
    var flower = document.createElement('div');
    flower.className = 'flower';
    flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    flower.style.left = Math.random() * 100 + '%';
    flower.style.bottom = Math.random() * 60 + 'px';
    flower.style.fontSize = (18 + Math.random() * 18) + 'px';
    flower.style.animationDelay = Math.random() * 3 + 's';
    flower.style.animationDuration = (2.5 + Math.random() * 2) + 's';
    flowersContainer.appendChild(flower);
  }
})();

// ========== 选择学科 ==========
var subjectInfo = {
  chinese: { emoji: '📖', name: '语文', particles: ['📖', '✏️', '📝', '🌸'] },
  math:    { emoji: '🔢', name: '数学', particles: ['🔢', '➕', '➖', '⭐'] },
  english: { emoji: '🔤', name: '英语', particles: ['🔤', '💬', '🌈', '⭐'] }
};

function selectSubject(subject, event) {
  createRipple(event, event.currentTarget);
  var info = subjectInfo[subject];
  spawnParticles(event.clientX, event.clientY, info.particles);

  if (subject === 'math') {
    setTimeout(function() { window.location.href = 'math.html'; }, 400);
  } else {
    showToast(info.emoji, info.name + ' 学习模块开发中...\n敬请期待！🚀', 2000);
  }
}

// ========== 底部小动物互动 ==========
var animalSounds = { '🐷': '哼哼～', '🐸': '呱呱～', '🐰': '蹦蹦～' };

function animalClick(el, animal) {
  showToast(animal, animalSounds[animal], 1500);
  addStars(1);
  spawnParticles(el.getBoundingClientRect().left + 20, el.getBoundingClientRect().top, ['⭐', '✨', '💛']);
}

// 初始化星星
initStars();
