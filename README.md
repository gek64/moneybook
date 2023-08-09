```
███████╗██╗███╗   ██╗ █████╗ ██╗         ███╗   ███╗ ██████╗ ███╗   ██╗███████╗██╗   ██╗
██╔════╝██║████╗  ██║██╔══██╗██║         ████╗ ████║██╔═══██╗████╗  ██║██╔════╝╚██╗ ██╔╝
█████╗  ██║██╔██╗ ██║███████║██║         ██╔████╔██║██║   ██║██╔██╗ ██║█████╗   ╚████╔╝ 
██╔══╝  ██║██║╚██╗██║██╔══██║██║         ██║╚██╔╝██║██║   ██║██║╚██╗██║██╔══╝    ╚██╔╝  
██║     ██║██║ ╚████║██║  ██║███████╗    ██║ ╚═╝ ██║╚██████╔╝██║ ╚████║███████╗   ██║   
╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   
```

- Power financial application

## Install

```shell
curl -Lo "/usr/local/bin/final-money" "https://github.com/gek64/final-money/releases/download/latest/final-money-linux-amd64"
chmod +x "/usr/local/bin/final-money"
```

## Usage

```shell
Usage: final-money [options]

Options:
  -db, --database <string>  mysql or mariadb data source     
  -addr --address [string]  ip address (default: "localhost")
  -p, --port [number]       port (default: 8000)
  -h, --help                display help for command

EXAMPLE:
  final-money -db mysql://root:root@192.168.1.2:3306/financial_accounting
```

## FAQ

### How to use it?

- This app is a backend, you also need to install https://github.com/gek64/final-money-frontend

## License

- **GPL-3.0 License**
- See `LICENSE` for details

## Credits

- [webstorm](https://www.jetbrains.com/webstorm/)
- [vscode](https://code.visualstudio.com/)
