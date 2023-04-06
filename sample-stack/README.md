# Sample application for k8s

Sample playground stack to illustrate some concepts of Kubernetes locally.

## Why?

To play around with core k8s concepts, especially:

- Config maps and secrets
- Volumes, volume claims and persistence and StatefulSets
- Deployments and load balancing

And also to have a small sample cluster to be moved to EKS/GKE for further experimentation later

## Structure

A sample app with four services.

- A stateful database (MongoDB) using volumes and persistence
- A worker process creating content to the database
- A server process reading content from the database 
- A reverse proxy acting as a load balancer and exposed from k8s cluster

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




