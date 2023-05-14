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
```

Call the service via load balancer

```
curl localhost:8080 
```

## TODO

- Do simple function to index.html to poll data from service in pretty form
- Do fix volume mounts for docker compose (server,worker)
- Deploy server and worker in k8s
- Modify k8s to properly use secrets and config maps
- Check building images within minikube to speed it up
- Explore options to version images/deployments better
- Plan for next steps (running in eks,gke, admin side etc)
- (Opt) Use RBAC to limit worker/server accesses, create users for both

