```
░█▀▄▀█░▄▀▀▄░█▀▀▄░█▀▀░█░░█░░░█▀▀▄░▄▀▀▄░▄▀▀▄░█░▄
░█░▀░█░█░░█░█░▒█░█▀▀░█▄▄█░░░█▀▀▄░█░░█░█░░█░█▀▄
░▀░░▒▀░░▀▀░░▀░░▀░▀▀▀░▄▄▄▀░░░▀▀▀▀░░▀▀░░░▀▀░░▀░▀
```

- Power financial application

## Install

```sh
git clone https://github.com/gek64/moneybook /usr/local/bin/moneybook
cd /usr/local/bin/moneybook && npm install
npm run start /usr/local/bin/moneybook -- -addr 0.0.0.0 -p 8000 -db mysql://root:root@192.168.1.2:3306/moneybook
```

## Usage

```sh
Usage: moneybook [options]

Options:
  -db, --database <string>  mysql or mariadb data source     
  -addr --address [string]  ip address (default: "localhost")
  -p, --port [number]       port (default: 8000)
  -h, --help                display help for command

EXAMPLE:
  npx ts-node main.ts -addr 0.0.0.0 -p 8000 -db mysql://root:root@192.168.1.2:3306/moneybook
  npm run start -- -addr 0.0.0.0 -p 8000 -db mysql://root:root@192.168.1.2:3306/moneybook
```

## Service

### systemd

``sh
nano /etc/systemd/system/moneybook.service
systemctl enable moneybook.service && systemctl restart moneybook.service
``

### openrc

``sh
nano /etc/init.d/moneybook
chmod +x /etc/init.d/moneybook
rc-update add moneybook && service moneybook restart
``

## FAQ

### How to use it?

- This app is a backend server, you also need to install https://github.com/gek64/moneybookUI

## License

- **GPL-3.0 License**
- See `LICENSE` for details

## Credits

- [webstorm](https://www.jetbrains.com/webstorm/)
- [vscode](https://code.visualstudio.com/)
