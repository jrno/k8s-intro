#!/bin/sh
VERSION="${VERSION:-1}"
sed 's/\$VERSION'"/$VERSION/g" |
tee
