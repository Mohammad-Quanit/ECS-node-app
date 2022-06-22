# AWS ECS Pipeline Deployment - Assignment


**Step1: Create ECS clusters**
First, we created an ECS cluster named "ecs-app-cluster" with Registered container instances 1

![ECS](https://user-images.githubusercontent.com/32056694/173224874-620199d4-b579-4705-aef8-e8fbd6d919d2.png)

<br />

**Step2: Create ECR Repository for app image**

![ECR](images/28605422-41037a6c69b0afa80a08e7e55e6ea2c8.png)

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

![Taskdefinition](images/28605562-a80d15ff432edead42235049af7494e8.png)

**Step4: Configure Service in ECS**

![ECS Service](images/28605605-a810d914e3cb7a43e35a3f3bc2146ea0.png)


<br />

**Step 5: Create Pipeline using CodePipeline, CodeBuild & CodeDeploy**

![pipeline flow](images/28605723-1419744b54447059f808d58b96ff4cbd.png)


**CodeBuild for Building the App**
![codebuild project](images/28605783-173cf3e6529b974ccbc5aa50eada0e46.png)


**CodeDeploy for Deploying the App**
![Codedeploy project](images/28605824-704e3695cb2af695d47058423c6586c5.png)

<br />

**Step 6: Create Load Balancer with 2 Target Groups (Blue app/green app)**

Application Load Balancer for Routing traffic from different container instances
Note: we can access the application from LB Dns: [ALB DNS](http://ecs-app-lb-1477482267.us-west-2.elb.amazonaws.com/)

![Laod Balancer](images/28605850-1ee7e5253149256f53ad41a9472b46bc.png)

<br />

Target Groups for registering the container instances in our EC2

![Target Groups](images/28605904-746b2f351e8cfc79b9f917ccc62ae95a.png)

<br />

In our ECS Service task section, We can access our application from container using provided IP [IP](http://ecs-app-lb-1477482267.us-west-2.elb.amazonaws.com/)

![Container IP](images/28605948-ca30ce4d762477543319b5e05d057899.png)

<b>Note: This project is not running right now due to extra bill occuring in my AWS account.</b>




