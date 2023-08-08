#!/usr/bin/env sh

# 根目录
export SCRIPTPATH=$(readlink -f "$0")
export BASEDIR=$(dirname "$SCRIPTPATH")

# PATH
export PATH=$BASEDIR/dependence/node/bin:$PATH

# PRISMA
## https://www.prisma.io/docs/concepts/components/prisma-engines#using-custom-engine-libraries-or-binaries
export PRISMA_QUERY_ENGINE_BINARY=$BASEDIR/dependence/prisma-engines/query-engine
export PRISMA_QUERY_ENGINE_LIBRARY=$BASEDIR/dependence/prisma-engines/libquery_engine.so.node
export PRISMA_SCHEMA_ENGINE_BINARY=$BASEDIR/dependence/prisma-engines/schema-engine
export PRISMA_CLI_QUERY_ENGINE_TYPE=library
export PRISMA_CLIENT_ENGINE_TYPE=library

npx prisma generate --generator client-native
npx ts-node main -db mysql://root:root@localhost:3306/financial_accounting -addr 0.0.0.0 -p 8000