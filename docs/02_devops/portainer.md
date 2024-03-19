---
parent: DevOps
title: Portainer
order: 1
---

# Portainer

::: warning
Текст не отформатирован
:::

::: info
Я стараюсь создавать внешние хранилища/сети (вкладка в портайнер, а не
через docker-compose.yml `driver: local`), если зайти внутри volume, можно увидеть реальный
физический путь.

Поэтому если видите сеть/хранилище с атрибутом `external: true`, вам нужно создать вручную.
Чтобы у докера хватало прав на запись/создание папок, примените на директорию
`volume_name/_data` команду [chmod](/docs/02_devops/docker-cli#для-laravel)
:::

Portainer является на данный момент лучшим выбором web UI для обычного докера, однако
редактировать можно только стэки созданные внутри portainer. Если создать стэк через `CLI`,
`portainer` сможет лишь запускать и останавливать.

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
<img height="600"
src="https://content.gitbook.com/content/tLcRoAdw9BYwwpba4ZAD/blobs/6tUkFjXix8CjS7IfxrS8/2.18-environments-add.gif"
title="env" width="600"/>
Обратите внимание мы используем agent для получения возможности управлять файлами в volume
После настройки `portainer` вы должны добавить в окружение (enviroments->add enviroment->
Environment address: agent:9001)
Далее вы работаете внутри окружение `agent`, чтобы видет кнопку
browse. [Читать доку](https://docs.portainer.io/admin/environments/add/docker/agent)
<img height="600" src="https://content.gitbook.com/content/tLcRoAdw9BYwwpba4ZAD/blobs/IwkpiopH86XACsJnv88x/2.15-docker_volumes_volumes.png" width="600"/>

Вы можете установить своё время, сайт по поиску [timezone](https://www.zeitverschiebung.net/en/timezone/europe--moscow)
:::

Код:

::: details /assets/docker/portainer/docker-compose.yml
<<< @/docs/public/assets/docker/portainer/docker-compose.yml
:::

*P.S. Не путайте docker-compose swarm с docker-compose plugin. Swarm
технология
крайне нестабильна и устарела, из-за разных версий yaml конфигов, превращает адаптацию конфигов в
танцы с бубном. Стэки на сварм часто падают и не работает с внешним хранилищем NFS*

Версия docker-compose. Детальная статья по докер на хабре, если вы только начинаете, это
нормально если вы не сможете с разу разобраться как писать `.Dockerfile`

::: warning
Обратите внимание! Для большинства сборок стоит использовать alpine linux (см. содержимое
dockerfile или на тэг с версией контейнера), т.к. он заметно легче debian, но есть исключения, к
примеру с [питоном](https://habr.com/ru/articles/486202/)
:::

## Работа с контейнером

<img src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1710850587/shalodoc/n3xinvcarubs0mlt41ey.png" width="300"/>

В `portainer` вы можете сразу войти внутрь контейнера и выполнять команды вручную. Важно
отметить зайти в контейнер можно лишь зная какое `CLI` окружение он использует. Если контейнер
на базе

- debian: `/bin/bash` или просто `bash`
- arch: `/bin/ash`

Если про `bash` информации пруд пруди, то про alpine linux на сайтах максимум написано про
пакетный менеджер `apk`. Единственный нормальный ресурс по изучение alpine linux, это
[официальная вики](https://wiki.alpinelinux.org/wiki/Main_Page)

Alpine linux очень сильно урезана, даже в сравнение со с `slim` [дистрибутивами](https://www.slitaz.org/ru/about/)

Если в дистрибутивах на базе `debian` есть всегда редактор `nano`, в alpine иногда урезают даже
`vim`. Про сетевые утилиты и прочие вкусности, я вообще молчу. 😢

::: warning
После пересборки контейнера выполненные изменения через консоль пропадут, записывайте все
операции в `bash` файл или сразу используйте `entrypoints`
:::
