#!/usr/bin/env bash
# exit on error
set -o errexit

# Install backend dependencies
npm install

# Navigate to the frontend directory and install dependencies
cd ../frontend && npm install

# Build the frontend
npm run build

# The build artifacts will be in frontend/build, which the backend will serve