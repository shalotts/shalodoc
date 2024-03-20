---
parent: DevOps
title: Matrix Synapse
order: 2
---

# Matrix Synapse

::: warning
Вынести coturn в отдельный стэк
:::

::: details /assets/docker/s1/matrix/server/synapse/docker-compose.yml
<<< @/docs/public/assets/docker/s1/matrix/server/synapse/docker-compose.yml
:::

::: details /assets/docker/s1/matrix/server/synapse/env.txt
<<< @/docs/public/assets/docker/s1/matrix/server/synapse/env.txt
:::

Содержимое `data` volume.
```shell
wget https://res.cloudinary.com/dr5gcup5n/raw/upload/v1710842088/shalodoc/ohyp12ppqjt4sy4sbfrj.zip
```

Это серверное приложение для чата. Основная фишка это федерации, ~~можно отключить~~. Вы поможете
присоединить другой matrix сервер для расширения, хотя веб-клиенты начинают сильно тормозить от
изобилия чат комнат.

Я пробовал `conduit`, он гораздо проще в настройке, чем `synapse`, но ещё находится в разработке
и не поддерживает SSO.

## Разбор homeserver.yaml

Основу конфига я брал из [хабра](https://habr.com/ru/articles/739814/)

Оригинальный конфиг можно взять из [документации](https://matrix-org.github.io/synapse/latest/usage/configuration/homeserver_sample_config.html)

Или лучше сгенирировать, перейдите в контейнер `synapse` и выполните команду

В поле `federation_domain_whitelist` укажите сразу свои matrix сервера. Если хотите полностью
выключить федерацию, то уберите `federation` из `listeners`.

Поле `allowed_local_3pids` позволяет добавлять белый список для регистрации пользователей со своим
доменом.


```shell
python -m synapse.app.homeserver --config-path <CONFIG> --generate-config
```

При создании конфига через команду, секретные ключи сгенерируются сами.

## Как создать админа?

Самый просто зайти в `synapse` и выполнить [команду](https://matrix-org.github.io/synapse/latest/setup/installation.html?highlight=registration_shared_secret#registering-a-user)

Второй способ. Создать пользователя через веб-клиент, а затем присвоить ему
права в [базе данных](https://matrix-org.github.io/synapse/latest/usage/administration/admin_api/index.html#authenticate-as-a-server-admin).

```shell
psql -U synapse
```
```postgresql
UPDATE users SET admin = 1 WHERE name = '@admin:example.org';
```

Или вы можете поставить контейнер с [pgadmin](https://medium.com/@vishal.sharma./run-postgresql-and-pgadmin-using-docker-compose-34120618bcf9)
и отредактировать поле у своего пользователя через графику. Я использую редактор `phpstorm`, у
него имеются встроенные утилиты по работе с бд, что очень удобно.

::: warning
Вы не сможете пользоваться `synapse-admin` пока не получите права администратора
:::
