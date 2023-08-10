```
░█▀▄▀█░▄▀▀▄░█▀▀▄░█▀▀░█░░█░░░█▀▀▄░▄▀▀▄░▄▀▀▄░█░▄░░░█▀▀░█▀▀░█▀▀▄░▄░░░▄░█▀▀░█▀▀▄
░█░▀░█░█░░█░█░▒█░█▀▀░█▄▄█░░░█▀▀▄░█░░█░█░░█░█▀▄░░░▀▀▄░█▀▀░█▄▄▀░░█▄█░░█▀▀░█▄▄▀
░▀░░▒▀░░▀▀░░▀░░▀░▀▀▀░▄▄▄▀░░░▀▀▀▀░░▀▀░░░▀▀░░▀░▀░░░▀▀▀░▀▀▀░▀░▀▀░░░▀░░░▀▀▀░▀░▀▀
```

- Power financial application backend server

## Install

```shell
curl -Lo "/usr/local/bin/moneybookserver" "https://github.com/gek64/moneybookserver/releases/download/latest/moneybookserver-linux-amd64"
chmod +x "/usr/local/bin/moneybookserver"
```

## Usage

```shell
Usage: moneybookserver [options]

Options:
  -db, --database <string>  mysql or mariadb data source     
  -addr --address [string]  ip address (default: "localhost")
  -p, --port [number]       port (default: 8000)
  -h, --help                display help for command

EXAMPLE:
  moneybookserver -db mysql://root:root@192.168.1.2:3306/moneybook
```

## FAQ

### How to use it?

- This app is a backend server, you also need to install https://github.com/gek64/moneybook

## License

- **GPL-3.0 License**
- See `LICENSE` for details

## Credits

- [webstorm](https://www.jetbrains.com/webstorm/)
- [vscode](https://code.visualstudio.com/)
