# sample-app

To build and load images to minikube run:

```sh build.sh```

to alter the docker image namespace use 

```
export NAMESPACE=alternative
sh build.sh # produces alternative/sample-app:1|2 images
```

v1 - nginx that serves "blue" index.html 
v2 - nginx that serves "green" index.html
