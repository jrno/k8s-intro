# k8s-intro

A playground project for learning purposes for running examples and interacting with Kubernetes.

## What's in here?

- [/sample-stack](./sample-stack) for composing a "fake" app end to end
- [/samples](./samples) specific runnable examples

## Setting up minikube

Examples and sample-stack use [minikube](https://minikube.sigs.k8s.io/docs/start/). Make sure to install that first.

## Setting up alias 

Examples abbreviate kubectl to a shorter form to prevent typing:

To `.bashrc` / `.zshrc`

```
alias k='minikube kubectl -- ' 
```

## Local docker images

Note that images for examples are built only locally and not pushed to a remote registry. Some of the examples
and scripts refer to an image names such as `jrno/k8s-sample-db:3`

If you change the namespace for the images also remember to update corresponding k8s resource definitions to target
proper images

## Links & references

- [Kubernetes](https://kubernetes.io/)
- [kubectl cheat sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
