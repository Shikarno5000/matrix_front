Старт 1
      1.1.1 Попытки вносить изменения
        TODO: Сейчас нудно делать stop и rm перед обновлениием. Как можно автоматизировать процесс.
        TODO: Action  крашится в конце
      1.2 Переименование  
      1.3 Обновление и чистка
      1.4 Установка https https://docs.testit.software/installation-guide/set-up-https.html
        1.4.3 открытие порта https://hub.docker.com/r/steveltn/https-portal/
        1.4.4.6  https://vverh.digital/blog/docker-nginx-ssl-example/




На  фроне обновляется автоматически




      Создание ключа на удаленном сервере.
      
        ssh-keygen -t rsa -b 4096 -C "root@5.35.84.206" 
        cat /root/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
        cat /root/.ssh/id_rsa #скопировал с пробелом и копировал а сектреты


      Создание nuxt docker https://markus.oberlehner.net/blog/running-nuxt-3-in-a-docker-container/


      В чем нужно еще разобраться:
            Что делать с https


            https://beget.com/ru/kb/how-to/ssh/avtomaticheskaya-ssh-avtorizacziya-po-klyuchu?_gl=1%2a11z2eeg%2aFPAU%2aMjAzMTk4OTkzMy4xNzIzMDM1MzM5%2a_ga%2aOTU4NTQ2OTcyLjE3MjMwMzUzMzk.%2a_ga_PZJSKZPBP7%2aMTcyMzI5MjQ1Ny4xMC4xLjE3MjMyOTM3MTQuMC4wLjA.%2a_fplc%2aSGxkRmlialJTcHo5ZDN2VjU1YXZBZWc1alcwa1k2WTd6S1dHUHRSalg3NnNzdjZadk1hcmVFZ1E2TmJ6bWYlMkJGblJYQ3Q1Tm9TUGJGNlp2czdjNmdnYTJCJTJGV3NzMTZJMHElMkJsVHpTcXhSRndiM2VDT29nSXpQRXhCNXdKSGhnJTNEJTNE


