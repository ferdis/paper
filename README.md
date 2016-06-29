# Paper


Paper is a UI for exchanging currencies.

> **NOTE** This is not a real thing. 

## Requirements

* Chrome (>= 51)
* nginx (>= 1.10)

## Installation
```bash
# Clone the repository
$> git clone https://github.com/uitgewis/paper.git 

# Add a hostname alias
$> sudo echo -e"127.0.1.1\tpaper.dev" >> /etc/hosts        

# Edit, link and reload
$> vim paper/etc/paper.dev && \
   cp paper/etc/paper.dev /etc/nginx/sites-enabled && \
   systemctl reload nginx

# Win! 🎉 Have a beer 🍻
$> open -a 'Chrome' http://paper.dev
```
