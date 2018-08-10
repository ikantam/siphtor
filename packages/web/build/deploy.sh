tar -zcf ../siphtor.tar.gz . --exclude node_modules
scp -r ../siphtor.tar.gz ubuntu@aws_iwsyhgia:~/

ssh aws_iwsyhgia <<-'ENDSSH'
  source /home/ubuntu/.bashrc

  mkdir -p siphtor
  cd ~/siphtor
  rm -rf '!(node_modules)'

  cd ~/
  tar -pxzf siphtor.tar.gz -C ~/siphtor
  cd ~/siphtor

  yarn install
  yarn run build
  yarn run configure:nginx:prod
ENDSSH
