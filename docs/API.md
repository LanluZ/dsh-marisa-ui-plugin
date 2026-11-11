# 魔理沙UI — 接口表（API Reference）

> 本项目对外 / 对宿主暴露的全部接口契约。
> 版本基准：**1.9.11**。

---

## 1. 设置接口（用户可调节设定）

入口：设置 → *魔理沙UI*（设置面板独立分区页，slot `settings.section`，见 §3.5）。
除 8 个滑杆外还有：**窗口背景叠层** RGBA 输入（§1.4c）、**透出桌面壁纸**开关（§1.4）、**左侧栏玻璃面板**开关（§1.4b）与**窗口玻璃注入**按钮（§1.5）。

### 1.1 调节项

| 调节项 | 内部键 | 滑杆范围 | 默认 | 步进 | 效果 |
| --- | --- | --- | --- | --- | --- |
| 极光强度 | `aurora` | 0–150 % | 100 % | 5 % | 背景极光 5 个色斑的透明度增益 |
| 玻璃不透明度 | `glass` | 25–100 % | 100 % | 5 % | 组件级玻璃（输入卡 / 菜单 / toast / 气泡填充及交互淡底）的透明度增益（<100% 更通透，配合 §1.4 透出桌面） |
| 窗口不透明度 | `window` | 25–150 % | 100 % | 5 % | 窗口级大面板（侧栏 / 主面板 / 右栏）玻璃填充的不透明度增益，与 `glass` **正交**（`glass` 不再作用于大面板）。整体太通透时调高，≥110% 即完全实心；也控制透出桌面时窗口的见底程度 |
| 整窗玻璃透明度 | `total` | 25–100 % | 100 % | 5 % | **应用级毛玻璃总透明度**：写入时折入 `glass` / `window` / `rim` / `shadow` 四条玻璃增益（见 §1.3），所有玻璃层（组件填充、大面板填充、镜面高光、描边、投影）作为一整块玻璃统一变实 / 变透；**文字与图标始终清晰不淡**（占位符文字将折入量除回，标签色走宿主 token 无增益）。配合 §1.5 窗口玻璃注入 + §1.4 透出桌面，即"应用级毛玻璃注入后的透明度"调节。极光、圆角、焦点环不属玻璃，不参与 |
| 高光与描边 | `rim` | 0–150 % | 100 % | 5 % | 镜面高光、描边、发丝线、色散勾边、滚动条的透明度增益 |
| 圆角缩放 | `radius` | 0–150 % | 100 % | 5 % | 全部玻璃圆角（面板 20px、输入卡 22px、菜单 16px 等）等比缩放 |
| 阴影深度 | `shadow` | 0–150 % | 100 % | 5 % | 面板 / 输入卡 / 菜单 / toast 外投影透明度增益 |
| 焦点环 | `focus` | 0–150 % | 100 % | 5 % | `:focus-visible` 焦点环与引用条（blockquote 左条）透明度增益 |

### 1.2 持久化（localStorage）

| 项 | 值 |
| --- | --- |
| 键名 | `dsh.ui-liquidglass.tune.<内部键>`（如 `dsh.ui-liquidglass.tune.aurora`） |
| 值 | 整数百分比字符串（`"100"`） |
| 写入时机 | 滑杆 `onChange`、点击"恢复默认" |
| 读取时机 | 插件 `apply`（写入 CSS 变量）、设置页组件挂载 |
| 异常策略 | `localStorage` 不可用（隐私模式）时静默降级为默认值，不持久化 |

### 1.3 值 → CSS 变量映射

| 内部键 | CSS 变量 | 写入值 |
| --- | --- | --- |
| `aurora` | `--lg-tune-aurora` | 百分比 ÷ 100 |
| `glass` | `--lg-tune-glass` | 百分比 ÷ 100 |
| `window` | `--lg-tune-window` | 百分比 ÷ 100 |
| `total` | （并入 `--lg-tune-glass` / `--lg-tune-window` / `--lg-tune-rim` / `--lg-tune-shadow`，另写 `--lg-tune-total` 供占位符除回） | 滑杆值 ÷ 100 乘入上述四条玻璃增益的写入值；文字层不参与 |
| `rim` | `--lg-tune-rim` | 百分比 ÷ 100 |
| `radius` | `--lg-tune-radius` | 百分比 ÷ 100 |
| `shadow` | `--lg-tune-shadow` | 百分比 ÷ 100 |
| `focus` | `--lg-tune-focus` | 百分比 ÷ 100 |

写入位置：`document.documentElement.style`（行内样式）。卸载插件时清除。

### 1.4 壁纸透出开关（reveal，实验性）

设置页"透出桌面壁纸"复选框。开启后文档画布变透明，配合**宿主窗口**的
透明 / 系统材质（亚克力 / 云母）即可透出桌面壁纸——能力边界与宿主侧开启
方法见 §6；宿主未开启时窗口显示纯色背景（设置页提示语已注明）。

| 项 | 值 |
| --- | --- |
| 键名 | `dsh.ui-liquidglass.reveal` |
| 值 | `"1"` = 开；键移除 = 关 |
| DOM 标记 | `<html data-lg-reveal="on">`（theme.css 以 `[data-lg-reveal]` 响应） |
| 画布行为 | `html` 背景 `transparent`（深浅两套渐变同时停用） |
| 标题条行为 | 渐隐条两端透明，不再铺设实心 caption 采样色块（不遮挡原生亚克力） |
| 配合调节 | 窗口背景叠层（§1.4c）连续渐进调节整窗透明度（A < 100% 透出桌面）；玻璃不透明度调低（最低 25%）透出更多桌面；整窗玻璃透明度（§1.1 `total`）整体淡化玻璃层 |
| 默认 | 关；"恢复默认"同时关闭；卸载插件时清除标记 |

### 1.4b 左侧栏玻璃面板开关（sidebar frame）

设置页"左侧栏玻璃面板"复选框。宿主原生**主面板是圆角玻璃卡、左侧面板是
直角素面**——此开关让用户为左侧栏自选：开 = 本主题完整玻璃面板（圆角 +
描边 + 内缘高光 + 投影 + 玻璃填充），关 = 整块透明（连填充层与底部渐隐
一并移除），直接透出窗口底层（极光画布；reveal 模式下为桌面）。

| 项 | 值 |
| --- | --- |
| 键名 | `dsh.ui-liquidglass.sidebarFrame` |
| 值 | `"0"` = 关（透明）；键移除 = 开（完整玻璃，默认） |
| DOM 标记 | `<html data-lg-sidebar-frame="off">`（仅关闭时） |
| CSS 行为 | `html[data-lg-sidebar-frame="off"] [class*="_sidebarCol"]` = `border-radius: 0; border: none; box-shadow: none; background-color: transparent; background-image: none`，另将栏内 `[class*="_footArea"]` 渐隐置 `transparent` —— 左栏只剩布局、透出窗口底层；中栏与右栏的玻璃面板不受影响 |
| 选择器位置 | 规则须排在深色分组规则与浅色覆写规则**之后**（同特异度 + `!important`，后写者胜） |
| 与调参滑杆 | 开（默认）时左栏仍走 `--lg-tune-radius/glass/rim/shadow` 全部增益；关闭时这些对左栏一律不生效 |
| 默认 | 开；"恢复默认"恢复为开；卸载插件时清除标记 |

### 1.4c 窗口背景叠层（bg layer，1.9.9；1.9.11 定位窗口外壳层）

设置页"窗口背景叠层"区块：叠在整个注入窗口上的**半透明纯色背景层**，
颜色与不透明度自行输入 **RGBA**（其 A 即窗口不透明度）——实现"注入的
整个窗口的透明化"。叠层画在**窗口外壳层**（`[class*="_frame"]`，与顶部
可拖拽标题栏同级——该条带已被注入透明化），是一整块覆盖全窗（含标题栏
条带）的背景：压在极光画布之上、玻璃面板之下。面板纯色填充保持各自
设计色与不透明度（叠层不染色界面），高光 / 描边 / 投影与文字图标均在
该层之外。"透出桌面壁纸"开启时 html 画布转全透，但叠层照常生效（外壳
层不受 html 背景规则影响）；A < 100% 时亚克力桌面壁纸透过叠层与玻璃
面板显出。

| 项 | 值 |
| --- | --- |
| 键名 | `dsh.ui-liquidglass.bg` |
| 值 | `"r,g,b,a"`（r/g/b 为 0–255，a 为 0–100 整数百分比）；键移除 = 主题默认背景 |
| DOM 标记 | `<html data-lg-bg="custom">`（自定义生效时） |
| CSS 变量 | `--lg-bg-r/g/b`（0–255）、`--lg-bg-a`（0–1），行内写入于 `<html>` |
| CSS 行为 | **一层背景，窗口外壳级**（1.9.11）：`html[data-lg-bg="custom"] [class*="_frame"]` 把外壳 `background` 置为 `rgb(--lg-bg-r --lg-bg-g --lg-bg-b / --lg-bg-a)`，实时生效。叠层盖住极光画布、位于全部玻璃面板与内容之下，标题栏条带同被覆盖。1.9.10 的填充栈乘 A / 统一染色已撤除：面板、画布装饰、页脚渐隐回到各自设计色与各自滑杆增益（`--lg-fill-*` 已移除） |
| 主题基准 | 未自定义 = 无叠层（外壳保持 `background: transparent`，主题画布原样）；CSS 回退值 `rgb(5,6,14,1)` / `rgb(238,242,251,1)` 仅供输入框基准 |
| 与玻璃层 | 高光 / 描边 / 投影 / 交互色**不参与**（玻璃质感由它们维持）；`glass` / `window` / `total` 滑杆继续按各自增益乘入填充 alpha |
| 默认 | 无自定义；"恢复默认背景"与总"恢复默认"清除此键；卸载插件时清除 |

### 1.5 窗口玻璃注入（app.asar patcher，宿主动作）

设置页"窗口玻璃（系统级）"区块的两个按钮，驱动宿主半侧补丁器
（`plugin/index.js`）改写安装目录的 `app.asar`，把欢迎窗口的亚克力配方
注入主窗口（§6.3 的宿主改动由此自动完成）。备份随第一次注入自动留下，
可随时还原、随时再注入。

**宿主 HTTP 路由**（挂载在 DSH web server 上，仅 owner-principal 会话可达）：

| 方法 | 路径 | 动作 | 结果 |
| --- | --- | --- | --- |
| GET | `/liquidglass/status` | 状态快照 | `{ state, error, asarPath, backupPath, asarSize, backup }` |
| POST | `/liquidglass/inject` | 注入补丁 | `{ ok, state, message, restartRequired? }` |
| POST | `/liquidglass/restore` | 还原备份 | 同上 |

**状态** `state`：`original`（未注入）/ `patched`（已注入）/ `unknown`
（找不到补丁锚点或不支持的 DSH 版本——任何写入都被拒绝）。

**结果** `message` 枚举：`already-injected` · `injected` · `already-original` ·
`restored` · `unknown-host-build` · `backup-missing` · `backup-version-mismatch` ·
`integrity-refused: …` · `patch-refused: …` · `write-failed: …` · `restore-failed: …`。
客户端把已知枚举映射为本地化文案（`PATCH_MSG_KEYS`），未知值原样显示。

**备份契约**：

| 项 | 值 |
| --- | --- |
| 路径 | `D:\Program Files (x86)\dsh\resources\app.asar.lg-backup` |
| 写入时机 | 第一次注入前（tmp + rename 原子落盘；同尺寸旧备份不覆盖） |
| 还原守卫 | 仅当 备份尺寸 === 当前尺寸 才允许还原（同长补丁 ⇒ 同版本证明，跨升级绝不回滚） |
| DSH 升级后 | 升级覆盖 app.asar ⇒ 状态回 `original`、备份变旧；重新注入即可（注入会把备份刷新为当前版本原件） |

**补丁安全特性**（详见 `plugin/index.js` 头注释）：等长原地替换（asar 头部
偏移零改动）、补丁区语法校验（`new Function` 编译检查，变形错误绝不落盘）、
写后回读验证 + 失败自动还原、header `integrity` 哈希同步更新（同宽 hex，
为未来开启 asar 完整性 fuse 保持自洽，当前 exe 该 fuse 为 OFF）、
原始文件操作走 `process.noAsar` 局部旁路（dsh 运行时带 Electron asar-fs 包装）。

---

## 2. CSS 变量接口

### 2.1 调参变量（输入面，JS → CSS）

| 变量 | 默认 | 写入方 | 语义 |
| --- | --- | --- | --- |
| `--lg-tune-aurora` | `1` | 调参引擎 | 极光透明度增益 |
| `--lg-tune-glass` | `1` | 调参引擎 | 组件玻璃填充透明度增益 |
| `--lg-tune-window` | `1` | 调参引擎 | 大面板玻璃填充透明度增益（与 `glass` 正交） |
| `--lg-tune-total` | `1` | 调参引擎 | 应用级毛玻璃总透明度：写入时折入 glass / window / rim / shadow 四条增益（本变量供 `--lg-placeholder` 除回，保证占位文字不淡） |
| `--lg-tune-rim` | `1` | 调参引擎 | 高光 / 描边透明度增益 |
| `--lg-tune-radius` | `1` | 调参引擎 | 圆角缩放系数 |
| `--lg-tune-shadow` | `1` | 调参引擎 | 投影透明度增益 |
| `--lg-tune-focus` | `1` | 调参引擎 | 焦点环 / 强调透明度增益 |
| `--lg-bg-r` / `--lg-bg-g` / `--lg-bg-b` | `5 / 6 / 14`（浅色覆写 `238 / 242 / 251`） | 叠层模块（§1.4c） | 窗口背景叠层颜色通道（0–255） |
| `--lg-bg-a` | `1` | 叠层模块（§1.4c） | 窗口背景叠层不透明度（0–1）——即窗口不透明度，仅作用于窗口外壳层本身（1.9.11） |

约定：theme.css 中**所有**装饰性 `rgba()` 透明度必须写成
`calc(基准 * var(--lg-tune-*))`、圆角写成 `calc(Npx * var(--lg-tune-radius))`，
基准值即 100% 时的设计原样。

### 2.2 交互色板（`--lg-*`，theme.css 内部 API）

声明于 `html`（深色为基准），浅色在 `html:has(body:not([data-ds-dark-theme]))` 覆盖。

| 变量 | 深色 | 浅色 | 用途 | 挂载增益 |
| --- | --- | --- | --- | --- |
| `--lg-hover` | `rgba(255,255,255,.06)` | `rgba(13,28,60,.07)` | 常规 hover 底色 | glass |
| `--lg-hover-strong` | `rgba(255,255,255,.09)` | `rgba(13,28,60,.10)` | 强 hover / 激活底色 | glass |
| `--lg-rim` | `rgba(255,255,255,.14)` | `rgba(30,41,89,.16)` | 描边 / 圆环 | rim |
| `--lg-hairline` | `rgba(255,255,255,.055)` | `rgba(30,41,89,.10)` | 发丝分隔线 | rim |
| `--lg-selected` | `rgba(124,158,255,.16)` | `rgba(59,111,224,.14)` | 选中态底色 | glass |
| `--lg-badge-bg` | `rgba(255,255,255,.09)` | `rgba(30,41,89,.08)` | 徽章 / 行内代码底 | glass |
| `--lg-placeholder` | `rgba(222,230,248,.55)` | `rgba(52,64,88,.60)` | 占位文本 | glass |
| `--lg-foot-scrim` | `rgba(8,10,18,.22)` | `rgba(30,41,89,.08)` | 侧栏底部渐隐 | glass |
| `--lg-focus-ring` | `rgba(103,232,249,.55)` | `rgba(59,111,224,.55)` | 键盘焦点环 | focus |
| `--lg-quote-bar` | `rgba(129,140,248,.60)` | `rgba(59,111,224,.55)` | 引用块左条 | focus |
| `--lg-window-rim` | `rgba(255,255,255,.10)` | `rgba(30,41,89,.12)` | 整窗边缘高光环（frame 内投影） | rim |
| `--lg-titlebar-rgb` | `17 24 39` | `238 242 251` | 标题条渐隐色 RGB 三元组 | — |

### 2.3 消费的宿主 token（`--dsw-*`，来自 tokens.js 覆盖 + 直接引用）

theme.css 直接引用的 token（单一事实来源）：

| token | 用途 |
| --- | --- |
| `--dsw-specific-sidebar-fill` | Windows 标题条渐变的实心端（系统按钮取色） |
| `--dsw-alias-label-primary` | 气泡文字色 |
| `--dsh-windows-titlebar-height` | 带标题条时 frame 顶部内边距 |

tokens.js 覆盖的语义 token（每个 `{ light, dark }` 一对）：

| token | 作用域 | light | dark |
| --- | --- | --- | --- |
| `--dsw-alias-bg-base` | 画布 | `transparent` | `transparent` |
| `--dsw-alias-bg-layer-1` | 一级面 | `rgba(255,255,255,0.92)` | `rgba(17,21,36,0.86)` |
| `--dsw-alias-bg-layer-2` | 二级面 | `rgba(255,255,255,0.89)` | `rgba(22,27,44,0.89)` |
| `--dsw-alias-bg-layer-3` | 三级面 | `rgba(255,255,255,0.92)` | `rgba(29,34,54,0.92)` |
| `--dsw-alias-bg-layer-4` | 四级面 | `rgba(255,255,255,0.92)` | `rgba(38,43,66,0.94)` |
| `--dsw-alias-bg-overlay` | 覆盖层 | `rgba(255,255,255,0.80)` | `rgba(9,12,22,0.86)` |
| `--dsw-alias-bg-mask-1` | 遮罩 1 | `rgba(10,15,30,0.35)` | `rgba(3,5,12,0.55)` |
| `--dsw-alias-bg-mask-2` | 遮罩 2 | `rgba(10,15,30,0.18)` | `rgba(3,5,12,0.35)` |
| `--dsw-alias-bg-mask-3` | 遮罩 3 | `rgba(10,15,30,0.55)` | `rgba(3,5,12,0.72)` |
| `--dsw-alias-bg-module-platform` | 平台模块面 | `rgba(248,250,255,0.88)` | `rgba(28,32,50,0.86)` |
| `--dsw-alias-bg-multi-select` | 多选面 | `rgba(248,250,255,0.90)` | `rgba(28,32,50,0.88)` |
| `--dsw-alias-bg-skeleton` | 骨架屏 | `rgba(10,20,40,0.06)` | `rgba(255,255,255,0.08)` |
| `--dsw-alias-bg-document-preview` | 文档预览 | `rgba(255,255,255,0.92)` | `rgba(7,10,20,0.90)` |
| `--dsw-menu-surface-fill` | 菜单面 | `rgba(252,253,255,0.98)` | `rgba(17,21,34,0.96)` |
| `--dsw-specific-menu` | 菜单（specific） | `rgba(252,253,255,0.98)` | `rgba(17,21,34,0.96)` |
| `--dsw-specific-sidebar-fill` | 标题条/侧栏采样色 | `#eef2fb` | `#111827` |
| `--dsw-alias-menu-group-header-fill` | 菜单组头 | `rgba(252,253,255,0.98)` | `rgba(17,21,34,0.98)` |
| `--dsw-alias-menu-icon` | 菜单图标 | `#2a3145` | `#eaf0ff` |
| `--dsw-alias-border-l1..l4` | 描边 1–4 级 | 蓝黑淡描边 | 白淡描边 |
| `--dsw-alias-label-primary` | 一级文字 | `#0c1322` | `#f6f9ff` |
| `--dsw-alias-label-primary-dimmed` | 一级文字（弱） | `#1b2438` | `#e9eefc` |
| `--dsw-alias-label-secondary` | 二级文字 | `rgba(32,42,62,0.78)` | `rgba(230,237,252,0.80)` |
| `--dsw-alias-label-tertiary` | 三级文字 | `rgba(52,64,88,0.64)` | `rgba(208,218,240,0.64)` |
| `--dsw-alias-interactive-bg-hover` | 交互 hover | `rgba(13,28,60,0.07)` | `rgba(255,255,255,0.09)` |
| `--dsw-alias-interactive-bg-active` | 交互按下 | `rgba(13,28,60,0.12)` | `rgba(255,255,255,0.14)` |
| `--dsw-alias-state-business-primary` | 品牌主色 | `#3b6fe0` | `#8fb8ff` |
| `--dsw-alias-state-business-tertiary` | 品牌主色弱底 | `rgba(59,111,224,0.12)` | `rgba(120,160,255,0.18)` |
| `--dsw-alias-toast-bg` | toast 底 | `rgba(255,255,255,0.90)` | `rgba(14,18,31,0.94)` |
| `--dsw-alias-toast-label` | toast 文字 | `#0c1322` | `#f4f8ff` |
| `--dsw-alias-scrollbar-bg-l1` | 滚动条 | `rgba(15,30,60,0.18)` | `rgba(255,255,255,0.18)` |
| `--dsw-alias-scrollbar-hover-l1` | 滚动条 hover | `rgba(15,30,60,0.30)` | `rgba(255,255,255,0.30)` |
| `--dsw-alias-switch-thumb` | 开关滑块 | `#ffffff` | `#eaf0ff` |

> 1.10.2 起 `--dsw-alias-markdown-code-block` **不再覆盖**（代码块完全退出主题，
> 吸顶标题栏遮挡回归宿主原生填充），宿主默认值生效。

> 完整精确值以 [plugin/src/tokens.js](../plugin/src/tokens.js) 为准（单一事实来源）。

---

## 3. 插件包接口（package.json）

### 3.1 `exports` 子路径

| 子路径 | 目标 | 说明 |
| --- | --- | --- |
| `.` | `index.js` | 宿主半侧（Loader 加载） |
| `./client` | `client.js` | 浏览器 bundle（`dsh.client` 指向） |
| `./locale/*.json` | `locale/*.json` | Plugin Hub 文案 |
| `./icon` | `icon.svg` | 图标 |
| `./package.json` | `package.json` | 清单自引用 |

### 3.2 `dsh` 声明

| 字段 | 值 | 说明 |
| --- | --- | --- |
| `dsh.bundle.patch` | `./cordis.patch.yml` | 注册 Loader 行 `id: ui-liquidglass` |
| `dsh.client.platform` | `web` | 仅 Web 端注入 |
| `dsh.client.immediately` | `true` | 启动即加载 |
| `dsh.client.inject` | `dsh-client-ui-theme`, `dsh-client-ui-renderer` | 浏览器半侧依赖的宿主插件（等其就绪） |

### 3.3 浏览器 bundle 模块契约

`client.js` 形态：`window.__ModuleLoader__.load({ id, factory })`，
`factory(require)` 返回 CommonJS 风格模块对象。`require` 走宿主共享模块表
（固定白名单如下；跨插件值导入被纯度门禁禁止，协作走 ctx 服务）：

| 白名单模块 | 说明 |
| --- | --- |
| `react`、`react/jsx-runtime`、`react-dom`、`react-dom/client` | React 全家桶 |
| `@deepseek-ai/cordis`、`zod`、`@tanstack/react-virtual` | 运行时 / 校验 / 虚拟列表 |
| `@deepseek-ai/dsh-client-store`、`-ui-slots`、`-ui-primitives`、`-ui-dockkit` | DSH 客户端服务面 |

不在表内一律不可取——**含 `electron` / ipcRenderer**，因此 client bundle
无法触达 BrowserWindow / 窗口材质（见 §6.2）。

| 导出 | 类型 | 说明 |
| --- | --- | --- |
| `apply(ctx)` | `(ClientCtx) => void` | 插件主体；`ctx` 为守卫代理（服务白名单 + 注入面） |
| `inject` | `string[]` | 必需服务：`["theme", "slots", "locale"]`，缺一则 fiber 等待 |

`apply` 内注册的生命周期效果（`ctx.effect(fn, label)`，fiber 卸载级联释放）：

| 效果 | 作用 |
| --- | --- |
| version marker | `<html data-lg-theme>` + 控制台版本日志 |
| alias token overrides | `ctx.theme.overrideTokens(PLUGIN_ID, TOKENS)` |
| stylesheet | 注入 / 移除 `<style data-plugin-css>` |
| tuning values | localStorage → `--lg-tune-*`，卸载时清除 |
| wallpaper reveal | localStorage → `<html data-lg-reveal>`（画布透明），卸载时清除 |
| sidebar frame | localStorage → `<html data-lg-sidebar-frame>`（左栏透明标记），卸载时恢复玻璃面板 |
| DSH appearance bridge | `switchDshAppearance`（模块级钩子）→ `ctx.theme.setTheme`（1.12.0：深色/浅色样式按钮联动宿主「通用设置 → 外观」），卸载置空 |
| settings dictionaries | `ctx.locale.register(NS, { zh, en })` |

### 3.4 消费的 ctx 服务

| 服务 | 方法（签名） | 用途 |
| --- | --- | --- |
| `theme` | `overrideTokens(source: string, tokens: ThemeTokenOverrides): () => void` | 堆叠语义 token 覆盖层；source 被强制替换为本包 id |
| `theme` | `setTheme(id: "light" \| "dark" \| "system")` | 切换 DSH 自身「通用设置 → 外观」偏好（1.12.0）：设置页「深色 / 浅色」按钮联动调用；走官方偏好写入口（持久化 + 广播 `theme/change`，外观行与全局配色即时跟随） |
| `theme` | 事件 `'theme/change'(snapshot)` | 主题切换通知（本项目当前未订阅） |
| `locale` | `register(ns: string, dicts: Record<locale, dict>): () => void` | 注册设置页文案 |
| `slots` | `inject(key: string, factory: () => disposer): void` | 插槽注入（随 fiber 卸载级联） |
| `slots` | `register(options, component): () => void` | 注册插槽条目（见 §3.5） |

### 3.5 注册的插槽

| 插槽 | 选项 | 组件 | 出现位置 |
| --- | --- | --- | --- |
| `settings.section` | `{ name, id: "liquid-glass", order: 90, label: () => 本地化标题, locale: NS }` | `SettingsPage` | 设置面板左侧导航的独立分区（与通用 / 模型 / 插件 / 账号并列，排在末尾） |

- `label` 为 thunk：每次导航投影时重读，随当前语言切换（zh / en）。
- 分区组件收到 shell 注入的 `close()`（关闭设置面板；本页未使用）。
- 组件另收到框架注入的 `t` 座位（绑定 `NS` 字典）；`SettingsPage` 自带降级
  （无 `t` 时回落中文字典）。

### 3.6 宿主半侧（index.js）

| 导出 | 说明 |
| --- | --- |
| `inject = ["webServer"]` | 硬依赖 web server 服务（Loader 等其就绪后再跑本插件，避免竞态） |
| `apply(ctx)` | 挂载 §1.5 的三条 `/liquidglass/*` 路由；返回卸载清理函数 |
| `asarActions` | `{ inject, restore, status }` 补丁动作面（路由与 `tools/lg-asar.mjs` 共用） |

宿主半侧运行在 dsh 运行时子进程（Node，Electron run-as-node），对
`app.asar` 的原始文件操作在 `process.noAsar` 局部旁路下执行。

---

## 4. 构建与工具接口

### 4.1 构建

```powershell
$env:DSH_DESKTOP_NODE_EXECUTABLE='D:\Program Files (x86)\dsh\DeepSeek Harness.exe'
& 'D:\Program Files (x86)\dsh\resources\runtime\bin\node.cmd' tools\build-plugin.mjs
```

| 输入 | 输出 |
| --- | --- |
| `plugin/src/theme.css`, `plugin/src/tokens.js`, `plugin/src/client-body.js`, `plugin/package.json`(版本) | `plugin/client.js`（GENERATED，含横幅） |

### 4.2 研究 / 验证辅助工具（CLI）

| 工具 | 用法 | 说明 |
| --- | --- | --- |
| `tools/list-asar.mjs` | `node list-asar.mjs <app.asar> [子串]` | 列出 asar 内文件（按大小） |
| `tools/extract-asar.mjs` | `node extract-asar.mjs <app.asar> [outDir]` | 全量解包（`process.noAsar`） |
| `tools/extract-matched.mjs` | `node extract-matched.mjs <app.asar> <out> <子串...>` | 按名提取 |
| `tools/extract-css.mjs` | — | 提取宿主 CSS 参考 |
| `tools/lg-asar.mjs` | `node lg-asar.mjs <status\|inject\|restore>` | app.asar 窗口玻璃补丁 CLI（§1.5 同一引擎；应用起不来时的应急还原通道） |
| `tools/cdp.mjs` | `node cdp.mjs <script.js>` | 向运行中的 DSH 注入探针脚本（CDP） |
| `tools/probes/*.js` | 配合 `cdp.mjs` | 一次性 DOM / token 探针（归档） |

### 4.3 文案接口（locale/*.json）

| 键 | 说明 |
| --- | --- |
| `meta.title` | Plugin Hub 显示名 |
| `meta.description` | Plugin Hub 简介 |

设置页文案字典在 `client-body.js` 内（`NS = "settings.liquidglass"`，`zh`/`en`）。

---

## 5. 存储 / DOM 标记

| 标记 | 位置 | 说明 |
| --- | --- | --- |
| `data-lg-theme` | `<html>` | 当前加载版本号（调试确认用） |
| `data-lg-reveal` | `<html>` | 壁纸透出模式标记（`"on"` 开 / 无 关，见 §1.4） |
| `data-lg-sidebar-frame` | `<html>` | 左侧栏玻璃面板标记（`"off"` = 整块透明 / 无 = 玻璃面板，见 §1.4b） |
| `data-plugin` / `data-plugin-css` | 注入的 `<style>` | 样式所有权标记（重复注入去重 / 卸载移除） |
| `[data-lg-settings]` | 设置页根元素 | 设置页样式作用域 |
| `dsh.ui-liquidglass.tune.*` | localStorage | 调参持久化（见 §1.2） |
| `dsh.ui-liquidglass.reveal` | localStorage | 壁纸透出开关（`"1"` 开 / 移除 关，见 §1.4） |
| `dsh.ui-liquidglass.sidebarFrame` | localStorage | 左侧栏玻璃面板开关（`"0"` 透明 / 移除 玻璃面板，见 §1.4b） |
| `app.asar.lg-backup` | `resources\` | 窗口玻璃补丁的原始 app.asar 备份（见 §1.5） |

---

## 6. 窗口级玻璃能力边界（宿主契约）

结论：**真正的"透出桌面壁纸"（系统亚克力 / 云母）由宿主窗口创建选项决定，
插件侧任何途径都无法开启**；本插件已把渲染端一半做好（§1.4 reveal），
宿主一旦开启窗口透明 / 材质，整窗壁纸玻璃立即生效。

### 6.1 DSH 窗口现状（源码审计；`_dsh-src` 为 `app.asar` 解包参考，可删除）

| 窗口 | 平台 | 创建选项（`lib/main.js`） | 玻璃效果 |
| --- | --- | --- | --- |
| 主窗口 `createWindow()`（~L20103） | Windows | `titleBarStyle:"hidden"` + `titleBarOverlay{height:40}`；**无** `transparent` / `backgroundColor` / `backgroundMaterial` | 无（不透明窗口） |
| 主窗口 | macOS | `vibrancy:"sidebar"`、`backgroundColor:"#00000000"`（~L20124-26） | 有（系统 vibrancy） |
| 欢迎窗口 `welcomeWindowOptions()`（~L16552） | Windows | `backgroundColor:"#00000000"` + `backgroundMaterial:"acrylic"` + `titleBarOverlay{color:"#00000000"}`（~L16563-81） | **有（亚克力，官方自用配方）** |
| 登录窗口（~L18231） | 全部 | 普通带框窗口 | 无 |

- 运行时 Electron **44.7.0**（`D:\Program Files (x86)\dsh\version`），
  `backgroundMaterial` 选项与 `win.setBackgroundMaterial()` 均可用。
- 全源码无 `DwmSetWindowAttribute` / `DWMWA_*` 等 DWM 直调；
  macOS 的 `setVibrancy` 仅作最小化/恢复时的回退处理。

### 6.2 插件触达边界（为什么插件开不了）

| 途径 | 可行 | 依据 |
| --- | --- | --- |
| client bundle `require` | ✗ | 模块表白名单（§3.3），无 `electron` / ipc |
| client ctx 服务 | ✗ | 注册面均为渲染端服务（theme / locale / slots / layout / uiRenderer / connection / …），无窗口 / DWM / 材质 API |
| Host 插件（`dsh.bundle.patch`） | ✗ | 运行在 dsh 子进程（非 Electron 主进程），拿不到 BrowserWindow |
| 渲染端 CSS | 半边 | 只能做 §1.4 画布透明；窗口材质归 DWM / 主进程 |

### 6.3 宿主侧开启方法（已由设置页自动化，见 §1.5）

`lib/main.js` 主窗口 `createWindow()` 的 win32 分支追加欢迎窗口同款配方
——这正是设置页"注入 app.asar"按钮自动执行的改动：

```js
...process.platform === "win32" && primary ? {
  backgroundColor: "#00000000",
  backgroundMaterial: "acrylic",           // 或 "mica"
  titleBarStyle: "hidden",
  titleBarOverlay: { height: 40, color: "#00000000", symbolColor: /* 按主题 */ }
} : {}
```

开启后本插件的 §1.4 reveal 开关即完整生效：透明画布 + 玻璃面板透出桌面壁纸，
标题条渐隐自动改为两端透明（theme.css 已备好）。

> 由设置页"注入 app.asar"按钮自动执行（§1.5）：等长补丁 + 自动备份 + 可随时
> 还原；DSH 更新会覆盖注入（NSIS 全量重装），升级后重新注入即可。应急恢复：
> `node tools/lg-asar.mjs restore`（应用起不来时用它还原备份）。更长远的路径
> 仍是把"窗口材质 / 透明"作为功能请求提给 DSH 官方。
