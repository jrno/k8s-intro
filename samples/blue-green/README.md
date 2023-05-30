# blue-green

Demonstrates a blue green deployment

## Sample

First start the `NodePort` services

```find . -name '*.service.yml' -exec kubectl apply -f {} \;```

Deploy the "blue" version

```cat app.deployment.yml | TARGET_ROLE=blue VERSION=1 sh version.sh | k apply -f -```

Deploy the "green" version

```cat app.deployment.yml | TARGET_ROLE=green VERSION=2 sh version.sh | k apply -f -```

Switchover from `green` to `blue`

```
k patch service sample-nodeport -p '
{
  "spec": {
    "selector": {
      "role": "green"
    }
  }
}' --type=merge
```