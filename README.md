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



В чем нужно еще разобраться:
      Что делать с https