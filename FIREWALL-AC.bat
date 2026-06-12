@echo off
chcp 65001 >nul
title Thailand Moto Rent - Guvenlik Duvari
cd /d "%~dp0"

net session >nul 2>&1
if errorlevel 1 (
    echo.
    echo  Bu dosyaya SAG TIK ^> "Yonetici olarak calistir" gerekli.
    echo.
    pause
    exit /b 1
)

echo.
echo  Port 3001 aciliyor...
netsh advfirewall firewall delete rule name="Thailand Moto Rent Dev 3001" >nul 2>&1
netsh advfirewall firewall add rule name="Thailand Moto Rent Dev 3001" dir=in action=allow protocol=TCP localport=3001 profile=any
echo.
echo  Tamam. Simdi BASLAT.bat calistirin.
echo  Telefonda: http://[BASLAT'taki IP]:3001
echo.
pause
