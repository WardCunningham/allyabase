#!/bin/bash

set -e

detect_package_manager() {
    package_managers=(
        "apt"
        "apk-get"
        "dnf"
        "zypper"
        "emerge"
        "pacman"
        "xbps"
        "pkg"       
        "pkg_add"   
        "pkgin"     
        "brew"      
    )

    for manager in "${package_managers[@]}"; do
        if command -v "$manager" >/dev/null 2>&1; then
            echo "$manager"
            return
        fi
    done

    echo "Unknown package manager. Please install dependencies manually." >&2
    exit 1
} # detect_package_manager

setup_dependencies() {
    echo "Checking required dependencies..."
    missing=()
    
    for cmd in git node npm; do
        if ! command -v "$cmd" >/dev/null 2>&1; then
            missing+=("$cmd")
        fi
    done
    
    if [ ${#missing[@]} -eq 0 ]; then
        echo "All required dependencies are installed."
        return 0
    fi
    
    echo "Missing dependencies: ${missing[*]}"
    echo "Installing missing dependencies..."
    
    declare -A package_map
    pkg_manager=$(detect_package_manager)
    echo "Using package manager: $pkg_manager"
    
    package_map=(
        [git]="git"
        [node]="nodejs"
        [npm]="npm"
    )
    
    case "$pkg_manager" in
        apt|apk-get|dnf|pacman|zypper|xbps|pkgin|pkg|emerge)
            package_map[node]="nodejs"
            ;;
        pkg_add|brew)
            package_map[node]="node"
            ;;
        *)
            echo "Error: Unknown package manager" >&2
            exit 1
            ;;
    esac
    
    install_packages=()
    for cmd in "${missing[@]}"; do
        install_packages+=("${package_map[$cmd]}")
    done
    
    declare -A install_commands
    install_commands=(
        [apt]="sudo apt install -y"
        [apk-get]="sudo apk add"
        [dnf]="sudo dnf install -y"
        [pacman]="sudo pacman -Sy --noconfirm"
        [zypper]="sudo zypper install -y"
        [xbps]="sudo xbps-install -Sy"
        [emerge]="sudo emerge --ask --noreplace"
        [pkg]="sudo pkg install -y"
        [pkg_add]="sudo pkg_add"
        [pkgin]="sudo pkgin install"
        [brew]="brew install"
    )
    
    install_command="${install_commands[$pkg_manager]}"
    if [ -z "$install_command" ]; then
        echo "Error: Unsupported package manager command in the script.Please install the dependencies manually" >&2
        exit 1
    fi
    
    $install_command "${install_packages[@]}"
    echo "Dependencies installed successfully!"
} # setup_dependencies

main() {
    setup_dependencies
}; main
