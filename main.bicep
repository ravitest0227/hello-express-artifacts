@description('The location for all resources.')
param location string = resourceGroup().location

@description('The name of the App Service Plan.')
param appServicePlanName string = 'demo-asp-${uniqueString(resourceGroup().id)}'

@description('The name of the Web App.')
param webAppName string = 'demo-webapp-${uniqueString(resourceGroup().id)}'

@description('The SKU of the App Service Plan.')
param sku object = {
  name: 'F1'
  tier: 'Free'
}

resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: appServicePlanName
  location: location
  sku: sku
  kind: 'linux'
  properties: {
    reserved: true // Required for Linux plans
  }
}

resource webApp 'Microsoft.Web/sites@2022-03-01' = {
  name: webAppName
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|18-lts'
    }
  }
}

output webAppUrl string = 'https://${webApp.properties.defaultHostName}'
