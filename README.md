# 魔理沙UI（Marisa UI）

> DeepSeek Harness 网页端的极光玻璃主题插件（`@local/dsh-ui-liquidglass`）。
> 静态极光画布 + 悬浮玻璃面板 + 深浅双主题，**零逐帧性能开销**。

## 安装

```powershell
dsh plugin --profile web add github:LanluZ/dsh-marisa-ui-plugin
```

桌面端把 `--profile web` 换成 `--profile desktop`。

安装后**完全退出 DeepSeek Harness 再重新打开**生效 —— 只按 `Ctrl+R` 可能仍在用旧 bundle 缓存。
确认版本：开发者工具控制台应看到 `[魔理沙UI] active v1.9.1`。

## 能力

- **零模糊性能模型**：全项目禁用 `backdrop-filter` / `filter` / `mix-blend-mode` / CSS 动画 /
  指针监听。极光一次绘制在文档画布上、由合成器缓存，滚动与流式输出零重绘。
- **悬浮玻璃面板**：侧边栏、主面板、输入卡、菜单、弹窗、toast、消息气泡统一玻璃化 ——
  半透明填充 + 顶部镜面高光 + 青/紫内缘色散 + 静态投影。
- **深浅双主题**：交互色板一处声明、两套取值，杜绝单边漂移。
- **设置 → 魔理沙UI**：6 个滑杆（极光强度 / 玻璃不透明度 / 高光描边 / 圆角缩放 /
  阴影深度 / 焦点环）+「透出桌面壁纸」开关，即时生效、localStorage 自动持久化、可一键恢复默认。
- **窗口玻璃注入（Windows）**：设置页一键向安装目录 `app.asar` 注入原生亚克力窗口
  （自动备份原件、可随时还原 / 再注入），配合「透出桌面壁纸」即为完整壁纸玻璃。

## 开发

```powershell
node tools/build-plugin.mjs
```

`plugin/client.js` 与根目录 `package.json` 都由构建脚本生成（源码是
`plugin/src/{theme.css,tokens.js,client-body.js}` + `plugin/package.json`），**请勿手改**，
改完源码重新运行上面的命令即可。

接口契约见 [docs/API.md](docs/API.md)。

## 许可证

MIT
