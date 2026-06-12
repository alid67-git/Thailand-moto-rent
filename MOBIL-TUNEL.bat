@echo off
chcp 65001 >nul
title Thailand Moto Rent - Telefon Tuneli
cd /d "%~dp0"

echo.
echo  ========================================
echo   Internet tuneli (disaridan erisim)
echo  ========================================
echo.

netstat -ano | findstr ":3001" | findstr "LISTENING" >nul 2>&1
if errorlevel 1 (
    echo  HATA: Port 3001 kapali!
    echo.
    echo  Once BASLAT.bat calistirin, "Ready" gorunene kadar bekleyin.
    echo  Sonra bu dosyayi TEKRAR acin.
    echo.
    pause
    exit /b 1
)

echo  Sunucu hazir. Tunel aciliyor...
echo.
echo  Asagida YENI https://....loca.lt adresi cikacak.
echo  Eski linkler calismaz — sadece bu penceredeki linki kullanin.
echo.
echo  Bad Gateway gorurseniz:
echo  1. BASLAT.bat acik mi kontrol edin
echo  2. Bu pencereyi kapatip MOBIL-TUNEL.bat'i yeniden acin
echo  3. Telefonda YENI linki acin (eski yer imini silin)
echo.
echo  Ilk acilista "Click to Continue" veya tunnel sifresi
echo  istenebilir. Sifre: bilgisayarda https://ifconfig.me IP'si.
echo.
echo  Kapatmak icin Ctrl+C
echo.

npx --yes localtunnel --port 3001 --local-host 127.0.0.1

pause
