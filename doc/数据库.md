# 数据库 mysql/mariadb

```shell
# 安装mysql
apt update && apt install mysql-server
# 安装mariadb
apt update && apt install mariadb-server

# 更改网络访问 bind-address = 0.0.0.0
## ubuntu
nano /etc/mysql/mysql.conf.d/mysqld.cnf
nano /etc/mysql/mariadb.conf.d/50-server.cnf
## centos
nano /etc/my.cnf
systemctl restart mysql

# 登录
mysql -u root

# 数据库初始化
## 删除默认用户
DELETE FROM mysql.global_priv WHERE User='';
## 删除root用户远程登录权限
DELETE FROM mysql.global_priv WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
## 删除测试数据库
DROP DATABASE IF EXISTS test;
## 删除测试数据库权限
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';
```

```sql
# 查看所有用户信息
SELECT user,authentication_string,plugin,host FROM mysql.user;

# 修改 root 密码与密码插件
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
ALTER USER 'root'@'localhost' IDENTIFIED VIA 'mysql_native_password';

# 更改 root 用户访问权限(允许 localhost 本地访问,更改为 % 允许所有网络接口访问)
RENAME USER 'root'@'localhost' TO 'root'@'%';

## 新建普通账户(用户名:app,密码:root)
CREATE USER 'app'@'%' IDENTIFIED BY 'root';

## 新建数据库(financial_accounting)
CREATE DATABASE financial_accounting;

## 赋权
GRANT RELOAD ON *.* TO 'app'@'%';
GRANT ALL PRIVILEGES ON financial_accounting.* TO 'app'@'%';
FLUSH PRIVILEGES;
```