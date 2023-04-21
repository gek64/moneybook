#!/usr/bin/env sh

npm -i
more .env.example .env
tsc

rm -rf node_modules/.prisma
prisma generate --generator client-windows
pkg -t latest-windows-x64 --compress Gzip package.json -o dist/final-money-windows-amd64.exe

rm -rf node_modules/.prisma
prisma generate --generator client-macos
pkg -t latest-macos-x64 --compress Gzip package.json -o dist/final-money-macos-amd64

rm -rf node_modules/.prisma
prisma generate --generator client-linux
pkg -t latest-linux-x64 --compress Gzip package.json -o dist/final-money-linux-amd64
