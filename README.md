```
░█▀▄▀█░▄▀▀▄░█▀▀▄░█▀▀░█░░█░░░█▀▀▄░▄▀▀▄░▄▀▀▄░█░▄
░█░▀░█░█░░█░█░▒█░█▀▀░█▄▄█░░░█▀▀▄░█░░█░█░░█░█▀▄
░▀░░▒▀░░▀▀░░▀░░▀░▀▀▀░▄▄▄▀░░░▀▀▀▀░░▀▀░░░▀▀░░▀░▀
```

- Power financial application

## Install

```sh
# install nodejs curl and unzip
apt update && apt install -y nodejs curl unzip

# download and install compiled files
curl -Lo /tmp/moneybook.zip https://github.com/gek64/moneybook/releases/download/latest/moneybook.zip
unzip -o /tmp/moneybook.zip -d /tmp && rm -rf /usr/local/bin/moneybook && mv /tmp/dist /usr/local/bin/moneybook

# if run on freebsd
# download libquery_engine.so to /usr/local/bin/moneybook/libquery_engine-freebsd13.so.node from https://github.com/gek64/prisma-engines-freebsd

# run test
node /usr/local/bin/moneybook/index.js -addr 0.0.0.0 -p 8000 -db mysql://root:root@192.168.1.2:3306/moneybook
```

## Usage

```sh
Usage: moneybook [options]

Options:
  -db, --database <string>  mysql or mariadb data source     
  -addr --address [string]  ip address (default: "localhost")
  -p, --port [number]       port (default: 8000)
  -h, --help                display help for command

Dev start:
  npm run start -- -addr 0.0.0.0 -p 8000 -db mysql://root:root@192.168.1.2:3306/moneybook
```

## Service

### systemd

```sh
curl -Lo /etc/systemd/system/moneybook.service https://raw.githubusercontent.com/gek64/moneybook/main/configs/systemd/moneybook.service
systemctl enable moneybook.service && systemctl restart moneybook.service
```

### openrc

```sh
curl -Lo /etc/init.d/moneybook https://raw.githubusercontent.com/gek64/moneybook/main/configs/openrc/moneybook
chmod +x /etc/init.d/moneybook
rc-update add moneybook && service moneybook restart
```

## FAQ

### How to use it?

- This app is a backend server, you also need to install https://github.com/gek64/moneybookUI

## License

- **GPL-3.0 License**
- See `LICENSE` for details

## Credits

- [webstorm](https://www.jetbrains.com/webstorm/)
- [vscode](https://code.visualstudio.com/)
