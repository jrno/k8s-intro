#!/bin/sh

NAMESPACE="${NAMESPACE:-jrno}"

echo "Building sample-app images without cache... (namespace: ${NAMESPACE})"
docker-compose build --no-cache

echo "Loading images to minikube registry..."
minikube image load "${NAMESPACE}/sample-app:1"
minikube image load "${NAMESPACE}/sample-app:2"