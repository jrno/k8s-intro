#!/bin/sh

echo "Building newer docker images..."
docker-compose build

echo "Loading images to minikube registry..."
minikube image load jrno/k8s-sample-db:1
minikube image load jrno/k8s-sample-proxy:1
minikube image load jrno/k8s-sample-server:1
minikube image load jrno/k8s-sample-worker:1