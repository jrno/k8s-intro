#!/bin/sh

echo "Building docker images locally without cache..."
docker-compose build --no-cache

echo "Removing current k8s stack..."
minikube kubectl -- delete -f .k8s

echo "Refreshing images to minikube registry..."
minikube image rm jrno/k8s-sample-db:3 2>/dev/null && minikube image load jrno/k8s-sample-db:3
minikube image rm jrno/k8s-sample-proxy:3 2>/dev/null && minikube image load jrno/k8s-sample-proxy:3
minikube image rm jrno/k8s-sample-server:3 2>/dev/null && minikube image load jrno/k8s-sample-server:3
minikube image rm jrno/k8s-sample-worker:3 2>/dev/null && minikube image load jrno/k8s-sample-worker:3

echo "Applying new stack..."
minikube kubectl -- apply -f .k8s