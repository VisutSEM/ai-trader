@echo off
title Bost Trader - Laravel API Backend
echo ========================================================
echo   BOST TRADER - LARAVEL API BACKEND (Port 8000)
echo ========================================================
cd /d "%~dp0backend"
php artisan serve --port=8000
pause
