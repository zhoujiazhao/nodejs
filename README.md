# nodejs

## Ubuntu install nodejs, npm, express, express-genertor
```
sudo apt-get -y install libssl1.0-dev nodejs-dev npm 
sudo npm i -g express express-generator mysql
```

## generate project
```
express myserver
cd mysever
npm install

## start myserver, default prot: localhost:3000
npm start 
or 
node bin/www
```

## nodemon tool
- Automatically restarting the node applliction when file changes in the directory are detected.
- **Installation**
```
sudo npm install -g nodemon
or 
npm install --save-dev nodemon
```
- **configuration:** Add **"dev": nodemon ./bin/www** to **package.json**
```
    "scripts": {
        "start": "PORT=3344  node ./bin/www",
        "dev": "PORT=3344  nodemon ./bin/www" 
    }
```

- **run**
```
npm run dev
```

## supervisor tool
```
npm install supervisor -g

# add to package.json
    "scripts": {
        "start": "node ./bin/www",
        "sup": "supervisor ./bin/www"  
    }

npm run sup
```

## pm2 tool
```
npm install pm2 -g 

"scripts": {
        "start": "node ./bin/www",
        "pm2": "pm2 start ./bin/www"  
    }

npm run pm2
```

## mysql 授权, 改后密码为your_password
```
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'your_password' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'your_password' WITH GRANT OPTION;
or 
GRANT ALL ON nodejs.* to nodejs@'%' IDENTIFIED BY 'your_password';
GRANT ALL ON nodejs.* to nodejs@localhost IDENTIFIED BY 'your_password';
```


# Troubleshooting

## 解决Node.js mysql客户端不支持认证协议引发的“ER_NOT_SUPPORTED_AUTH_MODE”问题

- **报错信息：**
```
carey@ZHOUJIAZHAO:~/Desktop/nodejs/myserver$ npm start

> myserver@0.0.0 start /home/carey/Desktop/nodejs/myserver
> PORT=3344 node ./bin/www

/home/carey/Desktop/nodejs/myserver/routes/users.js:26
  if (error) throw error;
             ^

Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
    at Handshake.Sequence._packetToError (/home/carey/Desktop/nodejs/myserver/node_modules/mysql/lib/protocol/sequences/Sequence.js:47:14)
    at Handshake.ErrorPacket (/home/carey/Desktop/nodejs/myserver/node_modules/mysql/lib/protocol/sequences/Handshake.js:123:18)
    at Protocol._parsePacket (/home/carey/Desktop/nodejs/myserver/node_modules/mysql/lib/protocol/Protocol.js:291:23)
    at Parser._parsePacket (/home/carey/Desktop/nodejs/myserver/node_modules/mysql/lib/protocol/Parser.js:433:10)
    at Parser.write (/home/carey/Desktop/nodejs/myserver/node_modules/mysql/lib/protocol/Parser.js:43:10)
    at Protocol.write (/home/carey/Desktop/nodejs/myserver/node_modules/mysql/lib/protocol/Protocol.js:38:16)
    at Socket.<anonymous> (/home/carey/Desktop/nodejs/myserver/node_modules/mysql/lib/Connection.js:88:28)
    at Socket.<anonymous> (/home/carey/Desktop/nodejs/myserver/node_modules/mysql/lib/Connection.js:526:10)
    at emitOne (events.js:116:13)
    at Socket.emit (events.js:211:7)
    --------------------
    at Protocol._enqueue (/home/carey/Desktop/nodejs/myserver/node_modules/mysql/lib/protocol/Protocol.js:144:48)
    at Protocol.handshake (/home/carey/Desktop/nodejs/myserver/node_modules/mysql/lib/protocol/Protocol.js:51:23)
    at Connection.connect (/home/carey/Desktop/nodejs/myserver/node_modules/mysql/lib/Connection.js:116:18)
    at Object.<anonymous> (/home/carey/Desktop/nodejs/myserver/routes/users.js:23:6)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Module.require (module.js:596:17)

npm ERR! Linux 5.4.0-72-generic
npm ERR! argv "/usr/bin/node" "/usr/bin/npm" "start"
npm ERR! node v8.10.0
npm ERR! npm  v3.5.2
npm ERR! code ELIFECYCLE
npm ERR! myserver@0.0.0 start: `PORT=3344 node ./bin/www`
npm ERR! Exit status 1
npm ERR! 
npm ERR! Failed at the myserver@0.0.0 start script 'PORT=3344 node ./bin/www'.
npm ERR! Make sure you have the latest version of node.js and npm installed.
npm ERR! If you do, this is most likely a problem with the myserver package,
npm ERR! not with npm itself.
npm ERR! Tell the author that this fails on your system:
npm ERR!     PORT=3344 node ./bin/www
npm ERR! You can get information on how to open an issue for this project with:
npm ERR!     npm bugs myserver
npm ERR! Or if that isn't available, you can get their info via:
npm ERR!     npm owner ls myserver
npm ERR! There is likely additional logging output above.

npm ERR! Please include the following file with any support request:
npm ERR!     /home/carey/Desktop/nodejs/myserver/npm-debug.log
```

- **原因：** -
导致这个错误的原因是，目前，最新的mysql模块并未完全支持MySQL 8的“caching_sha2_password”加密方式，而“caching_sha2_password”在MySQL 8中是默认的加密方式。因此，下面的方式命令是默认已经使用了“caching_sha2_password”加密方式，该账号、密码无法在mysql模块中使用。

```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
Query OK, 0 rows affected (0.12 sec)
```
- **解决方法：**
解决方法是从新修改用户root的密码，并指定mysql模块能够支持的加密方式：
```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
Query OK, 0 rows affected (0.12 sec)
```
上述语句，显示指定了使用“mysql_native_password”的加密方式。这种方式是在mysql模块能够支持。

再此运行应用，可以看到如下的控制台输出信息：
```
$ node index.js

The result is:  RowDataPacket { user_id: 1, username: '老卫' }
```
其中，“RowDataPacket { user_id: 1, username: ‘老卫’ }”就是数据库查询的结果。