variable "project_name" {
  type        = string
  description = "Project name used for tagging and resource names"
  default     = "saferupeez-website"
}

variable "domain_name" {
  type        = string
  description = "Root domain you own"
  default     = "saferupeez.com"
}

variable "site_subdomain" {
  type        = string
  description = "Subdomain to serve the site on (www -> www.saferupeez.com)"
  default     = "www"
}

locals {
  site_domain = "${var.site_subdomain}.${var.domain_name}" # www.saferupeez.com

  common_tags = {
    Project = var.project_name
    Managed = "terraform"
  }
}
