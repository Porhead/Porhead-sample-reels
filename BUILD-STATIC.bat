@echo off
chcp 65001 >nul
cd /d "%~dp0"

if not exist "runtime\node.exe" goto missing_runtime
if not exist "node_modules\vite\bin\vite.js" goto missing_vite

echo.
echo [1/2] Building the static website with current saved edits...
"runtime\node.exe" "node_modules\vite\bin\vite.js" build
if errorlevel 1 goto build_failed

echo.
echo [2/2] Build complete.
echo Upload the contents of the "dist" folder to GitHub Pages, Netlify, or Vercel.
echo.
pause
exit /b 0

:missing_runtime
echo runtime\node.exe was not found.
pause
exit /b 1

:missing_vite
echo node_modules\vite\bin\vite.js was not found.
echo Run "pnpm install" first.
pause
exit /b 1

:build_failed
echo The build failed. Check the messages above.
pause
exit /b 1
