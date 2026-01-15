# PowerShell script to run Cypress with TLS configurations
# Set environment variables to handle TLS/SSL issues
$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
$env:NODE_EXTRA_CA_CERTS = ""
$env:HTTPS_PROXY = ""
$env:HTTP_PROXY = ""

# Change to the project directory
Set-Location "c:\Users\user\Desktop\msdat"

# Update browserslist database
Write-Host "Updating browserslist database..."
npx browserslist@latest --update-db

# Run the Cypress test
Write-Host "Running Cypress test..."
npx cypress run --spec tests\e2e\specs\health_finance.cy.js --config chromeWebSecurity=false
