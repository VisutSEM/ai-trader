@echo off
title Bost Trader - Next.js Frontend
echo ========================================================
echo   BOST TRADER - NEXT.JS TRADING TERMINAL (Port 3000)
echo ========================================================
cd /d "%~dp0frontend"
npm run dev -- -p 3000
pause
