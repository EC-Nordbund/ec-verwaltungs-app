1. Verbinde dich mit dem SocketIO Server, wenn du dich einloggen möchtest.
2. Sende ein 'login' mit {username: string, password: string} als 1. Argument an den Server
3. Der Server Disconnected dich wenn Zugangsdaten falsch
4. Der Server sendet 'welcome' wenn erfolgreich.
5. Solltest du dich als Superadmin einloggen sendet der Server statt welcome 'superuser' und als Argument eine Liste von users.
6. Antworte mit 'superuser' und sende den Benutzernamen mitdem du dich einloggen willst.