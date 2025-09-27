# Remove problematic CORS annotations from all controllers
# This fixes the CORS credential conflict

$controllers = @(
    "AdminController.java",
    "BlockchainController.java", 
    "ChatbotController.java",
    "EcoTourController.java",
    "EventController.java",
    "FeedbackController.java",
    "HomestayController.java",
    "ItineraryController.java",
    "LocationController.java",
    "ProductController.java",
    "TransportController.java"
)

$basePath = "src\main\java\com\jharkhand\tourism\controller\"

Write-Host "🔧 Fixing CORS annotations in controllers..." -ForegroundColor Green

foreach ($controller in $controllers) {
    $filePath = Join-Path $basePath $controller
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        $updatedContent = $content -replace '@CrossOrigin\(origins = "\*"\)\r?\n', ''
        Set-Content $filePath $updatedContent -NoNewline
        Write-Host "✅ Fixed: $controller" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Not found: $controller" -ForegroundColor Red
    }
}

Write-Host "`n🎯 All controllers fixed! Now restart your Spring Boot application." -ForegroundColor Green