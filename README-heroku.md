# Summary
## This Burger App has been _verified fully functional_ on the following environments:
  * __Bash on Windows 10 64bit__
     * Chrome browswer
  * __Linux kernel version 4.15.0-43-gneric, Linux Mint 18.3 with mysql-server 5.7__
     * Works fine with Firefox and Chromium web browsers
  * __heroku local__
     * Note that the database is still ClearDB MySQL on heroku.
     * Occasionally encounters an error with mysql server at heroku.
## Observation and Tentative Conclusion 
   * However, for some reason, it is experiencing tremendous difficulty running on the Heroku server. And debugging is heineously difficult regardless the verbose log messages.
   * __At this point, I consider Heroku with mysql server is super flaky and fragile.__
## Additional Attempt using PostgreSQL
   * Because MySQL is not offically supported database by heroku, I created a branch that uses PostgreSQL. After I converted mysql code to pg code and made all necessary changes and verified everything functional locally, pushed it to heroku. Alas, it still keeps giving up... though __the error code is now consistently `H12`__.  
   ```
   2019-01-31T08:46:03.665910+00:00 heroku[router]: at=error code=H12 desc="Request timeout" method=GET path="/" host=aqueous-beach-82382.herokuapp.com request_id=75def04b-cf27-474a-91c6-64a477854baa fwd="172.92.154.189" dyno=web.1 connect=1ms service=30000ms status=503 bytes=0 protocol=https
   ```
   Because the last version with MySQL occasionally worked for short period of times, I will try to switch back to the old version...
   
## Deployed App on Heroku Server Crash Log
* `heroku apps:errors`
    ```
    moto@esb:~/github/burger (master *)$ heroku apps:errors
    === Errors on ⬢ aqueous-beach-82382 in the last 24 hours
    source  name  level     desc             count
    ──────  ────  ────────  ───────────────  ─────
    router  H10   critical  App Crashed      65
    router  H12   critical  Request Timeout  11
    ```
    You can see I tried so many times and so many different things that might affect the heroku server.
* `heroku logs` does NOT appear to show it is an issue with PORT.
    * Particularly, the following two lines at the beginning show listening to a port and MySQL serer connection was established successfuly.
    ```
    Server started listening on part 57439 
    Connected to database as ID: 1796655441
    ```
    * However, as soon as "/" endpoint is accessed for the main web page, the app crashes on the heroku server with very high probability.
    * The whole start to crash log sample is below.
    ```
    2019-01-30T08:29:57.684464+00:00 app[web.1]: > burger@1.0.0 start /app
    2019-01-30T08:29:57.684466+00:00 app[web.1]: > node server.js
    2019-01-30T08:29:57.684467+00:00 app[web.1]:
    2019-01-30T08:29:58.081442+00:00 app[web.1]: Server started listening on part 57439
    2019-01-30T08:29:58.115819+00:00 app[web.1]: Connected to database as ID: 1796655441
    2019-01-30T08:30:58.114268+00:00 heroku[web.1]: State changed from up to crashed
    2019-01-30T08:30:58.099290+00:00 heroku[web.1]: Process exited with status 1
    2019-01-30T08:34:44.666245+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/" host=aqueous-beach-82382.herokuapp.com request_id=982510d9-d257-47d5-a4c6-0b0736c3924e fwd="172.92.154.189" dyno= connect= service= status=503 bytes= protocol=https
    2019-01-30T08:35:33.338850+00:00 app[api]: Deploy ed34c4c1 by user motohiko.makino@gmail.com
    2019-01-30T08:35:35.658072+00:00 heroku[web.1]: Starting process with command `npm start`
    2019-01-30T08:35:33.338850+00:00 app[api]: Release v19 created by user motohiko.makino@gmail.com
    2019-01-30T08:35:37.992388+00:00 app[web.1]:
    2019-01-30T08:35:37.992407+00:00 app[web.1]: > burger@1.0.0 start /app
    2019-01-30T08:35:37.992409+00:00 app[web.1]: > node server.js
    2019-01-30T08:35:37.992410+00:00 app[web.1]:
    2019-01-30T08:35:39.350882+00:00 heroku[web.1]: State changed from starting to up
    2019-01-30T08:36:37.769387+00:00 heroku[web.1]: State changed from up to crashed
    ```
    
    * Even worse, `heroku local` showed `SELECT * ...` was problem for heroku
    ```
    [WARN] ENOENT: no such file or directory, open 'Procfile'
    [OKAY] package.json file found - trying 'npm start'
    [OKAY] Loaded ENV .env File as KEY=VALUE Format
    [WARN] ENOENT: no such file or directory, open 'Procfile'
    [OKAY] package.json file found - trying 'npm start'
    9:22:39 PM web.1 |  > burger@1.0.0 start /mnt/c/Users/mmaki/github/burger
    9:22:39 PM web.1 |  > node server.js
    9:22:40 PM web.1 |  Server started listening on part 5000
    9:22:41 PM web.1 |  Connected to database as ID: 1795793268
    9:22:45 PM web.1 |  (node:18328) UnhandledPromiseRejectionWarning: Error: ER_BAD_FIELD_ERROR: Unknown column '*' in 'field list'
    ```
    * `heroku local` still connected successfully to the ClearDB and all the operation were successfully completed as well. Verified by manually logging onto the ClearDB MySQL server and the table was updated based exactly on operations on web page.