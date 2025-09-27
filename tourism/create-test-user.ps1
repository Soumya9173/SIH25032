# Register and Test Login
# This script registers a new user and then tests login

$baseUrl = "http://localhost:8080/api"
$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "👤 Register New User and Test Login" -ForegroundColor Green
Write-Host "=" * 45

# Register a new test user
Write-Host "`n1. Registering new test user..." -ForegroundColor Cyan
$registerData = @{
    name = "Test User"
    email = "testuser@example.com"
    password = "test123"
    phoneNumber = "9876543213"
    role = "TOURIST"
} | ConvertTo-Json

try {
    $regResponse = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method POST -Body $registerData -Headers $headers
    Write-Host "✅ Registration successful: $($regResponse.name)" -ForegroundColor Green
    Write-Host "   Email: $($regResponse.email)" -ForegroundColor Yellow
    Write-Host "   Role: $($regResponse.role)" -ForegroundColor Yellow
    
    # Now test login with the registered user
    Write-Host "`n2. Testing login with registered user..." -ForegroundColor Cyan
    $loginData = @{
        email = "testuser@example.com"
        password = "test123"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginData -Headers $headers
    Write-Host "✅ Login successful: $($loginResponse.name)" -ForegroundColor Green
    Write-Host "   Use these credentials in your frontend:" -ForegroundColor Yellow
    Write-Host "   Email: testuser@example.com" -ForegroundColor Cyan
    Write-Host "   Password: test123" -ForegroundColor Cyan
    
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Write-Host "❌ Registration failed - user might already exist" -ForegroundColor Red
        
        # Try login anyway
        Write-Host "`n2. Trying login with existing user..." -ForegroundColor Cyan
        $loginData = @{
            email = "testuser@example.com"
            password = "test123"
        } | ConvertTo-Json
        
        try {
            $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginData -Headers $headers
            Write-Host "✅ Login successful with existing user: $($loginResponse.name)" -ForegroundColor Green
            Write-Host "   Use these credentials in your frontend:" -ForegroundColor Yellow
            Write-Host "   Email: testuser@example.com" -ForegroundColor Cyan
            Write-Host "   Password: test123" -ForegroundColor Cyan
        } catch {
            Write-Host "❌ Login also failed: $($_.Exception.Message)" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ Registration failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}