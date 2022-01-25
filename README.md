# VueJS + Webpack Frontend for Content API by Serverless

## Instration

#### Preparation

You need below

* nodeJS >= v14.15.X


## Setup GitHub Actions for deploying static site

### Set enviroment variables

* Access to https://github.com/{your-account}/{repository-name}/settings/secrets/actions
* Push "New repository secret"
* Add Below
    * __AWS_ACCESS_KEY_ID__ : your-aws-access_key
    * __AWS_SECRET_ACCESS_KEY__ : your-aws-secret_key
    * __CLOUDFRONT_DISTRIBUTION__ : your cloudfront distribution created by terraform 
    * __S3_CONFIG_BUCKET__: "content-api-config-hoge"
    * __S3_RESOURCE_BUCKET__: "your-domain-static-site.example.com"

### Upload config file for frontend app

#### Edit config file

```bash
cd (project_root_dir)
vi src/client/js/config/config.json
```

```json
{
  "domain": "your-api-domain.example.com",
  "port": null,
  "baseUrl": "/",
  "isSSL": true,
  "siteName": "Sample Site"
}
```

#### Upload S3 Bucket named "content-api-config-hoge"

#### Deploy continually on pushed to git
