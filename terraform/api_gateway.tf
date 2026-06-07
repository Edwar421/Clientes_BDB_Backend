# API Gateway HTTP API
resource "aws_apigatewayv2_api" "main" {
  name          = "${var.project_name}-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins  = ["*"]
    allow_methods  = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allow_headers  = ["*"]
    expose_headers = ["*"]
    max_age        = 300
  }

  tags = {
    Name = "${var.project_name}-api"
  }
}

# API Gateway Stage
resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.main.id
  name        = "$default"
  auto_deploy = true

  tags = {
    Name = "${var.project_name}-api-stage"
  }
}

# Lambda Integration - Customers
resource "aws_apigatewayv2_integration" "customers" {
  api_id                 = aws_apigatewayv2_api.main.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.customers.invoke_arn
  payload_format_version = "2.0"
}

# ============================================
# CUSTOMERS ROUTES
# ============================================

# GET /api/customers - Get all customers
resource "aws_apigatewayv2_route" "customers_get_all" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "GET /api/customers"
  target    = "integrations/${aws_apigatewayv2_integration.customers.id}"
}

# POST /api/customers - Create a customer
resource "aws_apigatewayv2_route" "customers_create" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "POST /api/customers"
  target    = "integrations/${aws_apigatewayv2_integration.customers.id}"
}

# PUT /api/customers/{id} - Update a customer
resource "aws_apigatewayv2_route" "customers_update" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "PUT /api/customers/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.customers.id}"
}

# DELETE /api/customers/{id} - Delete a customer
resource "aws_apigatewayv2_route" "customers_delete" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "DELETE /api/customers/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.customers.id}"
}

# ============================================
# HEALTH & DOCS ROUTES
# ============================================

# GET /health - Health check
resource "aws_apigatewayv2_route" "health" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "GET /health"
  target    = "integrations/${aws_apigatewayv2_integration.customers.id}"
}

# GET /api-docs - Swagger documentation
resource "aws_apigatewayv2_route" "api_docs" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "GET /api-docs"
  target    = "integrations/${aws_apigatewayv2_integration.customers.id}"
}

# GET /api-docs.json - Swagger JSON spec
resource "aws_apigatewayv2_route" "api_docs_json" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "GET /api-docs.json"
  target    = "integrations/${aws_apigatewayv2_integration.customers.id}"
}
