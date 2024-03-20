---
parent: DevOps
title: Jitsi Meet
order: 2
---

# Jitsi

::: details /assets/docker/s1/jitsi/docker-compose.yml
<<< @/docs/public/assets/docker/s1/jitsi/docker-compose.yml
:::

::: details /assets/docker/s1/jitsi/env.txt
<<< @/docs/public/assets/docker/s1/jitsi/env.txt
:::

Содержимое `${CONFIG}` volume/_data

```shell
wget https://res.cloudinary.com/dr5gcup5n/raw/upload/v1710913088/shalodoc/l7hpy3py2iwcvwdcdqdh.zip
```


По умолчанию `jitsi` не поддерживает `oauth/openid`, но мы можем поставить дополнительное
приложение как провайдер. Стороннее приложение будет использовать авторизацию по [jwt](https://tproger.ru/articles/jwt-dlya-nachinayushhih-chto-takoe-json-web-tokens-i-zachem-oni-nuzhny)

Для начала создайте в `authentic` провайдер `openid/oauth`

В качестве redirect url укажите адрес приложения провайдера

`https://auth-meet.shalotts.site/callback`

<img src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1710838299/shalodoc/cqkmfrknrms8eedxhwsu.png" width="300"/>

<img src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1710838566/shalodoc/grzo0aeefnnzcjj3rgff.png" width="300"/>

## ENV

- JITSI_SUB - копируем `sub` из вкладки `preview` в `authentic`
- CLIENT_ID и CLIENT SECRET - как обычно из настроек провайдера
- ISSUER_URL - копируем `is` из `preview`

Все остальные ключи и секреты генерируем сами. В репозитории есть `bash` [скрипт](https://github.com/jitsi/docker-jitsi-meet/blob/master/gen-passwords.sh)


## Выбор сигнального сервера


