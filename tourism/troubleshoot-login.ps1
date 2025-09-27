# Login Troubleshooting Script
# This script helps diagnose login issues

Write-Host "🔍 Troubleshooting Login Issues" -ForegroundColor Green
Write-Host "=" * 50

# Check if backend is running
Write-Host "`n1. Checking if backend is running..." -ForegroundColor Cyan
try {
    $healthResponse = Invoke-RestMethod -Uri "http://localhost:8080/actuator/health" -Method GET -TimeoutSec 5
    Write-Host "✅ Backend is running: $($healthResponse.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend is not running or not accessible" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "   Please start the Spring Boot application first" -ForegroundColor Yellow
    exit
}

# Test login endpoint with demo credentials
Write-Host "`n2. Testing login endpoint..." -ForegroundColor Cyan
$loginData = @{
    email = "admin@jharkhandtourism.com"
    password = "admin123"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
}

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method POST -Body $loginData -Headers $headers -TimeoutSec 10
    Write-Host "✅ Login endpoint works correctly" -ForegroundColor Green
    Write-Host "   User: $($loginResponse.name) ($($loginResponse.role))" -ForegroundColor Yellow
    Write-Host "   Token: $($loginResponse.token.Substring(0, 20))..." -ForegroundColor Yellow
} catch {
    Write-Host "❌ Login endpoint failed" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "   Response: $responseBody" -ForegroundColor Yellow
    }
}

# Check CORS headers
Write-Host "`n3. Checking CORS configuration..." -ForegroundColor Cyan
try {
    $corsHeaders = @{
        "Origin" = "http://localhost:3000"
        "Access-Control-Request-Method" = "POST"
        "Access-Control-Request-Headers" = "Content-Type"
    }
    
    $corsResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/login" -Method OPTIONS -Headers $corsHeaders -UseBasicParsing
    Write-Host "✅ CORS preflight successful" -ForegroundColor Green
    Write-Host "   Access-Control-Allow-Origin: $($corsResponse.Headers['Access-Control-Allow-Origin'])" -ForegroundColor Yellow
} catch {
    Write-Host "❌ CORS preflight failed" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Check database connection (if accessible)
Write-Host "`n4. Additional checks..." -ForegroundColor Cyan
Write-Host "   - Ensure MySQL is running on localhost:3306" -ForegroundColor Yellow
Write-Host "   - Check if database 'tourismdb' exists" -ForegroundColor Yellow
Write-Host "   - Verify frontend is running on http://localhost:3000" -ForegroundColor Yellow

Write-Host "`n🏁 Troubleshooting complete" -ForegroundColor Green