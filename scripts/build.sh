#!/usr/bin/env sh

pkg install -y unzip zip git gmake
export CC=clang
export CXX=clang++
export proxy_url=192.168.1.2
export http_proxy=http://${proxy_url}:1081
export  https_proxy=http://${proxy_url}:1081
git config --global http.https://github.com.proxy socks5://${proxy_url}:1080


# nodejs
cd $HOME
git clone --depth 1 --recurse-submodules --branch "v18.x" https://github.com/nodejs/node.git && cd node
## 显示所有静态配置选项 ./configure --help | grep static
./configure --prefix=/tmp/node --enable-static && make install -j `sysctl -n hw.ncpu`
## 压缩打包
cd /tmp/ && zip -9 -r -y -UN=UTF8 "$HOME/node-`/tmp/node/bin/node -v`_`uname -o`_`uname -r`_`uname -p`.zip" node


# prisma-engines
## https://rustup.rs/
pkg install -y protobuf git zip unzip
curl -Lo rustup-init.sh https://sh.rustup.rs && sh rustup-init.sh -y && rm -rf rustup-init.sh
export PATH=$HOME/.cargo/bin:$PATH
git clone --depth 1 --recurse-submodules --branch `git ls-remote --tags --refs https://github.com/prisma/prisma-engines.git | tail --lines=1 | cut -d "/" -f 3` https://github.com/prisma/prisma-engines.git
cd prisma-engines && cargo build --release

## 压缩打包
cd $HOME/prisma-engines/target/release
zip -9 -r -UN=UTF8 "$HOME/prisma-engines-`uname -o`_`uname -r`_`uname -p`.zip" query-engine libquery_engine.so schema-engine
