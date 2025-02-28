#!/bin/bash

# Create temporary build context
BUILD_DIR="./tmp-build-context"
mkdir -p $BUILD_DIR

# Copy workspace configuration
cp ../../deno.json $BUILD_DIR/

# Copy main project
cp -r ../../website $BUILD_DIR/
