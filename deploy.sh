#!/bin/bash
set -e

# Check if required arguments are provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <user@ip>"
    exit 1
fi

# Parameters
SERVER="$1"  # SSH user for the server (passed as the first argument)
SERVER_DIR="~/"  # Target directory on the server

PROJECT_NAME="crownd"
TAR_FILE="$PROJECT_NAME-bundle.tar"  # Tar file name

# Paths to files


ssh $SERVER << EOF
[ ! -d "~/deployments/$PROJECT_NAME" ] && mkdir -p ~/deployments/$PROJECT_NAME
EOF

INSTALL_DIR="~/deployments/$PROJECT_NAME"
# # ??
# # ssh "$SERVER_USER@$SERVER_IP" "mkdir -p $INSTALL_DIR"

# # Step 3: Transfer tarball to the server
# echo "Transferring tarball to the server..."
echo "gonna scp the $TAR_FILE to $SERVER:$INSTALL_DIR"
scp "$TAR_FILE" "$SERVER:$INSTALL_DIR"

# rm "$TAR_FILE"

# Step 4: SSH into the server and handle deployment
echo "Deploying on the server..."
ssh "$SERVER" << EOF
    # Go to the deployment directory
    cd $INSTALL_DIR

    # At least for may@may-pi, the user may doens't have docker permission so... sudo su
    sudo su

    if [ -f "docker-compose.yml" ] || [ -f "compose.yaml" ]; then
        echo "Stopping containers and removing previous images"
        docker compose down --rmi all
    else
        echo "No Compose file found. Skipping 'docker compose down'."
    fi

    # Untar the new deployment bundle
    echo "Extracting deployment bundle..."
    tar -xf "$TAR_FILE"

    # Load Docker images
    echo "Loading Docker images..."
    for IMAGE_TAR in *.tar; do
        echo "Loading $IMAGE_TAR"
        docker load -i "\$IMAGE_TAR"
    done

    echo "Starting the application..."
    docker compose up -d

    # Clean up tar files
    echo "Cleaning up tar files..."
    rm -f ./*.tar
EOF

# Step 5: Clean up local tar files
# echo "Cleaning up local files..."
# rm -f *.tar "$TAR_FILE"

echo "Deployment complete!"