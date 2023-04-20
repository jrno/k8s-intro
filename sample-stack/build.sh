#!/bin/sh

echo "Building newer docker images..."
docker-compose build

echo "Loading images to minikube registry..."
minikube image load jrno/k8s-sample-db
minikube image load jrno/k8s-sample-proxy
minikube image load jrno/k8s-sample-server
minikube image load jrno/k8s-sample-worker