---
parent: DevOps
title: Portainer
---

# Portainer

::: warning
Текст не отформатирован
:::

`Да угомоните ваших демонов!`

Portainer является на данный момент лучшим выбором web UI для обычного докера, главным 
недостаток это возможность использовать стэки созданные внутри portainer. Это может усложнить 
использование с CLI версией, которой будут пользоваться разрабы.

Создание хранилища	
```shell
sudo docker volume create portainer_data
```

Запуск на 8000 порту
```shell
sudo docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```

В данный команде мы использовали нативный докер, пользоваться им крайне не удобно (а кто любит 
километровый баш). В дальнейшем мы будем использовать docker-compose, который позволяет 
запускать контейнеры в стэке (несколько контейнеров в одной или различной сети). Любые 
дальнейшие действия с докер выполняем внутри portainer, т.к. создает собственные конфиги 
несовместимые с консольной версией.



*P.S. Не путайте docker-compose swarm (native docker-compose) с docker-compose plugin. Swarm 
технология 
крайне нестабильна и устарела, из-за разных версий yaml конфигов, превращает адаптацию конфигов в 
танцы с бубном. Стэки на сварм часто падают и не работает с внешним хранилищем NFS*

Версия docker-compose. Детальная статья по докер на хабре, если вы только начинаете, это 
нормально если вы не сможете с разу разобраться как писать `.Dockerfile`, хотя по сути это стоит 
воспринимать как bash.

`docker-compose.yml`
```yaml
version: "3.3"
services:
  twportainer:
    image: portainer/portainer-ce:latest
    container_name: twportainer
    environment:
      - TZ=Europe/Moscow
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /opt/twportainer/portainer_data:/data
    ports:
      - "8000:8000"
      - "9443:9443"
    restart: always
```

::: warning
Обратите внимание! Для большинства сборок стоит использовать alpine linux (см. содержимое 
dockerfile), т.к. он заметно легче debian, но есть исключения, к примеру с [питоном](https://habr.com/ru/articles/486202/)
:::
