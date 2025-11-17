output "site_domain" {
  value       = local.site_domain
  description = "The domain your site will be served on"
}

output "website_bucket_name" {
  value       = aws_s3_bucket.website.id
  description = "S3 bucket name for static website hosting"
}

output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.website.domain_name
  description = "CloudFront distribution domain name"
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.website.id
  description = "CloudFront distribution ID"
}

output "acm_dns_validation_records" {
  description = "DNS records required for ACM validation (configure these in Cloudflare)"
  value = {
    for dvo in aws_acm_certificate.site.domain_validation_options :
    dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }
}
