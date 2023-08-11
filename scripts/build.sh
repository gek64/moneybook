#!/usr/bin/env sh

platform="$(uname)"

# 检查工具链
CheckTool() {
  ## 返回值判断 1为不存在 0为存在
  if [ ! "$(command -v "$1")" ]; then
      return 1
  else
      return 0
  fi
}

# 检测平台
if [ "$platform" = "Linux" ]; then
  # 检测包管理器
  if CheckTool "apk"; then
    apk add build-base linux-headers unzip zip git curl python3
  elif CheckTool "apt"; then
    apt install -y build-essential unzip zip git curl
  fi
elif [ "$platform" = "FreeBSD" ]; then
  pkg install -y gmake unzip zip git curl
  export CC=clang
  export CXX=clang++
fi

# Proxy
#export proxy_url=192.168.1.1
#export http_proxy=http://${proxy_url}:1081
#export  https_proxy=http://${proxy_url}:1081
#git config --global http.https://github.com.proxy socks5://${proxy_url}:1080


# nodejs
cd $HOME
git clone --depth 1 --recurse-submodules --branch "v18.x" https://github.com/nodejs/node.git
cd node
## 显示所有静态配置选项 ./configure --help | grep static
./configure --prefix=/tmp/node --enable-static && make install -j `sysctl -n hw.ncpu`
## 压缩打包
cd /tmp/ && zip -9 -r -y -UN=UTF8 "$HOME/node-`/tmp/node/bin/node -v`_`uname -o`_`uname -r`_`uname -p`.zip" node


# prisma-engines(memory>=8G)
## https://rustup.rs/

# 检测平台
if [ "$platform" = "FreeBSD" ]; then
  pkg install -y protobuf
fi

cd $HOME
curl -Lo rustup-init.sh https://sh.rustup.rs && sh rustup-init.sh -y && rm -rf rustup-init.sh
export PATH=$HOME/.cargo/bin:$PATH
git clone --depth 1 --recurse-submodules https://github.com/prisma/prisma-engines.git
cd prisma-engines && cargo build --release

## 压缩打包
cd $HOME/prisma-engines/target/release
zip -9 -r -UN=UTF8 "$HOME/prisma-engines-`uname -o`_`uname -r`_`uname -p`.zip" query-engine libquery_engine.so schema-engine
