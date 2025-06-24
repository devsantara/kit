#!/bin/sh

# Run husky install in non-production environments
# When running in production, we don't install devDependencies
if [ -d './node_modules/husky' ]; then
  husky
fi