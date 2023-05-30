# canary

This sample demonstrates a canary deployment

## Sample

Start service and two deployments (canary and stable):

```k apply -f .``` 

Expose the NodePort service from minikube (returns accessible url)

```minikube service sample-nodeport --url```

Observe that 20% of requests go to new version:

```watch -n 1 "curl -s '<minikube_ip>' | grep '<title>'"```


