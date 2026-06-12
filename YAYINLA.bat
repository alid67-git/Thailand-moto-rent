@echo off
chcp 65001 >nul
title Thailand Moto Rent - Canli Yayin (Vercel)
cd /d "%~dp0"

echo.
echo  ========================================
echo   thailand-moto-rent.com - Canli yayin
echo  ========================================
echo.
echo  Domain aldiniz. Siteyi gormek icin 3 adim:
echo.
echo  ADIM 1 - GitHub (bir kez)
echo  -------------------------
echo  1. https://github.com/new acin
echo  2. Repo adi: thailand-moto-rent (Private veya Public)
echo  3. Asagidaki komutlari bu klasorde calistirin:
echo.
echo     git init
echo     git add .
echo     git commit -m "Initial deploy"
echo     git branch -M main
echo     git remote add origin https://github.com/KULLANICI/thailand-moto-rent.git
echo     git push -u origin main
echo.
echo  (KULLANICI yerine kendi GitHub kullanici adiniz)
echo.
echo  ADIM 2 - Vercel (ucretsiz hosting)
echo  ----------------------------------
echo  1. https://vercel.com/signup - GitHub ile giris
echo  2. Add New Project - repoyu secin - Deploy
echo  3. Settings - Environment Variables:
echo       NEXT_PUBLIC_APP_URL = https://thailand-moto-rent.com
echo  4. Settings - Domains - thailand-moto-rent.com ekleyin
echo     www.thailand-moto-rent.com de ekleyin (istege bagli)
echo.
echo  ADIM 3 - Domain DNS (domain nereden alindiysa orada)
echo  ----------------------------------------------------
echo  Vercel size kayit gosterecek. Genelde su ikisinden biri:
echo.
echo  A) Nameserver degistir (en kolay):
echo     Vercel'in verdigini domain paneline yapistirin
echo.
echo  B) Manuel DNS kayitlari:
echo     A     @    76.76.21.21
echo     CNAME www  cname.vercel-dns.com
echo.
echo  5-30 dakika sonra https://thailand-moto-rent.com acilir.
echo.
echo  ----------------------------------------
echo  Hizli test (CLI - GitHub olmadan):
echo  ----------------------------------------
echo  Asagida Vercel CLI acilacak. Ilk seferde tarayicida
echo  giris yapmaniz istenir. Sonra domain Vercel panelden baglanir.
echo.
pause
echo.
call npx vercel --prod
echo.
pause
