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
    commands:
      - echo Logging in to Amazon ECR...
      - aws --version
      - sh dockerlogin.sh 
      #- $(aws ecr get-login --region $AWS_DEFAULT_REGION --no-include-email)
     # - REPOSITORY_URI=713814803562.dkr.ecr.us-east-1.amazonaws.com/websitev3
      - COMMIT_HASH=$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)
      - IMAGE_TAG=${COMMIT_HASH:=latest}
      - docker pull $REPOSITORY_URI:latest || true
      
  build:
    commands:
      - echo "copy the s3 bucket files"
      - aws s3 cp s3://$deploymentBucket/whizlabs_website_v3/$ENV/.env .
      - echo Build started on `date`
      - echo Building the Docker image...
      - sh dockerlogin.sh
      #- sh $Dockerlogin  || echo "No environment placed in the codebuild variable"
      #- docker build -t $REPOSITORY_URI:latest .
      - docker build  --cache-from $REPOSITORY_URI:latest -t $REPOSITORY_URI:latest .
      - docker tag $REPOSITORY_URI:latest $REPOSITORY_URI:$IMAGE_TAG
  post_build:
    commands:
      - echo Build completed on `date`
      - echo Pushing the Docker images...
      - docker push $REPOSITORY_URI:latest
      - docker push $REPOSITORY_URI:$IMAGE_TAG
      - echo Writing image definitions file...
      - printf '[{"name":"%s","imageUri":"%s"}]' "$TASKENV" "$REPOSITORY_URI:$IMAGE_TAG" > imagedefinitions.json
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
    pattern: "**"
    owner: corp
    group: corp
    

hooks:
  BeforeInstall:
    - location: scripts/before_install.sh
      timeout: 300
      
  AfterInstall:
    - location: scripts/after_install.sh
      timeout: 1200
    

 