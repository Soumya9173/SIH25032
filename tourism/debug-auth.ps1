# Comprehensive Authentication Debugging
# This script tests various scenarios to identify the exact issue

$baseUrl = "http://localhost:8080"
$apiUrl = "$baseUrl/api"

Write-Host "🔍 Comprehensive Authentication Debug" -ForegroundColor Green
Write-Host "=" * 50

# Test 1: Check if backend is properly running
Write-Host "`n1. Testing backend connectivity..." -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/actuator/health" -Method GET -TimeoutSec 5
    Write-Host "✅ Backend health: $($health.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend connectivity failed: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# Test 2: Test a simple GET endpoint (if available)
Write-Host "`n2. Testing simple GET endpoint..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$apiUrl/marketplace/products" -Method GET -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ GET endpoint works: Status $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ GET endpoint failed: $($_.Exception.Response.StatusCode) - $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Test OPTIONS preflight
Write-Host "`n3. Testing CORS preflight..." -ForegroundColor Cyan
try {
    $headers = @{
        "Origin" = "http://localhost:3000"
        "Access-Control-Request-Method" = "POST"
        "Access-Control-Request-Headers" = "Content-Type"
    }
    $response = Invoke-WebRequest -Uri "$apiUrl/auth/login" -Method OPTIONS -Headers $headers -UseBasicParsing
    Write-Host "✅ CORS preflight successful: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ CORS preflight failed: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
}

# Test 4: Test POST without authentication (should work for auth endpoints)
Write-Host "`n4. Testing POST to auth endpoint..." -ForegroundColor Cyan
$headers = @{
    "Content-Type" = "application/json"
    "Origin" = "http://localhost:3000"
}
$loginData = '{"email":"test@test.com","password":"test123"}'

try {
    $response = Invoke-WebRequest -Uri "$apiUrl/auth/login" -Method POST -Body $loginData -Headers $headers -UseBasicParsing
    Write-Host "✅ POST endpoint accessible: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Response: $($response.Content)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ POST endpoint failed: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    
    # Try to get response body
    if ($_.Exception.Response) {
        try {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host "   Response body: $responseBody" -ForegroundColor Yellow
        } catch {
            Write-Host "   Could not read response body" -ForegroundColor Yellow
        }
    }
}

# Test 5: Check if Spring Security is blocking everything
Write-Host "`n5. Testing unprotected endpoint..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$apiUrl/chatbot/ask" -Method POST -Body '{"query":"hello"}' -Headers @{"Content-Type"="application/json"} -UseBasicParsing
    Write-Host "✅ Unprotected endpoint works: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Even unprotected endpoints are blocked: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    Write-Host "   This suggests a Spring Security configuration issue" -ForegroundColor Yellow
}

Write-Host "`n📋 Summary:" -ForegroundColor Green
Write-Host "   If all endpoints return 401, check Spring Security configuration" -ForegroundColor Yellow
Write-Host "   If only auth endpoints fail, check database/user creation" -ForegroundColor Yellow
Write-Host "   Look for any startup errors in IntelliJ console" -ForegroundColor Yellow