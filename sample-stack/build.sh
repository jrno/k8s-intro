#!/bin/sh

echo "Building newer docker images..."
docker-compose build --no-cache

echo "Loading images to minikube registry..."
minikube image load jrno/k8s-sample-db:3
minikube image load jrno/k8s-sample-proxy:3
minikube image load jrno/k8s-sample-server:3
minikube image load jrno/k8s-sample-worker:3

echo "Reloading minikube cache"
minikube cache reload