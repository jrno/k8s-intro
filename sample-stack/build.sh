#!/bin/sh

SAMPLE_STACK_VERSION="${SAMPLE_STACK_VERSION:-3}"

echo "Building images (v$SAMPLE_STACK_VERSION) locally without cache..."
docker-compose build --no-cache
