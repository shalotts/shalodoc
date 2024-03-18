---
parent: DevOps
title: Wiki.js
order: 2
---

# Wiki.js

::: warning
Текст не отформатирован
:::

## OAuth2

За основу можно взять официальную статью от [authentiс](https://docs.goauthentik.io/integrations/services/wiki-js/),
но нужно внести некоторые исправления. Лучше использовать чистый протокол OAuth2 в настройках
`wiki.js`

<img src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1709816353/shalodoc/scfqrl57hsempjgtzdqv.png" width="300" alt=""/>

По умолчанию поле displayName нужно заменить на name. Это индикатор ключа в котором храниться
имя пользователя. Также мы включаем возможность регистрации новых пользователей, но желательно
заранее создать им группу с ограниченными правами.

![fields](https://res.cloudinary.com/dr5gcup5n/image/upload/v1709816353/shalodoc/u0zcjsxjfcnugedv5hnt.png)

На локалхосте используем `имя_контейнера:внутренний_порт`, а в config.yml дописываем `offline: true`.

::: warning
Если вы получили ошибку Invalid Username/Password, скорее всего вам нужно удалить аккаунт
созданный `authentik` в wiki.js.

Если вы получили ошибку с некорректным провайдером, убедитесь что прописан корневой сертификат
переменная `NODE_EXTRA_CA_CERTS` в контейнере wiki
:::


## Docker

Здесь я прописал абсолютный путь до конфига, не получилось навести на файл из local drive.
Для замещение файла на свой использую моддификатор `:ro`
::: details assets/docker/s1/wiki/docker-compose.yml
<<< @/docs/public/assets/docker/s1/wiki/docker-compose.yml
:::

::: details assets/docker/s1/wiki/env.txt
<<< @/docs/public/assets/docker/s1/wiki/env.txt
:::

