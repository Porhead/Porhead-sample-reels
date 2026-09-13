@echo off
cd /d "%~dp0"
title Porhead Portfolio

if not exist "dist\index.html" goto missing_dist
if not exist "runtime\node.exe" goto missing_runtime

echo Starting Porhead Portfolio...
echo.
"runtime\node.exe" "server.cjs"
echo.
echo The site has stopped.
pause
exit /b 0

:missing_dist
echo dist\index.html was not found.
pause
exit /b 1

:missing_runtime
echo runtime\node.exe was not found.
pause
exit /b 1
