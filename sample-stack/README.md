# Sample application for k8s

Sample playground stack to illustrate some concepts of Kubernetes locally.

## Why?

To play around with core k8s concepts, especially:

- Config maps and secrets
- Volumes, volume claims and persistence and StatefulSets
- Deployments and load balancing

And also to have a small sample cluster to be moved to EKS/GKE for further experimentation later

## Structure

### .k8s
All kubernetes resource definitions for the sample

### proxy
A reverse proxy acting as a load balancer and exposed out from the k8s cluster. Forwards traffic to the node.js server pods.

### server
A node.js server module accepting incoming http traffic and reading database contents.

### worker
A worker process creating content for the database by writing it

### database
A mongodb database that persists the state of the data/collection to disk

## Running the sample

### Building

First un ```./build.sh```

To build docker images locally with help of compose, and load them to minikube.

Note that `imagePullPolicy` is `Never` to force image check from minikube only.

### Applying

Apply (create or update) resources:

```k apply -f .k8s```

Port-forward from host to cluster

```
k port-forward deployment/proxy 8080:80
curl localhost:8080
```




