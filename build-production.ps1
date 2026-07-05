# Production Build Script
# Builds the app and copies all necessary files for deployment

Write-Host "🚀 Building Project Cimochy for Production..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean previous build
Write-Host "📦 Step 1: Cleaning previous build..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Path "dist" -Recurse -Force
    Write-Host "✓ Old build cleaned" -ForegroundColor Green
} else {
    Write-Host "✓ No previous build found" -ForegroundColor Green
}
Write-Host ""

# Step 2: Build React app
Write-Host "⚙️  Step 2: Building React application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ React build successful" -ForegroundColor Green
} else {
    Write-Host "✗ Build failed! Please check errors above." -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 3: Copy static files
Write-Host "📁 Step 3: Copying static files..." -ForegroundColor Yellow

# Copy PageProdukKami
if (Test-Path "public\PageProdukKami") {
    Copy-Item -Path "public\PageProdukKami" -Destination "dist\PageProdukKami" -Recurse -Force
    Write-Host "  ✓ PageProdukKami copied" -ForegroundColor Green
}

# Copy Gambar
if (Test-Path "public\Gambar") {
    Copy-Item -Path "public\Gambar" -Destination "dist\Gambar" -Recurse -Force
    Write-Host "  ✓ Gambar copied" -ForegroundColor Green
}

# Copy other public files (exclude index.html)
Get-ChildItem -Path "public" -File | Where-Object { $_.Name -ne "index.html" } | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination "dist\" -Force
}
Write-Host "  ✓ Other public files copied" -ForegroundColor Green
Write-Host ""

# Step 4: Create _redirects for SPA routing (Netlify)
Write-Host "🔧 Step 4: Creating routing config..." -ForegroundColor Yellow
$redirectsContent = "/*    /index.html   200"
Set-Content -Path "dist\_redirects" -Value $redirectsContent
Write-Host "  ✓ _redirects created for Netlify" -ForegroundColor Green
Write-Host ""

# Step 5: Verify build
Write-Host "✅ Step 5: Verifying build..." -ForegroundColor Yellow
$distFiles = @(
    "dist\index.html",
    "dist\PageProdukKami\sd\programsd.html",
    "dist\PageProdukKami\smp\programsmp.html",
    "dist\PageProdukKami\sma\programsma.html",
    "dist\Gambar"
)

$allFilesExist = $true
foreach ($file in $distFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file NOT FOUND" -ForegroundColor Red
        $allFilesExist = $false
    }
}
Write-Host ""

# Step 6: Summary
Write-Host "=" * 60 -ForegroundColor Cyan
if ($allFilesExist) {
    Write-Host "🎉 BUILD SUCCESSFUL!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "  1. Test locally: npx serve dist" -ForegroundColor White
    Write-Host "  2. Deploy to hosting:" -ForegroundColor White
    Write-Host "     - Netlify: Drag 'dist' folder to https://app.netlify.com/drop" -ForegroundColor White
    Write-Host "     - Vercel: vercel --prod" -ForegroundColor White
    Write-Host "     - Manual: Upload 'dist' folder to your web server" -ForegroundColor White
    Write-Host ""
    Write-Host "📁 Build output: dist/" -ForegroundColor Cyan
    
    # Show build size
    $distSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "📊 Total size: $([math]::Round($distSize, 2)) MB" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  BUILD COMPLETED WITH WARNINGS" -ForegroundColor Yellow
    Write-Host "Some files are missing. Please check above." -ForegroundColor Yellow
}
Write-Host "=" * 60 -ForegroundColor Cyan
