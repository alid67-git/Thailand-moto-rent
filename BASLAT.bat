@echo off

chcp 65001 >nul

title Thailand Moto Rent

cd /d "%~dp0"



echo.

echo  ========================================

echo   Thailand Moto Rent - Baslatiliyor...

echo  ========================================

echo.



if not exist "node_modules\" (

    echo  [1/3] Ilk kurulum: paketler yukleniyor...

    echo        Bu adim bir kez calisir, 1-2 dk surebilir.

    echo.

    call npm install

    if errorlevel 1 (

        echo.

        echo  HATA: npm install basarisiz. Node.js kurulu mu kontrol edin.

        pause

        exit /b 1

    )

) else (

    echo  [1/3] Paketler hazir.

)



echo  [2/4] Eski sunucu ve onbellek temizleniyor...

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)

if exist ".next\" (
    rmdir /s /q .next
)

echo  [3/4] Sunucu baslatiliyor (port 3001)...

echo  [4/4] Tarayici acilacak: http://localhost:3001

echo.

for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /c:"IPv4"') do (
    set "LAN_IP=%%i"
    goto :foundip
)
:foundip
set "LAN_IP=%LAN_IP: =%"
if defined LAN_IP (
    echo  TELEFONDAN ACIN ^(ayni Wi-Fi^):
    echo.
    echo    http://%LAN_IP%:3001
    echo.
    echo  ONEMLI:
    echo  - http yazin, https DEGIL ^(https = err_ssl_protocol_error^)
    echo  - localhost telefonda CALISMAZ
    echo  - Wi-Fi izolasyonu varsa MOBIL-TUNEL.bat kullanin
    echo.
)

echo  Durdurmak icin bu pencerede Ctrl+C yapin veya pencereyi kapatin.

echo.



start "" cmd /c "timeout /t 20 /nobreak >nul && start http://localhost:3001"



npm run dev



pause

