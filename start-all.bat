@echo off
title Launch Bost Trader
echo ========================================================
echo   STARTING BOST TRADER PLATFORM
echo   Backend:  http://localhost:8000
echo   Frontend: http://localhost:3000
echo ========================================================

start "Bost Trader Backend (Laravel)" cmd.exe /k "cd /d D:\bost-trader\backend && php artisan serve --port=8000"
ping 127.0.0.1 -n 3 >nul
start "Bost Trader Frontend (Next.js)" cmd.exe /k "cd /d D:\bost-trader\frontend && npm run dev -- -p 3000"
ping 127.0.0.1 -n 4 >nul

start http://localhost:3000
echo Bost Trader launched successfully!
