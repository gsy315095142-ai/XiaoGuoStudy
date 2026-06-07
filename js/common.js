/**
 * 公共工具函数（所有页面共享）
 * - 星星积分系统
 * - Toast 提示
 * - 点击波纹效果
 * - 粒子效果
 */

// ========== 星星积分 ==========
let totalStars = parseInt(localStorage.getItem('totalStars') || '0');

function initStars() {
  const el = document.getElementById('starCount');
  if (el) el.textContent = totalStars;
}

function addStars(n) {
  totalStars += n;
  localStorage.setItem('totalStars', totalStars);
  const el = document.getElementById('starCount');
  if (!el) return;
  el.textContent = totalStars;
  el.style.transform = 'scale(1.5)';
  setTimeout(() => el.style.transition = 'transform 0.3s', 0);
  setTimeout(() => el.style.transform = 'scale(1)', 300);
}

// ========== 点击波纹效果 ==========
function createRipple(event, element) {
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

// ========== 粒子效果 ==========
function spawnParticles(x, y, emojis) {
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = (x + (Math.random() - 0.5) * 100) + 'px';
    p.style.top = (y + (Math.random() - 0.5) * 40) + 'px';
    p.style.animationDelay = (Math.random() * 0.3) + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }
}

// ========== Toast 提示 ==========
function showToast(emoji, text, duration) {
  duration = duration || 2000;
  const toast = document.getElementById('toast');
  if (!toast) return;
  document.getElementById('toastEmoji').textContent = emoji;
  document.getElementById('toastText').textContent = text;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, duration);
}
