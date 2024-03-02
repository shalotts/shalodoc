---
parent: DevOps
title: Docker CLI Helpers
---

# Полезные команды для CLI

::: warning
Текст не отформатирован
:::

`Я вижу подозрительную надпись в начале каждой страницы`

В некоторых ситуациях все же cli команды удобнее графики, здесь список распространенных

## Первый запуск

Билд с нуля и запуск докера как сервис

    docker-compose up --build
    docker-compose up -d --remove-orphans 

Войти внутрь контейнера с именем php под рутом

    docker exec -it -u root php /bin/bash

## Полезные команды

Очистка сетки (если есть конфликты)

    docker network prune 

Очистка дубликатов контейнеров (если запускали другой докер)

    docker rm -f $(docker ps -a -q)

## Для msql

Импорт msql дампа в таблицу shop3

    docker exec -it db /bin/bash
    mysql -u root -p shop3 < db_name.sql

## Для Laravel

Апдейт композера

    composer install

Разрешить запись логов (очень часто возникает ошибка с правами)

    sudo chmod -R o+w storage 
    sudo chmod -R o+w bootstrap

Создание папки кэша (в разных версиях пути могут отличаться)

    mkdir -m755 bootstrap/cache
    mkdir -m755 storage/framework/views