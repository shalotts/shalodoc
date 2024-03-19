---
parent: DevOps
title: Jitsi Meet
order: 2
---

# Jitsi

По умолчанию `jitsi` не поддерживает `oauth/openid`, но мы можем поставить дополнительное
приложение как провайдер. Стороннее приложение будет использовать авторизацию по [jwt](https://tproger.ru/articles/jwt-dlya-nachinayushhih-chto-takoe-json-web-tokens-i-zachem-oni-nuzhny)

Для начала создайте в `authentic` провайдер `openid/oauth`

В качестве redirect url укажите адрес приложения провайдера

`https://auth-meet.shalotts.site/callback`

<img src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1710838299/shalodoc/cqkmfrknrms8eedxhwsu.png" width="300"/>

<img src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1710838566/shalodoc/grzo0aeefnnzcjj3rgff.png" width="300"/>
