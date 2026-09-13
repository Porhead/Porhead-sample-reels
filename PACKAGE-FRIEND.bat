@echo off
chcp 65001 >nul
cd /d "%~dp0"

if not exist "runtime\node.exe" goto missing_runtime
if not exist "node_modules\vite\bin\vite.js" goto missing_vite

echo.
echo [1/3] Building the static website with current saved edits...
"runtime\node.exe" "node_modules\vite\bin\vite.js" build
if errorlevel 1 goto build_failed

echo.
echo [2/3] Creating Porhead-For-Friend.zip...
powershell -NoProfile -Command "Compress-Archive -Path 'dist','runtime','server.cjs','START-PORHEAD.bat' -DestinationPath 'Porhead-For-Friend.zip' -Force"
if errorlevel 1 goto zip_failed

echo.
echo [3/3] Package ready:
echo %cd%\Porhead-For-Friend.zip
echo.
echo Send this single zip file to your friend.
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

:zip_failed
echo The zip step failed.
pause
exit /b 1
