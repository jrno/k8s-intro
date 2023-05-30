#!/bin/sh
TARGET_ROLE="${TARGET_ROLE:-blue}"
VERSION="${VERSION:-1}"

sed 's/\$VERSION'"/$VERSION/g" |
sed 's/\$TARGET_ROLE'"/$TARGET_ROLE/g" |
tee
