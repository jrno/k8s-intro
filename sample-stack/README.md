# Sample application for k8s

A sample application to illustrate some concepts of Kubernetes.

## Why?

To play around with core k8s concepts, especially:

- Config maps and secrets
- Volumes, volume claims and persistence and StatefulSets
- Deployments and load balancing

And also to have a small sample cluster to be moved to EKS/GKE for further experimentation later

## What?

### .k8s
All kubernetes resource definitions for the sample

### proxy
Hosts a small web page for viewing the data as well as reverse-proxy to k8s cluster. Forwards traffic to server pods

### server
A node.js server module accepting incoming http traffic and reading measurements data from MongoDB collection on call

### worker
A node.js worker (=producer) module pushing weather measurements to a MongoDB collection

### database
A mongodb database that persists the state of the measurements data to disk

## Running the sample

- `build.sh` to build images locally
- `run-compose.sh` to run stack with docker compose
- `run-minikube.sh` to run stack on k8s / minikube
- `run-eks.sh` to run stack on k8s / EKS

Note that for minikube `imagePullPolicy` is `Never` to force image check from minikube only.

## Minikube

- `k apply -f .k8s` to apply (create or update) stack
- `k port-forward deployment/proxy 8080:80` to forward port 8080 from host to cluster

Stack should respond from http://localhost:8080

## TODO

- Modify proper use of Kubernetes secrets and config maps
- Get started in deploying the sample stack to EKS (run-eks.sh)
- Plan for next steps (running in eks,gke, admin side etc)
- (Opt) Use RBAC to limit worker/server accesses, create users for both
- (Opt) Check building images within minikube to speed it up
