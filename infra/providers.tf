terraform {
  required_version = "~> 1.13.5"

  backend "s3" {
    bucket = "saferupeez-tf-state"
    key    = "saferupeez-website/terraform.tfstate"
    region = "ap-south-1"
    encrypt = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Default provider (application infra)
provider "aws" {
  region = "ap-south-1"
}

# us-east-1 provider for ACM used by CloudFront
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
