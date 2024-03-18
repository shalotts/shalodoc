---
parent: DevOps
title: Docker CLI Helpers
order: 2
---

# Полезные команды для CLI

В некоторых ситуациях вам все равно придётся пользоваться docker CLI.

## Первый запуск

Билд с нуля и запуск докера как сервис

```shell
docker-compose up --build
docker-compose up -d --remove-orphans
```

Войти внутрь контейнера с именем php под рутом

```shell
docker exec -it -u root php /bin/bash
```

## Полезные команды

Очистка сетки (если есть конфликты)

```shell
docker network prune
```

Очистка дубликатов контейнеров (если запускали другой докер)

```shell
docker rm -f $(docker ps -a -q)
```

## Для msql

Импорт msql дампа в таблицу shop3

```shell
docker exec -it db /bin/bash
mysql -u root -p shop3 < db_name.sql
```

## Для Laravel

Апдейт композера

```shell
composer install
```

Разрешить запись логов (очень часто возникает ошибка с правами)

```shell
sudo chmod -R o+w storage
sudo chmod -R o+w bootstrap
```

Создание папки кэша (в разных версиях пути могут отличаться)

```shell
mkdir -m755 bootstrap/cache
mkdir -m755 storage/framework/views
```
