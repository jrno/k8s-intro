# Sample application for k8s

## Setup

- a Mongo DB database 
- a Mongo DB cli Node.jsworker process creating entries to the MongoDB collection datastore at periodic intervals
- a Node.js api process responding to http requests 
- a Nginx reverse proxy as load balancer

## Goals

- Illustrate configuration of volumes, volume claims and statefulsets.
- Illustrate configuration of config maps and secrets.
- Configure networking across services
- Configure access from host machine to the cluster
- Works as a base to test out in EKS/GKE later

## Strucure

docker/* - Dockerfiles for all services 
k8s/* - Kubernetes deployment files for all services
app-service/* 
