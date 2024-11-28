---
title: 'Manage AWS Infrastructure using Terraform'
date: 2024-11-15
author: Soulaimane Yahya
gravatar: b07a2846505a2629b7123ad50d5e21c303cf7c562a8893473c2114f7491c7796
twitter: '@soulaimaneyh'
image: 'https://raw.githubusercontent.com/multividas/engineering-multividas/main/thumbnails/manage-aws-infra-using-aws.webp'
---

In this article, we’ll dive deep into Manage AWS Infrastructure using Terraform.

---

### Table Of Contents

- Manage AWS Infrastructure using Terraform

# Manage AWS Infrastructure using Terraform

Terraform provides a way to build change and version infrastructure safety and efficiently, by representing your infra and all that settings with the hashicorp conf lang

blueprint can execute and automate everything you do in the cloud, it's free, open-source, written in Golang; [Github.com/hashicorp/terraform](https://github.com/hashicorp/terraform)

Expl `aws.tf` that explains how to manage **EC2 instances**, **S3 buckets**, and **VPC** using **Terraform**.

## Provider Configuration (aws)
- https://registry.terraform.io/providers/hashicorp/aws/latest

```yaml
# aws.tf
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.78.0"
    }
  }
  required_version = ">= 1.0"
}

# Provider
provider "aws" {
  region     = "us-east-1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

# Variables
variable "aws_access_key" {
  type      = string
  sensitive = true
}

variable "aws_secret_key" {
  type      = string
  sensitive = true
}
```

## VPC (Virtual Private Cloud)

```yaml
# VPCs
resource "aws_vpc" "main_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true

  tags = {
    Name = "main_vpc"
  }
}

resource "aws_vpc" "dev_vpc" {
  cidr_block = "10.1.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true

  tags = {
    Name = "dev_vpc"
  }
}
```

- Main VPC (`aws_vpc.main_vpc`): Creates a VPC with a CIDR block `10.0.0.0/16`, enabling DNS support and hostnames, which are required for internal DNS resolution.
- Development VPC (`aws_vpc.dev_vpc`): Creates a second VPC with a separate CIDR block `10.1.0.0/16` for development environments, also with DNS support enabled.

## Subnet in VPC

```yaml
# Subnets
resource "aws_subnet" "main_1" {
  vpc_id     = aws_vpc.main_vpc.id
  cidr_block = "10.0.1.0/24"
  tags = {
    Name = "main-1"
  }
}

resource "aws_subnet" "dev_2" {
  vpc_id     = aws_vpc.dev_vpc.id
  cidr_block = "10.1.1.0/24"
  tags = {
    Name = "dev-2"
  }
}
```

- Main Subnet (`aws_subnet.main_1`): Creates a subnet within the `main_vpc` with a CIDR block `10.0.1.0/24`. This subnet can be used for resources in the main VPC.
- Development Subnet (`aws_subnet.dev_2`): Creates a subnet within the `dev_vpc` with a CIDR block `10.1.1.0/24`. This subnet is designated for development resources.

## S3 Bucket

```yaml
# S3 Bucket
resource "aws_s3_bucket" "main_bucket" {
  bucket = "main-bucket-soulaimane"

  tags = {
    Name  = "Main Bucket"
  }
}

resource "aws_s3_bucket" "dev_bucket" {
  bucket = "dev-bucket-soulaimane"

  tags = {
    Name  = "Dev Bucket"
  }
}

# Output for S3 Buckets
output "s3_bucket_names" {
  value = [
    aws_s3_bucket.main_bucket.bucket,
    aws_s3_bucket.dev_bucket.bucket
  ]
}
```

## EC2 Instance

```yaml
# EC2 Instance in Main VPC
resource "aws_instance" "aws_main_servers" {
  ami           = "ami-0866a3c8686eaeeba"
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.main_1.id

  tags = {
    Name  = "aws_main_instance"
    Owner = "Soulaimane Yahya"
  }
}

resource "aws_instance" "aws_dev_servers" {
  ami           = "ami-0866a3c8686eaeeba"
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.dev_2.id

  tags = {
    Name  = "aws_dev_instance"
    Owner = "Soulaimane Yahya"
  }
}
```

### Init
```bash
terraform init
```

Init the working directory containing your Terraform configuration files, downloads the necessary provider plugins.

```bash
terraform plan
terraform plan --out=planfile
```

Previews the changes that Terraform will apply to the AWS infrastructure based on the configuration.

### Apply Configuration

```bash
terraform apply
```

Applies the changes and provisions the defined resources in AWS.

### Targeting Modules

To target specific resources, such as an EC2 instance or an S3 bucket, you can use the -target flag with terraform plan or terraform apply.

```sh
terraform plan -target=aws_instance.web_server
terraform apply -target=aws_instance.web_server
<service_name><instance_name>
```

### Destory

```bash
terraform destroy
```

### Additional Resources

- [Ansible playbook](https://engineering.multividas.com/posts/ansible-playbook)
- [Terraform project - GitHub repo](https://github.com/soulaimaneyahya/terraform-init)

### In summary

Using Terraform to manage AWS infrastructure allows for easy automation, version control, and scaling.
You can define resources like EC2 instances, S3 buckets, and VPCs in `.tf` files and use Terraform to provision, manage, and destroy them as needed.
