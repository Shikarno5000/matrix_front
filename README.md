

https://www.programonaut.com/how-to-deploy-a-git-repository-to-a-server-using-github-actions/

Новая попытка 6 test2.yaml



1. проба понять как делать правильный перенос с докером  https://github.com/mohammed-bahumaish/github-actions-push-docker-image-via-ssh
      1. настройка переменных в github
            1. Подклчюение по ip  https://www.ispmanager.ru/knowledge-base/podklyuchenie-k-serveru-linux-po-ssh
                  ssh user@ip -p<port>
                  ssh root@5.35.84.206

                  Создание ключей
                        https://mad-dog.ru/podkluchenie-github-po-ssh/
                        cat ~/.ssh/id_rsa.pub


            Отладка:
                  Попробовал переписать ключ  3 


                  проба решить ропблему с ключем. с пробелом в конце - не работает
                  без пробела 118

https://github.com/marketplace/actions/ssh-deploy
проба создать новый файл  из примера выше 
проба залить скопроиванную версию 4

ssh-copy-id -i ~/.ssh/id_rsa.pub root@5.35.84.206
ssh-keygen -t rsa -q -N '' -f ~/.ssh/id_rsa
ll -l .ssh/

cat ~/.ssh/id_rsa.pub | ssh root@5.35.84.206 'cat >> ~/.ssh/authorized_keys'
root@5.35.84.206

1111222222


В чем нужно еще разобраться:
      Что делать с https


      https://beget.com/ru/kb/how-to/ssh/avtomaticheskaya-ssh-avtorizacziya-po-klyuchu?_gl=1%2a11z2eeg%2aFPAU%2aMjAzMTk4OTkzMy4xNzIzMDM1MzM5%2a_ga%2aOTU4NTQ2OTcyLjE3MjMwMzUzMzk.%2a_ga_PZJSKZPBP7%2aMTcyMzI5MjQ1Ny4xMC4xLjE3MjMyOTM3MTQuMC4wLjA.%2a_fplc%2aSGxkRmlialJTcHo5ZDN2VjU1YXZBZWc1alcwa1k2WTd6S1dHUHRSalg3NnNzdjZadk1hcmVFZ1E2TmJ6bWYlMkJGblJYQ3Q1Tm9TUGJGNlp2czdjNmdnYTJCJTJGV3NzMTZJMHElMkJsVHpTcXhSRndiM2VDT29nSXpQRXhCNXdKSGhnJTNEJTNE