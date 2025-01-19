#!/bin/bash

set -e

tmpDir="${TMPDIR:-${XDG_RUNTIME_DIR:-/tmp}}"
buildDir="${1:-$tmpDir}"
[[ $buildDir != /* ]]&& buildDir="${PWD%/}/$buildDir"
buildDir="${buildDir#./}/allyabase"
ecosystem_config='ecosystem.config.js'
services=(
    'addie'
    'aretha'
    'bdo'
    'continuebee'
    'fount'
    'joan'
    'julia'
    'pref'
    'sanora'
)

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
        apt|apk-get|dnf|pacman|zypper|xbps|pkgin|pkg)
            package_map[node]="nodejs"
            ;;
        emerge|pkg_add|brew)
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

setup_services() {
    mkdir "$buildDir"&& { cd "$buildDir"|| :; }

    for service in "${services[@]}"; do
        git clone "https://github.com/planet-nine-app/$service"

        printf '%s\n' "Installing '$service'..."
        npm install "$service/src/server/node"
    done
} # setup_services

setup_ecosystem() {
    if [[ ! -f "package.json" || ! -f "package-lock.json" ]]; then
        echo "Initializing npm in this directory..."
        npm init -y
    else
        echo "Both package.json and package-lock.json are already present. Skipping initialization."
    fi

    npm install pm2-runtime

    printf '%s\n' \
        'module.exports = {' \
        '  apps: [' >>"$ecosystem_config"

    for service in "${services[@]}"; do
        if [[ $service == 'addie' ]]; then
            env="{
                LOCALHOST: 'true',
                STRIPE_KEY: '<api key here>',
                STRIPE_PUBLISHING_KEY: '<publishing key here>',
                SQUARE_KEY: '<api key here>'
            }"
        else
            env="{ LOCALHOST: 'true' }"
        fi

        printf '%s\n' \
            "    {" \
            "      name: '$service'," \
            "      script: '$buildDir/$service/src/server/node/${service}.js'," \
            "      env: $env" \
            "    }," >>"$ecosystem_config"
    done

    printf '%s\n' '    ]' \
        '}' >>"$ecosystem_config"
} # setup_ecosystem

main() {
    setup_dependencies
    setup_services
    setup_ecosystem
    
    ./node_modules/.bin/pm2-runtime start ecosystem.config.js
}; main
