# Test Different Login Credentials
# This script tests various credentials to find working ones

$baseUrl = "http://localhost:8080/api"
$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "🔐 Testing Login Credentials" -ForegroundColor Green
Write-Host "=" * 40

# Test credentials array
$testCredentials = @(
    @{ email = "admin@jharkhandtourism.com"; password = "admin123"; role = "Admin" },
    @{ email = "guide@jharkhandtourism.com"; password = "guide123"; role = "Guide" },
    @{ email = "tourist@jharkhandtourism.com"; password = "tourist123"; role = "Tourist" },
    @{ email = "admin@admin.com"; password = "admin"; role = "Generic Admin" },
    @{ email = "test@test.com"; password = "test123"; role = "Test User" }
)

foreach ($cred in $testCredentials) {
    Write-Host "`nTesting: $($cred.role) - $($cred.email)" -ForegroundColor Cyan
    
    $loginData = @{
        email = $cred.email
        password = $cred.password
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginData -Headers $headers -TimeoutSec 5
        Write-Host "✅ SUCCESS: $($response.name) ($($response.role))" -ForegroundColor Green
        Write-Host "   Token: $($response.token.Substring(0, 20))..." -ForegroundColor Yellow
        break
    } catch {
        if ($_.Exception.Response.StatusCode -eq 401) {
            Write-Host "❌ Invalid credentials" -ForegroundColor Red
        } else {
            Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host "`n🔍 If none work, the database might need to be reset" -ForegroundColor Yellow
Write-Host "   Try restarting your Spring Boot application in IntelliJ" -ForegroundColor Yellow