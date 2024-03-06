---
parent: DevOps
title: Portainer
order: 1
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

::: details Docker-Compose для portainer
Скачать `wget https://docs.shalotts.site/assets/docker/portainer/docker-compose.yml`

<img height="600"
src="https://content.gitbook.com/content/tLcRoAdw9BYwwpba4ZAD/blobs/6tUkFjXix8CjS7IfxrS8/2.18-environments-add.gif"
title="env" width="600"/>
Обратите внимание мы используем agent для получения возможности управлять файлами в volume
После настройки `portainer` вы должны добавить в окружение (enviroments->add enviroment->
Environment address: agent:9001)
Далее вы работаете внутри окружение `agent`, чтобы видет кнопку
browse. [Читать доку](https://docs.portainer.io/admin/environments/add/docker/agent)
<img height="600" src="https://content.gitbook.com/content/tLcRoAdw9BYwwpba4ZAD/blobs/IwkpiopH86XACsJnv88x/2.15-docker_volumes_volumes.png" width="600"/>

```yaml
version: "3.4"
services:
  agent:
    image: portainer/agent
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /var/lib/docker/volumes:/var/lib/docker/volumes

  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    command: -H tcp://agent:9001 --tlsskipverify
    environment:
      - TZ=Europe/Moscow
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /opt/portainer/portainer_data:/data
    ports:
      - "8000:8000"
      - "9443:9443"
    restart: always
```

:::

*P.S. Не путайте docker-compose swarm с docker-compose plugin. Swarm
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
dockerfile или на тэг с версией контейнера), т.к. он заметно легче debian, но есть исключения, к
примеру с [питоном](https://habr.com/ru/articles/486202/)
:::
