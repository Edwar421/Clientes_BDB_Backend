terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.98"
    }
  }

  backend "s3" {
    bucket         = "clientes-bdb-tf-state"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "clientes-bdb-terraform-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}
