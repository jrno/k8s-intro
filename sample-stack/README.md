# Sample application for k8s

Sample playground stack to illustrate some concepts of Kubernetes locally.

## Running the stack

Build docker images locally with help of compose:

```docker compose build```

Load images to minikube, note that imagePullPolicy is `Never`:

```
minikube image load jrno/k8s-sample-db
minikube image load jrno/k8s-sample-proxy
minikube image load jrno/k8s-sample-server
minikube image load jrno/k8s-sample-worker
```

Apply (create or update) resources:

```k apply -f ./k8s```

Port-forward from host to cluster

```
k port-forward deployment/proxy 8080:80
curl localhost:8080
```

## Setup

- a Mongo DB database 
- a Worker process creating entries to the MongoDB collection datastore at periodic intervals
- a Node.js api process responding to http requests 
- a Nginx reverse proxy as load balancer

## Goals

- Illustrate configuration of volumes, volume claims and statefulsets.
- Illustrate configuration of config maps and secrets.
- Configure networking across services
- Configure access from host machine to the cluster
- Works as a base to test out in EKS/GKE later

## Structure

docker/* - Dockerfiles for all services 
k8s/* - Kubernetes deployment files for all services
app-service/* 
