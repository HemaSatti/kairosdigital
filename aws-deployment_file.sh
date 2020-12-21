#!/usr/bin/env bash


##Set AWS ECS Parameters
##----------------------------------------------------------------------
ECS_REGION='us-east-1'

# Name of the ECS Cluster
ECS_CLUSTER_NAME='kairosd'

# Name of the task definition used by the service
ECS_TASK_DEFINITION_NAME='kairosd'

# Name of the ECR
ECR_NAME='kairosd'




# Number of EC2 instances to be created in a cluster to run the task
INSTANCES='1'

#EC2 Instance type to be created to run the task
INSTANCE_TYPE='t2.small'




#Tag or Application name of your Project
AppName='kairosd'


##Pushing Docker Image to AWS
##--------------------------------------------------------------------------
# Build the Docker image from the Docker file.
#cd $file
#docker build -t "$AppName:latest" $file


# login command used to authenticate your Docker client to your ECR (Elastic Container Registry)
login=`aws ecr get-login --no-include-email --region $ECS_REGION`

#Docker Login to AWS with login data from previous step to push the image
$login


aws ecr get-login --no-include-email | sh



ECR_NAME1='kairosd'

ECR_URI1='634327794365.dkr.ecr.us-east-1.amazonaws.com/kairosd'


#Container Port Number you have defined in your application/dockerfile
CPORT1='3000'


#Port Number when the task is running in the host server
HPORT1='3000'


#Memory to be allocated to run the task/application
MEMORY1='1024'


#CPUs to be allocated to run the task/application

CPU1='1'


#Creating Instance Takes Time wait for 3min"

echo "Creating Task Definition........"
#Create Task definition (Task definitions specify the container information for your application, such as how many containers are part of your task, what resources they will use, how they are linked together, and which host ports they will use)
aws ecs register-task-definition --network-mode host --family $ECS_TASK_DEFINITION_NAME --container-definitions "[{\"name\":\"$ECR_NAME1\",\"image\":\""$ECR_URI1":latest\",\"cpu\":$CPU1,\"memory\":$MEMORY1,\"logConfiguration\": {\"logDriver\": \"awslogs\", \"options\": {\"awslogs-group\": \"/ecs/kairosd\", \"awslogs-region\": \"us-east-1\",\"awslogs-stream-prefix\": \"kairosd\"}},\"portMappings\":[{\"containerPort\":$CPORT1,\"hostPort\":$HPORT1}],\"essential\":true,\"environment\":[{\"name\":\"AI_ENV\",\"value\":\"PROD\"},{\"name\":\"PYTHONUNBUFFERED\",\"value\":\"0\"},{\"name\":\"REDIS_ADDRESS\",\"value\":\"redis://power-bot-cache-v01.0dt86c.0001.use1.cache.amazonaws.com:6379\"}]}]"

echo "Stopping the task......"
aws ecs stop-task --cluster $ECS_CLUSTER_NAME --task $(aws ecs list-tasks --cluster $ECS_CLUSTER_NAME --output text --query taskArns[0])

echo "running task definition....."

#Run the Task in the cluster
aws ecs run-task --cluster $ECS_CLUSTER_NAME --task-definition $ECS_TASK_DEFINITION_NAME

echo "running list-tasks definition....."


#Check the status of the Task Running
aws ecs list-tasks --cluster $ECS_CLUSTER_NAME --desired-status RUNNING



echo "KairosD deploy executed properly"
