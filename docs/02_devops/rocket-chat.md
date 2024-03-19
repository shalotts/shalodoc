---
parent: DevOps
title: RocketChat
order: 2
---

# RocketChat

Если вы не планируете масштабировать или серьезно кастомизировать приложение чата, то RocketChat
хорошее решение. Предварительно стоит ознакомиться
с [ограничениями](https://www.rocket.chat/pricing) `starter` версии
Rocket chat. Starter pack поддерживает всего 25 пользователей, этого может
оказаться
мало,
поэтому возможно стоит рассмотреть вариант сразу использовать cinio + jitsi.

Rocket chat устанавливается весьма просто, jitsi устанавливается плагин внутри приложения.
Настройка authentic написана на [оффиц. сайте](https://docs.goauthentik.io/integrations/services/rocketchat/)

::: details /assets/docker/s1/rocketchat/docker-compose.yml
<<< @/docs/public/assets/docker/s1/rocketchat/docker-compose.yml
:::

::: details /assets/docker/s1/rocketchat/env.txt
<<< @/docs/public/assets/docker/s1/rocketchat/env.txt
:::
