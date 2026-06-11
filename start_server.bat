@echo off
chcp 65001 >nul 2>&1
title XiaoGuo Study

echo.
echo  Starting server...
echo.

:: Kill old servers on port 8080
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)

:: Wait for port to free
timeout /t 1 /nobreak >nul

where python >nul 2>&1 || (
    echo  Python not found!
    pause
    exit /b 1
)

start /b python -m http.server 8080
timeout /t 2 /nobreak >nul

echo  http://localhost:8080/math/index.html
echo.
echo  Press Ctrl+C to stop.
echo.
start http://localhost:8080/math/index.html

:loop
timeout /t 60 /nobreak >nul
goto loop
