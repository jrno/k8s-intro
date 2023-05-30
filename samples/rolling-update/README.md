# rolling-update

Demonstrates the default deployment strategy in Kubernetes

## Pre-requisite

Build images from [sample-app](../sample-app)

## Sample

Expose the app using `NodePort` service

```k apply -f app.service.yml```

Expose the NodePort service from minikube (returns accessible url)

```minikube service sample-nodeport --url```

Deploy version v1 of app

```cat app.deployment.yml | VERSION=1 sh version.sh | k apply -f -```

Do rolling update to v2

```cat app.deployment.yml | VERSION=2 sh version.sh | k apply -f -```

Play around with `maxSurge` / `maxUnavailable` in `app.deployment.yml`



