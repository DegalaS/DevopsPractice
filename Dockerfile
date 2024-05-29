# Use the official Azure CLI base image
FROM mcr.microsoft.com/azure-cli:latest

# Install required utilities
RUN apk update && apk add --no-cache \
    bash \
    sudo \
    curl \
    wget \
    tar \
    gnupg \
    libc6-compat \
    ca-certificates \
    less \
    ncurses-terminfo-base \
    krb5-libs \
    libgcc \
    libintl \
    libssl3 \
    libstdc++ \
    tzdata \
    userspace-rcu \
    zlib \
    icu-libs

# Install lttng-ust from the edge repository
RUN apk -X https://dl-cdn.alpinelinux.org/alpine/edge/main add --no-cache \
    lttng-ust

# Download and install PowerShell
RUN curl -L https://github.com/PowerShell/PowerShell/releases/download/v7.4.2/powershell-7.4.2-linux-musl-x64.tar.gz -o /tmp/powershell.tar.gz && \
    mkdir -p /opt/microsoft/powershell/7 && \
    tar zxf /tmp/powershell.tar.gz -C /opt/microsoft/powershell/7 && \
    chmod +x /opt/microsoft/powershell/7/pwsh && \
    ln -s /opt/microsoft/powershell/7/pwsh /usr/bin/pwsh

# Install Azure CLI Graph extension
RUN pwsh -Command "Install-Module -Name Az -Force -Scope AllUsers" && \
    az extension add --name resource-graph -y --allow-preview false

# Clean up
RUN rm -rf /var/cache/apk/* /tmp/* /var/tmp/*
