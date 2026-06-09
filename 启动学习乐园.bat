@echo off
chcp 65001 >nul 2>&1
title 🎮 小郭学习乐园 - 本地服务器

echo.
echo  ========================================
echo   🎮 小郭学习乐园 - 本地服务器
echo  ========================================
echo.

:: 检查 Python 是否可用
where python >nul 2>&1
if %errorlevel% equ 0 (
    echo  [√] 检测到 Python，正在启动服务器...
    echo.
    echo  🌐 请在浏览器中打开: http://localhost:8080
    echo  📂 数学乐园入口: http://localhost:8080/math/index.html
    echo.
    echo  按 Ctrl+C 停止服务器
    echo.
    start "" "http://localhost:8080/math/index.html"
    python -m http.server 8080
    goto :eof
)

where python3 >nul 2>&1
if %errorlevel% equ 0 (
    echo  [√] 检测到 Python3，正在启动服务器...
    echo.
    echo  🌐 请在浏览器中打开: http://localhost:8080
    echo  📂 数学乐园入口: http://localhost:8080/math/index.html
    echo.
    echo  按 Ctrl+C 停止服务器
    echo.
    start "" "http://localhost:8080/math/index.html"
    python3 -m http.server 8080
    goto :eof
)

where py >nul 2>&1
if %errorlevel% equ 0 (
    echo  [√] 检测到 py launcher，正在启动服务器...
    echo.
    echo  🌐 请在浏览器中打开: http://localhost:8080
    echo  📂 数学乐园入口: http://localhost:8080/math/index.html
    echo.
    echo  按 Ctrl+C 停止服务器
    echo.
    start "" "http://localhost:8080/math/index.html"
    py -m http.server 8080
    goto :eof
)

echo  [×] 未检测到 Python！
echo.
echo  请安装 Python 后重试，或者手动用其他方式启动本地服务器。
echo  下载地址: https://www.python.org/downloads/
echo.
echo  或者用 Node.js 方式:
echo    npx http-server -p 8080 -c-1
echo.
pause
