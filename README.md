This is a Whizlabs 3.0 website bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone the repository:

```bash
npm install
```

then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Components

All components can be found under `components/` directory.
Component sare divided under two sub-categories -

```
plugins/ -> Contains reusable blocks
shared/  -> Contains shared components
```

<hr/>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!



import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "courseData.json");
fs.writeFileSync(filePath, JSON.stringify(courseResponse.data, null, 2), "utf8");



# NEXT_PUBLIC_BASE_URL=https://ea8arnvptc.execute-api.us-east-1.amazonaws.com/quality

NEXT_PUBLIC_BASE_URL=https://bx82ip9g4f.execute-api.us-east-1.amazonaws.com/production
NEXT_PUBLIC_BASE_PATH=http://localhost:5001/
NEXT_PUBLIC_STRIPE_PKEY=pk_test_Ht13CJZsnoei83Iu9wU8LlxE
NEXT_PUBLIC_CCAVENUE_ACCESS_CODE= AVCZ03IF78AA98ZCAA
NEXT_PUBLIC_CCAVENUE_TXN_URL=https://test.ccavenue.com
NEXT_PUBLIC_ADMIN_URL=https://quality-api.whizlabs.org/api/v3
NEXT_PUBLIC_LMS_URL=https://quality.whizlabs.org/learn
NEXT_PUBLIC_FORUM_URL=https://quality.whizlabs.org/forums
NEXT_PUBLIC_PLAY_URL=https://quality.whizlabs.org/labs
NEXT_PUBLIC_PLAY_URL_PYTHON=https://play.whizlabs.org
NEXT_PUBLIC_BUSINESS_URL=https://business-dev.whizlabs.org/
NEXT_PUBLIC_LEARN_MEDIA_URL=https://media.whizlabs.com/learn/
NEXT_PUBLIC_WEB_MEDIA_URL=https://media.whizlabs.com/website/
NEXT_PUBLIC_FORUM_MEDIA_URL=https://media.whizlabs.com/forum/

# NEXT_PUBLIC_LEARN_MEDIA_URL=https://media.whizlabs.org/learn/

# NEXT_PUBLIC_WEB_MEDIA_URL=https://media.whizlabs.org/website/

# NEXT_PUBLIC_FORUM_MEDIA_URL=https://media.whizlabs.org/forum/

GOOGLE_ID=813427700262-3ckuigvc4fg4579807hao2g76kh2c1tr.apps.googleusercontent.com
GOOGLE_SECRET=FHCupruG8gO9iFYUZyQESWQv
FACEBOOK_CLIENT_ID=139383662758157
FACEBOOK_CLIENT_SECRET=6bb3b9743cb0204cbf6aa8a5d63c9959

APPLE_ID=com.whizlabs.login
APPLE_TEAM_ID=6CX3H79L9B
APPLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgxfScyDcsU7mlXAZM\nXJQVrTi6mbe6h7jfTtBmFMPypsegCgYIKoZIzj0DAQehRANCAARejgpywenkknF4\ndE4Th2WSg1aiIBowK3HlyUpvD2/jR5Bx7F3sROHW1JXnPG7pxzuec/Ay+Fn/um0y\nAqpyk0Is\n-----END PRIVATE KEY-----
APPLE_KEY_ID=GBQP6XVQHK

LINKEDIN_CLIENT_ID=81c884jnzhhcvf
LINKEDIN_CLIENT_SECRET=CURSwJaX12WroEEZ
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=81c884jnzhhcvf
NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET=CURSwJaX12WroEEZ
NEXTAUTH_URL=https://quality.whizlabs.org
NEXTAUTH_SECRET=2ZR07hao2g2g76khre8SwJaXfeo76khCU
NEXT_PUBLIC_SECRET_KEY=2ZR07hao2g2g76khre8SwJaXfeo76khCU

# Enable Disable Search Keyword Capture

NEXT_PUBLIC_SEARCH_KEYWORD_CAPTURE_ENABLED=True
NEXT_PUBLIC_APPLE_CLIEND_ID=com.whizlabs.login
NEXT_PUBLIC_APPLE_REDIRECT_URI=https://quality.whizlabs.org

NEXT_PUBLIC_ASSIST_URL = https://71t282y816.execute-api.us-east-1.amazonaws.com/dev

<!-- buildspec.yml -->

version: 0.2

phases:
install:
runtime-versions:
nodejs: 20
pre_build:
commands: - echo Logging in to Amazon ECR... - aws --version - sh dockerlogin.sh
#- $(aws ecr get-login --region $AWS_DEFAULT_REGION --no-include-email)
     # - REPOSITORY_URI=713814803562.dkr.ecr.us-east-1.amazonaws.com/websitev3
      - COMMIT_HASH=$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)
      - IMAGE_TAG=${COMMIT_HASH:=latest} - docker pull $REPOSITORY_URI:latest || true

build:
commands: - echo "copy the s3 bucket files" - aws s3 cp s3://$deploymentBucket/whizlabs_website_v3/$ENV/.env . - echo Build started on `date` - echo Building the Docker image... - sh dockerlogin.sh
#- sh $Dockerlogin  || echo "No environment placed in the codebuild variable"
      #- docker build -t $REPOSITORY_URI:latest .
      - docker build  --cache-from $REPOSITORY_URI:latest -t $REPOSITORY_URI:latest .
      - docker tag $REPOSITORY_URI:latest $REPOSITORY_URI:$IMAGE_TAG
post_build:
commands: - echo Build completed on `date` - echo Pushing the Docker images... - docker push $REPOSITORY_URI:latest
      - docker push $REPOSITORY_URI:$IMAGE_TAG - echo Writing image definitions file... - printf '[{"name":"%s","imageUri":"%s"}]' "$TASKENV" "$REPOSITORY_URI:$IMAGE_TAG" > imagedefinitions.json
artifacts:
files: imagedefinitions.json

<!-- appspec.yml -->

version: 0.0
os: linux
files:

- source: /
  destination: /home/corp/whizlabs_website_v3/
  overwrite: true
  permissions:
- object: /
  pattern: "\*\*"
  owner: corp
  group: corp

hooks:
BeforeInstall: - location: scripts/before_install.sh
timeout: 300

AfterInstall: - location: scripts/after_install.sh
timeout: 1200

 <svg width="114" height="30" viewBox="0 0 114 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M48.64 6.81V3.39H33.13V24H48.64V20.58H36.88V15.21H47.53V11.79H36.88V6.81H48.64ZM63.9016 3.03V10.89C62.6716 9.15 60.8116 8.13 58.5316 8.13C54.4216 8.13 51.4216 11.49 51.4216 16.23C51.4216 21 54.4216 24.36 58.5316 24.36C60.8116 24.36 62.6716 23.34 63.9016 21.6V24H67.5616V3.03H63.9016ZM59.5216 21.24C56.9116 21.24 55.0516 19.14 55.0516 16.23C55.0516 13.32 56.9116 11.25 59.5216 11.25C62.1016 11.25 63.9016 13.32 63.9016 16.23C63.9016 19.14 62.1016 21.24 59.5216 21.24ZM82.1819 8.49V18.3C81.9419 19.95 80.3519 21.24 78.4319 21.24C76.5119 21.24 75.1619 19.74 75.1619 17.64V8.49H71.6219V18.36C71.6219 21.87 73.9919 24.36 77.3819 24.36C79.4219 24.36 81.2219 23.37 82.1819 21.93V24H85.8419V8.49H82.1819ZM95.0652 24H98.5152L105.085 8.49H101.185L96.7752 19.77L92.2752 8.49H88.4052L95.0652 24ZM109.489 6.15C110.629 6.15 111.559 5.16 111.559 4.05C111.559 2.94 110.629 1.98 109.489 1.98C108.319 1.98 107.389 2.94 107.389 4.05C107.389 5.16 108.319 6.15 109.489 6.15ZM107.629 24H111.289V8.49H107.629V24Z" fill="#0A033C"/>
<rect width="25" height="30" rx="5" fill="#FF6652"/>
<path d="M5.75321 8.12402C5.75272 8.12402 5.75218 8.12402 5.75169 8.12402C5.58145 8.12402 5.42133 8.19039 5.30042 8.31099C5.17817 8.43293 5.11084 8.5953 5.11084 8.76815V18.4267C5.11084 18.7808 5.40011 19.0697 5.75575 19.0706C7.25503 19.0742 9.76692 19.3867 11.4998 21.2001V11.0922C11.4998 10.9721 11.4691 10.8593 11.4112 10.766C9.98898 8.47554 7.25588 8.12754 5.75321 8.12402Z" fill="white"/>
<path d="M18.8889 18.4267V8.76815C18.8889 8.5953 18.8215 8.43293 18.6993 8.31099C18.5784 8.19039 18.4181 8.12402 18.2481 8.12402C18.2475 8.12402 18.247 8.12402 18.2465 8.12402C16.7439 8.1276 14.0108 8.4756 12.5885 10.766C12.5306 10.8594 12.5 10.9722 12.5 11.0922V21.2001C14.2329 19.3867 16.7447 19.0742 18.244 19.0706C18.5996 19.0697 18.8889 18.7808 18.8889 18.4267Z" fill="white"/>
<path d="M20.3562 10.3516H19.8891V18.4268C19.8891 19.3311 19.1524 20.0685 18.2467 20.0707C16.975 20.0738 14.8781 20.3224 13.3931 21.728C15.9614 21.0991 18.669 21.5079 20.212 21.8595C20.4047 21.9034 20.6038 21.8581 20.7581 21.7351C20.9119 21.6123 21.0002 21.4289 21.0002 21.232V10.9956C21.0002 10.6405 20.7113 10.3516 20.3562 10.3516Z" fill="white"/>
<path d="M4.11103 18.4268V10.3516H3.644C3.28897 10.3516 3 10.6405 3 10.9956V21.2318C3 21.4288 3.08824 21.6121 3.24206 21.7349C3.3963 21.8578 3.59521 21.9034 3.78818 21.8594C5.33122 21.5077 8.0388 21.0989 10.6071 21.7278C9.12208 20.3223 7.02523 20.0737 5.75352 20.0707C4.84788 20.0685 4.11103 19.3311 4.11103 18.4268Z" fill="white"/>
</svg>
