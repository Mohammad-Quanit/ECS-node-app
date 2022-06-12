# AWS ECS Pipeline Deployment - Assignment


**Step1: Create ECS clusters**
First, we created an ECS cluster named "ecs-app-cluster" with Registered container instances 1

![ECS](https://user-images.githubusercontent.com/32056694/173224874-620199d4-b579-4705-aef8-e8fbd6d919d2.png)

<br />

**Step2: Create ECR Repository for app image**

![ECR](https://awesomescreenshot.s3.amazonaws.com/image/1810911/28605422-41037a6c69b0afa80a08e7e55e6ea2c8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20220612%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220612T085225Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=79fb89a744d66b959704f0331473a6ef8f3fea27bfab7319743048cd4b3b429c)

We then need to authenticate and push our dockerized application into this ECR repository
Commands for authenticating and pushing docker image into ECR:

1. Retrieve an authentication token and authenticate your Docker client to your registry using the AWS CLI:

```
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin xxxxxxxxxx.dkr.ecr.us-west-2.amazonaws.com
```
2. Build your Docker image using the following command
```
docker build -t server-image .
```
3. After the build completes, tag your image so you can push the image to this repository:
```
docker tag server-image:latest xxxxxxxxxx.dkr.ecr.us-west-2.amazonaws.com/server-image:latest
```
4. Run the following command to push this image to your newly created AWS repository
```
docker push xxxxxxxxxx.dkr.ecr.us-west-2.amazonaws.com/server-image:latest
```
After pushing our docker image into ECR you can see it here in repositories.

<br />

**Step3: Create Task Definition & Service for Running Container in ECS Cluster**

We first add a container in our task definition and then create it.

![Taskdefinition](https://awesomescreenshot.s3.amazonaws.com/image/1810911/28605562-a80d15ff432edead42235049af7494e8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20220612%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220612T085623Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=09fe09c85df8dd0d95ebb51a9e5613aa1d01ec7a1b89e56542db87f51f9fc8ea)

**Step4: Configure Service in ECS**

![ECS Service](https://awesomescreenshot.s3.amazonaws.com/image/1810911/28605605-a810d914e3cb7a43e35a3f3bc2146ea0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20220612%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220612T090015Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=0381368c0196b77ec3be77cc2582cea6fdf44a2e9778e4dd6a7fd7223e089c1b)


<br />

**Step 5: Create Pipeline using CodePipeline, CodeBuild & CodeDeploy**

![pipeline flow](https://awesomescreenshot.s3.amazonaws.com/image/1810911/28605723-1419744b54447059f808d58b96ff4cbd.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20220612%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220612T090702Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=b0d6e7fc4f90ab8e6b4f55ee097176e14d049dbd9a2745e674b5c39813563673)


**CodeBuild for Building the App**
![codebuild project](https://awesomescreenshot.s3.amazonaws.com/image/1810911/28605783-173cf3e6529b974ccbc5aa50eada0e46.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20220612%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220612T091024Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=da291e7621bbf4835b25502db0be7cc3ee9b8fdaea2f9e915108d9bee159719a)


**CodeDeploy for Deploying the App**
![Codedeploy project](https://awesomescreenshot.s3.amazonaws.com/image/1810911/28605824-704e3695cb2af695d47058423c6586c5.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20220612%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220612T091309Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=ce788b2b2f2cd79a2bfd2f41452b00ab6fdc9b88a71f3264923b5501b8a4401b)

<br />

**Step 6: Create Load Balancer with 2 Target Groups (Blue app/green app)**

Application Load Balancer for Routing traffic from different container instances
Note: we can access the application from LB Dns: [ALB DNS](http://ecs-app-lb-1477482267.us-west-2.elb.amazonaws.com/)

![Laod Balancer](https://awesomescreenshot.s3.amazonaws.com/image/1810911/28605850-1ee7e5253149256f53ad41a9472b46bc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20220612%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220612T091535Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=056e93cfbc800af719bdfe86e2e3564e1937d3dbe4fcff6fe7ccb55979d70af9)

<br />

Target Groups for registering the container instances in our EC2

![Target Groups](https://awesomescreenshot.s3.amazonaws.com/image/1810911/28605904-746b2f351e8cfc79b9f917ccc62ae95a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20220612%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220612T091850Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=9692a57132f5e73fe242ce48af0b6218fbb37bb237c0c483c89bddf39c235b2d)

<br />

In our ECS Service task section, We can access our application from container using provided IP [IP](http://ecs-app-lb-1477482267.us-west-2.elb.amazonaws.com/)

![Container IP](https://awesomescreenshot.s3.amazonaws.com/image/1810911/28605948-ca30ce4d762477543319b5e05d057899.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20220612%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220612T092357Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=1c59e1859a04e5794c1a647c4bb15aaa6f08c32f3ddad75e66eb08fa24cef24e)




