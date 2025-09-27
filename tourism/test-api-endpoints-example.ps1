# Example API Endpoint Testing Script for Jharkhand Tourism Platform
#
# Instructions:
# - Copy this file to test-api-endpoints.ps1
# - Adjust any local values (baseUrl, credentials) as needed
# - Run locally to test your API endpoints
# - The file test-api-endpoints.ps1 is gitignored to avoid committing local-only scripts
#
# Note: Requires PowerShell 5+ and that the backend is running locally.

$baseUrl = "http://localhost:8080/api"
$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "🚀 Testing Jharkhand Tourism Platform API Endpoints" -ForegroundColor Green
Write-Host "Base URL: $baseUrl" -ForegroundColor Yellow
Write-Host "=" * 60

# Test 1: Health Check (if available)
Write-Host "`n1. Testing Health Check..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/actuator/health" -Method GET
    Write-Host "✅ Health Check: $($response.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Health Check failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: User Registration
Write-Host "`n2. Testing User Registration..." -ForegroundColor Cyan
$registerData = @{
    name = "Test User"
    email = "test@example.com"
    password = "test123"
    role = "TOURIST"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method POST -Body $registerData -Headers $headers
    Write-Host "✅ Registration successful: $($response.name)" -ForegroundColor Green
    $token = $response.token
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $token"
    }
} catch {
    Write-Host "❌ Registration failed: $($_.Exception.Message)" -ForegroundColor Red
    # Try with different email
    $registerData = @{
        name = "Test User 2"
        email = "test2@example.com"
        password = "test123"
        role = "TOURIST"
    } | ConvertTo-Json
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method POST -Body $registerData -Headers $headers
        Write-Host "✅ Registration successful (retry): $($response.name)" -ForegroundColor Green
        $token = $response.token
        $authHeaders = @{
            "Content-Type" = "application/json"
            "Authorization" = "Bearer $token"
        }
    } catch {
        Write-Host "❌ Registration retry failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 3: User Login
Write-Host "`n3. Testing User Login..." -ForegroundColor Cyan
$loginData = @{
    email = "admin@jharkhandtourism.com"
    password = "admin123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginData -Headers $headers
    Write-Host "✅ Login successful: $($response.name) ($($response.role))" -ForegroundColor Green
    $token = $response.token
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $token"
    }
} catch {
    Write-Host "❌ Login failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: AI Itinerary Planning
Write-Host "`n4. Testing AI Itinerary Planning..." -ForegroundColor Cyan
$itineraryData = @{
    budget = 50000
    durationDays = 5
    interests = @("adventure", "culture", "nature")
    preferredLocation = "Ranchi"
    accommodationType = "mid-range"
    transportPreference = "mixed"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/itinerary/plan" -Method POST -Body $itineraryData -Headers $authHeaders
    Write-Host "✅ Itinerary planning successful: $($response.itineraryId)" -ForegroundColor Green
    Write-Host "   Estimated Cost: ₹$($response.estimatedCost)" -ForegroundColor Yellow
    Write-Host "   Duration: $($response.durationDays) days" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Itinerary planning failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Chatbot
Write-Host "`n5. Testing Chatbot..." -ForegroundColor Cyan
$chatData = @{
    message = "What are the best places to visit in Jharkhand?"
    language = "en"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/chatbot/ask" -Method POST -Body $chatData -Headers $authHeaders
    Write-Host "✅ Chatbot response received" -ForegroundColor Green
    Write-Host "   Response: $($response.response.Substring(0, [Math]::Min(100, $response.response.Length)))..." -ForegroundColor Yellow
} catch {
    Write-Host "❌ Chatbot failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 6: Location Services
Write-Host "`n6. Testing Location Services..." -ForegroundColor Cyan
$locationData = @{
    latitude = 23.3441
    longitude = 85.3096
    radius = 10
    category = "tourist_attraction"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/location/nearby" -Method POST -Body $locationData -Headers $authHeaders
    Write-Host "✅ Location services working: $($response.nearbyPlaces.Count) places found" -ForegroundColor Green
} catch {
    Write-Host "❌ Location services failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 7: Transport Information
Write-Host "`n7. Testing Transport Information..." -ForegroundColor Cyan
$transportData = @{
    source = "Ranchi"
    destination = "Jamshedpur"
    transportType = "bus"
    date = "2024-12-25"
    passengers = 2
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/transport/realtime" -Method POST -Body $transportData -Headers $authHeaders
    Write-Host "✅ Transport info working: $($response.options.Count) options found" -ForegroundColor Green
} catch {
    Write-Host "❌ Transport info failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 8: Marketplace - Products
Write-Host "`n8. Testing Marketplace - Products..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/marketplace/products" -Method GET -Headers $authHeaders
    Write-Host "✅ Products API working: $($response.Count) products found" -ForegroundColor Green
} catch {
    Write-Host "❌ Products API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 9: Marketplace - Events
Write-Host "`n9. Testing Marketplace - Events..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/marketplace/events" -Method GET -Headers $authHeaders
    Write-Host "✅ Events API working: $($response.Count) events found" -ForegroundColor Green
} catch {
    Write-Host "❌ Events API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 10: Marketplace - Homestays
Write-Host "`n10. Testing Marketplace - Homestays..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/marketplace/homestays" -Method GET -Headers $authHeaders
    Write-Host "✅ Homestays API working: $($response.Count) homestays found" -ForegroundColor Green
} catch {
    Write-Host "❌ Homestays API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 11: Marketplace - Eco Tours
Write-Host "`n11. Testing Marketplace - Eco Tours..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/marketplace/ecotours" -Method GET -Headers $authHeaders
    Write-Host "✅ Eco Tours API working: $($response.Count) eco tours found" -ForegroundColor Green
} catch {
    Write-Host "❌ Eco Tours API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 12: Feedback Submission
Write-Host "`n12. Testing Feedback Submission..." -ForegroundColor Cyan
$feedbackData = @{
    feedbackText = "Great platform! The AI itinerary planning was very helpful."
    rating = 5
    category = "general"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/feedback/submit" -Method POST -Body $feedbackData -Headers $authHeaders
    Write-Host "✅ Feedback submission successful: $($response.sentiment)" -ForegroundColor Green
} catch {
    Write-Host "❌ Feedback submission failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 13: Blockchain Transaction
Write-Host "`n13. Testing Blockchain Transaction..." -ForegroundColor Cyan
$blockchainData = @{
    transactionType = "payment"
    amount = 1000
    description = "Test transaction"
    entityId = "test123"
    entityType = "booking"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/blockchain/transaction" -Method POST -Body $blockchainData -Headers $authHeaders
    Write-Host "✅ Blockchain transaction successful: $($response.transactionId)" -ForegroundColor Green
} catch {
    Write-Host "❌ Blockchain transaction failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 14: Guide Verification
Write-Host "`n14. Testing Guide Verification..." -ForegroundColor Cyan
$guideData = @{
    guideId = "GUIDE001"
    guideLicense = "LIC123456"
    guideName = "Test Guide"
    contactNumber = "9876543210"
    specialization = "Wildlife Tours"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/blockchain/verifyGuide" -Method POST -Body $guideData -Headers $authHeaders
    Write-Host "✅ Guide verification successful: $($response.isVerified)" -ForegroundColor Green
} catch {
    Write-Host "❌ Guide verification failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 15: Admin Analytics (Admin role required)
Write-Host "`n15. Testing Admin Analytics..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/admin/analytics" -Method GET -Headers $authHeaders
    Write-Host "✅ Analytics API working: $($response.dashboardStats.totalTourists) tourists" -ForegroundColor Green
} catch {
    Write-Host "❌ Analytics API failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n" + "=" * 60
Write-Host "🎉 API Testing Complete!" -ForegroundColor Green
Write-Host "Check the results above to see which endpoints are working properly." -ForegroundColor Yellow
