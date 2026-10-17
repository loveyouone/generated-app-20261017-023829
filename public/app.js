// YIy注入 Native Mobile Web Preview Controller

let currentTabIndex = 0;
let isIslandExpanded = false;
let isInjected = false;
let isRunning = false;
let timerSeconds = 0;
let timerInterval = null;

function switchTab(index, element) {
  currentTabIndex = index;
  
  // 隐藏所有 Screen 视图
  const screens = ['screenHome', 'screenScriptRunner', 'screenSettings', 'screenAbout'];
  screens.forEach((screenId, i) => {
    const el = document.getElementById(screenId);
    if (el) el.style.display = i === index ? 'block' : 'none';
  });

  // 更新 Tab 高亮
  const tabItems = document.querySelectorAll('.tab-item');
  tabItems.forEach((item, i) => {
    if (i === index) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // 移动 TabBar 水滴镜片指示器
  const lens = document.getElementById('activeLens');
  if (lens) {
    const positions = ['5px', '25.5%', '50.5%', '75.5%'];
    lens.style.left = positions[index] || '5px';
  }

  // 页面滚动回顶部
  const container = document.getElementById('screenContainer');
  if (container) container.scrollTop = 0;
}

function selectThemeColor(primary, secondary, tileElement) {
  document.documentElement.style.setProperty('--theme-primary', primary);
  document.documentElement.style.setProperty('--theme-secondary', secondary);

  // 高亮 Color Tile
  const tiles = document.querySelectorAll('.color-tile');
  tiles.forEach(tile => tile.classList.remove('active'));
  if (tileElement) {
    tileElement.classList.add('active');
  }
}

function updateBlur(value) {
  document.documentElement.style.setProperty('--blur-amount', value + 'px');
  const blurVal = document.getElementById('blurVal');
  if (blurVal) blurVal.innerText = value + 'px';
}

function updateRefraction(value) {
  const opacity = value / 100;
  document.documentElement.style.setProperty('--refraction-opacity', opacity);
  const refractionVal = document.getElementById('refractionVal');
  if (refractionVal) refractionVal.innerText = value + '%';
}

function toggleIsland() {
  const island = document.getElementById('dynamicIsland');
  const islandText = document.getElementById('islandText');
  const islandExpandedContent = document.getElementById('islandExpandedContent');
  
  if (island) {
    isIslandExpanded = !isIslandExpanded;
    if (isIslandExpanded) {
      island.classList.add('expanded');
      if (islandText) islandText.innerText = "YIy注入 悬浮功能控制岛";
      if (islandExpandedContent) islandExpandedContent.style.display = "block";
    } else {
      island.classList.remove('expanded');
      if (islandText) islandText.innerText = isInjected ? "YIy注入 悬浮岛 (运行中)" : "YIy注入 悬浮岛 (未注入)";
      if (islandExpandedContent) islandExpandedContent.style.display = "none";
    }
  }
}

function toggleFeatureLog(feature, isChecked) {
  const status = isChecked ? '开启' : '关闭';
  addLogLine(`[${getCurrentTime()}] 悬浮岛切换功能: [${feature}] -> ${status}`);
}

function setMode(mode, element) {
  const appContainer = document.getElementById('appContainer');
  const buttons = document.querySelectorAll('.mode-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (element) element.classList.add('active');

  if (appContainer) {
    if (mode === 'light') {
      appContainer.classList.add('light-mode');
      appContainer.classList.remove('dark-mode');
    } else {
      appContainer.classList.add('dark-mode');
      appContainer.classList.remove('light-mode');
    }
  }
}

function openDrawer() {
  const drawer = document.getElementById('glassDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('active');
}

function closeDrawer() {
  const drawer = document.getElementById('glassDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}

// 首页脚本选择与注入逻辑
function onScriptSelectChange(val) {
  addLogLine(`[${getCurrentTime()}] 选择了脚本预设: ${val}`);
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = n => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerSeconds = 0;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timerSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  const timerStatusText = document.getElementById('timerStatusText');
  if (timerStatusText) {
    timerStatusText.innerText = `运行时间: ${formatTime(timerSeconds)}`;
  }
}

function triggerInjection() {
  const injectBtnText = document.getElementById('injectBtnText');
  const injectStatusText = document.getElementById('injectStatusText');
  const runStatusText = document.getElementById('runStatusText');
  const selectVal = document.getElementById('presetScriptSelect')?.value || '默认预设脚本';

  if (injectBtnText) injectBtnText.innerText = "⚡ 注入中...";

  setTimeout(() => {
    isInjected = true;
    isRunning = true;
    if (injectBtnText) injectBtnText.innerText = "⚡ 重新注入进程";
    if (injectStatusText) injectStatusText.innerText = "注入状态: 已注入";
    if (runStatusText) runStatusText.innerText = "运行状态: 运行中";

    // 启动运行时间定时器
    startTimer();

    addLogLine(`[${getCurrentTime()}] SYSTEM_ALERT_WINDOW 权限已确认`);
    addLogLine(`[${getCurrentTime()}] 核心模块注入成功: ${selectVal}`);
    addLogLine(`[${getCurrentTime()}] 系统级悬浮窗灵动岛与功能面板已激活`);

    const islandText = document.getElementById('islandText');
    if (islandText && !isIslandExpanded) {
      islandText.innerText = "YIy注入 悬浮岛 (运行中)";
    }
  }, 600);
}

// 外部脚本页交互逻辑
function clearScriptText() {
  const input = document.getElementById('scriptTextInput');
  if (input) {
    input.value = '';
    addLogLine(`[${getCurrentTime()}] 脚本文本已清空`);
  }
}

function copyScriptText() {
  const input = document.getElementById('scriptTextInput');
  if (input) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(input.value).then(() => {
        addLogLine(`[${getCurrentTime()}] 脚本文本已复制 (字数: ${input.value.length})`);
      }).catch(() => {
        addLogLine(`[${getCurrentTime()}] 脚本文本已复制`);
      });
    } else {
      addLogLine(`[${getCurrentTime()}] 脚本文本已复制`);
    }
  }
}

function pasteScriptText() {
  const sampleScript = `-- YIy注入 Roblox Lua 引擎\nlocal Players = game:GetService("Players")\nlocal LocalPlayer = Players.LocalPlayer\n\nprint("[YIy] 初始化神速与无敌挂载...")\nLocalPlayer.Character.Humanoid.WalkSpeed = 64\nLocalPlayer.Character.Humanoid.JumpPower = 120\nprint("[YIy] 脚本注入成功，参数已生效！")`;
  const input = document.getElementById('scriptTextInput');
  if (input) {
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText().then(text => {
        input.value = text || sampleScript;
        addLogLine(`[${getCurrentTime()}] 已将剪贴板内容粘贴至编辑器`);
      }).catch(() => {
        input.value = sampleScript;
        addLogLine(`[${getCurrentTime()}] 已将示例 Roblox Lua 脚本粘贴至编辑器`);
      });
    } else {
      input.value = sampleScript;
      addLogLine(`[${getCurrentTime()}] 已将示例 Roblox Lua 脚本粘贴至编辑器`);
    }
  }
}

function runScriptText() {
  const input = document.getElementById('scriptTextInput');
  const text = input ? input.value : '';
  
  if (!text.trim()) {
    addLogLine(`[${getCurrentTime()}] [错误] 脚本文本为空，无法执行`);
    return;
  }

  addLogLine(`[${getCurrentTime()}] 开始解析外部脚本文本 (${text.length} 字符)...`);
  setTimeout(() => {
    addLogLine(`[${getCurrentTime()}] [成功] 脚本编译无报错，挂钩至主线程`);
    addLogLine(`[${getCurrentTime()}] [输出] ` + text.split('\n')[0]);
  }, 400);
}

function clearLogs() {
  const terminal = document.getElementById('logTerminalArea');
  if (terminal) {
    terminal.innerHTML = `<div class="log-line info">[${getCurrentTime()}] 日志已清空</div>`;
  }
}

function addLogLine(text) {
  const terminal = document.getElementById('logTerminalArea');
  if (terminal) {
    const line = document.createElement('div');
    if (text.includes('成功') || text.includes('开启')) line.className = 'log-line success';
    else if (text.includes('错误') || text.includes('清空')) line.className = 'log-line error';
    else line.className = 'log-line info';
    
    line.innerText = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }
}

function getCurrentTime() {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
}

console.log("💧 YIy注入 Native Mobile Web Preview Controller 初始化成功！");
