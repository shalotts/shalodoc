admins = { "info@shalotts.site", "7info7web@gmail.com" }

Component "conference.meet.jitsi" "muc"
  modules_enabled = {
    "token_verification";
    "token_affiliation";
  }


VirtualHost "auth-meet.shalotts.site"
  authentication = "oauth"
  oauth_host = "s1.shalotts.site"
  oauth_url_token = "https://s1.shalotts.site/application/o/token/"
  oauth_url_userinfo = "https://s1.shalotts.site/application/o/userinfo/"
  oauth_client_id = "FHXYRZqxG9JE2ihaSenR6ULZawmpMIB5F4Wdoppo"
  oauth_client_secret = "XIRWF87R9clq4uMFn2PpKB6OMpMUcir33psql7s7xxhAfumc9Sh68bPG6ssZDyByAl2ZYb7YMDKEgbgWVRcN2GM2immFDsfHvnoEl5JvIFQRpUilmeoI2X3c4QFgevRa"

  modules_enabled = {
    "auth_oauth";
  }
