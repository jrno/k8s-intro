#!/bin/sh

SAMPLE_STACK_VERSION="${SAMPLE_STACK_VERSION:-3}"

IMAGE_DB="jrno/k8s-sample-db:$SAMPLE_STACK_VERSION"
IMAGE_PROXY="jrno/k8s-sample-proxy:$SAMPLE_STACK_VERSION"
IMAGE_SERVER="jrno/k8s-sample-server:$SAMPLE_STACK_VERSION"
IMAGE_WORKER="jrno/k8s-sample-worker:$SAMPLE_STACK_VERSION"

if ! command -v "minikube" >/dev/null 2>&1; then
    echo "minikube not installed, cannot deploy..."
    exit 1
fi

echo "Removing sample-stack from k8s cluster if needed..."
minikube kubectl -- delete -f .k8s 2>/dev/null

echo "Loading images to minikube registry..."
minikube image rm "$IMAGE_DB" 2>/dev/null && minikube image load "$IMAGE_DB"
minikube image rm "$IMAGE_PROXY" >/dev/null && minikube image load "$IMAGE_PROXY"
minikube image rm "$IMAGE_SERVER" 2>/dev/null && minikube image load "$IMAGE_SERVER"
minikube image rm "$IMAGE_WORKER" 2>/dev/null && minikube image load "$IMAGE_WORKER"

echo "Applying sample-stack to k8s cluster..."
minikube kubectl -- apply -f .k8s
